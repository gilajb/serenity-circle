# Architecture

## Overview

Serenity Circle+ is a React single-page application backed by a Django REST API and a PostgreSQL database. Slow or scheduled work — emails, SMS, reminders — runs in background workers.

```
                    ┌──────────────────────────┐
   Browser  ──────▶ │  Web server / CDN (TLS)  │
                    └──────┬─────────────┬─────┘
                           │             │
              static files │             │ /api/, /admin/
                           ▼             ▼
                  ┌────────────┐   ┌──────────────────┐
                  │ React app  │   │ Django + DRF     │
                  │ (built)    │   │ (Gunicorn)       │
                  └────────────┘   └───┬─────────┬────┘
                                       │         │
                              ┌────────▼──┐   ┌──▼────────┐
                              │PostgreSQL │   │  Redis    │
                              └───────────┘   └──┬────────┘
                                                 │
                                          ┌──────▼───────┐
                                          │Celery worker │──▶ Email, SMS,
                                          │and scheduler │    video, payments
                                          └──────────────┘
```

The frontend and the API are served from the same site (`/` and `/api/`), which keeps authentication simple and avoids cross-origin configuration.

## Technology choices

### Frontend

| Choice | Why |
|---|---|
| React with TypeScript | Requested stack; types catch mistakes in data passed between the API and the interface |
| Vite | Fast builds and a simple setup |
| React Router | Page routing, with signed-in areas loaded only when needed |
| TanStack Query | Fetching, caching and refreshing API data; handles loading and error states consistently |
| React Hook Form with Zod | Forms and validation, with one schema per form |
| Tailwind CSS | The design tokens in [design-system.md](design-system.md) become a shared theme, keeping pages consistent |
| Vitest, React Testing Library, Playwright | Unit, component and end-to-end tests |

### Backend

| Choice | Why |
|---|---|
| Django (current LTS release) | Requested stack; mature security defaults, admin and ORM |
| Django REST Framework | The REST API, serialisation and permissions |
| drf-spectacular | Generates the OpenAPI schema, from which frontend API types are generated |
| PostgreSQL | Requested database; exclusion constraints make double-booking impossible at the database level |
| Celery with Redis | Background jobs and scheduled reminders |
| Argon2 | Password hashing |
| pytest with pytest-django | Tests |

### External services

Each sits behind a small adapter in the backend so it can be swapped. Providers are chosen in [open-questions.md](open-questions.md).

| Need | Notes |
|---|---|
| Transactional email | Sending domain configured with SPF, DKIM and DMARC |
| SMS | A provider with reliable delivery to Kenyan networks and a registered sender name |
| Video | Hosted, embeddable, with short-lived per-user room tokens |
| Payments (later) | M-Pesa via Safaricom Daraja STK Push; cards via a PCI-certified provider |
| File storage | Private object storage for uploads such as therapist photographs |
| Error monitoring | With personal data scrubbed before sending |

## Authentication

Django session authentication with a secure, HTTP-only cookie, plus CSRF protection.

This was chosen over tokens held in the browser because the frontend and API share a site, so cookies work without extra machinery, and an HTTP-only cookie cannot be read by injected scripts. Sessions can also be ended immediately on the server, which matters for a service holding health data.

Two-factor authentication (time-based codes) is required for therapists and administrators and optional for clients.

## Time and locale

- The database stores all times in UTC (`USE_TZ = True`).
- Django's `TIME_ZONE` is `Africa/Nairobi`; the API returns ISO 8601 times with an offset.
- The frontend always displays times in `Africa/Nairobi`, regardless of the device's time zone, and labels them "EAT". A client travelling abroad still sees the practice's local time, which is what their therapist sees.
- Kenya has no daylight saving time, so EAT is always UTC+3.

## Project structure

```
Serenity Circle/
├── README.md
├── docs/
├── serenitycircleuidesigns/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/            Routing, providers, layouts
│   │   ├── pages/          One folder per route
│   │   ├── features/       booking, directory, dashboard, messaging, auth ...
│   │   ├── components/     Shared UI: Button, Card, Field, Header, Footer ...
│   │   ├── api/            Generated types and the API client
│   │   ├── lib/            Date, currency and phone helpers
│   │   ├── content/        Static page copy
│   │   └── styles/         Theme tokens and global styles
│   └── tests/
└── backend/
    ├── config/             Settings (base, dev, production), URLs, Celery
    ├── apps/
    │   ├── accounts/       Users, profiles, authentication, consent
    │   ├── therapists/     Therapist profiles, specialities
    │   ├── services/       Session types
    │   ├── scheduling/     Availability, appointments
    │   ├── sessions_video/ Video rooms and tokens
    │   ├── messaging/      Threads and messages
    │   ├── progress/       Check-ins
    │   ├── content/        Resources, testimonials, crisis contacts
    │   ├── enquiries/      Contact form
    │   ├── notifications/  Email and SMS
    │   ├── payments/       Later phase
    │   └── audit/          Audit log
    └── tests/
```

Each Django app owns its models, serialisers, views, permissions, background tasks and tests. Business rules live in service functions, not in views or serialisers, so they can be tested directly and reused by the admin and background jobs.

## Key design decisions

| Decision | Reason |
|---|---|
| One site for frontend and API | Simple, secure cookie authentication; no cross-origin exposure |
| Booking conflicts enforced by a PostgreSQL exclusion constraint | Application checks alone cannot prevent two simultaneous confirmations |
| Availability computed on request from rules, exceptions and existing appointments | No pre-generated slot table to keep in step |
| Django admin for the first administration tools | Delivers management screens quickly; a custom interface can follow if needed |
| Therapist workspace built in React, not the admin | Therapists need a focused, mobile-friendly view and must never see other therapists' clients |
| Public page copy held in the frontend; changeable content in the database | Brand copy changes rarely and benefits from review; services, therapists, resources and crisis contacts change without a release |
| Providers behind adapters | Vendors can change without touching business logic |
| No clinical notes in the first release | Keeps the most sensitive category of data out until it can be done properly |
| Signed-in code loaded separately | Keeps public pages fast on mobile data |

## Search engines

Public pages need to be found. The React app pre-renders the public routes at build time so their content and metadata are present in the initial HTML; therapist and resource pages are re-rendered when their content changes. Signed-in pages are excluded from indexing.

## Environments

Local, staging and production, described in [deployment.md](deployment.md). Staging mirrors production and never contains real client data.
