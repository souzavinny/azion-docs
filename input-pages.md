# Input pages — Functions section rewrite

Provenance for the rewrite of the Functions product section. Every page listed here was read from the `main` branch and used as factual input; nothing on the new pages comes from anywhere else.

This file is a working record, not site content. No build step reads it.

- **Branch under rewrite:** `revamp/d2-product-sidebars`
- **Source branch for facts:** `main`
- **Skill applied:** `azion-docs-writer` (`teams/marketing/skills/azion-docs-writer`)
- **Extraction command:** `git show main:<path>`
- **Working copies:** `.cleanroom/functions/` in this repository — gitignored, and the reproducible input to any regeneration. It holds the 16 raw sources, the 7 per-page packets assembled from them, and `common-brief.md`, which carries the naming rules, the verified link table, and the settled rulings on every source contradiction below.

---

## How these pages were used

The skill forbids inventing a fact: every limit, default, field name, handler signature and error string on a new page has to trace to a named source, and a slot the sources do not fill gets a `[GAP: ...]` marker instead of a plausible sentence. That rule is what makes this file necessary — it is the list the new pages are checked against.

Each source was extracted from `main` into a **source packet**, and each new page was written from its packet alone. The writer of a page could read the skill's reference files, its own packet, and a shared brief fixing product names, placeholder domains and the set of link targets that exist. It could not read the version of the page already in the repository. That isolation is deliberate: a writer that opens the current page reproduces its structure, which is the thing being replaced.

Sources fall into four roles.

**Primary** sources carry a target page's factual spine. One page's packet is built around one or two of these, and the new page's section order comes from the content type, not from the source's order.

**Supporting** sources contribute specific facts — a signature, a limit, an interface name — into a page whose spine is elsewhere. They are quarried, not restructured.

**Terminology-only** sources are read for vocabulary and coverage. Their bodies are not rewritten in this pass. They supply the Glossary's term list and populate the Guides hub, and each gains one `difficulty` frontmatter line so the hub table can render.

**Out of scope** sources are recorded so the boundary is legible to the next person. Functions and Azion Runtime overlap heavily, and the decision was to rewrite Functions only.

---

## Primary sources

The factual spine of the new section.

| # | Path on `main` | Title | Lines | Feeds |
|---|---|---|---|---|
| 1 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/edge-functions.mdx` | Functions for Applications | 282 | Overview, How Functions works, Functions limits |
| 2 | `src/content/docs/en/pages/guides/edge-functions/migrate-handler-patterns.mdx` | Migrating handler patterns in Functions | 293 | Reference: Handlers; How Functions works; the Overview's code specimen |
| 3 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/edge-functions-instances.mdx` | Functions Instances | 51 | Reference: Functions Instances |
| 4 | `src/content/docs/en/pages/main-menu/reference/secure/edge-firewall/edge-functions-for-edge-firewall/edge-functions-firewall.mdx` | Functions for Firewall | 219 | Reference: Functions on Firewall; How Functions works |
| 5 | `src/content/docs/en/pages/main-menu/reference/secure/edge-firewall/edge-functions-for-edge-firewall/edge-functions-instances.mdx` | Functions Instances for Firewall | 133 | Reference: Functions on Firewall |

**1 — `edge-functions.mdx`** is the page the rewrite exists to fix. It runs 282 lines under twenty headings and is, by content type, four pages sharing a file: an overview, a concept page on how framework code becomes a function, a management guide covering Console, CLI, API and Terraform, and a twelve-row limits table. Its permalink on `main` is `/documentation/products/build/applications/functions/`; on this branch it already serves `/documentation/build/functions/`. Its material splits three ways — the capability sections and the interfaces list to the Overview, the bundler and execution material to How Functions works, the limits table to Functions limits.

**2 — `migrate-handler-patterns.mdx`** is present on `main` and deleted on this branch. It is the only page that documents the handler contract: ES Modules against Service Worker, the `fetch(request, env, ctx)` and `firewall(request, env, ctx)` signatures, `waitUntil` for async work after a response, the patterns the runtime rejects, and the `Unsupported handler pattern detected` error. Recovering it was a deliberate call — without it the execution model is documented nowhere in the section.

**3, 5 — the two Functions Instances pages** cover the same object on either side of the platform. They merge into one reference page rather than staying split by resource, because a reader looking up instance fields does not know in advance which of the two pages holds the field they want.

