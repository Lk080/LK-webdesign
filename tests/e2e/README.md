# Centrale Playwright QA

Zie [foundation](../../scripts/QA-FOUNDATION.md) en [V2](../../LK-DEVELOPMENT-STANDARD.md).
Projecten/adapters komen uit scripts/qa-projects.json. Geen vaste sitelijst hier.

`npm test -- --site <id>` selecteert één project. Gerichte tests kunnen als gewone
Playwright-argumenten volgen. V2 kiest checks en viewports via --check/--project.
Elke run krijgt eigen artifacts, HTML en JSON. Geen --output-overrides of baselineupdates.
Kelmora is op alle ondersteunde uitvoeringsingangen geblokkeerd.

Gebruik fixtures.cjs voor browsernetwerk, API-readbeleid en consolecontrole.
Onbekende externe dependencies zijn fouten; alleen expliciete fontfixtures en de
Formspree-mock zijn toegestaan. Er wordt nooit echt ingezonden. Screenshots/traces
alleen bij failure. Dit bewijst geen volledige handmatige toegankelijkheid.
