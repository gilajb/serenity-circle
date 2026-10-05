# Frontend features

The React application: every page, what it contains and how it behaves. Visual rules are in [design-system.md](design-system.md); wording rules are in [content-style-guide.md](content-style-guide.md). Requirement IDs refer to the [SRS](SRS.md).

## Routes

| Path | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/about` | About Us | Public |
| `/services` | Services | Public |
| `/services/:slug` | Service detail | Public |
| `/directory` | Therapist directory | Public |
| `/directory/:slug` | Therapist profile | Public |
| `/resources` | Resources | Public |
| `/resources/:slug` | Resource article | Public |
| `/contact` | Contact | Public |
| `/crisis-support` | Crisis Support | Public |
| `/privacy` | Privacy Policy | Public |
| `/terms` | Terms of Service | Public |
| `/sign-in`, `/register`, `/verify-email`, `/forgot-password`, `/reset-password` | Account access | Signed out |
| `/book` | Booking flow | Client (sign-in requested during the flow) |
| `/dashboard` | Client dashboard | Client |
| `/dashboard/sessions` | All sessions | Client |
| `/dashboard/messages` | Messages | Client |
| `/dashboard/progress` | Progress and check-ins | Client |
| `/dashboard/children` | Children and guardian consent | Client |
| `/dashboard/profile` | Profile, privacy and security | Client |
| `/session/:reference` | Waiting room and video session | Client or therapist of that appointment |
| `/workspace` | Therapist workspace | Therapist |
| `/workspace/availability` | Availability | Therapist |
| `/workspace/messages` | Messages | Therapist |
| `*` | Not found | Public |

Signed-in routes redirect to sign-in and return the user to where they were going. A user reaching a route for a different role sees a "not available" page.

## Shared layout

**Header** — navy, fixed. Logo, navigation, gold "Book a Session", account icon. The account icon leads to sign-in when signed out and opens the account menu when signed in. Collapses to a menu button below 1024px. See [navigation](design-system.md#navigation).

**Footer** — navy, four columns, generated copyright year. See [footer](design-system.md#footer).

**Skip link** — "Skip to main content" as the first focusable element.

**Page metadata** — each route sets its own title, description and link-preview image.

**Global states** — a page-level loading indicator, an error boundary with a retry action, and an offline notice.

## Public pages

### Home
From the home mockup.

1. **Hero** — eyebrow, "You Matter. Your Healing Matters.", introduction, "Book a Session" (gold) and "Learn More" (outline, to About Us), photograph with script accent "A healthier you is possible".
2. **Trust strip** — Confidential & Private; Personalised Support; Compassionate & Non-Judgmental; Professional Therapists; Flexible Appointments.
3. **A Safe Space for Your Journey** — paragraph, six-item checklist, "Start Your Journey" to booking.
4. **Services band** (navy) — service cards loaded from the API, linking to each service.
5. **Testimonials** — carousel with previous/next controls and keyboard support. Rendered only if published testimonials exist (FR-PUB-07).

### About Us
From the About mockup. Static content.

1. Hero — "Therapy Designed Around You", "Book a Session".
2. Our Story, with the list of common barriers.
3. Why Serenity Circle+ Exists.
4. Our Approach to Therapy — five cards. This section has the anchor `#approach`.
5. What Makes Serenity Circle+ Different — six cards.
6. What You Can Expect — four numbered steps.
7. Who We Support — five grouped lists.
8. What We Believe — six value cards.
9. Closing banner with "Book a Session".

### Services
From the Services mockup, with the navy header.

1. Hero — "Professional Support for a Healthier, Happier You", "Book a Session", and the card: Confidential, Compassionate, Professional, Results-Focused.
2. What We Offer — a card per published service from the API: icon, name, summary, arrow to the detail page. The five services are Child Therapy, Education, Anxiety & ADHD, Stress & Depression, and Trauma & PTSD, laid out as a centred row of three above a row of two on desktop. The introduction states that all sessions are one-to-one video calls.
3. Our Approach strip — "Learn More" links to `/about#approach`.

**Service detail** — name, full description, duration, fee when set, therapists who offer it (omitted while there are none), "Book a Session" with the service preselected. Every service shows "45 minutes". The Child Therapy and Education pages state that they are for ages 3 to 18 and are booked by a parent or guardian.

### Directory
From the Directory mockup.

