# Input pages — Functions section rewrite

Provenance for the Functions product section. Every page listed here was read from the `main` branch and used as factual input; nothing on the section's pages comes from anywhere else, except the concept layer of a definition, which the skill lets a writer state from the ordinary meaning of a term.

This file is a working record, not site content. No build step reads it.

- **Branch under rewrite:** `revamp/d2-product-sidebars`
- **Source branch for facts:** `main`
- **Skill applied:** `azion-docs-writer` (`teams/marketing/skills/azion-docs-writer` in `azion-ai-toolkit`), at the revision that carries the two-layer definition block, the paragraph contract, and fact routing
- **Writer model:** Claude Fable 5.1, one writer per page, seven in parallel, then one translator per page
- **Extraction command:** `git show main:<path>`
- **Working copies:** `.cleanroom/functions-run2/` in this repository — gitignored, and the reproducible input to any regeneration. It holds the 18 raw sources, the common brief, the translation brief, the mechanical checker, and every draft.

---

## How these pages were used

The skill forbids inventing a fact: every limit, default, field name, handler signature, and error string on a page traces to a named source. A slot the sources do not fill is omitted from the page and named in the writer's report, never marked on the page and never filled with a plausible sentence.

Each writer read the skill, the common brief, and its named sources, and nothing else. The writer of a page could not open the version of the page already in the repository, the repository's older copy of the skill, the previous run's drafts, or the web. That isolation is deliberate: a writer that opens the current page reproduces its structure, which is the thing being replaced.

Two rules new in this run shaped every page:

- **Fact routing.** The brief gives every fact type one owner page. Limit values live on Functions limits; the handler contract on Handlers; instance fields on Functions Instances; the invocation chain on How Functions works. Every other page carries one sentence and a link. Writers tagged each fact by type before drafting and reported the facts they carried that another page owns.
- **Concept before product.** The Overview opens by saying what a function is, for a reader who has never used one, before naming Functions. The concept page opens on the behavior in the reader's terms before naming any Azion object.

Sources fall into four roles.

**Primary** sources carry a target page's factual spine. **Supporting** sources contribute specific facts into a page whose spine is elsewhere. **Terminology-only** sources are read for vocabulary and coverage; their bodies are not rewritten. **Out of scope** sources are recorded so the boundary is legible.

---

## Primary sources

| # | Path on `main` | Title | Feeds |
|---|---|---|---|
| 1 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/edge-functions.mdx` | Functions for Applications | Overview, How Functions works, Functions limits |
| 2 | `src/content/docs/en/pages/guides/edge-functions/migrate-handler-patterns.mdx` | Migrating handler patterns in Functions | Handlers; How Functions works; the Overview's code specimen |
| 3 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/edge-functions-instances.mdx` | Functions Instances | Functions Instances |
| 4 | `src/content/docs/en/pages/main-menu/reference/secure/edge-firewall/edge-functions-for-edge-firewall/edge-functions-firewall.mdx` | Functions for Firewall | How Functions works; Handlers; the Overview's Firewall section |
| 5 | `src/content/docs/en/pages/main-menu/reference/secure/edge-firewall/edge-functions-for-edge-firewall/edge-functions-instances.mdx` | Functions Instances for Firewall | Functions Instances |

Source 1 is the page the rewrite exists to fix: four kinds sharing one file. Its material splits three ways, the capabilities to the Overview's boundaries block, the bundler and execution material to How Functions works, the limits table to Functions limits. Source 2 is the only page that documents the handler contract, and it wins every disagreement about handlers. Sources 3 and 5 describe one object on either side of the platform and merge into one reference page that states where the two sides differ.

## Supporting sources

| # | Path on `main` | Title | Contributes |
|---|---|---|---|
| 6 | `src/content/docs/en/pages/devtools/azion-edge-runtime/api-reference/handlers.mdx` | Handlers | Handler signatures, cross-checked against source 2 |
| 7 | `src/content/docs/en/pages/devtools/azion-edge-runtime/environment-variables-reference/environment-variables-reference.mdx` | Environment Variables | Environment variable behavior and its size ceiling |
| 8 | `src/content/docs/en/pages/devtools/azion-edge-runtime/api-reference/metadata/metadata.mdx` | Metadata API | Request metadata a function reads |
| 9 | `src/content/docs/en/pages/devtools/azion-edge-runtime/overview/overview.mdx` | Azion Runtime | Where the Functions / Runtime boundary falls |
| 10 | `src/content/docs/en/pages/build-journey/edit-edge-app/edit-functions-instances/functions-instances.mdx` | How to instantiate functions in your application | Quickstart: the Console path; Functions Instances: field labels and API calls |
| 11 | `src/content/docs/en/pages/secure-journey/edit-edge-firewall/instantiate-edge-functions.mdx` | How to instantiate functions in your firewall | The Firewall instantiation contrast |
| 12 | `src/content/docs/en/pages/secure-journey/automate/edge-functions-apis.mdx` | Automate security with Azion Functions | API management facts |
| 13 | `src/content/docs/en/pages/devtools/azion-edge-runtime/code-editor/code-editor.mdx` | Functions Code Editor | One bullet in the Overview's boundaries block |
| 14 | `src/content/docs/en/pages/devtools/azion-edge-runtime/preview/preview.mdx` | Azion Preview Deployment | One bullet in the Overview's boundaries block |
| 15 | `src/content/docs/en/pages/devtools/azion-edge-runtime/debugging/debugging.mdx` | Debugging | One bullet in the Overview's boundaries block |
| 16 | `src/content/docs/en/pages/devtools/azion-edge-runtime/ai-integration/chatgpt-integration.mdx` | Functions ChatGPT integration | One bullet in the Overview's boundaries block |
| 17 | `src/content/docs/en/pages/build-journey/develop-with-azion/lang-js/lang-javascript.mdx` | How to build functions | Quickstart: the Console controls that create a function, and the Hello World body |
| 18 | `src/content/docs/en/pages/guides/edge-functions/functions-first-steps.mdx` | Functions first steps | Quickstart: facts only, never its structure |

