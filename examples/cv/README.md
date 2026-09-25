---
title: CV notes index — anonymized platform stack
updated: 2026-09-25
confidentiality: Internal notes only — do not use client/product names on public CV
---

# CV notes — platform stack (anonymized)

Internal survey notes for drafting CV bullets. **Do not copy product, client, or repo names** onto a public CV. Prefer the **One-liner** and **bullet bank** in each file; tech versions are AS-IS from manifests around 2026-09-25.

| Area | Role | File |
| --- | --- | --- |
| **Backend** | Go modular monolith API + workers | [backend.md](./backend.md) |
| **Frontend** | React SPA (procurement / vendor UI) | [frontend.md](./frontend.md) |
| **Docs** | Docusaurus technical docs portal | [docs-portal.md](./docs-portal.md) |

**Related (not detailed here):** file-transfer / Kafka peer service; legacy Rails identity / SSO provider.

## Stack snapshot (generic)

```
Docs portal (Docusaurus)
Frontend (React/Vite) ──REST──► Backend (Go/Gin)
                                    │
                 Kafka / shared files ◄──┤──► Transfer service
                 Postgres / Redis / OpenSearch / S3
                 SSO / legacy ERP integration ◄──┘
```
