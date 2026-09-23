# LK workspace

- Bepaal project, scope en wijzigingsimpact vóór edits. Behoud bestaand user work.
- Lees de relevante regels in [Development Standard](LK-DEVELOPMENT-STANDARD.md);
  gebruik de projectregistratie voor scope/freeze. Wijzig of hertest frozen projecten
  alleen na expliciete heropening; omzeil geen guards.
- Gebruik de bestaande stack/conventies; geen ongevraagde dependencies of migraties.
- Werk mobile-first bij nieuwe frontends. Neem toegankelijkheid, performance, SEO
  en security/privacy mee waar de wijziging die raakt.
- Gebruik bestaande deterministische QA en hergebruik aantoonbaar geldig bewijs.
  Benoem warnings, skips, ontbrekende dekking en beperkingen; geen verzonnen PASS.
- Geen echte formulierinzendingen of andere externe side effects zonder expliciete
  toestemming. QA houdt mocks/blokkering actief en gebruikt fictieve gegevens.
- Geen automatische baselineacceptatie, commit, push of deployment.
- TECHNICAL_GATE_PASS is geen menselijke goedkeuring. DELIVERY_APPROVED vereist
  expliciete owner-goedkeuring van de exacte beoordeelde staat.
- Stop na de afgesproken scope. Extra polish is nieuwe scope.
