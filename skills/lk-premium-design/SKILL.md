---
name: lk-premium-design
description: Ontwerp en bouw onderscheidende LK-klantfrontends bij een nieuw project of wezenlijke designwijziging. Niet voor kleine fixes, regressiereview of technische eindbeoordeling.
---

# LK premium design

Werk vanuit de LK-repository met `scripts/qa-projects.json`. Los bij een lokale
skill-symlink eerst het echte skillpad op; de repositoryroot ligt twee niveaus
boven deze map. Gebruik de [Standard](../../LK-DEVELOPMENT-STANDARD.md) voor
impact, algemene developmentprincipes en officiële skill-routing.

## Beslissingen en workflow

- Lees alleen de projectentry, brief, relevante merkafspraken en betrokken bron.
  Verhelder alleen ontbrekende keuzes die het ontwerp wezenlijk veranderen:
  doelgroep, hoofdtaak, conversiedoel, aanbod en beschikbaar beeld/bewijs.
- Formuleer een eigen art direction met concrete keuzes voor compositie,
  typografisch contrast, spacingritme, kleur en beeld. Verbind ze aan deze klant.
  Herbruik techniek, nooit automatisch de visuele identiteit van een andere demo.
- Orden informatie rond bezoekersvragen en beslismomenten. Bepaal primaire versus
  secundaire CTA's, scanbare content en geloofwaardig vertrouwen zonder fictieve
  claims. Geen verplichte hero, sectievolgorde, sectietelling of designstijl.
- Ontwerp mobiel eerst, beschrijf hoe hiërarchie, crops en layout op bredere schermen
  veranderen. Leg benodigde empty/error/success/focus-states vast. Motion en
  micro-interactions moeten een functie hebben en reduced motion respecteren.
- Implementeer binnen de geautoriseerde scope en bestaande stack. Gebruik bestaande
  projecttokens/componenten waar ze passen; creëer geen universeel LK-demothema.
- Kies QA op impact via de Standard en [foundation](../../scripts/QA-FOUNDATION.md).
  Deze skill start geen volledige gate. Figma alleen bij concrete Figma-context;
  referentiecode is geen toestemming voor React/Tailwind of frameworkmigratie.

## Output en grens

Lever een kort ontwerpbesluit met klantreden, geraakte componenten/states,
responsive gedrag en passende verificatie. Benoem aannames en wat owner-review
vraagt. Een bouwtaak wordt geen ongevraagde redesignreview van andere sites.
Geen baselineacceptatie, Git-checkpoint of publicatie als impliciete vervolgstap.
