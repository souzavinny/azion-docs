# House style

Voice and formatting, stated tersely. This is the agent rendering of rules the style guide explains for people.

**Canonical source.** Paths below are relative to `src/content/docs/en/pages/style-guide/`. Read the canonical page when you need the reasoning, a worked example, or a before/after pair. When a rule changes, change both renderings.

| Topic | Canonical page |
| --- | --- |
| Voice and register | `writing/voice.mdx` |
| Headings and titles | `formatting/headings.mdx` |
| Emphasis, links, lists, tables, asides | `formatting/text.mdx` |
| Code blocks and placeholders | `formatting/code.mdx` |
| Words to avoid | `writing/word-choice.mdx` |
| Accessibility | `writing/accessibility.mdx` |
| Screenshots and diagrams | `formatting/images.mdx` |

Sentence construction is in `simplified-technical-english.md`, and it is the narrower rule where the two touch. Product names are in `terminology.md`. Components are in `components.md`.

## Voice

- Second person, present tense, active voice.
- Imperative for steps.
- Describe behaviour and limits. Never sell.
- Split a long sentence. Never clip it by dropping a subject, verb, or article.

## Headings

- Sentence case. Capitalize the first word and proper nouns only.
- Lead with an imperative verb, not a gerund. An `-ing` word that names a thing is a noun and stays: `Getting started`, `Billing`.
- Body starts at `##`. The `title` field renders the only H1.
- Do not skip levels.
- Name the thing, not the section. Not `Step 1`, not `Some important limits`.
- Headings are search queries. `Configure cache TTL` retrieves; `Configuration` does not.
- No emojis in titles, headings, or sidebar labels.

## Titles

- Sentence case, descriptive, and unique across the site.
- Put the most specific information first.
- Never reuse a title.

## Emphasis

- Bold for UI labels and product names only.
- Italic only for a term being defined, once.

## Links

- Absolute, language-prefixed, trailing slash: `/en/documentation/products/build/applications/`.
- Anchors keep the slash before the fragment: `/en/documentation/observe/data-stream/#data-sources`.
- Link text names the destination. Never `click here`, `this page`, or a bare URL.
- Assets are root-absolute with no language prefix: `/assets/docs/images/uploads/diagram.png`.

## Lists and tables

- Numbered for sequence, bulleted for sets.
- Parallel grammar within a list.
- A list of one is a sentence.
- Tables for anything enumerable. Consistent phrasing down a column.
- State units and defaults. A limit without a unit is not a fact.

## Code

- Every command and snippet must have been run.
- Placeholders are obvious and consistent: `[TOKEN VALUE]`, `<your-bucket-name>`. Never a plausible fake value.
- Never a credential, real or fake.
- Introduce every code block with a sentence.

## Accessibility

Full rules in `writing/accessibility.mdx` and `formatting/images.mdx`. The ones that change a draft:

- Write alt text for every image, describing what the image conveys rather than naming it.
- Never rely on colour alone to carry meaning in a diagram.
- No directional language. Not "the button on the right", which is false on a narrow viewport and meaningless to a screen reader.
- Expand an acronym on first use.
- Write explicit instructions. Name the target of every action.
- One H1, no skipped levels.

## Screenshots

- Use one only when words failed.
- Crop to the relevant area.
- Keep account IDs, tokens, and customer data out of the frame.
- Historical records are exempt.

## Words to avoid

- `simply`, `just`, `easy`, `obvious` — they tell a stuck reader to be embarrassed.
- `please` — documentation instructs.
- `currently`, `at the time of writing`, `will soon` — they age and nobody returns.
- `note that`, `it is important to note` — delete the phrase, keep the sentence.
- Latin abbreviations. Use `for example` and `that is`.

The vocabulary substitution table and the machine-generated patterns are in `writing-quality.md`.
