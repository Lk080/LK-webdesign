const { test, expect } = require('./fixtures.cjs');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('node:fs/promises');

async function ready(page) {
  await page.goto('/');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.querySelectorAll('.lk-hero img, #projecten img')].map(image => image.decode()));
  });
}

async function audit(page, info, state) {
  const result = await new AxeBuilder({ page }).include('.lk-header').include('.lk-hero').include('#projecten')
    // Axe's optional cross-origin CSS preload uses fetch, prohibited by the site's CSP.
    // Computed-style contrast checks remain enabled; record all incomplete checks.
    .options({ preload: { assets: ['media'] } })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
  await fs.writeFile(info.outputPath(`axe-${state}.json`), JSON.stringify({ metadata: info.config.metadata, scope: 'Header, hero and project previews', ...result }, null, 2));
  expect(result.violations, `Slice 1 Axe violations: ${state}`).toEqual([]);
}

test.describe('LK Webdesign preserved identity and navigation', () => {
  test('responsive composition, images, accessibility and review captures', async ({ page, isMobile }, info) => {
    test.setTimeout(60000);
    const widths = isMobile ? [320, 390] : [768, 900, 901, 1024, 1440];
    for (const width of widths) {
      await page.setViewportSize({ width, height: isMobile ? (width === 320 ? 740 : 844) : 900 });
      await ready(page);
      const geometry = await page.evaluate(() => {
        const box = selector => {
          const rect = document.querySelector(selector).getBoundingClientRect();
          return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, bottom: rect.bottom };
        };
        return {
          width: innerWidth, overflow: document.documentElement.scrollWidth - innerWidth,
          heading: box('.lk-hero h1'), actions: box('.lk-actions'), image: box('.lk-hero-work'),
          person: box('.lk-person'), preview: box('#projecten'),
          textSize: getComputedStyle(document.querySelector('.lk-summary')).fontSize,
          loadedFonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family),
          images: [...document.querySelectorAll('.lk-hero img, #projecten img')].map(i => ({ src: i.currentSrc, loaded: i.complete && i.naturalWidth > 0 })),
        };
      });
      expect(geometry.overflow).toBeLessThanOrEqual(1);
      expect(geometry.images.every(i => i.loaded)).toBe(true);
      expect(geometry.loadedFonts.some(f => f.includes('Manrope'))).toBe(true);
      expect(parseFloat(geometry.textSize)).toBeGreaterThanOrEqual(17);
      if (width === 390) {
        expect(geometry.actions.bottom).toBeLessThan(744);
        expect(geometry.image.y).toBeLessThan(844);
      }
      if (width === 1440) expect(geometry.image.bottom).toBeLessThan(900);
      await fs.writeFile(info.outputPath(`layout-${width}.json`), JSON.stringify(geometry, null, 2));
      if ([320, 390, 1440].includes(width)) {
        await audit(page, info, `initial-${width}`);
        await page.screenshot({ path: info.outputPath(`viewport-${width}.png`) });
        await page.screenshot({ path: info.outputPath(`slice-${width}.png`), fullPage: true, clip: { x: 0, y: 0, width, height: Math.ceil(geometry.preview.bottom) } });
        await page.locator('#projecten').screenshot({ path: info.outputPath(`kelmora-${width}.png`) });
      }
    }
  });

  test('keyboard navigation, menu, focus restoration and destination actions', async ({ page, isMobile }, info) => {
    await ready(page);
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
    await page.evaluate(() => scrollTo(0, 0));
    if (isMobile) {
      const menu = page.locator('.lk-menu');
      await menu.focus();
      await page.keyboard.press('Enter');
      await expect(menu).toHaveAttribute('aria-expanded', 'true');
      await page.keyboard.press('Tab');
      await expect(page.locator('#main-nav a').first()).toBeFocused();
      await audit(page, info, 'menu-open');
      await page.screenshot({ path: info.outputPath('menu-open-focus.png') });
      await page.keyboard.press('Escape');
      await expect(menu).toBeFocused();
      await expect(page.locator('#main-nav')).toBeHidden();
      await page.keyboard.press('Space');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page.locator('#projecten')).toBeFocused();
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      await page.evaluate(() => scrollTo(0, 0));
      await menu.click();
      await page.locator('.lk-intro').click();
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      await menu.focus();
      await page.setViewportSize({ width: 1024, height: 900 });
      await expect(page.locator('#main-nav a').first()).toBeFocused();
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(menu).toBeFocused();
    } else {
      await page.locator('#main-nav a').first().focus();
      await page.screenshot({ path: info.outputPath('desktop-nav-focus.png') });
    }
    await expect(page.locator('#kelmora .project-links a').first()).toHaveAttribute('href', 'demos/vakman/');
    await page.locator('.lk-actions .lk-button').click();
    await expect(page).toHaveURL(/aanpak\.html#projectkeuze$/);
    await expect(page.locator('#project-builder')).toBeVisible();
    await expect(page.locator('#project-type')).toBeInViewport();
    // Frozen Kelmora is never navigated to or retested by this slice.
  });

  test('reflow, reduced motion, long content and missing image', async ({ page, isMobile }, info) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 320, height: 740 });
    await ready(page);
    expect(await page.locator('.lk-button').evaluate(e => getComputedStyle(e).transitionDuration)).toBe('0s');
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
    await page.locator('.lk-hero h1').evaluate(e => e.style.fontSize = '76px');
    await page.locator('.lk-summary').evaluate(e => e.style.fontSize = '34px');
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await expect(page.locator('.lk-button')).toBeVisible();
    if (isMobile) await page.locator('.lk-hero').screenshot({ path: info.outputPath('text-enlarged-320.png') });
    // Simulate an unavailable image without causing an unrelated HTTP console error.
    await page.route('**/assets/projects/kelmora-hero-*.webp', route => route.fulfill({ status: 200, contentType: 'image/webp', body: '' }));
    await page.goto('/');
    await expect.poll(() => page.locator('.lk-hero-work img').evaluate(e => e.complete && e.naturalWidth === 0)).toBe(true);
    await expect(page.locator('.lk-hero-work figcaption')).toBeVisible();
    const imageBox = await page.locator('.lk-hero-work img').boundingBox();
    expect(imageBox.height).toBeGreaterThan(100);
    await page.locator('#projecten h2').evaluate(e => e.textContent = 'Een breed technisch dienstenaanbod voor verschillende soorten ondernemingen.');
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  });

  test('navigation and content without JavaScript', async ({ browser, isMobile }, info) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: isMobile ? 320 : 1440, height: 900 }, serviceWorkers: 'block' });
    const events = [];
    await context.route('**/*', route => require('../../scripts/qa-network.cjs').playwrightRoute(route, 'lk', events));
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4173/');
    await expect(page.locator('.lk-menu')).toBeHidden();
    await expect(page.locator('#main-nav a').first()).toBeVisible();
    await page.locator('#main-nav a').first().click();
    await expect(page.locator('#projecten')).toBeInViewport();
    await expect(page.locator('#kelmora .project-links a').first()).toBeVisible();
    await fs.writeFile(info.outputPath('no-js-network.json'), JSON.stringify(events, null, 2));
    expect(events.filter(e => e.action === 'reject')).toEqual([]);
    await context.close();
  });
});
