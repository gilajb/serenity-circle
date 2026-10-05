# Software Requirements Specification

**System:** Serenity Circle+ website and client platform

## 1. Introduction

### 1.1 Purpose
This document states what the system must do, as numbered requirements that can each be built and tested. It is the reference for developers and testers. The product reasoning is in the [PRD](PRD.md).

### 1.2 Scope
A web application with a public marketing site, a therapist directory, appointment booking, a client dashboard, a therapist workspace and administration tools.

### 1.3 Definitions

| Term | Meaning |
|---|---|
| Visitor | Anyone using the site without signing in |
| Client | A signed-in user who books and attends sessions |
| Therapist | A registered counsellor or psychologist practising with Serenity Circle+ |
| Administrator | Practice staff who manage the platform |
| Appointment | A booked session between a client and a therapist |
| Service | A type of session, with a duration and a fee |
| EAT | East Africa Time, UTC+3, time zone `Africa/Nairobi` |
| CPB | Counsellors and Psychologists Board of Kenya |
| DPA | Kenya Data Protection Act, 2019 |

### 1.4 Requirement keywords
"Must" is mandatory for the release it belongs to. "Should" is expected unless there is a recorded reason. Each requirement carries a priority: **M** (must), **S** (should), **C** (could).

## 2. Overall description

### 2.1 System context
The system is a React single-page application served to browsers, talking over HTTPS to a Django REST API backed by PostgreSQL. It integrates with external providers for email, SMS, video and, later, payments. See [architecture.md](architecture.md).

### 2.2 User classes

| Class | Access |
|---|---|
| Visitor | Public pages, directory, contact form, registration |
| Client | Own profile, appointments, messages and check-ins |
| Therapist | Own profile, availability, appointments and message threads with own clients |
| Administrator | All management functions; access to client data is limited and audited |

### 2.3 Operating environment
- Current and previous major versions of Chrome, Safari, Firefox and Edge, on desktop and mobile.
- Screen widths from 360px upward.
- Usable on a 3G-class mobile connection.

### 2.4 Assumptions and dependencies
- The practice supplies all real content ([open-questions.md](open-questions.md)).
- Third-party providers are available for email, SMS and video.
- All sessions are one-to-one video calls; the practice has no premises.
- Every session lasts 45 minutes.
- Account holders are adults. Children aged 3 to 18 are seen with the consent of a parent or guardian, who holds the account and books for them.

## 3. Functional requirements

### 3.1 Public website

| ID | Requirement | Pri |
|---|---|---|
| FR-PUB-01 | The system must provide the pages Home, About Us, Services, Directory, Resources and Contact, reachable from the main navigation. | M |
| FR-PUB-02 | Every page must show the same navy header, navigation and footer defined in [design-system.md](design-system.md). | M |
| FR-PUB-03 | Every page must offer a "Book a Session" action that leads to the booking flow. | M |
| FR-PUB-04 | The Services page must list each active service with its name, description and a link to more detail, drawn from the services managed by administrators. | M |
| FR-PUB-05 | The footer copyright year must be the current year in EAT. | M |
| FR-PUB-06 | The system must provide Privacy Policy, Terms of Service and Crisis Support pages, linked from the footer. | M |
| FR-PUB-07 | The Home page must show testimonials only when at least one published testimonial with recorded consent exists. | S |
| FR-PUB-08 | Each public page must have a unique title and description for search engines and link previews. | S |
| FR-PUB-09 | The Resources section must list published articles and show each on its own page. | S |

### 3.2 Therapist directory

