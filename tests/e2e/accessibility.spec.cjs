const { test, expect } = require('./fixtures.cjs');
const { scanAccessibility, assertAccessibility } = require('./accessibility-helper.cjs');
const selected = require('../../scripts/qa-projects.cjs').getProject(process.env.QA_SITE);
const sites = [{ name: selected.title, path: selected.route }];
for (const site of sites) {
  test(`${site.name} accessibility WCAG 2.1 AA`, async ({ page, isMobile }, testInfo) => {
    test.setTimeout(60000);
    const response = await page.goto(site.path);
    expect(response.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    const reports = [await scanAccessibility(page, testInfo, site.name, 'initial')];
    if (isMobile) {
      await page.locator('button.menu').click();
      await expect(page.locator('button.menu')).toHaveAttribute('aria-expanded', 'true');
      reports.push(await scanAccessibility(page, testInfo, site.name, 'menu-open'));
    }
    assertAccessibility(reports);
  });
}
