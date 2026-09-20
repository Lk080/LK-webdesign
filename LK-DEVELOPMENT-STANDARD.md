# LK Development Standard V2

**Maximale eindkwaliteit, minimaal onnodig testverbruik.** Test op wijzigingsimpact.
Workflow: inspecteren → risico bepalen → implementeren → LIGHT → verder werken.
Na een mijlpaal: MEDIUM. Vóór portfolio-/productie-/klantoplevering: FULL FINAL.
Pas na een bewezen finale PASS volgt een afzonderlijk geautoriseerd Git-checkpoint.
Na PASS stoppen; geen extra experimenten zonder nieuwe opdracht.

Kelmora is bevroren op `4c8674f629e4c4e78dd4571bba6b4fbd0609fb9a`.
Wijzig of hertest Kelmora niet zonder nieuwe opdracht. De V2-runner weigert
`--run --site kelmora`; plannen/discovery kunnen wel. Geen wijziging aan de
onderliggende kwaliteitsregels. Beauty/Automotive worden pas geregistreerd
wanneer ze bestaan en krijgen een eigen identiteit, geen Kelmora-kopie.

## Drie niveaus

| Niveau | Wanneer | Controles | Geen standaardonderdeel |
|---|---|---|---|
| LIGHT | Lokale copy, CSS, JS of a11y-fix | Gewijzigde component/state en relevante viewport; functionele test/console of Axe indien geraakt | Alle suites/breakpoints, Lighthouse, volledige screenshots |
| MEDIUM | Grote sectie, samenhangende wijzigingen, interactieve/responsive mijlpaal | Mobiel + desktop; tablet indien relevant; geraakte flows, Axe, links, console en gerichte visuals | Projectbrede suite, alle baselines, Lighthouse zonder performance-aanleiding |
| FULL FINAL | Werkelijk gereed voor goedkeuring/oplevering | Alle relevante flows en states, Axe, keyboard/focus, responsive, visuals, static/links, Lighthouse desktop+mobiel, performance/SEO en menselijke review | Geen besparing op noodzakelijke dekking |

Een groene commandoregel is geen volledige kwaliteitsverklaring. Vooral bestaande
LK-functionele tests zijn smoke-dekking, geen bewijs van alle formulier-, project-
en assistantstates. Ontbrekende projectflows moeten gericht worden toegevoegd of
handmatig met bewijs worden getest vóór FINAL PASS. De bestaande LK-Axe-bevindingen
blijven zichtbaar en zijn in deze opdracht niet opgelost.

## Change-impact matrix

| Wijziging | Minimale passende controle | Opschalen wanneer |
|---|---|---|
| Copy only | Betrokken layout/accessible name, tekstafbreking op relevante viewport | Koppen/navigatie/veel vertalingen geraakt |
| CSS-component | Component, relevante breakpoints, visuele vergelijking | Gedeelde selectors/cascade geraakt |
| Global CSS/tokens | Brede responsive/visual-controle + contrast/Axe | Meerdere sites dezelfde stylesheet gebruiken |
| JS-component | Volledige geraakte flow, fouten/console, keyboard waar relevant | Gedeelde state/events geraakt |
| Global JS | Brede functionele regressie + console | Formulieren/navigatie/widgets beïnvloed |
| Form/wizard | Volledige flow, terug/reset, validatie, fout/succes, keyboard/focus, Axe | Gedeelde state/gegevensoverdracht |
| A11y-fix | Geraakte Axe-scan, keyboard/focus en semantiek | Globale kleuren/landmarks veranderd |
| Afbeelding | Visueel, afmetingen/aspectratio/lazy loading; bytes/LCP indien relevant | Hero/LCP of grote payload gewijzigd |
| SEO/metadata | HTML/metadata, URL/taal/canonical/OG handmatig verifiëren | Navigatie/crawlbaarheid beïnvloed |
| Build/config/dependency | Discovery + relevante smoke/regressie | Browser/fonts/regels of uitvoering veranderd |

