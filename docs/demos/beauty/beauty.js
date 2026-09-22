(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  function closeMenu(restoreFocus = false) {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (restoreFocus) menu.focus();
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  const treatments = {
    signature: { name: 'De Velune Facial', minutes: 60, price: 85, detail: 'Reiniging, zachte massage en een verzorgend masker in één volledig ritueel.' },
    hydra: { name: 'Hydra Pause', minutes: 45, price: 65, detail: 'Een zacht, hydraterend verzorgingsmoment voor een comfortabel huidgevoel.' },
    reset: { name: 'Soft Reset', minutes: 30, price: 45, detail: 'Een korte verzorgingspauze met reiniging en een fris masker.' },
    brows: { name: 'Brow Atelier', minutes: 30, price: 35, detail: 'Persoonlijke vormgeving van je wenkbrauwen, met aandacht voor jouw uitstraling.' },
    slow: { name: 'Slow Ritual', minutes: 45, price: 60, detail: 'Een zachte massage voor gezicht, nek en schouders, op een rustig tempo.' }
  };
  const steps = [
    { title: 'Waar wil je aandacht aan geven?', options: [['comfort', 'Een comfortabel, verzorgd huidgevoel'], ['fresh', 'Een frisse verzorgingspauze'], ['brows', 'De vorm van mijn wenkbrauwen']] },
    { title: 'Wat zoek je in jouw moment?', options: [['care', 'Gerichte verzorging'], ['rest', 'Vooral rust en ontspanning'], ['complete', 'Een uitgebreid verzorgingsritueel']] },
    { title: 'Hoeveel tijd wil je nemen?', options: [['30', 'Een halfuur'], ['45', 'Drie kwartier'], ['60', 'Een uur voor mezelf']] }
  ];
  const dialog = document.querySelector('#treatment-dialog');
  const content = document.querySelector('#dialog-content');
  let state = { step: 0, answers: [], treatment: '', source: 'direct' };
  let opener;
  function focusHeading() { content.querySelector('#dialog-title').focus(); }
  function showDialog(source) {
    opener = document.activeElement;
    state = { step: 0, answers: [], treatment: source || '', source: source === 'finder' ? 'finder' : 'direct' };
    if (source === 'finder') state.treatment = '';
    closeMenu();
    dialog.showModal();
    if (source === 'finder') renderStep(); else renderBooking();
  }
  function closeDialog() { dialog.close(); }
  document.querySelector('.close-dialog').addEventListener('click', closeDialog);
  // Keep Tab cycling inside the active modal, including after a step re-render.
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href]')]
      .filter(element => element.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  dialog.addEventListener('close', () => {
    if (opener && opener.getClientRects().length) opener.focus();
    else menu.focus();
  });
  document.querySelector('#open-finder').addEventListener('click', () => showDialog('finder'));
  document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => showDialog(button.dataset.book)));
  function renderStep() {
    const step = steps[state.step];
    content.innerHTML = `<p class="dialog-progress">Stap ${state.step + 1} van 3 · Jouw voorkeuren</p><h2 id="dialog-title" tabindex="-1">${step.title}</h2><form id="finder-form"><fieldset class="choice-group"><legend>Kies één antwoord</legend>${step.options.map(([value, label]) => `<label class="choice"><input type="radio" name="preference" value="${value}" required ${state.answers[state.step] === value ? 'checked' : ''}><span>${label}</span></label>`).join('')}</fieldset><div class="dialog-actions"><button type="button" class="plain-button" id="finder-back">${state.step ? 'Terug' : 'Annuleren'}</button><button type="submit" class="button">${state.step === 2 ? 'Bekijk mijn ritueel' : 'Volgende'} <span aria-hidden="true">→</span></button></div></form>`;
    content.querySelector('#finder-back').addEventListener('click', () => { if (state.step) { state.step--; renderStep(); } else closeDialog(); });
    content.querySelectorAll('input').forEach(input => input.addEventListener('change', () => { state.answers[state.step] = input.value; }));
    content.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const selected = content.querySelector('input:checked');
      if (!selected) return;
      state.answers[state.step] = selected.value;
      if (state.step < 2) { state.step++; renderStep(); } else renderResult();
    });
    focusHeading();
  }
  function recommend() {
    const [goal, experience, time] = state.answers;
    if (goal === 'brows') return 'brows';
    if (time === '30') return 'reset';
    if (experience === 'rest') return 'slow';
    if (time === '60' && experience === 'complete') return 'signature';
    return goal === 'comfort' ? 'hydra' : time === '60' ? 'signature' : 'reset';
  }
  function renderResult() {
    state.treatment = recommend();
    const treatment = treatments[state.treatment];
    const [goal, experience, time] = state.answers;
    const preference = goal === 'brows' ? 'Je wilt aandacht voor je wenkbrauwen.' : time === '30' ? 'Je zoekt een verzorgingsmoment dat binnen een halfuur past.' : experience === 'rest' ? 'Je kiest vooral voor ontspanning.' : 'Je wilt tijd maken voor persoonlijke huidverzorging.';
    content.innerHTML = `<span class="result-label">Jouw vertrekpunt</span><h2 id="dialog-title" tabindex="-1">${treatment.name}</h2><p class="dialog-intro">${preference} Op basis van je voorkeuren lijkt deze behandeling interessant.</p><p class="dialog-intro">${treatment.detail}</p><p class="result-meta">${treatment.minutes} minuten · € ${treatment.price} <small>demoprijs</small></p><div class="dialog-actions"><button class="plain-button" type="button" id="result-back">Antwoorden aanpassen</button><button class="button" type="button" id="result-book">Kies dit ritueel <span aria-hidden="true">↗</span></button></div><button class="plain-button" type="button" id="restart">Opnieuw beginnen</button>`;
    content.querySelector('#result-back').addEventListener('click', () => { state.step = 2; renderStep(); });
    content.querySelector('#restart').addEventListener('click', () => { state.answers = []; state.step = 0; state.treatment = ''; renderStep(); });
    content.querySelector('#result-book').addEventListener('click', renderBooking);
    focusHeading();
  }
  function renderBooking() {
    content.innerHTML = `<p class="dialog-progress">BOEKINGSDEMO · ER WORDT NIETS VERSTUURD</p><h2 id="dialog-title" tabindex="-1">Maak ruimte voor jouw moment.</h2><p class="dialog-intro">Ontdek hoe eenvoudig een afspraak kan beginnen. Kies een behandeling en een voorkeursmoment. We vragen geen naam of contactgegevens.</p><form id="booking-form"><label class="booking-label" for="treatment">Jouw behandeling</label><select class="booking-select" id="treatment" name="treatment" required><option value="">Kies een behandeling</option>${Object.entries(treatments).map(([id, treatment]) => `<option value="${id}" ${state.treatment === id ? 'selected' : ''}>${treatment.name} · ${treatment.minutes} min · € ${treatment.price}</option>`).join('')}</select><label class="booking-label" for="moment">Jouw voorkeursmoment (demo)</label><select class="booking-select" id="moment" name="moment" required><option value="">Kies een moment</option><option value="morning">Ochtend</option><option value="afternoon">Namiddag</option><option value="evening">Avond</option></select><div class="dialog-actions"><button type="button" class="plain-button" id="booking-back">${state.source === 'finder' ? 'Terug naar mijn ritueel' : 'Annuleren'}</button><button class="button" type="submit">Rond de demo af <span aria-hidden="true">↗</span></button></div></form>`;
    content.querySelector('#booking-back').addEventListener('click', () => { if (state.source === 'finder') renderResult(); else closeDialog(); });
    content.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const selected = content.querySelector('#treatment').value;
      const moment = content.querySelector('#moment').value;
      if (!treatments[selected] || !moment) return;
      state.treatment = selected;
      const momentLabel = { morning: 'de ochtend', afternoon: 'de namiddag', evening: 'de avond' }[moment];
      content.innerHTML = `<span class="success-mark" aria-hidden="true">✓</span><h2 id="dialog-title" tabindex="-1">Zo voelt een eenvoudig begin.</h2><p class="dialog-intro">Je koos <strong>${treatments[selected].name}</strong>, bij voorkeur in ${momentLabel}.</p><p class="dialog-intro">Dit was een demonstratie. Er is <strong>geen afspraak gemaakt</strong> en er zijn geen gegevens verzonden.</p><div class="dialog-actions"><button class="plain-button" type="button" id="another">Andere behandeling kiezen</button><button class="button" type="button" id="done">Terug naar Velune</button></div>`;
      content.querySelector('#another').addEventListener('click', () => { state.treatment = ''; state.source = 'direct'; renderBooking(); });
      content.querySelector('#done').addEventListener('click', closeDialog);
      focusHeading();
    });
    focusHeading();
  }
})();
