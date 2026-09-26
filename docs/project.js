(() => {
  'use strict';
  const builder = document.getElementById('project-builder');
  if (!builder) return;
  const commercial = window.LKCommercial;
  const pages = document.getElementById('project-pages');
  const initial = commercial.read(new URLSearchParams(location.search));
  document.getElementById('project-type').value = initial.type;
  builder.querySelector(`[name="complexity"][value="${initial.complexity}"]`).checked = true;
  pages.value = initial.pages;
  builder.querySelectorAll('[name="project-extra"]').forEach(input => { input.checked = initial.extras.includes(input.value); });
  document.getElementById('extra-options').open = initial.extras.some(key => !['api', 'shop'].includes(key));
  builder.hidden = false;
  const selection = () => ({ type: document.getElementById('project-type').value, pages: pages.value, complexity: builder.querySelector('[name="complexity"]:checked').value, extras: [...builder.querySelectorAll('[name="project-extra"]:checked')].map(input => input.value) });
  window.LKCalculatorSelection = () => commercial.read(new URLSearchParams(commercial.query(selection())));
  const signal = name => window.dispatchEvent(new CustomEvent('lk:interaction', { detail: { name } }));
  function render() {
    const selected = selection();
    const result = commercial.calculate(selected);
    for (const key of ['label', 'detail']) document.getElementById(`estimate-${key === 'label' ? 'package' : key}`).textContent = result[key];
    document.getElementById('estimate-price').textContent = result.inclusivePrice;
    document.getElementById('estimate-vat').textContent = result.custom ? '' : `Incl. 21% btw\n${result.price} excl. 21% btw`;
    const count = selected.extras.filter(key => !['api', 'shop'].includes(key)).length;
    document.getElementById('extra-count').textContent = count ? `(${count} gekozen)` : '(optioneel)';
    document.getElementById('estimate-context').textContent = `${commercial.pages[selected.pages]} · ${commercial.complexities[selected.complexity]}. Functies: ${selected.extras.map(key => commercial.extras[key]).join(', ') || 'Geen extra functies'}.`;
    document.getElementById('use-estimate').href = `contact.html?${commercial.query(selected)}`;
    window.dispatchEvent(new CustomEvent('lk:calculator-change', { detail: { query: commercial.query(selected) } }));
  }
  builder.addEventListener('submit', event => event.preventDefault());
  builder.addEventListener('change', render);
  builder.addEventListener('focusin', () => signal('calculator_start'), { once: true });
  builder.addEventListener('reset', () => setTimeout(() => { document.getElementById('extra-options').open = false; render(); }, 0));
  document.getElementById('use-estimate').addEventListener('click', () => { signal('calculator_complete'); signal('calculator_contact'); });
  render();
  const visibility = new IntersectionObserver(entries => {
    document.body.classList.toggle('calculator-in-view', entries[0].isIntersecting);
  });
  visibility.observe(builder);
})();
