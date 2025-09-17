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

- `apps/` : applications Next.js (web, admin), BFF GraphQL Node.js, agents Python et microservices métiers.
- `packages/` : bibliothèques partagées (config, clients, proto, télémétrie).
- `deploy/` : orchestrations Docker Compose et squelettes Helm/Terraform.
- `db/`, `policies/`, `search/` : emplacements réservés aux données, politiques OPA et mappings de recherche.
- `tests/` : structure des suites de tests (e2e, charge, contrats).
- `.github/workflows/` : pipeline CI de base.

## Développement

Consultez le `Makefile` pour les commandes fréquemment utilisées (`make dev`, `make docker-up`, etc.). Chaque service possède son propre Dockerfile et peut être démarré individuellement ou via Docker Compose.

