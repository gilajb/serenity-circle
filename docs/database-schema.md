# Database schema

PostgreSQL, managed through Django migrations. This is the planned model; field names follow Django conventions.

Conventions:
- Every table has `id` (UUID primary key), `created_at` and `updated_at` unless noted. UUIDs are used so record addresses cannot be guessed or counted.
- Timestamps are stored in UTC.
- Money is stored as whole Kenyan Shillings in integer fields named `*_kes`.
- Phone numbers are stored in E.164 form (`+2547XXXXXXXX`).
- 🔒 marks fields encrypted at field level in addition to disk encryption.

## Relationships

```
ClientProfile ─< ChildProfile ─< Appointment (optional)

User ─┬─ 1:1 ─ ClientProfile ──┬─< Appointment >── TherapistProfile ─ 1:1 ─ User
      │                        ├─< CheckIn                │
      └─< ConsentRecord        └─< MessageThread >────────┤
                                       └─< Message        ├─>< Specialty
Service ─>< TherapistProfile                              ├─< AvailabilityRule
Service ─< Appointment ─ 1:1 ─ VideoRoom                  └─< AvailabilityException
Appointment ─< AppointmentEvent
Appointment ─< Payment
```

## accounts

### User
Custom user model; email is the login.

| Field | Type | Notes |
|---|---|---|
| email | citext, unique | Case-insensitive |
| password | text | Argon2 hash |
| full_name | text | |
| phone | text | E.164 |
| role | enum | `client`, `therapist`, `admin` |
| is_active | bool | |
| email_verified_at | timestamp, null | |
| two_factor_enabled | bool | Required true for therapist and admin |
| last_login | timestamp, null | |

### ClientProfile

| Field | Type | Notes |
|---|---|---|
| user | one-to-one → User | |
| preferred_name | text | Used in the dashboard greeting |
| date_of_birth | date, null 🔒 | Only to confirm the client is an adult |
| emergency_contact_name | text 🔒 | |
| emergency_contact_phone | text 🔒 | |
| share_checkins_with_therapist | bool | Default false |
| deletion_requested_at | timestamp, null | |

### ChildProfile
A child aged 3 to 18 for whom the account holder books sessions. A child has no `User` and cannot sign in.

| Field | Type | Notes |
|---|---|---|
| guardian | → ClientProfile | The parent or guardian who holds the account |
| full_name | text 🔒 | |
| date_of_birth | date 🔒 | Age must be 3 to 18 on the session date |
| relationship | enum | `parent`, `legal_guardian` |
| is_active | bool | False once removed or aged out |

Guardian consent is current when the latest `ConsentRecord` of kind `guardian` for the child has `granted` true.

### ConsentRecord
An append-only history; rows are never updated.

| Field | Type | Notes |
|---|---|---|
| user | → User | The person giving consent |
| child | → ChildProfile, null | Set for `guardian` consent |
| kind | enum | `terms`, `privacy`, `health_data`, `guardian`, `sms`, `testimonial` |
| document_version | text | Version of the text agreed to |
| granted | bool | False records a withdrawal |
| ip_address | inet | |
| recorded_at | timestamp | |

## therapists

### Specialty

| Field | Type | Notes |
|---|---|---|
| name | text, unique | e.g. "Grief & Loss" |
| slug | slug, unique | |
| display_order | int | |

### TherapistProfile

| Field | Type | Notes |
|---|---|---|
| user | one-to-one → User | |
| slug | slug, unique | Profile page address |
| honorific | text | "Dr.", "Ms.", "Mr." — as verified |
| professional_title | text | e.g. "Clinical Psychologist" |
| bio | text | |
| photo | file | |
| cpb_registration_number | text | Counsellors and Psychologists Board |
| licence_expires_on | date | |
| specialties | many-to-many → Specialty | |
| services | many-to-many → Service | |
| profile_consent_at | timestamp, null | Consent to publish profile and photograph |
| is_published | bool | |
| display_order | int | |

A profile is listed publicly only when `is_published` is true, `cpb_registration_number` is set, `licence_expires_on` is in the future and `profile_consent_at` is set.

## services

### Service

| Field | Type | Notes |
|---|---|---|
| name | text | e.g. "Trauma & PTSD" |
| slug | slug, unique | |
| summary | text | Card text |
| description | text | Detail page |
| icon | text | Icon key |
| image | file, null | Booking card image |
| duration_minutes | int | 45 for every service |
| price_kes | int, null | Null until fees are confirmed |
| is_bookable | bool | Appears in the booking flow |
| is_published | bool | Appears on the Services page |
| display_order | int | |

## scheduling

### AvailabilityRule
A therapist's recurring weekly hours.

| Field | Type | Notes |
|---|---|---|
| therapist | → TherapistProfile | |
| weekday | smallint | 0 = Monday |
| start_time | time | In Africa/Nairobi |
| end_time | time | |

### AvailabilityException
One-off changes.

| Field | Type | Notes |
|---|---|---|
| therapist | → TherapistProfile | |
| starts_at | timestamp | |
| ends_at | timestamp | |
| kind | enum | `unavailable`, `extra` |
| note | text | Private to the therapist |

### Appointment

