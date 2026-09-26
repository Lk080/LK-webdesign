# Accessibility-laag

`npm test` voert de bestaande smoke-tests en accessibility-tests uit.
Alleen Axe: `npm run test:e2e -- accessibility.spec.cjs`.
Na een run: `node scripts/qa-axe-report.cjs` maakt `test-results/accessibility-report.md`.
Het bestaande HTML-rapport bevat Axe-JSON, alle impacts als annotations,
ruwe resultaten en screenshots/traces bij failure.

`accessibility-helper.cjs` selecteert WCAG 2.0 A/AA, WCAG 2.1 A/AA en Axe
best-practice-regels. Ook de legacy duplicate-id-regels zijn expliciet actief.
Best-practice/legacy-meldingen zijn niet automatisch een WCAG-overtreding.
Iedere critical/serious violation laat de test falen; moderate/minor worden
volledig gerapporteerd. Incomplete checks vereisen beoordeling en worden niet
als geslaagd voorgesteld. Geen regels of elementen zijn uitgesloten.

De sitelijst in `accessibility.spec.cjs` kan later uitgebreid worden. Beide
bestaande Chromium-projecten worden geërfd: 1440×900 en 390×844. Elke site wordt
initieel gescand en op mobiel ook met geopend menu. Verborgen interactieve
stappen/dialogen worden niet automatisch geopend en vallen buiten deze scans.

De bestaande fixtures blijven verplicht: alle Formspree-verzoeken zijn gemockt,
service workers geblokkeerd en externe bronnen lokaal beantwoord. Daardoor zijn
echte webfonts niet aanwezig. Dit beïnvloedt de representativiteit van layout
of contrast; later ook beoordelen met echte fonts.

Automatische tests vervangen geen handmatige controle van volledige keyboard-
navigatie, focuszichtbaarheid/-volgorde/-herstel, screenreaders, de betekenis van
alt-teksten, reduced motion, zoom/reflow en interactieve componenten. Beoordeel
ook Axe-incomplete, formulierfeedback, alle wizardstappen, assistenten/dialogen
en contrast op afbeeldingen en in hover/focus/disabled states.