| ID | Requirement | Pri |
|---|---|---|
| FR-DIR-01 | The Directory must list all published therapists with photograph, name, professional title and specialities. | M |
| FR-DIR-02 | Visitors must be able to filter by one or more specialities. | M |
| FR-DIR-07 | While no therapist is published, the Directory must show a "coming soon" notice in place of the filters and results, with a link to the Contact page. It must show real profiles automatically once one is published. | M |
| FR-DIR-03 | Filters must be reflected in the page address so a filtered view can be shared or reloaded. | S |
| FR-DIR-04 | Each therapist must have a profile page with biography, specialities, CPB registration number and a "Book a Session" action that preselects that therapist. | M |
| FR-DIR-05 | A therapist must not appear in the directory unless their profile is marked published, a CPB registration number is recorded and their licence expiry date is in the future. | M |
| FR-DIR-06 | When no therapist matches the filters, the page must say so and offer to clear the filters. | M |

### 3.3 Accounts and authentication

| ID | Requirement | Pri |
|---|---|---|
| FR-ACC-01 | A visitor must be able to register as a client with full name, email address, Kenyan mobile number and password. | M |
| FR-ACC-02 | Registration must require agreement to the Terms of Service and Privacy Policy, and separate explicit consent to the processing of health-related data. The version and time of each consent must be recorded. | M |
| FR-ACC-03 | The system must verify the email address before the client can book. | M |
| FR-ACC-04 | Users must be able to sign in with email and password, and sign out. | M |
| FR-ACC-05 | Users must be able to reset a forgotten password through a single-use, time-limited link sent by email. | M |
| FR-ACC-06 | Responses to sign-in, registration and password reset must not reveal whether an email address has an account. | M |
| FR-ACC-07 | Therapist and administrator accounts must be created by an administrator only. | M |
| FR-ACC-08 | Therapist and administrator accounts must use two-factor authentication. | M |
| FR-ACC-09 | Clients should be able to enable two-factor authentication. | S |
| FR-ACC-10 | A client must be able to view and update their profile, and add an emergency contact. | M |
| FR-ACC-11 | A client must be able to download their personal data and request deletion of their account. | M |
| FR-ACC-12 | Sessions must end after a period of inactivity and on sign-out. | M |

### 3.4 Booking

| ID | Requirement | Pri |
|---|---|---|
| FR-BKG-01 | Booking must proceed through four steps — Service, Therapist, Time, Confirm — with a progress indicator showing the current step. | M |
| FR-BKG-02 | Step 1 must show each bookable service with name, description and duration. | M |
| FR-BKG-03 | Step 2 must show only therapists who offer the selected service. | M |
| FR-BKG-04 | Step 3 must show only times at which the selected therapist is available for the full duration of the service. | M |
| FR-BKG-05 | All times must be displayed in EAT and labelled as such. | M |
| FR-BKG-06 | Step 4 must show the service, therapist, date, time, duration and fee before the client confirms, and state that the session is a video call. | M |
| FR-BKG-07 | The system must prevent two active appointments for the same therapist overlapping, including when two clients confirm at the same moment. | M |
| FR-BKG-08 | If the chosen time is no longer available at confirmation, the system must say so and return the client to step 3 with their other choices kept. | M |
| FR-BKG-09 | A visitor who starts booking must be asked to sign in or register and then returned to the flow with their selections kept. | M |
| FR-BKG-10 | The client must be able to go back to earlier steps or cancel the flow without creating an appointment. | M |
| FR-BKG-11 | Appointments must not be bookable less than a configurable minimum notice period ahead, nor further ahead than a configurable maximum. | M |
| FR-BKG-12 | On confirmation, the client and therapist must each receive a confirmation. | M |
| FR-BKG-13 | A client must be able to reschedule or cancel an appointment, subject to the configured notice period. | M |
| FR-BKG-14 | A therapist or administrator must be able to cancel an appointment with a reason; the client must be notified. | M |
| FR-BKG-15 | Every change of appointment status must be recorded with who made it and when. | M |
| FR-BKG-16 | While no therapist is published, online booking must be unavailable and every "Book a Session" action must lead to the Contact page. | M |
| FR-BKG-17 | Every bookable session must last 45 minutes. | M |
| FR-BKG-18 | When booking, the account holder must state whether the session is for themselves or for one of their registered children. | M |
| FR-BKG-19 | A session for a child must not be confirmed unless current guardian consent is recorded for that child. | M |

