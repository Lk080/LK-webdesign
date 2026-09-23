# AVREN — Paint Protection & Detailing

Fictieve automotive portfolio-demo voor LK Webdesign. Zelfstandige statische pagina
met lokale WebP-beelden, systeemfonts en vanilla JavaScript. Geen dependencies,
externe requests, tracking, persoonsgegevens, opslag of echte offerteverzending.

## Ontwerp en gedrag

Grafiet, gebroken wit en gecontroleerd koper; krachtige sans-serifkoppen en
voertuigfotografie. Hero → expertise → PPF-vakwerk → glanssimulatie → compact
proces → protection configurator → gallery → FAQ → afsluitende CTA.

De configurator vraagt voertuigtype, doel en gebruik. Het doel kiest het pakket;
voertuigtype schaalt de indicatieve range; snelweggebruik + bescherming voegt
coating aan front-PPF toe. Overig gebruik beïnvloedt de toelichting. Prijzen en
tijden zijn uitsluitend demonstratie, geen marktadvies of offerte. Terug, opnieuw
beginnen en vooraf gekozen dienst blijven beschikbaar. Offerte-intentie vraagt
alleen erkenning van het demokarakter, geen contactgegevens.

De glansslider toont één AI-beeld met een gefilterde laag. Dit is nadrukkelijk
geen gedocumenteerd klantresultaat. Native range ondersteunt pointer, touch en
keyboard; een duidelijke focusrand markeert de actieve vergelijking.

## Lokale preview en gerichte QA

Vanuit projectroot: `node scripts/qa-server.cjs`, daarna `/demos/automotive/` op
127.0.0.1:4173. Stop de preview voordat Playwright zijn eigen server start.

- `npm run qa:light -- --site automotive --check smoke --project mobile --run`
- `npm run qa:medium -- --site automotive --check functional,axe,links --run`
- `npm run qa:final -- --site automotive` toont het volledige finale plan.
- Uitvoering met `--run`; respecteer Development Standard V2 en hergebruik geldig bewijs.
- Nieuwe Automotive-referenties alleen na visuele review; nooit brede updates.

Tests: `tests/e2e/automotive-flows.spec.cjs` en
`tests/e2e/automotive-accessibility.spec.cjs`. Eigen visual-registratie en referenties
onder `tests/visual/`. Andere demo's blijven bevroren.

## Assets en herkomst

Alle drie bronbeelden zijn voor deze demo gegenereerd met OpenAI image generation;
geen stocklicentie of klantmateriaal gebruikt. Geen echte bedrijfslogo's of leesbare
kentekens. Visueel beoordeeld, bijgesneden en als WebP kwaliteit 82 opgeslagen;
geen PNG-bronbestanden in de website. AI-fotografie is expliciet in de pagina benoemd.

| Bestand | Afmeting | Bytes | Gebruik |
|---|---|---:|---|
| hero-1600.webp | 1600×900 | 111090 | Desktophero |
| hero-800.webp | 800×450 | 37234 | Mobiele hero / gallery |
| craft-1000.webp | 1000×750 | 81594 | PPF editorial |
| craft-600.webp | 600×450 | 37498 | Mobiele PPF |
| panel-1200.webp | 1200×800 | 104416 | Glansvergelijking |
| panel-600.webp | 600×400 | 31354 | Mobiele vergelijking / gallery |
| favicon.svg | vector | — | Eigen geometrisch A-teken |

Totaal WebP: 403186 bytes. Responsive selectie; hero heeft hoge fetchprioriteit,
overige beelden zijn lazy met expliciete afmetingen. Geen externe fonts.

### Hero-prompt

Photorealistic premium automotive editorial photograph, wide landscape 16:9. One unbranded graphite metallic premium sport sedan, physically credible proportions and coherent wheels, front three-quarter view pointing left, parked in minimalist dark detailing studio. Entire car visible, low camera, roof at upper-middle, glossy carefully controlled long softbox reflections along hood and shoulder, warm copper glow from narrow light on right, deeply charcoal backdrop and polished dark concrete. Sophisticated, quiet precision rather than racing. Clean negative dark area upper left for a website heading, car occupies lower right 70 percent. No brand badges, no text, no license plate characters, no people, no racing graphics, no smoke, no neon, no watermarks. Commercial studio photography for fictional AVREN paint protection. Natural material and lens detail, not a stylized concept car.

### PPF-prompt

Photorealistic premium automotive craft editorial, landscape 4:3. Close-up of two anatomically accurate hands installing clear paint protection film on graphite metallic car hood, black nitrile gloves, one small pale neutral squeegee, film transparent edge softly lifted with subtle droplets on surface, immaculate detailed car paint. Dark minimal workshop, long soft studio light reflections over sculptural hood, warm white and faint copper accents. No brands, logos, number plates, words, watermark, no busy tools. Authentic tactile careful workmanship, no impossible hands, no mechanical fantasy. Consistent art direction for fictional AVREN premium paint protection studio.

### Lakdetail-prompt

Photorealistic automotive editorial macro, landscape 3:2. Close oblique view of a perfectly clean graphite metallic premium car front fender, hood curve and a small portion of wheel below right. Strong elegant continuous warm white softbox reflection tracing paint curvature, extraordinary smooth reflective clearcoat, dark charcoal detailing studio, restrained copper undertone. No people, no branding, no badges, no readable plates, no text, no watermark. Real coherent vehicle panels and premium material detail, designed as the single base image for an explicitly simulated gloss comparison, not an actual customer before/after claim.

## Grenzen

Geen publieke canonical ingesteld zolang definitieve publicatie-URL niet bevestigd
is. OG-image is lokaal relatief; bij echte publicatie is een absolute deel-URL nodig.
Geen fictief adres, reviews, certificaten, aantallen of LocalBusiness-schema.
Automatische QA bewijst geen volledige WCAG-conformiteit of echte productiesnelheid.
Menselijke designreview volgt vóór een afzonderlijk Git-checkpoint.
