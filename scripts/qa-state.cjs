'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const os = require('node:os');
const { getProject } = require('./qa-projects.cjs');
const root = path.resolve(__dirname, '..');
function files(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    if (e.isSymbolicLink()) throw Error(`Untracked symlink policy: ${dir}/${e.name}`);
    const file = path.join(dir, e.name);
    return e.isDirectory() ? files(file) : [file];
  });
}
function digest(paths) {
  const hash = crypto.createHash('sha256');
  for (const file of [...new Set(paths)].sort()) hash.update(path.relative(root, file)).update(fs.readFileSync(file));
  return hash.digest('hex');
}
function snapshot(id) {
  const project = getProject(id);
  const source = files(path.join(root, project.source)).filter(f => id !== 'lk' || !f.includes('/docs/demos/'));
  const baselines = files(path.join(root, 'tests/visual/baselines')).filter(f => path.basename(f).startsWith(id + '-'));
  const configs = ['package.json','package-lock.json','playwright.config.cjs','playwright.visual.config.cjs','.htmlhintrc','eslint.config.cjs','stylelint.config.mjs'].map(f => path.join(root, f));
  configs.push(...files(path.join(root, 'scripts')), ...files(path.join(root, 'tests')).filter(f => !f.includes('/baselines/')));
  process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '.cache/ms-playwright');
  const browser = require('playwright').chromium.executablePath();
  const stat = fs.existsSync(browser) ? fs.statSync(browser) : null;
  return {
    source: digest(source), configuration: digest(configs), baselines: digest(baselines),
    environment: { node: process.version, platform: process.platform, arch: process.arch, os: os.release(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      browser: { path: browser, size: stat?.size, modified: stat?.mtimeMs },
      packages: Object.fromEntries(['@playwright/test','@axe-core/playwright','lighthouse'].map(p => [p, JSON.parse(fs.readFileSync(path.join(root,'node_modules',p,'package.json'))).version])) },
  };
}
module.exports = { files, digest, snapshot };
