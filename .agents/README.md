# `.agents` — the Azion documentation writing system

A portable set of rules that lets an agent write and review Azion documentation to the same standard a staff technical writer would. Hand an agent this folder and a factual input, and it produces a finished page: correct voice, the right page kind, valid frontmatter, and a Portuguese twin.

The folder is **self-contained**. It fetches nothing and assumes no repository. One file is the exception, noted under [Outside the docs repository](#outside-the-docs-repository).

## What is inside

| Path | Holds |
| --- | --- |
| `agents/docs.md` | The writer-and-reviewer persona. Self-sufficient: restates the essentials, routes for detail. |
| `references/style-guide.md` | The canonical law. Voice, word choice, UI language, headings, links, frontmatter, code, asides, and the patterns that read as machine-generated. |
| `references/procedures.md` | Step grammar: the canonical Console first step, one action per step, outcome sentences. |
| `references/simplified-technical-english.md` | Sentence construction, adapted from ASD-STE100: caps, tenses, noun clusters. |
| `references/terminology.md` | Product names, deprecated names, banned expressions, translation rules. |
| `references/components.md` | The live MDX component set and its mechanics. |
| `references/page-size.md` | Length budgets and writing for retrieval. |
| `skills/contributing/` | The workflow skill: page kinds, component choice, information architecture, changelog, reviewing, bilingual pairs. |
| `skills/writing-a-use-case/` | The use-case kind: a how-to with a commercial frame. |
| `tests/` | Conformance harness. The generated pages double as worked examples of every kind. Test artifacts, not site content. |

**Precedence.** `references/style-guide.md` is the canonical law. Where a rule touches sentence construction, `simplified-technical-english.md` is the narrower rule. Step grammar belongs to `procedures.md`. Product names belong to `terminology.md`. On any conflict between a rule and an existing page, **the rule wins**.

## Install

### Claude Code, inside a repository

Copy the folder to the repository root, then point the tool-specific paths at it:

```bash
cp -R /path/to/.agents ./.agents
mkdir -p .claude
ln -s ../.agents/agents .claude/agents
ln -s ../.agents/skills .claude/skills
```

Claude Code discovers `skills/*/SKILL.md` as invocable skills and `agents/docs.md` as a subagent type. Symlinks keep one copy of the truth.

**Add files to `.agents/`, never to `.claude/`.** In the Azion docs repository `.claude/` carries a deny-all `.gitignore`, so anything dropped there is invisible to git.

### OpenCode

No install. OpenCode discovers this folder natively — it walks up from the working directory and loads any `.agents/skills/*/SKILL.md` it finds, alongside `.opencode/skills/` and `.claude/skills/`. Drop `.agents/` at the repository root and the skills appear.

Global instead of per-project: `~/.agents/skills/`.

OpenCode exposes skills through a `skill` tool rather than a command, so invocation is model-driven there too. The `docs` persona is not discovered automatically; point OpenCode at `agents/docs.md` when you want the reviewer voice.

### Any other agent or tool

No install. Point the agent at the folder:

> Read `.agents/skills/contributing/SKILL.md` and follow it. It routes to the reference for the task.

Use this only for tools with no skill system of their own. The skill holds no rules itself; it is a router, and everything it points at is in the folder.

## Invoking the skills

**You rarely need to.** Skills are model-invoked: the agent reads each skill's `description`, matches it against your request, and loads the skill itself. Ask for a page and `contributing` loads on its own. Descriptions sit in context permanently; the body loads only when the skill fires, so an unused skill costs almost nothing.

Slash commands are the manual override, for when you want to force the workflow:

| Command | Use it for |
| --- | --- |
| `/contributing` | Writing, rewriting, splitting, translating, or reviewing a page |
| `/writing-a-use-case` | Turning a commercial scenario into a verifiable setup guide |

The directory name becomes the command, so those two are the complete set from this folder.

Creating a new page:

```
/contributing Write a how-to for rotating a personal token.

Source, and nothing else:
  <paste the personal tokens reference>

Frontmatter:
  namespace: documentation_account_rotate_personal_token
  permalink: /documentation/account/guides/rotate-personal-token/
```

The skill picks the kind, drafts against its skeleton, and writes the Portuguese twin.

A use case:

```
/writing-a-use-case Live streaming for a media team leaving a legacy CDN.

Already have: an HLS feed and an origin.
Interface: Azion Console.
True at the end: the manifest revalidates while segments stay cached.

Sources, and nothing else:
  <paste the Cache and Real-Time Purge references>
```

Those three lines answer the skill's intake questions. Leave them out and it asks you for them before writing, which costs a round trip.

**`docs` is not a slash command.** It is a subagent persona, invoked through the Task or Agent tool by type name. Subagents do not inherit skills from your session, which is why `agents/docs.md` restates the essentials and stands alone.

If a skill is not firing when it should, the fix is the `description`, not a slash command. Make it name the words a user would actually type.

## How to prompt

Three things decide whether the output is usable.

**Name the source of truth.** The system's first rule is *never invent a fact*. A limit, default, field name, flag, or error string must trace to something you supplied. Paste the spec, the ticket, the API response, the existing page. If you supply nothing, the agent should stop and ask — and a good one will.

**Name the reader's task, not the page kind.** "Someone needs to purge a stale file right now" gets you a how-to. "Someone new should learn caching by building something" gets a tutorial. The agent picks the kind from `skills/contributing/references/content-types.md`; picking it yourself is how pages end up filed wrong.

**Say where it goes**, if you know. A permalink and a namespace cannot be guessed — they are unique per language and the namespace is what pairs the two.

A prompt that works:

```
Write a how-to for purging cached content.

Sources — use only these, invent nothing:
  - <paste the Real-Time Purge reference>
  - <paste the CLI command page>
  - API: POST https://api.azion.com/v4/workspace/purge/url
    body {"items": ["<url>"], "layer": "cache"}

Frontmatter:
  namespace: documentation_build_cache_purge_content
  permalink: /documentation/build/cache/guides/purge-content/

Constraints that must survive: a URL purge is non-recursive, and an
asterisk in a URL purge is a literal character, not a wildcard.
```

A prompt that does not:

```
Write a page about caching.
```

## Create a new page

The full sequence is in `skills/contributing/references/writing-docs.md`. Its nine steps include writing an agent twin, which has no serving mechanism on this branch. The eight that matter when you drive it:

1. **Gather context.** Name the source of truth. Everything traces back to it.
2. **Check the page does not already exist.** Extending beats duplicating.
3. **Pick the kind.** Twelve of them, each with a mandated opening, section order, and closing.
4. **Frontmatter first.** Five fields. Deciding the permalink forces you to decide what the page is.
5. **Draft against the kind**, not against a page you happen to have read.
6. **Choose components** from `references/components.md`. A component that is not in that file fails the build.
7. **Write the Portuguese twin.** English is the source of truth and is written first, always.
8. **Register and validate.**

**English before Portuguese, without exception.** If your task is only the Portuguese page, open the English page first. When it does not exist, stop and say so: a Portuguese page written first has no source, and the English page that follows becomes a translation of a translation.

## Restructure a page in place

Reshaping one page, keeping it as one page. The rules are in `skills/contributing/references/writing-docs.md`.

**The page keeps its identity.** `permalink`, `namespace`, and `menu_namespace` never change. A rewrite that changes the URL is a move, and a move needs a redirect in the same change. A changed namespace breaks the translation pairing silently and passes every build.

**Ask for a diagnosis before a draft.** "It reads badly" is not one. "A numbered click-through under a reference title" is, and so is "a long preamble before the first step".

The step that protects you is the fact inventory. Ask for it explicitly:

```
Before changing anything, list every factual claim on this page —
limits, defaults, field names, error strings, caveats. Then
restructure, and show me which claim landed where.
```

Restructuring is not a licence to delete. The specifics on an old page are usually the most valuable lines on it, and an inventory is how you learn something was dropped instead of a reader learning it.

A structural rewrite of the English page leaves the Portuguese twin structurally wrong. Both change in the same task, or the Portuguese half is explicitly owed.

## Split a page into several

The split procedure is in `skills/contributing/references/information-architecture.md`. Split when one page carries two kinds, or when a reader scrolls past four sections they do not care about. Length alone is weak evidence, though a page over the 16,000-character hard cap is almost always doing too much.

**Find the seams in the outline**: a distinct task a reader would search for on its own, a shift of kind, a section repeating a pattern the others do not share. Never "part 1 / part 2" — every child must stand alone for a reader arriving from search.

Five rules make a split safe:

- **The parent keeps its permalink and becomes a navigation hub.** That protects every inbound link. It holds an orientation sentence and links, not a copy of the content.
- **Each child gets a new, unique permalink and namespace.**
- **Both languages split identically**, with matching namespaces per pair.
- **Every child gets sidebar entries in both languages.** A split that adds six pages and no menu entries has hidden six pages.
- **Redirect every URL that stops resolving.** The parent needs none if it keeps its permalink.

Ask for it in two passes, and do not skip the first:

```
Pass one: propose the split. Give me the outline, each child's
permalink and namespace, the redirect list, and one sentence per
child on why it stands alone. Write nothing yet.
```

Then execute, one child at a time.

## Review an existing page

Ask for a review, not a rewrite:

```
Review this page against .agents. Report findings ranked by severity.
Do not rewrite it.
```

`skills/contributing/references/reviewing-docs.md` sets the tiers and the calibration: never pad a report, never open with praise, never narrate the process. The reviewer decides the page's kind first, because the kind mandates the opening, the sections, and the closing — and those are checkable.

The highest-severity finding is always the same: **a specific you can show is wrong**. A limit, default, field name, or error string that contradicts the source. If it cannot be verified either way, it stays a finding rather than being silently dropped.

## Outside the docs repository

Most of the folder is portable. Three things are not.

**`skills/contributing/references/information-architecture.md` is repository mechanics.** It describes file layout under `src/content/docs/{en,pt-br}/`, the bilingual menu JSONs, permalink and namespace uniqueness checks, and redirects. Outside that repository, read it as the pattern rather than the procedure, and substitute your own paths.

**The validation commands assume the repository.** `npm run build:local` runs the build, the frontmatter validator, and the sidebar check. Outside it, those checks do not exist and the agent cannot self-verify structure. Ask for the writer's checklist at the end of `writing-docs.md` instead.

**`references/components.md` describes the live MDX set** on the Azion documentation site. The rules are portable; the components only render there.

Style-guide links inside these files point at a temporary deployment, `https://5yye2daquza.map.azionedge.net/en/documentation/style-guide/...`, so they resolve today for anyone using the folder standalone. The host is provisional; the path after the host is final.

## Fanning work out

Subagents do not inherit the skills loaded in your session. When you delegate, use the `docs` persona in `agents/docs.md` — it is written to stand alone and restates the essentials before routing.

Give each subagent the frontmatter verbatim. Permalinks and namespaces are the one thing an agent cannot derive, and a guessed namespace breaks the language switcher silently, passing every build.

## The four rules that are never bent

- **Never invent a fact.** If it cannot be sourced, mark the gap and say so. A confidently wrong value is indistinguishable from a correct one until a reader tries it.
- **Never invent a product name.** `references/terminology.md` carries the names and the deprecated ones. A URL or a directory name is not evidence.
- **Never guess a permalink or namespace.**
- **Never commit or push.** Make the changes, then ask.
