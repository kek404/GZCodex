# Echo Monorepo Scaffold (Phase 1)

Ce dépôt contient le squelette exécutable du projet Echo tel que décrit dans le cahier des charges phase 1. Il fournit l'arborescence Turborepo, les services de base et l'infrastructure locale pour développer et tester la plateforme.

## Quickstart (5 commandes)

```bash
npm install
npm run prepare
npm run build
docker compose -f deploy/docker-compose.yml up --build
npm run lint
```

## Contenu principal

- `apps/` : applications Next.js (web, admin), BFF GraphQL Node.js, agents FastAPI Python et microservices Go (orders, payments, logistics).
- `packages/` : bibliothèques partagées (config, clients, proto, télémétrie).
- `deploy/` : orchestrations Docker Compose et squelettes Helm/Terraform.
- `db/`, `policies/`, `search/` : migrations bootstrap, politiques OPA et mappings de recherche.
- `tests/` : structure des suites e2e, charge et contrats.
- `.github/workflows/` : pipeline CI de base (lint, build, tests multi-langages).

## Commandes utiles

Le `Makefile` expose les commandes récurrentes :

- `make install` : installation des dépendances Node.js.
- `make build` : compilation des packages/applications via Turborepo.
- `make docker-up` : lancement de l'environnement local (services + dépendances).
- `make docker-down` : arrêt de l'environnement Docker Compose.
- `make clean` : nettoyage des artefacts (`node_modules`, builds, `.turbo`).

## Services inclus

- **Frontaux** : `apps/web` (client) et `apps/admin` (back-office) — Next.js 14, i18n prête, lint/format.
- **BFF** : `apps/bff` expose une API GraphQL Apollo Server avec test health automatisé.
- **Agents** : `apps/agents` fournit une API FastAPI listant les rôles d'agents attendus.
- **Services Go** : commandes, paiements et logistique exposent des endpoints REST (`/health`, `/payments/charge`, `/logistics/quote`).

Chaque service dispose d'un Dockerfile et d'un script `test` pour valider la santé de base.

## Observabilité & Sécurité (aperçu)

- Policies OPA initiales disponibles dans `policies/opa`.
- Mapping OpenSearch minimal pour le catalogue (`search/opensearch_mappings/catalog.json`).
- Stack d'observabilité (Grafana, Keycloak, Redpanda, PostgreSQL) orchestrée via Docker Compose.

## Étapes suivantes

Les phases suivantes introduiront les migrations complètes, les seeds de données réalistes, les agents LangGraph complexes, les tests contractuels/E2E, l'observabilité avancée et les pipelines CI/CD complets tels que décrits dans `docs/spec.md`.
