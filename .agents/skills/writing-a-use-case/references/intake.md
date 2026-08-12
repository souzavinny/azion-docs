# Intake

Two things happen before a word of the page gets written. You narrow the scenario until it names one setup, and you find out what the corpus can actually support. Both produce an artifact you keep.

## Part 1: Narrow the scenario

`e-commerce` is an industry. It is not a use case. A use case names one setup that one team builds in one sitting.

### The statement

Write one sentence. It is the page in compressed form, and everything later checks against it.

```
A <team> that <has this> configures <this setup> so that <this checkable outcome>.
```

Worked:

- Given `e-commerce`: *A storefront team that already deploys a catalogue site configures cache rules, a bypass for the cart, and a firewall on checkout, so that catalogue pages answer from cache and cart pages never do.*
- Given `live streaming`: *A media team that already produces an HLS feed configures delivery and cache for its segments and its manifest, so that the manifest revalidates while segments stay cached.*

If the sentence needs an "and also", it is two use cases. Write the first one.

### The three questions

Ask the requester at most three. Default the rest and say what you defaulted.

1. **What does the team already have?** This sets where the page starts. A use case that begins at account signup begins in the wrong place.
2. **Which interface?** Console, CLI, or API. Console first unless told otherwise, because the first tab panel is the default and most readers use it.
3. **What must be true at the end?** This becomes `## Verify the setup`. Without it the page has no ending.

Do not ask about traffic volume, budget, or team size. None of them changes what you write.

### Scope, out loud

Name what the use case does not cover, in the page, in one line under the scenario. A commercial reader assumes anything unmentioned is included. See `commercial-framing.md`.

## Part 2: Build the evidence table

The prompt gives you a scenario. It gives you no facts. Everything the page asserts has to come from somewhere else, and this table is where you put it.

Build it before drafting. It is not part of the page.

| Requirement | Technical need | Product | Source page | Permalink | Verified |
| --- | --- | --- | --- | --- | --- |
| Catalogue loads fast | Cache static product pages | ? | ? | ? | ? |
| Cart is never shared | Bypass cache on a path | ? | ? | ? | ? |
| Checkout is protected | Firewall rule on a path | ? | ? | ? | ? |

One row per requirement. A row is finished when every column has a value and `Verified` says how you know.

### Filling it in

Find what exists before assuming a product:

```bash
# products with reference documentation
ls src/content/docs/en/pages/main-menu/reference/*/

# tasks that already have a guide
ls src/content/docs/en/pages/guides/

# patterns already explained
ls src/content/docs/en/pages/architectures/*/

# the page that documents a feature
grep -rl "<the feature>" src/content/docs/en --include='*.mdx'

# whether this scenario already has a page
grep -ril "<the scenario>" src/content/docs/en --include='*.mdx'
```

Read the pages you find. Do not fill a row from the filename.

### Links come from the permalink field

```bash
grep -m1 "^permalink:" <file>
```

Prefix `/en` and use it exactly. The directory a file sits in is cosmetic and does not determine its URL, so a link built from a path is a guess that renders as a working link and 404s.

### A row you cannot fill

There is no fourth option here.

| Situation | Do |
| --- | --- |
| No product covers the requirement | Cut the requirement. Say in the page that the use case does not cover it. |
| A product covers it, no page documents it | Cut it, and report the gap to the requester as a page worth writing. |
| A page documents it but you cannot verify a value | Link the page, state no value. |
| You remember how it works | **Not evidence.** Treat it as unfilled. |

A use case with three verified requirements is publishable. One with five requirements, two of them reconstructed from memory, is not, and nothing on the rendered page distinguishes them.

### The table decides the page

- Each row becomes one line of the `## What you build` table.
- Each row that needs use-case-specific configuration becomes one `## Configure ...` section.
- Each row becomes one check in `## Verify the setup`.
- Rows whose steps are true for every use case become links, not sections.

If the table has more than four rows needing their own section, the use case is too wide. Go back to the statement and narrow it.
