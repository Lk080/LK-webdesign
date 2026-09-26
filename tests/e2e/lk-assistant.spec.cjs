const { test, expect } = require('./fixtures.cjs');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('node:fs/promises');
const dialog = page => page.locator('#lk-assistant');
async function choose(page, name) { await dialog(page).getByRole('button', { name, exact: true }).click(); }
async function open(page, reset = false) {
  await page.locator('.assistant-footer').click();
  await expect(dialog(page)).toBeVisible();
  if (reset) await choose(page, 'Opnieuw beginnen');
}
async function audit(page, info, state) {
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
  if (await dialog(page).isVisible()) {
    for (const details of await dialog(page).locator('details').all()) {
      if (!await details.getAttribute('open') && await details.getAttribute('open') !== '') {
        await details.locator('summary').focus(); await page.keyboard.press('Enter');
        await expect(details).toHaveAttribute('open', '');
        await page.keyboard.press('Space'); await expect(details).not.toHaveAttribute('open', '');
      }
    }
  }
  const result = await new AxeBuilder({page}).options({preload:{assets:['media']}}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
  await fs.writeFile(info.outputPath(`axe-assistant-${state}.json`), JSON.stringify(result,null,2));
  expect(result.violations).toEqual([]);
}
const entries = ['Wat kost een website?','Welke optie past bij mij?','Ik heb al een website','Hosting & onderhoud','Hoe werkt een project?','Bekijk voorbeelden','Ik wil contact opnemen'];

test.describe('LK Webdesign guided assistant V2', () => {
  test('seven entries, keyboard modal, focus return, back, reset and reopen', async ({page}, info) => {
    await page.goto('/'); await audit(page,info,'closed');
    const trigger=page.locator('.assistant-footer');
    await trigger.focus();await page.keyboard.press('Enter');
    await expect(page.locator('#assistant-title')).toBeFocused();
    await expect(page.locator('html')).toHaveClass(/assistant-open/);
    for(const name of entries)await expect(dialog(page).getByRole('button',{name,exact:true})).toBeVisible();
    await expect(dialog(page)).toContainText('Een gerichte keuzehulp voor je website.');
    await expect(dialog(page).getByRole('button',{name:'← Vorige stap',includeHidden:true})).toBeHidden();
    await audit(page,info,'start');
    for(let i=0;i<14;i++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(()=>document.getElementById('lk-assistant').contains(document.activeElement))).toBe(true);
    }
    await page.locator('#assistant-title').focus();await page.keyboard.press('Shift+Tab');
    await expect(dialog(page).getByRole('button',{name:'Opnieuw beginnen'})).toBeFocused();
    await choose(page,'Wat kost een website?');await audit(page,info,'pages');
    await choose(page,'4–5 pagina’s');await audit(page,info,'complexity');
    await choose(page,'Eenvoudig');await expect(dialog(page)).toContainText('€1.390–€1.790');
    await choose(page,'← Vorige stap');await expect(page.locator('#assistant-title')).toHaveText('Welke opbouw past erbij?');
    await choose(page,'← Vorige stap');await expect(page.locator('#assistant-title')).toHaveText('Hoe groot wordt je website?');
    await choose(page,'Opnieuw beginnen');await expect(page.locator('#assistant-title')).toHaveText('Waar kan ik je mee helpen?');
    await choose(page,'Hoe werkt een project?');await page.keyboard.press('Escape');
    await expect(dialog(page)).toBeHidden();await expect(trigger).toBeFocused();
    await expect(page.locator('html')).not.toHaveClass(/assistant-open/);
    await page.keyboard.press('Enter');await expect(page.locator('#assistant-title')).toHaveText('Van eerste idee naar online.');
    await choose(page,'Sluiten ×');await expect(trigger).toBeFocused();
  });
  test('page ranges, complex choices and calculator/contact handoff', async ({page},info) => {
    for(const [label,key,price] of [['1–3 pagina’s','small','€995–€1.290'],['4–5 pagina’s','medium','€1.390–€1.790'],['6–8 pagina’s','large','€1.790–€2.290'],['9+ pagina’s','custom','Persoonlijke offerte'],['Nog te bepalen','unknown','Persoonlijke offerte']]) {
      await page.goto('/');await open(page,true);await choose(page,entries[0]);await choose(page,label);await choose(page,'Eenvoudig');
      await expect(dialog(page)).toContainText(price);
      const target = new URL(await dialog(page).getByRole('link',{name:'Verfijn in de prijscalculator ↗'}).getAttribute('href'),'http://127.0.0.1:4173');
      expect(target.pathname).toBe('/aanpak.html');expect(target.searchParams.get('pages')).toBe(key);expect(target.searchParams.get('complexity')).toBe('simple');
    }
    await audit(page,info,'custom-result');
    await dialog(page).getByRole('link',{name:'Bespreek deze indicatie',exact:true}).click();
    await expect(page.locator('#assistant-source')).toHaveValue('new_website');
    await expect(page.locator('#request-plan')).toContainText('Nog te bepalen');
    await page.goto('/');await open(page,true);await choose(page,entries[0]);await choose(page,'4–5 pagina’s');await choose(page,'Uitgebreid');
    const expected=await page.evaluate(()=>window.LKCommercial.calculate({type:'new',pages:'medium',complexity:'extensive',extras:[]}).price);
    await expect(dialog(page)).toContainText(expected);
    await dialog(page).getByRole('link',{name:'Verfijn in de prijscalculator ↗'}).click();
    await expect(page.locator('#project-pages')).toHaveValue('medium');await expect(page.locator('[name="complexity"][value="extensive"]')).toBeChecked();
  });
  test('situations, replacement and direct contact routes preserve minimum context', async ({page},info) => {
    for(const [choice,type] of [['Ik heb nog geen website','new'],['Ik wil professioneler overkomen','existing'],['Ik heb extra functies nodig','new']]) {
      await page.goto('/');await open(page,true);await choose(page,entries[1]);await choose(page,choice);
      await audit(page,info,'situation-'+type+'-'+choice.length);
      await dialog(page).getByRole('link',{name:'Bespreek mijn situatie'}).click();
      await expect(page.locator('#interest')).toHaveValue(type==='existing'?'Mijn bestaande website laten beoordelen':'Een nieuwe website');
      await expect(page.locator('#request-plan')).toContainText('Nog te bepalen');
    }
    await page.goto('/');await open(page,true);await choose(page,entries[1]);await choose(page,'Ik wil mijn website vervangen');
    await expect(dialog(page)).toContainText('bestaande domein');await audit(page,info,'replacement');
    await dialog(page).getByRole('link',{name:'Bespreek mijn huidige website ↗'}).click();
    await expect(page.locator('#assistant-source')).toHaveValue('existing_website');
    await page.locator('#interest').selectOption('Een nieuwe website');await expect(page.locator('#assistant-source')).toHaveValue('');
    await page.goto('/');await open(page,true);await choose(page,entries[6]);await audit(page,info,'contact');
    await dialog(page).getByRole('link',{name:'Naar contact ↗'}).click();
    await expect(page.locator('#assistant-source')).toHaveValue('contact');await expect(page.locator('#interest')).toHaveValue('Ik wil even overleggen');
    await page.goto('/contact.html?service=both&assistant_source=%3Cimg%20onerror%3Dalert(1)%3E');await expect(page.locator('#assistant-source')).toHaveValue('');
  });
  test('hosting, domain and inclusive care with editable legacy context', async ({page},info) => {
    for(const [choice,key,price] of [['LK Hosting','hosting','€24,90'],['LK Care','care','€59,00']]) {
      await page.goto('/');await open(page,true);await choose(page,entries[3]);await audit(page,info,'support');
      await expect(dialog(page)).toContainText('Care is inclusief Hosting');
      await choose(page,choice);await expect(dialog(page)).toContainText(price+' / maand');
      if(key==='care') {await expect(dialog(page)).toContainText('30 minuten');await expect(dialog(page)).toContainText('€65,00/uur');await expect(dialog(page)).toContainText('minuten vervallen');}
      const scope=dialog(page).locator('details');await scope.locator('summary').focus();await page.keyboard.press('Enter');
      await expect(scope).toHaveAttribute('open','');await expect(scope).toContainText('jaarlijks apart aangerekend');
      await audit(page,info,key);
      await dialog(page).getByRole('link',{name:'Bespreek deze keuze ↗'}).click();
      await expect(page.locator('#assistant-source')).toHaveValue(key);await expect(page.locator('#request-plan-text')).toContainText(price);
      await page.locator('#message').fill('Mijn concept blijft staan.');await page.locator('#edit-plan').click();await page.locator('#context-reference').selectOption('care');
      await page.getByRole('button',{name:'Bewaar projectkeuze'}).click();await expect(page.locator('#request-plan-text')).toContainText('€59');await expect(page.locator('#message')).toHaveValue('Mijn concept blijft staan.');
      await page.locator('#remove-plan').click();await expect(page.locator('#project-summary')).toHaveValue('');
    }
    await page.goto('/contact.html?service=both&assistant_source=both');await expect(page.locator('#request-plan-text')).toContainText('€59');
    await page.locator('#edit-plan').click();await expect(page.locator('#context-reference')).toHaveValue('care');await expect(page.locator('#context-reference option')).toHaveCount(2);
    expect(await page.evaluate(()=>window.LKCommercial.data.both)).toBe(59);
  });
  test('process and all demo routes are clear without navigating frozen demos', async ({page},info) => {
    await page.goto('/');await open(page,true);await choose(page,entries[4]);
    await expect(dialog(page).locator('ol li')).toHaveCount(6);await expect(dialog(page)).toContainText('2–4 weken');await expect(dialog(page)).toContainText('Geen garantie of minimumduur');await audit(page,info,'process');
    for(const [name,key,route] of [['Kelmora','kelmora','vakman'],['Velune','velune','beauty'],['AVREN','avren','automotive']]) {
      await choose(page,'Opnieuw beginnen');await choose(page,entries[5]);await audit(page,info,'examples');
      await dialog(page).getByRole('button',{name:new RegExp('^'+name+' ·')}).click();
      await expect(page.locator('#assistant-title')).toHaveText(name+' — demoproject');
      await expect(dialog(page).getByRole('link',{name:'Bekijk de demo ↗'})).toHaveAttribute('href','demos/'+route+'/');
      await expect(dialog(page).getByRole('link',{name:'Bespreek dit voorbeeld'})).toHaveAttribute('href','contact.html?project='+key);
      await audit(page,info,'demo-'+key);
    }
    await dialog(page).getByRole('link',{name:'Bespreek dit voorbeeld'}).click();await expect(page.locator('#request-plan-text')).toContainText('AVREN');
  });
  test('live calculator, current page and session context with optional storage', async ({page}) => {
    await page.goto('/aanpak.html?type=existing&pages=large&complexity=average&extra=blog&extra=api');
    await open(page);await expect(dialog(page)).toContainText('6–8 pagina’s');
    await expect(dialog(page).locator('.assistant-choice').nth(1)).toHaveText('Hosting & onderhoud');
    await dialog(page).getByRole('link',{name:'Bespreek deze indicatie ↗'}).click();
    await expect(page.locator('#request-plan-text')).toContainText('Gemiddeld');await expect(page.locator('#request-plan-text')).toContainText('Blog / nieuws');await expect(page.locator('#request-plan-text')).toContainText('AI, API');
    await page.goto('/aanpak.html');await page.locator('#project-pages').selectOption('medium');await page.locator('[value="extensive"]').check();
    await open(page);await expect(dialog(page)).toContainText('4–5 pagina’s');await expect(dialog(page)).toContainText('Uitgebreid');
    await choose(page,'Sluiten ×');await page.goto('/');await open(page);await expect(dialog(page)).toContainText('4–5 pagina’s');
    await choose(page,'Opnieuw beginnen');await expect(dialog(page).locator('.assistant-context')).toHaveCount(0);
    await choose(page,'Sluiten ×');await page.reload();await open(page);await expect(dialog(page).locator('.assistant-context')).toHaveCount(0);
    await choose(page,'Sluiten ×');await page.goto('/contact.html?project=kelmora');await open(page);await expect(dialog(page).locator('.assistant-choice').first()).toHaveText('Bekijk voorbeelden');
    await page.addInitScript(()=>{Object.defineProperty(window,'sessionStorage',{get(){throw new Error('Storage unavailable');}});});
    await page.goto('/');await open(page);await choose(page,entries[0]);await choose(page,'1–3 pagina’s');await choose(page,'Eenvoudig');await expect(dialog(page)).toContainText('€995–€1.290');
  });
  test('mobile geometry, controls, reduced motion and CTA clearance', async ({page},info) => {
    for(const width of [320,390,768,1440]) {
      await page.setViewportSize({width,height:844});await page.goto('/');await open(page,true);
      await page.screenshot({path:info.outputPath(`assistant-start-${width}.png`)});
      await choose(page,entries[3]);await choose(page,'LK Care');
      const box=await dialog(page).boundingBox();expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(width);expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y+box.height).toBeLessThanOrEqual(844);
      await expect(dialog(page).getByRole('button',{name:'Sluiten ×'})).toBeInViewport();await expect(dialog(page).getByRole('button',{name:'← Vorige stap'})).toBeInViewport();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
      if(width===320||width===390){await audit(page,info,'mobile-'+width);await page.screenshot({path:info.outputPath(`assistant-care-${width}.png`)});}
    }
    await page.emulateMedia({reducedMotion:'reduce'});await choose(page,'Sluiten ×');await open(page);expect(await dialog(page).evaluate(n=>getComputedStyle(n).animationName)).toBe('none');
    await choose(page,'Sluiten ×');await page.setViewportSize({width:390,height:844});await page.goto('/contact.html');await page.locator('#name').focus();await expect(page.locator('#assistant-launch')).toBeHidden();
    await page.goto('/aanpak.html#projectkeuze');await page.locator('#project-pages').focus();await expect(page.locator('#assistant-launch')).toBeHidden();
    await page.goto('/');await page.locator('.lk-menu').click();await expect(page.locator('#assistant-launch')).toBeHidden();
  });
  test('same-page contact preserves drafts, pending edits and sending lock', async ({page}) => {
    await page.goto('/contact.html');await page.locator('#name').fill('Test Ondernemer');await page.locator('#email').fill('review@example.test');await page.locator('#message').fill('Bestaand concept.');
    await open(page,true);await choose(page,entries[3]);await choose(page,'LK Care');await dialog(page).getByRole('link',{name:'Bespreek deze keuze ↗'}).click();
    await expect(page.locator('#message')).toHaveValue('Bestaand concept.');await expect(page.locator('#request-plan')).toBeFocused();await expect(page.locator('#assistant-source')).toHaveValue('care');
    await open(page,true);await choose(page,entries[0]);await choose(page,'1–3 pagina’s');await choose(page,'Eenvoudig');
    await page.locator('#contact-form').evaluate(n=>n.setAttribute('aria-busy','true'));
    await dialog(page).getByRole('link',{name:'Bespreek deze indicatie',exact:true}).click();await expect(dialog(page)).toContainText('Je aanvraag wordt nu verstuurd');await expect(page.locator('#project-summary')).toHaveValue(/€59/);
    await page.locator('#contact-form').evaluate(n=>n.removeAttribute('aria-busy'));await dialog(page).getByRole('link',{name:'Bespreek deze indicatie',exact:true}).click();
    await expect(page.locator('#request-plan-text')).toContainText('€995–€1.290');await expect(page.locator('#name')).toHaveValue('Test Ondernemer');await expect(page.locator('#email')).toHaveValue('review@example.test');await expect(page.locator('#message')).toHaveValue('Bestaand concept.');
  });
  test('no assistant network, only whitelisted session choices and local events', async ({page}) => {
    await page.goto('/');await page.evaluate(()=>{window.assistantEvents=[];window.addEventListener('lk:interaction',e=>window.assistantEvents.push(e.detail.name));});
    await page.evaluate(async()=>{for(const img of document.images)img.loading='eager';await document.fonts.ready;await Promise.all([...document.images].map(img=>img.decode()));});
    const requests=[];page.on('request',r=>requests.push(r.url()));
    await open(page,true);await choose(page,entries[3]);await choose(page,'LK Care');await choose(page,'Sluiten ×');expect(requests).toEqual([]);
    const stored=await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage),state:JSON.parse(sessionStorage.getItem('lk.assistant.v2'))}));
    expect(stored.local).toEqual([]);expect(stored.session).toEqual(['lk.assistant.v2']);expect(Object.keys(stored.state).sort()).toEqual(['contextKind','meaningful','project','query','screen','service','situation','version']);
    expect([...new URLSearchParams(stored.state.query).keys()].every(k=>['type','pages','complexity','extra'].includes(k))).toBe(true);
    await expect.poll(()=>page.evaluate(()=>window.assistantEvents)).toEqual(expect.arrayContaining(['assistant_open','assistant_hosting_care','assistant_close']));
    await page.evaluate(()=>sessionStorage.setItem('lk.assistant.v2',JSON.stringify({version:2,screen:'<script>',query:'type=bad&pages=bad&extra=evil&email=private@example.test',meaningful:true,contextKind:'project',project:'<img>',service:'83,90'})));
    await page.reload();await open(page);await expect(page.locator('#assistant-title')).toHaveText('Waar kan ik je mee helpen?');
    expect(await page.evaluate(()=>sessionStorage.getItem('lk.assistant.v2'))).not.toMatch(/private|evil|<script>|83,90/);
  });
});
