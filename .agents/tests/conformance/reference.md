# Conformance: reference — Object Storage

Page: `out/reference.mdx`. Brief: `.agents/tests/briefs/reference.md`. Kind: Reference (descriptive register, 25-word cap).

## Checklist

- **Opening move** — PASS. Lines 11: three definitional sentences ("**Object Storage** is a Store product that stores objects in buckets. A bucket is the container... Azion stores all buckets in the _us-east_ cloud region and bills storage per GB/hour..."), then straight to the data at line 13. No procedure framing. Rule: `content-types.md` (Reference).
- **Section order** — PASS. Noun-phrase `##`s naming the object or field group: `## Buckets` (13), `## Objects` (27), `## Permissions` (40), `## Operations` (54), `## Limits` (79), `## Related resources` (92). `## Limits` present as the kind requires; `## Prerequisites` not required for a reference. Tables carry the data; prose between tables is one or two orientation sentences (24, 36, 50, 90). Rule: `content-types.md` (Reference).
- **Closing** — PASS. Lines 92–97: `## Related resources`, four bulleted links shaped `[Title](/path/) - reason`, each with a reason. Targets are the how-tos and Teams Permissions the brief supplies; no concept page exists in the input, and none was invented. Rule: `content-types.md` (Closings, Cross-linking).
- **Heading grammar** — PASS. All headings sentence-case noun phrases (product names keep capitals); no gerund leads, no questions, no skipped levels (all `##`), no body H1. Rule: `style-guide.md` (Headings and titles).
- **Step grammar** — PASS (largely N/A). No procedures and no numbered click-throughs — correct for a reference, where one would be a P1 mixed-kind finding. Every table has a colon lead-in: lines 15, 28, 42, 56, 64, 81. Rule: `content-types.md` (Reference: "Never a numbered click-through"), `procedures.md`, `style-guide.md` (Code and examples).
- **Frontmatter** — PASS. Five fields present (lines 1–9). Description 111 characters (measured), opens with the imperative "Look up", no banned opener, does not restate the title word for word. Permalink `/documentation/products/store/object-storage/`: lowercase ASCII, trailing slash, no language prefix, matches the brief. Namespace `docs_store_object_storage`: snake_case, matches the brief. Rule: `style-guide.md` (Frontmatter).
- **Voice sweep** — PASS. Grep run on the file: zero contractions; zero "we"; zero filler or marketing terms (leverage, seamless, straightforward, simply, just, please, note that, in order to, e.g./i.e./etc., powerful, robust, and the rest); zero "click"; zero "Learn more"; zero time-bound phrasing. Link phrasing uses only the two standard formulas (lines 36, 50). Rule: `style-guide.md` (Voice, Word choice, Links).
- **Components** — PASS. No components used, so nothing off the live set; no `<Tabs>`, no asides, no `<Fragment>`. No copyable command blocks exist to require `<Code>` — API methods and paths sit in table cells as inline code, the reference convention the brief itself uses. Rule: `content-types.md` (Reference), `style-guide.md` (Code and examples).
- **Sentence caps** — PASS. Five longest prose sentences counted by hand: 19 words (line 24), 18 (line 11), 16 (line 36), 14 (line 11), 14 (line 36). All within the 25-word descriptive budget; table cells exempt. No compound tenses, no `-ing` as a verb or trailing participle ("listing" at line 60 is a noun), no noun cluster over three words. Rule: `simplified-technical-english.md`.
- **Size** — PASS. Body 3,867 characters (measured); largest section (`## Operations`) ~897. All sections under the 2,000 target and 4,000 cap; page under the 8,000 target and 16,000 cap. Every section names its subject and reads alone. Rule: `page-size.md` via the checklist caps.
- **Facts** — PASS. Every value traced to the brief: region, GB/hour billing, no minimum retention, 6–63 characters, alphanumeric and hyphen, `azion` prefix ban, cross-account uniqueness, no rename, empty-plus-24-hours deletion, all three object attributes plus origin-in-Connectors, all three `workloads_access` values and their behavior, Teams Permissions separation, the base URL, all eight operations with methods, paths, and payloads byte-for-byte, all four limits with units, and the raise-on-request note. "Three classes" is derived from the brief's A/B/C enumeration. No `[GAP]` markers needed and none of the page's values lack a brief source; nothing invented. Rule: `tests/README.md` (Facts), `style-guide.md` (Invented specifics).

## Notes (no finding)

- "final object" (line 24, prose) and "last object" (line 88, limits table) name the same referent with two words; each mirrors the brief's own wording in that exact location, and the rule targets action verbs, so this is not reported as a finding.
- The Objects table's description column mixes noun-phrase openers (lines 32–33) with a sentence opener (line 34); below the threshold for a column-consistency finding.

## Verdict

**CONFORMANT.** All eleven checklist items pass; the two notes above are observations, not findings.
