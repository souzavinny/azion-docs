# Writing quality

Word choice and framing, calibrated for technical documentation. Used by both the `contributing` and `reviewing-a-page` skills.

**Canonical source:** `src/content/docs/en/pages/style-guide/writing/word-choice.mdx`. When a rule changes, change both.

This file is about **word choice and framing**. `simplified-technical-english.md` is about **sentence construction**. A draft needs both.

## Calibration first

Agent-only. The style guide writes for a person, who does not need to be told which findings to suppress. A reviewer does.

**Documentation legitimately does things a blog post should not.** A general prose linter applied here produces mostly noise and buries the findings that matter.

| Pattern | Blog | Docs | Why |
| --- | --- | --- | --- |
| Em dashes | strict | **relaxed** | Punctuation, not a tell, in reference prose |
| Heavy bullet use | strict | **relaxed** | Lists are the medium |
| Frequent bold | strict | **relaxed** | Marks UI labels and product names |
| Hedging | strict | **relaxed** | Accuracy sometimes requires it |
| Repeated sentence structure | strict | **relaxed** | Consistency helps scanning |
| Rule of three | strict | **relaxed** | Three settings are three settings |
| Promotional language | strict | **strict** | Docs never sell |
| Rhetorical questions | strict | **strict** | Headings name things |
| Title case in headings | strict | **strict** | Sentence case is house style |
| Invented specifics | strict | **critical** | The worst failure mode here |

## The one that matters most

**Invented specifics.** A limit, a default, a field name, a flag, or an error string that came from pattern-matching a similar product rather than from this one.

It is indistinguishable from correct documentation until a reader tries it and it fails. Everything else on this page is cosmetic by comparison.

Every number, field name, and command must trace to a source you can name. A page with a gap is recoverable. A page with a confident wrong value is not, because nobody knows to check it.

## Vocabulary

Replace when the word is decoration. Keep when it carries technical meaning.

| Avoid | Use |
| --- | --- |
| delve into | cover, explain |
| leverage (as a verb, meaning use) | use |
| utilize | use |
| facilitate | let, allow |
| in order to | to |
| due to the fact that | because |
| has the ability to | can |
| at this point in time | now |
| it is important to note that | (delete, keep the sentence) |
| a wide range of | (name the range) |
| various | (name them, or say how many) |
| seamlessly | (delete, or say what does not break) |
| robust | (say what it withstands) |
| powerful | (say what it does) |
| comprehensive | complete, or say what it covers |
| cutting-edge, state-of-the-art | (delete) |
| a testament to | (delete) |
| plays a crucial role in | (say what it does) |
| in today's landscape | (delete the sentence) |

**Legitimate in technical context, do not flag:** `robust` describing a retry policy, `leverage` describing actual platform APIs, `ecosystem` describing a package ecosystem, `comprehensive` describing coverage that genuinely is, `streamline`, `facilitate`, `underpin`, `seamless` describing an actual technical seam.

The test is whether the word claims *quality* or describes *behaviour*. "Robust security" is a quality claim. "A robust retry with exponential backoff" describes behaviour.

## Structural patterns

- **Promotional framing.** Adjectives selling a product. The reader already chose it.
- **Significance inflation.** Sentences about how important something is, in place of what it does.
- **Rhetorical questions**, especially as headings. `What is caching?` becomes `Caching`.
- **Participle padding.** Trailing `-ing` clauses that add words and no information.
- **Generic conclusions.** A closing paragraph restating the page. End on the last concrete fact or a link worth following.
- **Negative parallelism.** "It's not just X, it's Y." Say Y.
- **False ranges.** "From configuration to deployment to monitoring" where the items are not on a scale.
- **Undefined "you can".** Name the options or link to where they are named.

## Sentence-level

- **Passive voice where the actor matters.** "A bucket is created" hides who creates it.
- **Copula avoidance.** "X serves as the mechanism for Y" is "X does Y".
- **Uniform sentence length.** Vary it, and prefer short.

## Do not flag

- Prose you would have written differently. Voice is not a defect.
- Repetition across sibling reference pages. They repeat so each stands alone.
- Sentence fragments in table cells.
- Contractions in existing pages. New prose avoids them; an existing one is not a finding.
- Short paragraphs, or long ones, absent another problem.
- Lists that are long because the thing being listed is long.

## Self-reference escape hatch

Files that quote bad examples in order to ban them are not violating their own rules. When checking anything under `.agents/` or under `style-guide/`, judge what the page *asserts*, not what strings it contains.

## Before handing over a draft

- [ ] Every number, field name, and command traces to a source you can name
- [ ] No adjective makes a quality claim about an Azion product
- [ ] Headings name things and are in sentence case
- [ ] No sentence would survive being deleted without loss
- [ ] The checklist in `simplified-technical-english.md` also passes
