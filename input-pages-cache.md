# Input pages — Cache section rewrite

Provenance for the Cache product section. Every page listed here was read from the `main` branch and used as factual input; nothing on the section's pages comes from anywhere else, except the concept layer of a definition, which the skill lets a writer state from the ordinary meaning of a term.

This file is a working record, not site content. No build step reads it.

- **Branch under rewrite:** `revamp/d2-product-sidebars`
- **Source branch for facts:** `main`
- **Skill applied:** `azion-docs-writer` (`teams/marketing/skills/azion-docs-writer` in `azion-ai-toolkit`), at the revision that carries the two-layer definition block, the paragraph contract, fact routing, and the omit-and-handoff rule
- **Writer model:** Claude Fable 5.1, one writer per page, nine in parallel, then one translator per page
- **Extraction command:** `git show main:<path>`
- **Working copies:** `.cleanroom/cache-run2/` in this repository — gitignored, and the reproducible input to any regeneration. It holds the 29 raw sources, the common brief, the translation brief, the mechanical checker, and every draft.
- **Previous run:** the ten pages this run replaces were generated on 2026-08-31 (commit `1d8773780`) under the skill as it stood before the 2026-09-01 rules. Their identities — file paths, `namespace`, `permalink`, `menu_namespace` — are unchanged, so no redirect and no sidebar edit accompanies this run.

---

## How these pages were used

The skill forbids inventing a fact: every limit, default, field name, option string, header, status value, key format, and example value on a page traces to a named source. A slot the sources do not fill is omitted from the page and named in the writer's report, never marked on the page and never filled with a plausible sentence.

Each writer read the skill, the common brief, and its named sources, and nothing else. The writer of a page could not open the version of the page already in the repository, the repository's older copy of the skill, other runs' drafts, the knowledge base, or the web. That isolation is deliberate: a writer that opens the current page reproduces its structure, which is the thing being replaced.

Three rules shaped every page:

- **Fact routing.** The brief gives every fact type one owner page. Limit values live on Cache limits; the cache setting object and its options on Cache Settings; the key format and every variation on Cache keys; purge types and arguments on Real-Time Purge; the lookup path and the status values on How Cache works. Every other page carries one sentence and a link. Writers tagged each fact by type before drafting and reported the facts they carried that another page owns.
- **Concept before product.** The Overview opens by saying what a cache is, for a reader who has never configured one, before naming Cache. The concept page opens on the behavior in the reader's terms before naming any Azion object.
- **Horizontal diagrams, no new images.** Every diagram is a `mermaid` fence opening with `flowchart LR`. A writer keeps an image only if a source carries one; none of the core sources does, so the section carries none.

Sources fall into five roles.

**Primary** sources carry a target page's factual spine. **Guides** are older how-to pages read for facts and Console labels only, never for structure. **Supporting** sources contribute specific facts into a page whose spine is elsewhere. **Terminology-only** sources are read for vocabulary and link targets; their bodies are not rewritten. **Out of scope** sources are recorded so the boundary is legible.

---

## Primary sources

| # | Path on `main` | Title | Feeds |
|---|---|---|---|
| 1 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/edge-caching.mdx` | Cache | Overview; How Cache works (statuses, `X-Cache`, keep-alive, Thundering Herd control, expiration, the 300-second stale window); Cache keys (format and every variation); Cache limits |
| 2 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/cache-settings.mdx` | Cache Settings | Cache Settings (browser and CDN TTL modes, Large File Optimization, Advanced Cache Key option strings, caching HTTP methods, Stale Cache, Adaptive Delivery) |
| 3 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/l2-caching.mdx` | Tiered Cache | Tiered Cache; Cache limits (tiered rows); the Bypass Cache footnote |
| 4 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/real-time-purge.mdx` | Real-Time Purge | Real-Time Purge; Cache limits (purge rows); the Overview's boundaries block |
| 5 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/application-acceleration.mdx` | Application Accelerator | What the product unlocks for Cache: TTL under 60 seconds, Advanced Cache Key, `POST` and `OPTIONS` caching; the 0 to 31,536,000-second TTL range |
| 6 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/device-groups.mdx` | Device Groups | The objects Adaptive Delivery reads (Cache Settings, Cache keys) |

