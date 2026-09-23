(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav');
  const closeMenu = restore => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); if (restore) menu.focus(); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu(true); });
  document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(false); });
  matchMedia('(min-width:701px)').addEventListener('change', e => { if (e.matches) closeMenu(false); });

  const slider = document.querySelector('#finish-slider');
  slider.addEventListener('input', () => {
    document.querySelector('#comparison-image').style.setProperty('--position', `${slider.value}%`);
    slider.setAttribute('aria-valuetext', `${slider.value} procent gedempte impressie`);
  });

  const steps = [
    { title: 'Wat voor auto rijd je?', key: 'car', options: [['sedan', 'Hatchback / sedan'], ['suv', 'SUV / ruime auto'], ['coupe', 'Sport / coupé']] },
    { title: 'Waar ligt jouw prioriteit?', key: 'goal', options: [['protect', 'Lak beschermen'], ['gloss', 'Glans & onderhoudsgemak'], ['refresh', 'Exterieur opfrissen'], ['complete', 'Interieur & exterieur verzorgen']] },
    { title: 'Hoe gebruik je jouw auto?', key: 'use', options: [['daily', 'Dagelijkse kilometers'], ['weekend', 'Weekend / liefhebbersauto'], ['new', 'Nieuw voertuig'], ['highway', 'Veel snelwegkilometers']] }
  ];
  const content = document.querySelector('#config-content');
  let state = { step: 0, answers: {} };
  function label(key) { const step = steps.find(s => s.key === key); return step.options.find(o => o[0] === state.answers[key])?.[1] || 'Nog te kiezen'; }
  function summary() { for (const key of ['car', 'goal', 'use']) document.querySelector(`#summary-${key}`).textContent = label(key); }
  function focusTitle() { const title = content.querySelector('.step-title'); title.focus({ preventScroll: true }); title.scrollIntoView({ block: 'nearest', behavior: 'instant' }); }
  function reset(preset) { state = { step: 0, answers: preset ? { goal: preset } : {} }; renderStep(); }
  document.querySelectorAll('[data-goal]').forEach(a => a.addEventListener('click', () => { reset(a.dataset.goal); }));
  function renderStep(focus = true) {
    summary(); const step = steps[state.step];
    content.innerHTML = `<ol class="progress" aria-label="Voortgang">${steps.map((s, i) => `<li class="${i <= state.step ? 'active' : ''}" aria-label="Stap ${i + 1}${i === state.step ? ', huidige stap' : ''}"></li>`).join('')}</ol><p class="step-label">STAP ${state.step + 1} / 3</p><h3 class="step-title" tabindex="-1">${step.title}</h3><form id="config-form"><fieldset class="options"><legend>Kies één optie</legend>${step.options.map(([value, text]) => `<label class="option"><input name="${step.key}" type="radio" value="${value}" required ${state.answers[step.key] === value ? 'checked' : ''}><span>${text}</span></label>`).join('')}</fieldset><div class="config-actions"><button class="plain-button" id="back" type="button">${state.step ? 'Vorige keuze' : 'Wis keuzes'}</button><button class="button" type="submit">${state.step === 2 ? 'Bekijk mijn plan' : 'Volgende stap'} <span aria-hidden="true">→</span></button></div></form>`;
    content.querySelector('#back').addEventListener('click', () => { if (state.step) { state.step--; renderStep(); } else reset(); });
    content.querySelectorAll('input').forEach(input => input.addEventListener('change', () => { state.answers[step.key] = input.value; summary(); }));
    content.querySelector('form').addEventListener('submit', e => {
      e.preventDefault(); const selected = content.querySelector('input:checked'); if (!selected) return;
      state.answers[step.key] = selected.value;
      if (state.step < 2) { state.step++; renderStep(); } else renderResult();
    });
    if (focus) focusTitle();
  }
  function plan() {
    const { car, goal, use } = state.answers;
    const packages = {
      protect: { title: use === 'highway' ? 'Front PPF + coating' : 'Front PPF', low: use === 'highway' ? 1800 : 1400, high: use === 'highway' ? 2600 : 2100, days: '2–4 dagen', includes: ['Inspectie en lakvoorbereiding', 'PPF op front, motorkap en spiegels', ...(use === 'highway' ? ['Coating op overige lakdelen'] : ['Onderhoudsadvies bij overdracht'])] },
      gloss: { title: 'Ceramic Protection', low: 650, high: 1100, days: '1–3 dagen', includes: ['Reiniging en inspectie', 'Passende voorbereiding en coating', 'Advies voor zorgvuldig onderhoud'] },
      refresh: { title: 'Exterior Refinement', low: 350, high: 650, days: '1–2 dagen', includes: ['Grondige exterieurreiniging', 'Lakcorrectie afgestemd op de inspectie', 'Afwerking en onderhoudsadvies'] },
      complete: { title: 'Complete Detail', low: 450, high: 800, days: '1–2 dagen', includes: ['Grondige interieur- en exterieurreiniging', 'Aandacht voor lak, bekleding en contactpunten', 'Materiaalgericht verzorgingsadvies'] }
    };
    const p = packages[goal]; const size = car === 'suv' ? 1.2 : car === 'coupe' ? 1.1 : 1;
    const reason = { daily: 'Voor dagelijks gebruik ligt de nadruk op een verzorgde basis en praktisch onderhoud.', weekend: 'Voor je liefhebbersauto draait het om zorgvuldig behoud en een passende afwerking.', new: 'Bij een nieuw voertuig beoordelen we eerst wat al goed is; correctie is geen automatisme.', highway: 'Bij veel snelweggebruik verdient de voorkant extra aandacht. Een coating vervangt geen folie.' }[use];
    return { ...p, low: Math.round(p.low * size / 50) * 50, high: Math.round(p.high * size / 50) * 50, reason };
  }
  function renderResult() {
    summary(); const p = plan();
    content.innerHTML = `<span class="result-tag">JOUW DEMO-BESCHERMINGSPLAN</span><h3 class="step-title" tabindex="-1">${p.title}</h3><p class="result-copy">${p.reason}</p><div class="result-details"><div><span>INDICATIEVE DEMORANGE</span><strong>€ ${p.low}–${p.high}</strong></div><div><span>GESCHATTE BEHANDELTIJD</span><strong>${p.days}</strong></div></div><ul class="result-includes">${p.includes.map(text => `<li>${text}</li>`).join('')}</ul><div class="config-actions"><button type="button" class="plain-button" id="edit-plan">Keuzes aanpassen</button><button type="button" class="button" id="offer">Naar offerte-intentie <span aria-hidden="true">↗</span></button></div><button type="button" class="plain-button" id="reset-plan">Nieuwe configuratie</button>`;
    content.querySelector('#edit-plan').addEventListener('click', () => { state.step = 2; renderStep(); });
    content.querySelector('#reset-plan').addEventListener('click', () => reset());
    content.querySelector('#offer').addEventListener('click', renderOffer); focusTitle();
  }
  function renderOffer() {
    const p = plan();
    content.innerHTML = `<p class="step-label">LAATSTE STAP / DEMONSTRATIE</p><h3 class="step-title" tabindex="-1">Dit is jouw vertrekpunt.</h3><p class="result-copy"><strong>${p.title}</strong> voor jouw ${label('car').toLowerCase()}. Indicatief € ${p.low}–${p.high}. In een echte studio volgt nu persoonlijke afstemming over voertuig, lakstaat en planning.</p><form id="offer-form"><label class="acknowledge"><input type="checkbox" required id="demo-confirm"><span>Ik begrijp dat dit een demo is. Er wordt geen offerte of afspraak verstuurd.</span></label><div class="config-actions"><button class="plain-button" id="offer-back" type="button">Terug naar mijn plan</button><button class="button" type="submit">Rond de demo af <span aria-hidden="true">→</span></button></div></form>`;
    content.querySelector('#offer-back').addEventListener('click', renderResult);
    content.querySelector('form').addEventListener('submit', e => {
      e.preventDefault(); if (!content.querySelector('#demo-confirm').checked) return;
      content.innerHTML = `<span class="success-mark" aria-hidden="true">✓</span><p class="step-label">DEMO AFGEROND</p><h3 class="step-title" tabindex="-1">Een helder plan.<br>Geen losse beloftes.</h3><p class="result-copy">Je hebt de configuratie voor <strong>${p.title}</strong> doorlopen. Er is <strong>geen aanvraag verstuurd</strong>, geen afspraak gemaakt en niets opgeslagen.</p><div class="config-actions"><button class="button" type="button" id="again">Configureer opnieuw <span aria-hidden="true">↗</span></button></div>`;
      content.querySelector('#again').addEventListener('click', () => reset()); focusTitle();
    }); focusTitle();
  }
  renderStep(false);
})();
