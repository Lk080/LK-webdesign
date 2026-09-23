'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createRun, reserve, loadRun, stamp } = require('./qa-run.cjs');
const { assertRunnable } = require('./qa-projects.cjs');
const { collect } = require('./qa-report.cjs');
test('unique outputs preserve sibling evidence and reject reuse/mixed project', () => {
  const a = createRun('automotive','unit'), b = createRun('automotive','unit');
  assert.notEqual(a.dir,b.dir);
  const folder=reserve(a,'html'); fs.writeFileSync(path.join(folder,'proof.txt'),'keep');
  assert.throws(()=>reserve(a,'html')); assert.throws(()=>loadRun(a.dir,'beauty'));
  assert.equal(fs.readFileSync(path.join(folder,'proof.txt'),'utf8'),'keep');
});
test('freeze is shared by underlying runners',()=>{assert.throws(()=>assertRunnable('kelmora'),/bevroren/);assert.throws(()=>createRun('kelmora','static'),/bevroren/);});
test('reports read one explicit run and reject foreign metadata',()=>{
  const a=createRun('beauty','unit'),b=createRun('beauty','unit');
  for(const ctx of [a,b]) { const dir=reserve(ctx,'axe');fs.writeFileSync(path.join(dir,'axe-test.json'),JSON.stringify(stamp(ctx,'axe',{state:ctx.metadata.runId,violations:[]}))); }
  assert.equal(collect(a.dir,'beauty','axe').reports.length,1);
  assert.equal(collect(a.dir,'beauty','axe').reports[0].state,a.metadata.runId);
  fs.writeFileSync(path.join(a.dir,'axe','axe-foreign.json'),JSON.stringify(stamp(b,'axe',{})));
  assert.throws(()=>collect(a.dir,'beauty','axe'),/Mixed/);
});
const { projects } = require('./qa-projects.cjs');
const { assess, approve, reuseEvidence } = require('./qa-evidence.cjs');
test('all registered projects have adapters and publication separate from approval',()=>{
  for(const p of Object.values(projects)) { assert(p.qa.adapters.functional.length);assert(p.qa.adapters.axe.length);assert(p.publication.phase);assert(!('deliveryStatus' in p.publication)); }
  assert.equal(new Set(Object.values(projects).map(p => p.id)).size, Object.keys(projects).length);
});
test('technical and human statuses cannot be inferred from partial/failing/stale evidence',()=>{
  const state={source:'s',configuration:'c',baselines:'b',environment:{node:'test'}};
  const entries=projects.automotive.qa.required.flatMap(check=>(projects.automotive.qa.requiredViewports[check] || [null]).map(viewport=>({project:'automotive',check,viewport,result:'PASS',snapshot:state})));
  const status=assess(entries,'automotive',state);
  assert.equal(status.technicalStatus,'TECHNICAL_GATE_PASS');assert.equal(status.deliveryStatus,'OWNER_REVIEW_PENDING');
  assert.throws(()=>approve(status,null,state));
  assert.notEqual(assess(entries.slice(1),'automotive',state).technicalStatus,'TECHNICAL_GATE_PASS');
  assert.notEqual(assess(entries,'automotive',{...state,source:'changed'}).technicalStatus,'TECHNICAL_GATE_PASS');
  assert.throws(()=>reuseEvidence(entries[0],'.',state,''));
  assert.throws(()=>approve(status,{decision:'approve',reviewer:'Automation'},state));
});
const { decision } = require('./qa-network.cjs');
const { evaluate } = require('./qa-lighthouse-targets.cjs');
const { inspectHTML, dimensions } = require('./qa-foundation.cjs');
test('network policy rejects unknown origins and writes, mocks only Formspree',()=>{
  assert.equal(decision('https://unregistered.invalid/a','GET','automotive').action,'reject');
  assert.equal(decision('http://127.0.0.1:4173/','POST','automotive').action,'reject');
  assert.equal(decision('https://formspree.io/f/demo','POST','lk').action,'mock-form');
  assert.equal(decision('https://fonts.googleapis.com/a','GET','lk','live').action,'continue');
  assert.equal(decision('https://fonts.googleapis.com/a','GET','automotive','live').action,'reject');
});
test('Lighthouse missing/below targets cannot silently pass',()=>{
  assert.equal(evaluate({categories:{}},{seo:95}).targetStatus,'BELOW_TARGET');
  assert.equal(evaluate({categories:{seo:{score:.949}}},{seo:95}).targetStatus,'BELOW_TARGET');
  assert.equal(evaluate({categories:{seo:{score:1}}},{seo:95}).targetStatus,'TARGETS_MET');
});
test('SEO/JSON-LD/srcset checks reject actual inconsistencies',()=>{
  const html='<html lang="nl"><title>Demo</title><meta name="description" content="Demo"><meta name="viewport" content="width=device-width"><h1>Demo</h1><link rel="canonical" href="https://example.org/"><meta property="og:url" content="https://wrong.org/"><script type="application/ld+json">{broken}</script><img src="x.webp" srcset="x.webp 800w" width="200" height="100">';
  const r=inspectHTML(html,projects.automotive,()=>({dimensions:{width:400,height:200},bytes:1}));
  for(const rule of ['url-consistency','json-ld-parse','srcset-width','responsive-sizes'])assert(r.findings.some(f=>f.rule===rule));
  const b=Buffer.alloc(30);b.write('RIFF');b.write('VP8X',12);b.writeUIntLE(799,24,3);b.writeUIntLE(449,27,3);assert.deepEqual(dimensions(b,'.webp'),{width:800,height:450});
});
const { spawnSync } = require('node:child_process');
test('registry preserves previous routes and visual selectors for every project',()=>{
  const original = require('./fixtures/project-reference.json');
  for(const site of original) assert.equal(JSON.stringify(require('./qa-projects.cjs').visualProject(site.id)),JSON.stringify(site));
});
test('supported CLI entries reject frozen execution before browsers or website checks',()=>{
  for(const args of [['scripts/qa-static.cjs','html','kelmora'],['scripts/qa-lighthouse.cjs','kelmora'],['scripts/qa-foundation.cjs','kelmora'],['scripts/qa-playwright.cjs','--site','kelmora'],['-e',"require('./playwright.config.cjs')"]]) {
    const result=spawnSync(process.execPath,args,{encoding:'utf8',env:{...process.env,QA_SITE:'kelmora'}});
    assert.notEqual(result.status,0);assert.match(result.stderr,/bevroren/);
  }
});
test('baseline acceptance rejects missing approval scope and frozen project',()=>{
  const {accept}=require('./qa-accept.cjs');
  assert.throws(()=>accept(),/explicit|Use/);
  const ctx=createRun('automotive','unit');const review=path.join(ctx.dir,'review.json');
  fs.writeFileSync(review,JSON.stringify({project:'kelmora'}));assert.throws(()=>accept(review),/bevroren/);
  fs.writeFileSync(review,JSON.stringify({project:'automotive'}));assert.throws(()=>accept(review),/Explicit/);
});
test('a missing required viewport keeps technical approval pending',()=>{
  const state={source:'s'};
  const entries=projects.automotive.qa.required.map(check=>({project:'automotive',check,result:'PASS',snapshot:state,viewport:'desktop'}));
  assert.equal(assess(entries,'automotive',state).technicalStatus,'TECHNICAL_GATE_INCOMPLETE');
});
test('all CLI browser updates and output overrides are rejected',()=>{
  for(const flag of ['--output=test-results','--update-snapshots=all','-u']) {
    const r=spawnSync(process.execPath,['node_modules/@playwright/test/cli.js','test','--list',flag],{encoding:'utf8',env:{...process.env,QA_SITE:'automotive'}});
    assert.notEqual(r.status,0);assert.match(r.stderr,/overrides|updates are disabled/);
  }
});
test('Playwright workers reuse only their launcher scope; a second launcher cannot erase it',()=>{
  const ctx=createRun('automotive','unit');
  const env={...process.env,QA_SITE:'automotive',QA_RUN_DIR:ctx.dir,QA_CHECK:'functional'};
  const args=['-e',"require('./scripts/qa-run.cjs').playwrightScope('functional')"];
  assert.equal(spawnSync(process.execPath,args,{encoding:'utf8',env}).status,0);
  assert.equal(spawnSync(process.execPath,args,{encoding:'utf8',env:{...env,TEST_WORKER_INDEX:'0'}}).status,0);
  assert.notEqual(spawnSync(process.execPath,args,{encoding:'utf8',env}).status,0);
});
test('project budgets are optional and enforced only when explicitly configured',()=>{
  const {inspectProject}=require('./qa-foundation.cjs');
  const project={...projects.automotive,qa:{...projects.automotive.qa,budgets:{assetTotalBytes:1,maxAssetBytes:1}}};
  assert(inspectProject(project).findings.some(f=>f.rule==='asset-budget'&&f.classification==='ERROR'));
});
test('published phase requires confirmed URL metadata rather than inventing it',()=>{
  const html='<html lang="nl"><title>A</title><meta name="description" content="A"><meta name="viewport" content="width=device-width"><h1>A</h1>';
  const project={...projects.automotive,publication:{phase:'published',canonicalURL:'https://example.org/'}};
  const report=inspectHTML(html,project);
  assert(report.findings.some(f=>f.rule==='publication-url'));
  assert(report.findings.some(f=>f.rule==='og-image'));
});
