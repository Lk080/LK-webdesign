(() => {
  'use strict';
  const form = document.getElementById('contact-form');
  if (!form) return;
  const commercial = window.LKCommercial;
  let listeners;
  function renderSummary(text) {
    const target = document.getElementById('request-plan-text');
    target.replaceChildren();
    text.split('\n').forEach((line, index) => {
      if (index) target.append(document.createTextNode('\n'));
      const span = document.createElement('span');
      if (line.startsWith('€') && line.includes('excl.')) span.className = 'request-net';
      span.textContent = line; target.append(span);
    });
  }
  function applyContext(params) {
    if (form.getAttribute('aria-busy') === 'true') return false;
    if (listeners) listeners.abort();
    listeners = new AbortController();
    const listen = (node, name, handler, capture = false) => node.addEventListener(name, handler, { signal: listeners.signal, capture });
    document.getElementById('context-editor')?.remove();
    document.getElementById('project-summary').value = '';
    document.getElementById('selected-package').value = '';
    document.getElementById('assistant-source').value = '';
    document.getElementById('request-plan').hidden = true;
    document.getElementById('request-plan-text').textContent = '';
    document.getElementById('edit-plan').setAttribute('aria-expanded', 'false');
  const summary = document.getElementById('project-summary');
  const panel = document.getElementById('request-plan');
  const plan = document.getElementById('selected-package');
  const interest = document.getElementById('interest');
  const edit = document.getElementById('edit-plan');
  const source = document.getElementById('assistant-source');
  const serviceInterest = key => key === 'hosting' ? 'Hosting en domeinbeheer' : 'Hosting en onderhoud';
  const serviceSummary = key => `Interesse in ${commercial.services[key]} — ${commercial.servicePrice(key)}. ${key !== 'hosting' ? 'Hosting is inbegrepen; geen extra hostingbedrag. ' : ''}Domeinregistratie/verlenging apart per jaar.`;
  let currentSelection = null;
  const projects = { kelmora: 'Kelmora', velune: 'Velune', avren: 'AVREN' };
  function clear() {
    source.value = ''; summary.value = ''; plan.value = ''; panel.hidden = true; currentSelection = null;
    const openEditor = document.getElementById('context-editor');
    if (openEditor) openEditor.hidden = true;
    document.getElementById('request-plan-text').textContent = '';
    window.history.replaceState(null, '', location.pathname);
  }
  if (params.has('type') && Object.hasOwn(commercial.types, params.get('type'))) {
    const selected = commercial.read(params);
    currentSelection = selected;
    summary.value = commercial.summary(selected);
    interest.value = commercial.types[selected.type];
    plan.value = commercial.calculate(selected).label;
    edit.href = `aanpak.html?${commercial.query(selected)}#projectkeuze`;
  } else if (Object.hasOwn(projects, params.get('project'))) {
    summary.value = `Ik wil het fictieve demoproject ${projects[params.get('project')]} als vertrekpunt bespreken.`;
    edit.href = 'index.html#projecten';
  } else if (Object.hasOwn(commercial.services, params.get('service'))) {
    const service = params.get('service');
    summary.value = serviceSummary(service);
    interest.value = serviceInterest(service);
    edit.href = 'aanpak.html#ondersteuning';
  }
  const assistantSource = params.get('assistant_source');
  const activeService = !currentSelection && !Object.hasOwn(projects, params.get('project')) ? params.get('service') : null;
  const matchedSource = { new_website: currentSelection?.type === 'new', existing_website: currentSelection?.type === 'existing', automation: currentSelection?.type === 'automation', hosting: activeService === 'hosting', care: activeService === 'care', both: activeService === 'both', contact: !summary.value };
  if (Object.hasOwn(matchedSource, assistantSource) && matchedSource[assistantSource]) {
    source.value = assistantSource;
    if (assistantSource === 'contact') interest.value = 'Ik wil even overleggen';
  }
  if (summary.value) {
    panel.hidden = false;
    renderSummary(summary.value);
  }
  // Edit only non-personal project context in place; never navigate away from a draft.
  if (currentSelection) {
    const editor = document.createElement('div');
    editor.id = 'context-editor'; editor.hidden = true;
    function dropdown(id, title, options) {
      const field = document.createElement('div'); field.className = 'field';
      const label = document.createElement('label'); label.htmlFor = id; label.textContent = title;
      const select = document.createElement('select'); select.id = id;
      Object.entries(options).forEach(([value, text]) => {
        const option = document.createElement('option'); option.value = value; option.textContent = text; select.append(option);
      });
      field.append(label, select); editor.append(field); return select;
    }
    const type = dropdown('context-type', 'Vertrekpunt', commercial.types);
    const count = dropdown('context-pages', 'Paginaomvang', commercial.pages);
    const complexity = dropdown('context-complexity', 'Complexiteit', commercial.complexities);
    const group = document.createElement('fieldset');
    const legend = document.createElement('legend'); legend.textContent = 'Bijzondere wensen'; group.append(legend);
    group.className = 'choice-grid';
    const checks = Object.entries(commercial.extras).map(([value, text]) => {
      const label = document.createElement('label'), input = document.createElement('input');
      input.type = 'checkbox'; input.value = value;
      label.append(input, document.createTextNode(text)); group.append(label); return input;
    });
    const apply = document.createElement('button'); apply.type = 'button'; apply.className = 'button dark'; apply.textContent = 'Bewaar projectkeuze';
    const cancel = document.createElement('button'); cancel.type = 'button'; cancel.className = 'text-button'; cancel.textContent = 'Annuleren';
    editor.append(group, apply, cancel); panel.append(editor);
    edit.setAttribute('aria-controls', editor.id); edit.setAttribute('aria-expanded', 'false');
    const close = () => { editor.hidden = true; edit.setAttribute('aria-expanded', 'false'); edit.focus(); };
    listen(edit, 'click', event => {
      event.preventDefault();
      if (form.getAttribute('aria-busy') === 'true' || !currentSelection) return;
      type.value = currentSelection.type; count.value = currentSelection.pages; complexity.value = currentSelection.complexity;
      checks.forEach(input => { input.checked = currentSelection.extras.includes(input.value); });
      editor.hidden = false; edit.setAttribute('aria-expanded', 'true'); type.focus();
    });
    listen(apply, 'click', () => {
      source.value = '';
      currentSelection = { type: type.value, pages: count.value, complexity: complexity.value, extras: checks.filter(input => input.checked).map(input => input.value) };
      summary.value = commercial.summary(currentSelection);
      plan.value = commercial.calculate(currentSelection).label;
      interest.value = commercial.types[currentSelection.type];
      renderSummary(summary.value);
      window.history.replaceState(null, '', `${location.pathname}?${commercial.query(currentSelection)}`);
      close();
    });
    listen(cancel, 'click', close);
  }
  if (summary.value && !currentSelection) {
    const editor = document.createElement('div'); editor.id = 'context-editor'; editor.hidden = true;
    editor.className = 'field';
    const label = document.createElement('label'); label.htmlFor = 'context-reference'; label.textContent = 'Wijzig je vertrekpunt';
    const select = document.createElement('select'); select.id = label.htmlFor;
    const isProject = Object.hasOwn(projects, params.get('project'));
    const options = isProject ? projects : { hosting: commercial.services.hosting, care: commercial.services.care };
    Object.entries(options).forEach(([value, text]) => {
      const option = document.createElement('option'); option.value = value; option.textContent = text; select.append(option);
    });
    let chosen = params.get(isProject ? 'project' : 'service');
    if (!isProject && chosen === 'both') chosen = 'care';
    const apply = document.createElement('button'); apply.type = 'button'; apply.className = 'button dark'; apply.textContent = 'Bewaar projectkeuze';
    const cancel = document.createElement('button'); cancel.type = 'button'; cancel.className = 'text-button'; cancel.textContent = 'Annuleren';
    editor.append(label, select, apply, cancel); panel.append(editor);
    edit.setAttribute('aria-controls', editor.id); edit.setAttribute('aria-expanded', 'false');
    const close = () => { editor.hidden = true; edit.setAttribute('aria-expanded', 'false'); edit.focus(); };
    listen(edit, 'click', event => {
      event.preventDefault();
      if (form.getAttribute('aria-busy') === 'true') return;
      select.value = chosen; editor.hidden = false; edit.setAttribute('aria-expanded', 'true'); select.focus();
    });
    listen(apply, 'click', () => {
      chosen = select.value; source.value = '';
      if (!isProject) interest.value = serviceInterest(chosen);
      summary.value = isProject ? `Ik wil het fictieve demoproject ${projects[chosen]} als vertrekpunt bespreken.` : serviceSummary(chosen);
      renderSummary(summary.value);
      window.history.replaceState(null, '', `${location.pathname}?${isProject ? 'project' : 'service'}=${chosen}`);
      close();
    });
    listen(cancel, 'click', close);
  }
  listen(form, 'submit', event => {
    const editor = document.getElementById('context-editor');
    if (editor && !editor.hidden) {
      event.preventDefault(); event.stopImmediatePropagation();
      const status = document.getElementById('form-status');
      status.textContent = 'Bewaar of annuleer eerst je projectkeuze. Je aanvraag is nog niet verstuurd.';
      status.dataset.state = 'error';
      editor.querySelector('select').focus();
    }
  }, true);
  listen(document.getElementById('remove-plan'), 'click', () => {
    if (form.getAttribute('aria-busy') === 'true') return;
    clear(); interest.focus();
  });
  // A different enquiry category must not silently send a conflicting old selection.
  listen(interest, 'change', clear);
  listen(form, 'reset', clear);
    window.dispatchEvent(new Event('lk:contact-context'));
    return true;
  }
  window.LKApplyContactContext = query => applyContext(new URLSearchParams(query));
  applyContext(new URLSearchParams(location.search));
})();
