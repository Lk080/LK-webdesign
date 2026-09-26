(() => {
  'use strict';
  // Runtime source of truth; static HTML fallbacks are checked against these values.
  const ranges = Object.freeze({ small: [995, 1290], medium: [1390, 1790], large: [1790, 2290], custom: [2300, null] });
  const calculator = Object.freeze({
    complexity: Object.freeze({ simple: [0, 0], average: [200, 350], extensive: [450, 750] }),
    functions: Object.freeze({ intake: [100, 175], blog: [150, 250], portfolio: [150, 300], animation: [200, 400], languages: [250, 450], booking: [300, 550], integration: [300, 600] }),
    quotationExtras: Object.freeze(['api', 'shop', 'custom']),
    // At this upper bound, combined scope needs a personal technical assessment.
    quotationUpperBound: 5000,
    roundingStep: 25
  });
  const hosting = 24.90, care = 59;
  const data = Object.freeze({ ranges, hosting, care, both: care, minutes: 30, hourly: 65, vat: 21 });
  const knowledge = Object.freeze({
    timeline: 'Gemiddeld circa 2–4 weken, afhankelijk van omvang, inhoud, feedback en planning. Geen garantie of minimumduur.',
    delivery: 'Sneller opleveren mag zodra de LK Quality Check geslaagd is en jij akkoord geeft.',
    process: Object.freeze(['Kennismaking', 'Inhoud & richting', 'Ontwerp & bouw', 'Feedback', 'LK Quality Check', 'Oplevering']),
    hosting: 'Professionele hosting, SSL, technisch beheer en beschikbaarheidsmonitoring. Back-ups en restore volgens afspraak; domeinbeheer waar van toepassing.',
    care: 'Inclusief LK Hosting, relevante technische checks en kleine tekst- of beeldwijzigingen binnen de bestaande structuur.',
    careLimits: 'Ongebruikte minuten vervallen maandelijks: niet overdraagbaar, niet opspaarbaar en niet cumulatief. Nieuwe pagina’s, redesign, nieuwe functionaliteit en contentcreatie vallen buiten Care.',
    provider: 'Een eigen hostingprovider blijft mogelijk. Support en dienstverlening stemmen we vooraf af; geen 24/7-SLA of gegarandeerde uptime.',
    domain: 'Vanaf dag één ben jij de officiële domeinhouder. Registratie en verlenging worden jaarlijks apart aangerekend, afhankelijk van extensie en provider. Geen lock-in.',
    existing: 'Je bestaande website kan worden herwerkt of vervangen. Eerst bekijken we wat kan blijven. Je bestaande domein kan behouden blijven waar technisch mogelijk; geen verplichte verhuizing.'
  });
  const services = Object.freeze({ hosting: 'LK Hosting', care: 'LK Care inclusief Hosting', both: 'LK Care inclusief Hosting' });
  const types = Object.freeze({ new: 'Een nieuwe website', existing: 'Mijn bestaande website laten beoordelen', automation: 'AI en automatisering' });
  const extras = Object.freeze({ intake: 'Extra formulieren', booking: 'Afspraak / boekingssysteem', languages: 'Meerdere talen', blog: 'Blog / nieuws', portfolio: 'Portfolio / projecten', animation: 'Geavanceerde animatie / interactie', integration: 'Externe integratie', custom: 'Maatwerkfunctionaliteit', api: 'AI, API of automatisering', shop: 'Webshop / online betaling' });
  const complexities = Object.freeze({ simple: 'Eenvoudig', average: 'Gemiddeld', extensive: 'Uitgebreid' });
  const pages = Object.freeze({ small: '1–3 pagina’s', medium: '4–5 pagina’s', large: '6–8 pagina’s', custom: '9+ pagina’s', unknown: 'Nog te bepalen' });
  const money = n => '€' + new Intl.NumberFormat('nl-BE', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n);
  function price(key) {
    if (ranges[key]) return key === 'custom' ? `Vanaf ± ${money(ranges[key][0])}` : ranges[key].map(money).join('–');
    return key === 'minutes' ? String(data.minutes) : exactMoney(data[key]);
  }
  // Convert the net source only after calculator rounding; round VAT to cents.
  const gross = amount => Math.round(Math.round(amount * 100) * (100 + data.vat) / 100) / 100;
  const exactMoney = amount => '€' + new Intl.NumberFormat('nl-BE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  function inclusivePrice(key) {
    if (ranges[key]) return key === 'custom' ? `Vanaf ± ${exactMoney(gross(ranges[key][0]))}` : ranges[key].map(amount => exactMoney(gross(amount))).join('–');
    return exactMoney(gross(data[key]));
  }
  function servicePrice(key) {
    const unit = key === 'hourly' ? 'uur' : 'maand';
    return `${inclusivePrice(key)}/${unit} incl. 21% btw\n${exactMoney(data[key])}/${unit} excl. btw`;
  }
  function normalize(selection) {
    return {
      type: Object.hasOwn(types, selection.type) ? selection.type : 'new',
      pages: Object.hasOwn(pages, selection.pages) ? selection.pages : 'small',
      complexity: Object.hasOwn(complexities, selection.complexity) ? selection.complexity : 'simple',
      extras: Object.keys(extras).filter(key => Array.isArray(selection.extras) && selection.extras.includes(key))
    };
  }
  function read(params) {
    return normalize({ type: params.get('type'), pages: params.get('pages'), complexity: params.get('complexity'), extras: params.getAll('extra') });
  }
  function query(selection) {
    const clean = normalize(selection);
    const params = new URLSearchParams({ type: clean.type, pages: clean.pages, complexity: clean.complexity });
    clean.extras.forEach(key => params.append('extra', key));
    return params.toString();
  }
  function calculate(selection) {
    selection = normalize(selection);
    let custom = selection.type === 'automation' || ['custom', 'unknown'].includes(selection.pages) || selection.extras.some(key => calculator.quotationExtras.includes(key));
    let range = null;
    if (!custom) {
      const base = ranges[selection.pages];
      const additions = [calculator.complexity[selection.complexity], ...selection.extras.map(key => calculator.functions[key])];
      const raw = base.map((amount, i) => amount + additions.reduce((sum, weight) => sum + weight[i], 0));
      const weighted = selection.complexity !== 'simple' || selection.extras.length > 0;
      range = weighted ? [Math.max(base[0], Math.floor(raw[0] / calculator.roundingStep) * calculator.roundingStep), Math.ceil(raw[1] / calculator.roundingStep) * calculator.roundingStep] : [...base];
      custom = range[1] >= calculator.quotationUpperBound;
      if (custom) range = null;
    }
    return {
      label: selection.type === 'existing' ? 'Redesign / verbetering' : selection.type === 'automation' ? 'Slim maatwerk' : 'Website',
      custom,
      range,
      price: custom ? 'Persoonlijke offerte nodig' : range.map(money).join('–'),
      inclusivePrice: custom ? 'Persoonlijke offerte nodig' : range.map(amount => exactMoney(gross(amount))).join('–'),
      detail: custom ? 'De prijs hangt af van de scope en technische vereisten. We bespreken eerst je project; je keuzes blijven behouden.' : 'Dit is een indicatie op basis van je keuzes. De definitieve prijs volgt na bespreking van je project.'
    };
  }

  function summary(selection) {
    selection = normalize(selection);
    const result = calculate(selection);
    return [types[selection.type], pages[selection.pages], `Complexiteit: ${complexities[selection.complexity]}`, `Indicatieve investering: ${result.inclusivePrice}${!result.custom ? ' incl. 21% btw\n' + result.price + ' excl. 21% btw' : ''}`, `Bijzondere wensen: ${selection.extras.map(key => extras[key]).join(', ') || 'Geen geselecteerd'}`, 'Geen bindende offerte; externe kosten apart.'].filter(Boolean).join('\n');
  }
  window.LKCommercial = Object.freeze({ data, calculator, knowledge, services, types, extras, complexities, pages, price, inclusivePrice, servicePrice, read, query, calculate, summary });
  document.querySelectorAll('[data-price]').forEach(node => { node.textContent = price(node.dataset.price); });
  document.querySelectorAll('[data-price-incl]').forEach(node => { node.textContent = inclusivePrice(node.dataset.priceIncl); });
})();
