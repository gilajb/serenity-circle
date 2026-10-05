# API specification

The planned REST API between the React frontend and the Django backend. Once the backend exists, the generated OpenAPI schema is the authoritative reference and this document remains the overview.

## Conventions

| Item | Rule |
|---|---|
| Base path | `/api/v1/` |
| Format | JSON, UTF-8 |
| Field names | `snake_case` |
| Identifiers | UUIDs; therapists, services and resources are also addressed by `slug` |
| Times | ISO 8601 with offset, e.g. `2027-03-14T10:00:00+03:00` |
| Money | Integer Kenyan Shillings, e.g. `"price_kes": 3500` |
| Phone numbers | E.164, e.g. `+254712345678` |
| Lists | Paginated: `{ "count", "next", "previous", "results" }`; `?page=` and `?page_size=` |

## Authentication

Session cookie authentication.

1. The frontend calls `GET /auth/csrf/` once to receive the CSRF cookie.
2. Sign-in sets a secure, HTTP-only session cookie.
3. Every request that changes data sends the `X-CSRFToken` header.

Access levels used below: **Public**, **Client**, **Therapist**, **Staff** (therapist or administrator), **Owner** (the signed-in user's own record).

## Errors

```json
{
  "error": {
    "code": "slot_unavailable",
    "message": "We truly apologize. That time slot has just been booked. Please choose another.",
    "fields": { "starts_at": ["This time is no longer available."] }
  }
}
```

| Status | Meaning |
|---|---|
| 400 | Validation failed; see `fields` |
| 401 | Not signed in |
| 403 | Signed in but not permitted, or CSRF check failed |
| 404 | Not found, or not visible to this user |
| 409 | Conflict, e.g. the slot has been taken |
| 429 | Too many requests; see `Retry-After` |
| 500 | Unexpected error; includes a request ID to quote to support |

Messages are written for end users. Codes are stable and are what the frontend checks.

## Endpoints

### Auth and account

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/auth/csrf/` | Public | Set the CSRF cookie |
| POST | `/auth/register/` | Public | Create a client account |
| POST | `/auth/verify-email/` | Public | Confirm an email address |
| POST | `/auth/resend-verification/` | Public | Send a new verification link |
| POST | `/auth/login/` | Public | Sign in; may return `two_factor_required` |
| POST | `/auth/login/two-factor/` | Public | Complete sign-in with a code |
| POST | `/auth/logout/` | Signed in | Sign out |
| POST | `/auth/password/forgot/` | Public | Request a reset link |
| POST | `/auth/password/reset/` | Public | Set a new password with a token |
| POST | `/auth/password/change/` | Signed in | Change password |
| GET | `/auth/me/` | Signed in | Current user and role |
| POST | `/auth/two-factor/setup/` | Signed in | Begin two-factor setup |
| POST | `/auth/two-factor/confirm/` | Signed in | Confirm and enable |
| GET, PATCH | `/me/profile/` | Owner | Read or update own profile |
| GET | `/me/consents/` | Owner | Consent history |
| POST | `/me/consents/` | Owner | Give or withdraw a consent |
| GET, POST | `/me/children/` | Owner | List or add children (ages 3 to 18) |
| GET, PATCH, DELETE | `/me/children/{id}/` | Owner | Read, update or remove a child |
| POST | `/me/children/{id}/consent/` | Owner | Give or withdraw guardian consent for a child |
| POST | `/me/data-export/` | Owner | Request a copy of own data |
| POST | `/me/delete-account/` | Owner | Request account deletion |

**Register — request**
```json
{
  "full_name": "…",
  "email": "…",
  "phone": "+2547…",
  "password": "…",
  "accept_terms": true,
  "accept_privacy": true,
  "consent_health_data": true,
  "consent_sms": false
}
```
Always responds `202` with the same body, whether or not the email is already registered.

### Public content

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/services/` | Public | Published services |
| GET | `/services/{slug}/` | Public | One service |
| GET | `/specialties/` | Public | Specialities for directory filters |
| GET | `/therapists/` | Public | Directory; filters `specialty` (repeatable), `service`. An empty list (`count: 0`) with no filters applied means no therapist is published yet: the frontend shows "coming soon" and switches off online booking |
| GET | `/therapists/{slug}/` | Public | One therapist profile |
| GET | `/resources/` | Public | Published articles; filter `category` |
| GET | `/resources/{slug}/` | Public | One article |
| GET | `/testimonials/` | Public | Published testimonials |
| GET | `/crisis-contacts/` | Public | Crisis contacts |
| POST | `/enquiries/` | Public | Submit the contact form |

**Therapist — list item**
```json
{
  "slug": "…",
  "honorific": "…",
  "full_name": "…",
  "professional_title": "…",
  "photo_url": "…",
  "specialties": [{ "slug": "…", "name": "…" }]
}
```
The profile endpoint adds `bio`, `cpb_registration_number` and `services`.

**Enquiry — request**
```json
{
  "full_name": "…",
  "email": "…",
  "heard_from": "search",
  "message": "…"
}
```

### Booking

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/booking/services/` | Public | Bookable services |
| GET | `/booking/therapists/?service={slug}` | Public | Therapists offering a service |
| GET | `/booking/slots/` | Public | Available times |
| POST | `/appointments/` | Client | Book an appointment |
| GET | `/appointments/` | Client or Therapist | Own appointments; filter `when=upcoming|past` |
| GET | `/appointments/{id}/` | Participant | One appointment |
| POST | `/appointments/{id}/reschedule/` | Participant | Move to a new time |
| POST | `/appointments/{id}/cancel/` | Participant | Cancel |
| POST | `/appointments/{id}/no-show/` | Therapist | Mark a no-show |
| GET | `/appointments/{id}/calendar.ics` | Participant | Calendar file |

**Slots — query:** `service` (slug), `therapist` (slug, or omitted for no preference), `from` and `to` (dates, at most 14 days apart).

**Slots — response**
```json
{
  "timezone": "Africa/Nairobi",
  "days": [
    {
      "date": "2027-03-14",
      "slots": [
        { "starts_at": "2027-03-14T10:00:00+03:00", "therapist": "…" }
      ]
    }
  ]
}
```

**Book — request.** Sent with an `Idempotency-Key` header.
```json
{
  "service": "trauma-ptsd",
  "therapist": "…",
  "starts_at": "2027-03-14T10:00:00+03:00",
  "child": null
}
```
`child` is the ID of one of the account holder's children, or `null` when the session is for the account holder. Responds `201` with the appointment, `409 slot_unavailable`, or `403 guardian_consent_required` when the child has no current guardian consent. Every appointment is a video call, so there is no session-type field.

**Appointment — response**
```json
{
  "id": "…",
  "reference": "…",
  "status": "confirmed",
  "service": { "slug": "…", "name": "…", "duration_minutes": 45 },
  "child": null,
  "therapist": { "slug": "…", "full_name": "…", "professional_title": "…", "photo_url": "…" },
  "starts_at": "2027-03-14T10:00:00+03:00",
  "ends_at": "2027-03-14T10:45:00+03:00",
  "price_kes": null,
  "can_reschedule": true,
  "can_cancel": true,
  "join_opens_at": "2027-03-14T09:50:00+03:00"
}
```
Therapists receive the same shape with a `client` object (name, phone, emergency contact) in place of `therapist`.

### Video

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/appointments/{id}/join/` | Participant | Get a short-lived room token; `403 too_early` or `403 ended` outside the join window |

### Dashboard

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/dashboard/` | Client | Next appointment, unread message count and progress summary in one call |

### Messaging

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/threads/` | Client or Therapist | Own threads with unread counts |
| POST | `/threads/` | Client | Start a thread with a therapist they have an appointment with |
| GET | `/threads/{id}/messages/` | Participant | Messages, newest first, paginated |
| POST | `/threads/{id}/messages/` | Participant | Send a message |
| POST | `/threads/{id}/read/` | Participant | Mark as read |

### Progress

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/check-ins/` | Client | Own check-ins; filter by date range |
| POST | `/check-ins/` | Client | Record today's check-in |
| GET | `/check-ins/summary/` | Client | Summary for the dashboard |
| GET | `/clients/{id}/check-ins/` | Therapist | A client's check-ins, only if sharing is on |

### Therapist workspace

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET, PATCH | `/workspace/profile/` | Therapist | Own profile; biography editable |
| GET, POST | `/workspace/availability/rules/` | Therapist | Weekly hours |
| PATCH, DELETE | `/workspace/availability/rules/{id}/` | Therapist | Change or remove |
| GET, POST | `/workspace/availability/exceptions/` | Therapist | Time off and extra hours |
| DELETE | `/workspace/availability/exceptions/{id}/` | Therapist | Remove |

### Payments

Added in the payments phase.

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/appointments/{id}/pay/mpesa/` | Client | Start an M-Pesa payment |
| GET | `/appointments/{id}/payment/` | Client | Payment status |
| POST | `/webhooks/mpesa/` | Provider | Payment result; verified by the backend |

### System

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/health/live/` | Public | Process is running |
| GET | `/health/ready/` | Internal | Database and Redis reachable |
| GET | `/schema/` | Non-production | OpenAPI schema |

## Rate limits

Indicative starting values, tuned after launch.

| Endpoint group | Limit |
|---|---|
| Sign-in | 5 per minute per IP address, plus per-account lockout |
| Register, forgot password, resend verification | 5 per hour per IP address |
| Enquiries | 3 per hour per IP address |
| Sending messages | 30 per hour per user |
| Other signed-in requests | 120 per minute per user |
| Other public requests | 60 per minute per IP address |

## Versioning

Breaking changes are released under a new path version (`/api/v2/`). Adding fields or endpoints is not a breaking change; the frontend must ignore fields it does not recognise.
