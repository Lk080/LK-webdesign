const { test, expect } = require('./fixtures.cjs');
async function select(page, key, value) {
  await page.locator(`input[name="${key}"][value="${value}"]`).check();
  await page.locator('#config-form button[type="submit"]').click();
}
async function configure(page, car = 'sedan', goal = 'protect', use = 'daily') {
  await select(page, 'car', car); await select(page, 'goal', goal); await select(page, 'use', use);
}
async function noOverflow(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
}
test.describe('Automotive / AVREN', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/demos/automotive/'); await page.emulateMedia({ reducedMotion: 'reduce' }); });
  test('pagina laden en console, lokale assets, metadata en demo-transparantie', async ({ page, request }) => {
    await expect(page).toHaveTitle('AVREN — Paint Protection & Detailing');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /fictieve.*democonfigurator/);
    await expect(page.locator('.demo-note')).toContainText('fictieve studio');
    await expect(page.locator('.footer')).toContainText('AI-sfeerbeelden');
    const links = await page.locator('[src],link[href],a[href]').evaluateAll(els => [...new Set(els.map(e => e.getAttribute('src') || e.getAttribute('href')).filter(p => p && !p.startsWith('#')))]);
    for (const href of links) { const url = new URL(href, page.url()); expect(url.origin).toBe('http://127.0.0.1:4173'); expect((await request.get(url.href)).ok(), href).toBe(true); }
    await page.evaluate(async () => { for (const img of document.images) img.loading='eager'; await Promise.all([...document.images].map(i=>i.decode())); });
    expect(await page.evaluate(()=>[...document.images].every(i=>i.naturalWidth>0 && i.hasAttribute('alt')))).toBe(true);
    await noOverflow(page);
  });
  test('hoofdnavigatie, mobiele bediening, CTA en dienstvoorselectie', async ({ page, isMobile }) => {
    const menu=page.locator('.menu-toggle');
    if(isMobile) { await menu.click(); await expect(menu).toHaveAttribute('aria-expanded','true'); await page.keyboard.press('Escape'); await expect(menu).toBeFocused(); await expect(menu).toHaveAttribute('aria-expanded','false'); }
    for(const href of ['#diensten','#afwerking','#werkwijze','#configurator']) {
      if(isMobile) await menu.click();
      await page.locator(`#nav a[href="${href}"]`).click(); await expect(page).toHaveURL(new RegExp(href+'$')); await expect(page.locator(href)).toBeInViewport();
      if(isMobile) await expect(menu).toHaveAttribute('aria-expanded','false');
    }
    for(const goal of ['protect','gloss','refresh','complete']) { await page.locator(`.service-grid [data-goal="${goal}"]`).click(); await select(page,'car','sedan'); await expect(page.locator(`input[value="${goal}"]`)).toBeChecked(); }
    await page.locator('.hero .button').click(); await expect(page.locator('#configurator')).toBeInViewport();
    await page.locator('.closing .button').click(); await expect(page.locator('#configurator')).toBeInViewport();
    if(isMobile) { await page.evaluate(()=>scrollTo(0,0)); await menu.click(); await page.locator('.hero-bottom').click(); await expect(menu).toHaveAttribute('aria-expanded','false'); }
  });
  test('configurator validatie, terug, herstart en offerte-intentie zonder verzending', async ({ page }) => {
    const writes=[]; page.on('request', r=> {if(!['GET','HEAD'].includes(r.method())) writes.push(r.url());});
    await page.locator('#config-form button[type="submit"]').click(); await expect(page.locator('.step-label')).toContainText('1 / 3');
    await page.locator('input[value="suv"]').check(); await page.keyboard.press('Enter'); await expect(page.locator('.step-label')).toContainText('2 / 3'); await expect(page.locator('.step-title')).toBeFocused();
    await select(page,'goal','protect'); await page.locator('#back').click(); await expect(page.locator('input[value="protect"]')).toBeChecked(); await page.locator('#back').click(); await expect(page.locator('input[value="suv"]')).toBeChecked();
    await page.locator('#back').click(); await expect(page.locator('input:checked')).toHaveCount(0); await expect(page.locator('#summary-car')).toHaveText('Nog te kiezen');
    await configure(page,'suv','protect','highway'); await expect(page.locator('.step-title')).toHaveText('Front PPF + coating'); await expect(page.locator('.result-details')).toContainText('€ 2150–3100');
    await page.locator('#edit-plan').click(); await expect(page.locator('input[value="highway"]')).toBeChecked(); await page.locator('#config-form button[type="submit"]').click();
    await page.locator('#offer').click(); await expect(page.locator('#config-content input')).toHaveCount(1); await expect(page.locator('#config-content input')).toHaveAttribute('type','checkbox');
    await page.locator('#offer-form button[type="submit"]').click(); await expect(page.locator('#offer-form')).toBeVisible(); await page.locator('#offer-back').click(); await expect(page.locator('.step-title')).toHaveText('Front PPF + coating');
    await page.locator('#offer').click(); await page.locator('#demo-confirm').check(); await page.keyboard.press('Enter'); await expect(page.locator('#config-content')).toContainText('geen aanvraag verstuurd'); await expect(page.locator('.step-title')).toBeFocused();
    await page.locator('#again').click(); await expect(page.locator('input:checked')).toHaveCount(0); await expect(page.locator('#summary-use')).toHaveText('Nog te kiezen');
    expect(writes).toEqual([]); expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
  });
  test('alle 48 combinaties geven samenhangend pakket, prijs en gebruiksadvies', async ({ page }) => {
    test.setTimeout(120000);
    const prices={sedan:{protect:'1400–2100',gloss:'650–1100',refresh:'350–650',complete:'450–800',highway:'1800–2600'},suv:{protect:'1700–2500',gloss:'800–1300',refresh:'400–800',complete:'550–950',highway:'2150–3100'},coupe:{protect:'1550–2300',gloss:'700–1200',refresh:'400–700',complete:'500–900',highway:'2000–2850'}};
    const titles={protect:'Front PPF',gloss:'Ceramic Protection',refresh:'Exterior Refinement',complete:'Complete Detail'};
    const reasons={daily:'dagelijks gebruik',weekend:'liefhebbersauto',new:'nieuw voertuig',highway:'snelweggebruik'};
    for(const car of Object.keys(prices)) for(const goal of Object.keys(titles)) for(const use of Object.keys(reasons)) {
      await configure(page,car,goal,use);
      await expect(page.locator('.step-title')).toHaveText(goal==='protect'&&use==='highway'?'Front PPF + coating':titles[goal]);
      await expect(page.locator('.result-details')).toContainText('€ '+prices[car][goal==='protect'&&use==='highway'?'highway':goal]);
      await expect(page.locator('.result-copy')).toContainText(reasons[use]); await expect(page.locator('.result-includes li')).toHaveCount(3);
      await page.locator('#reset-plan').click();
    }
  });
  test('glansslider met keyboard, pointer of touch; FAQ en reduced motion', async ({ page, isMobile }) => {
    const range=page.locator('#finish-slider'); await range.focus(); await page.keyboard.press('Home'); await expect(range).toHaveValue('0'); await page.keyboard.press('End'); await expect(range).toHaveValue('100'); await page.keyboard.press('ArrowLeft'); await expect(range).toHaveValue('99'); await expect(range).toHaveAttribute('aria-valuetext','99 procent gedempte impressie');
    expect(await page.locator('.compare-image').evaluate(e=>getComputedStyle(e).outlineWidth)).toBe('3px');
    await range.scrollIntoViewIfNeeded(); const b=await range.boundingBox();
    if(isMobile) {
      await page.touchscreen.tap(b.x+b.width*.25,b.y+b.height/2);
      expect(Number(await range.inputValue())).toBeLessThan(35);
      const session=await page.context().newCDPSession(page);
      await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:b.x+b.width*.25,y:b.y+b.height/2}]});
      for(const fraction of [.35,.45,.55,.65,.75]) await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:b.x+b.width*fraction,y:b.y+b.height/2}]});
      await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}); await session.detach();
      expect(Number(await range.inputValue())).toBeGreaterThan(65);
      await page.touchscreen.tap(b.x+b.width*.25,b.y+b.height/2);
    }
    else { await page.mouse.move(b.x+b.width*.99,b.y+b.height/2); await page.mouse.down(); await page.mouse.move(b.x+b.width*.25,b.y+b.height/2,{steps:10}); await page.mouse.up(); }
    expect(Number(await range.inputValue())).toBeLessThan(35); expect(Number(await range.inputValue())).toBeGreaterThan(15);
    for(const summary of await page.locator('summary').all()) { await summary.focus(); await page.keyboard.press('Enter'); await expect(summary.locator('..')).toHaveAttribute('open',''); await page.keyboard.press('Space'); await expect(summary.locator('..')).not.toHaveAttribute('open',''); }
    expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  });
  test('keyboardvolgorde en zichtbare focus zonder pointer', async ({ page, isMobile }) => {
    await page.keyboard.press('Tab'); await expect(page.locator('.skip')).toBeFocused(); await page.keyboard.press('Enter');
    await page.locator('.hero .button').focus(); await page.keyboard.press('Enter');
    await page.locator('input[value="sedan"]').focus(); await page.keyboard.press('ArrowDown'); await expect(page.locator('input[value="suv"]')).toBeChecked();
    expect(await page.locator('input[value="suv"]').evaluate(e=>getComputedStyle(e.closest('.option')).outlineWidth)).toBe('2px');
    await page.keyboard.press('Tab'); await expect(page.locator('#back')).toBeFocused(); await page.keyboard.press('Tab'); await expect(page.locator('#config-form button[type="submit"]')).toBeFocused(); await page.keyboard.press('Enter'); await expect(page.locator('.step-title')).toBeFocused();
    await page.keyboard.press('Tab'); await expect(page.locator('input[value="protect"]')).toBeFocused(); await page.keyboard.press('Space'); await page.keyboard.press('Enter'); await expect(page.locator('.step-label')).toContainText('3 / 3');
    if(isMobile) { await page.locator('.menu-toggle').focus(); await page.keyboard.press('Enter'); await page.keyboard.press('Tab'); await expect(page.locator('#nav a').first()).toBeFocused(); await page.keyboard.press('Escape'); await expect(page.locator('.menu-toggle')).toBeFocused(); }
  });
  test('responsive overflow en bediening in start-, resultaat- en offertestate', async ({ page }, testInfo) => {
    test.setTimeout(90000);
    const widths=testInfo.project.name.startsWith('desktop')?[768,1024,1280,1440,1920]:[320,360,390,430];
    for(const width of widths) {
      await page.setViewportSize({width,height:900}); await page.goto('/demos/automotive/'); await noOverflow(page);
      await configure(page,'suv','complete','highway'); await noOverflow(page); await page.locator('#offer').click(); await noOverflow(page);
      for(const selector of ['#demo-confirm','#offer-back','#offer-form button[type="submit"]']) { const el=page.locator(selector); await el.scrollIntoViewIfNeeded(); expect(await el.evaluate(e=>{const r=e.getBoundingClientRect();const t=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return e===t||e.contains(t);})).toBe(true); }
      await page.locator('#demo-confirm').check(); await page.locator('#offer-form button[type="submit"]').click(); await noOverflow(page);
    }
  });
});