- **Hero** — "Find Your Psychologist" with introduction.
- **Coming soon state** — the state the site launches in, because there are no therapists yet (FR-DIR-07). The hero stays; the filters and grid are replaced by a single centred panel in the site's card style: a heading such as "Our therapists are coming soon", a sentence explaining that the team is being put together, and a "Contact Us" button. No sample profiles, names or photographs are shown. The page switches to the full directory by itself as soon as the API returns a published therapist.
- **Filters** — Specialty (multiple choice, from the API). No Session Type filter: every session is a video call. A sidebar on desktop; a slide-up panel with an "Apply" button and a count of active filters on mobile. A "Clear filters" action.
- **Results** — therapist cards: photograph, name, professional title, up to two speciality tags (with "+N" for more). The whole card links to the profile.
- **Behaviour** — filters update the results without a page reload and are written to the address (`/directory?specialty=trauma-ptsd`) (FR-DIR-03). Skeleton cards while loading. An empty state with "Clear filters" when nothing matches (FR-DIR-06). A count of results is announced to screen readers.

**Therapist profile** — photograph, name, professional title, Counsellors and Psychologists Board registration number, biography, specialities, services offered, and "Book a Session" with the therapist preselected.

### Resources
A grid of article cards (image, category, title, summary), filterable by category, with pagination. Article pages show the title, date, body and a closing prompt to book or get in touch. Every article carries a note that it is general information, not personal advice.

### Contact
From the Contact mockup, corrected.

- **Hero** — "Let's Connect", script accent "You're not alone. We're here."
- **Form** — Full Name, Email Address, How did you hear about us? (select), Your Message. No date of birth (FR-CON-02). Validation on blur and on submit; errors beside each field. Spam protection invisible to genuine users. On success the form is replaced by a confirmation. A note above the button: "This form is not monitored for emergencies."
- **Immediate Support card** — standard crisis wording and contacts from the API, each a tap-to-call link.
- **Get in Touch card** — replaces the "Our Sanctuary" card from the mockup, because the practice has no physical address (FR-CON-06). Shows the phone number 0707 176 183 (linking to `tel:+254707176183`), a "Chat on WhatsApp" link (`https://wa.me/254707176183`) and the email address evecmain@gmail.com (a `mailto:` link), with a line saying that all sessions are held online. No address and no map.

### Crisis Support
A plain, fast page: the standard wording, all crisis contacts with descriptions and hours, and a statement that Serenity Circle+ is not an emergency service. No images that delay loading.

### Privacy Policy and Terms of Service
Long-form text with a table of contents, last-updated date and version.

## Account pages

| Page | Contents and behaviour |
|---|---|
| Register | Full name, email, mobile number, password with strength guidance; required agreement to Terms and Privacy Policy; separate required consent to processing health-related data; optional consent to SMS. Shows "check your email" on success. |
| Verify email | Confirms the link; offers to resend if expired. |
| Sign in | Email and password; second step for a two-factor code where enabled. Generic error on failure. |
| Forgot / reset password | Request by email, always showing the same confirmation; set a new password from the emailed link. |

Password fields have a show/hide control and allow pasting, so password managers work.

## Booking flow

**Until a therapist is published, this flow is switched off** and every "Book a Session" button leads to the Contact page (FR-BKG-16). The flow below is what opens once the first therapist is listed.

From the booking mockup. A focused layout: logo, four-step indicator, content, and a bottom bar with "Cancel" or "Back" on the left and "Continue" on the right.

| Step | Contents |
|---|---|
| 1. Service | "Select a Service". Selectable cards: icon, name, description, duration tag, photograph. One selected at a time. Shows the practice's five services, each tagged "45 min"; the Couples Counselling, Group Therapy and Virtual Check-in cards in the mockup are not used. Above the cards, "Who is this session for?" — "Myself" or one of the account holder's children, with "Add a child". Choosing a child without current guardian consent opens the consent step before continuing (FR-BKG-18, FR-BKG-19). |
| 2. Therapist | Therapists offering the chosen service, as selectable cards with photograph, title and specialities, plus a link to view the full profile. An option "No preference — show the earliest available". Skipped if a therapist was preselected, with the choice shown and changeable. |
| 3. Time | A week view of dates with available times for each; move between weeks. Times in EAT, labelled. A clear message when a week has no availability, with a jump to the next available date. |
| 4. Confirm | Summary of service, therapist, date and time, duration and fee, with a note that the session is a video call. Cancellation policy. "Confirm Booking". |
| Done | Confirmation with the appointment reference, "Add to calendar", and "Go to Dashboard". |

