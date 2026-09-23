const { test } = require('node:test');
const assert = require('node:assert/strict');
const { parse, plan } = require('./qa-levels.cjs');
const build = args => plan(parse(args));
test('light selects exactly one mobile smoke with intersection grep', () => {
  const jobs = build(['light', '--site', 'lk', '--check', 'smoke', '--project', 'mobile']);
  assert.equal(jobs.length, 1);
  assert(jobs[0].args.includes('mobile-chromium'));
  const pattern = new RegExp(jobs[0].args[jobs[0].args.indexOf('--grep') + 1]);
  assert(pattern.test('LK Webdesign pagina laden en console'));
  assert(!pattern.test('Kelmora pagina laden en console'));
});
test('medium does not silently include Lighthouse or all viewports', () => {
  const jobs = build(['medium', '--site', 'lk']);
  assert(!jobs.some(j => j.check === 'lighthouse'));
  const visual = jobs.find(j => j.check === 'visual');
  assert(visual.args.includes('mobile-standard'));
  assert(visual.args.includes('--update-snapshots=none'));
});
test('final cannot be narrowed and includes all necessary tool categories', () => {
  const jobs = build(['final', '--site', 'lk']);
  assert.deepEqual(jobs.map(j => j.check), require('./qa-projects.cjs').projects.lk.qa.required);
  assert(!jobs.find(j => j.check === 'visual').args.includes('--project'));
  assert.throws(() => build(['final', '--site', 'lk', '--check', 'smoke']));
});
test('unsafe or ambiguous selection fails before execution', () => {
  for (const args of [
    ['light', '--site', 'lk'],
    ['light', '--site', 'lk', '--check', 'axe'],
    ['medium', '--site', 'unknown'],
    ['light', '--site', 'lk', '--check', 'static,html'],
    ['medium', '--site', 'lk', '--project', 'tablet'],
    ['final', '--site', 'kelmora', '--run'],
    ['light', '--site', 'lk', '--check', 'html', '--run', '--list'],
    ['medium', '--site', 'lk', '--update-snapshots=all'],
  ]) assert.throws(() => build(args));
});
