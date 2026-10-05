# Privacy and compliance

How the platform meets its legal and professional obligations in Kenya.

> This document is an engineering guide, not legal advice. The practice should have a Kenyan lawyer or data protection adviser confirm its obligations, write the Privacy Policy and Terms of Service, and review this document before launch.

## Laws and regulators that apply

| Law | Regulator | Relevance |
|---|---|---|
| Data Protection Act, 2019, and its regulations | Office of the Data Protection Commissioner (ODPC) | Governs all personal data the platform handles. Health data is a category of sensitive personal data with stricter rules. |
| Counsellors and Psychologists Act, 2014 | Counsellors and Psychologists Board (CPB) | A person may practise as a counsellor or psychologist only if registered and holding a valid practising licence. The titles are protected. |
| Consumer protection and electronic transaction law | — | Clear pricing, terms and cancellation rules before a client commits. |

## Roles

- **Serenity Circle+** is the *data controller*: it decides why and how client data is used.
- **Service providers** (hosting, email, SMS, video, payments) are *data processors*, acting on the practice's instructions under a written agreement.

## Obligations and how the platform meets them

### Registration with the ODPC
Organisations that process health data must register as data controllers. **The practice must register before launch** ([L1](open-questions.md#legal-and-compliance)). The registration details are shown in the Privacy Policy.

### Lawful basis and consent
Processing health data requires explicit consent or another specific ground in the Act.

- At registration the client gives **separate, explicit consent** to the processing of health-related data, distinct from accepting the Terms and Privacy Policy. Boxes are never pre-ticked.
- SMS reminders and testimonial publication each have their own consent.
- Each consent is recorded with the document version, time and IP address. Withdrawal is recorded the same way and is as easy as giving consent.
- Withdrawing consent for health data processing means the practice can no longer provide the service; the profile page explains this before the client confirms.

### Data minimisation
Only data needed for a stated purpose is collected.

| Data | Purpose |
|---|---|
| Name, email, phone | Account, appointment communication |
| Date of birth | Confirming the client is an adult; optional otherwise |
| Emergency contact | Client safety during a session |
| Appointments | Providing the service |
| Messages | Communication between client and therapist |
| Check-ins | The client's own progress tracking |
| Enquiry name, email, message | Replying to the enquiry |

Not collected: national ID numbers, date of birth on the contact form, precise location, or anything for advertising.

### Transparency
- The Privacy Policy is linked from the footer and at every point where data is collected.
- A short plain-language notice appears beside each form saying what the data is for.
- The policy names the categories of processors and states whether data leaves Kenya.

### Data subject rights

| Right | How it is provided |
|---|---|
| To be informed | Privacy Policy and notices at collection |
| Access and portability | "Download my data" in the profile |
| Correction | Editable profile; a contact route for anything not self-service |
| Deletion | "Delete my account" in the profile |
| Objection and withdrawal of consent | Consent controls in the profile |
| Complaint | The policy explains how to complain to the practice and to the ODPC |

Requests made by email are handled by the practice's data protection contact ([L3](open-questions.md#legal-and-compliance)) within the time the Act allows.

### Children
Child Therapy is one of the practice's five services, so this applies directly.

The practice sees children and young people aged 3 to 18. Processing a child's data requires the consent of a parent or guardian and must serve the child's best interests. Consent is taken on the website:

- **Accounts are for adults only.** Registration requires confirmation that the user is 18 or over. A child never has a sign-in.
- **The parent or guardian adds the child** — name, date of birth and their relationship to the child. Nothing else about the child is collected at this point.
- **Guardian consent is given per child**, before the first booking: a declaration that the account holder is the child's parent or legal guardian, and explicit consent to therapy for the child and to the processing of the child's health-related data. The box is never pre-ticked.
- **Each consent is recorded** with the wording version, time and IP address, and can be withdrawn from the same screen. Withdrawal cancels the child's future sessions.
- **A booking for a child is refused** unless current consent exists.
- **Communications go to the guardian**, never to the child.
- **At 18** the guardian's consent stops applying; the young person continues under their own account and consent.

#### Working defaults for guardian consent

The practice has not yet decided these points, so the build uses the defaults below. They are a starting position, not legal advice, and must be reviewed by the practice's lawyer and its first counsellor before booking opens ([question N9](open-questions.md#new-questions-from-these-answers)). Each is a setting or a piece of stored text, so changing it later does not need a rebuild.

| Point | Working default |
|---|---|
| Proof of guardianship | The guardian's declaration on the website is accepted. The platform does not check identity documents. The counsellor confirms who the guardian is at the start of the first session. |
| The child's own agreement | For children aged 13 and over, the counsellor asks for the young person's agreement at the first session. It is not collected on the website, because the child has no account. |
| Guardian at the session | For children under 13, the guardian joins the start of every session. For 13 and over, the guardian joins the start of the first session. |
| Confidentiality | The consent text explains that what an older child says to the counsellor is kept private from the guardian, except where there is a risk of harm. |

**Draft consent statement** — for review, not for publication as it stands:

> I confirm that I am the parent or legal guardian of the child named above and that I have the authority to make decisions about their care.
>
> I consent to this child receiving counselling from Serenity Circle+ by video call.
>
> I consent to Serenity Circle+ collecting and using this child's personal information, including information about their health and well-being, in order to provide that counselling, as described in the Privacy Policy.
>
> I understand that I can withdraw this consent at any time from my account, and that doing so will cancel the child's future sessions.

### Retention
Data is kept no longer than necessary. The practice sets the periods ([L4](open-questions.md#legal-and-compliance)), taking account of professional record-keeping expectations. The platform then enforces them automatically:

| Data | Rule to be set |
|---|---|
| Client account and appointment records | Period after the last appointment |
| Messages and check-ins | Deleted with the account, or after a set period |
| Closed contact enquiries | Short fixed period |
| Notification records | Short fixed period |
| Audit log | Longer fixed period |
| Payment records | As required for tax and accounting |
| Backups | Rolling window, so deletions take full effect |

### Security safeguards
The Act requires appropriate technical and organisational measures. These are set out in [security.md](security.md).

### Data Protection Impact Assessment
Processing sensitive health data at scale is high-risk and calls for an assessment before it starts. **The practice completes a DPIA before launch** ([L5](open-questions.md#legal-and-compliance)); this documentation set supplies most of the technical input.

### Breach notification
A breach posing a real risk of harm is reported to the ODPC within 72 hours of the practice becoming aware of it, and affected people are told without undue delay. The process is in [security.md](security.md#incident-response).

### Transfers outside Kenya
The Act restricts sending personal data abroad unless there are adequate safeguards or the person consents; sensitive personal data needs particular care. Hosting, email, SMS and video providers may all store or route data outside Kenya.

- Prefer providers that can keep data in Kenya or that offer strong contractual safeguards.
- List every provider, what data it receives and where it is held.
- State the position in the Privacy Policy and obtain consent where required.
- Take advice on the hosting location before it is chosen ([P10](open-questions.md#product-decisions)).

### Processor agreements
A written data processing agreement is signed with each provider before any client data is sent to it.

### Cookies and tracking
- Only essential cookies are used: session and CSRF. These need no consent banner.
- No advertising or cross-site tracking.
- If analytics is added it must be cookieless and must not run on signed-in pages. Anything beyond that requires consent first.
- Embedded third-party content, if any is ever added, loads only when the visitor asks for it.

## Professional regulation

### Therapist verification
Before a therapist is listed, an administrator records their CPB registration number and licence expiry date, having checked them against the therapist's documents.

The platform enforces this:
- A profile cannot be published without both.
- The registration number is shown on the public profile so clients can verify it.
- Administrators are warned 60 days before a licence expires.
- A profile is automatically unlisted, and the therapist cannot receive new bookings, once the licence has expired.

### Titles
Titles shown are those the practitioner is registered under. See the [content style guide](content-style-guide.md#professional-titles).

### Confidentiality and its limits
Therapists have a professional duty of confidentiality with recognised limits, such as serious risk of harm. The practice's Terms and its consent wording explain these limits to clients in plain language before their first session. The wording is provided by the practice.

### Clinical records
The first release does not hold clinical notes. Therapists keep their notes under the practice's existing arrangements.

## Honest marketing

- Therapist profiles, qualifications and photographs are real and published with consent.
- Testimonials are real, published only with written consent, and shown by initials.
- No guarantees of outcome.
- Fees and the cancellation policy are shown before a client confirms a booking.

## Launch checklist

- [ ] ODPC registration complete
- [ ] Data protection contact named
- [ ] Privacy Policy and Terms of Service approved by a lawyer and published with version numbers
- [ ] DPIA completed
- [ ] Retention periods set and configured
- [ ] Data processing agreement signed with every provider
- [ ] Provider list and data locations documented
- [ ] Every listed therapist verified, with consent to publish recorded
- [ ] Consent wording approved
- [ ] Data export and account deletion tested end to end
- [ ] Breach response plan agreed
- [ ] Crisis contacts verified