Source 18 was excluded from the first run to keep the Quickstart from copying an older shape. This run includes it as a facts-only source, because the kind skeleton, not the source, decides the shape.

## Terminology-only sources

Sixteen guide pages, already serving `/documentation/build/functions/guides/...` permalinks on this branch, each carrying a `difficulty` field so the Guides and tutorials hub renders a value. Their bodies are not rewritten. Read together, they supply the Glossary's term list.

## Out of scope

All of the following belong to Azion Runtime or devtools and keep their own sidebar. The Functions sidebar links Azion Runtime and never documents it.

- The JavaScript runtime API reference under `devtools/azion-edge-runtime/runtime-apis/`.
- Node.js compatibility and polyfills under `devtools/azion-edge-runtime/compatibility/node-polyfills/`.
- Framework compatibility under `devtools/azion-edge-runtime/compatibility/frameworks/`.
- The runtime API reference for other products: KV Store, Object Storage, SQL Database, WebSocket, Cache.

---

## Settled rulings

The sources contradict each other in five places. Each was resolved in the brief before any writer started, so no page presents the losing side.

- **Cold starts.** Source 1's prose claims they are eliminated; its limits table says 2 s. The limits table wins. No page claims eliminated cold starts, and the "traditional hosting" comparison table is not reproduced.
- **Handler form.** ES Modules is current and recommended; Service Worker is legacy, kept for backward compatibility. Where sources 2 and 6 disagree, source 2 wins.
- **What a `firewall` handler returns.** Source 6 shows a `Response`; source 2 never does. The handler calls `ctx.deny()` to block or returns bare to continue. Source 2 wins.
- **Code size through the API.** Source 1 says 20 MB; sources 4 and 5 say 50 MB. 20 MB is used; 50 MB is not cited.
- **Environment variable size, 32 KB.** Source 1 gives it as a combined total; source 7 as one value's maximum. The combined-total form is cited alone.

## Facts the sources do not settle

Reported by the writers, omitted or narrowed on the pages, and owed a product-team answer.

- **How an ES Modules handler reads instance arguments and request metadata.** Every source shows `event.args("<key>")` and `event.request.metadata[...]`, the Service Worker forms. The pages scope both to that pattern. Question for the Runtime team: the ES Modules accessors.
- **The Run Function attribute key.** Source 10 sets `attributes.value` on an application rule; source 11 sets `attributes.function_instance_id` on a firewall rule. Functions Instances presents both, scoped by side. This may be source drift rather than an API difference.
- **The arguments key in a firewall instance response.** Source 11 returns `json_args` where every request and the application response use `args`. Presented as a per-side row.
- **Argument defaults and overrides.** Only source 5, the Firewall side, states the key-by-key merge. Functions Instances applies it to both sides because source 5 says "any instance of that function". If the application side differs, the section narrows to firewalls.
- **Console labels.** Sources call the arguments field both **Args** and **Arguments**; the pages use **Arguments**. No source names the function-name field, the phase selector, or the instance selector on the rule form, so the Quickstart names no field for those steps. No source names the application tab that holds the Functions module switch.
- **The scheme of an application's default domain.** Sources show `xxxxxxxxx.map.azionedge.net/hello-world` with no scheme. The Quickstart's `curl` uses `https://` as composition.
- **What the client receives past each limit.** Sources give it for CPU time (terminated) and JSON args (fails at instantiation) only. Every other limit row states the bound and stops. Whether every limit is raisable, and by plan, is stated only as source 1's generic support tip.
- **Which limits a function invoked from Firewall shares.** Sources 4 and 5 list seven rows. The Limits page names those seven and no more.
- **`event.console`, `event.method`, and whether `event.waitUntil` exists on a `fetch` event.** Each appears once in a code sample or an aside with no definition. Omitted.
- **Whether `ctx.deny()` returns `403 Forbidden`.** Source 4 states the status for `event.deny()` only.
- **A Service Worker `firewall` handler that returns without a finishing outcome.** Source 2's sample returns bare and continues; source 4 says every function on Firewall must end in `event.continue()`, `event.deny()`, or `event.drop()`. Handlers keeps source 2's semantics and scopes source 4's rule to a function instantiated on a firewall.
- **CLI and Terraform for instances.** Source 1 names both for functions only. Functions Instances omits them.

## Portuguese pairs

Every page ships with a Portuguese twin: identical `namespace`, translated `title`, `description`, and `permalink`, `meta_tags` left in English. The object a customer writes is `função`, per the knowledge base; the product stays `Functions`. Six Portuguese pages are new in this run (Quickstart, How it works, Guides hub, Handlers, Limits, Glossary), and two are rewrites (Overview, Functions Instances). The sidebar JSON gains the six Portuguese slugs.