| Field | Type | Notes |
|---|---|---|
| reference | text, unique | Short human-readable code for emails and support |
| client | → ClientProfile | The account holder |
| child | → ChildProfile, null | Set when the session is for a child; must belong to `client` |
| therapist | → TherapistProfile | |
| service | → Service | |
| starts_at | timestamp | |
| ends_at | timestamp | |
| status | enum | `pending_payment`, `confirmed`, `completed`, `cancelled`, `no_show` |
| price_kes | int, null | Copied from the service at booking |
| cancelled_by | → User, null | |
| cancellation_reason | text | |
| rescheduled_from | → Appointment, null | |

Constraints:
- **No double-booking.** An exclusion constraint prevents two appointments for the same therapist with overlapping `[starts_at, ends_at)` ranges while status is `pending_payment` or `confirmed`. Requires the `btree_gist` extension.
- `ends_at` is after `starts_at`.
- Indexes on (`therapist`, `starts_at`) and (`client`, `starts_at`).

Every appointment is a one-to-one video call, so there is no session-type, format or capacity field.

### AppointmentEvent
The history of an appointment; append-only.

| Field | Type | Notes |
|---|---|---|
| appointment | → Appointment | |
| actor | → User, null | Null for system actions |
| event | enum | `created`, `confirmed`, `rescheduled`, `cancelled`, `completed`, `no_show`, `reminder_sent` |
| detail | jsonb | |
| occurred_at | timestamp | |

## sessions_video

### VideoRoom

| Field | Type | Notes |
|---|---|---|
| appointment | one-to-one → Appointment | |
| provider | text | |
| room_name | text, unique | Random, not derived from names or dates |
| opens_at | timestamp | |
| closes_at | timestamp | |

Access tokens are issued on request and never stored.

## messaging

### MessageThread

| Field | Type | Notes |
|---|---|---|
| client | → ClientProfile | |
| therapist | → TherapistProfile | |
| last_message_at | timestamp | |

Unique on (`client`, `therapist`).

### Message

| Field | Type | Notes |
|---|---|---|
| thread | → MessageThread | |
| sender | → User | |
| body | text 🔒 | |
| read_at | timestamp, null | |

## progress

### CheckIn

| Field | Type | Notes |
|---|---|---|
| client | → ClientProfile | |
| recorded_on | date | One per client per day |
| anxiety | smallint | 1–5 |
| sleep | smallint | 1–5 |
| mood | smallint | 1–5 |
| note | text 🔒 | Optional |

## content

### Resource

| Field | Type | Notes |
|---|---|---|
| title | text | |
| slug | slug, unique | |
| summary | text | |
| body | text | |
| cover_image | file, null | |
| category | text | |
| author | → User, null | |
| published_at | timestamp, null | Null = draft |

### Testimonial

| Field | Type | Notes |
|---|---|---|
| quote | text | |
| attribution | text | Initials only, e.g. "A. W." |
| service | → Service, null | |
| consent_document | file | Evidence of written consent; private |
| is_published | bool | Cannot be true without `consent_document` |

### CrisisContact

| Field | Type | Notes |
|---|---|---|
| name | text | |
| phone | text | |
| description | text | Hours and what the service offers |
| last_verified_on | date | |
| display_order | int | |
| is_active | bool | |

## enquiries

### ContactEnquiry

| Field | Type | Notes |
|---|---|---|
| full_name | text | |
| email | text | |
| heard_from | enum | Options for "How did you hear about us?" |
| message | text 🔒 | People may include personal details |
| status | enum | `new`, `in_progress`, `closed` |
| handled_by | → User, null | |

## notifications

### Notification

| Field | Type | Notes |
|---|---|---|
| user | → User, null | |
| channel | enum | `email`, `sms` |
| template | text | |
| recipient | text | |
| status | enum | `queued`, `sent`, `failed` |
| attempts | int | |
| provider_reference | text | |
| sent_at | timestamp, null | |

Message bodies are not stored.

## payments

Built in the payments phase.

### Payment

| Field | Type | Notes |
|---|---|---|
| appointment | → Appointment | |
| method | enum | `mpesa`, `card` |
| amount_kes | int | |
| status | enum | `initiated`, `succeeded`, `failed`, `refunded` |
| provider_reference | text, unique | |
| mpesa_receipt | text | |
| phone_last4 | text | Last four digits only |
| raw_callback | jsonb | With personal fields removed |

## audit

### AuditLog
Append-only. The application's database role has insert and select permission only on this table.

| Field | Type | Notes |
|---|---|---|
| actor | → User, null | |
| action | text | e.g. `client.view`, `appointment.cancel`, `data.export` |
| object_type | text | |
| object_id | uuid | |
| ip_address | inet | |
| metadata | jsonb | Never contains the personal data itself |
| occurred_at | timestamp | |

## Retention and deletion

Retention periods are set by the practice ([question L4](open-questions.md#legal-and-compliance)). The schema supports them as follows:

- Account deletion anonymises the `User` and `ClientProfile` and removes messages and check-ins, while keeping appointment and payment records for the period the practice is required to hold them.
- Contact enquiries are deleted a fixed period after they are closed.
- Notification records are deleted after a fixed period.
- A scheduled job applies these rules daily and writes what it did to the audit log.
