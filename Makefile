SHELL := /bin/bash

.PHONY: dev build down

dev:
	pnpm -w dev

build:
	pnpm -w build

down:
	docker compose -f deploy/docker-compose.yml down
