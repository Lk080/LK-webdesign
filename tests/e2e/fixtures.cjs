const { test: base, expect } = require('@playwright/test');
const test = base.extend({
  networkGuard: [async ({ context }, use, testInfo) => {
    const errors = [], mocked = [];
    context.on('page', page => {
      page.on('pageerror', error => errors.push(`Uncaught: ${error.message}`));
      page.on('console', message => { if (message.type() === 'error') errors.push(`Console: ${message.text()}`); });
    });
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.hostname === 'formspree.io' || url.hostname.endsWith('.formspree.io')) {
        mocked.push({ method: route.request().method(), url: url.href });
        return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
      }
      // Keep this local smoke suite deterministic; no external service is contacted.
      if (url.origin !== 'http://127.0.0.1:4173') {
        return route.fulfill({ status: 200, contentType: url.hostname === 'fonts.googleapis.com' ? 'text/css' : 'text/plain', body: '' });
      }
      return route.continue();
    });
    await use();
    await testInfo.attach('network-and-console', { body: JSON.stringify({ mockedFormspree: mocked, errors }, null, 2), contentType: 'application/json' });
    expect(errors, 'Browser console errors and uncaught exceptions').toEqual([]);
  }, { auto: true }],
});
module.exports = { test, expect };
