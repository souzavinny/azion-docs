# Page size and retrieval

Documentation pages are not only read by people. They are fetched by agents, served as markdown twins, and indexed by retrieval systems that split them into chunks and embed each chunk separately. That changes how you write, not just how much.

## The limits

Measured on the body, excluding frontmatter.

| Unit | Target | Hard cap |
| --- | --- | --- |
| A `##` section | 2,000 characters | 4,000 |
| A whole page | 8,000 characters | 16,000 |

Roughly 4 characters per token in English, closer to 3.5 in Portuguese. So a 2,000-character section is about one retrieval chunk, and an 8,000-character page is three or four. Portuguese runs longer than the same page in English, so aim the English at 7,640 and the pair fits. That ratio is measured, not estimated: across the 760 paired pages in this repository the Portuguese body is a median 1.047 times the English, p90 1.096.

**A page may pass 8,000 characters when every one of its sections fits 2,000.** The page target bounds how many chunks a page becomes; the section target decides whether each chunk is usable. A well-sectioned long page costs a retriever nothing, so the exemption is tied to the property that matters. It never applies to the 16,000 hard cap, and it never excuses an oversized section.

Over the hard cap, split. The split procedure is in the contributing skill's `information-architecture.md`.

## Why it matters

A retrieval system does not return your page. It returns a chunk of it, usually one section, with no neighbors attached.

A very long page becomes dozens of chunks. Any one of them, read alone, is a fragment: pronouns with no referent, steps with no goal, a table with no caption. The retriever finds it, an agent quotes it, and the answer is wrong in a way nobody can trace back to the page.

An 8,000-character page becomes three or four chunks, each still recognizably about one thing.

## Write for the chunk, not just the page

**Every `##` section must make sense read alone, by someone who has not seen the rest of the page.**

- **Name the subject in each section.** Not "It caches content" but "Cache stores content." A pronoun whose referent is two sections up is broken the moment the section is retrieved on its own. **Once the section has named its subject, a definite noun phrase or a pronoun with its referent in the previous sentence is correct and preferred.** This rule guards the chunk boundary, not every sentence inside it: restating the full noun phrase in consecutive sentences produces the repetition that `style-guide.md` bans as a machine-generated pattern.
- **No back-references.** "As mentioned above", "the previous step", "this feature" all assume context the chunk will not have. If a section genuinely depends on an earlier one, say which: "After creating the bucket described in Create a bucket".
- **Headings are search queries.** `Configure cache TTL` retrieves. `Configuration` does not, and `Step 2` never will.
- **Keep a table with its caption.** A table split from the sentence that explains it is noise. If a table is long enough to be its own chunk, give it a heading.
- **One topic per paragraph, six sentences at most.** From `simplified-technical-english.md`. A paragraph covering two topics chunks badly wherever the splitter cuts it.

## Concision is a retrieval requirement

Verbose prose does not just waste the reader's time. It dilutes the chunk. An embedding of 2,000 characters where 600 carry the information matches worse than an embedding of 600 that are all signal.

So the padding rules in `style-guide.md` are not only style. Cutting a 200-word preamble that restates the heading is the difference between a chunk that retrieves and one that does not.

What concision does not license: compression by deletion. Dropping an article or a subject to save characters produces a shorter chunk that retrieves an ambiguity.

## Exemptions

These legitimately exceed the caps and should not be split to satisfy them:

- **Reference tables.** A complete list of 200 status codes is one thing and belongs together. Long is correct; incomplete is not.
- **A `<Tabs>` block.** The Console, CLI, and API paths for one task are a single section by construction, and the panels retrieve better together than apart. Expect these sections to land between 2,000 and 4,000 characters and let them.
- **Changelogs and release notes.** Append-only by nature.
- **Legal agreements.** Single documents; splitting them changes their meaning.
- **Use-case pages.** This kind carries a fixed ten-section skeleton and targets 11,000 characters instead of 8,000. The 16,000 hard cap still applies. The bound that keeps it there is the four-section cap on `## Configure`, in the `writing-a-use-case` skill.

Everything else over the cap is over the cap because it is doing too much.

Refer to https://5yye2daquza.map.azionedge.net/en/documentation/style-guide/content/page-size/ for the full rules, including the corpus statistics behind these numbers.
