# Security

Serenity Circle+ holds some of the most sensitive information there is: the fact that a named person is seeking therapy, and what they say to their therapist. A leak could cause real harm to a client's relationships, employment or safety. Security is therefore a requirement of every feature, not a later phase.

Legal obligations are covered in [privacy-and-compliance.md](privacy-and-compliance.md).

## What we protect

| Asset | Sensitivity |
|---|---|
| The fact that a person is a client | High — revealing it is itself a harm |
| Messages between client and therapist | High |
| Progress check-ins and notes | High |
| Appointment history | High |
| Emergency contact details | High |
| Contact enquiries | Medium to high — people often disclose personal matters |
| Account credentials and sessions | High |
| Therapist personal details not on their public profile | Medium |
| Payment records | Medium — no card data is held |

## Threats we design against

| Threat | Main defences |
|---|---|
| Account takeover by guessed or reused passwords | Strong password rules, breached-password check, rate limiting, lockout, two-factor authentication |
| One user reading another user's records by changing an ID | Per-record authorisation on every endpoint; UUID identifiers; automated tests for every endpoint |
| Discovering who has an account | Identical responses for registered and unregistered email addresses |
| Injected scripts stealing data | React's output escaping, Content Security Policy, sanitised rich text, HTTP-only cookies |
| Forged requests from other sites | CSRF tokens, SameSite cookies |
| SQL injection | Django ORM; no string-built queries |
| Staff misuse or a compromised staff account | Least privilege, two-factor authentication, audit log, no staff access to message content |
| Someone seeing a client's phone or inbox | Neutral notification wording with no clinical detail |
| An uninvited person joining a video session | Random room names, short-lived per-user tokens, waiting room |
| Database or backup theft | Encryption at rest, field-level encryption, restricted network access |
| Fake payment confirmations | Server-to-server verification of provider callbacks |
| Vulnerable dependencies | Automated scanning and prompt patching |
| Spam and abuse of public forms | Rate limiting, trap fields, challenge |
| Loss of service or data | Backups with tested restore, monitoring |

## Controls

### Authentication
- Passwords: at least 12 characters, checked against common and known-breached passwords, hashed with Argon2. No forced periodic changes and no composition rules that encourage weak patterns.
- Two-factor authentication is mandatory for therapists and administrators, optional for clients.
- Sign-in is rate limited per IP address and per account, with increasing delays.
- Password reset and email verification links are single-use, signed and short-lived. A password reset ends all other sessions.
- Sign-in, registration and reset never reveal whether an account exists.
- The user is notified by email of a password change, a new two-factor setup and a sign-in from a new device.

### Sessions
- Session cookies are `Secure`, `HttpOnly` and `SameSite=Lax`.
- The session identifier is rotated at sign-in.
- Idle timeout: 30 minutes for therapists and administrators; longer for clients, with re-authentication before sensitive actions such as data export, account deletion and password change.
- No authentication data is kept in browser local storage.

### Authorisation
- Deny by default: every endpoint declares who may use it.
- Querysets are filtered to the records the user may see, so a request for someone else's record returns 404.
- Clients see only their own data. Therapists see only clients they have appointments with, and only what they need. Administrators manage the platform but cannot read message content.
- Every endpoint has a test proving another user cannot access it.

### Data protection
- **In transit:** TLS 1.2 or higher everywhere, including between application, database and Redis. HSTS enabled with preload.
- **At rest:** encrypted database storage, encrypted backups, encrypted file storage.
- **Field-level encryption** for message bodies, check-in notes, emergency contacts, date of birth and enquiry messages. Keys are held in a secrets manager, separate from the database, and can be rotated.
- **Minimisation:** if we do not need it, we do not collect it. No national ID numbers. No date of birth on the contact form.
- **Uploads** are stored privately and served through short-lived signed links, except public therapist photographs.

### Application security
- Django's security middleware enabled, with `DEBUG` off in production.
- Security headers: Content Security Policy without inline scripts, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `frame-ancestors 'none'`, and a restrictive Permissions Policy that allows camera and microphone only on the session page.
- All input validated on the server; frontend validation is for convenience only.
- Rich text for resources is sanitised against an allow-list on save.
- Uploaded images are checked by content, size-limited, re-encoded and stripped of metadata.
- Outbound requests go only to configured provider addresses.
- Rate limiting on all endpoints, tighter on sensitive ones.
- The Django admin is at a non-default address, behind two-factor authentication.
- Self-hosted fonts and scripts; no third-party scripts on signed-in pages apart from the video provider on the session page.

