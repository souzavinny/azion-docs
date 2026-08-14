# Conformance: navigation-hub — Object Storage guides

Page: `out/navigation-hub.mdx` · Brief: `.agents/tests/briefs/navigation-hub.md` · Kind: Navigation hub (`content-types.md`, base form: none; descriptive sentence budget per `simplified-technical-english.md` line 19).

## Checklist

- **Opening move** — PASS. Line 11 is one orientation sentence stating what the section holds ("This section holds the guides to manage Object Storage buckets and objects, and the product reference."), matching the hub formula in `content-types.md` ("one orientation sentence saying what the section holds"). No extra prose follows it.
- **Section order** — PASS. Body is link groups under noun-phrase `##`s: `## Buckets` (line 13), `## Objects` (line 23), `## Reference` (line 33) — the grouping the brief names as natural. `## Prerequisites` is not required by this kind. `---` separators (lines 21, 31) sit between major sections and not immediately after the frontmatter, per `style-guide.md`.
- **Closing** — PASS. The closings matrix in `content-types.md` assigns Navigation hub no closing section, and the page has none — no `## Next steps`, no `## Related resources`, no restating paragraph. All 11 links are shaped `[Title](/path/) - one sentence` (lines 15–19, 25–29, 35).
- **Heading grammar** — PASS. All three headings are sentence-case noun phrases; no gerund leads, no questions, no body H1, no skipped levels (`##` only). Decided by `style-guide.md` (Headings and titles).
- **Step grammar** — N/A. The page contains no procedures, numbered steps, or code blocks, so the canonical Console step, outcome sentences, and colon lead-ins do not apply (`procedures.md`).
- **Frontmatter** — PASS. Five fields present (lines 2–8). Description is 114 characters (inside 50–160), opens with the imperative "Find", uses no banned opener, and does not restate the title word for word. Permalink `/documentation/products/store/storage/` is lowercase ASCII with a trailing slash and no language prefix, matching the brief. Namespace `docs_store_storage_hub` is snake_case and matches the brief. Decided by `style-guide.md` (Frontmatter).
- **Voice sweep** — PASS. Grep sweeps over the full file found zero contractions; zero "we"; no filler or marketing terms (leverage, seamless, dive into, straightforward, it is important to note, please, simply, just, e.g., i.e., etc., utilize, in order to, note that, empower, robust, powerful, comprehensive, plethora); no "click"; no "Learn more"; no time-bound phrasing (currently, will soon, recently, new-as-modifier). Decided by `style-guide.md`.
- **Components** — N/A. The page uses no components — no asides, no `<Tabs>`, no `<Fragment>`, no `<Code>`, no imports — so nothing from the dead list and nothing missing a directive (`components.md` via the checklist).
- **Sentence caps** — PASS. A navigation hub follows the descriptive budget of 25 words (`simplified-technical-english.md` line 19). The two longest sentences measure 18 words (the description, lines 3–5) and 16 words (line 11); every link reason is under 10 words. No compound tenses, no `-ing` verbs, no noun cluster over three words (product names count as one unit).
- **Size** — PASS. Sections measure 665 (`## Buckets`), 670 (`## Objects`), and 132 (`## Reference`) characters; the page is 1,941 characters. All inside the 2,000-per-section and 8,000-per-page targets, well under the 4,000/16,000 hard caps in `page-size.md`.
- **Facts** — PASS. All 11 link targets match the brief's permalinks exactly, with the `/en` body-link prefix that `style-guide.md` (Links) mandates for in-prose links; all 11 titles match the brief's page names verbatim; nothing the brief lists is missing and nothing extra appears. The link reasons and the orientation sentence rephrase given subjects only — no limit, default, value, or capability appears that the brief does not give, so no `[GAP]` markers were needed and none appear. `meta_tags` keywords are all drawn from given titles.

## Notes from the adversarial pass

- Checked whether the `---` separators violate the hub's "no other prose" rule: a horizontal rule is not prose, and `style-guide.md` explicitly sanctions `---` between major sections, roughly three per page — this page has exactly three. Not a finding.
- Checked verb consistency (`simplified-technical-english.md`, same word same meaning): each link reason reuses its title's own verb — create, update, delete, list, use, upload, download, consult. No synonym rotation.
- Checked link phrasing against the standard forms: link text names the destination in every case; no "this page", no bare URLs, no "click here".

## Verdict

**CONFORMANT.** 9 PASS, 2 N/A (step grammar, components — the page has no procedures and no components), 0 FAIL.
