---
name: lk-visual-review
description: Beoordeel LK-layouts, responsive gedrag en screenshotverschillen op visuele regressies. Niet voor nieuwe art direction, alleen SEO/performance of automatische baselineacceptatie.
---

# LK visuele review

Gebruik de LK-root twee niveaus boven het opgeloste skillpad. Lees de projectentry,
relevante impact/visual-regels uit de [Standard](../../LK-DEVELOPMENT-STANDARD.md)
en het expliciet gekozen runrapport. Lees geen andere sites zonder scope.

## Workflow

- Selecteer componenten, states en breakpoints op wijzigingsimpact. Hergebruik
  geldige captures/context. Bestaande visual-config, `visual.components` en
  `tests/visual/visual.spec.cjs` blijven de source of truth voor regressies.
- Gebruik `qa-visual-index.cjs <run-directory> <project-id>` voor bestaande captures;
  zie de [foundation](../../scripts/QA-FOUNDATION.md). Inspecteer beelden daadwerkelijk,
  niet alleen diff-aantallen. Ontbrekend beeld is ontbrekend bewijs.
- Beoordeel overflow, clipping, wrapping, spacing/alignment, typografische hiërarchie,
  crops/beeldcompositie, contrast op afbeeldingen, hover/focus/active en mobiele
  bedienbaarheid waar relevant. Een statische screenshot bewijst geen keyboardflow.
- Label verschillen als intended, regression of uncertain met element, viewport,
  oorzaak en gebruikersimpact. Een pixelverschil alleen rechtvaardigt geen redesign.
- Extra browserinspectie alleen om een concrete onzekerheid op te lossen, via de
  officiële Playwright-routing in de Standard. Geen tweede capture/baselineframework.
  Een normale visual-run omvat één hele site/viewport-referentieset; verzin geen
  componentfilter dat de bestaande runner niet ondersteunt.
- Acceptatie volgt uitsluitend na expliciete menselijke review en exacte bestands-
  scope via de bestaande acceptatiehelper. Nooit een falende vergelijking groen
  maken door automatisch te updaten. Daarna normale vergelijking zonder updates.

## Output en grens

Korte tabel: component/state/viewport → intended/regression/uncertain → bewijs →
benodigde actie. Benoem ongeteste states. Review-only blijft read-only; fixes vragen
scope en technische eindbeoordeling wordt niet stilzwijgend mee uitgevoerd.
Geen commit/push/deployment of DELIVERY_APPROVED op basis van eigen visuele review.
