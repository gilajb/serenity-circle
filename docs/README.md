# Serenity Circle+ documentation

This folder describes what Serenity Circle+ is, what the platform must do, and how it will be built. Read the documents in the order below if you are new to the project.

## Business and product

| Document | What it answers |
|---|---|
| [Company profile](company-profile.md) | Who Serenity Circle+ is, what it offers and what it stands for |
| [Product requirements (PRD)](PRD.md) | Who the users are, what we are building, what is in and out of scope |
| [Roadmap](roadmap.md) | The order of work, phase by phase |
| [Open questions](open-questions.md) | Real business information and decisions still needed |

## Requirements

| Document | What it answers |
|---|---|
| [Software requirements (SRS)](SRS.md) | Numbered functional and non-functional requirements |
| [Frontend features](frontend-features.md) | Every page and component, and how it behaves |
| [Backend features](backend-features.md) | Every backend capability, by Django app |

## Design and content

| Document | What it answers |
|---|---|
| [Design system](design-system.md) | Colours, typography, components, the agreed navigation and footer |
| [Content style guide](content-style-guide.md) | Spelling, tone, Kenyan formats, the no-placeholder rule |

## Engineering

| Document | What it answers |
|---|---|
| [Architecture](architecture.md) | Tech stack, system layout, project structure, key decisions |
| [Database schema](database-schema.md) | Tables, fields and relationships |
| [API specification](api-specification.md) | REST endpoints, authentication, error format |
| [Security](security.md) | Threats, controls and the secure-development checklist |
| [Privacy and compliance](privacy-and-compliance.md) | Kenya Data Protection Act, professional regulation, consent and retention |
| [Testing strategy](testing-strategy.md) | What we test, how, and the release gate |
| [Deployment](deployment.md) | Environments, configuration, release and backup |

## Decisions already made

These were settled with the product owner and apply across every document.

| Topic | Decision |
|---|---|
| Stack | React frontend, Django backend, PostgreSQL database |
| Locale | Kenya: East Africa Time, KES, Kenyan phone numbers and crisis lines |
| Content | No placeholder or invented content; real business data only |
| Spelling | "Counselling" (British English) |
| Header | Navy on every page, including Services |
| Navigation | One navigation for the whole site — see [design-system.md](design-system.md#navigation) |
| Footer | One footer for the whole site — see [design-system.md](design-system.md#footer) |
| Copyright year | Generated from the current date, never hard-coded |

## Keeping the documents current

Update the relevant document in the same change as the code it describes. When a question in [open-questions.md](open-questions.md) is answered, record the answer there and update the documents it affects.