Een HTML-lint is geen volledige SEO- of toegankelijkheidscontrole. Houd CSS-warnings,
Axe moderate/minor en onvolledige checks zichtbaar. Serious/critical blijven fouten.
Onzeker bereik? Kies één niveau breder; benoem waarom, niet automatisch alles draaien.

## Praktische commando's

Alle nieuwe commando's tonen **standaard alleen een plan**. `--run` voert het uit.
`--list` laat Playwright testdiscovery zien zonder server/browser; dat is geen PASS.
Geen automatische installaties, baseline-updates, commits, push of Figma-calls.

```sh
# Eén bestaande mobiele smoke-test, inclusief console/netwerkbescherming
npm run qa:light -- --site lk --check smoke --project mobile --run
# Alleen de bestaande navigatietest op desktop
npm run qa:light -- --site lk --check functional --grep hoofdnavigatie --project desktop --run
# Gerichte accessibility: bestaande sitepagina, één viewport
npm run qa:light -- --site lk --check axe --project mobile --run
# Lint alleen LK, zonder demo's
npm run qa:light -- --site lk --check html --run
# Mijlpaalplan: LK functional + Axe + visual mobiel/desktop + lokale links
npm run qa:medium -- --site lk
# Alleen de relevante visuele tabletcontrole
npm run qa:medium -- --site lk --check visual --project tablet --run
# Alle bestaande relevante geautomatiseerde controles; menselijke finale review volgt
npm run qa:final -- --site lk
# Zonder uitvoering nagaan welke tests gekozen worden
npm run qa:final -- --site lk --list
```

`--check`: smoke, functional, axe, visual, html, css, js, links, static, lighthouse.
LIGHT vereist een expliciete check; browserchecks vereisen een viewport.
MEDIUM is te versmallen op impact. FINAL accepteert geen check/project/grep-filter.
`--grep` is een regex voor functionele testnamen, gecombineerd met de sitefilter.
Geen passende tests is een fout, nooit PASS. Tablet bestaat momenteel alleen in
de visual-config; functionele responsive dekking is projectspecifiek.

De bestaande visual-test is één test per site/viewport, met meerdere screenshots.
Een LIGHT `visual` controleert dus de hele referentieset van **één viewport**.
Voor één component is een gerichte browserinspectie/screenshot goedkoper; er is
bewust geen nieuwe screenshot-app of tweede baseline-infrastructuur gebouwd.

Bestaande npm-commando's blijven beschikbaar voor specialistisch gebruik. `npm test`
is breed en kan `test-results` opruimen. Gebruik V2 voor geïsoleerde rapportmappen:
`test-results/qa-runs/<site-level-id>/record.json`, per-check JSON/artifacts.
Lighthouse houdt zijn bestaande unieke timestampmap. V2 wijzigt geen baselines.
`qa-static.cjs <mode> [lk|kelmora]` ondersteunt nu sitescope; zonder site blijft het
oude gedrag behouden. Scope-lint raakt geen andere demo's; linkcrawl slaat URLs
buiten de gekozen site over. Overgeslagen links zijn geen bereikbaarheid-PASS.

## PASS-hergebruik: bewijs, geen aanname

Bewaar scope, tijd, commit én hash van de ongecommitte bronstaat, testconfig/deps,
browser/OS, uitkomst, bewijsbestanden, handmatige review en retest-triggers.
De runner schrijft dit automatisch voor zijn runs. Een exitcode nul heet bewust
`CHECKS_COMPLETED`, niet FINAL PASS. Lighthouse-exitcode bewijst geen scoretargets;
lees rapporten. Een onderbroken run blijft RUNNING en is niet herbruikbaar.

```sh
npm run qa:light -- --site lk --check html --compare test-results/qa-runs/<run>/record.json
```

Metadata-overeenkomst is alleen een kandidaat voor hergebruik. Vereist:

