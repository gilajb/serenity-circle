# Product Requirements Document

**Product:** Serenity Circle+ website and client platform
**Status:** Draft for product-owner review

## 1. Purpose

Serenity Circle+ wants therapy to fit into people's lives rather than disrupt them. The platform is how that promise is delivered online: it explains the practice, helps a visitor find a suitable therapist, lets them book in a few minutes, and gives them one place to manage their sessions afterwards.

## 2. Problem

People in Kenya who want therapy face practical barriers: cost, busy schedules, travel, discomfort with clinical settings, and not knowing where to start. Many practices take bookings by phone or WhatsApp, which adds friction and gives clients no view of their own appointments.

## 3. Goals

| Goal | How we will know |
|---|---|
| A first-time visitor understands what Serenity Circle+ offers and trusts it | Visitors reach the booking flow or contact form from the public pages |
| Booking a session is quick and self-service | A new client can complete a booking without contacting the practice |
| Clients manage their own sessions | Reschedules and cancellations happen in the dashboard, not by phone |
| Client data is protected to the standard health data requires | No security or privacy incidents; compliance with the Kenya Data Protection Act |
| Anyone in crisis is pointed to immediate help | Crisis contacts are reachable from every page |

Numeric targets will be set once the site has baseline traffic.

## 4. Users

**Prospective client.** Someone considering therapy, possibly for the first time, often on a phone. Needs reassurance, clear information and an easy first step.

**Parent or guardian.** Looking for support for a child aged 3 to 18. Holds the account, gives consent for the child and manages the child's sessions.

**Client.** Has an account. Wants to book, reschedule, join a session and contact their therapist without friction.

**Therapist.** A registered counsellor or psychologist with the practice. Wants an accurate calendar, control of their availability and a simple way to start a video session.

**Practice administrator.** Runs the practice day to day. Manages therapists, services, content and enquiries.

## 5. Scope

Serenity Circle+ offers **virtual individual therapy** only, in five areas: Child Therapy, Education, Anxiety & ADHD, Stress & Depression, and Trauma & PTSD. Every session is one-to-one, by video call, and lasts a fixed 45 minutes. The practice has no physical premises.

Child Therapy is for ages 3 to 18. A child never has their own account: a parent or guardian registers, adds the child, gives consent on the website and books on the child's behalf.

### Launch state

The practice has no therapists yet. Until the first verified therapist is published:

- the Directory shows a "coming soon" notice in place of the therapist grid;
- online booking is switched off, and every "Book a Session" button leads to the Contact page;
- the public site, contact form and crisis support work fully.

When the first therapist is published, the directory and booking switch on by themselves, with no code change.

### In scope

**Public website**
- Home, About Us, Services, Directory, Resources, Contact
- Therapist profile pages
- Crisis Support, Privacy Policy, Terms of Service

**Accounts**
- Client registration with email verification, sign in, password reset
- Therapist and administrator accounts created by the practice

**Booking**
- Four steps: Service → Therapist → Time → Confirm
- Confirmation by email and SMS, with reminders before the session
- Reschedule and cancel within the practice's policy

**Client dashboard**
- Upcoming session with reschedule and "Join Waiting Room"
- Book a new session
- Message your therapist
- Progress tracker

**Therapist workspace**
- Upcoming appointments
- Weekly availability and time off
- Start a video session, reply to messages

**Administration**
- Manage therapists, services, specialities, resources, testimonials and enquiries

**Video sessions**
- Private video room per appointment, joined from the dashboard

**Payments** (later phase, pending [decision P1](open-questions.md#product-decisions))
- M-Pesa and card payment for sessions

### Out of scope

Not offered by the practice, so not built:

- In-person sessions
- Couples, family and group sessions

### Out of scope for the first release

- Clinical session notes and treatment records
- Native mobile apps
- Insurance claims
- Languages other than English (Kiswahili is a likely next step; the frontend will be built so it can be added)
- Self-registration for therapists
- Live chat and AI chat assistants

## 6. Key user journeys

### Finding a therapist and booking
1. A visitor lands on Home and reads what the practice offers.
2. They open the Directory, filter by speciality, and open a therapist's profile.
3. They choose "Book a Session". If they are not signed in, they register or sign in and are returned to the booking flow.
4. They pick a service, confirm the therapist, pick a time shown in East Africa Time, review and confirm.
5. They receive confirmation by email and SMS and see the session on their dashboard.

### Attending a session
1. The client receives a reminder the day before and shortly before the session.
2. They open the dashboard and choose "Join Waiting Room".
3. The therapist admits them and the session takes place by video.

### Changing a session
1. The client chooses "Reschedule" on the dashboard.
2. They pick a new time from the therapist's availability, or cancel.
3. Both client and therapist are notified. Changes inside the notice period follow the practice's cancellation policy.

### Getting in touch
1. A visitor completes the Contact form.
2. They see confirmation that the message was received; the practice is notified and replies by email.

### Needing urgent help
1. A visitor in distress sees the Immediate Support information, available from every page.
2. They are shown Kenyan emergency and helpline numbers they can tap to call.

## 7. Feature priorities

| Priority | Features |
|---|---|
| Must have | Public pages, directory with filters, accounts, booking flow, dashboard with upcoming session, reschedule and cancel, email notifications, contact form, crisis support, admin management, privacy and security controls |
| Should have | Video sessions inside the platform, SMS reminders, messaging, resources library, therapist workspace |
| Could have | Progress tracker, online payments, testimonials |
| Not now | Clinical notes, mobile apps, insurance, additional languages |

## 8. Product principles

1. **Calm and clear.** Visitors may be anxious. Pages are uncluttered, language is warm and plain, and nothing is urgent or pushy.
2. **Never a dead end.** Every page offers a next step: book, browse therapists or get in touch.
3. **Honest.** No invented testimonials, credentials, statistics or contact details. Claims such as "affordable" and "within 24h" are published only if the practice can stand behind them.
4. **Private by default.** Collect only what is needed, show only what the viewer is entitled to see.
5. **Safe.** The platform is not an emergency service and says so wherever a client might otherwise rely on it in a crisis.
6. **Works on a phone, on a slow connection.** Most Kenyan visitors will be on mobile data.

## 9. Constraints

- Frontend in React, backend in Django, database in PostgreSQL.
- Kenyan locale: East Africa Time, KES, Kenyan phone numbers.
- British spelling ("counselling").
- Must comply with the Kenya Data Protection Act, 2019; practitioners must be registered and licensed under the Counsellors and Psychologists Act, 2014.
- The visual design follows the approved mockups, with the navigation, header and footer unified as described in [design-system.md](design-system.md).

## 10. Risks

| Risk | Response |
|---|---|
| Real business content is not ready when pages are built | Track every item in [open-questions.md](open-questions.md); pages that depend on missing content are not published |
| A data breach exposes that someone is receiving therapy | Controls in [security.md](security.md); minimal data collection; independent security test before launch |
| A client in crisis uses messaging or the contact form expecting an immediate reply | Clear "not for emergencies" notices with crisis numbers at each of these points |
| Poor video quality on mobile networks | Choose a provider that adapts to low bandwidth; offer audio-only fallback |
| Double-booked appointments | Enforced by a database constraint, not only application checks |
| Unverified practitioners listed | A profile cannot be published without a registration number and unexpired licence date |

## 11. Dependencies

- Answers to [open-questions.md](open-questions.md), especially a domain and mailbox (N6), whether adults are seen (N7), the guardian consent wording (N9), and the first therapist (N8, T1–T5) before booking can open.
- Legal documents (L2) and regulator registration (L1) before launch.
- Accounts with email, SMS, video and (later) payment providers.
