# LK intelligence layer — validatie

Scope: vijf instruction-only skills bovenop foundationcommit
`5f2acb31bb21080958d1c9514b4191b18d9d3656`. Geen nieuwe QA-engine,
websitewijziging, dependency of baseline. Deze evaluatie verklaart de intelligence
layer coherent; zij is geen nieuwe finale goedkeuring van een website.

## Structurele controle

- Vijf SKILL.md-bestanden: officiële Skill Creator `quick_validate.py` geslaagd.
- De geïnstalleerde Python-runtimes missen PyYAML. Geen dependency geïnstalleerd:
  de ongewijzigde officiële validator is uitgevoerd met een tijdelijke `safe_load`
  adapter naar de reeds aanwezige Node `js-yaml`-parser. Geen validatieregels overgeslagen.
- UI-metadata via officiële generator, met expliciete naam; implicit invocation blijft
  standaard ingeschakeld. Alle skill-links en vijf lokale discovery-symlinks geverifieerd.
- Skillomvang: 250–309 woorden per SKILL.md. Geen extra references of runners nodig.
- Vier gedocumenteerde plannen via bestaande `parse`/`plan` gecontroleerd; geen job
  uitgevoerd. Bevroren Kelmora-uitvoering door bestaande guard geweigerd vóór uitvoering.
- Maintained bron: `skills/lk-*/`; lokale symlinks: `~/.codex/skills/lk-*`.
  Geen globale Codex-config gewijzigd. Automatische selectie in een verse Codex-taak
  is niet als aparte modelproef gemeten; expliciet lezen en lokale discoverypaden wel.
  Heropen Codex alleen als een nieuwe skill niet verschijnt. Geen dubbele bronkopieën.

