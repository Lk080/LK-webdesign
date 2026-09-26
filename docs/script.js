// Progressive navigation: links remain available when JavaScript is unavailable.
const menu = document.querySelector('.lk-menu');
const nav = document.getElementById('main-nav');
const header = document.querySelector('.lk-header');
const wideNavigation = matchMedia('(min-width: 901px)');
let navigationFocus = null;
document.addEventListener('focusin', event => {
  navigationFocus = nav.contains(event.target) || event.target === menu ? event.target : null;
});
function closeMenu({ restoreFocus = false } = {}) {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  if (restoreFocus) menu.focus();
}
menu.hidden = false;
header.classList.add('lk-nav-ready');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  if (!wideNavigation.matches) {
    closeMenu();
    // Move focus to the destination rather than leaving it inside collapsed navigation.
    const target = link.hash && new URL(link.href).pathname === location.pathname ? document.getElementById(decodeURIComponent(link.hash.slice(1))) : null;
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  }
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu({ restoreFocus: true });
});
document.addEventListener('click', event => {
  if (!header.contains(event.target) && nav.classList.contains('open')) {
    closeMenu({ restoreFocus: nav.contains(document.activeElement) });
  }
});
wideNavigation.addEventListener('change', () => {
  // A breakpoint can hide the focused element before the media-query event fires.
  const focused = document.activeElement === document.body ? navigationFocus : document.activeElement;
  closeMenu();
  if (wideNavigation.matches && focused === menu) nav.querySelector('a').focus();
  else if (!wideNavigation.matches && nav.contains(focused)) menu.focus();
});
document.getElementById('year').textContent = new Date().getFullYear();
// Local event hook only: no tracker, network request or personal data.
document.addEventListener('click', event => {
  const link = event.target.closest('[data-event]');
  if (link) window.dispatchEvent(new CustomEvent('lk:interaction', { detail: { name: link.dataset.event } }));
});
document.querySelectorAll('details').forEach(item => item.addEventListener('toggle', () => {
  if (item.open) window.dispatchEvent(new CustomEvent('lk:interaction', { detail: { name: 'faq_open' } }));
}));
