const path = require('node:path');
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(__dirname, '.cache/ms-playwright');
process.env.TMPDIR = path.join(__dirname, '.cache/tmp');
require('node:fs').mkdirSync(process.env.TMPDIR, { recursive: true });
const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests/e2e', fullyParallel: true, workers: 2, retries: 0,
  timeout: 30000, expect: { timeout: 5000 },
  outputDir: './test-results',
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],
  use: { baseURL: 'http://127.0.0.1:4173', browserName: 'chromium',
    serviceWorkers: 'block', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop-chromium', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-chromium', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
  ],
  webServer: { command: 'node scripts/qa-server.cjs', url: 'http://127.0.0.1:4173', reuseExistingServer: false, timeout: 10000 },
});
