# Terminology

Product names, translation rules, and banned expressions.

**Canonical source:** `src/content/docs/en/pages/style-guide/writing/terminology.mdx`. When a rule changes, change both.

The tables stay here because an agent looks them up on every draft. The reconciliation notes at the end are agent-only: they resolve conflicts with the wider Azion terminology guidance, which is maintained outside this repository and covers the marketing site as well.

## Product names

| Use | Not |
| --- | --- |
| Applications | Edge Application, Edge Applications |
| Functions | Edge Functions |
| Firewall | Edge Firewall |
| Azion Web Platform | Azion Edge Platform |
| Azion Platform | (short form, acceptable) |
| Azion Marketplace | Marketplace da Azion |

**Historical documents are exempt.** Changelogs, release notes, and dated agreements record what was true when written:

- `pages/changelog/**`
- `pages/main-menu/release-notes/**`
- `pages/agreements/**`

A 2020 Terms of Service keeps the names it was signed with. Directory names are also exempt: `edge-application/` as a path is not prose, and renaming it would change permalinks.

## Never translate

`edge computing` · `edge` · `edge location` · `data center` · `serverless` · `on-premise` · `template` · `compliance` · `e-commerce` · `e-mail` · `keywords` · `meta description`

The strings `edge application`, `edge function`, and `edge firewall` also sit on the upstream do-not-translate list. That is guidance for **translation**, not permission to use them as product names in new English text.

## Portuguese substitutions

| Avoid | Use |
| --- | --- |
| borda | edge |
| computação na borda | edge computing |
| aplicativo | aplicação |
| centro de dados | data center |
| módulo | solução |
| nodo | node |
| desempenho | performance |
| cacheado | armazenado em cache |
| Marketplace da Azion | Azion Marketplace |
| Plataforma na Borda da Azion | Plataforma da Azion |
| Plataforma Edge da Azion | Plataforma da Azion |

## Forbidden expressions, all languages

`digital landscape` / `paisagem digital` · `digital transformation` / `transformação digital` · `empower` / `capacitar` · `plethora` / `plétora` · `shed light` / `esclarecer` · `realm` / `reino` · `beacon` / `farol`

## Titles

Sentence case in both languages. Capitalize the first word and proper nouns only.

## Two upstream rules that do not carry over

Agent-only. Both look authoritative enough to be applied by mistake.

**Permalinks are translated here.** The upstream guidance lists `permalink` under do-not-translate. On the docs site permalinks are localized:

```
en:    /documentation/products/store/storage/create-bucket/
pt-br: /documentacao/produtos/store/storage/criar-bucket/
```

Applying that rule literally produces Portuguese pages sitting at English URLs.

**The upstream frontmatter field list does not apply.** It names roughly fifteen fields absent from this repo's schema: `_schema`, `cluster`, `draft`, `noindex`, `ogImage`, `imageDark`, `imageLight`, `lang`, `pillar`, `topics`, `buttons`, `position`, `logos`, `icon`, `target`. It also writes `Namespace` capitalized; the field here is lowercase `namespace`.

This repository's contract is in `.agents/skills/contributing/references/frontmatter-and-permalinks.md`. The one rule that carries over: **`namespace` is never translated**, because it pairs the two language versions.

**Not applicable.** The upstream Spanish section and `/es/` URL rules have no target here. This site publishes English and Brazilian Portuguese only.

## When a name is not here

Ask. Do not infer a product name from a URL, a directory name, or an older page.
