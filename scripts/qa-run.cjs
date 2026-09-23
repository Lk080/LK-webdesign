'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { assertRunnable } = require('./qa-projects.cjs');
const root = path.resolve(__dirname, '..');
const runs = path.join(root, 'test-results/qa-runs');
function inside(parent, file) {
  const relative = path.relative(parent, file);
  return relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative);
}
function createRun(project, kind) {
  assertRunnable(project);
  if (!/^[a-z-]+$/.test(kind)) throw Error('Invalid run kind');
  fs.mkdirSync(runs, { recursive: true });
  const dir = fs.mkdtempSync(path.join(runs, `${project}-${kind}-`));
  const metadata = { schema: 2, runId: randomUUID(), project, kind, started: new Date().toISOString(), snapshot: require('./qa-state.cjs').snapshot(project) };
  fs.writeFileSync(path.join(dir, 'run.json'), JSON.stringify(metadata, null, 2), { flag: 'wx' });
  return { dir, metadata };
}
function loadRun(dir, project) {
  dir = fs.realpathSync(path.resolve(dir));
  if (!inside(fs.realpathSync(runs), dir)) throw Error('Run must be an explicit child of test-results/qa-runs');
  const metadata = JSON.parse(fs.readFileSync(path.join(dir, 'run.json')));
  if (metadata.schema !== 2 || metadata.project !== project || !metadata.runId) throw Error('Run/project metadata mismatch');
  return { dir, metadata };
}
function context(project, kind) {
  assertRunnable(project);
  return process.env.QA_RUN_DIR ? loadRun(process.env.QA_RUN_DIR, project) : createRun(project, kind);
}
function reserve(ctx, check) {
  if (!/^[a-z-]+$/.test(check)) throw Error('Invalid check');
  const dir = path.join(ctx.dir, check);
  // Never reuse a check directory: Playwright recursively cleans its outputDir.
  fs.mkdirSync(dir);
  fs.writeFileSync(path.join(ctx.dir, `${check}.scope.json`), JSON.stringify({ ...ctx.metadata, check }, null, 2), { flag: 'wx' });
  return dir;
}
function stamp(ctx, check, data) { return { ...data, metadata: { ...ctx.metadata, check } }; }
function cliValue(args, flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : args.find(a => a.startsWith(flag + '='))?.slice(flag.length + 1);
}
function playwrightScope(kind) {
  const args = process.argv.slice(2);
  for (const key of ['PLAYWRIGHT_JSON_OUTPUT_FILE','PLAYWRIGHT_JSON_OUTPUT_DIR','PLAYWRIGHT_JSON_OUTPUT_NAME','PLAYWRIGHT_HTML_OUTPUT_DIR']) delete process.env[key];
  const site = process.env.QA_SITE;
  const project = assertRunnable(site);
  if (args.some(a => a === '-u' || a.startsWith('--update-snapshots') && a !== '--update-snapshots=none')) throw Error('Use qa:visual:accept with explicit reviewed artifacts; browser updates are disabled.');
  if (cliValue(args, '--output')) throw Error('Output overrides are disabled; every run owns a fresh artifact directory.');
  const ctx = context(site, kind);
  const check = process.env.QA_CHECK || kind;
  let outputDir;
  if (process.env.TEST_WORKER_INDEX !== undefined) {
    // Playwright reloads the config in each worker. Only the launcher reserves output.
    outputDir = path.join(ctx.dir, check);
    const scope = JSON.parse(fs.readFileSync(path.join(ctx.dir, `${check}.scope.json`)));
    if (scope.runId !== ctx.metadata.runId || scope.check !== check) throw Error('Worker scope mismatch');
  } else {
    outputDir = reserve(ctx, check);
  }
  process.env.QA_RUN_DIR = ctx.dir;
  process.env.QA_CHECK = check;
  console.log(`QA run: ${ctx.dir} (${site}/${check})`);
  return { project, ctx, check, outputDir };
}
module.exports = { root, runs, inside, createRun, loadRun, context, reserve, stamp, playwrightScope };
