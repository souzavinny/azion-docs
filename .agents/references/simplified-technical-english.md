# Simplified Technical English

Sentence construction for every page in this repository, adapted from **ASD-STE100 Issue 9** (15 January 2025). Used by both the `contributing` and `reviewing-a-page` skills.

**Canonical source:** `src/content/docs/en/pages/style-guide/writing/sentence-structure.mdx`. It carries the same rules with reasons, examples, and sources. When a rule changes, change both.

House style in `house-style.md` decides voice and formatting. This file decides sentence construction, and it is the narrower rule where they touch.

## The split that organizes everything

STE writes different rules for **procedures** than for **descriptions**, and that split maps onto Diátaxis.

| Diátaxis type | STE mode | Sentence cap | Voice |
| --- | --- | --- | --- |
| Tutorial | procedural | 20 words | Imperative, active |
| How-to | procedural | 20 words | Imperative, active |
| Get started | procedural | 20 words | Imperative, active |
| Troubleshooting | procedural | 20 words | Imperative, active |
| Reference | descriptive | 25 words | Active; passive only when the actor is unknown |
| Explanation | descriptive | 25 words | Active; passive only when the actor is unknown |

Steps take the tighter budget because a reader executes them one at a time.

## The rules

- **One instruction per sentence.** A numbered step with two actions is a step where the second gets skipped. The rule that matters most in procedures.
- **Sentence length.** 20 words procedural, 25 descriptive. Prose only; table cells, code, and command output are exempt.
- **Simple tenses only.** Infinitive, imperative, simple present, simple past, simple future, past participle as an adjective. No auxiliary-built compounds. Prefer simple present for product behaviour.
- **Active voice.** Required in procedures. In description, passive only when the actor is genuinely unknown or is the platform.
- **`-ing` only as a noun.** No verb form, no trailing participle clause. `The connector routes traffic, reducing latency` is both padding and an ambiguity.
- **Headings lead with an imperative verb, not a gerund.** An `-ing` word naming a thing is a noun and stays.
- **Noun clusters cap at three words.** A product name counts as one unit.
- **Do not drop words to shorten a sentence.** Keep the subject, the verb, and the articles. `Objects not cached will be purged` leaves the reader guessing which objects.
- **One topic per paragraph, six sentences at most.**
- **Vertical lists for sequences.** Three or more steps, conditions, or alternatives become a list.
- **Same word, same meaning, every time.** One verb per action, across the page and its neighbours. When the action maps to a Console control, use that control's word.
- **No contractions.**

## Corpus measurements

Agent-only. These numbers calibrate how findings get reported, and they are not in the style guide.

| Sample | Cap | Median | 90th percentile | Over cap |
| --- | --- | --- | --- | --- |
| `guides/`, procedural | 20 words | 8 words | 19 words | 8% |
| `reference/`, descriptive | 25 words | 13 words | 25 words | 9% |

The 90th percentile lands on the cap in both samples, so the numbers describe what good pages here already do.

Two figures that shape enforcement:

- **972 of 5,866 English headings lead with a gerund**, across 310 of 742 pages. 932 are task labels and become imperatives; the 40 `Getting started` headings are already correct. A backlog, not an exemption.
- **57% of pages in `guides/` breach the sentence cap five or more times.** These findings are cheap to generate and easy to over-report, so `editorial-checks.md` caps how many a review may list.

Fix headings on any page you are already editing. Do not open 310 pages to close the backlog.

**Prevalence is not evidence.** When this corpus contradicts an external standard, check the standard before assuming the corpus is right.

## Vocabulary: what replaces ASD's dictionary

We do not apply the ~900-word approved dictionary. It is general-English built for aerospace maintenance, so it carries no software vocabulary, and it is ASD's document rather than ours.

STE rules **1.5** and **1.12** let a project approve its own Technical Names and Technical Verbs. That allowance is what this repository uses:

| STE concept | Ours |
| --- | --- |
| Approved dictionary | `terminology.md`, plus the live product names |
| Technical Names (rule 1.5) | Azion product and feature names, API field names, CLI flags |
| Technical Verbs (rule 1.12) | `deploy`, `purge`, `cache`, `provision`, and the verbs the Console uses |
| Non-approved words | The substitution tables in `writing-quality.md` and `terminology.md` |

The principle, not the list: **pick the plainest word available and use it the same way every time.** Define a domain term once, where the reader first meets it, then link to it.

## Where we deliberately diverge

- **The caps are targets, not build gates.** Nothing in CI counts words. A clear 26-word descriptive sentence is not a finding.
- **Portuguese pages follow the structural rules, not the vocabulary ones.** Length, one instruction per sentence, tenses, voice, and noun clusters all transfer. `terminology.md` carries the vocabulary side.
- **Marketing copy is out of scope.** STE is deliberately flat, which is right for documentation and wrong for a launch post.

## Before you hand over a draft

- [ ] No sentence in a procedure runs past 20 words; none in description past 25
- [ ] Every numbered step contains exactly one instruction
- [ ] No compound tenses; simple present for product behaviour
- [ ] No passive voice in steps; in description, only where the actor is unknown
- [ ] No `-ing` word used as a verb or a trailing participle clause
- [ ] No noun cluster over three words, counting a product name as one
- [ ] No dropped articles, subjects, or verbs
- [ ] No paragraph over six sentences, and each covers one topic
- [ ] One verb per action, used consistently across the page

## Sources

The canonical page carries the standard, the About page, and the Google heading rule. These two back claims made only here:

- [ASD Europe — Issue 9 release](https://www.asd-europe.org/news-media/news-events/news/simplified-technical-english-asd-ste100-issue-9/) — no new rules, 31 reworded, 555 dictionary entries updated
- [Simplified Technical English — Wikipedia](https://en.wikipedia.org/wiki/Simplified_Technical_English) — the numeric limits and the rule 1.5 / 1.12 allowance

Rule numbers and limits come from these public summaries, not from a copy of the standard. When an exact rule number matters, check the official download.
