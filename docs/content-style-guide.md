# Content style guide

Rules for every word that appears on the site, in emails and in SMS messages.

## The no-placeholder rule

Serenity Circle+ is a real practice and this is its live website. **Never publish invented content.**

This covers therapist names, photographs, qualifications and registration numbers; addresses, phone numbers and email addresses; prices; testimonials; statistics; and social media links.

- If real content is not yet available, the section is hidden or the page is not published. It is never filled with sample text.
- Missing items are tracked in [open-questions.md](open-questions.md).
- The names, address and numbers in the mockups are illustrative and are not to be copied into the site.
- Example text inside form fields must be obviously generic and locally appropriate (for instance `0712 345 678` as a phone-format hint). Do not use a real-looking person's name.
- Development and test data lives in fixtures that are never loaded in production.

## Spelling

British English, as used in Kenya.

| Use | Not |
|---|---|
| counselling, counsellor | counseling, counselor |
| programme (a course of sessions) | program |
| centre, client-centred | center, client-centered |
| behaviour, behavioural | behavior, behavioral |
| organise, recognise, specialise | organize, recognize, specialize |
| enquiry (a question to the practice) | inquiry |
| licence (noun), license (verb) | — |
| well-being | wellbeing, well being |
| non-judgmental | non-judgemental |

The name is always **Serenity Circle+**, with the plus sign and no space before it. The tagline is **Heal, Grow and Thrive**.

## Voice and tone

Write as a warm, steady professional would speak to someone who has taken a brave step.

- **Warm, not sentimental.** "You don't have to face it alone."
- **Plain.** Short sentences, everyday words. Explain any clinical term the first time it appears.
- **Respectful.** Speak to the reader as "you". Refer to the practice as "we".
- **Hopeful without promising.** Never guarantee an outcome or use words such as "cure".
- **Never pushy.** No urgency, countdowns or pressure to book.
- **Person-first.** "People living with depression", not "depressives". Avoid "suffering from" and "victim".
- **Inclusive.** Do not assume a reader's gender, faith, family structure or relationship.

Interface text is direct: buttons say what they do ("Book a Session", "Send Message"). Error messages say what went wrong and how to fix it, without blame.

## Professional titles

"Counsellor" and "Psychologist" are legally protected titles in Kenya.

- Use the title each practitioner is registered under with the Counsellors and Psychologists Board.
- Use "Dr." only for someone who holds a doctorate or medical degree.
- The collective word is "therapist" or "our team". Do not use "doctor" for practitioners in general.

## Kenyan formats

| Item | Format | Example |
|---|---|---|
| Time zone | East Africa Time, written "EAT" | 10:00 AM EAT |
| Time | 12-hour with AM/PM | 2:30 PM |
| Date | Day, month, year | 14 March 2027; Sat 14 Mar |
| Numeric date in forms | DD/MM/YYYY | 14/03/2027 |
| Currency | KES, space, comma separators, no decimals | KES 3,500 |
| Phone, displayed | Local grouping | 0712 345 678 |
| Phone, links and storage | International | +254712345678 |
| Week | Starts on Monday | — |

Other points:
- Refer to "M-Pesa" with that exact capitalisation and hyphen.
- Every session is a "Video Call". Do not use "telehealth", and do not mention in-person sessions.
- Refer to Kenyan law and regulators by their full names on first use: Data Protection Act, 2019; Office of the Data Protection Commissioner; Counsellors and Psychologists Board.

## The practice's details

| Item | Use |
|---|---|
| What we are | A virtual individual therapy and counselling practice |
| Services | Child Therapy · Education · Anxiety & ADHD · Stress & Depression · Trauma & PTSD — always with these names and capitalisation |
| Education | Described as "helping children navigate school" |
| Ages | Child Therapy and Education are for ages 3 to 18, booked by a parent or guardian |
| Session length | Always "45 minutes" |
| Phone | Displayed as 0707 176 183; linked as `tel:+254707176183` |
| WhatsApp | Same number; linked as `https://wa.me/254707176183` |
| Email | evecmain@gmail.com |
| Address | None. Never show an address or a map. |
| Team | Until therapists are listed, say the team is "coming soon". Do not describe, count or name therapists. |

## Crisis contacts

Serenity Circle+ is not an emergency service. Wherever someone might reach out in distress — the Contact page, Crisis Support page, messaging and the footer — show this information.

**Standard wording**

> If you are in immediate danger or thinking about harming yourself, please contact emergency services or one of these helplines now. Serenity Circle+ cannot respond to emergencies.

**Proposed contacts**

| Service | Number | Notes |
|---|---|---|
| Emergency services | 999 or 112 | Police, ambulance, fire |
| Kenya Red Cross counselling helpline | 1199 | Toll-free, 24 hours |
| Befrienders Kenya | 0722 178 177 | Suicide prevention and emotional support; weekday daytime hours |
| LVCT Health one2one helpline | 1190 | Toll-free counselling helpline |

> **These must be verified before launch.** A member of the practice calls each number, confirms it is answered and confirms its hours, then records the date checked. Re-check every six months. The list is stored in the database so the practice can update it without a code release.

Corrections to the Contact mockup:
- "Text HOME to 741741" is a United States service. It is removed.
- "National Crisis Line: 1190" is relabelled, because 1190 is the LVCT Health one2one helpline.

Every number is a tap-to-call link.

## Emails and SMS

- Subject lines and SMS text never mention therapy, counselling or mental health. Someone else may see the recipient's screen. Use "Your appointment with Serenity Circle+" rather than "Your therapy session".
- Never include clinical detail, message contents or the reason for a session.
- SMS messages are under 160 characters and identify the sender as Serenity Circle+.
- Every email includes how to contact the practice.

## Claims

A claim is published only if the practice confirms it is true and can keep it true.

| Claim in the mockups | Condition |
|---|---|
| "Affordable" / "accessible rates" | Fees confirmed |
| "Response usually within 24h" | The practice commits to this |
| "Evidence-based" | Approved by a practising clinician |
| "Professional Therapists" | Every listed therapist holds a current practising licence |
| Testimonials | Real, with written consent, shown by initials only |
