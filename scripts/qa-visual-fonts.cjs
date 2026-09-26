// Explicit one-time capture; never called by normal visual comparisons.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
async function main() {
  const root = path.resolve(__dirname, '..');
  const dir = path.join(root, 'tests/visual/assets');
  const html = await fs.readFile(path.join(root, 'docs/index.html'), 'utf8');
  const url = html.match(/href="(https:\/\/fonts.googleapis.com\/css2[^\"]+)"/)[1].replaceAll('&amp;', '&');
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/153.0.0.0 Safari/537.36' } });
  if (!response.ok) throw new Error(`Font CSS: ${response.status}`);
  const css = await response.text();
  const manifest = {};
  await fs.mkdir(dir, { recursive: true });
  async function save(url, body, contentType, extension) {
    const file = crypto.createHash('sha256').update(url).digest('hex').slice(0, 20) + extension;
    await fs.writeFile(path.join(dir, file), body); manifest[url] = { file, contentType };
  }
  await save(url, css, 'text/css', '.css');
  for (const fontUrl of new Set([...css.matchAll(/url\((https:\/\/fonts.gstatic.com\/[^)]+)\)/g)].map(m => m[1]))) {
    const r = await fetch(fontUrl); if (!r.ok) throw new Error(`Font: ${r.status}`);
    await save(fontUrl, Buffer.from(await r.arrayBuffer()), r.headers.get('content-type') || 'font/woff2', path.extname(new URL(fontUrl).pathname));
  }
  await fs.writeFile(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Captured ${Object.keys(manifest).length} font resources`);
}
main().catch(e => { console.error(e); process.exitCode = 1; });