### Video sessions
- Rooms have random names that reveal nothing about the participants.
- Tokens are issued only to the two participants, only within the join window, and expire within minutes.
- The therapist admits the client from a waiting room.
- Recording is disabled at the provider.

### Notifications
- Email and SMS never include clinical detail or message content.
- Subject lines and SMS text do not mention therapy, counselling or mental health.
- Links in emails lead to the site, where the user must sign in.

### Payments
- Card details are entered only on the payment provider's hosted page. This system never sees or stores them.
- M-Pesa PINs are entered only on the client's phone.
- Provider callbacks are authenticated and processed once.
- Only the last four digits of a paying phone number are stored.

### Secrets and configuration
- All secrets come from the environment or a secrets manager. None are committed to the repository.
- `.env` files are ignored by version control; an `.env.example` lists the variable names without values.
- Separate credentials for each environment. Production secrets are available only to people who need them.
- Secret scanning runs on every commit.
- Secrets are rotated on a schedule and immediately when someone with access leaves.

### Infrastructure
- The database and Redis are not reachable from the internet.
- The application's database role has only the permissions it needs, and cannot alter or delete audit records.
- Servers are patched automatically for security updates.
- Administrative access to servers uses keys and two-factor authentication.
- Staging never contains real client data.

### Logging and monitoring
- Logs record what happened and who did it, never the personal data itself. No passwords, tokens, message text or request bodies.
- Error reports have personal fields removed before leaving the system.
- The audit log records sign-ins, access to client records by staff, changes to appointments, exports, deletions and administrative changes. It is append-only.
- Alerts are raised for repeated failed sign-ins, unusual volumes of record access, spikes in errors and failed backups.

### Dependencies
- Versions are pinned with lock files.
- Automated vulnerability scanning for Python and JavaScript dependencies, with security updates applied within days.
- New dependencies are reviewed for maintenance, popularity and licence before being added.

### Backups and recovery
- Daily encrypted backups with point-in-time recovery, held separately from the primary database.
- Restore is tested at least quarterly.
- Backup retention follows the data retention rules, so deleted data does not persist indefinitely.

## Secure development

**Every change**
- Reviewed by a second person before merging.
- Passes linting, type checks, tests, dependency scan and secret scan.
- No real client data in development, tests, screenshots or issue trackers.

**Checklist for any feature touching personal data**
- [ ] Is every piece of data collected actually needed?
- [ ] Who can read it, and is that enforced on the server for each record?
- [ ] Is there a test showing another user cannot reach it?
- [ ] Does it need field-level encryption?
- [ ] Is access to it audited?
- [ ] Could it appear in logs, error reports, emails, SMS or page addresses?
- [ ] Is it covered by data export and by deletion?
- [ ] Is there a retention rule for it?

**Before launch**
- [ ] Independent penetration test, with findings fixed
- [ ] Django deployment checklist (`manage.py check --deploy`) passes
- [ ] Security headers verified
- [ ] Backup restore rehearsed
- [ ] Two-factor authentication enabled for every staff account
- [ ] Incident response plan agreed and contacts recorded
- [ ] Data Protection Impact Assessment completed

## Incident response

1. **Contain** — revoke sessions and credentials involved, isolate affected systems.
2. **Assess** — what data, whose, how many people, how.
3. **Notify** — under the Data Protection Act, a breach posing a real risk of harm must be reported to the Office of the Data Protection Commissioner within 72 hours of becoming aware of it, and affected people must be informed without undue delay. The practice's data protection contact leads this.
4. **Recover** — fix the cause, restore service, rotate secrets.
5. **Learn** — written review without blame, and changes to prevent a repeat.

The names and contact details of the people responsible are kept in the practice's incident plan, not in this repository.

## Reporting a vulnerability

The site will publish a security contact address and a `/.well-known/security.txt` file once the practice's domain and mailbox exist ([question B7](open-questions.md#business-details)). Reports are acknowledged within three working days.