Source 1 is the page the rewrite exists to split: an overview, a concept page, a key reference, and a limits table sharing one file. Its material goes four ways. Sources 2, 3, and 4 each become one reference page of the same name. Sources 5 and 6 are products with their own pages; only their Cache-facing facts are used, and the pages are linked rather than re-documented.

## Guides read for facts, never structure

| # | Path on `main` | Title | Contributes |
|---|---|---|---|
| 7 | `src/content/docs/en/pages/guides/edge-application/ea-configure-cache-policies.mdx` | How to configure cache policies for Applications | Quickstart: the Console labels for a cache setting and the Set Cache Policy rule |
| 8 | `src/content/docs/en/pages/build-journey/edit-edge-app/edit-cache-settings/cache-settings.mdx` | How to tune your cache settings | Stale Cache enabled by default; the TTL bounds; the API request body and key table that the Overview specimen and the Cache Settings field table are built from |
| 9 | `src/content/docs/en/pages/guides/edge-application/ea-use-advanced-cache-key.mdx` | How to configure Advanced Cache Key for Applications | Option semantics for Cache by Query String and Cache by Cookie |
| 10 | `src/content/docs/en/pages/guides/edge-application/ea-use-modheader-to-check-cache-indicators.mdx` | Verify Cache Indicators with ModHeader | The `X-Cache-*` debug header table returned with `Pragma: azion-debug-cache` |
| 11 | `src/content/docs/en/pages/guides/edge-application/ea-enforce-hls.mdx` | How to enforce HLS cache for live streaming delivery | The Enforce HLS cache behavior, for the Glossary |
| 12 | `src/content/docs/en/pages/guides/graphql/query-tiered-cache-usage-data.mdx` | How to query usage data from Tiered Cache | The Tiered Cache consumption dataset, one sentence and a link on Tiered Cache |

## Supporting sources

| # | Path on `main` | Title | Contributes |
|---|---|---|---|
| 13 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/edge-application.mdx` | Applications | The module table; the limits rows it repeats; the keep-alive footnote |
| 14 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/rules-engine.mdx` | Rules Engine for Applications | Bypass Cache, Set Cache Policy, Enforce HLS cache, and Forward Cookies as link targets; the difference between Bypass Cache and TTL 0 |
| 15 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/main-settings.mdx` | Applications Main Settings | The Cache and Tiered Cache module switches |
| 16 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/websocket.mdx` | WebSocket Proxy | Incompatible with Cache and Tiered Cache |
| 17 | `src/content/docs/en/pages/main-menu/reference/build/edge-application/image-processor.mdx` | Image Processor | The `ims` query string and the image format variation |
| 18 | `src/content/docs/en/pages/main-menu/reference/observe/real-time-events/real-time-events.mdx` | Real-Time Events | The `Upstream Cache Status` values; the Tiered Cache dataset |
| 19 | `src/content/docs/en/pages/main-menu/reference/observe/data-stream/data-stream.mdx` | Data Stream | `$upstream_cache_status` |
| 20 | `src/content/docs/en/pages/devtools/azion-edge-runtime/api-reference/cache_api.mdx` | Cache API | The runtime API a function uses to read and write the cache, as a boundary bullet |
| 21 | `src/content/docs/en/pages/devtools/azion-lib/usage/purge.mdx` | Azion Purge library | Library purge functions |
| 22 | `src/content/docs/en/pages/devtools/azion-lib/usage/application.mdx` | Azion Application module | Library cache setting functions |
| 23 | `src/content/docs/en/pages/devtools/cli/azion-cli/commands/purge/purge.mdx` | Azion CLI purge | `azion purge` and its flags |
| 24 | `src/content/docs/en/pages/devtools/cli/azion-cli/commands/create/create.mdx` | Azion CLI create | `azion create cache-setting` flags and defaults |
| 25 | `src/content/docs/en/pages/devtools/cli/azion-cli/config/azion-config-js.mdx` | Azion IaC | The `cache` and `purge` blocks of `azion.config.js` |
| 26 | `src/content/docs/en/pages/devtools/terraform/resources/applications.mdx` | Applications - Terraform Resources | The `azion_application_cache_setting` resource |
| 27 | `src/content/docs/en/pages/main-menu/pricing/pricing.mdx` | Pricing | Cache billed per 1,000 purges, as a link |
| 28 | `src/content/docs/en/pages/main-menu/reference/accounts/teams-permissions.mdx` | Teams Permissions | The Real-Time Purge and Wildcard Purge permissions |
| 29 | `src/content/docs/en/pages/main-menu/reference/secure/api-v4-migration.mdx` | API v4 Migration | The v4 cache settings endpoint |

