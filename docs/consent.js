(() => {
  'use strict';
  if (Object.hasOwn(window, 'LKConsent')) return;
  const config = window.LKMeasurementConfig;
  const available = config?.enabled === true && typeof config.provider?.create === 'function' &&
    typeof config.provider.description === 'string' && config.provider.description.length >= 30 &&
    typeof config.policy === 'string' && /^[a-z0-9-]{1,80}$/.test(config.policy);
  const policy = typeof config?.policy === 'string' ? config.policy : 'unconfigured';
  const key = 'lk.consent.v1', lifetime = 180 * 86400000;
  let persisted = true, current = read(), timer, opener;
  function valid(value) {
    return value && Object.keys(value).sort().join(',') === 'analytics,expiresAt,necessary,policy,schema,updatedAt' &&
      value.schema === 1 && value.policy === policy && value.necessary === true && typeof value.analytics === 'boolean' &&
      Number.isFinite(value.updatedAt) && Number.isFinite(value.expiresAt) && value.updatedAt <= Date.now() &&
      value.expiresAt === value.updatedAt + lifetime && value.expiresAt > Date.now();
  }
  function read() {
    try { const value = JSON.parse(localStorage.getItem(key)); return valid(value) ? value : null; }
    catch { return null; }
  }
  function state() {
    return Object.freeze({ necessary: true, analytics: available && current?.analytics === true,
      choice: current ? (current.analytics ? 'accepted' : 'rejected') : 'unset', available, persisted, policy });
  }
  function publish() {
    clearTimeout(timer);
    if (current) timer = setTimeout(expire, Math.min(current.expiresAt - Date.now() + 1, 86400000));
    render(); window.dispatchEvent(new CustomEvent('lk:consent-change', { detail: state() }));
  }
  function expire() {
    if (current && !valid(current)) { current = null; try { localStorage.removeItem(key); } catch { /* Memory-only choice. */ } publish(); }
    else if (current) { clearTimeout(timer); timer = setTimeout(expire, Math.min(current.expiresAt - Date.now() + 1, 86400000)); }
  }
  function get() { expire(); return state(); }
  function choose(analytics) {
    const updatedAt = Date.now();
    current = { schema: 1, policy, necessary: true, analytics: available && analytics === true, updatedAt, expiresAt: updatedAt + lifetime };
    try { localStorage.setItem(key, JSON.stringify(current)); persisted = true; } catch { persisted = false; }
    publish();
  }
  function element(tag, text, className) {
    const node = document.createElement(tag); if (text) node.textContent = text; if (className) node.className = className; return node;
  }
  function button(text, handler) {
    const node = element('button', text, 'consent-button'); node.type = 'button'; node.addEventListener('click', handler); return node;
  }
  const trigger = document.getElementById('privacy-preferences');
  const banner = element('section', '', 'consent-banner'); banner.id = 'consent-banner';
  const clearance = element('div'); clearance.setAttribute('aria-hidden', 'true');
  function reserveSpace() {
    const height = banner.hidden ? 0 : Math.ceil(banner.getBoundingClientRect().height + 32);
    clearance.style.height = `${height}px`;
    document.documentElement.style.scrollPaddingBottom = `${height}px`;
  }
  banner.setAttribute('aria-labelledby', 'consent-banner-title');
  const heading = element('h2', 'Jouw privacykeuze'); heading.id = 'consent-banner-title';
  const introduction = element('p', 'Met jouw toestemming meet LK Webdesign welke onderdelen helpen bij je aanvraag. Weigeren verandert niets aan de werking van de website.');
  const actions = element('div', '', 'consent-actions');
  const dialog = element('dialog', '', 'consent-dialog'); dialog.id = 'privacy-dialog'; dialog.setAttribute('aria-labelledby', 'privacy-title');
  const title = element('h2', 'Privacyvoorkeuren'); title.id = 'privacy-title'; title.tabIndex = -1;
  const necessary = element('p', 'Noodzakelijk — altijd actief. Je privacykeuze en de tijdelijke keuzes in de assistent blijven op dit toestel. Het aanvraagformulier werkt ook zonder statistieken.');
  const label = element('label', '', 'consent-option');
  const checkbox = element('input'); checkbox.type = 'checkbox'; checkbox.id = 'analytics-consent';
  label.append(checkbox, document.createTextNode('Optionele statistieken'));
  const explanation = element('p'); explanation.id = 'analytics-explanation'; checkbox.setAttribute('aria-describedby', explanation.id);
  const storage = element('p', 'Je privacykeuze wordt maximaal 180 dagen op dit toestel bewaard. Via Privacyvoorkeuren in de footer kun je ze altijd wijzigen.', 'consent-note');
  const withdrawal = element('p', 'Intrekken stopt toekomstige metingen. Gegevens die al zijn verstuurd, worden daardoor niet automatisch gewist.', 'consent-note');
  const persistence = element('p', '', 'consent-note'); persistence.setAttribute('role', 'status');
  const dialogActions = element('div', '', 'consent-actions');
  const content = document.getElementById('main');
  function finish(value) { choose(value); if (dialog.open) dialog.close(); else content.focus({ preventScroll: true }); }
  const accept = button('Accepteren', () => finish(true));
  const reject = button('Weigeren', () => finish(false));
  function open(source) { opener = source; checkbox.checked = get().analytics; if (!dialog.open) dialog.showModal(); title.focus(); }
  actions.append(accept, reject, button('Voorkeuren', event => open(event.currentTarget)));
  banner.append(heading, introduction, actions);
  const save = button('Bewaar voorkeuren', () => finish(checkbox.checked));
  const deny = button('Weiger statistieken', () => finish(false));
  const close = button('Sluiten', () => dialog.close());
  dialogActions.append(save, deny, close);
  dialog.append(title, necessary, label, explanation, storage, withdrawal, persistence, dialogActions);
  dialog.addEventListener('close', () => {
    const target = opener?.isConnected && opener.getClientRects().length ? opener : content;
    target.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button,input')].filter(e => !e.disabled && !e.hidden);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && [first, title].includes(document.activeElement)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  function render() {
    banner.hidden = !available || Boolean(current);
    reserveSpace();
    checkbox.disabled = !available; checkbox.checked = available && current?.analytics === true;
    explanation.textContent = available
      ? config.provider.description
      : 'Statistieken staan momenteel uit: er is geen meetdienst aangesloten. We versturen geen analytics-events. Bij een toekomstige wijziging vragen we opnieuw je keuze.';
    save.hidden = !available; deny.hidden = !available; withdrawal.hidden = !available;
    persistence.textContent = persisted ? '' : 'Je browser bewaart deze keuze niet. Ze geldt alleen zolang deze pagina open blijft.';
  }
  if (!trigger || !('showModal' in dialog)) return;
  document.body.append(clearance, banner, dialog); trigger.hidden = false;
  new ResizeObserver(reserveSpace).observe(banner);
  trigger.addEventListener('click', () => open(trigger));
  window.LKConsent = Object.freeze({ get, choose });
  window.addEventListener('storage', event => { if (event.key === key || event.key === null) { current = read(); publish(); } });
  window.addEventListener('pageshow', event => { if (event.persisted) { current = read(); publish(); } });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') expire(); });
  publish();
})();
