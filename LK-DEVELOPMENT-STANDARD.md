# LK Development Standard V2

**Maximale eindkwaliteit, minimaal onnodig testverbruik.** Test op wijzigingsimpact.
Workflow: scope/impact → implementatie → gerichte LIGHT; MEDIUM bij een mijlpaal;
FULL FINAL is volledige relevante dekking vóór oplevering, geen opdracht om geldig
bewijs opnieuw te produceren. De technische gate en owner-goedkeuring zijn apart.

## Eén eigenaar per soort informatie

| Bron | Eigenaar van |
|---|---|
| [AGENTS.md](AGENTS.md) | Korte, vrijwel altijd geldende werk- en veiligheidsregels |
| Deze Standard | Kwaliteitsniveaus, impact, bewijs, uitzonderingen, delivery en skill-routing |
| [Projectregistratie](scripts/qa-projects.json) | Projectidentiteit, scope, freeze, publicatiefase, capabilities, adapters, targets/budgetten en vereiste dekking |
| [Foundation](scripts/QA-FOUNDATION.md) | Technische API/commandcontracten, artifacts, netwerkguards en acceptatiemechaniek |
| [QA-resultaattemplate](tests/QA-RESULT-TEMPLATE.md) | Rapportvorm; geen eigen kwaliteitsbeleid |
| `skills/lk-*/SKILL.md` | Taakspecifieke beslissingen; geen gekopieerde runners/checklists |

Lees per taak alleen de benodigde bron/sectie. Bij tegenspraak: benoem het concrete
conflict en volg geen verouderde kopie. De registry is de enige eigenaar van actuele
freeze-status en projectwaarden. Frozen werk niet aanpassen/hertesten zonder expliciete
heropening; guards niet omzeilen. Historisch bewijs mag read-only worden geraadpleegd.

## Algemene developmentprincipes

Een nieuwe klantfrontend begint bij doelgroep, aanbod en primaire bezoekersactie.
Kies eigen art direction, scanbare informatiehiërarchie, typografie/spacing en
beeldcompositie; techniek mag herbruikbaar zijn, merkidentiteit niet. Geen verplichte
hero, sectietelling, layout of esthetiek. Werk mobile-first met bewust responsive
transformaties en passende interactiestates. Gebruik echte, geautoriseerde claims
of duidelijk gemarkeerde demo-inhoud; geen verzonnen reviews, adressen of klantresultaten.

Neem semantiek, keyboard/focus, contrast, beeldgewicht, loading, SEO en privacy mee
waar de wijziging raakt. Behoud bestaande stack/componentconventies en documenteer
materiële tradeoffs. Nieuwe dependencies/frameworks alleen wanneer nodig én toegestaan.

## Skill-routing: selecteer, laad niet alles

| Taak | Primaire skill | Grens |
|---|---|---|
| Nieuwe klantfrontend / wezenlijke designwijziging | [lk-premium-design](skills/lk-premium-design/SKILL.md) | Art direction en implementatie; geen volledige gate |
| Concrete a11y-, SEO- of performanceverbetering | [lk-quality-improvement](skills/lk-quality-improvement/SKILL.md) | Gericht meten/fixen; geen brede audit standaard |
| Layout/responsive review of visuele regressie | [lk-visual-review](skills/lk-visual-review/SKILL.md) | Beoordeling; geen stilzwijgende fix/acceptatie |
| Mijlpaal / finale technische bewijsbeoordeling | [lk-technical-gate](skills/lk-technical-gate/SKILL.md) | Dekking en technische status; geen owner-goedkeuring |
| Echte klantreview/publicatievoorbereiding/overdracht | [lk-delivery](skills/lk-delivery/SKILL.md) | Reviewpakket en voorwaarden; geen deployment |

Geen LK-skill nodig voor bijvoorbeeld een losse typofix, Git-checkpoint of algemene
vraag. Bij overlap kiest het gevraagde resultaat de primaire skill. Laad een tweede
alleen voor een concrete subtaak, met overdracht van project/state, beslissing,
bronhash, bewijs en open punt; geen herlezing/recapture van reeds geldige context.

De onderhouden skills staan in `skills/`; lokale discovery gebruikt symlinks in
`~/.codex/skills`, zodat er één bronkopie is. Controleer dat links naar deze checkout
wijzen. Op een andere machine moeten deze links expliciet worden ingericht; er is
geen automatische installer. Bij ontbrekende discovery kan de exacte SKILL.md
rechtstreeks worden gelezen; claim geen runtime-activatie zonder dat dit is vastgesteld.

Officiële integraties zijn optioneel en worden alleen bij concrete nood gebruikt:

