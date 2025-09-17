# Echo — Cahier des charges (résumé)

## Synthèse en 10 points
1. Echo est une plateforme multi-catégories pilotée par des agents IA autonomes qui optimisent prix, délais, qualité et impact CO₂ pour acheteurs et vendeurs.
2. Le parcours cible est entièrement automatisé de la demande au support post-commande, incluant négociation, paiement, logistique et remboursements.
3. L'écosystème repose sur un monorepo Turborepo exécutable en local via Docker Compose et déployable sur Kubernetes avec Helm (Terraform en option).
4. Les services principaux couvrent catalogue (NestJS), commandes/paiements/logistique (Go), BFF GraphQL Apollo Router et passerelle API (Envoy/NGINX).
5. Les agents IA LangGraph (orchestrateur, achat, produit, agrégateur, logistique, risque, support) interagissent via bus d'événements Redpanda/Kafka et respectent les politiques OPA.
6. La couche données combine PostgreSQL 16 + pgvector, OpenSearch, Redis, Parquet/DuckDB et Debezium CDC, avec seeds réalistes et schémas Avro/GraphQL/OpenAPI.
7. L'observabilité est assurée par OpenTelemetry (traces, métriques, logs) relié à Prometheus, Tempo/Jaeger, Loki et Grafana, avec SLO décrits en OpenSLO.
8. La sécurité comprend Keycloak (RBAC, JWT courts), mTLS intra-cluster, moteur de politiques OPA, gestion des secrets (Vault), audit trail signé et conformité RGPD/KYC.
9. Les tests couvrent unités, contrats (Pact), e2e (Playwright), charge (Locust 500 RPS), chaos léger et sécurité (ZAP), avec un parcours démo validant le flux bout en bout.
10. La roadmap vise un MVP en 30 jours puis une montée en puissance progressive (V1 autonome puis scale multi-pays), tout en suivant des KPIs précis (match-rate, SLA, coûts).

## Livrables par phase
- **Phase 1 – Scaffold** : Monorepo Turborepo avec apps (web, admin, bff, agents, services), packages partagés (proto/avro, clients, otel, config), Dockerfiles, docker-compose, Makefile, README Quickstart, squelettes Helm et Terraform.
- **Phase 2 – Données & Schémas** : Migrations SQL/Postgres, schémas Avro, SDL GraphQL, OpenAPI, mappings OpenSearch, seeds réalistes (catalogue, comptes, commandes, offres...).
- **Phase 3 – Services Core** : Implémentation catalog (NestJS), orders/payments/logistics (Go avec ledger double entrée et OR-Tools), BFF GraphQL, gateway Envoy/NGINX, instrumentation OTel, healthchecks, tests unitaires & contrat.
- **Phase 4 – Agents IA** : Agents LangGraph (orchestrateur, achat, produit, agrégateur, logistique, risque, support) avec prompts signés, outils, stockage des runs et tests de simulation.
- **Phase 5 – Observabilité & Sécurité** : Configuration OpenTelemetry, dashboards Grafana, SLO OpenSLO, politiques OPA, realm Keycloak + clients + RBAC, tests sécurité basiques.
- **Phase 6 – Back-Office** : Application admin Next.js (ou Retool bonus) avec rôles, vues CRUD, monitoring, gestion CX/policies.
- **Phase 7 – CI/CD** : Workflows GitHub Actions (lint, tests, contrats, build, push Docker, déploiement Helm, smoke), environnements de preview par PR.
- **Phase 8 – Tests & Démo** : Suite de tests Playwright, Locust 500 RPS, chaos test léger, scripts smoke, parcours démonstration complet validant le Definition of Done.
