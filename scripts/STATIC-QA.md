# Static code quality en lokale links

Workflow en gerichte uitvoering: [LK Development Standard V2](../LK-DEVELOPMENT-STANDARD.md).

- `npm run qa:html`: HTMLHint met centrale `.htmlhintrc` en aanvullende gerichte nestingregel.
- `npm run qa:css`: Stylelint met `stylelint-config-standard` als basis.
- `npm run qa:js`: ESLint 10 flat config, recommended fouten en expliciete browserglobals.
- `npm run qa:links`: Linkinator, interne pagina's/anchors/assets/CSS-URLs.
- `npm run qa:static`: alle vier achtereenvolgens, ook als een lintcontrole bevindingen heeft.
- `node scripts/qa-static-report.cjs`: leesbaar compleet rapport van de laatste vier controles.

Geen fixes. ERROR geeft exitcode 1; WARNING/INFO blijven zichtbaar zonder de
run te blokkeren. Runtime/configuratiefouten geven ook exitcode 1. Ruwe en
geclassificeerde resultaten staan in `test-results/static/*.json`; het leesbare
rapport staat in `test-results/static/report.md`.

Scope: eigen `.html`, `.css`, `.js` onder `docs`, momenteel 2 HTML, 2 CSS en 5 JS.
Geen vendorcode aangetroffen. `vendor`, `vendors`, `*.min.js`, `*.min.css`,
node_modules, caches en gegenereerde rapporten uitgesloten. QA-scripts/tests
zijn Node-code en vallen niet onder de browser-JavaScriptconfig. Inline JSON-LD
is geen JavaScript-lintdoel. Dynamisch opgebouwde HTML blijft aanvullend werk
voor browser-/accessibilitytests; HTMLHint is geen volledige HTML-validator.

Stylelint: de standard-basis blijft aanwezig, maar cosmetische regels zoals
kleur-/quote-notatie, naamconventies, witregels en vendor-prefixnormalisatie
zijn uitgezet. Cascadevolgorde en herhaalde selectors zijn warnings, aangezien
bewuste component-/responsive-overrides mogelijk zijn. Ontbrekende generieke
font-fallbacks zijn kwaliteitswarnings. Geen selectors of websitebestanden
zijn specifiek uitgezonderd om bestaande resultaten te verbergen.

HTMLHint tags-check defaults zijn aangepast om onnodige title-attributen en
XHTML-selfclosing niet te eisen. input-requires-label is niet geactiveerd omdat
deze versie correcte impliciete labels niet herkent; Axe blijft daarvoor actief.

Linkinator gebruikt de bestaande server op 127.0.0.1:4173. De runner start/stopt
zijn eigen server en hergebruikt geen proces op een bezette poort. Linkinator
krijgt checkFragments/checkCss; externe origins worden vóór het opvragen
uitgesloten. Redirects worden niet gevolgd, zodat een lokale redirect nooit
onbedoeld naar een externe dienst leidt. Alleen GET/HEAD-controles, geen
formulierbediening. Externe URL's blijven netwerkafhankelijke INFO-inventaris,
geen PASS-claim over bereikbaarheid. Formspree wordt nooit aangevraagd.

Nieuwe websitebestanden onder docs worden automatisch gelint. Breid voor een
nieuwe linkcrawl de sitelijst in qa-static.cjs uit wanneer de site bestaat.

Functionele regressiecheck met behoud van de rapportmappen:
`npm run test:e2e -- sites.spec.cjs --output=test-results/functional`
Een gewone `npm test` kan standaard test-results opschonen; bewaar belangrijke
rapporten vooraf. Bestaande Axe- en Lighthouseconfiguratie blijft ongewijzigd.
