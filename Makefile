SHELL := /bin/bash

.PHONY: install build lint format format-write test dev docker-up docker-down clean

install:
npm install

build:
npm run build

lint:
npm run lint

format:
npm run format

format-write:
npm run format:write

test:
npm run test

dev:
npm run dev

docker-up:
docker compose -f deploy/docker-compose.yml up --build -d

docker-down:
docker compose -f deploy/docker-compose.yml down

clean:
rm -rf node_modules */*/node_modules */*/*/node_modules .turbo dist */dist */*/dist .venv
