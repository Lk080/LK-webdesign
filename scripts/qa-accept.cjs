'use strict';
// Copies only already-reviewed captures; never starts browsers or produces references.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { assertRunnable } = require('./qa-projects.cjs');
const { collect } = require('./qa-report.cjs');
const { root, inside } = require('./qa-run.cjs');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function accept(reviewFile, apply = false) {
  if (!reviewFile) throw Error('Use qa:visual:accept -- <review.json> [--apply]; no broad updates.');
  const review = JSON.parse(fs.readFileSync(reviewFile));
  assertRunnable(review.project);
  if (![review.reviewer, review.reason, review.evidence].every(value => typeof value === 'string' && value.trim()) || !Array.isArray(review.files) || !review.files.length) throw Error('Explicit reviewer, reason, evidence and files required');
  if (!fs.existsSync(path.resolve(root, review.evidence)) || !fs.statSync(path.resolve(root, review.evidence)).isFile()) throw Error('Review evidence does not exist');
  const { ctx, reports } = collect(review.run, review.project, 'visual');
  const targets = new Set();
  const changes = review.files.map(item => {
    if (!/^[a-z-]+$/.test(item.viewport) || path.basename(item.file) !== item.file || !item.file.startsWith(review.project + '-') || !item.file.endsWith('.png')) throw Error('Invalid reference scope');
    const report = reports.find(r => r.viewport === item.viewport && r.screenshots.some(s => s.file === item.file));
    if (!report) throw Error('Artifact not in run metadata');
    const source = path.resolve(ctx.dir, path.dirname(report.file), item.file);
    if (!inside(ctx.dir, source) || hash(source) !== item.sha256) throw Error('Reviewed artifact changed');
    const target = path.join(root, 'tests/visual/baselines', item.viewport, item.file);
    if (targets.has(target)) throw Error('Duplicate reference');
    targets.add(target);
    return { source, target, oldHash: fs.existsSync(target) ? hash(target) : null, newHash: item.sha256 };
  });
  console.log(JSON.stringify({ action: apply ? 'accept-reviewed' : 'plan-only', changes }, null, 2));
  if (apply) {
    const archive = fs.mkdtempSync(path.join(ctx.dir, 'acceptance-'));
    for (const [i, change] of changes.entries()) {
      if (change.oldHash) fs.copyFileSync(change.target, path.join(archive, `${i}-previous.png`));
      fs.mkdirSync(path.dirname(change.target), { recursive: true });
      fs.copyFileSync(change.source, change.target);
    }
    fs.writeFileSync(path.join(archive, 'review.json'), JSON.stringify({ ...review, changes, acceptedAt: new Date().toISOString() }, null, 2));
  }
  return changes;
}
if (require.main === module) { try { if (process.argv.length > 4 || process.argv[3] && process.argv[3] !== '--apply') throw Error('Invalid acceptance arguments'); accept(process.argv[2], process.argv[3] === '--apply'); } catch (error) { console.error(error.message); process.exitCode = 1; } }
module.exports = { accept };