1. Relevante broncode ongewijzigd.
2. Relevante dependencies, tests, configuratie en baselines ongewijzigd.
3. Geen relevante omgevingwijziging (ook systeemfonts, browserflags, netwerk of hosting).
4. Geen nieuw regressiesignaal; eerdere warnings/incomplete checks blijven bekend.

De hash is conservatief: alle sitebestanden plus gedeelde tests/scripts/configs en
lockfile. Ook een ongerelateerde testwijziging kan hem ongeldig maken. Er is geen
automatische testskip of ingewikkelde dependencygraph. Systeemfonts/netwerk en
handmatig gewijzigde node_modules zijn niet volledig gehashd: beoordeel dit zelf.
Geen records aanpassen om PASS te fabriceren. Historische Kelmora-PASS blijft
historisch bewijs; de V2-wrapper voert die suite niet opnieuw uit.

Bij FULL FINAL moet iedere relevante controle aantoonbaar passen bij de finale
bronstaat. Geldige eerdere finale bewijzen mogen blijven staan bij hervatting als
niets relevants veranderde; onbekende/ontbrekende/ongeldige controles uitvoeren.
Gebruik [het resultaattemplate](tests/QA-RESULT-TEMPLATE.md).

## Visuals, Lighthouse, Figma en browserkosten

Baselines zijn goedgekeurde referenties, geen manier om fouten weg te werken.
Bij verschil: oorzaak → visuele review → intended/regression → alleen bedoelde
betrokken referentie bijwerken → normale vergelijking **zonder update**. Houd
oude referenties beschikbaar totdat review klaar is. Nooit een brede update als
reactie op falende tests. Het legacy `qa:visual:update` vernieuwt breed en hoort
niet in deze V2-workflow. Gebruik zo nodig een expliciet gefilterde bestaande
Playwright-aanroep; ook `--update-snapshots=changed` keurt een verschil niet goed.
Kelmora-referenties blijven bevroren. LK-referenties zijn visuele regressiereferenties,
geen verklaring dat LK al dezelfde finale kwaliteitsstatus heeft.

Lighthouse: niet bij gewone LIGHT; MEDIUM alleen bij een performance-mijlpaal;
FULL FINAL desktop én mobiel. Lokale scores zijn diagnostiek, geen productiegarantie.
Targets: performance 90, accessibility/best practices/SEO 95. Een afwijking vraagt
inhoudelijke beoordeling, geen scoregaming. Echte UX gaat voor enkele scorepunten.

Figma alleen voor een concrete designbeslissing/context/component die lokaal niet
beschikbaar is. Geen standaard Figma-reads tijdens browser-QA. Hergebruik een open
browser en bestaande geldige beelden. Leg alleen viewport/state/component vast die
nieuwe informatie levert. Formspree blijft altijd gemockt/geblokkeerd; nooit echte
inzendingen via QA. Testgegevens zijn fictief.

## Final Quality Gate: menselijke afsluiting verplicht

- Alle belangrijke flows, formulieren/wizards, dialogs en widgets, inclusief fouten/reset.
- Mobiel/tablet/desktop; passende breedtes (referentie 320/360/390/430/768/1024/1280/1440),
  overflow, touch targets, tekstafbreking, beelden en bedienbare CTA's.
- Axe zonder critical/serious; overige bevindingen beoordeeld; semantiek/alt-betekenis,
  keyboard, zichtbare focus, focusvolgorde en reduced motion waar relevant.
- Visuele vergelijking en rustige volledige scrollreview op minstens 390/1440.
- Console, lokale links/assets, static QA, beeldgewicht, Lighthouse beide modes,
  SEO/metadata en eerlijke claims/disclaimers.
- Diff/status en bestaande lokale wijzigingen gecontroleerd; resterende beperkingen
  (zoals niet geteste screenreaders/browsers) expliciet vermeld.

Alleen werkelijke dekking met bewijs mag tot `FINAL QUALITY GATE: PASS` leiden.
Daarna STOP. Commit/push uitsluitend op afzonderlijke toestemming.
