(() => {
  'use strict';
  const commercial = window.LKCommercial;
  if (!commercial || typeof HTMLDialogElement === 'undefined') return;
  const knowledge = commercial.knowledge;
  const signal = name => window.dispatchEvent(new CustomEvent('lk:interaction', { detail: { name } }));
  const dock = document.createElement('button');
  dock.type = 'button'; dock.className = 'assistant-launch'; dock.id = 'assistant-launch';
  dock.textContent = 'LK Assistent ↗'; dock.setAttribute('aria-haspopup', 'dialog');
  dock.setAttribute('aria-controls', 'lk-assistant'); dock.setAttribute('aria-expanded', 'false');
  document.body.append(dock);
  const footer = dock.cloneNode(true);
  footer.removeAttribute('id'); footer.className = 'text-button assistant-footer';
  document.querySelector('.footer-inner > div:last-of-type').append(footer);
  const titles = { start: 'Waar kan ik je mee helpen?', pricing: 'Hoe groot wordt je website?', complexity: 'Welke opbouw past erbij?', result: 'Een eerste prijsrichting.', fitting: 'Wat herken je?', recommend: 'Dit kan bij je passen.', existing: 'Verder met wat al werkt.', support: 'Hosting of onderhoud?', service: 'Ondersteuning die bij je past.', process: 'Van eerste idee naar online.', examples: 'Drie demo’s, drie karakters.', example: 'Een voorbeeld voor je plannen.', contact: 'Bespreek het met Lorenz.' };
  const demos = { kelmora: { name: 'Kelmora', sector: 'Techniek & vakbedrijven', route: 'demos/vakman/' }, velune: { name: 'Velune', sector: 'Beauty & wellness', route: 'demos/beauty/' }, avren: { name: 'AVREN', sector: 'Premium automotive', route: 'demos/automotive/' } };
  const storageKey = 'lk.assistant.v2';
  const initialSelection = () => commercial.read(new URLSearchParams());
  let dialog, content, title, back, opener, destinationFocus, screen = 'start';
  let selection = initialSelection(), meaningful = false, contextKind = '', service = 'hosting', project = 'kelmora', situation = 'new';
  let lastPageQuery = null, skipPageContext = false;
  const history = [];
  const cleanSelection = value => commercial.read(new URLSearchParams(commercial.query(value)));
  function state() { return { screen, selection: cleanSelection(selection), meaningful, contextKind, service, project, situation }; }
  function restore(value) { ({ screen, selection, meaningful, contextKind, service, project, situation } = value); }
  function remember() {
    // Fixed choices only: never read or persist contact names, email or message fields.
    try { sessionStorage.setItem(storageKey, JSON.stringify({ version: 2, screen, query: commercial.query(selection), meaningful, contextKind, service, project, situation })); } catch { /* Storage is optional. */ }
  }
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if (saved?.version === 2 && typeof saved.query === 'string' && saved.query.length < 1000) {
      selection = commercial.read(new URLSearchParams(saved.query));
      meaningful = saved.meaningful === true;
      if (Object.hasOwn(titles, saved.screen)) screen = saved.screen;
      if (['project','service','demo'].includes(saved.contextKind)) contextKind = saved.contextKind;
      if (['hosting','care'].includes(saved.service)) service = saved.service;
      if (Object.hasOwn(demos, saved.project)) project = saved.project;
      if (['new','replace','professional','features'].includes(saved.situation)) situation = saved.situation;
      if (screen !== 'start') history.push({ ...state(), screen: 'start' });
    }
  } catch { /* An unavailable or invalid session never blocks the assistant. */ }
  function pageContext() {
    if (skipPageContext) return;
    const params = new URLSearchParams(location.search);
    if (typeof window.LKCalculatorSelection === 'function') {
      const current = cleanSelection(window.LKCalculatorSelection());
      const key = commercial.query(current);
      if (key !== lastPageQuery) { selection = current; meaningful = true; contextKind = 'project'; screen = 'start'; history.length = 0; lastPageQuery = key; }
    } else if (params.has('type') && Object.hasOwn(commercial.types, params.get('type'))) {
      const key = commercial.query(commercial.read(params));
      if (key !== lastPageQuery) { selection = commercial.read(params); meaningful = true; contextKind = 'project'; screen = 'start'; history.length = 0; lastPageQuery = key; }
    } else if (Object.hasOwn(commercial.services, params.get('service'))) {
      const key = params.get('service') === 'hosting' ? 'hosting' : 'care';
      if ('service:'+key !== lastPageQuery) { service = key; contextKind = 'service'; screen = 'start'; history.length = 0; lastPageQuery = 'service:'+key; }
    } else if (Object.hasOwn(demos, params.get('project'))) {
      const key = params.get('project');
      if ('demo:'+key !== lastPageQuery) { project = key; contextKind = 'demo'; screen = 'start'; history.length = 0; lastPageQuery = 'demo:'+key; }
    }
  }
  window.addEventListener('lk:calculator-change', () => { skipPageContext = false; pageContext(); remember(); if (dialog?.open) render(); });
  function element(tag, text, className) {
    const node = document.createElement(tag); if (text) node.textContent = text;
    if (className) node.className = className; return node;
  }
  function paragraph(text, className) { content.append(element('p', text, className)); }
  function action(text, next, value) {
    const button = element('button', text, 'assistant-choice'); button.type = 'button'; button.setAttribute('aria-label', text);
    button.addEventListener('click', () => go(next, value)); content.append(button);
  }
  function link(text, href, primary = false, event = '') {
    const anchor = element('a', text, primary ? 'button dark' : 'lk-link'); anchor.href = href;
    anchor.addEventListener('click', click => {
      const destination = new URL(anchor.href);
      if (destination.pathname.endsWith('/contact.html') && window.LKApplyContactContext) {
        click.preventDefault();
        if (!window.LKApplyContactContext(destination.search)) {
          let status = content.querySelector('[role="status"]');
          if (!status) { status = element('p', '', 'assistant-note'); status.setAttribute('role', 'status'); content.append(status); }
          status.textContent = 'Je aanvraag wordt nu verstuurd. Wacht even tot dit klaar is; je keuzes zijn niet gewijzigd.';
          return;
        }
        window.history.replaceState(null, '', destination.pathname + destination.search);
        const context = document.getElementById('request-plan');
        destinationFocus = context.hidden ? document.getElementById('interest') : context;
        if (destinationFocus === context) context.tabIndex = -1;
      }
      remember(); if (event) signal(event); dialog.close();
    }); content.append(anchor);
  }
  const calculatorLink = () => `aanpak.html?${commercial.query(selection)}#projectkeuze`;
  function contactLink() {
    if (contextKind === 'service') return `contact.html?service=${service}&assistant_source=${service}`;
    if (contextKind === 'demo') return `contact.html?project=${project}`;
    if (meaningful) {
      const source = selection.type === 'existing' ? 'existing_website' : selection.type === 'automation' ? 'automation' : 'new_website';
      return `contact.html?${commercial.query(selection)}&assistant_source=${source}`;
    }
    return 'contact.html?assistant_source=contact';
  }
  function serviceOverview(key) {
    const section = element('section', '', 'assistant-service');
    const heading = element('div', '', 'assistant-service-heading');
    heading.append(element('h3', commercial.services[key]), element('p', `${commercial.inclusivePrice(key)} / maand incl. 21% btw`, 'assistant-service-price'));
    section.append(heading, element('p', `${commercial.price(key)} / maand excl. btw`, 'fine'));
    section.append(element('p', key === 'hosting' ? 'Hosting · SSL · back-ups · monitoring' : `Hosting inbegrepen · max. ${commercial.data.minutes} min kleine wijzigingen`, 'fine'));
    content.append(section);
  }
  function serviceDetails() {
    const details = element('details', '', 'assistant-details');
    details.append(element('summary', 'Bekijk de scope en grenzen'));
    details.append(element('p', knowledge.hosting));
    if (service === 'care') details.append(element('p', knowledge.care), element('p', knowledge.careLimits));
    details.append(element('p', knowledge.provider), element('p', knowledge.domain)); content.append(details);
  }
  function more(text, label = 'Meer uitleg') {
    const details = element('details', '', 'assistant-details');
    details.append(element('summary', label), element('p', text)); content.append(details);
  }
  function render() {
    title.textContent = screen === 'example' ? demos[project].name+' — demoproject' : titles[screen]; content.replaceChildren();
    content.dataset.screen = screen;
    back.disabled = history.length === 0;
    back.hidden = history.length === 0;
    if (screen === 'start') {
      paragraph('Een gerichte keuzehulp voor je website.', 'fine');
      if (meaningful && contextKind === 'project') {
        paragraph(`${commercial.pages[selection.pages]} · ${commercial.complexities[selection.complexity]} · ${commercial.calculate(selection).inclusivePrice}${commercial.calculate(selection).custom ? '' : ' incl. 21% btw / ' + commercial.calculate(selection).price + ' excl. btw'}`, 'assistant-context');
        link('Bespreek deze indicatie ↗', contactLink(), true, 'assistant_contact_click');
      }
      const entries = { pricing: 'Wat kost een website?', fitting: 'Welke optie past bij mij?', existing: 'Ik heb al een website', support: 'Hosting & onderhoud', process: 'Hoe werkt een project?', examples: 'Bekijk voorbeelden', contact: 'Ik wil contact opnemen' };
      let order = Object.keys(entries);
      if (location.pathname.endsWith('/aanpak.html')) order = ['pricing','support','fitting','existing','process','examples','contact'];
      else if (contextKind === 'demo') order = ['examples','contact','pricing','fitting','existing','support','process'];
      order.forEach(key => action(entries[key], key));
    } else if (screen === 'pricing') {
      paragraph('Een globale inschatting is genoeg. Je andere projectkeuzes blijven meewegen.');
      for (const key of ['small','medium','large','custom','unknown']) action(commercial.pages[key], 'complexity', key);
    } else if (screen === 'complexity') {
      paragraph(`${commercial.pages[selection.pages]}. Denk aan de opbouw en interactie.`);
      for (const [key,label] of Object.entries(commercial.complexities)) action(label, 'result', key);
    } else if (screen === 'result') {
      const result = commercial.calculate(selection);
      paragraph(result.inclusivePrice, 'assistant-amount');
      if (!result.custom) paragraph(`Incl. 21% btw\n${result.price} excl. 21% btw`, 'fine price-lines');
      if (result.custom) paragraph('Dit vraagt een persoonlijke offerte. Je projectkeuzes gaan mee.');
      more(result.detail, 'Wat beïnvloedt de prijs?');
      paragraph(`${commercial.pages[selection.pages]} · ${commercial.complexities[selection.complexity]}. ${selection.extras.length ? selection.extras.map(key=>commercial.extras[key]).join(', ')+'. ' : ''}Indicatie, geen bindende offerte.`, 'fine');
      link('Verfijn in de prijscalculator ↗', calculatorLink(), true, 'assistant_calculator_click');
      link('Bespreek deze indicatie', contactLink(), false, 'assistant_contact_click');
    } else if (screen === 'fitting') {
      action('Ik heb nog geen website', 'recommend', 'new'); action('Ik wil mijn website vervangen', 'existing');
      action('Ik wil professioneler overkomen', 'recommend', 'professional'); action('Ik heb extra functies nodig', 'recommend', 'features');
    } else if (screen === 'recommend') {
      const advice = { new: 'Begin met een heldere basis: wie je bent, wat je aanbiedt en hoe iemand contact opneemt. Het aantal pagina’s volgt uit je inhoud.', professional: 'Kijk eerst naar je positionering, beeld, teksten en bezoekersroute. Een gerichte herwerking kan passen; een volledige vervanging is geen automatisme.', features: 'Breng eerst de gewenste functie en het nut in kaart. Kies je functies in de calculator; AI, API’s, webshops en maatwerk vragen een persoonlijke offerte.' };
      paragraph(advice[situation]); link('Verken mijn prijsindicatie ↗', calculatorLink(), true, 'assistant_calculator_click');
      link('Bespreek mijn situatie', contactLink(), false, 'assistant_contact_click');
    } else if (screen === 'existing') {
      paragraph('Herwerken of vervangen? We bekijken eerst wat kan blijven. Je bestaande domein blijft waar technisch mogelijk.'); more(knowledge.existing); link('Bespreek mijn huidige website ↗', contactLink(), true, 'assistant_contact_click');
      link('Bekijk aanpak & prijzen', calculatorLink());
    } else if (screen === 'support') {
      serviceOverview('hosting'); serviceOverview('care');
      paragraph('Care is inclusief Hosting; geen dubbel hostingbedrag. Beide opties zijn vrijwillig.', 'fine');
      action('LK Hosting', 'service', 'hosting'); action('LK Care', 'service', 'care');
    } else if (screen === 'service') {
      serviceOverview(service);
      paragraph(service === 'hosting' ? 'Hosting, SSL en technisch beheer. Een vast aanspreekpunt voor je website.' : `Inclusief Hosting en maximaal ${commercial.data.minutes} minuten kleine wijzigingen per maand. Ongebruikte minuten vervallen.`);
      if (service === 'care') paragraph(`Meerwerk ${commercial.servicePrice('hourly')}. Groter werk kan apart worden geoffreerd.`, 'fine');
      paragraph('Je domein blijft van jou; registratie en verlenging zijn jaarlijkse aparte kosten.', 'fine');
      serviceDetails(); link('Bespreek deze keuze ↗', contactLink(), true, 'assistant_contact_click');
      link('Lees de scope en afspraken', 'aanpak.html#ondersteuning');
    } else if (screen === 'process') {
      const list = element('ol', '', 'assistant-process'); knowledge.process.forEach(step=>list.append(element('li', step))); content.append(list);
      paragraph(knowledge.timeline); more(knowledge.delivery, 'Meer over oplevering');
      link('Bekijk aanpak & prijzen', 'aanpak.html'); link('Bespreek mijn plannen', contactLink(), false, 'assistant_contact_click');
    } else if (screen === 'examples') {
      paragraph('Fictieve demoprojecten, geen klantenwerk.');
      for (const [key,demo] of Object.entries(demos)) action(`${demo.name} · ${demo.sector}`, 'example', key);
    } else if (screen === 'example') {
      paragraph(`${demos[project].sector}. Een fictieve demo met een eigen uitstraling en bezoekersroute.`);
      link('Bekijk de demo ↗', demos[project].route, true); link('Bespreek dit voorbeeld', contactLink(), false, 'assistant_contact_click');
    } else {
      paragraph(contextKind ? 'Je gekozen project- of servicecontext gaat mee. Je vult je contactgegevens pas op Contact in.' : 'Je spreekt rechtstreeks met Lorenz. Je vult je gegevens pas op Contact in.');
      link(contextKind === 'project' ? 'Bespreek deze indicatie ↗' : 'Naar contact ↗', contactLink(), true, 'assistant_contact_click');
      link('info@lkwebdesign.be', 'mailto:info@lkwebdesign.be');
    }
    content.scrollTop = 0; title.focus({ preventScroll: true }); remember();
  }
  function go(next, value) {
    history.push(state()); screen = next;
    if (next === 'complexity') { selection = { ...selection, pages: value }; meaningful = true; contextKind = 'project'; }
    if (next === 'result') selection = { ...selection, complexity: value };
    if (next === 'recommend') { situation = value; selection = { ...selection, pages: meaningful ? selection.pages : 'unknown', type: value === 'professional' ? 'existing' : 'new' }; meaningful = true; contextKind = 'project'; }
    if (next === 'existing') { selection = { ...selection, type: 'existing', pages: meaningful ? selection.pages : 'unknown' }; meaningful = true; contextKind = 'project'; }
    if (next === 'service') { service = value; contextKind = 'service'; }
    if (next === 'example') { project = value; contextKind = 'demo'; }
    const events = { pricing: 'pricing', existing: 'existing_website', support: 'hosting_care', contact: 'contact', examples: 'examples', process: 'process', fitting: 'fitting' };
    if (events[next]) signal(`assistant_${events[next]}`); render();
  }
  function initialise() {
    dialog = element('dialog', '', 'assistant-panel'); dialog.id = 'lk-assistant';
    dialog.setAttribute('aria-labelledby', 'assistant-title');
    const head = element('div', '', 'assistant-head');
    head.append(element('p', 'LK ASSISTENT', 'eyebrow'));
    const close = element('button', 'Sluiten ×', 'assistant-close'); close.type = 'button'; close.addEventListener('click', () => dialog.close());
    title = element('h2'); title.id = 'assistant-title'; title.tabIndex = -1; head.append(close, title);
    content = element('div', '', 'assistant-content');
    const controls = element('div', '', 'assistant-controls');
    back = element('button', '← Vorige stap', 'text-button'); back.type = 'button';
    back.addEventListener('click', () => { const previous = history.pop(); if (previous) { restore(previous); render(); } });
    const reset = element('button', 'Opnieuw beginnen', 'text-button'); reset.type = 'button'; reset.addEventListener('click', () => { history.length = 0; screen = 'start'; selection = initialSelection(); meaningful = false; contextKind = ''; service = 'hosting'; project = 'kelmora'; situation = 'new'; skipPageContext = true; render(); });
    controls.append(back, reset); dialog.append(head, content, controls); document.body.append(dialog);
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const nodes = [...dialog.querySelectorAll('button:not(:disabled), a[href], summary')].filter(node => node.getClientRects().length);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === title)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    dialog.addEventListener('close', () => {
      document.documentElement.classList.remove('assistant-open');
      for (const button of [dock, footer]) button.setAttribute('aria-expanded', 'false');
      signal('assistant_close');
      if (destinationFocus) { destinationFocus.focus(); destinationFocus = null; }
      else if (opener && opener.isConnected) { opener.hidden = false; opener.focus({ preventScroll: true }); }
    });
  }
  initialise();
  for (const button of [dock, footer]) button.addEventListener('click', () => {
    opener = button; if (!dialog) initialise();
    // Collapse document navigation before moving focus into the modal.
    if (document.querySelector('.lk-menu')?.getAttribute('aria-expanded') === 'true') document.querySelector('.lk-menu').click();
    pageContext();
    dialog.showModal(); document.documentElement.classList.add('assistant-open');
    for (const trigger of [dock, footer]) trigger.setAttribute('aria-expanded', 'true');
    render(); signal('assistant_open');
  });
  // Yield to content/controls; the footer entry remains available at all times.
  let scheduled = false;
  function position() {
    scheduled = false;
    if (dialog?.open || document.activeElement === dock) return;
    dock.hidden = false;
    const rect = dock.getBoundingClientRect();
    const overlaps = [...document.querySelectorAll('main label, main legend, main a, main button, main input, main select, main textarea, main summary, main p, main h1, main h2, main h3, main img, main dt, main dd, .site-footer a')].some(node => {
      const box = node.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && box.left < rect.right + 8 && box.right > rect.left - 8 && box.top < rect.bottom + 8 && box.bottom > rect.top - 8;
    });
    const form = document.getElementById('contact-form')?.getBoundingClientRect();
    dock.hidden = overlaps || (form && form.top < innerHeight && form.bottom > 0) || document.querySelector('.lk-menu')?.getAttribute('aria-expanded') === 'true';
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(position); } }
  addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule);
  document.addEventListener('focusin', schedule); document.addEventListener('click', schedule);
  document.fonts.ready.then(schedule); schedule();
})();
