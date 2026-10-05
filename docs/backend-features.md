# Backend features

The Django backend, organised by app. Data structures are in [database-schema.md](database-schema.md), endpoints in [api-specification.md](api-specification.md), and requirement IDs refer to the [SRS](SRS.md).

## Principles

- **Business rules live in service functions**, one per action (`book_appointment`, `reschedule_appointment`, `cancel_appointment`...). Views, the admin and background tasks all call the same functions.
- **Authorisation is checked on every request for the specific record**, by filtering querysets to what the user may see as well as by permission classes. A record the user may not see returns 404.
- **Anything slow or external runs in a background task**, after the database transaction commits.
- **Everything that touches client data is audited.**

## accounts

| Feature | Detail |
|---|---|
| Custom user model | Email login; roles `client`, `therapist`, `admin` |
| Registration | Creates the user and client profile, records consents, sends a verification email. Responds identically whether or not the email is already registered (FR-ACC-06) |
| Email verification | Signed, single-use, time-limited link |
| Sign in / sign out | Session cookie; session identifier rotated on sign-in |
| Two-factor authentication | Time-based codes with recovery codes; enforced for therapists and administrators (FR-ACC-08) |
| Password reset | Single-use link, expiring after one hour; all other sessions ended on reset |
| Password rules | Minimum 12 characters, checked against common and breached passwords; Argon2 hashing |
| Lockout and rate limits | Progressive delay after repeated failures, per account and per IP address |
| Profile | Clients read and update their own profile and emergency contact |
| Consent | Append-only record of each consent and withdrawal, with document version |
| Children | An account holder adds children aged 3 to 18; a child never has a sign-in (FR-CHD-01 to FR-CHD-03) |
| Guardian consent | Recorded per child with a guardianship declaration; required before a child's session can be booked; withdrawal cancels the child's future sessions (FR-CHD-04 to FR-CHD-06) |
| Ageing out | A daily task deactivates a child profile at 18 and notifies the guardian (FR-CHD-09) |
| Data export | Builds a file of the client's data in the background and emails a short-lived download link (FR-ACC-11) |
| Account deletion | Records the request; after a cooling-off period, anonymises the account per the retention rules |
| Session expiry | Idle timeout, shorter for therapists and administrators |

## therapists

| Feature | Detail |
|---|---|
| Public listing | Only profiles that are published, have a registration number, an unexpired licence and recorded consent (FR-DIR-05) |
| Filtering | By one or more specialities |
| Empty directory | With no published therapist the list is simply empty; the frontend shows "coming soon" and booking endpoints refuse new appointments (FR-DIR-07, FR-BKG-16) |
| Public profile | By slug; exposes only public fields |
| Self-service | Therapists edit their own biography |
| Licence monitoring | Daily task flags licences expiring within 60 days and unlists profiles whose licence has expired (FR-ADM-06) |
| Photographs | Validated, resized and re-encoded on upload, with metadata removed |

## services

| Feature | Detail |
|---|---|
| Public list and detail | Published services with duration and fee |
| Bookable list | Services flagged bookable, for step 1 of booking |
| Management | Through the admin |

## scheduling

| Feature | Detail |
|---|---|
| Availability rules | Recurring weekly hours per therapist |
| Exceptions | One-off unavailable or additional periods |
| Slot calculation | For a therapist, service and date range: weekly rules, plus extra periods, minus unavailable periods, minus existing appointments, cut into start times that fit the service's duration, respecting minimum notice and maximum advance (FR-BKG-04, FR-BKG-11). Computed in `Africa/Nairobi`, returned in UTC |
| "No preference" | Earliest slots across all therapists offering the service |
| Booking for a child | The child must belong to the account holder, be aged 3 to 18 on the session date and have current guardian consent (FR-BKG-19) |
| Booking | In one transaction: re-check the slot, create the appointment, write the event. The database exclusion constraint is the final guard against double-booking; a conflict returns a clear "slot taken" error (FR-BKG-07, FR-BKG-08) |
| Idempotency | A client-supplied key prevents a repeated request creating two appointments |
| Reschedule | Creates the new appointment linked to the old one and cancels the old, in one transaction; subject to the notice period (FR-BKG-13) |
| Cancel | By client within the notice period, or by therapist or administrator with a reason (FR-BKG-14) |
| Status changes | Only valid transitions are allowed; each is written to the appointment history (FR-BKG-15) |
| Completion | A scheduled task marks past confirmed appointments completed; therapists can mark a no-show |
| Configuration | Minimum notice, maximum advance, cancellation window and slot interval are settings managed by administrators |
| Calendar file | An `.ics` file per appointment for "Add to calendar", with a neutral title |

## sessions_video

