import standard from 'stylelint-config-standard';
// Keep standard as the base, but remove its extra presentation/naming conventions.
// Recommended's syntax and semantic checks remain active underneath.
const retained = new Set(['block-no-redundant-nested-style-rules']);
export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['**/node_modules/**', '**/test-results/**', '**/playwright-report/**', '**/.cache/**', '**/vendor/**', '**/vendors/**', '**/*.min.css'],
  rules: {
    ...Object.fromEntries(Object.keys(standard.rules).filter(r => !retained.has(r)).map(r => [r, null])),
    'font-family-no-missing-generic-family-keyword': [true, { severity: 'warning' }],
    'no-descending-specificity': [true, { severity: 'warning' }],
    'no-duplicate-selectors': [true, { severity: 'warning' }],
    'block-no-redundant-nested-style-rules': [true, { severity: 'warning' }],
    'property-no-deprecated': [true, { severity: 'warning' }],
    'declaration-property-value-keyword-no-deprecated': [true, { severity: 'warning' }],
  },
};