Behaviour:
- "Continue" is disabled until a choice is made.
- Selections are kept when going back, and survive sign-in or registration part-way through (FR-BKG-09).
- Entry points can preselect a service or therapist (`/book?service=...&therapist=...`).
- If the chosen time is taken at confirmation, the client returns to step 3 with an explanation and refreshed times (FR-BKG-08).
- Leaving the flow with selections made asks for confirmation.
- The confirm button shows progress and cannot be pressed twice.
- When payments are enabled, a payment step follows Confirm.

## Client dashboard

From the dashboard mockup.

- **Greeting** — "Good morning / afternoon / evening, {preferred name}." based on EAT, with the script accent.
- **Upcoming Session** — therapist photograph, name and title, service, date and time in EAT, labelled "Video Call". Actions: "Reschedule" and "Join Waiting Room". The join button is enabled from 10 minutes before the start and shows when it will become available otherwise (FR-DSH-05). "View All" leads to all sessions. With no upcoming session, an invitation to book.
- **Book New Session** — to the booking flow.
- **Message Your Therapist** — to messages, with an unread count.
- **Progress Tracker** — three bars (Anxiety Management, Sleep Quality, Mood Stability) drawn from check-ins, labelled as self-reported, with "View Details". Before any check-in, an invitation to record the first one.
- **Stay on Track banner** — "Small Steps. Big Changes." with "Book a Session".

**All sessions** — tabs for Upcoming and Past. Each row shows date, therapist, service and status, with reschedule and cancel where allowed. Rescheduling reuses the Time step. Cancelling asks for confirmation and states any consequence under the policy.

**Messages** — list of threads and the open conversation. A permanent notice that messages are not for emergencies, with crisis contacts. Send by button or keyboard; failed sends can be retried. New messages appear without reloading.

**Progress** — a short check-in form (three 1–5 scales and an optional note), a history chart for each measure, and a control for sharing check-ins with the therapist.

**Children** (`/dashboard/children`) — for parents and guardians.
- *Add a child* — the child's name, date of birth and the account holder's relationship to them. Ages outside 3 to 18 are refused with an explanation.
- *Guardian consent* — the consent statement in full, a declaration that the account holder is the child's parent or legal guardian, and an unticked box they must tick themselves. Shown before the child's first booking.
- *Each child* — details, consent status and date, upcoming sessions, and "Withdraw consent", which warns that the child's future sessions will be cancelled.
- When a session is for a child, the dashboard's Upcoming Session card shows the child's name.

**Profile** — personal details, emergency contact, password change, two-factor setup, notification preferences, consent history, "Download my data" and "Delete my account".

## Session page

- **Pre-join** — camera and microphone preview and device selection, with help for permission problems.
- **Waiting room** — a calm holding screen until the therapist admits the client.
- **In session** — the embedded video with mute, camera, and leave controls, and an audio-only option for weak connections.
- **Afterwards** — returns to the dashboard.

Sessions are never recorded, and the page says so.

## Therapist workspace

- **Today and upcoming** — appointments in time order with client name and service; "Start Session" for each.
- **Appointment detail** — client's name, contact number and emergency contact; cancel with a reason.
- **Availability** — weekly hours by day, and one-off time off or extra hours.
- **Messages** — as for clients.
- **Profile** — edit biography; other details are read-only with a note to contact the administrator.

## Cross-cutting behaviour

**Data** — all server data goes through TanStack Query. API types are generated from the backend's OpenAPI schema so the two cannot drift apart.

**Forms** — one validation schema per form; server-side errors are mapped back to their fields.

**Formatting** — shared helpers for EAT dates and times, `KES` amounts and Kenyan phone numbers. No component formats these itself.

**Errors** — field errors inline; action errors as a message near the action; unexpected errors caught by the error boundary. A 401 sends the user to sign-in and brings them back afterwards.

**Performance** — route-level code splitting; public pages do not load dashboard, booking or video code; responsive images; fonts self-hosted and preloaded.

**Accessibility** — semantic HTML first; focus moved to the page heading on navigation; focus trapped in dialogs and returned on close; live regions for results counts and form outcomes.

**Privacy** — no advertising or third-party tracking scripts. If analytics is added it must be cookieless and privacy-preserving, and never run on signed-in pages. Nothing sensitive is kept in browser storage.

**Text** — interface strings are held in message files, ready for Kiswahili later.
