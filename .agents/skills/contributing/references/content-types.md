# Content types

**The style guide is canonical, and it is terse.** Open the page for the kind you are writing and follow it. Do not work from memory, and do not expect a second copy of the rules in this directory: there is not one, on purpose.

Paths below are relative to `src/content/docs/en/pages/style-guide/`. Every one of them is also published, under `/en/documentation/style-guide/`.

## Pick the kind

Four base forms, from Diátaxis. The form sets the structure and the sentence budget. Eleven page kinds apply those forms; the kind sets the template and the place in the information architecture.

| The reader wants to | Kind | Base form | Read |
| --- | --- | --- | --- |
| Meet a product and decide whether it fits | Overview | Reference | `content/overview.mdx` |
| Use a product for the first time | Get started | Tutorial | `content/get-started.mdx` |
| Learn by building something the author chose | Tutorial | Tutorial | `content/tutorials.mdx` |
| Complete one task they arrived with | How-to guide | How-to | `content/how-to-guides.mdx` |
| Reach a goal that crosses products | Multi-product guide | How-to | `content/multi-product-guides.mdx` |
| Fix a symptom they are looking at | Troubleshooting | How-to | `content/troubleshooting.mdx` |
| Look up a field, a limit, a flag, a default | Reference | Reference | `content/reference.mdx` |
| Understand how one thing works and why | Concept | Explanation | `content/concept.mdx` |
| Understand how products combine into a design | Architecture | Explanation | `content/architecture.mdx` |
| Know what changed and when | Changelog | Record | `content/changelog.mdx` |
| Get sent deeper into a section | Navigation hub | None | `content/navigation-hubs.mdx` |

A **use case** is a twelfth kind, a how-to with a commercial frame. It has its own skill: `.agents/skills/writing-a-use-case/`.

Undecided: `content/choose-a-content-type.mdx`. Where a page sits: `content/information-architecture.mdx`. How long it may be: `content/page-size.mdx`.

## Every kind page has the same sections

Purpose, When to use, Register, Structure, Template, Rules, Examples, Related. Once you know where a rule lives on one, you know where it lives on all of them.

## The register decides your sentence budget

Read it off the base form rather than guessing:

| Base form | Register | Cap |
| --- | --- | --- |
| Tutorial, How-to | Procedural | 20 words per sentence, one instruction per step |
| Reference, Explanation, Record | Descriptive | 25 words per sentence |

Full rules in `.agents/references/simplified-technical-english.md`.

## One kind per page

A page that mixes kinds is the most common structural defect in this repository. Read the draft as each reader above; if two of them each want a different half, it is two pages. See `splitting-a-page.md`.

## Agent-only, not in the style guide

- **The markdown twin.** Procedural kinds are also served at `<permalink>.md` and that version should read as a skill. See `agent-twin.md`.
- **Components.** Which MDX components exist, and the mechanics that break silently. See `.agents/references/components.md`. `style-guide/components.mdx` is a placeholder.
- **Build gates.** Frontmatter, permalinks, namespaces: `frontmatter-and-permalinks.md`.
- **Sidebars.** The JSON menu format: `sidebar-registration.md`.
