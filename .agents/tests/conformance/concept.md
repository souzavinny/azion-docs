# Conformance review: concept — `out/concept.mdx`

Kind: **Concept** (base form Explanation, descriptive register, 25-word cap). Judged against `content-types.md` (Concept entry, closings matrix), `style-guide.md`, `procedures.md`, `simplified-technical-english.md`, `page-size.md`, `terminology.md`, per `reviewing-docs.md`.

## Checklist

- **Opening move** — PASS. Line 11 opens with a declarative statement of behavior (`**Tiered Cache** is a Cache module that creates an additional cache layer...`), not "This page explains". Line 13 is the roadmap sentence naming the five mechanisms. Rule: `content-types.md` (Concept, opening move).
- **Section order** — PASS. Five noun-phrase `##`s (lines 15, 19, 25, 37, 47) mirror the roadmap sentence in order: cache layers, second-layer region, TTL requirements, Bypass Cache limitation, purge order. `## Prerequisites` is not required for a concept — N/A. Each section covers its mechanism; the Bypass Cache section carries the tradeoff the kind requires. Rule: `content-types.md` (Concept, sections).
- **Closing** — PASS. `## Related resources` (line 53), the concept closing per the matrix (`content-types.md` line 173). Four bulleted links (lines 55–58) shaped `[Title](/path/) - reason`, all four targets from the brief's link table. Rule: `content-types.md` (closings matrix).
- **Heading grammar** — PASS. All headings sentence case, noun phrases (no task headings on the page); no gerund leads, no questions, no skipped levels (all `##`), no body H1. "Bypass Cache" (line 37) and "TTL" (line 25) keep feature-name/acronym capitals per `style-guide.md` (headings) and `terminology.md` (titles).
- **Step grammar** — N/A. The page contains no procedures and no code blocks; the Concept kind mandates "No procedures" and the page complies. The one table has a colon lead-in (line 27). Rule: `procedures.md`, `content-types.md` (Concept).
- **Frontmatter** — PASS. Five fields present (lines 2–8). Description is 136 characters (within 50–160), opens with the imperative "Understand", is not a banned opener, and does not restate the title word for word. Permalink (line 8) is lowercase ASCII with trailing slash and no language prefix, matching the brief. Namespace (line 7) is snake_case, matching the brief. Rule: `style-guide.md` (frontmatter, description contract).
- **Voice sweep** — PASS. Grep sweeps run on the file: zero contractions; zero "we"; zero filler/marketing terms from `style-guide.md` (leverage, seamless, straightforward, simply, just, please, e.g., i.e., etc., in order to, various, powerful, robust...); zero forbidden expressions from `terminology.md`; no "click"; no "Learn more"; no time-bound phrasing. Link phrasing uses the two standard formulas: "To set the TTL for a cache policy, refer to..." (line 35) and "For more information, refer to..." (line 49). Passive occurrences ("content is cached", line 17; "is designed", line 11) fall inside the Concept kind's narrow allowance — the actor is the platform. Rules: `style-guide.md`, `content-types.md` (Concept), `terminology.md`.
- **Components** — PASS. No components imported or used, so `<Tabs>`/`<Fragment>`/`<Code>` subchecks are N/A. The single aside `:::caution` (lines 41–43) is a valid type, one per section. Rule: `style-guide.md` (admonitions), `reviewing-docs.md` (P0 components).
- **Sentence caps** — PASS. Descriptive budget is 25 words. The five longest sentences measure 23 (roadmap, line 13), 22 (line 39), 20 (line 17), 19 (line 27), 19 (line 11) — all under the cap. Measured by script on the prose, tables and links excluded. Rule: `simplified-technical-english.md`.
- **Size** — PASS. Body is 2,879 characters (target 8,000, cap 16,000); largest section is the intro at 542 characters (target 2,000, cap 4,000). Every section names its subject and reads alone. Rule: `page-size.md`.
- **Facts** — PASS. Every value on the page traces to the brief: the mechanism and its result, the regions `na-united-states` and `sa-brazil`, Sales-team activation and region change, TTL minimum 3 / default 60 / maximum 2,592,000 seconds, the bypass limitation, the purge order, and all four link permalinks. No `[GAP]` markers appear, and none were needed — the brief covered every fact used. The `/en/` prefix on body links applies the `style-guide.md` link rule (absolute, language-prefixed) to the brief's permalinks; it is composition, not a fact change. Rule: `.agents/tests/README.md` (brief rules), `style-guide.md` (links, invented specifics).

## Notes (no findings)

- "A Bypass Cache rule works at the edge layer only" (line 39): "only" is entailed by the brief's bypass paragraph, not a new value.
- Two closing-link reasons gloss their link titles — "the module that Tiered Cache extends" (line 55), "the settings that define cache policies" (line 56). Both derive from the brief's definition ("Tiered Cache is a Cache module") and the brief's own link table (Configure cache policies → `/documentation/products/guides/cache-settings/`); neither introduces a product value, field, endpoint, or default.
- "Purge the tiered layer first and the edge layer second" (line 49) is a descriptive statement of the ordering constraint, not a procedure; per `reviewing-docs.md`, multi-instruction sentences are no finding on a descriptive page.
- Three `---` separators (lines 23, 45, 51), none immediately after the frontmatter — conforms to `style-guide.md` (page structure).

## Verdict

**CONFORMANT.** All eleven checklist items pass or are N/A; no item fails. No manual edits required.
