# Open questions

Serenity Circle+ is a live website for a real practice, so no content may be invented. This document lists the real information and decisions the build depends on. Each item says what it blocks, so it is clear what can proceed without it.

When an item is answered, write the answer under it, date it, and update the documents it affects.

## Answered

Recorded 4 October 2026, from the product owner.

| # | Answer | Effect |
|---|---|---|
| S1 | The practice offers **virtual individual therapy** in five areas: Child Therapy, Education, Anxiety & ADHD, Stress & Depression, Trauma & PTSD. | Couples, family and group services are removed from the Services page and the booking flow. |
| S2 | No in-person sessions. | Every session is a video call. The session-type filter and the In-Person indicators are removed. |
| S4 | No group sessions. | Group booking is not built. |
| B2 | No physical address. | The "Our Sanctuary" card and map are removed from the Contact page. |
| B3 | Phone **+254 707 176 183**; email **evecmain@gmail.com**. | Shown on the Contact page and in the footer. |
| T1–T5 | There are no therapists yet. | The Directory shows a "coming soon" state until the first verified therapist is published. Online booking stays switched off until then, and "Book a Session" leads to the Contact page. |

## New questions from these answers

| # | Question | Why it matters |
|---|---|---|
| N6 | A domain name and a mailbox on it (for example `hello@` the domain). **Not yet set up.** | System emails such as confirmations and reminders cannot be sent reliably from a Gmail address, so this is needed before accounts and booking go live. The Gmail address stays as the public contact. It does not block the public website. |
| N9 | Guardian consent wording. The product owner has no view yet, so the working defaults in [privacy-and-compliance.md](privacy-and-compliance.md#working-defaults-for-guardian-consent) are used for the build. | The defaults and the draft wording must be reviewed by the practice's lawyer and the first counsellor before booking opens to the public. Tracked with L2. |

### Answered on 4 October 2026 (third round)

| # | Answer | Effect |
|---|---|---|
| N7 | The practice sees **both adults and children**. | An adult can book for themselves or for a child. No change to the documents, which already assumed this. |
| N8 | There are no counsellors yet; the product owner has approached a few. | The Directory stays "coming soon" and booking stays off until the first counsellor's registration and licence are verified and their profile is published. |

### Answered on 4 October 2026 (second round)

| # | Answer | Effect |
|---|---|---|
| N1 | **Education** means helping children navigate school. | Description written in [company-profile.md](company-profile.md#services). |
| N2 | The other four service summaries are approved. | They are final wording. |
| N3 | **Child Therapy** is for ages 3 to 18. Parent or guardian consent is taken on the website. | A guardian-consent step is built into registration and booking, so Child Therapy can be booked online by a parent or guardian. |
| N4 | The phone number is also on WhatsApp. | A WhatsApp link is shown on the Contact page and in the footer. |
| N5 | Every session is a fixed **45 minutes**. | One duration for all services; the 30-minute Virtual Check-in in the mockup is not used. |

## Business details

| # | Needed | Blocks |
|---|---|---|
| B1 | Registered business name, registration number, year founded | Footer, legal pages, company profile |
| B4 | Operating hours | Contact page, booking availability defaults |
| B5 | Social media accounts that exist (the designs show Facebook, Instagram, LinkedIn, YouTube) | Footer icons — only real accounts are linked |
| B6 | Founder and leadership names and biographies | About Us, company profile |
| B7 | Domain name | Deployment, email sending, TLS certificates |

## Services and scope

| # | Question | Why it matters |
|---|---|---|
| S5 | Session fees in KES for each service | Booking confirmation, payments, "Affordable" claims |
| S6 | Cancellation and rescheduling policy (notice period, fees) | Dashboard reschedule rules, terms of service |

## Therapists

There is no team yet, so the Directory launches in its "coming soon" state. These items are needed for each therapist when they join; a profile cannot be published without them.

| # | Needed | Blocks |
|---|---|---|
| T1 | Full name, professional title, biography, specialities, photograph | Directory — the names in the mockup are illustrative and will not be used |
| T2 | Each therapist's Counsellors and Psychologists Board registration number and current practising licence | Directory listing; legal requirement to practise |
| T3 | Who may use the title "Dr."? | Titles are shown only where the person holds the qualification |
| T4 | Each therapist's weekly availability | Booking step 3 (Time) |
| T5 | Written consent from each therapist to publish their profile and photograph | Directory |

## Product decisions

Recommendations are given so work can continue; each needs a yes or no from the product owner.

| # | Decision | Recommendation |
|---|---|---|
| P1 | Is online payment part of the first release? | Launch booking without online payment, add M-Pesa (STK Push) and card in the payments phase. The data model allows for it from the start. |
| P2 | Which video provider hosts sessions? | A hosted, embeddable provider with end-to-end encrypted rooms and per-session access tokens. Evaluate Jitsi as a Service and Daily; choose on cost, Kenyan network performance and data-processing terms. |
| P3 | How is the dashboard Progress Tracker calculated? The design shows Anxiety Management 75%, Sleep Quality 60%, Mood Stability 85% with no source. | Base it on short client self check-ins (1–5 scales), shown as a trend. Label it clearly as self-reported, not a clinical score. Have a practising clinician approve the wording. |
| P4 | Contact form asks for date of birth. | Remove it. An enquiry does not need it, and the Data Protection Act requires collecting only what is necessary. |
| P5 | Dashboard button "Message Doctor". | Rename to "Message Your Therapist" — not every practitioner is a doctor. |
| P6 | Who answers client messages and how quickly? The design promises "Response usually within 24h". | Confirm the practice can meet this before publishing it. Messaging must state it is not for emergencies. |
| P7 | Footer links "Affiliates" and "Careers". | Leave out until real pages exist. |
| P8 | Testimonials on the home page. | Publish only real testimonials with recorded written consent, shown by initials. Hide the section until at least one exists. |
| P9 | Do therapists write session notes in the platform? | Not in the first release. Clinical notes raise the security and retention bar considerably; treat as a separate project. |
| P10 | Where is the platform hosted? | See [deployment.md](deployment.md#hosting). Needs input from a data protection adviser because health data is involved. |

## Crisis and safety

| # | Item | Status |
|---|---|---|
| C1 | The contact design shows "Crisis Text Line: Text HOME to 741741". This is a United States service and does not work in Kenya. | Remove. |
| C2 | The design shows "National Crisis Line: 1190". 1190 is the LVCT Health one2one helpline, not a general national crisis line. | Relabel accurately. |
| C3 | Final list of crisis contacts shown on the site | Proposed list is in [content-style-guide.md](content-style-guide.md#crisis-contacts). **A member of the practice must call each number to confirm it works and confirm its hours before launch**, and re-check every six months. |
| C4 | What should a therapist do if a client discloses risk of harm during a session or in a message? | The practice needs a written safeguarding procedure; the platform will link to it for staff. |

## Legal and compliance

| # | Needed | Blocks |
|---|---|---|
| L1 | Registration with the Office of the Data Protection Commissioner as a data controller | Launch |
| L2 | Privacy Policy and Terms of Service written or reviewed by a Kenyan lawyer | Launch — the site links to both |
| L3 | A named data protection contact for the practice | Privacy policy, breach response |
| L4 | Data retention periods for client records | Automated deletion rules |
| L5 | Data Protection Impact Assessment | Launch — processing health data is high-risk |

## Design gaps

The mockups cover seven screens. These screens are needed and have no design yet; they will be built from the existing design system unless designs are supplied.

- Sign in, register, verify email, reset password
- Adding a child and giving guardian consent
- Directory "coming soon" panel
- Therapist profile page (the destination of each directory card)
- Booking steps 2 (Therapist), 3 (Time) and 4 (Confirm), and the confirmation screen
- Resources listing and article pages
- Crisis Support, Privacy Policy and Terms of Service pages
- Messaging and progress check-in screens
- Therapist workspace
- Mobile and tablet layouts for every page (the mockups are desktop only)
