---
name: lk-quality-improvement
description: Verbeter gericht accessibility, SEO of performance van een LK-site met bestaande QA. Niet voor art direction, uitsluitend visuele review of een volledige technische gate.
---

# LK gerichte kwaliteitsverbetering

Gebruik de LK-repositoryroot (twee niveaus boven het opgeloste skillpad), de
betrokken entry in `scripts/qa-projects.json` en de impact/bewijsregels van de
[Standard](../../LK-DEVELOPMENT-STANDARD.md). Bij een audit-only opdracht: geen fixes.

## Workflow

1. Kies de concrete klacht/metric, component, state en publicatiefase. Lees bestaand
   bewijs voordat je meet. Benoem verwachte gebruikerswinst en minimale retest.
2. Gebruik alleen de relevante controles uit de [foundation](../../scripts/QA-FOUNDATION.md):
   - Accessibility: Axe/WCAG, semantische HTML, toegankelijke namen, keyboard/focus,
     contrast ook op fotografie. Automatische PASS bewijst geen screenreader-UX.
   - SEO: metadata, taal/canonical/OG, structured data en waar passend lokale SEO.
     Controleer echte bedrijfs/publicatiegegevens; verzin geen adres, reviews of URL.
   - Performance: assets/fonts/loading, responsive resources, CWV/Lighthouse en
     console/netwerk. Onderscheid meetfout, technische fout en optimalisatiekans.
     Lokale labwaarden zijn geen productie-CWV.
3. Herstel alleen bewezen problemen binnen scope; behoud merk/UX. Start Lighthouse
   alleen als deze wijziging dat volgens de Standard rechtvaardigt. Geen brede
   audit bij een label-, copy- of componentfix en geen scoregaming.
4. Verifieer geraakte checks/states; citeer bestaande geldige restdekking. Toon
   moderate/minor, warnings, incomplete checks en benodigde handmatige controle.

Voor browserdebugging, Figma of security geldt de officiële skill-routing in de
Standard. Een contrastfix activeert niet vanzelf security-best-practices of alle
andere LK-skills. Regressiebeoordeling hoort bij visuele review; mijlpaalsynthese
bij de technische gate, alleen wanneer gevraagd/nodig.

## Output en grens

Probleem → oorzaak/element → gerichte wijziging → bewijs/retest → resterende
beperking. Noem project, state/viewport, severity en rapportpad waar beschikbaar.
Geen menselijke goedkeuring, baselineacceptatie, commit/push/deploy namens de gebruiker.
