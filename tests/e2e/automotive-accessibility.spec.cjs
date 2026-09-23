const { test, expect } = require('./fixtures.cjs');
const { scanAccessibility, assertAccessibility } = require('./accessibility-helper.cjs');
test('Automotive Axe pagina, menu, configurator, resultaat en offerte-intentie', async ({ page, isMobile }, testInfo) => {
  test.setTimeout(120000);
  await page.goto('/demos/automotive/'); await page.emulateMedia({reducedMotion:'reduce'});
  const reports=[];
  const scan=async state=>reports.push(await scanAccessibility(page,testInfo,'Automotive / AVREN',state));
  await scan('pagina-stap1');
  if(isMobile) { await page.locator('.menu-toggle').click(); await scan('mobiel-menu'); await page.keyboard.press('Escape'); }
  for(const [key,value,state] of [['car','suv','stap2'],['goal','protect','stap3'],['use','highway','resultaat']]) { await page.locator(`input[name="${key}"][value="${value}"]`).check(); await page.locator('#config-form button[type="submit"]').click(); await scan(state); }
  await page.locator('#offer').click(); await scan('offerte-intentie'); await page.locator('#demo-confirm').check(); await page.locator('#offer-form button[type="submit"]').click(); await scan('succes');
  await page.locator('summary').first().click(); await page.locator('#finish-slider').focus(); await page.keyboard.press('End'); await scan('faq-en-slider');
  assertAccessibility(reports);
  expect(reports.flatMap(r=>r.violations), 'Automotive aims for no violations at any severity').toEqual([]);
});
