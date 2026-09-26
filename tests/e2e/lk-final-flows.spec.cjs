const { test, expect } = require('./fixtures.cjs');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('node:fs/promises');
const path = require('node:path');

async function fill(page) {
  await page.locator('#name').fill('Test Ondernemer');
  await page.locator('#email').fill('review@example.test');
  await page.locator('#message').fill('Fictieve QA-aanvraag. Niet echt verzenden.');
}
async function audit(page, info, state) {
  await page.evaluate(() => document.fonts.ready);
  const result = await new AxeBuilder({ page }).options({ preload: { assets: ['media'] } })
    .withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
  await fs.writeFile(info.outputPath(`axe-final-${state}.json`), JSON.stringify(result, null, 2));
  expect(result.violations, `All Axe severities: ${state}`).toEqual([]);
}

test.describe('LK Webdesign dedicated flows', () => {
  test('VAT dual presentation, cents, net invariants and no-JS fallbacks', async ({ page, browser, isMobile }, info) => {
    const expected = { small: '€1.203,95–€1.560,90', medium: '€1.681,90–€2.165,90', large: '€2.165,90–€2.770,90', custom: 'Vanaf ± €2.783,00', hosting: '€30,13', care: '€71,39', hourly: '€78,65' };
    for (const route of ['/', '/aanpak.html']) {
      await page.goto(route);
      for (const [key, value] of Object.entries(expected)) {
        const gross = page.locator(`[data-price-incl="${key}"]`);
        if (await gross.count()) {
          await expect(gross).toHaveText(value);
          await expect(gross).toBeVisible();
          await expect(page.locator(`[data-price="${key}"]`)).toBeVisible();
        }
      }
      const widths = isMobile ? [320,390] : [768,1440];
      for (const width of widths) {
        await page.setViewportSize({width,height:900});
        expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
        await page.screenshot({path:info.outputPath(`vat-${route==='/'?'home':'aanpak'}-${width}.png`),fullPage:true});
      }
    }
    const net = await page.evaluate(()=>window.LKCommercial.data);
    expect(net.ranges).toEqual({small:[995,1290],medium:[1390,1790],large:[1790,2290],custom:[2300,null]});
    expect([net.hosting,net.care,net.both,net.hourly,net.vat]).toEqual([24.9,59,59,65,21]);
    await page.goto('/aanpak.html?type=new&pages=small&complexity=average');
    await expect(page.locator('#estimate-price')).toHaveText('€1.421,75–€1.996,50');
    await expect(page.locator('#estimate-vat')).toContainText('€1.175–€1.650 excl. 21% btw');
    await page.locator('#use-estimate').click();
    await expect(page.locator('#request-plan-text')).toContainText('€1.421,75–€1.996,50 incl. 21% btw');
    await expect(page.locator('#project-summary')).toHaveValue(/€1.175–€1.650 excl. 21% btw/);
    await page.goto('/contact.html?service=care');
    await expect(page.locator('#request-plan-text')).toContainText('€71,39/maand incl. 21% btw');
    await expect(page.locator('#request-plan-text')).toContainText('€59,00/maand excl. btw');
    const nojs = await browser.newContext({javaScriptEnabled:false,serviceWorkers:'block'});
    const events = [];
    await nojs.route('**/*', route=>require('../../scripts/qa-network.cjs').playwrightRoute(route,'lk',events));
    const staticPage = await nojs.newPage();
    await staticPage.goto('http://127.0.0.1:4173/aanpak.html');
    for(const [key,value] of Object.entries(expected)) await expect(staticPage.locator(`[data-price-incl="${key}"]`)).toHaveText(value);
    expect(events.filter(event=>event.action==='reject')).toEqual([]);
    await nojs.close();
  });

  test('all responsive widths and local images across three pages', async ({ page, isMobile }, info) => {
    test.setTimeout(90000);
    const widths = isMobile ? [320,360,375,390,430] : [768,1024,1280,1440];
    const result=[];
    for (const route of ['/', '/aanpak.html', '/contact.html']) {
      for (const width of widths) {
        await page.setViewportSize({width,height:900});
        await page.goto(route);
        await page.evaluate(async()=>{
          for(const img of document.images)img.loading='eager';
          await document.fonts.ready;
          await Promise.all([...document.images].map(img=>img.decode()));
        });
        const dimensions=await page.evaluate(()=>({width:innerWidth,overflow:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)-innerWidth,height:document.documentElement.scrollHeight}));
        expect(dimensions.overflow,route+' '+width).toBeLessThanOrEqual(1);
        expect(await page.locator('h1').count()).toBe(1);
        result.push({route,...dimensions});
      }
    }
    await fs.writeFile(info.outputPath('all-widths.json'),JSON.stringify(result,null,2));
  });
  test('calculator ranges, complex cases, unknown, reset and handoff', async ({ page }, info) => {
    await page.goto('/aanpak.html#projectkeuze');
    for (const [pages, price] of [['small','€1.203,95–€1.560,90'],['medium','€1.681,90–€2.165,90'],['large','€2.165,90–€2.770,90'],['custom','Persoonlijke offerte nodig'],['unknown','Persoonlijke offerte nodig']]) {
      await page.locator('#project-pages').selectOption(pages);
      await expect(page.locator('#estimate-price')).toHaveText(price);
    }
    await page.locator('#project-pages').selectOption('medium');
    await page.locator('#project-type').selectOption('existing');
    await expect(page.locator('#estimate-price')).toHaveText('€1.681,90–€2.165,90');
    await page.locator('#extra-options summary').click();
    for (const extra of ['shop','api','custom']) {
      await page.locator(`input[value="${extra}"]`).check();
      await expect(page.locator('#estimate-price')).toHaveText('Persoonlijke offerte nodig');
      await page.locator(`input[value="${extra}"]`).uncheck();
    }
    await page.locator('#project-type').selectOption('automation');
    await expect(page.locator('#estimate-price')).toHaveText('Persoonlijke offerte nodig');
    await expect(page.locator('#project-pages')).toBeEnabled();
    await page.getByRole('button',{name:'Wis mijn keuzes'}).click();
    await expect(page.locator('#estimate-price')).toHaveText('€1.203,95–€1.560,90');
    await page.locator('#project-pages').selectOption('large');
    await page.locator('[name="complexity"][value="average"]').check();
    await page.locator('#extra-options summary').click();
    await page.locator('[value="languages"]').check();
    const indicated = await page.locator('#estimate-price').innerText();
    await audit(page,info,'calculator');
    await page.locator('#use-estimate').click();
    await expect(page.locator('#request-plan')).toContainText('6–8 pagina’s');
    await expect(page.locator('#request-plan')).toContainText('Meerdere talen');
    await expect(page.locator('#request-plan')).toContainText('Complexiteit: Gemiddeld');
    await expect(page.locator('#request-plan')).toContainText(indicated);
    await page.locator('#edit-plan').click();
    await expect(page.locator('#context-complexity')).toHaveValue('average');
    await page.locator('#context-complexity').selectOption('extensive');
    await page.getByRole('button', { name: 'Bewaar projectkeuze' }).click();
    await expect(page.locator('#request-plan')).toContainText('Complexiteit: Uitgebreid');
    await page.locator('#message').fill('Mijn eigen tekst blijft staan.');
    await page.locator('#remove-plan').click();
    await expect(page.locator('#message')).toHaveValue('Mijn eigen tekst blijft staan.');
    await expect(page.locator('#project-summary')).toHaveValue('');
    await expect(page.locator('#interest')).toBeFocused();
    await expect(page).toHaveURL(/contact\.html$/);
  });
  test('Aanpak responsive, keyboard, states and safe calculator context', async ({ page, isMobile }, info) => {
    test.setTimeout(60000);
    for (const width of isMobile ? [320,390] : [768,1024,1440]) {
      await page.setViewportSize({width,height:900});
      await page.goto('/aanpak.html');
      await page.evaluate(()=>document.fonts.ready);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
      await page.locator('#extra-options summary').focus(); await page.keyboard.press('Enter');
      await expect(page.locator('#extra-options')).toHaveAttribute('open','');
      await page.keyboard.press('Tab'); await expect(page.locator('[value="intake"]')).toBeFocused();
      await page.keyboard.press('Space'); await expect(page.locator('[value="intake"]')).toBeChecked();
      await expect(page.locator('#estimate-context')).toContainText('Extra formulieren');
      await expect(page.locator('#extra-count')).toHaveText('(1 gekozen)');
      await page.locator('[name="complexity"][value="simple"]').focus(); await page.keyboard.press('ArrowRight');
      await expect(page.locator('[name="complexity"][value="average"]')).toBeChecked();
      await expect(page.locator('#estimate-context')).toContainText('Gemiddeld');
      await page.locator('#ondersteuning .support-grid article').last().locator('summary').focus(); await page.keyboard.press('Enter');
      await expect(page.locator('#ondersteuning .support-grid article').last().locator('details')).toHaveAttribute('open','');
      await audit(page,info,`aanpak-${width}`);
      await page.screenshot({path:info.outputPath(`aanpak-${width}.png`),fullPage:true});
    }
    await page.goto('/aanpak.html?type=new&pages=large&complexity=extensive&extra=blog&extra=api');
    await expect(page.locator('#project-pages')).toHaveValue('large');
    await expect(page.locator('#estimate-price')).toHaveText('Persoonlijke offerte nodig');
    await page.locator('#use-estimate').click();
    await expect(page.locator('#request-plan')).toContainText('6–8 pagina’s');
    await expect(page.locator('#request-plan')).toContainText('Uitgebreid');
    await expect(page.locator('#request-plan')).toContainText('Blog / nieuws');
    await expect(page.locator('#request-plan')).toContainText('AI, API');
    await page.locator('#message').fill('Mijn eigen concept.');
    await page.locator('#edit-plan').click();
    await page.locator('[value="api"]').uncheck();
    await page.getByRole('button',{name:'Bewaar projectkeuze'}).click();
    await expect(page.locator('#message')).toHaveValue('Mijn eigen concept.');
    await expect(page.locator('#request-plan-text')).not.toContainText('AI, API');
    await audit(page,info,'calculator-contact');
    await page.goto('/aanpak.html?pages=bad&complexity=%3Cscript%3E&extra=blog&extra=blog&extra=evil&price=1&email=private');
    await expect(page.locator('#project-pages')).toHaveValue('small');
    await expect(page.locator('[value="simple"]')).toBeChecked();
    await expect(page.locator('#extra-count')).toHaveText('(1 gekozen)');
    const target = new URL(await page.locator('#use-estimate').getAttribute('href'), 'http://127.0.0.1:4173');
    expect([...target.searchParams.keys()].every(key=>['type','pages','complexity','extra'].includes(key))).toBe(true);
    expect(target.searchParams.getAll('extra')).toEqual(['blog']);
    await page.getByRole('button',{name:'Wis mijn keuzes'}).click();
    await expect(page.locator('#estimate-price')).toHaveText('€1.203,95–€1.560,90');
    await expect(page.locator('#extra-count')).toHaveText('(optioneel)');
    expect(await page.evaluate(()=>window.LKCommercial.data.both)).toBe(59);
  });
  test('definitive calculator weights, threshold and contact reconstruction', async ({ page, isMobile }, info) => {
    await page.goto('/aanpak.html');
    const cases = [
      ['small','simple',[],[995,1290]],
      ['medium','average',[],[1575,2150]],
      ['large','extensive',[],[2225,3050]],
      ['small','simple',['intake','blog','portfolio'],[1375,2025]],
      ['medium','simple',['booking','languages'],[1925,2800]],
      ['custom','simple',[],null], ['unknown','simple',[],null],
      ...['api','custom','shop'].map(extra=>['small','simple',[extra],null]),
      ['large','extensive',['intake','blog','portfolio','animation','languages','booking','integration'],null],
      ['large','extensive',['animation','languages','booking','integration'],null],
      ['large','extensive',['animation','languages','booking'],[2975,4450]]
    ];
    for (const [pages,complexity,extras,range] of cases) {
      const result=await page.evaluate(selection=>window.LKCommercial.calculate(selection),{type:'new',pages,complexity,extras});
      expect(result.range).toEqual(range);expect(result.custom).toBe(range===null);
      if(!range)expect(result.price).toBe('Persoonlijke offerte nodig');
    }
    // Individual published weights and duplicate-safe, order-independent selections.
    const weights={intake:[100,175],blog:[150,250],portfolio:[150,300],animation:[200,400],languages:[250,450],booking:[300,550],integration:[300,600]};
    for(const [extra,[low,high]] of Object.entries(weights)) {
      const result=await page.evaluate(extras=>window.LKCommercial.calculate({pages:'small',extras}),[extra,extra]);
      expect(result.range).toEqual([Math.floor((995+low)/25)*25,Math.ceil((1290+high)/25)*25]);
    }
    const widths=isMobile?[320,390]:[1440];
    for(const width of widths) {
      await page.setViewportSize({width,height:844});
      await page.goto('/aanpak.html?pages=medium&complexity=average&extra=booking&extra=languages');
      await expect(page.locator('#estimate-price')).toHaveText('€2.571,25–€3.811,50');
      await expect(page.locator('.estimate')).toContainText('excl. 21% btw');
      await expect(page.locator('#estimate-price').locator('..')).toHaveAttribute('aria-live','polite');
      await audit(page,info,`weighted-${width}`);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
      await page.locator('#use-estimate').focus();
      await audit(page,info,`weighted-cta-focused-${width}`);
      await page.keyboard.press('Enter');
      await expect(page.locator('#project-summary')).toHaveValue(/€2.125–€3.150 excl. 21% btw/);
      await expect(page.locator('#request-plan')).toContainText('Gemiddeld');
      await expect(page.locator('#request-plan')).toContainText('Afspraak / boekingssysteem');
      await expect(page.locator('#request-plan')).toContainText('Meerdere talen');
      await page.goto('/aanpak.html?pages=large&complexity=extensive&extra=animation&extra=languages&extra=booking&extra=integration');
      await expect(page.locator('#estimate-price')).toHaveText('Persoonlijke offerte nodig');
      await audit(page,info,`quotation-${width}`);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
      await page.locator('#use-estimate').click();
      await expect(page.locator('#project-summary')).toHaveValue(/Persoonlijke offerte nodig/);
      await expect(page.locator('#project-summary')).toHaveValue(/Externe integratie/);
    }
  });
  test('final UX polish contact disclosure, context, zoom and captures', async ({page,isMobile},info) => {
    test.setTimeout(90000);
    const sizes=[];
    for(const width of isMobile?[320,390]:[768,1024,1440]) {
      await page.setViewportSize({width,height:844});await page.goto('/contact.html');
      await page.evaluate(async()=>{await document.fonts.ready;for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(img=>img.decode()));});
      for(const id of ['name','email','interest','message','send-request'])await expect(page.locator('#'+id)).toBeVisible();
      for(const id of ['business','phone','website'])await expect(page.locator('#'+id)).toBeHidden();
      sizes.push({width,height:await page.evaluate(()=>document.documentElement.scrollHeight)});
      await page.screenshot({path:info.outputPath(`contact-compact-${width}.png`),fullPage:true});
      const summary=page.locator('#contact-extra summary');await summary.focus();await page.keyboard.press('Enter');
      await expect(page.locator('#contact-extra')).toHaveAttribute('open','');await expect(summary).toBeFocused();
      await page.locator('#business').fill('Fictief reviewbedrijf');await page.locator('#phone').fill('000000');
      await audit(page,info,`contact-extra-${width}`);
      await summary.focus();await page.keyboard.press('Space');await expect(page.locator('#business')).toBeHidden();
      await page.locator('#interest').selectOption('Mijn bestaande website laten beoordelen');await expect(page.locator('#website')).toBeVisible();
      await expect(page.locator('#business')).toHaveValue('Fictief reviewbedrijf');
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
    }
    await fs.writeFile(info.outputPath('contact-heights.json'),JSON.stringify(sizes));
    await page.setViewportSize({width:390,height:844});await page.goto('/');await page.locator('.assistant-footer').click();
    await page.evaluate(()=>{const nodes=[...document.querySelectorAll('#lk-assistant, #lk-assistant *')];const sizes=nodes.map(n=>parseFloat(getComputedStyle(n).fontSize));nodes.forEach((n,i)=>n.style.fontSize=sizes[i]*2+'px');});
    expect(await page.locator('.assistant-content').evaluate(n=>n.scrollWidth-n.clientWidth)).toBeLessThanOrEqual(1);
    await page.locator('#lk-assistant').getByRole('button',{name:'Ik wil contact opnemen',exact:true}).focus();
    await expect(page.locator('#lk-assistant').getByRole('button',{name:'Ik wil contact opnemen',exact:true})).toBeFocused();
    await page.screenshot({path:info.outputPath('assistant-text-200.png')});
    await page.keyboard.press('Escape');await expect(page.locator('.assistant-footer')).toBeFocused();

    await page.goto('/contact.html?type=existing&pages=medium');await expect(page.locator('#website')).toBeVisible();
    await page.goto('/contact.html');await page.evaluate(()=>window.LKApplyContactContext('type=existing&pages=small'));await expect(page.locator('#website')).toBeVisible();
    await page.setViewportSize({width:320,height:844});await page.emulateMedia({reducedMotion:'reduce'});
    for(const route of ['/contact.html','/aanpak.html']) {
      await page.goto(route);await page.evaluate(()=>{const nodes=[...document.querySelectorAll('body,body *')];const sizes=nodes.map(n=>parseFloat(getComputedStyle(n).fontSize));nodes.forEach((n,i)=>n.style.fontSize=sizes[i]*2+'px');});
      for(const summary of await page.locator('main details > summary').all())await summary.click();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
    }
  });
  test('compact disclosure keeps core information visible with keyboard and zoom', async ({ page, isMobile }, info) => {
    test.setTimeout(90000);
    const widths=isMobile?[320,390]:[768,1024,1440];
    for(const width of widths) {
      await page.setViewportSize({width,height:900});
      for(const route of ['/', '/aanpak.html']) {
        await page.goto(route);await page.evaluate(()=>document.fonts.ready);
        const core=await page.locator('[data-price]').evaluateAll(nodes=>nodes.filter(n=>['small','medium','large','custom','hosting','care'].includes(n.dataset.price)).map(n=>({key:n.dataset.price,hidden:!!n.closest('details:not([open])')})));
        expect(core.every(n=>!n.hidden)).toBe(true);expect(core.some(n=>n.key==='care')).toBe(true);
        expect(await page.locator('details details').count()).toBe(0);
        if(route.includes('aanpak')) {
          await expect(page.locator('#project-builder')).toBeVisible();
          await expect(page.locator('#ondersteuning')).toContainText('30');
          await expect(page.locator('[data-price="hourly"]')).toBeVisible();
          const details=page.locator('main details');
          for(let i=0;i<await details.count();i++) {
            const node=details.nth(i),summary=node.locator(':scope > summary');
            await summary.focus();await page.keyboard.press('Enter');await expect(node).toHaveAttribute('open','');await expect(summary).toBeFocused();
          }
          await audit(page,info,`disclosure-open-${width}`);
          for(let i=0;i<await details.count();i++){await details.nth(i).locator(':scope > summary').focus();await page.keyboard.press('Space');await expect(details.nth(i)).not.toHaveAttribute('open','');}
        }
        expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
        await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:info.outputPath(`compact-${route==='/'?'home':'approach'}-${width}.png`),fullPage:true});
      }
    }
    await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:320,height:844});await page.goto('/aanpak.html');
    await page.evaluate(()=>{const nodes=[...document.querySelectorAll('body,body *')];const sizes=nodes.map(n=>parseFloat(getComputedStyle(n).fontSize));nodes.forEach((n,i)=>{n.style.fontSize=sizes[i]*2+'px';});});
    for(const summary of await page.locator('main details > summary').all()){await summary.focus();await page.keyboard.press('Enter');}
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
    expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
    await page.screenshot({path:info.outputPath('disclosure-text-200.png'),fullPage:true});
  });
  test('context edit, project routes, stale choices and hostile input', async ({ page }) => {
    await page.goto('/contact.html?type=existing&pages=medium&extra=booking');
    await fill(page);
    await page.locator('#edit-plan').click();
    await expect(page.locator('#context-type')).toHaveValue('existing');
    await expect(page.locator('#context-pages')).toHaveValue('medium');
    await expect(page.locator('[value="booking"]')).toBeChecked();
    await page.locator('[value="booking"]').uncheck();
    await page.getByRole('button',{name:'Bewaar projectkeuze'}).click();
    await expect(page.locator('#message')).toHaveValue('Fictieve QA-aanvraag. Niet echt verzenden.');
    await expect(page.locator('#name')).toHaveValue('Test Ondernemer');
    await expect(page.locator('#request-plan')).toContainText('€1.390–€1.790');
    await page.locator('#interest').selectOption('Ik wil even overleggen');
    await expect(page.locator('#request-plan')).toBeHidden();
    await expect(page.locator('#project-summary')).toHaveValue('');
    for (const project of ['kelmora','velune','avren']) {
      await page.goto('/');
      const card=page.locator('#'+project);
      await expect(card).toContainText('Demo');
      await expect(card.locator('.project-links a').first()).toHaveAttribute('href', /demos\//);
      await page.goto('/contact.html?project='+project);
      await expect(page.locator('#request-plan')).toContainText(new RegExp(project,'i'));
    }
    await page.goto('/contact.html?project=%3Cimg%20src=x%20onerror=alert(1)%3E&type=invalid');
    await expect(page.locator('#request-plan')).toBeHidden();
    await expect(page.locator('#project-summary')).toHaveValue('');
  });
  test('all context editors preserve drafts and block unconfirmed selection', async ({ page }) => {
    let requests = 0;
    await page.route('https://formspree.io/**', route => { requests++; return route.fulfill({ json: { ok: true } }); });
    for (const query of ['project=kelmora', 'service=care', 'type=new&pages=small']) {
      await page.goto('/contact.html?' + query); await fill(page);
      await page.locator('#edit-plan').click();
      await page.locator('#send-request').click();
      await expect(page.locator('#form-status')).toContainText('Bewaar of annuleer');
      expect(requests).toBe(0);
      if (query.startsWith('project')) await page.locator('#context-reference').selectOption('avren');
      if (query.startsWith('service')) await page.locator('#context-reference').selectOption('hosting');
      if (query.startsWith('type')) await page.locator('#context-pages').selectOption('large');
      await page.getByRole('button', { name: 'Bewaar projectkeuze' }).click();
      await expect(page.locator('#message')).toHaveValue('Fictieve QA-aanvraag. Niet echt verzenden.');
      await expect(page.locator('#email')).toHaveValue('review@example.test');
      await expect(page.locator('#request-plan')).toContainText(query.startsWith('project') ? 'AVREN' : query.startsWith('service') ? '€24,90' : '€1.790–€2.290');
      await page.locator('#edit-plan').click();
      await page.getByRole('button', { name: 'Annuleren' }).click();
      await expect(page.locator('#context-editor')).toBeHidden();
    }
  });
  test('HTTP errors, invalid JSON and network failure retain input', async ({ page }) => {
    await page.addInitScript(() => {
      const original = window.fetch;
      window.fetch = async (url, options) => {
        if (String(url).startsWith('https://formspree.io/')) {
          if (window.mockStatus === 'network') throw new TypeError('Offline');
          return new window.Response(window.mockStatus === 'json' ? 'invalid-json' : '{}', { status: Number.isInteger(window.mockStatus) ? window.mockStatus : 200 });
        }
        return original(url, options);
      };
    });
    await page.goto('/contact.html'); await fill(page);
    for (const value of [429, 500, 400, 'json', 'network']) {
      await page.evaluate(value => { window.mockStatus = value; }, value);
      await page.locator('#send-request').click();
      await expect(page.locator('#form-status')).toHaveAttribute('data-state', 'error');
      await expect(page.locator('#send-request')).toBeEnabled();
      await expect(page.locator('#message')).toHaveValue('Fictieve QA-aanvraag. Niet echt verzenden.');
    }
  });
  test('form validation, URL safety, honeypot and accessible errors', async ({ page }, info) => {
    let requests=0;
    await page.route('https://formspree.io/**',route=>{requests++;return route.fulfill({json:{ok:true}});});
    await page.goto('/contact.html');
    await page.locator('#send-request').click();
    await expect(page.locator('#name')).toBeFocused();
    await expect(page.locator('#name')).toHaveAttribute('aria-invalid','true');
    await fill(page);
    await page.locator('#email').fill('ongeldig');
    await page.locator('#send-request').click();
    await expect(page.locator('#email')).toBeFocused();
    await page.locator('#email').fill('review@example.test');
    await page.locator('#contact-extra summary').click();
    await page.locator('#website').fill('javascript:alert(1)');
    await page.locator('#contact-extra summary').click();
    await page.locator('#send-request').click();
    await expect(page.locator('#website')).toBeFocused();
    await audit(page,info,'invalid-form');
    await page.locator('#website').fill('example.test');
    await page.locator('#extra-note').evaluate(e=>{e.value='spam';});
    await page.locator('#send-request').click();
    await expect(page.locator('#form-status')).toContainText('kon niet worden verstuurd');
    expect(requests).toBe(0);
    await expect(page.locator('#website')).toHaveValue('https://example.test/');
  });
  test('mocked success, sending lock, duplicate prevention and context cleanup', async ({ page }, info) => {
    let requests=0,body;
    await page.route('https://formspree.io/**',async route=>{
      requests++;body=route.request().postDataJSON();
      await new Promise(r=>setTimeout(r,500));
      await route.fulfill({json:{ok:true}});
    });
    await page.goto('/contact.html?type=new&pages=small');
    await fill(page);
    await page.locator('#send-request').click();
    await expect(page.locator('#send-request')).toBeDisabled();
    await page.locator('#contact-form').evaluate(form=>form.dispatchEvent(new Event('submit',{cancelable:true})));
    await expect(page.locator('#form-status')).toContainText('succesvol verzonden');
    expect(requests).toBe(1);
    expect(body.project_summary).toContain('€995–€1.290');
    await expect(page.locator('#project-summary')).toHaveValue('');
    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('#request-plan')).toBeHidden();
    await expect(page.locator('#form-status')).toBeFocused();
    await audit(page,info,'success-form');
  });
  test('unconfirmed response retains input and does not retry', async ({ page }, info) => {
    let requests=0;
    await page.route('https://formspree.io/**',route=>{requests++;return route.fulfill({json:{ok:false}});});
    await page.goto('/contact.html');await fill(page);
    await page.locator('#send-request').click();
    await expect(page.locator('#form-status')).toContainText('ontvangst kon niet worden bevestigd');
    await expect(page.locator('#message')).toHaveValue('Fictieve QA-aanvraag. Niet echt verzenden.');
    await expect(page.locator('#send-request')).toBeEnabled();
    expect(requests).toBe(1);
    await audit(page,info,'unconfirmed-form');
  });
  test('accordions, keyboard project browsing, metadata and static price fallbacks', async ({ page }, info) => {
    await page.goto('/');
    const projectLinks=page.locator('.project-links a');
    for(let i=0;i<await projectLinks.count();i++){
      await projectLinks.nth(i).focus();
      await expect(projectLinks.nth(i)).toBeInViewport();
    }
    await page.goto('/aanpak.html');
    const summary=page.locator('main details summary').first();
    await summary.focus();await page.keyboard.press('Enter');
    await expect(page.locator('main details').first()).toHaveAttribute('open','');
    await audit(page,info,'faq-open');
    for(const route of ['index.html','aanpak.html','contact.html']){
      await page.goto('/'+route);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',route==='index.html'?'https://lkwebdesign.be/':'https://lkwebdesign.be/'+route);
      const source=await fs.readFile(path.join(__dirname,'../../docs',route),'utf8');
      expect(source).not.toMatch(/€1\.190|€1\.990|€99(?!\d)|60 minuten|€55(?!\d)/);
      const prices=await page.locator('[data-price]').evaluateAll(nodes=>nodes.map(n=>({key:n.dataset.price,value:n.textContent})));
      for(const {key,value} of prices)expect(source).toContain(`data-price="${key}">${value}<`);
    }
  });
});