- **playwright**: gerichte browserinspectie/debugging; bestaande `@playwright/test`
  suites blijven regressietests bezitten. Lees de officiële skill bij gebruik.
  De lokale LK-opdracht overschrijft diens generieke `output/playwright/`-advies:
  gebruik uitsluitend een nieuwe scoped run via `qa-run.createRun(project, 'inspection')`
  en een gereserveerde checkmap via `reserve`, met metadata en fictieve data.
  Bestaande run-artifacts nooit overschrijven. Inspectie is geen automatische
  regressie-PASS. Controleer CLI-beschikbaarheid zonder download; `npx --package`
  mag niet stilzwijgend tooling installeren. Indien afwezig: bestaande repository-
  browsertooling of een concrete blocker, geen tweede framework. Guards uit
  `qa-network.cjs` gelden ook bij inspectie; zonder equivalent geen externe navigatie
  of formulieractie. Bij ontbreken van veilige context alleen reeds bestaand bewijs lezen.
- **figma**, **figma-implement-design**, **figma-create-design-system-rules**:
  alleen concrete Figma-file/node/designcontext of expliciet gevraagde systeemregels.
  Lees de relevante geïnstalleerde skill; eventuele MCP-toolprerequisites blijven
  gelden. Deel reeds opgehaalde context/screenshots/versie tussen taken. Figma-code
  rechtvaardigt geen ongevraagde React/Tailwind- of frameworkmigratie.
- **security-best-practices**: bij gevraagde securityreview/secure implementation
  of concrete securitycontext binnen zijn ondersteunde talen; niet bij iedere CSS-fix.
  Algemene privacy/side-effectregels blijven ook zonder die skill van kracht.
- **Review Agent**: onafhankelijke review bij risicovolle gedeelde logica, nieuwe
  flows of een belangrijke mijlpaal met concrete reviewvraag. Gebruik de bestaande
  beschikbare reviewer; geen nieuw agentframework. Geef bounded diff/context en
  vraag bevindingen met impact/bewijs, geen QA-herhaling of writes. Controleer
  beschikbaarheid en delegatietoestemming; als de agent niet toegankelijk is,
  vermeld dat en bied een expliciete menselijke code-reviewvraag. Zelfreview nooit
  als onafhankelijk labelen. Review Agent verleent geen owner-goedkeuring.

## Drie niveaus

| Niveau | Wanneer | Controles | Geen standaardonderdeel |
|---|---|---|---|
| LIGHT | Lokale copy, CSS, JS of a11y-fix | Gewijzigde component/state en relevante viewport; functionele test/console of Axe indien geraakt | Alle suites/breakpoints, Lighthouse, volledige screenshots |
| MEDIUM | Grote sectie, samenhangende wijzigingen, interactieve/responsive mijlpaal | Mobiel + desktop; tablet indien relevant; geraakte flows, Axe, links, console en gerichte visuals | Projectbrede suite, alle baselines, Lighthouse zonder performance-aanleiding |
| FULL FINAL | Werkelijk gereed voor goedkeuring/oplevering | Bewijs voor alle relevante flows/states, Axe, keyboard/focus, responsive, visuals, static/links, Lighthouse beide modes, performance/SEO; aparte owner-review | Geen besparing op noodzakelijke dekking |

Een groene commandoregel is geen volledige kwaliteitsverklaring. Vooral bestaande
LK-functionele tests zijn smoke-dekking, geen bewijs van alle formulier-, project-
en assistantstates. Ontbrekende projectflows moeten gericht worden toegevoegd of
handmatig met bewijs worden getest vóór TECHNICAL_GATE_PASS. Historische bevindingen blijven als zodanig zichtbaar totdat nieuw passend bewijs ze sluit;
claim hun actuele status niet zonder verificatie.

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

## Uitvoering

