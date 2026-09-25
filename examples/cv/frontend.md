---
title: Frontend — Tech & Architecture Notes for CV (anonymized)
role: React SPA
updated: 2026-09-25
---

# Frontend

## One-liner (CV)

React 19 + TypeScript SPA for healthcare purchase-order and vendor workflow management; Redux Toolkit / RTK Query against a Go REST API, Ant Design UI, Storybook + Jest.

## Context (internal only — do not paste names to CV)

| | CV-safe wording |
| --- | --- |
| **Domain** | Buyer/vendor work-queue UI for procurement / price exceptions |
| **Backend** | Go API via `/api/v1` and `/auth` (Vite proxy in local) |
| **Auth** | JWT session, SSO callback, set-password flows |

## Architecture

- **Pattern:** Feature-based SPA (pages/components/useCases per feature)
- **State:** Redux Toolkit store + **RTK Query** API layer
- **Persistence:** redux-persist for session-related state
- **Routing:** React Router v7 with protected routes / redirects
- **Forms:** Formik + Yup
- **UI:** Ant Design 5 + SCSS; Ant Design Plots for charts
- **Security (client):** DOMPurify for HTML sanitization
- **Path aliases:** features, api, components, hooks, store, useCases, …

### Feature modules (examples)

| Feature area | Purpose |
| --- | --- |
| Login / SSO callback / set password | Auth & SSO |
| App shell / home | Layout / outlet |
| Dashboard | Metrics / overview |
| Purchase orders | List & detail (core work queue) |
| Vendor tickets | Ticketing integration UI |
| Vendor performance | Performance views |
| Admin | Admin screens |
| Settings | User settings |
| Redirect | Auth / deep-link redirects |

### Shared layer

API (RTK Query slices: auth, buyer, corporation, dashboard, tickets, vendor, …) · components · hooks · slices · types · useCases · utils · styles

## Tech stack

| Layer | Technology |
| --- | --- |
| UI framework | **React 19** |
| Language | **TypeScript ~5.8** |
| Build | **Vite 6** |
| State / data | **Redux Toolkit**, **RTK Query**, **redux-persist**, react-redux |
| UI kit | **Ant Design 5**, icons, plots |
| Forms | **Formik**, **Yup** |
| Routing | **react-router-dom 7** |
| Styling | **Sass/SCSS** |
| Security | **DOMPurify** |
| Unit tests | **Jest**, Testing Library, jsdom |
| Component docs | **Storybook 10** (Vite, a11y, docs, Vitest addon) |
| E2E / browser | **Playwright** (Storybook/Vitest browser) |
| Lint / format | ESLint 9, Prettier, typescript-eslint |
| Deploy | Docker + nginx; Storybook Docker compose |
| CI | Jenkins (eslint, jest, deployment) |

## Bullet bank for CV

- Built feature-sliced React 19 / TypeScript SPA with Vite and path aliases for large codebase navigation
- Integrated RTK Query against versioned REST API with auth token / cookie session handling
- Implemented PO work-queue, dashboard, vendor tickets, and admin flows with Ant Design
- SSO callback and password-set flows alongside classic login
- Form validation with Formik/Yup; client-side XSS mitigation via DOMPurify
- Storybook for component catalog + a11y checks; Jest + Testing Library for unit coverage
- Docker/nginx production packaging; Jenkins pipelines for lint, tests, deploy
- npm audit reporting for dependency security hygiene

## Local / env (high level)

- Dev server: Vite with proxy `/api/v1` and `/auth` → backend
- Env: API base/proxy URLs, optional integration feature flags

## Source pointers (internal)

- Entry: `main.tsx`, `App.tsx`, store setup
- API layer under shared/api
- Build: Vite config, Dockerfile, nginx
