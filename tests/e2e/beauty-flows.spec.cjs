const { test, expect } = require('./fixtures.cjs');
const openFinder = async page => { await page.locator('#open-finder').click(); await expect(page.locator('#treatment-dialog')).toBeVisible(); };
async function answer(page, values) {
  for (const value of values) {
    await page.locator(`input[value="${value}"]`).check();
    await page.locator('#finder-form button[type="submit"]').click();
  }
}
test.describe('Beauty', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/demos/beauty/'); });
  test('pagina laden en console, metadata en demo-transparantie', async ({ page }) => {
    await expect(page).toHaveTitle(/Velune/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.hero-photo img')).toBeVisible();
    expect(await page.locator('.hero-photo img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /fictieve/);
    await expect(page.locator('.footer')).toContainText('fictieve onderneming');
    await expect(page.locator('.review')).toContainText('Fictieve review');
  });
  test('hoofdnavigatie, mobiel menu en FAQ', async ({ page, isMobile }) => {
    for (const id of ['behandelingen', 'studio', 'vragen']) {
      if (isMobile) await page.locator('.menu-toggle').click();
      await page.locator(`#navigation a[href="#${id}"]`).click();
      await expect(page.locator(`#${id}`)).toBeInViewport();
      if (isMobile) await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
    }
    if (isMobile) {
      await page.locator('.menu-toggle').click();
      await page.keyboard.press('Escape');
      await expect(page.locator('.menu-toggle')).toBeFocused();
      await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
    }
    for (const detail of await page.locator('details').all()) {
      await detail.locator('summary').click();
      await expect(detail).toHaveAttribute('open', '');
      await expect(detail.locator('p')).toBeVisible();
      await detail.locator('summary').click();
    }
  });
  test('primaire CTAs en alle behandelingen, geen verzending', async ({ page, isMobile }) => {
    const sent = [];
    page.on('request', req => { if (!['GET','HEAD'].includes(req.method())) sent.push(req.url()); });
    const buttons = page.locator('[data-book]');
    for (let i=0;i<await buttons.count();i++) {
      const button = buttons.nth(i);
      if (isMobile && await button.evaluate(el => !!el.closest('nav'))) await page.locator('.menu-toggle').click();
      const chosen = await button.getAttribute('data-book');
      await button.click();
      await expect(page.locator('#treatment-dialog')).toBeVisible();
      await expect(page.locator('#treatment')).toHaveValue(chosen);
      await page.locator('.close-dialog').click();
    }
    await page.locator('.hero-actions [data-book]').click();
    await page.locator('#booking-form button[type="submit"]').click();
    await expect(page.locator('#booking-form')).toBeVisible();
    await page.locator('#treatment').selectOption('hydra');
    await page.locator('#moment').selectOption('afternoon');
    await page.locator('#booking-form button[type="submit"]').click();
    await expect(page.locator('#dialog-content')).toContainText('geen afspraak gemaakt');
    await expect(page.locator('#dialog-content')).toContainText('Hydra Pause');
    await page.locator('#another').click();
    await expect(page.locator('#treatment')).toHaveValue('');
    await expect(page.locator('#moment')).toHaveValue('');
    await page.keyboard.press('Escape');
    expect(sent).toEqual([]);
  });
  test('finder alle 27 voorkeurpaden, tijdslimiet en logische aanbevelingen', async ({ page }) => {
    test.setTimeout(90000);
    for (const goal of ['comfort','fresh','brows']) for (const experience of ['care','rest','complete']) for (const time of ['30','45','60']) {
      await openFinder(page);
      await answer(page,[goal,experience,time]);
      const expected = goal === 'brows' ? 'Brow Atelier' : time === '30' ? 'Soft Reset' : experience === 'rest' ? 'Slow Ritual' : time === '60' && experience === 'complete' ? 'De Velune Facial' : goal === 'comfort' ? 'Hydra Pause' : time === '60' ? 'De Velune Facial' : 'Soft Reset';
      await expect(page.locator('#dialog-title')).toHaveText(expected);
      const minutes = Number((await page.locator('.result-meta').innerText()).match(/^\d+/)[0]);
      expect(minutes).toBeLessThanOrEqual(Number(time));
      await page.keyboard.press('Escape');
    }
  });
  test('finder validatie, terug, reset en boekings-overdracht', async ({ page }) => {
    await openFinder(page);
    await page.locator('#finder-form button[type="submit"]').click();
    await expect(page.locator('.dialog-progress')).toContainText('Stap 1');
    await answer(page,['comfort','complete']);
    await page.locator('#finder-back').click();
    await expect(page.locator('input[value="complete"]')).toBeChecked();
    await page.locator('#finder-form button[type="submit"]').click();
    await answer(page,['60']);
    await page.locator('#result-back').click();
    await expect(page.locator('input[value="60"]')).toBeChecked();
    await page.locator('#finder-form button[type="submit"]').click();
    await page.locator('#result-book').click();
    await expect(page.locator('#treatment')).toHaveValue('signature');
    await page.locator('#booking-back').click();
    await page.locator('#restart').click();
    await expect(page.locator('input:checked')).toHaveCount(0);
    await expect(page.locator('.dialog-progress')).toContainText('Stap 1');
    await page.keyboard.press('Escape');
    await openFinder(page);
    await expect(page.locator('input:checked')).toHaveCount(0);
  });
  test('keyboard focus, Escape, heropenen en reduced motion', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip')).toBeFocused();
    expect((await page.locator('.skip').boundingBox()).x).toBeGreaterThanOrEqual(0);
    await page.keyboard.press('Enter');
    const trigger = page.locator('#open-finder');
    await trigger.focus(); await page.keyboard.press('Enter');
    await expect(page.locator('#dialog-title')).toBeFocused();
    for(let i=0;i<12;i++) {
      await page.keyboard.press(i%3 === 0 ? 'Shift+Tab' : 'Tab');
      expect(await page.evaluate(() => document.activeElement.closest('dialog')?.open)).toBe(true);
    }
    await page.locator('input[value="comfort"]').focus();
    await page.keyboard.press('Space');
    await page.keyboard.press('Enter');
    await expect(page.locator('.dialog-progress')).toContainText('Stap 2');
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await page.emulateMedia({reducedMotion:'reduce'});
    expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  });
  test('lokale links en assets', async ({ page, request }) => {
    const urls=await page.locator('a[href],img[src],link[href],script[src]').evaluateAll(els=>els.map(e=>e.href||e.src));
    for(const href of [...new Set(urls)]) {
      const url=new URL(href);
      if(url.origin!=='http://127.0.0.1:4173')continue;
      if(url.hash && url.pathname==='/demos/beauty/') expect(await page.locator(url.hash).count()).toBe(1);
      url.hash=''; expect((await request.get(url.href)).status(),url.href).toBe(200);
    }
  });
  test('responsive overflow en dialog bij relevante breedtes', async ({ page, isMobile }) => {
    const widths=isMobile?[320,360,390,430]:[768,1024,1280,1440];
    for(const width of widths){
      await page.setViewportSize({width,height:900});
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth),`page ${width}`).toBeLessThanOrEqual(1);
      await openFinder(page);
      expect(await page.locator('dialog').evaluate(e=>e.scrollWidth-e.clientWidth),`dialog ${width}`).toBeLessThanOrEqual(1);
      await answer(page,['comfort','complete','60']);
      expect(await page.locator('dialog').evaluate(e=>e.scrollWidth-e.clientWidth),`result ${width}`).toBeLessThanOrEqual(1);
      await page.keyboard.press('Escape');
    }
  });
});
