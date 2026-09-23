const path = require('node:path');
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(__dirname, '.cache/ms-playwright');
process.env.TMPDIR = path.join(__dirname, '.cache/tmp');
require('node:fs').mkdirSync(process.env.TMPDIR, { recursive: true });
const scope = require('./scripts/qa-run.cjs').playwrightScope(process.env.QA_KIND || 'functional');
const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests/e2e',
  testMatch: [...scope.project.qa.adapters.functional, ...scope.project.qa.adapters.axe].map(file => '**/' + file),
  fullyParallel: true, workers: 2, retries: 0,
  timeout: 30000, expect: { timeout: 5000 },
  outputDir: scope.outputDir,
  grep: new RegExp(scope.project.title),
  updateSnapshots: 'none',
  metadata: { ...scope.ctx.metadata, check: scope.check },
  reporter: [['list'], ['html', { outputFolder: path.join(scope.ctx.dir, scope.check + '-html'), open: 'never' }], ['json', { outputFile: path.join(scope.ctx.dir, scope.check + '.json') }]],
  use: { baseURL: 'http://127.0.0.1:4173', browserName: 'chromium',
    serviceWorkers: 'block', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop-chromium', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-chromium', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
  ],
  webServer: { command: 'node scripts/qa-server.cjs', url: 'http://127.0.0.1:4173', reuseExistingServer: false, timeout: 10000 },
});
