(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = reducedMotion ? 'auto' : 'smooth';
  const go = selector => $(selector)?.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
  const focusHeading = (root, delay = 0) => {
    window.setTimeout(() => {
      const heading = $('h3', root);
      if (!heading) return;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }, delay);
  };

  const nav = $('#nav');
  const menu = $('.menu');

  function closeNav(returnFocus = false) {
    const wasOpen = nav.classList.contains('open');
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Menu openen');
    if (returnFocus && wasOpen) menu.focus();
  }

  menu.addEventListener('click', () => {
    const willOpen = !nav.classList.contains('open');
    nav.classList.toggle('open', willOpen);
    menu.setAttribute('aria-expanded', String(willOpen));
    menu.setAttribute('aria-label', willOpen ? 'Menu sluiten' : 'Menu openen');
    if (willOpen) requestAnimationFrame(() => $('a', nav)?.focus());
  });

  $$('a', nav).forEach(link => link.addEventListener('click', () => closeNav()));
  addEventListener('resize', () => {
    if (innerWidth > 900) closeNav();
    updateFloatingControls();
  });

  const blankState = () => ({
    service: '',
    project: '',
    source: '',
    estimate: '',
    options: [],
    extra: {}
  });
  let state = blankState();

  const goalService = {
    comfort: 'Airconditioning',
    energy: 'Warmtepomp',
    ev: 'Laadpaal',
    air: 'Ventilatie',
    electric: 'Elektriciteit'
  };
  const serviceLabels = {
    Airconditioning: 'airconditioning',
    Warmtepomp: 'een warmtepomp',
    Laadpaal: 'een laadoplossing',
    Ventilatie: 'ventilatie',
    Elektriciteit: 'elektrische vernieuwing'
  };
  const detailLabels = {
    home: 'Woning / situatie',
    woningtype: 'Type woning',
    scope: 'Omvang / aandachtspunt',
    aanpak: 'Gewenste aanpak',
    area: 'Oppervlakte',
    timing: 'Timing',
    insulation: 'Isolatieniveau',
    heating: 'Huidige verwarming',
    car: 'Wagen',
    solar: 'Zonnepanelen',
    issue: 'Voornaamste signaal',
    year: 'Bouwjaar',
    omvang: 'Omvang',
    opties: 'Opties'
  };

  const wizard = $('#wizard');
  const wizardProgress = $('.wizard-progress');
  let step = 1;
  const initialAutomation = $('#automation-status').innerHTML;
  const wizardFields = {
    Airconditioning: [
      ['home', 'Type woning', 'select', ['Rijwoning', 'Halfopen woning', 'Vrijstaande woning', 'Appartement']],
      ['scope', 'Aantal ruimtes', 'text', 'Bijvoorbeeld 2 of meerdere ruimtes'],
      ['area', 'Geschatte oppervlakte (m²)', 'text', 'Bijvoorbeeld 65 m²'],
      ['timing', 'Gewenste timing', 'select', ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Nog te bepalen', 'Oriënterend']]
    ],
    Warmtepomp: [
      ['home', 'Type woning', 'select', ['Rijwoning', 'Halfopen woning', 'Vrijstaande woning', 'Appartement']],
      ['insulation', 'Isolatieniveau', 'select', ['Goed geïsoleerd', 'Deels geïsoleerd', 'Nog te renoveren', 'Onbekend']],
      ['heating', 'Huidige verwarming', 'select', ['Gas', 'Stookolie', 'Elektrisch', 'Andere / onbekend']],
      ['timing', 'Gewenste timing', 'select', ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Nog te bepalen', 'Oriënterend']]
    ],
    Laadpaal: [
      ['home', 'Parkeer- of laadsituatie', 'select', ['Eigen oprit', 'Gedeelde parking', 'Bedrijf', 'Nog te bepalen']],
      ['car', 'Wagen', 'text', 'Model of nog te kiezen'],
      ['solar', 'Zonnepanelen', 'select', ['Ja', 'Nee', 'Gepland']],
      ['timing', 'Gewenste timing', 'select', ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Nog te bepalen', 'Oriënterend']]
    ],
    Ventilatie: [
      ['home', 'Type woning', 'select', ['Rijwoning', 'Halfopen woning', 'Vrijstaande woning', 'Appartement']],
      ['issue', 'Voornaamste signaal', 'select', ['Vocht', 'Condens', 'Geur / bedompte lucht', 'Renovatieplan', 'Andere']],
      ['scope', 'Omvang', 'select', ['Eén ruimte', 'Meerdere ruimtes', 'Volledige woning', 'Nog te bepalen']],
      ['timing', 'Gewenste timing', 'select', ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Nog te bepalen', 'Oriënterend']]
    ],
    Elektriciteit: [
      ['home', 'Type woning', 'select', ['Rijwoning', 'Halfopen woning', 'Vrijstaande woning', 'Appartement']],
      ['scope', 'Wat speelt er?', 'select', ['Volledige vernieuwing', 'Uitbreiding', 'Keuring / schema', 'Storing', 'Nog te bepalen']],
      ['year', 'Bouwjaar (ongeveer)', 'number', 'Bijvoorbeeld 1985'],
      ['timing', 'Gewenste timing', 'select', ['Dringend', 'Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Nog te bepalen', 'Oriënterend']]
    ]
  };

  function syncWizardChoices() {
    $$('.choice-grid[data-state]').forEach(group => {
      $$('button', group).forEach(button => {
        const active = state[group.dataset.state] === button.dataset.value;
        button.classList.toggle('selected', active);
        button.setAttribute('aria-pressed', String(active));
      });
    });
  }

  function createDynamicFields() {
    const container = $('#dynamic-fields');
    const fields = wizardFields[state.service] || [
      ['scope', 'Korte toelichting', 'text', 'Wat is belangrijk?']
    ];
    const fragment = document.createDocumentFragment();

    fields.forEach(([key, labelText, type, values]) => {
      const label = document.createElement('label');
      label.append(document.createTextNode(labelText));
      let control;

      if (type === 'select') {
        control = document.createElement('select');
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Maak een keuze';
        control.append(placeholder);
        values.forEach(value => {
          const option = document.createElement('option');
          option.value = value;
          option.textContent = value;
          control.append(option);
        });
      } else {
        control = document.createElement('input');
        control.type = type;
        control.placeholder = values;
      }

      control.dataset.detail = key;
      control.required = true;
      control.setAttribute('aria-describedby', 'wizard-note');
      control.value = state.extra[key] || '';
      control.addEventListener('input', () => {
        state.extra[key] = control.value;
        control.removeAttribute('aria-invalid');
      });
      control.addEventListener('change', () => {
        state.extra[key] = control.value;
        control.removeAttribute('aria-invalid');
      });
      label.append(control);
      fragment.append(label);
    });

    container.replaceChildren(fragment);
  }

  function clearValidation() {
    $$('[aria-invalid="true"]', wizard).forEach(element => element.removeAttribute('aria-invalid'));
  }

  function validateStep() {
    const note = $('#wizard-note');
    note.textContent = '';
    clearValidation();

    if (step === 1 && !state.service) {
      const group = $('.choice-grid[data-state="service"]', wizard);
      group.setAttribute('aria-invalid', 'true');
      note.textContent = 'Kies eerst een dienst.';
      $('button', group)?.focus();
      return false;
    }

    if (step === 2 && !state.project) {
      const group = $('.choice-grid[data-state="project"]', wizard);
      group.setAttribute('aria-invalid', 'true');
      note.textContent = 'Kies eerst uw situatie.';
      $('button', group)?.focus();
      return false;
    }

    const invalid = $$('[required]', $('.wizard-step.active', wizard))
      .find(control => !control.checkValidity());
    if (!invalid) return true;

    invalid.setAttribute('aria-invalid', 'true');
    invalid.setAttribute('aria-describedby', 'wizard-note');
    note.textContent = invalid.type === 'checkbox'
      ? 'Bevestig dat u begrijpt dat dit een demo is.'
      : invalid.type === 'email' && invalid.value
        ? 'Vul een geldig e-mailadres in.'
        : invalid.name === 'postcode' && invalid.value
          ? 'Vul een Belgische postcode van vier cijfers in.'
          : 'Vul het gemarkeerde veld in.';
    invalid.focus();
    return false;
  }

  function createSummary() {
    const formData = new FormData(wizard);
    const rows = [
      ['Dienst', state.service],
      ['Project', state.project],
      ...Object.entries(state.extra)
        .filter(([, value]) => value)
        .map(([key, value]) => [detailLabels[key] || key, value]),
      ['Naam', formData.get('name')],
      ['E-mail', formData.get('email')],
      ['Telefoon', formData.get('phone') || 'Niet opgegeven'],
      ['Postcode', formData.get('postcode')],
      ['Extra toelichting', formData.get('notes') || 'Niet opgegeven'],
      ['Bron', state.source || 'Rechtstreeks'],
      ['Prijsindicatie', state.estimate || 'Niet berekend']
    ];
    const fragment = document.createDocumentFragment();

    rows.forEach(([label, value]) => {
      const row = document.createElement('div');
      const key = document.createElement('b');
      const content = document.createElement('span');
      row.className = 'summary-row';
      key.textContent = label;
      content.textContent = value || 'Nog niet opgegeven';
      row.append(key, content);
      fragment.append(row);
    });

    $('#summary').replaceChildren(fragment);
  }

  function resetWizardCompletion() {
    const completion = $('.wizard-completion', wizard);
    if (!completion) return;
    completion.remove();
    [...wizard.children].forEach(child => {
      child.hidden = false;
    });
    wizard.classList.remove('wizard-complete');
  }

  function showWizardStep(nextStep, prefilled = false, manageFocus = true) {
    step = Math.max(1, Math.min(5, nextStep));
    $$('.wizard-step', wizard).forEach(panel => {
      panel.classList.toggle('active', Number(panel.dataset.step) === step);
    });
    $('.back', wizard).hidden = step === 1;
    $('.next', wizard).hidden = step === 5;
    $('.submit', wizard).hidden = step !== 5;
    $('#progress-text').textContent = `Stap ${step} van 5`;
    $('#progress-percent').textContent = `${step * 20}%`;
    $('.wizard-progress i').style.width = `${step * 20}%`;
    wizardProgress.setAttribute('aria-valuenow', String(step));

    if (step === 3) createDynamicFields();
    if (step === 5) createSummary();
    syncWizardChoices();
    clearValidation();
    $('#prefill-note').hidden = !prefilled && !state.source;
    $('#wizard-note').textContent = '';

    if (manageFocus) {
      if (innerWidth <= 900) {
        wizard.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
      }
      focusHeading($('.wizard-step.active', wizard), reducedMotion ? 0 : 220);
    }
  }

  function startWizard(data, nextStep = 1) {
    resetWizardCompletion();
    wizard.reset();
    state = {
      ...blankState(),
      ...data,
      options: [...(data.options || [])],
      extra: { ...(data.extra || {}) }
    };
    showWizardStep(nextStep, true, false);
    closeAssistant(false);
    const target = innerWidth <= 900 ? wizard : $('#offerte');
    target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
    focusHeading($('.wizard-step.active', wizard), reducedMotion ? 0 : 380);
  }

  $$('.choice-grid[data-state]', wizard).forEach(group => {
    group.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      if (group.dataset.state === 'service' && state.service !== button.dataset.value) {
        state.extra = {};
        state.estimate = '';
        state.options = [];
        state.source = '';
      }
      state[group.dataset.state] = button.dataset.value;
      group.removeAttribute('aria-invalid');
      $('#wizard-note').textContent = '';
      syncWizardChoices();
    });
  });
  wizard.addEventListener('input', event => event.target.removeAttribute?.('aria-invalid'));
  $('.next', wizard).addEventListener('click', () => validateStep() && showWizardStep(step + 1));
  $('.back', wizard).addEventListener('click', () => showWizardStep(step - 1));
  wizard.addEventListener('submit', event => {
    event.preventDefault();
    if (!validateStep()) return;
    if (step < 5) {
      showWizardStep(step + 1);
      return;
    }

    [...wizard.children].forEach(child => {
      child.hidden = true;
    });
    const completion = document.createElement('div');
    completion.className = 'wizard-completion';
    completion.setAttribute('role', 'status');
    completion.innerHTML = '<p class="step-label">DEMO VOLTOOID</p><h3>Uw demo-aanvraag is in deze browser samengesteld.</h3><p>Er is niets verstuurd. Bekijk hieronder hoe deze informatie in een echte implementatie automatisch beschikbaar kan worden voor opvolging.</p><button class="button primary" type="button" data-auto>Bekijk mogelijke automatisering <span>↓</span></button><button class="text-button" type="button" data-wizard-reset>Nieuwe demo starten</button>';
    wizard.append(completion);
    wizard.classList.add('wizard-complete');
    $('#automation-status').classList.add('done');
    $('#automation-status').innerHTML = '<span></span><p><b>✓ Aanvraag ontvangen &nbsp; ✓ Gegevens gestructureerd &nbsp; ✓ Klaar voor mogelijke opvolging</b><br>Demonstratiestatus — er is geen e-mail, CRM-koppeling of afspraak uitgevoerd.</p>';
    $('[data-wizard-reset]', wizard).addEventListener('click', () => {
      resetWizardCompletion();
      wizard.reset();
      state = blankState();
      $('#automation-status').classList.remove('done');
      $('#automation-status').innerHTML = initialAutomation;
      showWizardStep(1);
    });
    $('[data-auto]').addEventListener('click', () => go('#automation'));
    focusHeading(completion, reducedMotion ? 0 : 100);
  });

  $$('[data-service]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      startWizard({
        service: link.dataset.service,
        project: '',
        source: 'Diensten',
        extra: {}
      }, 2);
    });
  });

  const advisorQuestions = [
    ['goal', 'Wat wilt u vooral bereiken?', [
      ['comfort', 'Meer comfort / koeling'],
      ['energy', 'Energie besparen'],
      ['ev', 'Elektrisch rijden'],
      ['air', 'Betere ventilatie'],
      ['electric', 'Elektrische installatie verbeteren']
    ]],
    ['home', 'Om welk type woning gaat het?', [
      ['Rijwoning', 'Rijwoning'],
      ['Halfopen woning', 'Halfopen woning'],
      ['Vrijstaande woning', 'Vrijstaande woning'],
      ['Appartement', 'Appartement']
    ]],
    ['scope', 'Hoe groot is de gewenste aanpak?', [
      ['Eén ruimte', 'Eén ruimte'],
      ['Meerdere ruimtes', 'Meerdere ruimtes'],
      ['Volledige woning', 'Volledige woning'],
      ['Nog te bepalen', 'Nog te bepalen']
    ]],
    ['timing', 'Wanneer wilt u dit verder bekijken?', [
      ['Zo snel mogelijk', 'Zo snel mogelijk'],
      ['Binnen 3 maanden', 'Binnen 3 maanden'],
      ['Binnen 6 maanden', 'Binnen 6 maanden'],
      ['Oriënterend', 'Ik oriënteer me nog']
    ]]
  ];
  let advisorStep = 0;
  let advisorAnswers = {};

  function advisorExtra(service) {
    const details = { home: advisorAnswers.home, timing: advisorAnswers.timing };
    if (service === 'Laadpaal') {
      delete details.home;
      details.woningtype = advisorAnswers.home;
      details.aanpak = advisorAnswers.scope;
    } else if (service === 'Elektriciteit' || service === 'Warmtepomp') {
      details.aanpak = advisorAnswers.scope;
    } else {
      details.scope = advisorAnswers.scope;
    }
    return details;
  }

  function renderAdvisor(manageFocus = false) {
    const root = $('#advisor');

    if (advisorStep >= advisorQuestions.length) {
      const service = goalService[advisorAnswers.goal];
      const goalText = advisorQuestions[0][2].find(([value]) => value === advisorAnswers.goal)?.[1] || '';
      root.innerHTML = `<div class="tool-top"><span class="tool-step">Uw demo-resultaat</span><span class="tool-dots">${advisorQuestions.map(() => '<i class="active"></i>').join('')}</span></div><h3>Een relevante richting om verder te bekijken</h3><div class="recommendation"><span class="recommendation-label">VOORZICHTIGE AANBEVELING</span><h4>${serviceLabels[service]}</h4><p>Op basis van uw antwoorden lijkt ${serviceLabels[service]} de meest relevante oplossing om verder te bekijken. Een technische beoordeling ter plaatse blijft nodig.</p><div class="recommendation-choices" aria-label="Uw keuzes"><span>${goalText}</span><span>${advisorAnswers.home}</span><span>${advisorAnswers.scope}</span><span>${advisorAnswers.timing}</span></div><ul><li>Afgestemd op uw doel</li><li>Technische opties verder te onderzoeken</li><li>Uw antwoorden worden meegenomen</li></ul></div><div class="tool-actions"><button class="button primary" type="button" data-advisor-quote>Neem dit mee naar mijn aanvraag <span>→</span></button><button class="text-button" type="button" data-advisor-reset>Opnieuw beginnen</button></div>`;
      $('[data-advisor-quote]', root).addEventListener('click', () => startWizard({
        service,
        project: 'Nog te bepalen',
        source: 'Keuzehulp',
        extra: advisorExtra(service)
      }, 3));
      $('[data-advisor-reset]', root).addEventListener('click', () => {
        advisorStep = 0;
        advisorAnswers = {};
        renderAdvisor(true);
      });
      if (manageFocus) focusHeading(root);
      return;
    }

    const [key, title, options] = advisorQuestions[advisorStep];
    root.innerHTML = `<div class="tool-top"><span class="tool-step">Vraag ${advisorStep + 1} van 4</span><span class="tool-dots">${advisorQuestions.map((_, index) => `<i class="${index <= advisorStep ? 'active' : ''}"></i>`).join('')}</span></div><h3>${title}</h3><div class="option-list" role="group" aria-label="${title}">${options.map(([value, label]) => `<button type="button" data-value="${value}" aria-pressed="false">${label}</button>`).join('')}</div>${advisorStep ? '<button class="text-button advisor-back" type="button">← Vorige vraag</button>' : ''}`;
    const buttons = $$('.option-list button', root);
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(item => {
          item.disabled = true;
          item.setAttribute('aria-pressed', String(item === button));
          item.classList.toggle('selected', item === button);
        });
        advisorAnswers[key] = button.dataset.value;
        window.setTimeout(() => {
          advisorStep += 1;
          renderAdvisor(true);
        }, reducedMotion ? 0 : 110);
      });
    });
    $('.advisor-back', root)?.addEventListener('click', () => {
      advisorStep -= 1;
      renderAdvisor(true);
    });
    if (manageFocus) focusHeading(root);
  }
  renderAdvisor();

  const estimatorForm = $('.estimator-form');
  const estimatorResult = $('.estimate-result');
  const estimatorOutput = $('#estimate-output');
  const estimatorSelection = $('#estimate-selection');
  let estimate = '';
  let estimateOptions = [];
  const prices = {
    Airconditioning: [1650, 650],
    Warmtepomp: [6500, 2800],
    Laadpaal: [1250, 650],
    Ventilatie: [1900, 1000],
    Elektriciteit: [1400, 1200]
  };
  const sizeLabels = { small: 'Compact', medium: 'Gemiddeld', large: 'Uitgebreid' };
  const euro = value => new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);

  function resetEstimate() {
    estimate = '';
    estimateOptions = [];
    estimatorOutput.innerHTML = '<h3>Nog geen indicatie</h3><p>Vul de eerste drie keuzes in om een fictieve bandbreedte te zien.</p>';
    estimatorSelection.hidden = true;
    estimatorSelection.replaceChildren();
    $('#estimate-cta').disabled = true;
  }

  function calculateEstimate() {
    const data = new FormData(estimatorForm);
    const service = data.get('estService');
    const project = data.get('estSituation');
    const size = data.get('estSize');
    const options = data.getAll('estOption');
    if (!service || !project || !size) {
      resetEstimate();
      return;
    }

    const sizeFactor = { small: 1, medium: 1.65, large: 2.5 }[size];
    const projectFactor = { Nieuwbouw: 1, Renovatie: 1.18, Vervanging: .92, Uitbreiding: 1.12 }[project];
    const [base, spread] = prices[service];
    const low = Math.round(base * sizeFactor * projectFactor / 50) * 50 + options.length * 250;
    const high = Math.round((base + spread) * sizeFactor * projectFactor / 50) * 50 + options.length * 450;

    estimate = `${euro(low)} – ${euro(high)}`;
    estimateOptions = options;
    estimatorOutput.innerHTML = `<h3>${estimate}</h3><p>Geschatte demo-indicatie voor ${service.toLowerCase()}, ${project.toLowerCase()} en een ${sizeLabels[size].toLowerCase()} aanpak.</p>`;
    estimatorSelection.replaceChildren();
    [service, project, sizeLabels[size], ...(options.length ? options : ['Geen extra opties'])].forEach(value => {
      const chip = document.createElement('span');
      chip.textContent = value;
      estimatorSelection.append(chip);
    });
    estimatorSelection.hidden = false;
    $('#estimate-cta').disabled = false;

    if (!reducedMotion) {
      estimatorResult.classList.remove('is-updated');
      void estimatorResult.offsetWidth;
      estimatorResult.classList.add('is-updated');
      window.setTimeout(() => estimatorResult.classList.remove('is-updated'), 360);
    }
  }

  estimatorForm.addEventListener('change', calculateEstimate);
  $('#estimate-cta').addEventListener('click', () => {
    const data = new FormData(estimatorForm);
    startWizard({
      service: data.get('estService'),
      project: data.get('estSituation'),
      source: 'Prijsindicatie',
      estimate,
      options: [...estimateOptions],
      extra: {
        omvang: sizeLabels[data.get('estSize')],
        opties: data.getAll('estOption').join(', ') || 'Geen extra opties'
      }
    }, 3);
  });

  const dialog = $('#assistant');
  const launcher = $('.assistant-launcher');
  const assistantBody = $('#assistant-body');
  const assistantFlows = {
    Airconditioning: [
      ['home', 'Om welk type woning gaat het?', ['Rijwoning', 'Halfopen woning', 'Vrijstaande woning', 'Appartement']],
      ['scope', 'Hoeveel ruimtes wilt u koelen?', ['1 ruimte', '2 ruimtes', '3–4 ruimtes', 'Nog te bepalen']],
      ['area', 'Over hoeveel oppervlakte spreken we?', ['Tot 35 m²', '35–70 m²', 'Meer dan 70 m²', 'Onbekend']],
      ['timing', 'Wat is de gewenste timing?', ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Oriënterend']]
    ],
    Warmtepomp: [
      ['home', 'Om welk type woning gaat het?', ['Rijwoning', 'Halfopen woning', 'Vrijstaande woning', 'Appartement']],
      ['insulation', 'Hoe is de woning geïsoleerd?', ['Goed geïsoleerd', 'Deels geïsoleerd', 'Nog te renoveren', 'Onbekend']],
      ['timing', 'Wanneer wilt u dit bekijken?', ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Oriënterend']]
    ],
    Laadpaal: [
      ['home', 'Waar wilt u laden?', ['Eigen oprit', 'Gedeelde parking', 'Bedrijf', 'Nog te bepalen']],
      ['solar', 'Zijn er zonnepanelen?', ['Ja', 'Nee', 'Gepland']],
      ['timing', 'Wanneer is de laadoplossing gewenst?', ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Oriënterend']]
    ],
    Ventilatie: [
      ['issue', 'Wat merkt u vooral?', ['Vocht', 'Condens', 'Geur / bedompte lucht', 'Renovatieplan']],
      ['scope', 'Welke omvang heeft uw vraag?', ['Eén ruimte', 'Meerdere ruimtes', 'Volledige woning', 'Nog te bepalen']],
      ['timing', 'Wanneer wilt u dit bekijken?', ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Oriënterend']]
    ],
    Elektriciteit: [
      ['scope', 'Wat wilt u aanpakken?', ['Volledige vernieuwing', 'Uitbreiding', 'Keuring / schema', 'Storing']],
      ['home', 'Om welk type woning gaat het?', ['Rijwoning', 'Halfopen woning', 'Vrijstaande woning', 'Appartement']],
      ['timing', 'Wat is de timing?', ['Dringend', 'Zo snel mogelijk', 'Binnen 3 maanden', 'Oriënterend']]
    ]
  };
  let assistantService = '';
  let assistantStep = 0;
  let assistantAnswers = {};

  function renderAssistantStart(manageFocus = false) {
    assistantBody.innerHTML = '<div class="assistant-content"><p class="assistant-progress">GERICHTE FRONT-END KEUZES</p><h3>Wat wilt u bereiken?</h3><p>Kies uw doel. Ik stel daarna enkele gerichte vragen en neem de antwoorden mee naar de demo-aanvraag.</p><div class="assistant-options"><button type="button" data-service-choice="Airconditioning">Ik wil mijn woning koelen</button><button type="button" data-service-choice="Warmtepomp">Ik wil energie besparen</button><button type="button" data-service-choice="Laadpaal">Ik rijd elektrisch</button><button type="button" data-service-choice="Ventilatie">Ik heb ventilatieproblemen</button><button type="button" data-service-choice="Elektriciteit">Ik wil mijn elektriciteit vernieuwen</button><button type="button" data-service-choice="unknown">Ik weet nog niet wat ik nodig heb</button></div></div>';
    $$('[data-service-choice]', assistantBody).forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.serviceChoice === 'unknown') {
          closeAssistant();
          go('#keuzehulp');
          return;
        }
        assistantService = button.dataset.serviceChoice;
        assistantStep = 0;
        assistantAnswers = {};
        renderAssistantQuestion(true);
      });
    });
    if (manageFocus) focusHeading(assistantBody);
  }

  function renderAssistantQuestion(manageFocus = false) {
    const flow = assistantFlows[assistantService];
    if (assistantStep >= flow.length) {
      assistantBody.innerHTML = `<div class="assistant-content"><p class="assistant-progress">KLAAR OM VERDER TE GAAN</p><h3>Uw antwoorden staan klaar.</h3><p>De demo-aanvraag opent met ${assistantService.toLowerCase()} en uw bekende gegevens vooraf ingevuld.</p><div class="assistant-options"><button type="button" data-assistant-quote><b>Start mijn gerichte aanvraag</b></button><button type="button" data-assistant-reset>Andere vraag kiezen</button></div></div>`;
      $('[data-assistant-quote]', assistantBody).addEventListener('click', () => startWizard({
        service: assistantService,
        project: 'Nog te bepalen',
        source: 'Kelmora Assistent',
        extra: assistantAnswers
      }, 3));
      $('[data-assistant-reset]', assistantBody).addEventListener('click', () => renderAssistantStart(true));
      if (manageFocus) focusHeading(assistantBody);
      return;
    }

    const [key, question, options] = flow[assistantStep];
    assistantBody.innerHTML = `<div class="assistant-content"><p class="assistant-progress">VRAAG ${assistantStep + 1} VAN ${flow.length} · ${assistantService.toUpperCase()}</p><h3>${question}</h3><div class="assistant-options" role="group" aria-label="${question}">${options.map(option => `<button type="button" data-answer="${option}">${option}</button>`).join('')}</div>${assistantStep ? '<button class="text-button" type="button" data-assistant-back>← Vorige vraag</button>' : ''}</div>`;
    $$('[data-answer]', assistantBody).forEach(button => {
      button.addEventListener('click', () => {
        assistantAnswers[key] = button.dataset.answer;
        assistantStep += 1;
        renderAssistantQuestion(true);
      });
    });
    $('[data-assistant-back]', assistantBody)?.addEventListener('click', () => {
      assistantStep -= 1;
      renderAssistantQuestion(true);
    });
    if (manageFocus) focusHeading(assistantBody);
  }

  function closeAssistant(returnFocus = true) {
    if (dialog.open) dialog.close();
    launcher.setAttribute('aria-expanded', 'false');
    if (returnFocus && !launcher.inert) launcher.focus();
  }

  launcher.addEventListener('click', () => {
    renderAssistantStart();
    dialog.showModal();
    launcher.setAttribute('aria-expanded', 'true');
    focusHeading(assistantBody);
  });
  $('.assistant-close').addEventListener('click', () => closeAssistant());
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = $$('button:not(:disabled), a[href], input, select, textarea', dialog)
      .filter(control => control.getClientRects().length);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement.matches('h3'))) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeAssistant();
  });
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeAssistant();
  });

  $('[data-scroll]').addEventListener('click', event => go(event.currentTarget.dataset.scroll));

  const mobileCta = $('.mobile-cta');
  const floatingBlockers = new Set();
  const floatingTargets = ['#top', '#keuzehulp', '#prijsindicatie', '#offerte', '#automation', '.end-cta', '.site-footer']
    .map(selector => $(selector))
    .filter(Boolean);

  function setFloatingElementState(element, hidden) {
    element.classList.toggle('is-hidden', hidden);
    element.inert = hidden;
    if (hidden) element.setAttribute('aria-hidden', 'true');
    else element.removeAttribute('aria-hidden');
  }

  function updateFloatingControls() {
    const hidden = innerWidth <= 600 && floatingBlockers.size > 0;
    setFloatingElementState(mobileCta, hidden);
    setFloatingElementState(launcher, hidden);
  }

  const floatingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) floatingBlockers.add(entry.target);
      else floatingBlockers.delete(entry.target);
    });
    updateFloatingControls();
  }, { threshold: .02 });
  floatingTargets.forEach(target => floatingObserver.observe(target));

  if (innerWidth <= 600 && $('#top').getBoundingClientRect().bottom > 0) {
    floatingBlockers.add($('#top'));
  }
  updateFloatingControls();

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !dialog.open) closeNav(true);
  });

  syncWizardChoices();
})();
