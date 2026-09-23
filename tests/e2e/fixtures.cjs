const { test: base, expect } = require('@playwright/test');
const { assertRunnable } = require('../../scripts/qa-projects.cjs');
const { playwrightRoute, decision } = require('../../scripts/qa-network.cjs');
const test = base.extend({
  networkGuard: [async ({ context }, use, testInfo) => {
    const project = assertRunnable(process.env.QA_SITE);
    if (!testInfo.titlePath.some(title => title.includes(project.title))) throw Error('Test/project scope mismatch');
    const errors = [], network = [];
    context.on('page', page => {
      page.on('pageerror', error => errors.push(`Uncaught: ${error.message}`));
      page.on('console', message => { if (message.type() === 'error') errors.push(`Console: ${message.text()}`); });
    });
    await context.route('**/*', route => playwrightRoute(route, project.id, network));
    await use();
    await testInfo.attach('network-and-console', { body: JSON.stringify({ metadata: testInfo.config.metadata, network, errors }, null, 2), contentType: 'application/json' });
    expect(network.filter(event => event.action === 'reject'), 'Unexpected network dependencies').toEqual([]);
    expect(errors, 'Browser console errors and uncaught exceptions').toEqual([]);
  }, { auto: true }],
  request: async ({ request }, use) => {
    // APIRequestContext does not use browser routing. Guard it separately.
    await use(new Proxy(request, { get(target, key) {
      if (!['get','head','post','put','patch','delete','fetch'].includes(key)) return typeof target[key] === 'function' ? target[key].bind(target) : target[key];
      return (url, options = {}) => {
        const address = typeof url === 'string' ? new URL(url, 'http://127.0.0.1:4173').href : url.url();
        const action = decision(address, options.method || (key === 'fetch' ? 'GET' : key.toUpperCase()), process.env.QA_SITE);
        if (action.action !== 'continue' || new URL(address).origin !== 'http://127.0.0.1:4173') throw Error('API requests are local read-only');
        return target[key](url, { ...options, maxRedirects: 0 });
      };
    } }));
  },
});
module.exports = { test, expect };
