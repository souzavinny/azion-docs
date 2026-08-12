---
name: writing-a-use-case
description: Use when creating a use-case page for the Azion documentation — turning a commercial scenario such as e-commerce, live streaming, online banking, or SaaS into a guide that shows the setup it needs, the products it uses, and how to verify it works.
---

# Writing a use case

A use case is a guide with a commercial frame. The reader arrives with a business problem rather than a task, so the page opens with the scenario and closes with a setup they can verify. Everything between those two is an ordinary guide.

This skill routes. The detail lives in `references/`. Paths are relative to this skill directory unless they start with `.agents/`, which means repo root.

## Input

A scenario, usually one or two words: `e-commerce`, `live streaming`, `online banking`, `SaaS onboarding`.

That is not a page yet. One word names an industry. A use case names one setup that one team builds. Narrow it first, in `references/intake.md`.

## The rule that shapes the page

**Inline what is specific to this use case. Link what is true for every use case.**

Creating an account, installing the CLI, and creating an application are true for every use case. They are links. The cache rule that keeps a product page fresh for 30 seconds while the cart stays dynamic is specific to this one. It goes on the page, in full, with its values.

A use case that inlines everything duplicates pages that are already maintained elsewhere, and it goes stale the first time one of them changes. A use case that links everything is a hub, not a guide.

## Process

In order. Step 2 is the one that keeps the page honest, so do not skip it.

| Step | Read |
| --- | --- |
| 1. Narrow the scenario to one buildable setup | `references/intake.md` |
| 2. Build the evidence table before writing any prose | `references/intake.md` |
| 3. Draft against the skeleton | `references/page-shape.md` |
| 4. Write the scenario and requirements without selling | `references/commercial-framing.md` |
| 5. Set frontmatter, namespace, permalink | `.agents/skills/contributing/references/frontmatter-and-permalinks.md` |
| 6. Write the agent twin | `.agents/skills/contributing/references/agent-twin.md` |
| 7. Add the Portuguese version | `.agents/skills/contributing/references/bilingual.md` |
| 8. Register it in a sidebar | See below |

Voice, sentence construction, terminology, accessibility, components, and length come from `.agents/references/`, the same as for any other page. This skill adds to them. It overrides none of them.

A use case is a **pattern of the how-to type**, so `src/content/docs/en/pages/style-guide/content/how-to-guides.mdx` applies as well. The style guide is the canonical rendering of every writing rule, and `.agents/skills/contributing/references/content-types.md` maps each kind to its page.

## Sidebar registration on this branch

Menus are JSON, one file per sidebar, both languages in the same file:

```
src/i18n/nav.menu.json        the main sidebar
src/i18n/menus/*.menu.json    one per product sidebar
```

An entry carries a `key`, a `label` keyed by language, and a `slug` keyed by language. Each `slug` is the target page's `permalink` for that language, with no language prefix. `npm run lint:navcheck` runs inside `build:local` and exits 1 on a slug that resolves to no page, on a duplicate `key`, and on a page whose `menu_namespace` is unregistered in `src/data/availableMenu.ts`.

Full format, including what navcheck enforces: `.agents/skills/contributing/references/sidebar-registration.md`.

## Ground rules

**A use case is procedural.** It takes the tighter budget: 20 words per sentence, one instruction per step. See `.agents/references/simplified-technical-english.md`.

**Never invent a fact.** Every value, field name, product name, and command traces to a page or a source you can name. A use case is written from a prompt rather than from a spec, which makes this the failure mode the skill exists to prevent. `references/intake.md` is how you avoid it.

**Never make a commercial claim.** No cost saving, no percentage gain, no competitor, no customer name, no compliance assertion. See `references/commercial-framing.md` for what goes in their place.

**Example figures are not limits.** A number that illustrates the scenario belongs in the scenario paragraph and nowhere else. Next to a product name, a reader reads it as a platform limit.

**Never invent a product name.** Read `.agents/references/terminology.md`. A directory path is not evidence: several still carry names the prose has moved away from.

**Never commit or push automatically.** Make the changes, then ask.

## When it is not a use case

Stop and write something else when:

- **There is nothing to configure.** The page explains a design, so it belongs in `src/content/docs/en/pages/architectures/`. Follow `src/content/docs/en/pages/style-guide/content/architecture.mdx`.
- **The setup is one task.** It is a how-to. Follow `src/content/docs/en/pages/style-guide/content/how-to-guides.mdx`.
- **The reader has no scenario, only the product.** It is a tutorial. Follow `src/content/docs/en/pages/style-guide/content/tutorials.mdx`.

## Validate before you finish

```bash
npm run build:local
```

On this branch that runs the build, the frontmatter validator, and `lint:navcheck`. All three must pass.

Then check what none of them can:

- Every command and value on the page was run, or traced to a page you can name.
- Every link resolves, and each one came from the target page's `permalink` field.
- The page appears in the sidebar you intended, and not only in the JSON.
- The Portuguese version carries the same `namespace`, character for character.
- No sentence on the page makes a claim the page does not check.
