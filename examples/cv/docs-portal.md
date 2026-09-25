---
title: Docs portal — Tech & Architecture Notes for CV (anonymized)
role: Docusaurus documentation site
updated: 2026-09-25
---

# Docs portal

## One-liner (CV)

Docusaurus 3 documentation site for an enterprise healthcare EDI / procurement platform: architecture, DDD module designs, sprint how-tos, and living knowledge for BA / Dev / QC — Docker + nginx, Basic Auth, PDF export pipeline.

## Context (internal only — do not paste names to CV)

| | CV-safe wording |
| --- | --- |
| **Role** | Technical documentation portal |
| **Audience** | Engineering, BA, QC |
| **Sibling apps documented** | Backend, frontend, transfer service (one product by module) |
| **Hosting** | Dockerized static site behind nginx + Basic Auth (omit real hostname on CV) |

## Architecture / content model

Docs-as-code portal:

```
Markdown/MDX ──► Docusaurus build ──► static site
                          │
               Docker image + nginx (+ htpasswd)
```

### Content layout

| Area | Role |
| --- | --- |
| Knowledge base | Living docs by role: Requirements (BA), Implementation (Dev DDD), Testing (QC) |
| Sprints | Sprint / work-item how-tos (dated folders) |
| How-to | Cross-cutting guides (AI-assisted delivery, tooling) |
| Legacy | Frozen history (architecture, DB design) |
| Reference | Reference material |

Implementation docs are **module-oriented** (auth, user management, PO management, load, notifications, …), combining BE + FE + DB rather than by repo.

### Tooling around docs

- **Mermaid** diagrams (Docusaurus theme + mermaid-cli)
- **PDF pipeline:** Pandoc + Lua filters + Puppeteer Chrome
- AI-assisted delivery method assets (e.g. BMAD-style workflows)
- Sprint-local **Playwright e2e / k6 load** scripts hooked from npm scripts

## Tech stack

| Layer | Technology |
| --- | --- |
| Site generator | **Docusaurus 3.9** (classic preset, TypeScript config) |
| UI | **React 19**, MDX |
| Language | **TypeScript ~5.6**, Node **≥ 20** |
| Diagrams | **Mermaid** |
| Deploy | **Docker** multi-stage (Node build → nginx), Compose |
| Auth (served site) | **HTTP Basic Auth** (htpasswd + nginx) |
| PDF | Pandoc, XeLaTeX/Lua filters, Puppeteer |
| Quality | ESLint / Prettier, `tsc` typecheck |

## Bullet bank for CV

- Owned/maintained technical documentation portal with Docusaurus 3 + React 19
- Structured knowledge base by role (BA / Implementation / QC) and product modules
- Documented Clean Architecture / DDD designs spanning Go backend and React frontend
- Dockerized nginx delivery with Basic Auth for internal docs
- Automated Markdown → PDF export (Pandoc + Mermaid images)
- Sprint how-to docs and AI-assisted delivery guidelines for the team
- Linked sprint test automation (Playwright e2e, k6) from the docs repo scripts

## Deploy sketch

1. `npm run build` (or image build with Node 20)
2. Static assets served by nginx (`baseUrl` via env)
3. Deploy script / Compose; htpasswd for access control

## Source pointers (internal)

- Docusaurus config + sidebars
- Ops: deployment guide, Dockerfile, nginx, deploy script
- Content: knowledge + sprints trees