| Feature | Detail |
|---|---|
| Room creation | A room with a random name is created for every appointment, since all sessions are video calls |
| Access tokens | Issued only to that appointment's client or therapist, only within the join window, and valid for minutes (FR-VID-02) |
| Roles | The therapist's token carries host rights so they admit the client from the waiting room |
| No recording | Recording is disabled at the provider and never requested (FR-VID-04) |
| Cleanup | Rooms are closed after the appointment ends |

## messaging

| Feature | Detail |
|---|---|
| Threads | One per client–therapist pair; can be created only where the two share an appointment (FR-MSG-01) |
| Messages | Stored encrypted; listed with pagination |
| Access | Participants only; administrators cannot read message content through the application (FR-MSG-02) |
| Read state | Read time recorded; unread counts available |
| Alerts | Email to the recipient saying a new message is waiting, without its content (FR-MSG-04) |
| Limits | Message length and sending rate are limited |

## progress

| Feature | Detail |
|---|---|
| Check-ins | One per client per day; three ratings and an optional note |
| Summary | Recent average and trend per measure, for the dashboard |
| Sharing | Visible to the therapist only when the client has turned sharing on (FR-PRG-03) |

## content

| Feature | Detail |
|---|---|
| Resources | Published articles, by category, with pagination; body sanitised on save |
| Testimonials | Published only with a consent document on file |
| Crisis contacts | Active contacts in display order, with the date each was last verified |

## enquiries

| Feature | Detail |
|---|---|
| Submission | Validates and stores the enquiry, notifies the practice, confirms to the sender |
| Spam protection | Rate limiting per IP address, a hidden trap field and a challenge that does not track users |
| Handling | Administrators update status and assignment in the admin |

## notifications

| Feature | Detail |
|---|---|
| Channels | Email and SMS through provider adapters |
| Templates | One per event, in HTML and plain text for email; SMS under 160 characters. Neutral wording per the [content style guide](content-style-guide.md#emails-and-sms) |
| Events | Email verification, password reset, booking confirmed, rescheduled, cancelled, reminders, new message, data export ready, licence expiring |
| Reminders | Scheduled 24 hours and 1 hour before each appointment; cancelled or moved when the appointment changes (FR-NOT-02) |
| Delivery | Sent from background tasks with retries and backoff; outcome recorded without storing message bodies (FR-NOT-05) |
| Preferences | SMS only with consent; essential account and appointment emails cannot be turned off |

## payments

Built in the payments phase.

| Feature | Detail |
|---|---|
| M-Pesa | Starts an STK Push to the client's phone; the appointment is held as `pending_payment` for a short period |
| Confirmation | From the provider's server callback, verified for authenticity, and processed once only (FR-PAY-04) |
| Expiry | Unpaid holds are released automatically |
| Cards | Through a hosted payment page of a certified provider, so card data never reaches this system (FR-PAY-03) |
| Receipts | Emailed on success |
| Refunds | Started by an administrator and recorded |
| Reconciliation | A daily task compares records with the provider's statements |

## audit

| Feature | Detail |
|---|---|
| What is recorded | Sign-ins and failures, viewing of client records by staff, appointment changes, data exports and deletions, consent changes, administrative changes |
| How | Written by the service functions and admin hooks; append-only |
| Review | Searchable by administrators in read-only form |

## Administration

The Django admin provides the first set of management screens (FR-ADM-01 to FR-ADM-07):

- Therapists, specialities and services
- Appointments, with reschedule and cancel actions that call the same service functions as the API
- Enquiries
- Resources, testimonials and crisis contacts
- Users, without the ability to view passwords or message contents
- Booking settings
- Audit log, read-only

The admin is served at a non-default address, requires two-factor authentication, and records access to client data.

## Scheduled tasks

| Task | Frequency |
|---|---|
| Send due appointment reminders | Every few minutes |
| Mark past appointments completed | Hourly |
| Release unpaid appointment holds | Every few minutes |
| Check therapist licence expiry | Daily |
| Apply data retention rules | Daily |
| Process due account deletions | Daily |
| Clear expired sessions and tokens | Daily |
| Payment reconciliation | Daily |

## Platform features

- **API documentation** — OpenAPI schema generated by drf-spectacular; interactive docs available outside production.
- **Health checks** — one for liveness, one that checks the database and Redis.
- **Structured logging** — JSON logs with a request ID, and personal data excluded.
- **Error monitoring** — with request bodies and personal fields removed.
- **Rate limiting** — global defaults with tighter limits on sensitive endpoints.
- **Settings** — split into base, development and production; production fails to start if a required secret is missing.
- **Fixtures** — development seed data clearly marked as fictional and blocked from loading in production.