### 3.4a Children and guardian consent

| ID | Requirement | Pri |
|---|---|---|
| FR-CHD-01 | Only an adult may hold an account. A child must never have their own sign-in. | M |
| FR-CHD-02 | An account holder must be able to add a child with the child's name and date of birth, and their own relationship to the child. | M |
| FR-CHD-03 | The system must accept a child only if their age is from 3 to 18 on the date of the session. | M |
| FR-CHD-04 | Before a child's first booking, the account holder must declare that they are the child's parent or legal guardian and give explicit consent to therapy for the child and to the processing of the child's health-related data. | M |
| FR-CHD-05 | Guardian consent must be recorded per child with the consent text version, time and IP address, and must be withdrawable. | M |
| FR-CHD-06 | Withdrawing guardian consent must cancel that child's future sessions after a clear warning. | M |
| FR-CHD-07 | The therapist must see the child's name and age, and the guardian's name and contact number, for each child session. | M |
| FR-CHD-08 | Notifications about a child's session must go to the guardian only. | M |
| FR-CHD-09 | When a child turns 18 the guardian's consent must stop applying; further sessions require the young person's own account and consent. | S |

### 3.5 Client dashboard

| ID | Requirement | Pri |
|---|---|---|
| FR-DSH-01 | The dashboard must greet the client by preferred name with a greeting matching the time of day in EAT. | M |
| FR-DSH-02 | The dashboard must show the client's next appointment with therapist, service, and date and time. | M |
| FR-DSH-03 | When the client has no upcoming appointment, the dashboard must say so and offer to book one. | M |
| FR-DSH-04 | The client must be able to view all upcoming and past appointments. | M |
| FR-DSH-05 | "Join Waiting Room" must be enabled only from a configurable time before the session starts until it ends. | M |
| FR-DSH-06 | The dashboard must offer "Book New Session" and "Message Your Therapist". | M |
| FR-DSH-07 | The dashboard must show the Progress Tracker when the client has recorded check-ins, and an invitation to check in when they have not. | C |

### 3.6 Video sessions

| ID | Requirement | Pri |
|---|---|---|
| FR-VID-01 | Each video appointment must have its own private room. | S |
| FR-VID-02 | Only the appointment's client and therapist may obtain access to the room, using a short-lived token issued by the backend. | S |
| FR-VID-03 | The client must wait in a waiting room until the therapist admits them. | S |
| FR-VID-04 | Sessions must not be recorded. | M |
| FR-VID-05 | The join screen must let the user check camera and microphone before entering. | S |

### 3.7 Messaging

| ID | Requirement | Pri |
|---|---|---|
| FR-MSG-01 | A client must be able to exchange messages with a therapist they have an appointment with. | S |
| FR-MSG-02 | Only the two participants of a thread may read it. | M |
| FR-MSG-03 | The messaging screen must state that messages are not monitored for emergencies and show crisis contacts. | M |
| FR-MSG-04 | The recipient must be notified of a new message by email; the notification must not contain the message text. | S |
| FR-MSG-05 | Unread message counts must be shown to each participant. | S |

### 3.8 Progress tracking

| ID | Requirement | Pri |
|---|---|---|
| FR-PRG-01 | A client must be able to record a check-in rating their anxiety, sleep and mood. | C |
| FR-PRG-02 | The dashboard must summarise recent check-ins per measure, labelled as self-reported. | C |
| FR-PRG-03 | A client's check-ins must be visible only to that client and, with the client's consent, to their therapist. | M |

### 3.9 Contact and crisis support

| ID | Requirement | Pri |
|---|---|---|
| FR-CON-01 | The contact form must collect full name, email address, how the visitor heard about the practice and a message. | M |
| FR-CON-02 | The contact form must not collect date of birth. | M |
| FR-CON-03 | A submitted enquiry must be stored, the practice must be notified, and the visitor must see confirmation. | M |
| FR-CON-04 | The contact form must be protected against automated spam. | M |
| FR-CON-05 | The Contact page must show Immediate Support information with Kenyan emergency and helpline numbers as tap-to-call links. | M |
| FR-CON-06 | The Contact page must show the practice's phone number (+254 707 176 183) and email address (evecmain@gmail.com) as tap-to-call and tap-to-email links, and a WhatsApp link to the same number. It must not show a physical address or a map, because the practice has no premises. | M |
| FR-CON-07 | Crisis contacts must be editable by administrators without a code change. | S |

