# Conformance: architecture — Content delivery at the edge

Page: `out/architecture.mdx` · Brief: `.agents/tests/briefs/architecture.md` · Kind: Architecture (base form Explanation, descriptive register, 25-word cap).

## The checklist

- **Opening move** — PASS. Line 13 states the problem the design solves (latency, origin load) and for whom ("your team delivers static-heavy sites and applications") in the first paragraph, before any heading. The architecture formula in `content-types.md` (line 140) has no verbatim string; the required content is present.
- **Section order** — PASS. Lines 15/21/34/46/53: `## Architecture diagram` → `### Dataflow` → `## Components` → `## Implementation` → `## Related resources`, exactly the skeleton in `content-types.md` line 141. The diagram (line 17) is followed by a reading paragraph (line 19); the dataflow is numbered with exactly six items (lines 25–30), the cap; Implementation holds only links. `## Prerequisites` is not part of this kind — N/A.
- **Closing** — PASS. `## Related resources` (line 53), the closing `content-types.md`'s matrix assigns to Architecture. Both links (lines 55–56) are shaped `[Title](/path/) - reason`.
- **Heading grammar** — PASS. All headings (lines 15, 21, 34, 46, 53) are sentence-case noun phrases; no gerund leads, no questions, no body H1, no skipped levels (`##` → `###` at line 21). Rule: `style-guide.md` Headings.
- **Step grammar** — N/A with one applicable sub-check passing. The page has no procedures; the dataflow is the kind's descriptive numbered walkthrough, not steps a reader executes, so the canonical Console first step, UI verbs, bold/italic step formatting, `(Optional)`, and outcome sentences do not apply. The colon lead-in sub-check does apply and passes: line 23 ("...in this order:") before the numbered list, line 36 ("...one role in the design:") before the component list. Rules: `procedures.md`, `content-types.md` line 141.
- **Frontmatter** — PASS. Five fields (lines 2–10). Description (lines 3–5) is 117 characters (measured), opens with the imperative "Deliver", no banned opener, does not restate the title word for word. Permalink (line 10) is lowercase ASCII, trailing slash, no language prefix. Namespace (line 9) is snake_case. Rule: `style-guide.md` Frontmatter.
- **Voice sweep** — PASS. Grep-verified zero matches for contractions (the two `site's` on lines 4 and 13 are possessives), "we", every filler and marketing term in `style-guide.md`'s tables, "click", "Learn more", and time-bound phrasing. Link phrasing is the standard closing-bullet form only.
- **Components** — PASS (largely N/A). No MDX components are used, so `client:visible`, `<Fragment>` spacing, aside types, and `<Code>` do not apply; there is no copyable input on the page. The image (line 17) is root-absolute with no language prefix per `style-guide.md` Links.
- **Sentence caps** — PASS. Five longest prose sentences, measured: 24 words (line 19), 17 (line 19), 16 (line 19), 15 (line 25), 15 (line 28) — all inside the 25-word descriptive budget from `simplified-technical-english.md`. The longest list item on the page (line 48) is a link bullet whose reason clause is 24 words. The one passive, "A cache key is generated..." (line 29), has the platform as actor — the narrow allowance for descriptive register.
- **Size** — PASS. Body 2,710 characters; largest section (`## Architecture diagram`) 1,363 characters — inside the 2,000/8,000 targets in `page-size.md`, far inside the caps.
- **Facts** — PASS. Every value traces to the brief: the asset path and verbatim alt text (line 17); HTTP/HTTPS, the `X-Cache-Key` header (line 29); the eight documented dataflow behaviors consolidated into six items with none lost (page 5 = brief 5+6, page 6 = brief 7+8); all five component roles (lines 38–42); 432000 seconds/15 days and 31536000 seconds/1 year and the two enforcing rules (lines 48–49); all four link permalinks, correctly given the `/en` prefix links require. No `[GAP]` markers, and none were needed — the brief covered every fact used.

## Verdict

**CONFORMANT.** No checklist item fails.

Notes outside the checklist (not failures): the Components list mixes one noun-phrase item (line 38, "the application at the edge") with four verb-phrase items — `style-guide.md`'s parallel-grammar rule would prefer one form, but the phrasing transcribes the brief's given role verbatim, and list parallelism is not a checklist item. "the same edge node" (line 19) is a consolidation of the brief's single-node request/response path, derived rather than given.
