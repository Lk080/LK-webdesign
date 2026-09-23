---
name: lk-delivery
description: Bereid echte LK-klantreview, publicatie of overdracht voor op basis van bestaand technisch bewijs en owner-review. Niet na elke PASS, tijdens bouwen of als deploymentautorisatie.
---

# LK oplevering

Gebruik de LK-root twee niveaus boven het opgeloste skillpad. Raadpleeg de
opleverregels in de [Standard](../../LK-DEVELOPMENT-STANDARD.md) en de betrokken
projectentry; [foundation](../../scripts/QA-FOUNDATION.md) beschrijft attestatie
zonder daarmee toestemming te verlenen.

## Workflow

1. Bevestig het concrete doel: reviewpakket, productievoorbereiding of overdracht.
   Gebruik het bestaande technische gateverslag en exacte snapshot. Herhaal geen
   QA; ontbrekend/ongeldig bewijs gaat als specifieke blocker terug naar de gate.
2. Scheid technische gereedheid, owner-review en publicatiestatus. Citeer expliciet
   goedkeuringsbewijs met reviewer, tijd, scope en snapshot. Zonder echte menselijke
   toestemming blijft OWNER_REVIEW_PENDING; vul zelf geen menselijke attestatie in.
3. Controleer alleen relevante delivery-input: bevestigd domein/hosting/canonical,
   echte integraties versus demo/mocks, privacy/toestemming, assetrechten, feitelijke
   claims/contactgegevens, overdrachtsinstructies, open risico's en herstel/rollback.
   Een portfolio-demo is geen bewijs dat productie-integraties werken.
4. Leg vast wie ontbrekende gegevens of acceptaties aanlevert. Deel geen credentials
   in rapporten of Git. Valideer integraties zonder echte writes; een echte inzending
   of publicatie vergt afzonderlijke expliciete toestemming.
5. Maak het review/overdrachtspakket passend bij de ontvanger, met bestaande bewijs-
   links en concrete open acties. Geef geen nieuwe designopdracht of Website Engine.

## Output en grens

Doel + technische status + owner-status + publicatiefase, gevolgd door ontbrekende
gegevens/risico's met eigenaar en noodzakelijke vervolgstap. DELIVERY_APPROVED kan
alleen bestaande of nu expliciet gegeven menselijke goedkeuring van deze staat
weergeven; deze skill verleent haar niet. Commit/push/deployment en baselineacceptatie
blijven afzonderlijk geautoriseerde acties, ook na goedkeuring.