### 3.10 Therapist workspace

| ID | Requirement | Pri |
|---|---|---|
| FR-THR-01 | A therapist must be able to view their upcoming and past appointments. | M |
| FR-THR-02 | A therapist must be able to set recurring weekly availability and one-off unavailable or additional periods. | M |
| FR-THR-03 | A therapist must be able to edit their biography; changes to name, title, registration number and licence date require an administrator. | S |
| FR-THR-04 | A therapist must be able to start the video session for an appointment and admit the client. | S |
| FR-THR-05 | A therapist must see only the clients they have appointments with, and only the client details needed to deliver the session. | M |

### 3.11 Administration

| ID | Requirement | Pri |
|---|---|---|
| FR-ADM-01 | Administrators must be able to create, edit, publish and unpublish therapist profiles. | M |
| FR-ADM-02 | Administrators must be able to manage services, including name, description, duration, fee and whether each is bookable. | M |
| FR-ADM-03 | Administrators must be able to manage specialities, resources, testimonials and crisis contacts. | M |
| FR-ADM-04 | Administrators must be able to view and update the status of contact enquiries. | M |
| FR-ADM-05 | Administrators must be able to view, reschedule and cancel appointments. | M |
| FR-ADM-06 | The system must warn administrators when a therapist's licence expiry date is within 60 days. | S |
| FR-ADM-07 | Administrator access to client records must be written to the audit log. | M |

### 3.12 Notifications

| ID | Requirement | Pri |
|---|---|---|
| FR-NOT-01 | The system must send email for: email verification, password reset, booking confirmation, reschedule, cancellation, and new-message alerts. | M |
| FR-NOT-02 | The system must send appointment reminders 24 hours and 1 hour before the session. | M |
| FR-NOT-03 | The system should send booking confirmations and reminders by SMS to Kenyan mobile numbers. | S |
| FR-NOT-04 | Notifications must contain the minimum detail needed and must not include clinical information. SMS must not state the nature of the service. | M |
| FR-NOT-05 | Failed notifications must be retried and logged. | M |

### 3.13 Payments

