---
title: FERN-HANDOFF.md
description: Internal design notes, not published to the site.
hidden: true
---

# Handoff: Fern-based multi-language SDK from OpenAPI (contract-first)

## Goal
User wants to build an external, contract-first SDK for LLM endpoints supporting TypeScript + Python (+ others), in a monorepo. Key question: use Fern (install CLI vs copy repo) and how to structure it.

## Current context
- Workspace: R:\AI\sdk (empty currently)
- Environment: Windows 11, Node v24.18.0, npm 11.16.0, Python 3.13.14, uv 0.12.8
- Fern CLI: not installed globally; attempted npx showed npm resolution quirks for @fern-api packages in this env but package exists (@fern-api/cli@0.4.24-rc1). Best to install locally as devDependency.
- Target: external SDKs, contract-first, monorepo, multi-language (TS + Python). OpenAPI 3.1 as source of truth.
- Use Fern to generate SDKs into packages/; implement backend in apps/api against same contract.

## Key decisions made
- Don't fork/copy Fern repo; install @fern-api/cli as devDependency.
- Use OpenAPI 3.1 in contracts/openapi.yaml as single source of truth.
- Monorepo layout: contracts/, fern/, packages/sdk-ts, packages/sdk-py, apps/api.
- Generate via `fern generate`; validate via `fern check`.
- For external TS SDK prefer fetch client (lightweight); can use axios if interceptors needed.
- Generate in CI or commit generated; for external publishing, CI on release is clean.
- Fern handles LLM-specific cases (streaming, unions/oneOf with discriminator, polymorphic).

## Recommended next actions
1. cd R:\AI\sdk; npm init -y (if not exists) and set up workspaces (npm/pnpm/turbo optional).
2. npm i -D @fern-api/cli
3. Create contracts/openapi.yaml with minimal LLM endpoint surface.
4. npx fern init (point to contracts/openapi.yaml) to create fern/fern.config.json + generators.yml.
5. Configure TS + Python generators per desired output paths.
6. npx fern check && npx fern generate to produce SDKs.
7. Implement apps/api to satisfy OpenAPI; add contract tests (Schemathesis/Pact) later.

## Files/artifacts
- None yet in R:\AI\sdk (empty). Need to create: package.json, contracts/openapi.yaml, fern/generators.yml, fern/fern.config.json.

## Suggested skills
- find-skills: discover/install relevant skills if extending (e.g. schema/contract tooling, CI for SDK publishing).
- init: optimize AGENTS.md / project instructions as repo grows.
- codebase-design: design module boundaries for API + SDK packaging.

## Notes
- Fern package name bin resolution issue observed with npx in this shell; local install + npm scripts is more reliable.
- No secrets/PII in conversation. Keep OpenAPI spec free of keys.