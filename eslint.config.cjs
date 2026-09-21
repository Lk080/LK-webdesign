const js = require('@eslint/js');
const browserNames = ['window', 'document', 'navigator', 'location', 'console', 'matchMedia', 'innerWidth', 'innerHeight', 'scrollY', 'addEventListener', 'removeEventListener', 'requestAnimationFrame', 'cancelAnimationFrame', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'IntersectionObserver', 'ResizeObserver', 'MutationObserver', 'HTMLElement', 'HTMLInputElement', 'HTMLSelectElement', 'HTMLTextAreaElement', 'HTMLButtonElement', 'Element', 'Node', 'Event', 'CustomEvent', 'FormData', 'URL', 'URLSearchParams', 'fetch', 'AbortController', 'localStorage', 'sessionStorage', 'getComputedStyle', 'performance'];
module.exports = [
  { ignores: ['**/node_modules/**', '**/test-results/**', '**/playwright-report/**', '**/.cache/**', '**/vendor/**', '**/vendors/**', '**/*.min.js'] },
  { files: ['docs/**/*.js'], languageOptions: { ecmaVersion: 'latest', sourceType: 'script', globals: Object.fromEntries(browserNames.map(n => [n, 'readonly'])) },
    rules: { ...js.configs.recommended.rules, 'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }] } },
];