## Terminology-only sources

The six guide and tutorial pages already serving `/documentation/build/cache/guides/...` and `/documentation/build/cache/tutorials/...` permalinks on this branch, each carrying a `difficulty` field so the Guides and tutorials hub renders a value. Four of them are sources 7 to 11 in their `main` form; *Purge cached content* and *Build a versioned asset cache* exist only on this branch. Their bodies are not rewritten in this run. Read together, they supply the Glossary's term list and the link tables.

## Out of scope

All of the following mention cache and were left out, with the reason.

- The MCP cache testing guide under `devtools/mcp/`: a devtools page whose comparisons and scripts are not product facts.
- Real-Time Metrics: its Tiered Cache charts and their nine images belong to Observe; the Cache pages link the product.
- Architecture pages, migration guides, and marketplace templates: they apply Cache; they do not define it.
- Agreements, the changelog, and release notes: historical records that keep the names they were written with.
- KV Store and Edge DNS pages: "cache" and "stale" in a different sense.

---

## Settled rulings

The sources contradict each other in several places. Each was resolved in the brief before any writer started, so no page presents the losing side.

- **The Tiered Cache TTL floor.** Source 3 calls 3 seconds a recommendation in a heading and a limit in its table. The table wins; no page calls it a recommendation.
- **Maximum TTL.** Sources 5 and 8 give 31,536,000 seconds; source 3 gives 2,592,000 seconds. They describe different scopes, the edge cache TTL and the Tiered Cache layer, and are cited with those scopes and never merged.
- **The TTL floor.** 60 seconds on the edge cache TTL; 0 with Application Accelerator; 3 with Tiered Cache. Source 8's "maximum and default TTL values" phrasing is not reproduced.
- **Stale Cache defaults.** Enabled by default rests on source 8 alone; the 300-second stale window rests on source 1 alone. Both are cited.
- **Bypass Cache and the tiered layer.** Source 3's footnote, that Tiered Cache keeps caching under a Bypass Cache rule, wins over source 14's general description.
- **Wildcard purge and the tiered layer.** Source 4's exclusion wins over source 3's general purge sentence.
- **Cache status values.** The eight-value list of source 1, matched by sources 18 and 19, wins over the five-value list in source 10.
- **Large File Optimization.** One feature name; "slice" and "fragment" appear only in field names, flags, and the limit row a source spells that way. The fragment size is raised through technical support (sources 1, 3, 4); source 2's Sales path is not cited.
- **Tiered Cache activation.** Source 3's activation through Sales wins; the module switch in sources 13 and 15 is presented as the step after activation.
- **Purge allowance and pricing.** Source 4's per-plan allowance and source 27's per-1,000 billing are not reconciled by any source; the Limits page reproduces the allowance and the Overview links Pricing.
- **Naming.** From the knowledge base: Cache is a Build product and an Applications module; Real-Time Purge is a platform resource, not a Cache module; Application Accelerator and Image Processor are Build products; Tiered Cache is described as a Cache module, as source 3 does.

## Facts the sources do not settle

Reported by the writers, omitted or narrowed on the pages, and owed a product-team answer.

