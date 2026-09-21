# Centrale Playwright QA

Workflow en gerichte uitvoering: [LK Development Standard V2](../../LK-DEVELOPMENT-STANDARD.md).

Voer vanuit de projectroot uit:

- `npm test` of `npm run test:e2e`: alle tests.
- `npm run test:e2e:ui`: interactieve runner.
- `npm run test:e2e:report`: het laatste HTML-rapport.
- `npm run test:e2e -- --project=mobile-chromium`: alleen mobiel.

De configuratie start automatisch de server voor `docs` op 127.0.0.1:4173.
Een bestaande server op die poort wordt niet hergebruikt. Desktop gebruikt
1440×900; mobiel gebruikt Chromium met 390×844 en touch-emulatie.
Browserbestanden en tijdelijke bestanden blijven in `.cache` in de projectroot.

Bij een nieuwe checkout, nadat de bestaande dependencies beschikbaar zijn:

```sh
mkdir -p .cache/tmp
TMPDIR="$PWD/.cache/tmp" PLAYWRIGHT_BROWSERS_PATH="$PWD/.cache/ms-playwright" node node_modules/@playwright/test/cli.js install chromium
```

`sites.spec.cjs` bevat de sitelijst en herbruikbare controles. Voeg toekomstige
websites pas toe zodra hun lokale pagina's bestaan. Beauty en Automotive zijn
nog niet opgenomen. Aanvullende tests moeten `test` en `expect` importeren uit
`./fixtures.cjs` om de netwerkbeveiliging en consolecontrole te behouden.

Alle Formspree-verzoeken uit de browser worden gemockt. Overige externe
browserverzoeken worden lokaal beantwoord; externe fonts worden dus niet
opgehaald. Dit is een functionele lokale smoke-suite, geen visuele fonttest of
controle van externe diensten. De linkcontrole doet uitsluitend lokale GETs.
Service workers zijn geblokkeerd. Console-errors en ongehanteerde JS-fouten
laten elke betreffende test mislukken; details staan in de rapportbijlagen.

Screenshots en traces worden bewaard bij failure. HTML-output staat in
`playwright-report`, JSON en overige resultaten in `test-results`.
De vier uitsluitend mobiele controles worden op desktop bewust overgeslagen.
