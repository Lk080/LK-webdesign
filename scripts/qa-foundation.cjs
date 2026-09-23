'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { HTMLParser } = require('htmlhint');
const { getProject } = require('./qa-projects.cjs');
const { context, reserve, stamp, root } = require('./qa-run.cjs');
const { files } = require('./qa-state.cjs');
const attrs = event => Object.fromEntries(event.attrs.map(a=>[a.name.toLowerCase(),a.value.replaceAll('&amp;','&')]));
function dimensions(buffer, extension) {
  if(extension==='.png' && buffer.length>=24 && buffer.subarray(1,4).toString()==='PNG')return {width:buffer.readUInt32BE(16),height:buffer.readUInt32BE(20)};
  if(extension==='.webp' && buffer.length>=30 && buffer.toString('ascii',0,4)==='RIFF') {
    const type=buffer.toString('ascii',12,16);
    if(type==='VP8X')return {width:buffer.readUIntLE(24,3)+1,height:buffer.readUIntLE(27,3)+1};
    if(type==='VP8 ')return {width:buffer.readUInt16LE(26)&0x3fff,height:buffer.readUInt16LE(28)&0x3fff};
    if(type==='VP8L'){const bits=buffer.readUInt32LE(21);return {width:(bits&0x3fff)+1,height:((bits>>>14)&0x3fff)+1};}
  }
  if(['.jpg','.jpeg'].includes(extension) && buffer.readUInt16BE(0)===0xffd8) {
    for(let i=2;i+9<buffer.length;) {
      if(buffer[i]!==0xff)break;const marker=buffer[i+1];
      if([0xc0,0xc1,0xc2].includes(marker))return {height:buffer.readUInt16BE(i+5),width:buffer.readUInt16BE(i+7)};
      const length=buffer.readUInt16BE(i+2);if(length<2)break;i+=2+length;
    }
  }
  if(extension==='.svg') {
    const box=buffer.toString().match(/viewBox=["']\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)["']/);
    if(box)return {width:Number(box[1]),height:Number(box[2])};
  }
  return null;
}
function inspectHTML(html, project, lookup = () => null) {
  const findings=[],tags=[],images=[];let title='',inTitle=false;const jsonLD=[];
  const add=(rule,message,classification='ERROR')=>findings.push({rule,message,classification});
  const parser=new HTMLParser();
  parser.addListener('tagstart',e=>{tags.push({name:e.tagName.toLowerCase(),attrs:attrs(e)});if(e.tagName==='title')inTitle=true;});
  parser.addListener('text',e=>{if(inTitle)title+=e.raw;});
  parser.addListener('tagend',e=>{if(e.tagName==='title')inTitle=false;});
  parser.addListener('cdata',e=>{if(attrs(e).type==='application/ld+json'){try{jsonLD.push(JSON.parse(e.raw));}catch{add('json-ld-parse','Invalid JSON-LD');}}});
  parser.parse(html);
  const all=name=>tags.filter(t=>t.name===name);
  const meta=key=>all('meta').find(t=>t.attrs.name===key||t.attrs.property===key)?.attrs.content;
  if(all('title').length!==1||!title.trim())add('title','Exactly one nonempty title required');
  if(!meta('description'))add('description','Meta description missing');
  if(!meta('viewport')?.includes('width=device-width'))add('viewport','Responsive viewport missing');
  if(!all('html')[0]?.attrs.lang)add('language','HTML language missing');
  if(all('h1').length!==1)add('heading','Exactly one H1 required');
  const canonical=all('link').filter(t=>t.attrs.rel==='canonical');
  if(canonical.length>1)add('canonical','Multiple canonical URLs');
  const canonicalURL=canonical[0]?.attrs.href;
  if(canonicalURL && !/^https:\/\//.test(canonicalURL))add('canonical','Canonical must use absolute HTTPS');
  if(canonicalURL&&meta('og:url')&&canonicalURL!==meta('og:url'))add('url-consistency','Canonical and og:url differ');
  if(project.publication.canonicalURL&&canonicalURL&&canonicalURL!==project.publication.canonicalURL)add('url-consistency','Canonical differs from registry');
  if(project.publication.phase==='published') {
    if(!project.publication.canonicalURL||canonicalURL!==project.publication.canonicalURL)add('publication-url','Published page needs its confirmed canonical URL');
    if(!/^https:\/\//.test(meta('og:image')||''))add('og-image','Published OG image must be absolute HTTPS');
    if(/noindex/i.test(meta('robots')||''))add('robots','Published page has noindex');
  } else if(!project.publication.canonicalURL) add('publication-pending','Public URL/hosting policy must be confirmed before publication','INFO');
  for(const object of jsonLD) {
    if(object && typeof object.url==='string'&&canonicalURL&&object.url!==canonicalURL)add('json-ld-url','Top-level JSON-LD url differs from canonical');
  }
  for(const tag of tags.filter(t=>['img','source'].includes(t.name))) {
    const a=tag.attrs;
    if(tag.name==='img' && (!(Number(a.width)>0)||!(Number(a.height)>0)))add('image-dimensions',`Explicit positive dimensions missing: ${a.src}`);
    const variants=(a.srcset||'').split(',').map(s=>s.trim()).filter(Boolean).map(s=>s.split(/\s+/));
    if(variants.some(v=>v.length>2 || v[1]&&!/^\d+(?:\.\d+)?[wx]$/.test(v[1])))add('srcset','Invalid responsive image descriptor');
    if(variants.some(v=>v[1]?.endsWith('w'))&&!a.sizes)add('responsive-sizes','Width srcset requires sizes');
    for(const [url,descriptor] of [...(a.src?[[a.src,null]]:[]),...variants]) {
      if(/^(https?:|data:)/.test(url)) { add('external-image',`External image requires explicit delivery review: ${url}`,'WARNING');continue; }
      const asset=lookup(url);
      if(!asset){add('missing-asset',`Missing image: ${url}`);continue;}
      images.push({url,...asset});
      if(!asset.dimensions)add('unknown-image-format',`Dimensions not decoded: ${url}`,'WARNING');
      else if(descriptor?.endsWith('w')&&parseInt(descriptor)!==asset.dimensions.width)add('srcset-width',`Descriptor does not match ${url}`);
    }
  }
  return { findings, images, jsonLDCount:jsonLD.length };
}
function inspectProject(project) {
  const source=path.join(root,project.source);
  const owned=files(source).filter(f=>project.id!=='lk'||!f.includes('/docs/demos/'));
  const findings=[],pages=[];
  for(const file of owned.filter(f=>f.endsWith('.html'))) {
    const report=inspectHTML(fs.readFileSync(file,'utf8'),project,url=>{
      const address=new URL(url,'http://qa.invalid'+project.route+path.relative(source,file));
      const asset=path.resolve(root,'docs','.'+decodeURIComponent(address.pathname));
      if(!asset.startsWith(path.join(root,'docs')+path.sep)||!fs.existsSync(asset)||!fs.statSync(asset).isFile())return null;
      const bytes=fs.readFileSync(asset);return {bytes:bytes.length,dimensions:dimensions(bytes,path.extname(asset).toLowerCase())};
    });
    findings.push(...report.findings.map(f=>({...f,file:path.relative(root,file),website:project.name})));
    pages.push({file:path.relative(root,file),images:report.images,jsonLDCount:report.jsonLDCount});
  }
  const assets=owned.filter(f=>!['.html','.css','.js','.md'].includes(path.extname(f)));
  const total=assets.reduce((n,f)=>n+fs.statSync(f).size,0),budgets=project.qa.budgets;
  if(budgets.assetTotalBytes!=null&&total>budgets.assetTotalBytes)findings.push({classification:'ERROR',rule:'asset-budget',message:`Assets ${total} exceed project budget ${budgets.assetTotalBytes}`});
  if(budgets.maxAssetBytes!=null)for(const file of assets)if(fs.statSync(file).size>budgets.maxAssetBytes)findings.push({classification:'ERROR',rule:'asset-budget',file:path.relative(root,file),message:'Asset exceeds project budget'});
  if(!Object.keys(budgets).length)findings.push({classification:'INFO',rule:'asset-budget',message:'No project budget declared; measurements only, no universal limits'});
  return {tool:'foundation',findings,pages,assetBytes:total,budgets,publication:project.publication};
}
function main(id) {
  const ctx=context(id,'foundation'),output=reserve(ctx,'foundation');
  const report=inspectProject(getProject(id));
  fs.writeFileSync(path.join(output,'foundation.json'),JSON.stringify(stamp(ctx,'foundation',report),null,2));
  console.log(JSON.stringify({run:ctx.dir,findings:report.findings}));
  process.exitCode=report.findings.some(f=>f.classification==='ERROR')?1:0;
}
if(require.main===module){try{main(process.argv[2]);}catch(error){console.error(error.message);process.exitCode=1;}}
module.exports={dimensions,inspectHTML,inspectProject};
