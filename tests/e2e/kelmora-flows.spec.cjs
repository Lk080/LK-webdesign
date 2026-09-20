const { test, expect } = require('./fixtures.cjs');
const { scanAccessibility, assertAccessibility } = require('./accessibility-helper.cjs');
const services = ['Elektriciteit', 'Airconditioning', 'Warmtepomp', 'Ventilatie', 'Laadpaal'];
async function details(page) {
  for (const field of await page.locator('#dynamic-fields input, #dynamic-fields select').all()) {
    if (await field.evaluate(el => el.tagName === 'SELECT')) await field.selectOption({ index: 1 });
    else await field.fill(await field.getAttribute('type') === 'number' ? '1985' : '65');
  }
}
async function contact(page) {
  await page.locator('[name=name]').fill('Demo Bezoeker');
  await page.locator('[name=email]').fill('demo@example.test');
  await page.locator('[name=postcode]').fill('2000');
  await page.locator('[name=demoConsent]').check();
}
async function openAssistant(page) {
  await page.locator('#diensten').scrollIntoViewIfNeeded();
  await page.locator('.assistant-launcher').click();
  await expect(page.locator('#assistant')).toBeVisible();
}
test.describe('Kelmora complete flows', () => {
  test.use({ reducedMotion: 'reduce' });
  test.beforeEach(async ({ page }) => { await page.goto('/demos/vakman/'); });
  for (const service of services) {
    test(`wizard ${service}: validatie, terug, samenvatting, herstart`, async ({ page }) => {
      const writes = [];
      page.on('request', r => { if (!['GET', 'HEAD'].includes(r.method())) writes.push(r.url()); });
      await page.locator('#wizard .next').click();
      await expect(page.locator('#wizard-note')).toHaveText('Kies eerst een dienst.');
      await page.locator(`[data-state=service] [data-value="${service}"]`).click();
      await page.locator('#wizard .next').click();
      await page.locator('#wizard .next').click();
      await expect(page.locator('#wizard-note')).toHaveText('Kies eerst uw situatie.');
      await page.locator('[data-value=Renovatie]').click();
      await page.locator('#wizard .next').click();
      await page.locator('#wizard .next').click();
      await expect(page.locator('#dynamic-fields [aria-invalid=true]')).toHaveCount(1);
      await details(page);
      // Implicit form submission must advance, never skip to the success state.
      await page.locator('#wizard').evaluate(form => form.requestSubmit());
      await expect(page.locator('.wizard-step.active')).toHaveAttribute('data-step', '4');
      await expect(page.locator('.wizard-completion')).toHaveCount(0);
      await contact(page);
      await page.locator('[name=email]').fill('ongeldig');
      await page.locator('#wizard .next').click();
      await expect(page.locator('[name=email]')).toBeFocused();
      await page.locator('[name=email]').fill('demo@example.test');
      await page.locator('[name=postcode]').fill('12');
      await page.locator('#wizard .next').click();
      await expect(page.locator('[name=postcode]')).toBeFocused();
      await page.locator('[name=postcode]').fill('2000');
      await page.locator('[name=demoConsent]').uncheck();
      await page.locator('#wizard .next').click();
      await expect(page.locator('[name=demoConsent]')).toBeFocused();
      await page.locator('[name=demoConsent]').check();
      await page.locator('#wizard .back').click();
      await expect(page.locator('#dynamic-fields select').first()).not.toHaveValue('');
      await page.locator('#wizard .next').click();
      await expect(page.locator('[name=name]')).toHaveValue('Demo Bezoeker');
      await page.locator('[name=email]').focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('.wizard-step.active')).toHaveAttribute('data-step', '5');
      await expect(page.locator('#summary')).toContainText(service);
      await expect(page.locator('#summary')).toContainText('demo@example.test');
      await page.locator('#wizard .submit').click();
      await expect(page.locator('.wizard-completion')).toContainText('Er is niets verstuurd');
      await page.locator('[data-wizard-reset]').click();
      await expect(page.locator('#progress-text')).toHaveText('Stap 1 van 5');
      await expect(page.locator('[name=name]')).toHaveValue('');
      await expect(page.locator('#prefill-note')).toBeHidden();
      expect(writes).toEqual([]);
    });
    test(`assistent ${service}: volledige flow en overdracht`, async ({ page }) => {
      await openAssistant(page);
      await page.locator(`[data-service-choice="${service}"]`).click();
      await page.locator('[data-answer]').first().click();
      await page.locator('[data-assistant-back]').click();
      let count = 0;
      while (await page.locator('[data-answer]').count()) {
        expect(++count).toBeLessThanOrEqual(4);
        await page.locator('[data-answer]').first().click();
      }
      await page.locator('[data-assistant-quote]').click();
      await expect(page.locator('#assistant')).not.toBeVisible();
      await expect(page.locator('.wizard-step.active')).toHaveAttribute('data-step', '3');
      await details(page);
      await page.locator('#wizard .next').click();
      await contact(page);
      await page.locator('#wizard .next').click();
      await expect(page.locator('#summary')).toContainText(service);
      await expect(page.locator('#summary')).toContainText('Kelmora Assistent');
    });
  }
  test('keuzehulp en prijsindicatie behouden onafhankelijke antwoorden', async ({ page }) => {
    await page.locator('[name=estService]').selectOption('Laadpaal');
    await page.locator('[name=estSituation]').selectOption('Renovatie');
    await page.locator('[name=estSize]').selectOption('medium');
    await page.locator('[name=estOption]').first().check();
    const price = await page.locator('#estimate-output h3').textContent();
    await page.locator('#advisor [data-value=comfort]').click();
    for (let n = 0; n < 3; n++) await page.locator('#advisor .option-list button').first().click();
    await page.locator('[data-advisor-quote]').click();
    await expect(page.locator('[data-detail=home]')).toHaveValue('Rijwoning');
    await page.locator('#estimate-cta').click();
    await details(page);
    await page.locator('#wizard .next').click();
    await contact(page);
    await page.locator('#wizard .next').click();
    await expect(page.locator('#summary')).toContainText(price);
    await expect(page.locator('#summary')).toContainText('Slimme regeling');
  });
  test('keyboard, dialoogfocus en accessibility van interactieve states', async ({ page }, info) => {
    test.setTimeout(90000);
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip')).toBeFocused();
    await page.keyboard.press('Enter');
    await openAssistant(page);
    await expect(page.locator('#assistant h3')).toBeFocused();
    for (let n = 0; n < 12; n++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => !!document.activeElement.closest('#assistant'))).toBe(true);
    }
    const reports = [await scanAccessibility(page, info, 'Kelmora', 'assistant')];
    await page.keyboard.press('Escape');
    await expect(page.locator('.assistant-launcher')).toBeFocused();
    await page.locator('[data-service=Airconditioning]').click();
    await page.locator('[data-value=Renovatie]').click();
    await page.locator('#wizard .next').click();
    await details(page);
    await page.locator('#wizard .next').click();
    reports.push(await scanAccessibility(page, info, 'Kelmora', 'contact'));
    await contact(page);
    await page.locator('#wizard .next').click();
    await page.locator('#wizard .submit').click();
    reports.push(await scanAccessibility(page, info, 'Kelmora', 'completed'));
    assertAccessibility(reports);
  });
  test('responsive: acht breedtes, afbeeldingen, menu en geen overflow', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop-chromium', 'Eenmaal per breedtematrix');
    const measurements = [];
    for (const width of [320, 360, 390, 430, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/demos/vakman/');
      await page.locator('img').evaluateAll(images => images.forEach(i => { i.loading = 'eager'; }));
      await page.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
      const metrics = await page.evaluate(() => ({ width: innerWidth, height: document.documentElement.scrollHeight, overflow: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - innerWidth }));
      measurements.push(metrics);
      expect(metrics.overflow).toBeLessThanOrEqual(1);
      if (width <= 900) {
        await page.locator('.menu').click();
        await expect(page.locator('#nav')).toBeVisible();
        await page.keyboard.press('Escape');
      }
      await expect(page.locator('.hero .primary')).toBeVisible();
      await page.locator('#wizard .next').click();
      await expect(page.locator('#wizard-note')).toBeVisible();
      await page.locator('[data-state=service] [data-value=Airconditioning]').click();
      await page.locator('#wizard .next').click();
      await page.locator('[data-value=Renovatie]').click();
      await page.locator('#wizard .next').click();
      await details(page);
      await page.locator('#wizard .next').click();
      for (const control of await page.locator('.wizard-step.active input, .wizard-step.active textarea').all()) {
        const box = await control.boundingBox();
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
      }
      await openAssistant(page);
      const dialog = await page.locator('#assistant').boundingBox();
      expect(dialog.x).toBeGreaterThanOrEqual(0);
      expect(dialog.x + dialog.width).toBeLessThanOrEqual(width);
      expect(dialog.y + dialog.height).toBeLessThanOrEqual(900);
      await page.keyboard.press('Escape');
    }
    await info.attach('responsive-measurements', { body: JSON.stringify(measurements, null, 2), contentType: 'application/json' });
    console.log('Kelmora dimensions', measurements);
  });
});
