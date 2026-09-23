const { test, expect } = require('@playwright/test');
const fs = require('node:fs/promises');
const { playwrightRoute } = require('../../scripts/qa-network.cjs');
const sites = require('./sites.cjs').filter(s => s.id === process.env.QA_SITE);
require('../../scripts/qa-projects.cjs').assertRunnable(process.env.QA_SITE);
for (const site of sites) test(`${site.id} visual reference and layout`, async ({ page, context }, testInfo) => {
  const errors = [], blocked = [];
  await context.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if (url.hostname === 'formspree.io' || url.hostname.endsWith('.formspree.io') || !['GET', 'HEAD'].includes(request.method())) {
      blocked.push(request.url()); return route.abort('blockedbyclient');
    }
    if (url.origin === 'http://127.0.0.1:4173' && url.pathname === '/__qa_visual.css') return route.fulfill({ contentType: 'text/css', body: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}' });
    return playwrightRoute(route, site.id, blocked);
  });
  page.on('pageerror', e => errors.push(e.message));
  const response = await page.goto(site.path);
  expect(response.status()).toBe(200);
  await page.addStyleTag({ url: 'http://127.0.0.1:4173/__qa_visual.css' });
  await page.evaluate(async () => {
    // Load lazy images without changing website files, then wait for intrinsic dimensions.
    for (const img of document.images) img.loading = 'eager';
    await document.fonts.ready;
    await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  if (site.id === 'lk') expect(await page.evaluate(() => [...document.fonts].some(f => f.family.includes('Manrope') && f.status === 'loaded'))).toBe(true);
  const layout = await page.evaluate(components => {
    const rect = e => { const r = e.getBoundingClientRect(); return { width: r.width, height: r.height, left: r.left, right: r.right }; };
    const sections = [...document.querySelectorAll('main > section')].map((e, i) => ({ name: e.id || e.className || `section-${i}`, ...rect(e) }));
    const width = document.documentElement.clientWidth;
    return { height: document.documentElement.scrollHeight, viewportHeight: innerHeight, viewportWidth: width,
      viewportCount: document.documentElement.scrollHeight / innerHeight, sectionCount: sections.length,
      sections, largestSections: [...sections].sort((a,b) => b.height-a.height).slice(0,5),
      overflow: document.documentElement.scrollWidth - width,
      components: Object.entries(components).map(([name, selector]) => ({ name, ...rect(document.querySelector(selector)) })),
      badImages: [...document.images].filter(img => img.getClientRects().length && (!img.naturalWidth || rect(img).width <= 0 || rect(img).height <= 0)).map(img => img.src),
    };
  }, site.components);
  await fs.writeFile(testInfo.outputPath('layout.json'), JSON.stringify({ metadata: testInfo.config.metadata, site: site.name, viewport: testInfo.project.name, ...layout }, null, 2));
  await testInfo.attach('layout', { path: testInfo.outputPath('layout.json'), contentType: 'application/json' });
  expect.soft(layout.overflow, 'Document horizontal overflow').toBeLessThanOrEqual(1);
  expect.soft(layout.badImages, 'Visible images must load and have dimensions').toEqual([]);
  for (const r of layout.components) {
    expect.soft(r.width, `${r.name} width`).toBeGreaterThan(20); expect.soft(r.height, `${r.name} height`).toBeGreaterThan(20);
    expect.soft(r.left, `${r.name} left edge`).toBeGreaterThanOrEqual(-1); expect.soft(r.right, `${r.name} right edge`).toBeLessThanOrEqual(layout.viewportWidth+1);
  }
  const screenshots = [];
  async function capture(name, locator) {
    await page.evaluate(() => scrollTo(0, 0));
    const filename = `${site.id}-${name}.png`;
    const actual = testInfo.outputPath(filename);
    const buffer = locator
      ? await locator.screenshot({ animations: 'disabled', caret: 'hide' })
      : await page.screenshot({ fullPage: true, animations: 'disabled', caret: 'hide' });
    await fs.writeFile(actual, buffer);
    expect.soft(buffer).toMatchSnapshot(filename, { threshold: 0, maxDiffPixels: 0 });
    screenshots.push({ name, file: filename });
  }
  await capture('full-page');
  for (const [name, selector] of Object.entries(site.components)) await capture(name, page.locator(selector));
  // Hit-test real controls after scrolling: avoids flagging intentional decoration/carousels.
  const controls = [site.cta];
  await page.evaluate(() => scrollTo(0, 0));
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  if (layout.viewportWidth <= (site.menuBreakpoint ?? 900)) {
    await page.evaluate(() => scrollTo(0,0)); await page.locator(site.menu || 'button.menu').click();
    await expect(page.locator(site.menu || 'button.menu')).toHaveAttribute('aria-expanded', 'true');
  }
  for (const link of await page.locator(`${site.nav} a`).all()) {
    await expect.soft(link).toBeInViewport();
    const box = await link.boundingBox();
    expect.soft(box && box.x >= -1 && box.x + box.width <= layout.viewportWidth + 1, 'Navigation horizontal bounds').toBeTruthy();
  }
  if (layout.viewportWidth <= (site.menuBreakpoint ?? 900)) await page.keyboard.press('Escape');
  for (const selector of controls) {
    const control = page.locator(selector); await control.scrollIntoViewIfNeeded();
    const hit = await control.evaluate(e => { const r=e.getBoundingClientRect(); const hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2); return hit===e || e.contains(hit); });
    expect.soft(hit, `${selector} usable, not clipped/covered`).toBe(true);
  }
  await fs.writeFile(testInfo.outputPath('screenshots.json'), JSON.stringify({ metadata: testInfo.config.metadata, site: site.name, viewport: testInfo.project.name, screenshots }, null, 2));
  await testInfo.attach('network', { body: JSON.stringify({ blocked, errors }), contentType: 'application/json' });
  expect(blocked.filter(event => event.action === 'reject')).toEqual([]);
  expect(errors).toEqual([]);
});
