const { defineConfig } = require('@playwright/test');
process.env.QA_KIND = 'visual';
const base = require('./playwright.config.cjs');
module.exports = defineConfig({
  ...base, testDir: './tests/visual', testMatch: '**/*.spec.cjs',
  timeout: 90000, workers: 1, fullyParallel: false,
  updateSnapshots: 'none',
  grep: new RegExp(`${process.env.QA_SITE} visual reference`),
  snapshotPathTemplate: '{testDir}/baselines/{projectName}/{arg}{ext}',
  expect: { timeout: 10000, toHaveScreenshot: { animations: 'disabled', caret: 'hide', scale: 'css', threshold: 0, maxDiffPixels: 0 } },
  use: { ...base.use, reducedMotion: 'reduce', locale: 'nl-BE', timezoneId: 'Europe/Brussels', colorScheme: 'light', deviceScaleFactor: 1 },
  projects: [
    ['mobile-small', 375, 812], ['mobile-standard', 390, 844], ['tablet', 768, 1024], ['desktop', 1440, 900], ['large-desktop', 1920, 1080],
  ].map(([name, width, height]) => ({ name, use: { viewport: { width, height }, isMobile: width < 768, hasTouch: width <= 768 } })),
});
