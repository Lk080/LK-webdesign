const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '../docs');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };
function inside(file) { return file === root || file.startsWith(root + path.sep); }
const server = http.createServer(async (req, res) => {
  const reply = (code, text) => { res.writeHead(code, { 'Content-Type': 'text/plain' }); res.end(text); };
  if (!['GET', 'HEAD'].includes(req.method)) return reply(405, 'Method not allowed');
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1:4173').pathname);
    if (pathname.includes('\0')) return reply(400, 'Bad request');
    let file = path.resolve(root, '.' + pathname);
    if (!inside(file)) return reply(403, 'Forbidden');
    file = await fs.realpath(file);
    if (!inside(file)) return reply(403, 'Forbidden');
    if ((await fs.stat(file)).isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(301, { Location: pathname + '/' }); return res.end(); }
      file = await fs.realpath(path.join(file, 'index.html'));
    }
    if (!inside(file)) return reply(403, 'Forbidden');
    const body = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) { reply(['ENOENT', 'ENOTDIR'].includes(error.code) ? 404 : error instanceof URIError ? 400 : 500, 'Request failed'); }
});
server.listen(4173, '127.0.0.1', () => console.log('QA: http://127.0.0.1:4173 (docs only)'));
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close());
