'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { loadRun, inside } = require('./qa-run.cjs');
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.isSymbolicLink()) throw Error('Symlink artifacts are not supported');
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
function collect(dir, project, kind) {
  const ctx = loadRun(dir, project);
  if (!['axe', 'static', 'visual'].includes(kind)) throw Error('Unknown report kind');
  const allowed = kind === 'static' ? ['static','html','css','js','links','foundation','tooling'] : [kind];
  const reports = [];
  for (const check of allowed) {
    const checkDir = path.join(ctx.dir, check);
    if (!fs.existsSync(checkDir)) continue;
    for (const file of walk(checkDir)) {
      // Attachments duplicate Axe JSON; use the canonical test output only.
      if (file.split(path.sep).includes('attachments')) continue;
      const name = path.basename(file);
      if (!(kind === 'axe' ? /^axe-(?!raw).+\.json$/.test(name) : kind === 'visual' ? name === 'screenshots.json' : /^(html|css|js|links|foundation|tooling)\.json$/.test(name))) continue;
      const report = JSON.parse(fs.readFileSync(file));
      if (report.metadata?.runId !== ctx.metadata.runId || report.metadata?.project !== project) throw Error(`Mixed or legacy metadata: ${file}`);
      reports.push({ file: path.relative(ctx.dir, file), ...report });
    }
  }
  if (!reports.length) throw Error('No scoped reports found; historical/legacy runs are never inferred.');
  return { ctx, reports };
}
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
function main(kind, args = process.argv.slice(2)) {
  const [dir, project] = args;
  if (!dir || !project || args.length !== 2) throw Error('Usage: <run-directory> <project-id>');
  const { ctx, reports } = collect(dir, project, kind);
  const json = { metadata: ctx.metadata, kind, reports };
  fs.writeFileSync(path.join(ctx.dir, `${kind}-report.json`), JSON.stringify(json, null, 2));
  if (kind === 'visual') {
    let html = '<!doctype html><meta charset="utf-8"><title>Scoped visual review</title><h1>Visual review — owner approval pending</h1>';
    for (const report of reports) {
      html += `<h2>${escape(project)} / ${escape(report.viewport)}</h2>`;
      for (const shot of report.screenshots) {
        const file = path.resolve(ctx.dir, path.dirname(report.file), shot.file);
        if (!inside(ctx.dir, file) || !fs.existsSync(file)) throw Error('Invalid screenshot artifact');
        const url = path.relative(ctx.dir, file).split(path.sep).map(encodeURIComponent).join('/');
        html += `<figure><a href="${url}"><img style="max-width:360px" src="${url}" alt="${escape(shot.name)}" loading="lazy"></a><figcaption>${escape(shot.name)}</figcaption></figure>`;
      }
    }
    fs.writeFileSync(path.join(ctx.dir, 'visual-index.html'), html);
  } else {
    const lines = [`# ${kind} — ${project}`, '', `Run: ${ctx.metadata.runId}`, ''];
    for (const report of reports) {
      lines.push(`## ${report.state || report.tool} ${report.viewport || ''}`, '', '```json', JSON.stringify(kind === 'axe' ? { counts: report.counts, violations: report.violations, incomplete: report.incomplete } : report.findings, null, 2), '```', '');
    }
    fs.writeFileSync(path.join(ctx.dir, `${kind}-report.md`), lines.join('\n'));
  }
  console.log(`${reports.length} scoped records: ${ctx.dir}`);
}
module.exports = { collect, main };
