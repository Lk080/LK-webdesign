'use strict';
// Thin orchestration layer: existing tools own assertions; this file never approves a release.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const { projects: sites, getProject, assertRunnable } = require('./qa-projects.cjs');
const checks = ['smoke', 'functional', 'axe', 'visual', 'html', 'css', 'js', 'links', 'static', 'lighthouse', 'foundation', 'tooling'];
function parse(argv) {
  const options = { level: argv[0] };
  if (!['light', 'medium', 'final'].includes(options.level)) throw Error('Level: light, medium of final');
  for (let i = 1; i < argv.length; i++) {
    const key = argv[i];
    if (['--run', '--list'].includes(key)) options[key.slice(2)] = true;
    else if (['--site', '--check', '--project', '--grep', '--compare'].includes(key)) {
      if (!argv[i + 1] || argv[i + 1].startsWith('--')) throw Error(`Waarde ontbreekt: ${key}`);
      options[key.slice(2)] = argv[++i];
    } else throw Error(`Onbekend argument: ${key}`);
  }
  getProject(options.site);
  if (options.run && options.list) throw Error('--run en --list zijn afzonderlijke acties');
  if (options.compare && (options.run || options.list)) throw Error('--compare voert nooit tests uit');
  if (options.level === 'final' && (options.check || options.project || options.grep)) throw Error('Final scope mag niet worden versmald; gebruik light/medium voor een subset');
  if (options.level === 'light' && !options.check) throw Error('LIGHT vereist --check: selecteer de geraakte controle');
  if (options.run) assertRunnable(options.site);
  return options;
}
function plan(options) {
  const selected = options.check ? options.check.split(',') : options.level === 'medium' ? ['functional', 'axe', 'visual', 'links'] : sites[options.site].qa.required;
  if (selected.some(c => !checks.includes(c)) || new Set(selected).size !== selected.length) throw Error('Ongeldige of dubbele --check');
  if (selected.includes('static') && selected.some(c => ['html', 'css', 'js', 'links'].includes(c))) throw Error('static omvat al html, css, js en links');
  if (options.level === 'light' && selected.some(c => ['smoke', 'functional', 'axe', 'visual'].includes(c)) && !options.project) throw Error('LIGHT browsercheck vereist --project mobile, desktop of tablet');
  const projects = options.project ? options.project.split(',') : ['mobile', 'desktop'];
  if (projects.some(p => !['mobile', 'desktop', 'tablet'].includes(p))) throw Error('Project: mobile, desktop of tablet');
  if (projects.includes('tablet') && selected.some(c => ['smoke', 'functional', 'axe'].includes(c))) throw Error('Tablet is alleen in de visual-config beschikbaar; kies apart een gerichte functionele viewporttest');
  if (options.grep) new RegExp(options.grep);
  if (options.grep && !selected.some(c => ['smoke', 'functional'].includes(c))) throw Error('--grep geldt alleen voor functionele tests');
  const site = sites[options.site];
  const jobs = selected.map(check => {
    let args;
    if (['smoke', 'functional', 'axe', 'visual'].includes(check)) {
      const visual = check === 'visual';
      const title = visual ? `${options.site} visual reference` : site.title;
      const query = check === 'smoke' ? 'pagina laden en console' : check === 'functional' ? options.grep : undefined;
      const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const grep = query ? `(?=.*${escaped})(?=.*(?:${query}))` : escaped;
      args = ['node_modules/@playwright/test/cli.js', 'test', '--config', visual ? 'playwright.visual.config.cjs' : 'playwright.config.cjs'];
      if (!visual) args.push(...site.qa.adapters[check === 'axe' ? 'axe' : 'functional']);
      args.push('--grep', grep);
      if (options.level !== 'final' || !visual) {
        for (const p of projects) args.push('--project', visual ? { mobile: 'mobile-standard', desktop: 'desktop', tablet: 'tablet' }[p] : `${p}-chromium`);
      }
      // Output and reporters are owned by the shared scoped Playwright config.
      if (visual) args.push('--update-snapshots=none');
    } else if (check === 'foundation' || check === 'tooling') args = [`scripts/qa-${check}.cjs`, options.site];
    else if (check === 'lighthouse') args = ['scripts/qa-lighthouse.cjs', options.site];
    else args = ['scripts/qa-static.cjs', check === 'static' ? 'all' : check, options.site];
    return { check, args };
  });
  return jobs;
}
function fingerprint(options, jobs) {
  const state = require('./qa-state.cjs').snapshot(options.site);
  const hash = crypto.createHash('sha256')
    .update(JSON.stringify({ state, level: options.level, site: options.site, jobs }))
    .digest('hex');
  return { hash, ...state };
}
function main(argv) {
  const options = parse(argv);
  const jobs = plan(options);
  console.log(JSON.stringify({ level: options.level, site: options.site, action: options.run ? 'run' : options.list ? 'discovery-only' : options.compare ? 'compare-metadata' : 'plan-only', jobs }, null, 2));
  if (!options.run && !options.list && !options.compare) return;
  if (options.list) {
    for (const job of jobs.filter(j => j.args[0].includes('playwright'))) {
      const args = job.args;
      const result = spawnSync(process.execPath, [...args, '--list', '--reporter=list'], { cwd: root, stdio: 'inherit', env: { ...process.env, QA_SITE: options.site, QA_CHECK: job.check } });
      if (result.error || result.status !== 0) throw Error(`Discovery mislukt: ${job.check}`);
    }
    console.log('Alleen testdiscovery; GEEN PASS-bewijs en geen browser gestart.');
    return;
  }
  const source = fingerprint(options, jobs);
  if (options.compare) {
    const previous = JSON.parse(fs.readFileSync(path.resolve(root, options.compare)));
    const matches = previous.source?.hash === source.hash && previous.status === 'CHECKS_COMPLETED' && previous.results?.length === jobs.length && previous.results.every(r => r.exitCode === 0);
    console.log(matches ? 'Metadata gelijk. Hergebruik alleen na controle van omgevingswijzigingen en regressiesignalen; geen automatische PASS.' : 'Geen geldig overeenkomend resultaat. Relevante controle opnieuw uitvoeren.');
    process.exitCode = matches ? 0 : 1;
    return;
  }
  const run = require('./qa-run.cjs').createRun(options.site, options.level).dir;
  const record = { schema: 1, started: new Date().toISOString(), level: options.level, site: options.site, source, commit: spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout?.trim(), jobs, status: 'RUNNING', results: [], manualReview: 'PENDING — geen FINAL QUALITY GATE PASS door dit script' };
  const save = () => fs.writeFileSync(path.join(run, 'record.json'), JSON.stringify(record, null, 2));
  save();
  for (const job of jobs) {
    const args = job.args.map(a => a.replace('{run}', run));
    const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit', env: { ...process.env, QA_RUN_DIR: run, QA_SITE: options.site, QA_CHECK: job.check } });
    record.results.push({ check: job.check, exitCode: result.status ?? 1, error: result.error?.message, finished: new Date().toISOString() });
    save();
  }
  record.status = record.results.every(r => r.exitCode === 0) ? 'CHECKS_COMPLETED' : 'CHECKS_FAILED';
  if (fingerprint(options, jobs).hash !== source.hash) record.status = 'SOURCE_CHANGED_DURING_RUN';
  record.finished = new Date().toISOString();
  const evidence = require('./qa-evidence.cjs').finish(require('./qa-run.cjs').loadRun(run, options.site), jobs, record.results);
  if (evidence.errors.length) record.status = 'CHECKS_FAILED';
  record.evidence = 'evidence.json';
  save();
  console.log(`Bewijs: ${path.relative(root, run)}/record.json\n${record.status}; menselijke review en dekking blijven vereist. Technische dekking staat in evidence.json; owner-review blijft afzonderlijk.`);
  process.exitCode = record.status === 'CHECKS_COMPLETED' ? 0 : 1;
}
if (require.main === module) { try { main(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exitCode = 1; } }
module.exports = { parse, plan, fingerprint };
