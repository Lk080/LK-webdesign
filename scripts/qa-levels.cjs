'use strict';
// Thin orchestration layer: existing tools own assertions; this file never approves a release.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const sites = { automotive: { title: 'Automotive', source: 'docs/demos/automotive', frozen: false }, beauty: { title: 'Beauty', source: 'docs/demos/beauty', frozen: false }, lk: { title: 'LK Webdesign', source: 'docs', frozen: false }, kelmora: { title: 'Kelmora', source: 'docs/demos/vakman', frozen: true } };
const checks = ['smoke', 'functional', 'axe', 'visual', 'html', 'css', 'js', 'links', 'static', 'lighthouse'];
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
  if (!sites[options.site]) throw Error('Kies expliciet --site lk, --site kelmora, --site beauty of --site automotive. Nieuwe sites pas registreren zodra ze bestaan.');
  if (options.run && options.list) throw Error('--run en --list zijn afzonderlijke acties');
  if (options.compare && (options.run || options.list)) throw Error('--compare voert nooit tests uit');
  if (options.level === 'final' && (options.check || options.project || options.grep)) throw Error('Final scope mag niet worden versmald; gebruik light/medium voor een subset');
  if (options.level === 'light' && !options.check) throw Error('LIGHT vereist --check: selecteer de geraakte controle');
  if (options.run && sites[options.site].frozen) throw Error('Kelmora Final is bevroren. Geen uitvoering via deze workflow zonder nieuwe opdracht en bewuste beleidsaanpassing.');
  return options;
}
function plan(options) {
  const selected = options.check ? options.check.split(',') : options.level === 'medium' ? ['functional', 'axe', 'visual', 'links'] : ['functional', 'axe', 'visual', 'static', 'lighthouse'];
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
      if (!visual) args.push(options.site === 'automotive' ? (check === 'axe' ? 'automotive-accessibility.spec.cjs' : 'automotive-flows.spec.cjs') : options.site === 'beauty' ? (check === 'axe' ? 'beauty-accessibility.spec.cjs' : 'beauty-flows.spec.cjs') : check === 'axe' ? 'accessibility.spec.cjs' : 'sites.spec.cjs', ...(check === 'functional' && options.site === 'kelmora' ? ['kelmora-flows.spec.cjs'] : []));
      args.push('--grep', grep);
      if (options.level !== 'final' || !visual) {
        for (const p of projects) args.push('--project', visual ? { mobile: 'mobile-standard', desktop: 'desktop', tablet: 'tablet' }[p] : `${p}-chromium`);
      }
      args.push('--output', `{run}/${check}`, '--reporter', 'list,json');
      if (visual) args.push('--update-snapshots=none');
    } else if (check === 'lighthouse') args = ['scripts/qa-lighthouse.cjs', options.site];
    else args = ['scripts/qa-static.cjs', check === 'static' ? 'all' : check, options.site];
    return { check, args };
  });
  return jobs;
}
function fingerprint(options, jobs) {
  const paths = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
      const file = `${dir}/${entry.name}`;
      if (options.site === 'lk' && file === 'docs/demos') continue;
      if (entry.isSymbolicLink()) throw Error(`Symlink niet opgenomen in reuse-scope: ${file}`);
      if (entry.isDirectory()) walk(file); else paths.push(file);
    }
  }
  walk(sites[options.site].source);
  walk('scripts'); walk('tests');
  for (const file of ['package.json', 'package-lock.json', 'playwright.config.cjs', 'playwright.visual.config.cjs', '.htmlhintrc', 'eslint.config.cjs', 'stylelint.config.mjs']) paths.push(file);
  const hash = crypto.createHash('sha256');
  for (const file of paths.sort()) hash.update(file).update(fs.readFileSync(path.join(root, file)));
  process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '.cache/ms-playwright');
  const executable = require('playwright').chromium.executablePath();
  const binary = fs.statSync(executable);
  const environment = { node: process.version, platform: process.platform, architecture: process.arch, os: os.release(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, browser: { executable, size: binary.size, modified: binary.mtimeMs }, packages: Object.fromEntries(['@playwright/test', '@axe-core/playwright', 'lighthouse'].map(p => [p, JSON.parse(fs.readFileSync(path.join(root, 'node_modules', p, 'package.json'), 'utf8')).version])) };
  hash.update(JSON.stringify({ level: options.level, site: options.site, jobs, environment }));
  return { hash: hash.digest('hex'), files: paths.length, environment };
}
function main(argv) {
  const options = parse(argv);
  const jobs = plan(options);
  console.log(JSON.stringify({ level: options.level, site: options.site, action: options.run ? 'run' : options.list ? 'discovery-only' : options.compare ? 'compare-metadata' : 'plan-only', jobs }, null, 2));
  if (!options.run && !options.list && !options.compare) return;
  if (options.list) {
    for (const job of jobs.filter(j => j.args[0].includes('playwright'))) {
      const args = job.args.slice(0, job.args.indexOf('--output'));
      const result = spawnSync(process.execPath, [...args, '--list', '--reporter=list'], { cwd: root, stdio: 'inherit' });
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
  const run = fs.mkdtempSync(path.join(ensureRuns(), `${options.site}-${options.level}-`));
  const record = { schema: 1, started: new Date().toISOString(), level: options.level, site: options.site, source, commit: spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout?.trim(), jobs, status: 'RUNNING', results: [], manualReview: 'PENDING — geen FINAL QUALITY GATE PASS door dit script' };
  const save = () => fs.writeFileSync(path.join(run, 'record.json'), JSON.stringify(record, null, 2));
  save();
  for (const job of jobs) {
    const args = job.args.map(a => a.replace('{run}', run));
    const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit', env: { ...process.env, QA_STATIC_OUTPUT: path.join(run, 'static'), PLAYWRIGHT_JSON_OUTPUT_FILE: path.join(run, `${job.check}.json`) } });
    record.results.push({ check: job.check, exitCode: result.status ?? 1, error: result.error?.message, finished: new Date().toISOString() });
    save();
  }
  record.status = record.results.every(r => r.exitCode === 0) ? 'CHECKS_COMPLETED' : 'CHECKS_FAILED';
  if (fingerprint(options, jobs).hash !== source.hash) record.status = 'SOURCE_CHANGED_DURING_RUN';
  record.finished = new Date().toISOString(); save();
  console.log(`Bewijs: ${path.relative(root, run)}/record.json\n${record.status}; menselijke review en dekking blijven vereist. Lighthouse-exitcode bewijst geen targets.`);
  process.exitCode = record.status === 'CHECKS_COMPLETED' ? 0 : 1;
}
function ensureRuns() { const dir = path.join(root, 'test-results/qa-runs'); fs.mkdirSync(dir, { recursive: true }); return dir; }
if (require.main === module) { try { main(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exitCode = 1; } }
module.exports = { parse, plan, fingerprint };
