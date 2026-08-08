# Fundamentals de-para and placeholder pages

The Azion Fundamentals section (`fundamentalsMenu`, entered through the **Get Started** CTA on the docs home — not listed in the main sidebar) covers platform-level concepts, accounts, and billing. This file records its coverage map and every page created as a placeholder.

Status legend:

- **existing** — an Azion page already covered it; it now lives in (or is linked from) the Fundamentals sidebar.
- **link** — listed in Fundamentals but owned by another sidebar; clicking it switches to that sidebar (`linkOnly` in `fundamentals.menu.json`).
- **placeholder** — page created with "Content coming soon"; needs real content.
- **new-landing** — page created with real (thin) content because a sidebar needed a root.
- **skipped** — no Azion analog; intentionally not created.

## Pages that need content

| Page | EN permalink | PT permalink | Status |
| --- | --- | --- | --- |
| How Azion delivers your application | `/documentation/fundamentals/concepts/traffic-flow/` | `/documentacao/fundamentals/concepts/traffic-flow/` | placeholder |
| How DNS works | `/documentation/fundamentals/concepts/how-dns-works/` | `/documentacao/fundamentals/concepts/how-dns-works/` | placeholder |
| The Azion global network | `/documentation/fundamentals/concepts/global-network/` | `/documentacao/fundamentals/concepts/global-network/` | placeholder |
| Glossary | `/documentation/fundamentals/reference/glossary/` | `/documentacao/fundamentals/reference/glossary/` | placeholder |
| Collect diagnostic data | `/documentation/support/troubleshooting/collect-diagnostic-data/` | `/documentacao/support/troubleshooting/collect-diagnostic-data/` | placeholder |
| Cannot access your account | `/documentation/support/troubleshooting/cannot-access-account/` | `/documentacao/support/troubleshooting/cannot-access-account/` | placeholder |
| Not receiving Azion emails | `/documentation/support/troubleshooting/not-receiving-emails/` | `/documentacao/support/troubleshooting/not-receiving-emails/` | placeholder |
| Diagnostic headers | `/documentation/support/troubleshooting/diagnostic-headers/` | `/documentacao/support/troubleshooting/diagnostic-headers/` | placeholder |
| Style Guide: Components | `/documentation/style-guide/components/` | `/documentacao/guia-de-estilo/componentes/` | placeholder (design team owns) |
| Style Guide: API docs | `/documentation/style-guide/api-docs/` | `/documentacao/guia-de-estilo/api-docs/` | placeholder |
| Style Guide: How we write the docs | `/documentation/style-guide/how-we-docs/` | `/documentacao/guia-de-estilo/como-documentamos/` | placeholder |
| Azion Fundamentals | `/documentation/fundamentals/` | `/documentacao/fundamentals/` | new-landing (root for the Fundamentals sidebar) |
| Services | `/documentation/services/` | `/documentacao/services/` | new-landing (root for the Services sidebar) |
| Support | `/documentation/support/` | `/documentacao/support/` | new-landing (root for the Support sidebar) |

## Coverage map: Azion Fundamentals

| Covers | Azion page | Status |
| --- | --- | --- |
| Overview | Azion Fundamentals landing (`/documentation/fundamentals/`) | new-landing |
| Concepts → How the platform works | How Azion works | done (the Azion Web Platform Overview content relocated here; `/documentation/platform/overview/` redirects to it) |
| Concepts → Accounts, zones, and profiles | Accounts (`/documentation/account/reference/accounts/`) | existing (orphan adopted) |
| Concepts → Traffic flow | How Azion delivers your application | placeholder |
| Concepts → How DNS works | How DNS works | placeholder |
| Concepts → The global network | The Azion global network | placeholder |
| Get started | Get started page (`/documentation/get-started/`), a single flat link — it routes onward in prose | existing |
| Accounts (+ Account security, SCIM) | All `account/*` reference pages and guides: creation, Console, settings, activity history, MFA, lockout policy, session timeout, conditional access, personal tokens, social login, SSO/SAML/Entra SCIM | existing (moved from Manage) |
| Organizations | — | skipped (no organization layer above accounts) |
| Members and permissions | Teams Permissions · Users Management (refs + guides) | existing (moved) |
| User profiles | Your Settings | existing (moved) |
| Domains | Workloads · Domains reference | link |
| Performance | Application Accelerator · Tiered Cache · Image Processor · Edge Pulse | link |
| Security | Secure overview · DDoS Protection (link) · Shared Responsibility · Compliance ×3 (moved) | mixed |
| Billing | Pricing · Billing reference · Billing guide | existing (moved) |
| The platform API | Get started with Azion API · API v4 Migration · GraphQL API | link |
| OAuth Applications | — | skipped (no OAuth application directory) |
| Reference → Migration guides | Migrate to Azion + Akamai/AWS/Cloudflare/Fastly/Vercel | existing (moved from Guides) |
| Reference → Glossary | Glossary | placeholder |
| Reference → Policies | Agreements & Policies · Privacy Policy | link |
| Reference → misc | HTTP error status codes (link) · System Status (external) | mixed |
| RSS Feeds | — | skipped (no RSS surface) |
| Agent resources | For AI Agents · MCP Server · llms.txt | link / external |
