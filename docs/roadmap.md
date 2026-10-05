# Roadmap

The order of work. Each phase delivers something usable and ends with a review. Phases are sequenced by dependency; durations will be set once the team and the answers in [open-questions.md](open-questions.md) are known.

## Phase 0 — Foundations

Set up the project so every later phase builds on solid ground.

- Git repository, branch protection, pull-request template
- `backend/` Django project: settings split, custom user model, PostgreSQL, Celery, health checks
- `frontend/` React project: Vite, TypeScript, routing, Tailwind theme from the [design system](design-system.md)
- Docker Compose for local PostgreSQL and Redis
- CI: lint, type checks, tests, scans, content checks
- Shared components: Header, Footer, Button, Card, Field, Tag, Hero
- Formatting helpers for EAT time, KES and Kenyan phone numbers
- Staging environment

**Done when:** an empty site with the real header and footer deploys to staging through CI.

**Needs from the business:** domain name (B7); font and logo source files.

## Phase 1 — Public website

The marketing site. It can go live on its own, with "Book a Session" leading to the contact form until booking exists.

- Home, About Us, Services and service detail pages
- Directory, launching in its "coming soon" state; filters and therapist profile pages are built and tested with fictional test data so they are ready when the first therapist is listed
- Contact page with enquiry form, phone and email, and Immediate Support
- Crisis Support, Privacy Policy and Terms of Service pages
- Resources listing and articles
- Admin management of therapists, specialities, services, resources, testimonials, crisis contacts and enquiries
- Therapist licence rules and expiry warnings
- Search-engine metadata, sitemap, pre-rendered public pages
- Responsive layouts and accessibility pass

**Done when:** the public site meets the performance and accessibility requirements and contains only real content.

**Needs from the business:** a domain name (B7), social accounts and hours (B4, B5), verified crisis contacts (C3), legal documents (L2). Therapists are not needed for this phase.

## Phase 2 — Accounts and booking

The core of the platform.

- Registration with consents, email verification, sign in, password reset
- Two-factor authentication
- Child profiles and guardian consent, for clients aged 3 to 18
- Therapist availability rules and exceptions
- Slot calculation and the four-step booking flow
- Double-booking protection
- Confirmation, reschedule and cancellation emails; reminders
- Client dashboard: greeting, upcoming session, all sessions, reschedule, cancel
- Client profile, consent history, data export, account deletion
- Audit log
- Therapist workspace: appointments and availability

**Done when:** a new client can register, book, reschedule and cancel without help, and a therapist can manage their calendar.

**Needs from the business:** at least one verified therapist (T1–T5) before booking can be opened to the public, their availability (T4), cancellation policy (S6), fees (S5), consent wording including guardian consent (N9), whether adults are seen (N7), retention periods (L4), and a domain with a mailbox (N6, B7) — without it no confirmation or reminder email can be sent.

## Phase 3 — Sessions and communication

- Video provider integration, waiting room, session page
- "Join Waiting Room" and "Start Session"
- Secure messaging between client and therapist
- SMS confirmations and reminders
- Progress check-ins and the dashboard Progress Tracker

**Done when:** a client and therapist can hold a full session and exchange messages inside the platform.

**Needs from the business:** video provider decision (P2), messaging response commitment (P6), progress tracker approach approved by a clinician (P3), SMS sender name.

## Phase 4 — Payments

Subject to [decision P1](open-questions.md#product-decisions).

- M-Pesa STK Push at booking
- Card payments through a hosted provider page
- Receipts, refunds and daily reconciliation
- Payment step added to the booking flow

**Done when:** a client can pay for a session by M-Pesa and both sides have an accurate record.

**Needs from the business:** an M-Pesa Paybill or Till with Daraja API access, payment provider account, refund policy.

## Phase 5 — Launch readiness

Runs alongside the later phases and completes before real clients use the signed-in features.

- Independent penetration test and fixes
- Load testing
- Manual accessibility audit
- Backup restore rehearsal
- Production monitoring and alerting
- Compliance checklist: ODPC registration, DPIA, processor agreements
- Staff accounts, two-factor setup and a short training session for therapists and administrators
- Incident response plan

**Done when:** every item on the [production](deployment.md#production-checklist) and [compliance](privacy-and-compliance.md#launch-checklist) checklists is ticked.

## Later

Not scheduled; to be prioritised after launch using real usage.

- Kiswahili language option
- Clinical notes for therapists
- Custom administration interface
- Calendar synchronisation for therapists
- Client feedback after sessions
- Installable mobile experience

## What can start now

Phase 0 and almost all of Phase 1 can be built now: the service range and contact details are settled, and the Directory launches as "coming soon". The public site still needs a domain name (B7), verified crisis contacts (C3) and the legal pages (L2) before it is published. Booking opens when the first therapist is verified and listed.
