const { test, expect } = require('./fixtures.cjs');
const { scanAccessibility, assertAccessibility } = require('./accessibility-helper.cjs');
test('Beauty accessibility alle relevante states', async ({page,isMobile},testInfo)=>{
  test.setTimeout(120000);
  await page.goto('/demos/beauty/');
  const reports=[];
  const scan=async state=>reports.push(await scanAccessibility(page,testInfo,'Beauty / Velune',state));
  await scan('initial');
  if(isMobile){await page.locator('.menu-toggle').click();await scan('menu-open');await page.keyboard.press('Escape');}
  await page.locator('#open-finder').click();
  for(const [i,value] of ['comfort','complete','60'].entries()){
    await scan(`finder-${i+1}`);
    await page.locator(`input[value="${value}"]`).check();
    await page.locator('#finder-form button[type="submit"]').click();
  }
  await scan('result');
  await page.locator('#result-book').click();await scan('booking');
  await page.locator('#moment').selectOption('morning');
  await page.locator('#booking-form button[type="submit"]').click();
  await expect(page.locator('#dialog-content')).toContainText('geen afspraak gemaakt');
  await scan('success');
  assertAccessibility(reports);
});
