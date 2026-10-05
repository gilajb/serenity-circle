# Deployment

How the platform is configured, run and released. Provider-specific steps will be added once hosting is chosen.

## Environments

| Environment | Purpose | Data |
|---|---|---|
| Local | Development on a developer's machine | Fictional seed data |
| Staging | Mirrors production; final checks before release | Fictional seed data only — never real client data |
| Production | The live site | Real data |

Each environment has its own database, secrets and provider credentials. Staging uses the providers' test modes so no real email, SMS or payment is sent to the public.

## Hosting

Not yet chosen ([P10](open-questions.md#product-decisions)). Requirements for whichever option is used:

- Runs containers or Python and Node processes, with managed PostgreSQL and Redis
- Encrypted storage and encrypted, automated database backups with point-in-time recovery
- Private networking between application, database and Redis
- Good network performance for users in Kenya
- A data-processing agreement, and a data location acceptable under the Data Protection Act — see [privacy-and-compliance.md](privacy-and-compliance.md#transfers-outside-kenya)

## Components in production

| Component | Runs |
|---|---|
| Web server / CDN | Terminates TLS, serves the built React app and static files, forwards `/api/` and the admin to Django |
| Django | Gunicorn workers |
| Celery worker | Background jobs |
| Celery beat | Scheduled jobs — exactly one instance |
| PostgreSQL | Managed service |
| Redis | Managed service |
| Object storage | Uploaded files |

## Local development

The primary development machine runs Windows with 4 GB of memory, so Docker is not used. PostgreSQL is installed directly on the machine. Redis is needed only once background jobs exist; until then Celery tasks run inline in development.

Prerequisites: Python (current stable), Node.js (current LTS), PostgreSQL, Git.

```powershell
# Database, once only (asks for the postgres password)
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE USER serenity WITH PASSWORD 'serenity' CREATEDB;" -c "CREATE DATABASE serenity OWNER serenity;"

# Backend
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements/dev.txt
copy .env.example .env
python manage.py migrate
python manage.py seed_dev        # fictional development data
python manage.py runserver

# Background worker (separate terminal)
celery -A config worker -l info --pool=solo

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

The Vite development server proxies `/api/` to Django so the browser sees one site, as in production.

## Configuration

All configuration comes from environment variables. `.env` files are for local use only and are never committed. `backend/.env.example` and `frontend/.env.example` list the names.

### Backend

| Variable | Purpose |
|---|---|
| `DJANGO_SETTINGS_MODULE` | `config.settings.dev` or `config.settings.production` |
| `SECRET_KEY` | Django secret key |
| `DEBUG` | `false` outside local development |
| `ALLOWED_HOSTS` | Site host names |
| `CSRF_TRUSTED_ORIGINS` | Site origins |
| `DATABASE_URL` | PostgreSQL connection |
| `REDIS_URL` | Redis connection |
| `FIELD_ENCRYPTION_KEYS` | Keys for field-level encryption, newest first |
| `ADMIN_URL_PATH` | Non-default admin address |
| `EMAIL_*` | Email provider credentials and sender address |
| `SMS_*` | SMS provider credentials and sender name |
| `VIDEO_*` | Video provider credentials |
| `MPESA_*` | Daraja credentials, shortcode and callback address (payments phase) |
| `STORAGE_*` | Object storage credentials and bucket |
| `SENTRY_DSN` | Error monitoring |
| `SITE_URL` | Public address, used in emails |

Fixed in settings rather than the environment: `TIME_ZONE = "Africa/Nairobi"`, `USE_TZ = True`, `LANGUAGE_CODE = "en-gb"`.

### Frontend

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Normally `/api/v1` |
| `VITE_SENTRY_DSN` | Error monitoring |

Anything in a `VITE_` variable is visible in the browser. No secrets go here.

## Release process

1. Changes are merged to the main branch through reviewed pull requests with CI passing.
2. CI builds the frontend and backend and deploys to staging automatically.
3. End-to-end tests run on staging; the [release gate](testing-strategy.md#release-gate) is checked.
4. A release is tagged and promoted to production by a named person.
5. On deployment:
   - database migrations run
   - static files are collected
   - application and workers restart without dropping requests
   - health checks must pass before traffic is switched
6. The release is watched for errors for a period afterwards.

### Migrations
Migrations are written to be backward compatible with the previous release, so the old code keeps working while the new code rolls out. Destructive changes are split across two releases: stop using the column first, remove it later.

### Rollback
The previous release is redeployed. Because migrations are backward compatible, the database does not need reverting. A migration that cannot meet this is released on its own, with a tested restore plan.

## Production checklist

- [ ] `manage.py check --deploy` passes
- [ ] `DEBUG` is false; `ALLOWED_HOSTS` is exact
- [ ] HTTPS enforced with HSTS; certificates renew automatically
- [ ] Security headers present (see [security.md](security.md))
- [ ] Database and Redis not reachable from the internet
- [ ] Backups running; a restore has been rehearsed
- [ ] Email domain has SPF, DKIM and DMARC records
- [ ] SMS sender name registered
- [ ] Error monitoring and uptime checks active, with alerts going to a real person
- [ ] Admin at its non-default address with two-factor authentication enforced
- [ ] Development seed data absent
- [ ] `robots.txt` and sitemap published; signed-in pages excluded from indexing
- [ ] `security.txt` published
- [ ] Legal and compliance checklist in [privacy-and-compliance.md](privacy-and-compliance.md#launch-checklist) complete

## Monitoring

| What | How |
|---|---|
| Availability | External uptime checks on the home page and the health endpoint |
| Errors | Error monitoring for backend and frontend, with personal data removed |
| Performance | Response times, slow queries, queue length |
| Jobs | Alerts when reminders or other scheduled jobs fail or stop running |
| Delivery | Email and SMS failure rates |
| Security | Failed sign-in spikes, unusual access patterns |
| Backups | Alert on any failed backup |

## Backups and recovery

- Daily full backups plus continuous archiving for point-in-time recovery.
- Backups are encrypted and stored separately from the primary database.
- Uploaded files are versioned in object storage.
- Recovery targets: lose no more than one hour of data; restore service within four hours. To be confirmed with the practice.
- A restore is rehearsed every quarter and the result recorded.

## Maintenance

- Security updates to dependencies within days of release.
- Django kept on a supported LTS version; Node.js on a supported LTS version.
- Planned maintenance is announced on the site and scheduled outside session hours.
