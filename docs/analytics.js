(() => {
  'use strict';
  if (Object.hasOwn(window, 'LKAnalytics') || !window.LKConsent) return;
  const config = window.LKMeasurementConfig;
  const locations = ['hero', 'header', 'content', 'footer', 'assistant'];
  const destinations = ['calculator', 'contact', 'projects'];
  const schema = Object.freeze({
    primary_cta_click: { location: locations, destination: destinations },
    secondary_cta_click: { location: locations, destination: destinations },
    project_view: { location: locations, project: ['kelmora', 'velune', 'avren'] },
    calculator_start: {}, calculator_complete: { pages: ['small', 'medium', 'large', 'custom', 'unknown'] },
    contact_start: {}, generate_lead: {}, phone_click: { location: locations }, email_click: { location: locations }
  });
  const pageName = () => ({ '/': 'home', '/index.html': 'home', '/aanpak.html': 'approach', '/contact.html': 'contact' })[location.pathname];
  let phase = 'disabled', controller, instance, deadline, epoch = 0;
  const once = new Set();
  function safeCall(object, method, ...args) {
    try { return Promise.resolve(object?.[method]?.(...args)).catch(() => undefined); } catch { return Promise.resolve(); }
  }
  function cleanup(object) { void safeCall(object, 'stop'); void safeCall(object, 'clear'); }
  function stop() {
    epoch++; clearTimeout(deadline); controller?.abort(); cleanup(instance); instance = null; controller = null; once.clear(); phase = 'disabled';
  }
  function refresh() {
    const allowed = window.LKConsent.get().analytics;
    if (!allowed) { if (phase !== 'disabled') stop(); return; }
    if (phase !== 'disabled') return;
    phase = 'loading'; const version = ++epoch; controller = new AbortController(); const signal = controller.signal;
    const isAllowed = () => version === epoch && !signal.aborted && window.LKConsent.get().analytics;
    deadline = setTimeout(() => { if (version === epoch && phase === 'loading') { controller.abort(); phase = 'unavailable'; } }, 3000);
    // No queue: pre-consent and loading-time interactions are never replayed.
    Promise.resolve().then(() => isAllowed() ? config.provider.create({ signal, isAllowed }) : null).then(provider => {
      if (!isAllowed()) { cleanup(provider); return; }
      clearTimeout(deadline);
      if (!provider || typeof provider.track !== 'function' || typeof provider.stop !== 'function' || typeof provider.clear !== 'function') {
        cleanup(provider); phase = 'unavailable'; controller.abort(); return;
      }
      instance = provider; phase = 'ready';
    }).catch(() => { if (version === epoch) { clearTimeout(deadline); phase = 'unavailable'; controller.abort(); } });
  }
  function send(name, properties = {}, receipt) {
    try {
      refresh();
      if (phase !== 'ready' || !window.LKConsent.get().analytics || !pageName() || typeof name !== 'string' || !Object.hasOwn(schema, name)) return false;
      if (!properties || typeof properties !== 'object' || Array.isArray(properties)) return false;
      const allowed = schema[name], keys = Reflect.ownKeys(properties), clean = { page: pageName() };
      if (keys.length !== Object.keys(allowed).length) return false;
      for (const key of keys) {
        const descriptor = Object.getOwnPropertyDescriptor(properties, key);
        if (typeof key !== 'string' || !Object.hasOwn(allowed, key) || !descriptor ||
          !Object.hasOwn(descriptor, 'value') || !allowed[key].includes(descriptor.value)) return false;
        clean[key] = descriptor.value;
      }
      if (name === 'generate_lead' && (!Number.isSafeInteger(receipt) || receipt < 1 || pageName() !== 'contact')) return false;
      const dedup = name === 'generate_lead' ? `lead:${receipt}` : ['calculator_start', 'calculator_complete', 'contact_start'].includes(name) ? name : null;
      if (dedup && once.has(dedup)) return false;
      if (dedup) once.add(dedup);
      const payload = Object.freeze(clean);
      void safeCall(instance, 'track', name, payload, { signal: controller.signal });
      return true;
    } catch { return false; }
  }
  // Only the confirmed application-success hook can supply a lead receipt.
  window.LKAnalytics = Object.freeze({ track: (name, properties) => name === 'generate_lead' ? false : send(name, properties), status: () => phase });
  window.addEventListener('lk:consent-change', refresh);
  window.addEventListener('pageshow', refresh);
  window.addEventListener('lk:interaction', event => {
    const detail = event.detail;
    if (detail?.name === 'calculator_start') send('calculator_start');
    if (detail?.name === 'calculator_complete') send('calculator_complete', { pages: document.getElementById('project-pages')?.value });
    if (detail?.name === 'contact_submit_success') send('generate_lead', {}, detail.receipt);
  });
  document.getElementById('contact-form')?.addEventListener('focusin', event => {
    if (event.target.matches('input:not([type=hidden]),textarea,select')) send('contact_start');
  });
  function where(link) {
    if (link.closest('dialog')) return 'assistant';
    if (link.closest('header')) return 'header';
    if (link.closest('footer')) return 'footer';
    return link.closest('.hero') ? 'hero' : 'content';
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]'); if (!link) return;
    // Preserve the existing local hook without adding a second click emitter.
    if (link.dataset.event) window.dispatchEvent(new CustomEvent('lk:interaction', { detail: { name: link.dataset.event } }));
    const place = where(link), url = new URL(link.href, location.origin);
    if (url.protocol === 'mailto:') { send('email_click', { location: place }); return; }
    if (url.protocol === 'tel:') { send('phone_click', { location: place }); return; }
    if (url.origin !== location.origin) return;
    const project = { '/demos/vakman/': 'kelmora', '/demos/beauty/': 'velune', '/demos/automotive/': 'avren' }[url.pathname];
    if (project) { send('project_view', { location: place, project }); return; }
    const destination = url.pathname === '/aanpak.html' ? 'calculator' : url.pathname === '/contact.html' ? 'contact' : url.hash === '#projecten' ? 'projects' : null;
    if (!destination || link.id === 'use-estimate') return;
    if (link.matches('.button,.lk-nav-contact')) send('primary_cta_click', { location: place, destination });
    else if (['hero_projects', 'pricing_cta'].includes(link.dataset.event)) send('secondary_cta_click', { location: place, destination });
  });
  refresh();
})();