- **The default edge TTL of a new cache setting.** Source 3 gives "default TTL 60 seconds" only inside the Tiered Cache context. The Overview states no default; Tiered Cache carries it scoped as the edge-cache default. Question: what is the default `max_age` of the cache setting a new application starts with?
- **The Console labels of the cache setting name and the rule name fields.** Sources say "give your cache setting a name". The Quickstart writes "Enter a name" without naming a field.
- **Whether the first debug request always returns `MISS`.** Source 1 says content "might be cached for future requests". The Quickstart states the no-copy case; the two `curl` commands and their `X-Cache` lines are composed from source 1's header form and were not run against a live application.
- **API `behavior` value for "varies by all".** Source 8 lists `"ignore"`, `"whitelist"`, `"blacklist"` only, so the Console options *Content varies by all Query String fields* and *Content varies by all Cookies* carry no API value. Defaults for every other API key except `large_file_cache.offset` are also unstated.
- **The CLI flag `--cnd-cache-settings-maximum-ttl`.** Source 24 spells it that way under `azion create cache-setting`, with default `60`, while the same file spells `--cdn-cache-settings-maximum-ttl` elsewhere. Cache Settings reproduces the source spelling. Question for the CLI maintainers: which is the real flag?
- **Tiered Cache region and topology vocabularies.** Source 3 names `na-united-states` and `sa-brazil`; source 8 names `"near-edge"` and `"near-origin"` "(if supported)"; source 25 names `nearest-region`, `br-east-1`, `us-east-1`. Each is stated as its source spells it, in its own interface row, with no mapping asserted. The Console control for the topology, and the values `l2_region` accepts in the CLI JSON, are unstated.
- **Adaptive Delivery and Application Accelerator.** Source 8 places "Cache vary by Devices" under Application Accelerator in Console and under `modules.application_accelerator` in the API; source 2 presents Adaptive Delivery as a Cache feature. The pages gate query string, cookie, and method variations on Application Accelerator and leave device groups ungated. Only one Adaptive Delivery option string is sourced.
- **Terraform arguments and the Libraries payload.** Source 26 shows only `application_id` and `name` for `azion_application_cache_setting`; source 22 shows `browser_cache_settings` values such as `"private"` and `"public"` that match neither the v4 keys nor the CLI JSON. Cache Settings lists the resource and function names only.
- **The purge API endpoint and request body.** No source in the set carries them; Real-Time Purge names "the Cache Purge API" and links the guide. The Console field labels of the purge form and the output of `azion purge` are also unstated.
- **Purge shape for a device-group variation.** Source 4 says a URL purge does not cover it and gives no wildcard shape. Question: does `@@*` at the end of an expression also match `@@<device group>` keys?
- **Whether the `azion.config.js` `layer` field defaults to `cache`.** Source 25 marks it optional without a default. Source 25's v4 example also puts a wildcard purge on the tiered layer, which contradicts source 4; the specimen drops the `layer` field from that entry.
- **The scope of the 10 GB object limit and the purge allowance**, per account or per application, and what "client" means in "operations per client". Source 4 does not define it.
- **`X-Cache-Valid` and `X-Cache-Config`.** Source 10 says the value is set "unconditionally on the webserver" or comes from `Cache-Control`, with no unit, and that the config ID belongs to "the virtual host on the webserver". Cache keys keeps both descriptions close to the source without mapping them to a Console object.
- **A combined `OPTIONS` key.** Sources show the method prefix and the body-hash suffix separately; no source shows both on one key.
- **Thundering Herd, revalidation, and the tiered layer.** No source states what the collapsed requests receive, what decides between `EXPIRED` and `REVALIDATED`, whether an edge-node status reflects a tiered-layer hit, or eviction behavior. How Cache works omits each. Two sentences on the tiered layer, that the layer "absorbs" per-node fetches and that a response "fills both layers on its way back", are derived from source 3's placement and source 18's TTL description rather than stated outright.
- **The Learning Center article titles** were inferred from the URL slugs under the isolation rules; the URLs themselves were verified live before the run.
- **Single-source facts.** Stale Cache enabled by default (source 8 only) and the 300-second stale window (source 1 only), cited on every page that needs them.
- **The `-` cache status has no glossary row of its own**, because the filter component derives anchors from the term text. It is defined inside the *cache status* row.

## Portuguese pairs

Every page ships with a Portuguese twin: identical `namespace`, translated `title`, `description`, and `permalink`, `meta_tags` left in English. Product, feature, and resource names stay in English; `cache setting`, `cache key`, and `purge` stay in English as the documentation already uses them, `purge` and `cache` masculine. All ten Portuguese pages are rewrites of pages that already existed on this branch; the sidebar JSON is unchanged. The concept page is titled `Como Cache funciona`, without the article, following the Functions section's `Como Functions funciona`; every link text was normalized after translation to the title of the page it points to.
