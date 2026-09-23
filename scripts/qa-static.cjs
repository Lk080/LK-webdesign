const fs = require('node:fs/promises');
const path = require('node:path');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const output = process.env.QA_STATIC_OUTPUT ? path.resolve(process.env.QA_STATIC_OUTPUT) : path.join(root, 'test-results/static');
const excluded = new Set(['node_modules', 'test-results', 'playwright-report', '.cache', 'vendor', 'vendors']);
async function walk(dir) { const entries = await fs.readdir(dir, { withFileTypes: true }); return (await Promise.all(entries.filter(e => !excluded.has(e.name)).map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat(); }
const website = file => file.includes('/docs/demos/automotive/') ? 'Automotive' : file.includes('/docs/demos/beauty/') ? 'Beauty' : file.includes('/docs/demos/vakman/') ? 'Kelmora' : file.includes('/docs/demos/') ? 'Future demo' : 'LK Webdesign';
async function main() {
  process.chdir(root);
  const mode = process.argv[2] || 'all';
  if (!['all', 'html', 'css', 'js', 'links'].includes(mode)) throw new Error('Unknown QA mode');
  const site = process.argv[3];
  if (site && !['lk', 'kelmora', 'beauty', 'automotive'].includes(site)) throw new Error('Unknown QA site');
  const inScope = file => !site || (site === 'automotive' ? file.includes('/docs/demos/automotive/') : site === 'beauty' ? file.includes('/docs/demos/beauty/') : site === 'kelmora' ? file.includes('/docs/demos/vakman/') : !file.includes('/docs/demos/'));
  await fs.mkdir(output, { recursive: true });
  const files = (await walk(path.join(root, 'docs'))).filter(f => inScope(f) && !/\.min\.(js|css)$/.test(f));
  let errors = 0;
  for (const tool of mode === 'all' ? ['html', 'css', 'js', 'links'] : [mode]) {
    const findings = [], raw = [];
    if (tool === 'html') {
      const { HTMLHint } = require('htmlhint'); require('./qa-html-rules.cjs')(HTMLHint);
      const config = JSON.parse(await fs.readFile('.htmlhintrc', 'utf8'));
      for (const file of files.filter(f => f.endsWith('.html'))) {
        const messages = HTMLHint.verify(await fs.readFile(file, 'utf8'), config); raw.push({ file, messages });
        for (const m of messages) findings.push({ website: website(file), file: path.relative(root, file), line: m.line, column: m.col, rule: m.rule.id, classification: m.type === 'error' ? 'ERROR' : 'WARNING', message: m.message });
      }
    }
    if (tool === 'css') {
      const { default: stylelint } = await import('stylelint');
      const result = await stylelint.lint({ files: files.filter(f => f.endsWith('.css')), configFile: path.join(root, 'stylelint.config.mjs'), fix: false });
      raw.push(...result.results.map(r => ({ source: r.source, warnings: r.warnings, parseErrors: r.parseErrors, invalidOptionWarnings: r.invalidOptionWarnings, deprecations: r.deprecations })));
      for (const r of result.results) for (const m of [...r.warnings, ...r.parseErrors]) findings.push({ website: website(r.source), file: path.relative(root, r.source), line: m.line, column: m.column, rule: m.rule || 'parse', classification: m.severity === 'warning' ? 'WARNING' : 'ERROR', message: m.text });
    }
    if (tool === 'js') {
      const { ESLint } = require('eslint'); const eslint = new ESLint({ fix: false });
      const result = await eslint.lintFiles(files.filter(f => f.endsWith('.js'))); raw.push(...result);
      for (const r of result) for (const m of r.messages) findings.push({ website: website(r.filePath), file: path.relative(root, r.filePath), line: m.line, column: m.column, rule: m.ruleId || 'parse', classification: m.severity === 2 ? 'ERROR' : 'WARNING', message: m.message });
    }
    if (tool === 'links') {
      const server = spawn(process.execPath, ['scripts/qa-server.cjs'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
      try {
        await new Promise((resolve, reject) => { const timer = setTimeout(() => reject(new Error('QA server timeout')), 10000); server.once('error', e => { clearTimeout(timer); reject(e); }); server.once('exit', code => { clearTimeout(timer); reject(new Error(`QA server exited ${code}; port may be occupied`)); }); server.stdout.once('data', () => { clearTimeout(timer); resolve(); }); });
        const { LinkChecker } = await import('linkinator');
        for (const target of [{ id: 'automotive', name: 'Automotive', path: '/demos/automotive/' }, { id: 'beauty', name: 'Beauty', path: '/demos/beauty/' }, { id: 'lk', name: 'LK Webdesign', path: '/' }, { id: 'kelmora', name: 'Kelmora', path: '/demos/vakman/' }].filter(target => !site || site === target.id)) {
          const origin = 'http://127.0.0.1:4173';
          const result = await new LinkChecker().check({ path: origin + target.path, recurse: true, checkCss: true, checkFragments: true, redirects: 'error', retry: false, retryErrors: false, timeout: 10000, concurrency: 4,
            linksToSkip: async link => { try { const u = new URL(link); return u.origin !== origin || (site === 'automotive' && !u.pathname.startsWith('/demos/automotive/')) || (site === 'beauty' && !u.pathname.startsWith('/demos/beauty/')) || (site === 'lk' && u.pathname.startsWith('/demos/')) || (site === 'kelmora' && !u.pathname.startsWith('/demos/vakman/')); } catch { return true; } },
          });
          raw.push({ website: target.name, ...result });
          for (const l of result.links) if (l.state !== 'OK') findings.push({ website: target.name, file: l.parent || target.path, rule: l.state === 'BROKEN' ? 'broken-local-link' : 'external-not-checked', classification: l.state === 'BROKEN' ? 'ERROR' : 'INFO', message: `${l.state}: ${l.url}${l.status ? ` (${l.status})` : ''}`, details: l.failureDetails });
        }
      } finally { server.kill('SIGTERM'); (await import('linkinator')).resetSharedAgents(); }
    }
    const report = { tool, scope: `Own HTML/CSS/JS: ${site || 'all sites'}; external and out-of-scope URLs never requested`, findings, raw };
    await fs.writeFile(path.join(output, `${tool}.json`), JSON.stringify(report, null, 2));
    const counts = Object.fromEntries(['ERROR', 'WARNING', 'INFO'].map(c => [c, findings.filter(f => f.classification === c).length])); errors += counts.ERROR;
    console.log(`${tool}: ${JSON.stringify(counts)}`);
  }
  process.exitCode = errors ? 1 : 0;
}
main().catch(e => { console.error(e); process.exitCode = 1; });