Kies niveau/check/viewport op bovenstaande impactmatrix. Commandvoorbeelden,
filters, directe ingangen, rapportage en artifactregels staan uitsluitend in de
[foundation](scripts/QA-FOUNDATION.md#uitvoering-en-output). Bekijk eerst een plan.
Een plan of discovery is geen PASS. FINAL beschrijft volledige dekking; gebruik
LIGHT/MEDIUM voor de ontbrekende subset als de rest aantoonbaar geldig is.

## PASS-hergebruik: bewijs, geen aanname

Bewaar scope, tijd, commit én hash van de ongecommitte bronstaat, testconfig/deps,
browser/OS, uitkomst, bewijsbestanden, handmatige review en retest-triggers.
De runner schrijft de machinevelden automatisch; handmatige reviews en omgevingsaannames vereisen aanvullende vastlegging. Een exitcode nul heet bewust
`CHECKS_COMPLETED`, niet TECHNICAL_GATE_PASS. Lighthouse-targets worden machineleesbaar beoordeeld; lees ook de diagnostiek. Een onderbroken run blijft RUNNING en is niet herbruikbaar.

```sh
npm run qa:light -- --site lk --check html --compare test-results/qa-runs/<run>/record.json
```

Metadata-overeenkomst via `--compare` is alleen een kandidaat voor hergebruik,
geen artifact- of statevalidatie. Controleer originele artifacts met
`qa-evidence.reuseEvidence`; `assess` beoordeelt geregistreerde dekking. Vereist:

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

Bij hashverschil kan de huidige helper geen bewijs hergebruiken, ook niet bij een
uitsluitend documentatiewijziging. Benoem welke dimensie afwijkt. Historisch bewijs
mag context geven maar wordt geen nieuwe machine-PASS. Pas geen hashes aan om de
controle te omzeilen. Een docs/skill-only taak rechtvaardigt geen zware website-QA
alleen om die conservatieve hash weer groen te maken. Bij een latere echte sitegate
zijn passende actuele bewijzen of een expliciet begrensde uitzondering nodig.

Uitzondering: leg check, reden, risico, ontbrekende dekking, eigenaar en vervalmoment
vast. Ze verandert FAIL/SKIP/INCOMPLETE niet in PASS en verzwakt geen guard. Een
noodzakelijke onopgeloste fout/skip blokkeert TECHNICAL_GATE_PASS; een geaccepteerd
restrisico blijft zichtbaar in delivery. Neem publicatiefase mee zonder onbevestigde
gegevens als feiten in te vullen.

Bij FULL FINAL moet iedere relevante controle aantoonbaar passen bij de finale
bronstaat. Geldige eerdere finale bewijzen mogen blijven staan bij hervatting als
niets relevants veranderde; onbekende/ontbrekende/ongeldige controles uitvoeren.
Gebruik [het resultaattemplate](tests/QA-RESULT-TEMPLATE.md).

## Visuals, Lighthouse, Figma en browserkosten

Baselines zijn goedgekeurde referenties, geen manier om fouten weg te werken.
Bij verschil: oorzaak → review → intended/regression/uncertain. Alleen expliciet
geautoriseerde, beoordeelde captures mogen via de bestaande helper worden geaccepteerd,
gevolgd door vergelijking zonder update. Het technische reviewformaat staat in de
[foundation](scripts/QA-FOUNDATION.md#referentieacceptatie). Geen automatische acceptatie.
Een regressiereferentie verklaart op zichzelf geen finale websitekwaliteit.

Lighthouse: niet bij gewone LIGHT; MEDIUM alleen bij een performance-mijlpaal;
FULL FINAL desktop én mobiel. Lokale scores zijn diagnostiek, geen productiegarantie.
Projecttargets staan uitsluitend in de registratie. Een afwijking vraagt
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

## Status en oplevering

- `CHECKS_COMPLETED`: gekozen checks uitgevoerd; geen claim over volledige dekking.
- `TECHNICAL_GATE_PASS`: actuele relevante technische dekking is compleet en zonder
  blokkerende fouten. De machine beoordeelt check/viewports; de reviewer controleert
  ook daadwerkelijke states, noodzakelijke skips, warnings en handmatige technische
  controle. `assess` alleen bewijst die semantische volledigheid niet.
- `OWNER_REVIEW_PENDING`: technische gate voldoende; menselijke visuele/inhoudelijke
  goedkeuring ontbreekt. Ook een onafhankelijke agentreview is geen owner-review.
- `DELIVERY_APPROVED`: uitsluitend expliciete owner-goedkeuring voor exact die staat,
  met reviewer, tijd, scope/snapshot en bewijs. De technische attestatie-API staat in
  de foundation; een AI mag nooit zelfstandig de menselijke attestatie invullen.

Voor echte klantreview/publicatie/overdracht: bundel bestaande gatebewijzen,
owner-besluit, bevestigde publicatiegegevens en open risico's. Controleer relevante
integraties versus mocks, hosting/domein, privacy, assetrechten en claims; benoem
verantwoordelijkheden en rollback/herstel. Geen QA-herhaling zonder nieuw impactsignaal.
Portfolio-demo-goedkeuring is geen productie-integratie- of deploymentbewijs.
Publicatie, commit en push zijn afzonderlijke expliciete acties, geen gevolg van PASS.
Stop na de afgesproken scope; extra polish is een nieuwe opdracht.
