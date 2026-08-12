# Page size and retrieval

**Canonical source:** `src/content/docs/en/pages/style-guide/content/page-size.mdx`. When a limit changes, change both.

These pages are fetched by agents, served as markdown twins, and indexed by a retrieval system that splits them into chunks and embeds each chunk separately.

## The limits

Measured on the body, excluding frontmatter.

| Unit | Target | Hard cap |
| --- | --- | --- |
| A `##` section | 2,000 characters | 4,000 |
| A whole page | 8,000 characters | 16,000 |

English runs at roughly 4 characters per token, Portuguese closer to 3.5. A Portuguese page runs about 9% longer than its English source, so aim the English at 7,000 when the page will be translated.

Over the hard cap, split. See `.agents/skills/contributing/references/splitting-a-page.md`.

## The rule that changes your drafting

**Every `##` section must make sense read alone, to someone who has not seen the rest of the page.**

- **Name the subject in each section.** A pronoun whose referent is two sections up is broken the moment the section is retrieved alone.
- **No back-references.** Not "as mentioned above", "the previous step", "this feature". If a section depends on an earlier one, name it: "After creating the bucket described in Create a bucket".
- **Headings are search queries.** `Configure cache TTL` retrieves. `Configuration` does not, and `Step 2` never will.
- **Keep a table with its caption.** If a table is long enough to be its own chunk, give it a heading.
- **One topic per paragraph, six sentences at most.**

Concision is a retrieval requirement, not only a style preference. An embedding of 2,000 characters where 600 carry the information matches worse than an embedding of 600 that are all signal. What it does not license is compression by deletion: dropping an article produces a shorter chunk that retrieves an ambiguity.

## Exemptions

- **Reference tables.** A complete list of 200 status codes is one thing. Long is correct; incomplete is not.
- **A `<Tabs>` block.** Console, CLI, and API paths for one task are a single section by construction. Expect 2,000 to 4,000 characters and let them.
- **Changelogs and release notes.** Append-only by nature.
- **Legal agreements.** Splitting them changes their meaning.

Everything else over the cap is over the cap because it is doing too much.

## Current state of the corpus

150 of 728 English pages are over the 8,000 target and 60 are over the 16,000 cap. Those 60 are the split backlog, not a reason to relax the rule. New pages meet it.

## Check a page

Agent-only tooling. Not in the style guide.

```bash
# body size of one page, excluding frontmatter
awk '/^---$/{d++; next} d>=2{c+=length($0)+1} END{print c+0}' <file>

# largest ## section in a page
awk '/^## /{if(n&&c>m)m=c; c=0; n=1; next} n{c+=length($0)+1} END{if(c>m)m=c; print m+0}' <file>

# every page over the hard cap
find src/content/docs -name '*.mdx' -size +16000c
```

Note the delimiter counting in the first command. An `awk` that toggles on `^---$` counts the frontmatter instead of the body, which reads as a suspiciously small number.