**4 — `edge-functions-firewall.mdx`** supplies the Firewall half of the execution model: which event a function answers there, and how that differs from a function running in an application.

---

## Supporting sources

Quarried for specific facts. None of them sets a target page's structure.

| # | Path on `main` | Title | Lines | Contributes |
|---|---|---|---|---|
| 6 | `src/content/docs/en/pages/devtools/azion-edge-runtime/api-reference/handlers.mdx` | Handlers | 69 | Handler signatures, cross-checked against source 2 |
| 7 | `src/content/docs/en/pages/devtools/azion-edge-runtime/environment-variables-reference/environment-variables-reference.mdx` | Environment Variables | 96 | Environment variable behavior and its size ceiling |
| 8 | `src/content/docs/en/pages/devtools/azion-edge-runtime/api-reference/metadata/metadata.mdx` | Metadata API | 137 | Request metadata a function can read |
| 9 | `src/content/docs/en/pages/devtools/azion-edge-runtime/overview/overview.mdx` | Azion Runtime | 45 | Where the Functions / Runtime boundary falls |
| 10 | `src/content/docs/en/pages/build-journey/edit-edge-app/edit-functions-instances/functions-instances.mdx` | How to instantiate functions in your application | 241 | Quickstart: the Console path, step by step |
| 11 | `src/content/docs/en/pages/secure-journey/edit-edge-firewall/instantiate-edge-functions.mdx` | How to instantiate functions in your firewall | 247 | The Firewall instantiation contrast |
| 12 | `src/content/docs/en/pages/secure-journey/automate/edge-functions-apis.mdx` | Automate security with Azion Functions | 69 | API management facts for the interfaces list |
| 13 | `src/content/docs/en/pages/devtools/azion-edge-runtime/code-editor/code-editor.mdx` | Functions Code Editor | 68 | Overview capability section |
| 14 | `src/content/docs/en/pages/devtools/azion-edge-runtime/preview/preview.mdx` | Azion Preview Deployment | 110 | Overview capability section |
| 15 | `src/content/docs/en/pages/devtools/azion-edge-runtime/debugging/debugging.mdx` | Debugging | 136 | Overview capability section |
| 16 | `src/content/docs/en/pages/devtools/azion-edge-runtime/ai-integration/chatgpt-integration.mdx` | Functions ChatGPT integration | 113 | Overview capability section |
| 17 | `src/content/docs/en/pages/build-journey/develop-with-azion/lang-js/lang-javascript.mdx` | How to build functions | 106 | Quickstart: the Console steps that create a function, and the Hello World response body |

Source 17 was added during review, not during the initial sweep. The Quickstart writer reported two `[GAP: ...]` markers it could not fill from its packet — the Console controls that create a function, and what the finished function returns. Both facts exist on this page, so it was pulled in and the gaps were closed from it rather than left open or invented. The handler form in the Quickstart's code sample comes from source 2, which marks ES Modules as recommended and the `addEventListener` form as legacy; the page therefore teaches the recommended form and links source 2 for the other.

Sources 6 and 2 overlap on the handler signatures, which is why both are in the set: agreement between two independently written pages is the check that the signatures are right. Where they disagree, the disagreement is recorded below rather than averaged away.

Sources 13 to 16 each become one short capability section in the Overview — a definition, its mechanism or its consequence, then a link. They are not re-explained; the canonical page keeps the full explanation.

---

## Terminology-only sources

Sixteen guide pages. Their bodies are **not** rewritten in this pass. They already serve `/documentation/build/functions/guides/...` permalinks on this branch, so the new Guides hub picks them up by prefix. Each gains one `difficulty` line so the hub table renders a value instead of a dash.

