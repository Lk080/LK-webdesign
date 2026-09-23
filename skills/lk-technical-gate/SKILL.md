---
name: lk-technical-gate
description: Orkestreer LK-QA-bewijs bij een mijlpaal, hervatte final gate of technische gereedheidsvraag. Niet voor elke kleine edit, designcreatie of menselijke oplevergoedkeuring.
---

# LK technische gate

Werk in de LK-root twee niveaus boven het opgeloste skillpad. De
[Standard](../../LK-DEVELOPMENT-STANDARD.md) bezit kwaliteits- en bewijsbeleid;
[foundation](../../scripts/QA-FOUNDATION.md) beschrijft de bestaande API/commands.
Deze skill voegt geen runner, eigen PASS-schema of tweede bewijsindex toe.

## Workflow

1. Bepaal project, mijlpaal, finale bronstaat en scope/freeze uit `qa-projects.json`.
   Lees alleen gekozen `record.json`/`evidence.json` en benodigde artifacts.
2. Maak een dekkingsmatrix vanuit `qa.required`, `requiredViewports`, capabilities
   en werkelijke teststates: relevant → geldig bewijs → ontbrekend/geraakt.
   Beschouw functioneel, Axe/handmatige a11y, responsive, visuals, runtime/console,
   lokale links/assets, static/lint, performance, SEO/publicatiefase en relevante
   privacy/security. Een enkele PASS per check bewijst niet alle gebruikersflows.
3. Vergelijk huidige `qa-state.snapshot` met bewijs en controleer artifact-hashes
   via `qa-evidence.reuseEvidence`. Gebruik `assess` voor geregistreerde dekking.
   `--compare` is slechts een voorselectie; nooit voldoende voor artifactvalidatie.
   Volg de Standard bij hashverschil; schrijf oude metadata niet om. Controleer
   expliciet warnings, skips, incomplete dekking en niet-gehashte omgevingswijzigingen.
4. Plan alleen ontbrekende/geraakte checks met bestaande light/medium-commands;
   final-plan beschrijft de totale eis maar hoeft niet opnieuw als suite te draaien.
   Voeg werkelijk ontbrekende testdekking alleen binnen geautoriseerde scope toe.
   Een bevroren project heropen je niet om een gate af te vinken.
5. Combineer geldig bewijs in de beoordeling; behoud provenance. Een machine-
   `TECHNICAL_GATE_PASS` is een kandidaat totdat relevante states/skips, handmatige
   technische checks en beperkingen zijn beoordeeld. Onverklaarde noodzakelijke
   skips of fouten blokkeren PASS. Warnings nooit verbergen.
6. Gebruik onafhankelijke Review Agent alleen bij concrete extra waarde en als hij
   werkelijk beschikbaar is volgens de Standard. Een agentreview is geen owner-review.

## Output en grens

Gebruik [QA-resultaattemplate](../../tests/QA-RESULT-TEMPLATE.md) compact: uitgevoerde
versus hergebruikte checks met paden, dekking/gaten, warnings, conclusie en retests.
Geef TECHNICAL_GATE_PASS uitsluitend bij voldoende bewijs; anders INCOMPLETE/FAIL
met concrete blockers. DELIVERY_APPROVED blijft uitsluitend aan de eigenaar.
Geen automatische baselineacceptatie, commit/push/deploy of ongevraagde extra polish.
