# Serenity Circle+

*Heal, Grow and Thrive*

Serenity Circle+ is a Kenyan therapy and counselling practice. This repository holds the website and client platform: a public site where people learn about the practice and find a therapist, and a signed-in area where clients book, attend and manage their sessions.

> **Status:** foundations in place. Both projects are scaffolded with the shared header, footer and page shells; features are built phase by phase per the [roadmap](docs/roadmap.md).

## What the platform does

- **Public site** — Home, About Us, Services, therapist Directory, Resources, Contact, Crisis Support and legal pages.
- **Booking** — a four-step flow: Service → Therapist → Time → Confirm.
- **Client dashboard** — upcoming sessions, rescheduling, joining a video session, messaging a therapist, tracking progress.
- **Therapist and admin tools** — availability, appointments, directory profiles and site content.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite, TypeScript), React Router, TanStack Query, Tailwind CSS |
| Backend | Django, Django REST Framework |
| Database | PostgreSQL |
| Background jobs | Celery with Redis |
| Locale | Kenya — `Africa/Nairobi` (EAT), `en-KE`, KES |

Details and the reasoning behind each choice are in [docs/architecture.md](docs/architecture.md).

## Repository layout

```
Serenity Circle/
├── docs/                      Project documentation
├── serenitycircleuidesigns/   UI mockups (source of truth for look and feel)
├── frontend/                  React app
└── backend/                   Django project
```

## Documentation

Start with the [documentation index](docs/README.md). The most-used documents:

- [Product Requirements (PRD)](docs/PRD.md) — what we are building and why
- [Software Requirements (SRS)](docs/SRS.md) — numbered, testable requirements
- [Architecture](docs/architecture.md) — how the system fits together
- [Design system](docs/design-system.md) — colours, type, components, navigation and footer
- [Security](docs/security.md) and [Privacy and compliance](docs/privacy-and-compliance.md)
- [Open questions](docs/open-questions.md) — real business information needed before launch

## Project rules

1. **No placeholder content.** This is a live site for a real practice. Names, addresses, phone numbers, prices, testimonials and therapist profiles must be real and supplied by the business. Anything unknown is tracked in [docs/open-questions.md](docs/open-questions.md), never invented.
2. **Kenyan locale throughout.** East Africa Time, Kenyan Shillings, Kenyan phone formats, Kenyan crisis lines.
3. **British spelling.** "Counselling", "counsellor", "centre", "programme". See the [content style guide](docs/content-style-guide.md).
4. **Client data is sensitive health data.** Follow [security.md](docs/security.md) for every feature that touches it.

## Getting started

You need Python 3.12+, Node.js 24+, PostgreSQL and Git. Commands are for PowerShell, run from the repository root. Docker is not used.

**1. Database** — once only, create the database and its user in your local PostgreSQL. You will be asked for the `postgres` password you chose when installing PostgreSQL:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE USER serenity WITH PASSWORD 'serenity' CREATEDB;" -c "CREATE DATABASE serenity OWNER serenity;"
```

Redis is only needed for background jobs (reminders), which arrive in a later phase.

**2. Backend** — http://localhost:8000

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements\dev.txt
copy .env.example .env        # then set SECRET_KEY
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**3. Frontend** — http://localhost:5173 (in a second terminal)

```powershell
cd frontend
npm install
npm run dev
```

The frontend forwards `/api` requests to the backend. API docs are at http://localhost:8000/api/v1/docs/ in development.

**Checks**

| | Backend (in `backend/`) | Frontend (in `frontend/`) |
|---|---|---|
| Tests | `pytest` | — |
| Lint | `ruff check .` | `npm run lint` |
| Build | — | `npm run build` |

Environment variables are described in [docs/deployment.md](docs/deployment.md).