Subject to [decision P1](open-questions.md#product-decisions).

| ID | Requirement | Pri |
|---|---|---|
| FR-PAY-01 | A client must be able to pay for an appointment by M-Pesa. | C |
| FR-PAY-02 | A client should be able to pay by card through a certified payment provider. | C |
| FR-PAY-03 | The system must never store card numbers or M-Pesa PINs. | M |
| FR-PAY-04 | Payment status must be updated from the provider's server-to-server confirmation, never from the browser alone. | M |
| FR-PAY-05 | The client must receive a receipt showing the amount in KES. | C |

## 4. External interface requirements

### 4.1 User interface
- Follows [design-system.md](design-system.md).
- Responsive from 360px to large desktop.
- Meets WCAG 2.1 level AA.

### 4.2 Software interfaces

| Interface | Purpose |
|---|---|
| Email provider | Transactional email |
| SMS provider | Confirmations and reminders to Kenyan numbers |
| Video provider | Private session rooms |
| Payment provider (later) | M-Pesa and card payments |

Each provider is accessed through a backend adapter so it can be replaced without changing the rest of the system.

### 4.3 Communication
All traffic uses HTTPS. The frontend talks to the backend through the REST API in [api-specification.md](api-specification.md).

## 5. Non-functional requirements

### 5.1 Performance

| ID | Requirement |
|---|---|
| NFR-PERF-01 | Public pages must reach Largest Contentful Paint within 2.5 seconds on a mid-range phone on a 4G connection. |
| NFR-PERF-02 | API read requests must respond within 500 ms at the 95th percentile under expected load. |
| NFR-PERF-03 | The initial JavaScript for public pages must not exceed 200 KB compressed; signed-in areas are loaded separately. |
| NFR-PERF-04 | Images must be served in modern formats, sized for the device and lazy-loaded below the fold. |

### 5.2 Security
Full detail in [security.md](security.md).

| ID | Requirement |
|---|---|
| NFR-SEC-01 | All traffic must be encrypted with TLS 1.2 or higher. |
| NFR-SEC-02 | Passwords must be stored using Argon2. |
| NFR-SEC-03 | Every API endpoint must enforce authorisation on the server for the specific record requested. |
| NFR-SEC-04 | Sign-in, registration, password reset and contact endpoints must be rate limited. |
| NFR-SEC-05 | Sensitive data must be encrypted at rest. |
| NFR-SEC-06 | Access to and changes of client data must be recorded in an audit log that cannot be edited through the application. |
| NFR-SEC-07 | Logs and error reports must not contain personal or health data. |

### 5.3 Privacy and compliance
Full detail in [privacy-and-compliance.md](privacy-and-compliance.md).

| ID | Requirement |
|---|---|
| NFR-PRV-01 | The system must collect only the personal data needed for each function. |
| NFR-PRV-02 | The system must support data subject rights under the DPA: access, correction, deletion, objection and portability. |
| NFR-PRV-03 | The system must apply the retention periods defined by the practice. |
| NFR-PRV-04 | No advertising or cross-site tracking technologies may be used. |

### 5.4 Reliability and availability

| ID | Requirement |
|---|---|
| NFR-REL-01 | The service must be available 99.5% of each month, excluding announced maintenance. |
| NFR-REL-02 | The database must be backed up daily, with point-in-time recovery, and backups must be encrypted. |
| NFR-REL-03 | Restoring from backup must be tested at least quarterly. |
| NFR-REL-04 | Failure of an external provider must not prevent a client from viewing their appointments. |

### 5.5 Usability and accessibility

| ID | Requirement |
|---|---|
| NFR-USE-01 | The site must meet WCAG 2.1 AA, including keyboard operation, visible focus, text contrast and screen-reader labels. |
| NFR-USE-02 | Forms must show clear, specific error messages next to the field concerned. |
| NFR-USE-03 | Every state must be designed: loading, empty, error and success. |
| NFR-USE-04 | Motion must respect the user's reduced-motion preference. |

### 5.6 Localisation

| ID | Requirement |
|---|---|
| NFR-LOC-01 | Dates and times must be shown in EAT; the backend stores them in UTC. |
| NFR-LOC-02 | Money must be shown in Kenyan Shillings as `KES 3,500`. |
| NFR-LOC-03 | Phone numbers must be accepted in Kenyan local or international form and stored in E.164 (`+2547XXXXXXXX`). |
| NFR-LOC-04 | Text must use British spelling per the [content style guide](content-style-guide.md). |
| NFR-LOC-05 | User-facing text must be held so that Kiswahili can be added later without restructuring. |

### 5.7 Maintainability

| ID | Requirement |
|---|---|
| NFR-MNT-01 | Code must pass automated linting, formatting, type checks and tests before it can be merged. |
| NFR-MNT-02 | The API must be versioned and documented by a generated OpenAPI schema. |
| NFR-MNT-03 | Configuration and secrets must come from the environment, never from source code. |
| NFR-MNT-04 | Database changes must be made through Django migrations. |

## 6. Data requirements
See [database-schema.md](database-schema.md). All timestamps are stored in UTC. Money is stored as whole Kenyan Shillings. Records containing client data are never hard-deleted by ordinary application actions; deletion follows the retention rules.

## 7. Acceptance
A requirement is met when it has passing automated tests where practical, has been checked against this document by someone other than the author, and behaves correctly on a phone and a desktop. The release gate is in [testing-strategy.md](testing-strategy.md).
