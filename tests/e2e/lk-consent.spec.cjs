const {test,expect}=require('./fixtures.cjs');
const fs=require('node:fs/promises');
const AxeBuilder=require('@axe-core/playwright').default;

async function provider(page,mode='normal') {
  const requests=[];
  page.on('request',r=>{if(new URL(r.url()).pathname.startsWith('/__qa_analytics'))requests.push({method:r.method(),url:r.url(),body:r.postData()});});
  await page.route('http://127.0.0.1:4173/__qa_analytics',async route=>{
    expect(route.request().method()).toBe('POST');
    await route.fulfill({status:200,contentType:'application/json',body:'{}'});
  });
  await page.route('http://127.0.0.1:4173/measurement-config.js',route=>route.fulfill({contentType:'text/javascript',body:`
    window.__measurementFixture={inits:0,stops:0,clears:0,events:[]};
    window.LKMeasurementConfig=Object.freeze({enabled:true,policy:'qa-provider-v1',provider:{
      description:'Lokale QA-meetdienst. Alleen vaste actie- en paginacategorieën; geen persoonsgegevens. Geen echte provider. Testgegevens worden niet bewaard.',
      create({signal,isAllowed}) {
        window.__measurementFixture.inits++;
        if (${JSON.stringify(mode)}==='throws') throw Error('Fixture unavailable');
        if (${JSON.stringify(mode)}==='pending') return new Promise(()=>{});
        return {track(name,properties) {
          if(!isAllowed())return;
          if(${JSON.stringify(mode)}==='blocked')return Promise.reject(Error('Fixture blocked'));
          window.__measurementFixture.events.push({name,properties});
          return fetch('/__qa_analytics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,properties}),signal,credentials:'omit',referrerPolicy:'no-referrer'}).catch(()=>{});
        },stop(){window.__measurementFixture.stops++;},clear(){window.__measurementFixture.clears++;}};
      }
    }});` }));
  return requests;
}
async function accept(page) {
  await page.locator('#consent-banner').getByRole('button',{name:'Accepteren',exact:true}).click();
  await expect.poll(()=>page.evaluate(()=>window.LKAnalytics.status())).toBe('ready');
  await expect(page.locator('#main')).toBeFocused();await expect(page.locator('#main')).toBeInViewport();
}
async function events(page,name) {return page.evaluate(name=>window.__measurementFixture.events.filter(e=>!name||e.name===name),name);}
async function audit(page,info,state) {
  await page.evaluate(()=>document.fonts.ready);
  const result=await new AxeBuilder({page}).options({preload:{assets:['media']}}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
  await fs.writeFile(info.outputPath('axe-consent-'+state+'.json'),JSON.stringify(result,null,2));
  expect(result.violations).toEqual([]);
}
test.describe('LK Webdesign consent-first measurement',()=>{
  for(const width of [320,390,768,1440])test(`E1 consent never covers assistant keyboard focus at ${width}px`,async({page,context},info)=>{
    await provider(page);await page.setViewportSize({width,height:844});
    const banner=page.locator('#consent-banner'),dialog=page.locator('#privacy-dialog');
    const preferences=banner.getByRole('button',{name:'Voorkeuren',exact:true});
    const privacy=page.locator('#privacy-preferences'),dock=page.locator('#assistant-launch');
    async function unobscured(locator) {
      await expect(locator).toBeVisible();await expect(locator).toBeInViewport();
      await expect.poll(()=>locator.evaluate(e=>{
        const r=e.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);
        return hit===e||e.contains(hit);
      })).toBe(true);
    }
    async function dockClear() {
      // A yielded dock or a genuinely exposed dock is valid; a covered focus target is not.
      await expect.poll(()=>dock.evaluate(e=>{
        if(!e.getClientRects().length||getComputedStyle(e).visibility==='hidden')return true;
        const r=e.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);
        return hit===e||e.contains(hit);
      })).toBe(true);
    }
    async function firstVisit() {
      await page.goto('/');await page.evaluate(()=>localStorage.removeItem('lk.consent.v1'));await page.reload();
      await page.evaluate(()=>document.fonts.ready);await expect(banner).toBeVisible();
    }
    async function mainReturn() {
      await expect(banner).toBeHidden();await expect(page.locator('#main')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect.poll(()=>page.evaluate(()=>document.activeElement.matches('a[href],button,input,select,textarea'))).toBe(true);
      await unobscured(page.locator(':focus'));
    }
    await firstVisit();await privacy.scrollIntoViewIfNeeded();await unobscured(privacy);
    await dockClear();await page.screenshot({path:info.outputPath(`e1-${width}-banner-footer.png`)});
    await preferences.focus();await page.keyboard.press('Tab');
    if(await dock.evaluate(e=>e===document.activeElement))await unobscured(dock);
    await page.screenshot({path:info.outputPath(`e1-${width}-banner-tab.png`)});
    await preferences.focus();await page.keyboard.press('Enter');await expect(page.locator('#privacy-title')).toBeFocused();
    for(let i=0;i<8;i++){await page.keyboard.press('Tab');expect(await dialog.evaluate(e=>e.contains(document.activeElement))).toBe(true);await unobscured(page.locator(':focus'));}
    await page.screenshot({path:info.outputPath(`e1-${width}-preferences.png`)});await audit(page,info,'e1-preferences-'+width);
    await page.keyboard.press('Escape');await expect(preferences).toBeFocused();await unobscured(preferences);await dockClear();
    await page.keyboard.press('Enter');await dialog.getByRole('button',{name:'Sluiten',exact:true}).focus();await page.keyboard.press('Enter');
    await expect(preferences).toBeFocused();await unobscured(preferences);
    await page.keyboard.press('Enter');await dialog.getByRole('button',{name:'Bewaar voorkeuren',exact:true}).focus();await page.keyboard.press('Enter');await mainReturn();
    await privacy.focus();await page.keyboard.press('Enter');await page.keyboard.press('Escape');await expect(privacy).toBeFocused();await unobscured(privacy);await dockClear();
    await page.keyboard.press('Enter');await dialog.getByRole('button',{name:'Sluiten',exact:true}).focus();await page.keyboard.press('Enter');await expect(privacy).toBeFocused();await unobscured(privacy);
    const a=await dock.boundingBox(),p=await privacy.boundingBox();
    if(a)expect(a.x<p.x+p.width&&a.x+a.width>p.x&&a.y<p.y+p.height&&a.y+a.height>p.y).toBe(false);
    await page.screenshot({path:info.outputPath(`e1-${width}-footer-return.png`)});
    await firstVisit();await banner.getByRole('button',{name:'Accepteren',exact:true}).focus();await page.keyboard.press('Enter');await mainReturn();
    await expect.poll(()=>page.evaluate(()=>window.LKAnalytics.status())).toBe('ready');
    await privacy.focus();await page.keyboard.press('Enter');await dialog.getByRole('button',{name:'Weiger statistieken',exact:true}).focus();await page.keyboard.press('Enter');
    await expect(privacy).toBeFocused();await unobscured(privacy);await expect.poll(()=>page.evaluate(()=>window.LKAnalytics.status())).toBe('disabled');
    await firstVisit();await banner.getByRole('button',{name:'Weigeren',exact:true}).focus();await page.keyboard.press('Enter');await mainReturn();
    await privacy.scrollIntoViewIfNeeded();await dockClear();
    if(width>=768){
      // Cross-tab reset can make the banner reappear while the dock already has focus.
      await unobscured(dock);await dock.focus();await expect(dock).toBeFocused();
      const other=await context.newPage();await other.goto('/');await other.evaluate(()=>localStorage.removeItem('lk.consent.v1'));
      await expect(banner).toBeVisible();await expect(banner.getByRole('button',{name:'Accepteren',exact:true})).toBeFocused();
      await unobscured(page.locator(':focus'));await dockClear();await other.close();
    }
    await audit(page,info,'e1-return-'+width);
  });
  test('unconfigured provider has no prompt, no analytics, truthful accessible preferences',async({page,context},info)=>{
    const requests=[];page.on('request',r=>requests.push(r.url()));
    await page.goto('/');await expect(page.locator('#consent-banner')).toBeHidden();
    expect(await page.evaluate(()=>window.LKAnalytics.status())).toBe('disabled');
    expect(await context.cookies()).toEqual([]);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
    const trigger=page.locator('#privacy-preferences');await trigger.focus();await page.keyboard.press('Enter');
    await expect(page.locator('#privacy-title')).toBeFocused();await expect(page.locator('#analytics-consent')).not.toBeChecked();await expect(page.locator('#analytics-consent')).toBeDisabled();
    await expect(page.locator('#privacy-dialog')).toContainText('geen meetdienst aangesloten');await audit(page,info,'unconfigured');
    await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
    await page.locator('.lk-actions .lk-button').click();await expect(page.locator('#project-type')).toBeInViewport();
    expect(requests.some(u=>/google-analytics|googletagmanager|__qa_analytics/.test(u))).toBe(false);
  });
  test('first visit, accept, reject, persistence, withdrawal and cross-tab change',async({page,context})=>{
    const requests=await provider(page);await page.goto('/');
    await expect(page.locator('#consent-banner')).toBeVisible();expect(await page.evaluate(()=>window.__measurementFixture.inits)).toBe(0);
    await page.evaluate(()=>window.LKAnalytics.track('email_click',{location:'footer'}));expect(requests).toEqual([]);
    await page.locator('#consent-banner').getByRole('button',{name:'Weigeren',exact:true}).click();
    await expect(page.locator('#main')).toBeFocused();await expect(page.locator('#main')).toBeInViewport();await page.reload();
    await expect(page.locator('#consent-banner')).toBeHidden();expect(await page.evaluate(()=>window.__measurementFixture.inits)).toBe(0);
    await page.locator('#privacy-preferences').click();await expect(page.locator('#analytics-consent')).not.toBeChecked();await page.locator('#analytics-consent').check();
    await page.getByRole('button',{name:'Bewaar voorkeuren',exact:true}).click();await expect.poll(()=>page.evaluate(()=>window.LKAnalytics.status())).toBe('ready');
    await page.evaluate(()=>{window.LKConsent.choose(true);window.LKConsent.choose(true);});expect(await page.evaluate(()=>window.__measurementFixture.inits)).toBe(1);
    await page.evaluate(()=>window.LKAnalytics.track('email_click',{location:'footer'}));await expect.poll(()=>events(page,'email_click')).toHaveLength(1);
    await page.reload();await expect.poll(()=>page.evaluate(()=>window.LKAnalytics.status())).toBe('ready');expect(await events(page)).toEqual([]);
    await page.locator('#privacy-preferences').click();await page.getByRole('button',{name:'Weiger statistieken',exact:true}).click();
    await expect.poll(()=>page.evaluate(()=>window.LKAnalytics.status())).toBe('disabled');expect(await page.evaluate(()=>window.__measurementFixture.clears)).toBe(1);
    const count=requests.length;await page.evaluate(()=>window.LKAnalytics.track('email_click',{location:'footer'}));expect(requests).toHaveLength(count);
    const other=await context.newPage();await other.goto('/');await other.evaluate(()=>localStorage.removeItem('lk.consent.v1'));
    await expect(page.locator('#consent-banner')).toBeVisible();await other.close();
  });
  test('version, expiry, malformed consent and unavailable storage fail closed',async({page})=>{
    await provider(page);await page.goto('/');await accept(page);
    await page.evaluate(()=>{const v=JSON.parse(localStorage.getItem('lk.consent.v1'));v.policy='obsolete';localStorage.setItem('lk.consent.v1',JSON.stringify(v));});await page.reload();
    await expect(page.locator('#consent-banner')).toBeVisible();expect(await page.evaluate(()=>window.__measurementFixture.inits)).toBe(0);
    await page.evaluate(()=>localStorage.setItem('lk.consent.v1','{broken'));await page.reload();await expect(page.locator('#consent-banner')).toBeVisible();
    await accept(page);await page.evaluate(()=>{const v=JSON.parse(localStorage.getItem('lk.consent.v1'));v.updatedAt=Date.now()-181*86400000;v.expiresAt=v.updatedAt+180*86400000;localStorage.setItem('lk.consent.v1',JSON.stringify(v));});await page.reload();await expect(page.locator('#consent-banner')).toBeVisible();
    await page.addInitScript(()=>{window.Storage.prototype.getItem=()=>{throw Error('blocked');};window.Storage.prototype.setItem=()=>{throw Error('blocked');};});await page.reload();await accept(page);
    await page.locator('#privacy-preferences').click();await expect(page.locator('#privacy-dialog')).toContainText('alleen zolang deze pagina open blijft');
    await page.getByRole('button',{name:'Weiger statistieken'}).click();await page.locator('.lk-actions .lk-button').click();await expect(page.locator('#project-builder')).toBeVisible();
  });
  test('CTA, project, email and calculator events contain only safe categories',async({page})=>{
    await provider(page);await page.goto('/?email=private@example.test#secret');await accept(page);
    await page.locator('.lk-actions .lk-link').click();expect(await events(page,'secondary_cta_click')).toHaveLength(1);
    // Observe the real link click but cancel navigation: frozen demos are not retested.
    await page.locator('#kelmora .project-links a').evaluate(e=>e.addEventListener('click',event=>event.preventDefault(),{once:true}));await page.locator('#kelmora .project-links a').click();
    expect(await events(page,'project_view')).toEqual([{name:'project_view',properties:{page:'home',location:'content',project:'kelmora'}}]);
    await page.locator('footer a[href^="mailto:"]').evaluate(e=>e.addEventListener('click',event=>event.preventDefault(),{once:true}));await page.locator('footer a[href^="mailto:"]').click();expect(await events(page,'email_click')).toHaveLength(1);
    await page.locator('.lk-actions .lk-button').evaluate(e=>e.addEventListener('click',event=>event.preventDefault(),{once:true}));await page.locator('.lk-actions .lk-button').click();expect(await events(page,'primary_cta_click')).toHaveLength(1);
    const rejected=await page.evaluate(()=>['website_check_start','website_check_complete','whatsapp_click','unknown'].map(n=>window.LKAnalytics.track(n,{})).concat(window.LKAnalytics.track('email_click',{location:'footer',email:'private@example.test'}),window.LKAnalytics.track('email_click',{location:'private@example.test'}),window.LKAnalytics.track('generate_lead',{})));
    expect(rejected.every(x=>x===false)).toBe(true);expect(JSON.stringify(await events(page))).not.toMatch(/private|secret|email=|https?:/);
    await page.goto('/aanpak.html?pages=small');await expect.poll(()=>page.evaluate(()=>window.LKAnalytics.status())).toBe('ready');
    await page.locator('#project-pages').focus();await page.locator('#project-pages').selectOption('medium');
    await page.locator('#use-estimate').evaluate(e=>e.addEventListener('click',event=>event.preventDefault()));await page.locator('#use-estimate').dblclick();
    expect(await events(page,'calculator_start')).toHaveLength(1);expect(await events(page,'calculator_complete')).toEqual([{name:'calculator_complete',properties:{page:'approach',pages:'medium'}}]);
  });
  test('lead only after confirmed mocked success, exactly once; failed and duplicate attempts never count',async({page})=>{
    const requests=await provider(page);
    // Match the existing failure-state tests: response-shaped transport stubs avoid
    // browser-generated HTTP-error console noise without weakening the console guard.
    await page.addInitScript(()=>{
      const original=window.fetch;window.__formFixture={status:500,body:'{}',count:0};
      window.fetch=async(url,options)=>{
        if(!String(url).startsWith('https://formspree.io/'))return original(url,options);
        window.__formFixture.count++;await new Promise(r=>setTimeout(r,80));
        const {status,body}=window.__formFixture;return {ok:status>=200&&status<300,status,json:async()=>JSON.parse(body)};
      };
    });
    await page.goto('/contact.html?message=never-collect');await accept(page);
    await page.locator('#name').fill('Fictieve Persoon');await page.locator('#email').fill('private@example.test');await page.locator('#message').fill('Fictieve geheime inhoud');expect(await events(page,'contact_start')).toHaveLength(1);
    await page.locator('#send-request').click();await expect(page.locator('#form-status')).toHaveAttribute('data-state','error');expect(await events(page,'generate_lead')).toEqual([]);
    for(const body of ['{"ok":false}','not-json']){await page.evaluate(body=>Object.assign(window.__formFixture,{status:200,body}),body);await page.locator('#send-request').click();await expect(page.locator('#form-status')).toHaveAttribute('data-state','error');expect(await events(page,'generate_lead')).toEqual([]);}
    await page.evaluate(()=>Object.assign(window.__formFixture,{status:200,body:'{"ok":true}'}));const before=await page.evaluate(()=>window.__formFixture.count);await page.locator('#send-request').dblclick();await expect(page.locator('#form-status')).toHaveAttribute('data-state','success');expect(await page.evaluate(()=>window.__formFixture.count)-before).toBe(1);
    expect(await events(page,'generate_lead')).toEqual([{name:'generate_lead',properties:{page:'contact'}}]);
    await page.evaluate(()=>window.dispatchEvent(new CustomEvent('lk:interaction',{detail:{name:'contact_submit_success',receipt:1}})));expect(await events(page,'generate_lead')).toHaveLength(1);
    await page.locator('#name').fill('Fictieve Persoon');await page.locator('#email').fill('private@example.test');await page.locator('#message').fill('Fictieve geheime inhoud');await page.locator('#send-request').click();await expect(page.locator('#form-status')).toContainText('al ontvangen');expect(await events(page,'generate_lead')).toHaveLength(1);
    expect(JSON.stringify(requests)).not.toMatch(/private@|Fictieve|geheime|never-collect/);
    await page.reload();await expect.poll(()=>page.evaluate(()=>window.LKAnalytics.status())).toBe('ready');expect(await events(page,'generate_lead')).toEqual([]);
    await page.goto('/aanpak.html');await page.goBack();await expect.poll(()=>page.evaluate(()=>window.LKAnalytics.status())).toBe('ready');
    expect(requests.filter(r=>r.body&&JSON.parse(r.body).name==='generate_lead')).toHaveLength(1);
  });
  test('provider throw, blocked delivery and timeout cannot break necessary UX',async({page})=>{
    for(const mode of ['throws','blocked','pending']){
      await provider(page,mode);await page.goto('/');await page.evaluate(()=>localStorage.removeItem('lk.consent.v1'));await page.reload();
      await page.locator('#consent-banner').getByRole('button',{name:'Accepteren',exact:true}).click();
      await expect.poll(()=>page.evaluate(()=>window.LKAnalytics.status()),{timeout:5000}).toBe(mode==='blocked'?'ready':'unavailable');
      await page.locator('.lk-actions .lk-button').click();await expect(page.locator('#project-builder')).toBeVisible();await page.locator('#project-pages').selectOption('medium');await expect(page.locator('#estimate-price')).not.toBeEmpty();
    }
  });
  test('consent states are keyboard-accessible, equal-choice, responsive and reviewed captures',async({page},info)=>{
    await provider(page);
    for(const width of [320,390,768,1440]){
      await page.setViewportSize({width,height:844});await page.goto('/');await page.evaluate(()=>localStorage.removeItem('lk.consent.v1'));await page.reload();await page.evaluate(()=>document.fonts.ready);
      const banner=page.locator('#consent-banner');await expect(banner).toBeVisible();await banner.screenshot({path:info.outputPath('consent-banner-'+width+'.png')});
      const acceptBox=await banner.getByRole('button',{name:'Accepteren',exact:true}).boundingBox(),rejectBox=await banner.getByRole('button',{name:'Weigeren',exact:true}).boundingBox();expect(acceptBox.height).toBe(rejectBox.height);expect(rejectBox.height).toBeGreaterThanOrEqual(44);
      await banner.getByRole('button',{name:'Voorkeuren',exact:true}).focus();await page.keyboard.press('Enter');await expect(page.locator('#privacy-title')).toBeFocused();await expect(page.locator('#analytics-consent')).not.toBeChecked();
      await page.keyboard.press('Shift+Tab');await expect(page.getByRole('button',{name:'Sluiten',exact:true})).toBeFocused();await page.keyboard.press('Tab');await expect(page.locator('#analytics-consent')).toBeFocused();
      for(let i=0;i<8;i++){await page.keyboard.press('Tab');expect(await page.evaluate(()=>document.getElementById('privacy-dialog').contains(document.activeElement))).toBe(true);}
      await page.locator('#privacy-dialog').screenshot({path:info.outputPath('consent-preferences-'+width+'.png')});await audit(page,info,'preferences-'+width);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
      await page.keyboard.press('Escape');await expect(banner.getByRole('button',{name:'Voorkeuren',exact:true})).toBeFocused();
    }
    await audit(page,info,'banner');
    await page.locator('#consent-banner').getByRole('button',{name:'Voorkeuren',exact:true}).click();
    await page.getByRole('button',{name:'Weiger statistieken',exact:true}).click();
    await expect(page.locator('#main')).toBeFocused();await expect(page.locator('#main')).toBeInViewport();
    await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:320,height:480});
    await page.route('http://127.0.0.1:4173/__qa_consent_zoom.css',route=>route.fulfill({contentType:'text/css',body:'.consent-dialog p,.consent-option,.consent-dialog button {font-size:200%!important}'}));
    await page.addStyleTag({url:'http://127.0.0.1:4173/__qa_consent_zoom.css'});await page.locator('#privacy-preferences').click();
    await expect(page.locator('#privacy-title')).toBeFocused();expect(await page.evaluate(()=>document.getElementById('privacy-dialog').scrollWidth<=document.getElementById('privacy-dialog').clientWidth+1)).toBe(true);
    await page.getByRole('button',{name:'Sluiten',exact:true}).focus();await expect(page.getByRole('button',{name:'Sluiten',exact:true})).toBeInViewport();await page.keyboard.press('Enter');await expect(page.locator('#privacy-preferences')).toBeFocused();
  });
});
