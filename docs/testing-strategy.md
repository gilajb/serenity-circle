# Testing strategy

What we test, with what, and what must be true before a release.

## Priorities

Testing effort goes first to the places where a defect would hurt someone:

1. **Access control** — one person seeing another's data.
2. **Booking** — double bookings, wrong times, lost appointments.
3. **Authentication** — account takeover, account discovery.
4. **Notifications** — a missed reminder, or a message that reveals too much.
5. **Payments** — charging without booking, or booking without payment.

## Backend

**Tools:** pytest, pytest-django, factory_boy, freezegun, a real PostgreSQL database.

Tests run against PostgreSQL, not SQLite, because booking safety depends on a PostgreSQL exclusion constraint.

| Area | What is tested |
|---|---|
| Service functions | Every business rule: booking, rescheduling, cancelling, slot calculation, consent, deletion |
| Slot calculation | Weekly rules, exceptions, existing appointments, minimum notice, maximum advance, service duration, slots at the edges of working hours, dates across midnight UTC versus EAT |
| Concurrency | Two simultaneous bookings for the same slot: exactly one succeeds |
| API | Each endpoint's success, validation errors and status codes |
| Permissions | For every endpoint: signed out, wrong role, and another user's record are all refused |
| Authentication | Lockout, rate limits, token expiry and single use, identical responses for known and unknown email addresses |
| Children and consent | Age limits of 3 and 18 at the boundaries; a child can be booked only by their own guardian; booking refused without current guardian consent; withdrawal cancels future sessions; notifications go to the guardian only |
| Directory rules | Unpublished, unlicensed, expired and unconsented profiles never appear |
| Notifications | Correct template and recipient per event; reminders rescheduled or cancelled with the appointment; no clinical wording in any template |
| Tasks | Retention, licence checks, completion and hold release |
| Migrations | Apply cleanly from empty and from the previous release |

**Permission tests are mandatory.** A shared test helper runs the "other user gets 404" check against every record endpoint, and a test fails if a new endpoint is added without being registered with it.

## Frontend

**Tools:** Vitest, React Testing Library, Mock Service Worker, axe.

| Area | What is tested |
|---|---|
| Helpers | Date and time in EAT regardless of device time zone, `KES` formatting, Kenyan phone parsing and display |
| Components | Each state: default, loading, empty, error, disabled |
| Forms | Validation, server errors mapped to fields, no double submission |
| Booking flow | Step progression, back navigation keeps selections, preselection from links, the slot-taken path |
| Directory | "Coming soon" panel when no therapist is published, and the full directory once one is; filters update results and the address; empty state |
| Book a Session | Leads to Contact while no therapist is published, and to the booking flow once one is |
| Route guards | Signed-out and wrong-role users are redirected |
| Accessibility | Automated axe checks on every page and component |

Tests query by role and label, as a user would, not by internal structure.

## End to end

**Tool:** Playwright, on desktop and mobile viewports, against a seeded staging-like environment.

Core journeys, run on every merge to the main branch:

1. A visitor browses the directory, filters, opens a profile and starts booking.
2. A new client registers, verifies their email, completes the booking and sees it on the dashboard.
3. A client reschedules, then cancels.
4. A client and therapist join the same session.
5. A client sends a message and the therapist replies.
6. A visitor submits the contact form.
7. A therapist changes availability and the booking flow reflects it.
8. A client downloads their data and requests deletion.
9. An administrator publishes a therapist; a profile with an expired licence disappears from the directory.

## Non-functional testing

| Type | Approach |
|---|---|
| Accessibility | Automated checks in tests, plus manual keyboard and screen-reader passes on each page before launch and after significant changes |
| Performance | Lighthouse budgets in CI for public pages; tested on a throttled mobile profile |
| Load | Before launch: browsing, slot queries and concurrent booking at several times expected traffic |
| Security | Dependency and secret scanning on every commit; static analysis; an independent penetration test before launch and yearly |
| Cross-browser | Chrome, Safari, Firefox and Edge; real Android and iOS devices before launch |
| Responsive | Every page at 360, 768, 1024 and 1440px |
| Backup | Restore rehearsal each quarter |

## Content checks

Because the site must hold no placeholder content, an automated check scans the built frontend and production fixtures for:

- "Lorem ipsum" and similar filler
- The illustrative names, address and numbers from the mockups
- The American spellings "counseling" and "counselor"
- Hard-coded years in the footer
- The US crisis text line number

The build fails if any is found.

## Test data

- Factories generate clearly fictional data.
- No real client data is ever used in development, tests, staging or screenshots.
- Seed data for local development and staging is marked as fictional and cannot be loaded in production.

## Continuous integration

On every pull request:

1. Lint and format (Ruff for Python; ESLint and Prettier for TypeScript)
2. Type checks (mypy; TypeScript)
3. Backend tests with coverage
4. Frontend tests with coverage
5. Check that generated API types match the backend schema
6. Dependency and secret scans
7. Content checks
8. Production build

On merge to the main branch: all of the above, then end-to-end tests and Lighthouse budgets, then deployment to staging.

**Coverage:** at least 85% for the backend overall, and 100% of service functions and permission classes. Coverage is a floor, not the goal.

## Release gate

A release goes to production only when:

- [ ] All CI stages pass
- [ ] End-to-end journeys pass on staging
- [ ] New requirements have been checked against the [SRS](SRS.md) by someone other than the author
- [ ] No open defect affects privacy, security, booking or payments
- [ ] Changed pages have been checked on a phone
- [ ] Migrations have been run against a copy of production-shaped data
- [ ] A rollback route is known

## Defects

| Severity | Meaning | Response |
|---|---|---|
| Critical | Data exposed, booking or sign-in broken, payments wrong | Fix immediately; release as soon as verified |
| High | A main feature fails with no workaround | Fix in the current cycle |
| Medium | A feature misbehaves with a workaround | Schedule |
| Low | Cosmetic | Backlog |

Every fixed defect gets a test that would have caught it.