| Guide | Permalink on this branch |
|---|---|
| Get started with OpenNext | `/documentation/build/functions/guides/get-started/` |
| Instantiate functions in your application | `/documentation/build/functions/guides/instantiate-functions/` |
| Run serverless functions | `/documentation/build/functions/guides/serverless-functions/` |
| Create a function with WebAssembly | `/documentation/build/functions/guides/webassembly-on-azion-platform/` |
| Build an API with Functions and ChatGPT | `/documentation/build/functions/guides/api-builder/` |
| Build a RESTful API with Functions and SQL | `/documentation/build/functions/guides/restful-tasks-api-functions/` |
| Build a browserless application | `/documentation/build/functions/guides/browserless-functions/` |
| Implement file upload | `/documentation/build/functions/guides/file-upload-functions/` |
| Use the ALTCHA function | `/documentation/build/functions/guides/altcha/` |
| Set up a paywall with JWT | `/documentation/build/functions/guides/paywall-function-jwt/` |
| Integrate the Resend email service | `/documentation/build/functions/guides/resend-email-functions/` |
| Handle Stripe webhooks | `/documentation/build/functions/guides/stripe-webhooks-functions/` |
| Create and configure a function on Firewall | `/documentation/build/functions/guides/firewall/` |
| Test an origin with Functions | `/documentation/build/functions/guides/test-origin-with-functions/` |
| Debug functions using the GraphQL API | `/documentation/build/functions/guides/debugging-functions-graphql/` |
| Troubleshoot an OpenNext application | `/documentation/build/functions/guides/troubleshooting/` |

Read together, these supply the Glossary's term list: function, function instance, handler, event, JSON args, isolate, cold start, Azion Bundler, WebAssembly module, preview deployment.

---

## Out of scope

Recorded so the boundary is legible. All of the following belong to Azion Runtime (`runtimeMenu`) or devtools, and keep their own sidebar:

- The JavaScript runtime API reference, roughly 22 pages under `devtools/azion-edge-runtime/runtime-apis/` — `fetch`, `Request`, `Response`, streams, crypto, `Intl`, `URLPattern`, Web Standards, WebAssembly.
- Node.js compatibility and polyfills, roughly 20 pages under `devtools/azion-edge-runtime/compatibility/node-polyfills/`.
- Framework compatibility under `devtools/azion-edge-runtime/compatibility/frameworks/`, and the template showcase beneath it.
- The runtime API reference for other products — KV Store, Object Storage, SQL Database, WebSocket, Cache.
- `src/content/docs/en/pages/guides/edge-functions/functions-first-steps.mdx`, present on `main` and deleted on this branch. Deliberately not mined: the Quickstart is written fresh against the Quickstart content type rather than adapted from a page that predates it.

---

## Facts that did not resolve cleanly

Recorded because the skill requires a source for every claim, and these two have either no source or two that disagree.

**Cold starts.** Source 1 contradicts itself. Its framework section states that functions execute "without cold starts" and its comparison table lists cold starts as "Eliminated through Azion Runtime architecture" — while its own limits table, forty lines further down, lists `Max Cold Start | 2s`. The rewrite keeps the limits value and drops the eliminated claim, on the grounds that a limits table is the harder source. The claim also appears on surfaces this rewrite does not touch, so it is worth confirming with the product team.

**Handler signature agreement.** Sources 2 and 6 both document the handler contract. Any disagreement between them is resolved in favor of source 2, which is the more recent and more specific of the two, and the disagreement is noted on the reference page rather than silently smoothed over.

**Code size through the API: 20 MB or 50 MB.** Source 1's limits table says 20 MB. Sources 4 and 5, the two Firewall pages, both say 50 MB in their own limits tables. The limits page carries 20 MB, from the Applications-side source that governs the product section being written, and the Functions Instances page sidesteps the number entirely by linking the limits page. One of the two is stale and needs a product-team ruling.

**Which handler form is current.** Source 1 documents functions using `addEventListener('fetch', ...)` throughout. Source 2 marks that Service Worker form **legacy** and ES Modules (`export default { fetch }`) **recommended**. Source 2 wins across the section: the Quickstart teaches ES Modules, the Handlers reference documents both and marks the legacy one, and the Overview describes a function as exporting a handler rather than registering one. Source 1 is simply older than the runtime it describes.

**What a `firewall` handler returns.** Source 6 shows a `firewall` handler returning a `Response`. Source 2 never does — its `firewall` handler calls `ctx.deny()` to block or returns bare to continue. The Handlers page follows source 2; source 6's snippet looks like its own `fetch` example with the name changed, and it contradicts the `ctx.deny()` semantics both sources otherwise agree on.

**Environment variable size, 32 KB, scope unclear.** Source 1's limits table gives 32 KB as the maximum *combined* size of all environment variables for one function. Source 7 gives 32 kB as the maximum size of *one* value. Same number, different scope, different unit casing. The limits page carries source 1's row only, rather than printing two adjacent rows that assert both. The real scope needs a product-team ruling.

**Anything a content type mandates and no source fills** is emitted as a `[GAP: ...]` marker on the page — never as an omitted section and never as an invented one. Search the new pages for `[GAP:` before review.
