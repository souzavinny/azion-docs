# Conformance tests

Proof that `.agents` generates conformant pages on its own. One test per page kind: a factual brief goes in, a page comes out, and a conformance review checks the page against the kind's skeleton and the voice rules. The generated pages double as worked examples of every kind.

## Layout

| Path | Holds |
| --- | --- |
| `briefs/<kind>.md` | The input: every fact the page needs, labeled as given. |
| `generated/<kind>.mdx` | The output, exactly as generated. |
| `conformance/<kind>.md` | The review: check by check, with the verdict and what rule changes the test forced. |

## Protocol

1. **Isolate.** Copy the entire `.agents/` folder into an empty directory, with nothing else in it. Tests under `.agents/tests/` travel with it; delete `tests/generated/` from the copy so the writer cannot crib from a previous answer.
2. **Generate.** A fresh agent gets exactly two inputs: the copied folder and one brief. No repository, no network, no other context. It loads `agents/docs.md`, follows `skills/contributing/SKILL.md`, and writes the page.
3. **Review.** A second fresh agent, same isolation, reviews the output against `skills/contributing/references/reviewing-docs.md` and the checklist below, and writes the conformance record.
4. **A failure is a rule defect, not an output defect.** If the generator broke a rule that exists, the rule was not findable or not firm enough — restate it where the generator looked. If it broke a rule that does not exist, write the rule. Fix the real `.agents`, delete the copy, re-copy, regenerate from scratch.
5. **Record.** The conformance file states the final verdict, the iteration count, and which rules changed because of this kind.

A kind passes when a generation conforms with no manual edits. If a later rule change touches a kind that already passed, regenerate that kind once at the end.

## The checklist every kind runs

- **Opening move**: present and on the kind's formula, verbatim where the formula is verbatim.
- **Section order**: matches the kind's skeleton in `content-types.md`; `## Prerequisites` as an H2 where required.
- **Closing**: the kind's closing section, links shaped `[Title](/path/) - reason`.
- **Heading grammar**: sentence case; imperative for tasks, noun phrase otherwise; no gerund leads; no questions; no skipped levels; no body H1.
- **Step grammar**: canonical Console first step; one action per step; location before action; `(Optional)` prefix where used; UI verbs only; bold labels, italic values; an outcome sentence after every procedure; a colon lead-in before every procedure and code block.
- **Frontmatter**: five fields; description 50–160 characters, imperative opener, no banned opener; permalink lowercase ASCII with trailing slash and no language prefix; namespace snake_case.
- **Voice sweep**: zero contractions; zero "we"; no filler or marketing terms from `style-guide.md`; standard link phrasing only; no time-bound phrasing outside a changelog.
- **Components**: only the live set; `client:visible` on `<Tabs>`; blank lines inside `<Fragment>`; valid aside types; `<Code>` for copyable input.
- **Sentence caps**: spot-check the five longest sentences against the kind's budget.
- **Size**: sections and page inside the caps in `page-size.md`.
- **Facts**: every value on the page appears in the brief; anything else is a `[GAP: ...]` marker, and inventing one is an automatic fail.

## Brief rules

A brief carries **every fact the page needs** — commands, field names, values, permalinks for links — each labeled `source: given`. The standing instruction to the generator: *if a fact you need is not in this brief, write `[GAP: <what>]` and continue; never invent.* Briefs cite where their facts were transcribed from as published URLs.

The bilingual pair test (the how-to) additionally supplies the Portuguese titles and permalinks its links need.

## What conformance reports may quote

Only this folder's rules and this test's output. Reports name the rule file and the line of the output; they compare against the skeletons in `content-types.md`, not against any external site.
