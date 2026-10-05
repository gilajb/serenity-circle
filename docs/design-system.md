# Design system

The seven mockups in [serenitycircleuidesigns/](../serenitycircleuidesigns/) are the source of truth for look and feel. This document turns them into rules, and records the decisions that resolve where the mockups disagree with each other.

## Brand character

Calm, warm, trustworthy and professional. Generous white space, soft surfaces, rounded corners, natural imagery. Nothing loud, nothing urgent.

## Colour

Values were sampled from the mockups and should be confirmed against the brand's source files if they exist.

| Token | Value | Use |
|---|---|---|
| `navy-900` | `#0A2342` | Header, footer, headings, dark bands |
| `navy-700` | `#12355B` | Hover on navy, secondary dark surfaces |
| `teal-600` | `#0E8A9E` | Primary accent: links, icons, active states, primary buttons on light cards |
| `teal-500` | `#17A2B8` | Icon fills, active navigation underline |
| `teal-100` | `#DDF1F5` | Tags, icon backgrounds, soft panels |
| `teal-50` | `#EFF8FA` | Section backgrounds, form fields |
| `gold-500` | `#F0B94D` | "Book a Session" and other main call-to-action buttons, accent rules |
| `gold-600` | `#D9A036` | Hover on gold |
| `cream-50` | `#FBF8F2` | Warm section backgrounds |
| `white` | `#FFFFFF` | Cards, page background |
| `ink-700` | `#34495E` | Body text |
| `border` | `#CFE6EC` | Card and field borders |
| `danger` | `#B3261E` | Errors, destructive actions |
| `success` | `#1E7B4F` | Success messages |

Rules:
- Gold is reserved for the main action on a screen. Do not use it for decoration beyond thin accent rules.
- Text on gold is navy, never white.
- Every text and background pairing must meet WCAG AA contrast (4.5:1 for body text). Check teal text on pale teal in particular.

## Typography

| Role | Style in the mockups | Notes |
|---|---|---|
| Headings | Bold serif, navy | e.g. "Find Your Psychologist", "Let's Connect" |
| Body and interface | Clean rounded sans-serif | Navigation, paragraphs, buttons, form fields |
| Accent script | Handwritten, teal with a gold underline stroke | "Your well-being matters", "Healing is not a destination, it's a journey" |
| Eyebrow | Small uppercase sans-serif, letter-spaced, teal, followed by a short gold rule | "OUR SERVICES", "DIRECTORY" |

The exact font families must be confirmed with the designer. Until then, use close open-licence matches (a transitional serif for headings, a humanist sans-serif for body, a handwritten script for accents), self-hosted rather than loaded from a third party.

Rules:
- Script text is decorative and short. It never carries essential information and is hidden from screen readers when it only repeats nearby content.
- Body text is at least 16px. Line length stays under roughly 75 characters.

## Shape, spacing and elevation

- **Radius:** cards 16px; fields and tags 10px; buttons fully rounded (pill).
- **Borders:** 1px `border` on cards and fields.
- **Shadow:** soft and low — cards lift slightly; no hard shadows.
- **Spacing scale:** multiples of 4px. Sections are separated by 64–96px on desktop and 40–56px on mobile.
- **Content width:** maximum 1200px, centred, with side padding of at least 20px on mobile.

## Decorative elements

- Teal and gold leaf illustrations sit in the corners of hero bands and the footer. They are decorative: hidden from assistive technology, never overlapping text, and dropped on small screens if they crowd the content.
- Hero bands use a soft pale-teal to cream wash.
- Photography is warm, natural and bright, showing people who reflect the Kenyan clients the practice serves. Use licensed or commissioned photographs only. Therapist photographs must be of the actual therapists.

## Navigation

The mockups show three different menus. **One navigation is used on every page.**

**Signed out**

`Home` · `About Us` · `Services` · `Directory` · `Resources` · `Contact` · **[Book a Session]** · account icon

**Signed in (client)**

The same links, and the account icon opens a menu: `Dashboard` · `My Sessions` · `Messages` · `Profile` · `Sign out`.

Reasoning:
- **Dashboard** is only meaningful to a signed-in client, so it moves from the main bar into the account menu. A visitor should never see a link they cannot use.
- **Our Approach** is a section of About Us in the designs, not a separate page. The "Our Approach — Learn More" button on the Services page links to that section of About Us.
- **Directory** and **Resources** stay: the directory is the main route to a booking, and resources supports visitors who are not ready to book.
- Six links plus the button fit comfortably on desktop and keep the choice simple.

Behaviour:
- The header is navy on every page, with the white-and-gold logo. The white header in the Services mockup is not used.
- The current page is shown in teal with a teal underline.
- "Book a Session" is a gold pill button with a calendar icon, always visible.
- The header stays fixed to the top on scroll.
- Below 1024px the links collapse into a menu button; "Book a Session" remains visible beside it.
- The booking flow replaces the navigation with the four-step progress indicator, as designed, so the client is not distracted mid-booking.

