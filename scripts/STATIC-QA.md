# Static QA

Gebruik de centrale [foundation-afspraken](QA-FOUNDATION.md) en projectregistratie.
`node scripts/qa-static.cjs <html|css|js|links|all> <project-id>` vereist een expliciet,
niet-bevroren project. Elke uitvoering krijgt unieke output met run/projectmetadata.

ERROR blokkeert; WARNING/INFO blijven zichtbaar. HTMLHint is geen volledige HTML-
conformancevalidator; dynamische states blijven Playwright/Axe-werk. Stylelint bewaart
syntax/semantiek en rapporteert cascade-/duplicatiewarnings. Linkinator bezoekt alleen
lokale URLs in projectscope en volgt geen redirects. Buiten-scope links zijn INFO,
geen bereikbaarheid-PASS. Geen fixes of formulierinzendingen.

`node scripts/qa-static-report.cjs <run-directory> <project-id>` leest uitsluitend
bijbehorende metadata. `qa:foundation` voegt SEO/publicatiefase/JSON-LD/assets toe;
`qa:tooling` lint onderhouden Node-test-/helpercode. Aantallen en sites komen uit
configuratie en reports, niet uit deze documentatie.
