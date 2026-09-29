(() => {
  'use strict';
  const form = document.getElementById('contact-form');
  if (!form) return;
  const button = document.getElementById('send-request');
  const status = document.getElementById('form-status');
  // Public Formspree endpoint only. Never place account/API secrets in this file.
  const endpoint = form.dataset.formEndpoint.trim();
  const configured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);
  let sending = false;
  let lastSent = '';
  let confirmedReceipt = 0;
  form.noValidate = true;
  function syncSubmitButton() {
    button.disabled = !configured || sending;
  }
  syncSubmitButton();
  const extra = document.getElementById('contact-extra');
  function revealRelevantFields() {
    if (document.getElementById('interest').value === window.LKCommercial.types.existing) extra.open = true;
  }
  revealRelevantFields();
  form.addEventListener('change', revealRelevantFields);
  form.addEventListener('focusin', revealRelevantFields);
  window.addEventListener('lk:contact-context', revealRelevantFields);
  form.addEventListener('reset', () => { extra.open = false; });
  // Reconcile a restored button state without unlocking an active request.
  window.addEventListener('pageshow', syncSubmitButton);
  form.addEventListener('input', syncSubmitButton);
  form.addEventListener('change', syncSubmitButton);
  if (configured) {
    document.getElementById('contact-availability').textContent = 'Bespreek je project. Vul je gegevens en plannen in. Je aanvraag wordt rechtstreeks verstuurd; je blijft op deze website.';
  }

  function feedback(message, state = 'error', focus = false) {
    status.textContent = message;
    status.dataset.state = state;
    if (focus) status.focus();
  }
  function fieldError(id, message) {
    const field = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
    error.hidden = !message;
    return !message;
  }
  function validate() {
    let valid = true;
    for (const [id, missing] of [['name', 'Vul je naam in.'], ['email', 'Vul je e-mailadres in.'], ['message', 'Vertel kort over je project.']]) {
      const field = document.getElementById(id);
      let message = field.value.trim() ? '' : missing;
      if (!message && id === 'email' && field.validity.typeMismatch) message = 'Vul een geldig e-mailadres in, bijvoorbeeld naam@jouwzaak.be.';
      if (!message && field.value.length > field.maxLength) message = `Gebruik maximaal ${field.maxLength} tekens.`;
      valid = fieldError(id, message) && valid;
    }
    const website = document.getElementById('website');
    let websiteMessage = '';
    if (website.value.trim()) {
      let value = website.value.trim();
      if (!/^[a-z][a-z\d+.-]*:/i.test(value)) value = `https://${value}`;
      try {
        const url = new URL(value);
        if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.') || url.username || url.password || value.length > 2048) throw new Error('Invalid URL');
        website.value = url.href;
      } catch { websiteMessage = 'Vul een geldig websiteadres in, bijvoorbeeld https://jouwzaak.be.'; }
    }
    valid = fieldError('website', websiteMessage) && valid;
    if (!valid) {
      feedback('Controleer de gemarkeerde velden. Je aanvraag is nog niet verstuurd.');
      const invalid = form.querySelector('[aria-invalid="true"]');
      const disclosure = invalid.closest('details');
      if (disclosure) disclosure.open = true;
      invalid.focus();
    }
    return valid;
  }
  for (const id of ['name', 'email', 'website', 'message']) {
    document.getElementById(id).addEventListener('input', () => fieldError(id, ''));
  }
  form.addEventListener('input', () => {
    if (!sending && status.dataset.state === 'success') status.textContent = '';
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    if (!validate()) return;
    if (!configured) {
      feedback('Rechtstreeks versturen is nog niet beschikbaar. Neem contact op via info@lkwebdesign.be.', 'error', true);
      return;
    }
    if (form.elements._gotcha.value) {
      feedback('Je aanvraag kon niet worden verstuurd. Neem contact op via info@lkwebdesign.be.', 'error', true);
      return;
    }
    const payload = Object.fromEntries(new FormData(form));
    for (const key of Object.keys(payload)) payload[key] = payload[key].trim();
    const signature = JSON.stringify(payload);
    if (signature === lastSent) {
      feedback('Deze aanvraag is al ontvangen. Je hoeft ze niet opnieuw te versturen.', 'success', true);
      return;
    }
    sending = true;
    form.setAttribute('aria-busy', 'true');
    const controls = [...form.querySelectorAll('input, select, textarea, button')];
    controls.forEach(control => control.disabled = true);
    button.textContent = 'Aanvraag versturen…';
    feedback('Je aanvraag wordt verstuurd. Even geduld.', 'pending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: signature,
        signal: controller.signal,
        credentials: 'omit',
        redirect: 'error'
      });
      if (!response.ok) {
        if (response.status === 429) throw new Error('Er zijn te veel aanvragen tegelijk. Wacht even voordat je opnieuw probeert.');
        if (response.status >= 400 && response.status < 500) throw new Error('De aanvraag is niet geaccepteerd. Controleer je gegevens of neem contact op via info@lkwebdesign.be.');
        throw new Error('De formulierdienst is tijdelijk niet beschikbaar. Je gegevens blijven staan. Probeer later opnieuw.');
      }
      let result;
      try { result = await response.json(); } catch { throw new Error('De ontvangst kon niet worden bevestigd. Je gegevens blijven staan. Neem bij twijfel contact op via info@lkwebdesign.be.'); }
      if (!result || result.ok !== true) throw new Error('De ontvangst kon niet worden bevestigd. Je gegevens blijven staan. Neem bij twijfel contact op via info@lkwebdesign.be.');
      lastSent = signature;
      confirmedReceipt += 1;
      window.dispatchEvent(new CustomEvent('lk:interaction', { detail: { name: 'contact_submit_success', receipt: confirmedReceipt } }));
      form.reset();
      // Hidden input values also update their defaults; clear them explicitly.
      document.getElementById('selected-package').value = '';
      document.getElementById('project-summary').value = '';
      document.getElementById('request-plan').hidden = true;
      document.getElementById('request-plan-text').textContent = '';
      for (const id of ['name', 'email', 'website', 'message']) fieldError(id, '');
      feedback('Bedankt! Je aanvraag is succesvol verzonden. Ik neem zo snel mogelijk contact met je op.', 'success', true);
    } catch (error) {
      window.dispatchEvent(new CustomEvent('lk:interaction', { detail: { name: 'contact_submit_error' } }));
      const message = error.name === 'AbortError' || error instanceof TypeError
        ? 'We konden de ontvangst niet bevestigen. Je gegevens blijven staan. Controleer je verbinding; neem bij twijfel contact op via info@lkwebdesign.be voordat je opnieuw verstuurt.'
        : error.message;
      feedback(message, 'error', true);
    } finally {
      clearTimeout(timeout);
      sending = false;
      form.removeAttribute('aria-busy');
      controls.forEach(control => control.disabled = false);
      syncSubmitButton();
      button.textContent = 'Verstuur je aanvraag →';
    }
  });
})();