## Footer

The mockups show two footers. **One footer is used on every page**, combining them.

Layout, on navy with the leaf illustration at the right:

| Column | Content |
|---|---|
| Brand | Logo, tagline "Heal, Grow and Thrive", one-line description, phone 0707 176 183 and email evecmain@gmail.com |
| Quick Links | Home, About Us, Services, Directory, Resources, Contact |
| Support | Crisis Support, Privacy Policy, Terms of Service |
| Connect With Us | Social icons, then the gold "Book a Session" button |

Bottom line: `© {current year} Serenity Circle+. All rights reserved.`

Reasoning:
- Visitors need both sets of links: Quick Links for getting around, and the legal and crisis links that a health service must make easy to find.
- **Crisis Support** is given a prominent place because it matters most to the people who need it.
- **Affiliates** and **Careers** are left out until those pages exist.
- **Social icons** are shown only for accounts the practice actually has.
- The **year** is generated from the current date, which resolves the 2024/2025 mismatch permanently.

On mobile the columns stack in the order above.

## Components

**Buttons**
- *Primary* — gold pill, navy text, optional leading icon and trailing arrow. One per view where possible.
- *Secondary* — teal filled pill, white text (e.g. "Join Waiting Room").
- *Outline* — white pill with teal border and text (e.g. "Learn More").
- *Quiet* — pale teal pill (e.g. "Reschedule").
- All buttons have hover, focus, pressed, disabled and loading states, and are at least 44px tall.

**Cards**
- White, 1px border, 16px radius, soft shadow.
- *Service card* — circular pale-teal icon, serif title, short description, arrow link.
- *Therapist card* — photograph left; name, professional title and speciality tags right.
- *Coming-soon panel* — a single centred card with a circular pale-teal icon, serif heading, one sentence and an outline button. Used on the Directory until therapists are listed.
- *Feature card* — centred icon, title, one or two lines.
- *Selectable card* (booking) — as above, with a teal border when selected.

**Tags** — pale teal pill, teal text, for specialities and durations.

**Form fields** — pale teal fill, 1px border, 10px radius, label above with an icon, required marker, helper and error text below. Errors are shown in text as well as colour.

**Progress bar** — pale track, teal fill, label left and value right.

**Stepper** — numbered circles joined by a line; the current step is filled teal, completed steps show a tick, later steps are outlined in gold.

**Hero band** — eyebrow, serif heading, supporting paragraph, primary button; photograph or script accent on the right.

**Icons** — a single outline icon set, 1.5–2px stroke, teal. Do not mix icon families.

## Responsive behaviour

The mockups are desktop only. Rules for other sizes:

| Width | Layout |
|---|---|
| ≥ 1280px | As designed |
| 1024–1279px | Four-column card rows become three; directory grid becomes two columns |
| 768–1023px | Navigation collapses; card rows become two columns; directory filters move above the results |
| < 768px | Single column; hero photograph sits below the text; filters open in a slide-up panel; booking cards stack |

## Accessibility

- WCAG 2.1 AA throughout.
- Every interactive element is reachable and usable by keyboard, with a visible focus ring.
- Images of people and content have meaningful alternative text; decorative images have none.
- Headings follow a logical order, one `h1` per page.
- Touch targets are at least 44 by 44px.
- Motion is subtle and is disabled when the user prefers reduced motion.

## Corrections to the mockups

These points in the mockups are not carried into the build.

| Mockup | Change |
|---|---|
| Services | Header becomes navy |
| All | One navigation and one footer, as above |
| All | Copyright year is generated |
| All | "Counseling" becomes "Counselling" |
| Home | Eyebrow becomes "Individual Counselling"; the services band shows the practice's five services |
| Services | Eight cards become five: Child Therapy, Education, Anxiety & ADHD, Stress & Depression, Trauma & PTSD |
| Directory | Launches as a "coming soon" panel; the illustrative names and photographs are never used |
| Directory | Session Type filter and the In-Person / Video indicators removed — all sessions are video calls |
| Booking | Couples Counselling, Group Therapy and Virtual Check-in cards removed; the five services are shown, each 45 minutes |
| Booking | "Who is this session for?" added to step 1, for parents booking for a child |
| Booking | Switched off until a therapist is listed; "Book a Session" leads to Contact meanwhile |
| Dashboard | "Dr. Sarah Jenkins", "PST" and "Telehealth" are illustrative; real data in EAT, labelled "Video Call" |
| Dashboard | "Message Doctor" becomes "Message Your Therapist" |
| Contact | "Our Sanctuary" address and map card replaced by a "Get in Touch" card with the phone number, WhatsApp link and email address — the practice has no premises |
| Contact | US text line removed; crisis numbers replaced with verified Kenyan contacts |
| Contact | Date of Birth field removed |
| Contact | "How did you hear about us?" uses a suitable icon rather than a phone |