Discovery en impliciete selectie volgen de [officiële skill-documentatie](https://learn.chatgpt.com/docs/build-skills).
Lokale user-locatie volgt de geïnstalleerde Skill Creator en bestaande officiële skills;
symlinks worden ondersteund. Op een andere machine moeten links opnieuw worden ingericht.

## Taakselectie en grensgevallen

Read-only beslisproeven door de uitvoerende agent, geen onafhankelijke Review Agent
of statistische routing-eval. Onderstaande concrete opdrachten zijn tegen description
én workflow beoordeeld; er zijn geen websites voor aangepast of getest.

| Skill | WEL-proef en waargenomen beslissing | NIET-proef en beslissing | Overlap opgelost |
|---|---|---|---|
| lk-premium-design | “Ontwerp een nieuwe tandartsfrontend voor angstige patiënten.” → doelgroep/vertrouwen, eigen rustige art direction, mobiele afspraakactie; geen gefixeerde hero/secties | “Corrigeer één typo in een knop.” → geen designskill, gewone scoped edit | Contrastprobleem oplossen hoort bij quality; volledige gate wordt niet meegenomen |
| lk-quality-improvement | “Herstel alleen het ontbrekende label en test keyboard in dit afspraakveld.” → element/state, gerichte Axe/focuscontrole; geen Lighthouse | “Geef deze nieuwe klant een unieke visuele identiteit.” → premium-design | Uitvoering van de fix hier; einddekking alleen bij gevraagde gate |
| lk-visual-review | “Beoordeel de bedoelde mobiele kaartverschillen in deze bestaande run, wijzig niets.” → capture werkelijk bekijken, wrapping/spacing vergelijken, intended/regression/uncertain | “Corrigeer canonical en OG-URL.” → quality-improvement | Geen redesign of automatische baselineacceptatie; metadatareview is geen visual-opdracht |
| lk-technical-gate | “Hervat de technische gate en gebruik geldig bewijs.” → registry/dekkingsmatrix, snapshot/artifactcontrole, alleen ontbrekende checks | “Maak alleen deze CTA twee pixels ruimer.” → geen gate; LIGHT op impact | Bewijsorkestratie hier; daadwerkelijke nieuwe visuele beoordeling alleen als subtaak |
| lk-delivery | “Bereid het klantreviewpakket voor, publiceer nog niet.” → technische status, owner-pending, publicatie/integraties en open acties | “Axe is groen, ga verder met bouwen.” → geen deliveryskill | Geen QA-herhaling, geen owner-attestatie verzinnen, geen impliciete publicatie |

Alle vijf verwijzen naar dezelfde Standard/foundation; geen eigen thresholds,
projectsitelijst of runnerkopieën. Geen van de proefuitkomsten gaf toestemming voor
commit/push/deploy of automatische baselineacceptatie. De delivery-proef bleef
OWNER_REVIEW_PENDING; de gate-proef kon niet zelfstandig DELIVERY_APPROVED afgeven.

Extra grensproeven:

- “Update alle referenties zodat de rode visual-test groen wordt.” → geen acceptatie;
  eerst concrete verschillen en expliciete menselijke scope/review volgens bestaande helper.
- “Verifieer Kelmora tijdens deze algemene QA-opdracht.” → freeze respecteren; geen suite.
- “Een check is PASS maar een relevante dialog-state is SKIP.” → geen technische PASS
  totdat dekking is opgelost; helper `assess` alleen is niet voldoende.
- “Gebruik Figma om deze lokale typo te herstellen.” → geen noodzakelijke Figma-read;
  concrete context beoordelen, geen frameworkmigratie. Expliciete gebruikerswens verduidelijken
  als de typo werkelijk in Figma in plaats van de website staat.
- “Bekijk een formulier via Playwright.” → officiële inspectieskill, dezelfde netwerk-
  bescherming en runmap; geen echte submit, stille CLI-installatie of tweede artifactroot.

## Kleine read-only benchmark op bestaand AVREN-bewijs

Taak: beoordeel of `automotive-light-nnO4AA` met mobiele Axe/visual-resultaten op
zichzelf huidige finale gereedheid bewijst. Geen nieuwe runs, fixes of beeldreview.
Primaire selectie: uitsluitend `lk-technical-gate`. De vier andere LK-skills zijn
niet nodig; er wordt geen ontwerp, fix, nieuwe beeldbeoordeling of overdracht gevraagd.

Metingen in `test-results/intelligence/benchmark.json`:

- Contextselectie: compleet oud AGENTS/Standard/foundation/registry-pakket 27.335
  tekens; gericht nieuw pakket met relevante secties, één skill en één projectentry
  11.788 tekens (57% minder). Gemeenschappelijke evidence/helper-inspectie is buiten
  beide pakketten gehouden. Dit meet retrievalomvang, geen gefactureerde tokens of
  bewezen model-/snelheidswinst; de brede baseline is een vergelijkingsscenario.
- 19/19 historische evidence-artifacts intact, gecontroleerd met bestaande helper
  tegen hun oorspronkelijke snapshot. Daarin: 8 mobiele Axe-states, 9 captures en
  2 testcase-records. Bron- en baselinehash passen nog bij de huidige staat.
- 0/19 automatisch herbruikbaar voor de huidige snapshot: configuratiehash wijkt af,
  ook al vóór deze intelligence-edits. Historische context is hergebruikt zonder
  het bewijs als actuele PASS te herlabelen. Hashes/records niet aangepast.
- Nieuwe website-QA: 0; nieuwe screenshots: 0; brede audit: 0; externe acties: 0.
  Meer finale dekking ontbreekt in deze ene run; dat is geen intrekking van eerdere
  menselijke AVREN-goedkeuring en geen bewijs van een website-regressie.

Concrete compacte benchmarkuitkomst:

> Deze AVREN-run bewijst geen huidige technische eindgereedheid. De 19 historische
> bewijsentries zijn intact; websitebron en baselines zijn gelijk, maar de
> configuratiehash wijkt af. Automatisch hergebruik is daarom 0/19. De run dekt
> mobiele Axe en mobile-standard visuals, niet alle geregistreerde checks/viewports.
> Status voor deze bewijsselectie: TECHNICAL_GATE_INCOMPLETE / NOT_READY. Er zijn
> geen tests of screenshots herhaald. Voor een echte hervatting moeten aanvullende
> geldige runs worden gekozen en alleen resterende noodzakelijke checks volgen.
> Bestaande owner-goedkeuring wordt hiermee niet opnieuw beoordeeld.

De compacte uitkomst beantwoordt de vraag zonder de volledige QA-resultaattemplate
uit te schrijven. Er bestaat geen gemeten pre-intelligence modelantwoord op exact
hetzelfde verzoek: kortere/betere modeloutput of tokenbesparing is dus niet causaal
bewezen. De concrete scope, hashreden, aantallen, status en vervolgstap zijn wel
observeerbaar; een eerlijke beperking boven een verzonnen efficiëntiewinst.

## Coherentie, overlap en resterende grenzen

- AGENTS bevat alleen duurzame defaults; actuele freeze/targets leven in de registry.
- Standard bezit niveaus/bewijs/uitzonderingen/status/oplevering en centrale routing.
  Commanddetails zijn verhuisd naar foundation; policydefinities daar zijn vervangen
  door verwijzing naar de Standard. Het resultaattemplate heeft aparte technische,
  menselijke en publicatiestatus; geen ambigu generiek PASS-veld meer.
- Foundationruntime, registry en bestaande regressietests zijn ongewijzigd. De
  machinegate kent geen volledige semantische statecontrole; de technische skill
  moet noodzakelijke skips/warnings expliciet beoordelen. Geen automatische skipfilter
  of hashversoepeling toegevoegd om deze instructielaag groter te maken.
- Review Agent is in deze sessie niet als afzonderlijk aanroepbare agent/skill gevonden.
  De routing controleert beschikbaarheid; geen fictieve onafhankelijke review uitgevoerd.
- Officiële Playwright-skill geeft generiek andere artifactpaden/CLI-downloads aan;
  de expliciete LK-afspraken houden de bestaande runstructuur en installatiegrenzen aan.
- Menselijke beeld-/inhoudsreview, werkelijke productie-integraties en account/hosting-
  toestemmingen blijven menselijk. Een environment-PASS is geen site- of release-PASS.

## Advies

Geschikt om LK Final/masterproject binnen expliciete scope te starten. Gebruik
projectspecifiek brief/art direction en vul ontbrekende flow/dekkingsbewijzen gericht
in; beschouw de huidige LK-site niet automatisch als final of productie-gereed.

Latere engine-kandidaten: project/capability-contract, bewijs/provenance en statusmodel,
netwerk- en baselineguards, scoped QA-adapters en delivery-input. Geen universele
visuele identiteit, vaste hero of sectievolgorde overnemen. Geen engine gebouwd.
