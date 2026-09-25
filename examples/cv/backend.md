---
title: Backend — Tech & Architecture Notes for CV (anonymized)
role: Go API + background workers
updated: 2026-09-25
---

# Backend

## One-liner (CV)

Go modular monolith for healthcare EDI / purchase-order & price management: ingest EDI transaction sets, rule-based exception evaluation, contract reconciliation, multi-tenant APIs for a work-queue UI.

## Context (internal only — do not paste names to CV)

| | CV-safe wording |
| --- | --- |
| **Domain** | Healthcare supply chain — PO acknowledgements, ASN, invoices, price variance |
| **Role** | Core backend API + background workers |
| **Consumers** | SPA frontend (`/api/v1`, `/auth`) |
| **Peers** | Transfer service (Kafka + shared filesystem); legacy Rails SSO / ERP integration |

## Architecture

- **Style:** Modular monolith, Clean Architecture + DDD bounded contexts
- **Dependency rule:** Domain ← Application ← Infrastructure / HTTP adapters
- **Multi-tenant:** Per-org databases + Row Level Security (RLS) on org data
- **Event-driven:** Kafka for EDI / org events; in-memory bus for local/dev
- **Jobs:** Asynq on Redis (email, user sync, scheduled work)
- **Search:** OpenSearch indexing
- **Microservice-ready:** Modules isolated behind interfaces for later extraction

### Composition roots (`cmd/`)

| Binary | Responsibility |
| --- | --- |
| `api` | HTTP API (Gin), middleware, route wiring |
| `worker-producer` | Detect EDI/load files → publish Kafka |
| `worker-consumer` | Consume Kafka → business processing |
| `worker-job` | Asynq worker |
| `migrate-gorm` | GORM migrations (main DB + per-org) |
| `opensearch-bootstrap` | OpenSearch bootstrap |

### Business modules (examples)

Auth · purchase orders · EDI · exception evaluation · vendors · corporations · comments · history · media · ERP integration · notifications · permissions · settings · sync · tickets

Each module typically: `domain/` · `application/` · `infrastructure/` · `interfaces/http/`.

### Shared kernel

Kafka, async job queue, event bus, audit, OpenSearch, database, middleware (JWT, CORS, rate limit), i18n, money, excel, filter, OpenTelemetry trace, validators, object storage (S3), healthcheck.

## Tech stack

| Layer | Technology |
| --- | --- |
| Language | **Go 1.25** |
| HTTP | **Gin** |
| ORM / DB driver | **GORM** + **pgx** (hot paths) |
| DB | **PostgreSQL** (main + per-org), RLS |
| Cache / jobs | **Redis**, **Asynq**, cron |
| Messaging | **Apache Kafka** (`segmentio/kafka-go`) |
| Search | **OpenSearch** |
| Auth | **JWT** (`golang-jwt/v5`), SSO with legacy platform |
| Cloud | **AWS SDK v2** (S3) |
| Config | **Viper** + env (JSON blobs for DB/Kafka/Redis/SSO) |
| Logging | **Zap** |
| Metrics / tracing | **Prometheus**, **OpenTelemetry** |
| API docs | **Swagger** (swaggo) |
| Excel | excelize |
| Validation | go-playground/validator |
| Tests | testify, sqlmock, miniredis, httpexpect |
| Containers | Docker / Compose |
| CI | Jenkins (coverage, security, Trivy) |

## Bullet bank for CV

- Designed and/or worked on Clean Architecture Go services with many domain modules and clear interface boundaries
- Built/maintained multi-tenant Postgres (main + org DBs) with RLS isolation
- Kafka-based EDI pipeline (producer/consumer workers) for healthcare transaction sets (e.g. 850/855/856/810)
- Config-driven exception / reconciliation engine against contract pricing
- Background job processing with Asynq/Redis; OpenSearch for searchable work queues
- JWT auth + SSO integration with a legacy Rails platform
- Observability: structured Zap logs, Prometheus metrics, OTel
- Dual migration path (GORM + SQL) for main and per-organization schemas
- Large automated test suite; fast unit-test gate in CI
- Security scanning in Jenkins (Trivy / security pipelines)

## How it fits the platform (generic)

```
EDI files / transfers ──► worker-producer ──► Kafka ──► worker-consumer
                                                      │
                                                      ▼
Frontend ──► Gin API ──► Postgres / Redis / OpenSearch / S3
                 │
                 └── ERP / SSO (legacy Rails)
```

## Source pointers (internal)

- Architecture: repo README / agent guide
- Integration contracts: docs under integration (Kafka EDI, shared FS, SSO)
- Conventions: coding / locator docs
- Local stack: Docker compose under deployments
