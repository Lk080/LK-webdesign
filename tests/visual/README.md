# Visual QA

Zie [foundation](../../scripts/QA-FOUNDATION.md). `npm run qa:visual -- --site <id>
--project=<viewport>` vergelijkt expliciet zonder updates. Projectselectors komen
uit de centrale registratie; viewports uit playwright.visual.config.cjs.

Elke screenshot wordt eenmaal gemaakt, opgeslagen én vergeleken (threshold 0,
maxDiffPixels 0). Het reviewoverzicht hergebruikt diezelfde artifacts. Geen tweede
browsercapture voor rapportage. Fonts, reduced motion, locale en browserconfig
blijven deterministisch. Layoutdiagnose geeft geen universele lengtelimiet.

`node scripts/qa-visual-index.cjs <run-directory> <project-id>` bouwt uitsluitend een
index van die run. Baselineacceptatie gebruikt een expliciet beoordeeld review.json,
exacte bestanden/viewport/artifact-hash en --apply; zie foundation voor het schema.
Geen automatische acceptance. Bestaande Kelmora-referenties blijven bevroren.
