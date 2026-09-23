const { test, expect } = require('./fixtures.cjs');
const { getProject } = require('../../scripts/qa-projects.cjs');
const adapters = {
  lk: { title: /LK Webdesign/, nav: '#main-nav', ctas: ['.hero-actions a.button', 'header .nav-cta'], target: '#contact' },
  kelmora: { title: /Kelmora Techniek/, nav: '#nav', ctas: ['.hero .button.primary', 'header .header-cta'], target: '#keuzehulp' },
};
const selected = getProject(process.env.QA_SITE);
const sites = adapters[selected.id] ? [{ ...adapters[selected.id], name: selected.title, path: selected.route }] : [];
for (const site of sites) test.describe(site.name, () => {
  test.beforeEach(async ({ page }) => { const response = await page.goto(site.path); expect(response.status()).toBe(200); });
  test('pagina laden en console', async ({ page }) => {
    await expect(page).toHaveTitle(site.title);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    expect(await page.locator('img').evaluateAll(images => images.filter(i => i.loading !== 'lazy' && (!i.complete || i.naturalWidth === 0)).map(i => i.src))).toEqual([]);
  });
  test('hoofdnavigatie', async ({ page, isMobile }) => {
    const links = page.locator(`${site.nav} a`);
    expect(await links.count()).toBeGreaterThan(0);
    for (let i = 0; i < await links.count(); i++) {
      if (isMobile) await page.locator('button.menu').click();
      const target = await links.nth(i).getAttribute('href');
      await links.nth(i).click();
      await expect(page.locator(target)).toBeInViewport();
    }
  });
  test('primaire CTAs', async ({ page }) => {
    for (const selector of site.ctas) {
      await page.goto(site.path);
      const link = page.locator(selector);
      // A header CTA may intentionally be hidden on mobile; the hero CTA is always required.
      if (selector.startsWith('header') && !await link.isVisible()) continue;
      const target = await link.getAttribute('href');
      await link.click();
      await expect(page.locator(target)).toBeInViewport();
      if (site.name === 'LK Webdesign') await expect(page.locator('#interest')).toHaveValue('Ik wil even overleggen');
    }
  });
  test('mobiele navigatie openen en sluiten', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Alleen mobiel');
    const menu = page.locator('button.menu');
    await expect(menu).toBeVisible();
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator(`${site.nav} a`).first()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
    await page.locator(`${site.nav} a`).first().click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
  });
  test('mobiel geen horizontale overflow', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Alleen mobiel');
    for (const menuOpen of [false, true]) {
      if (menuOpen) await page.locator('button.menu').click();
      const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) }));
      expect(dimensions.scroll, JSON.stringify({ menuOpen, ...dimensions })).toBeLessThanOrEqual(dimensions.width + 1);
    }
  });
  test('lokale links en assets', async ({ page, request }) => {
    const urls = await page.locator('a[href],script[src],link[href],img[src]').evaluateAll(nodes => nodes.map(n => n.href || n.src).filter(Boolean));
    for (const href of [...new Set(urls)]) {
      const url = new URL(href);
      if (url.origin !== 'http://127.0.0.1:4173') continue;
      if (url.pathname === new URL(page.url()).pathname && url.hash) {
        expect(await page.evaluate(hash => !!document.getElementById(decodeURIComponent(hash.slice(1))), url.hash), href).toBe(true);
      }
      url.hash = '';
      expect((await request.get(url.href)).status(), url.href).toBe(200);
    }
  });
});
