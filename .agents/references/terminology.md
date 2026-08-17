# Terminology

Naming rules for Azion documentation: current product names, translation rules, and banned expressions. This file is self-contained and authoritative for documentation.

## Product names

Use these exactly. Azion renamed its products and platform resources; the old names are legacy.

| Use | Not |
| --- | --- |
| Applications | Edge Application, Edge Applications |
| Functions | Edge Functions |
| Firewall | Edge Firewall |
| Connectors | Edge Connector |
| Console | Real-Time Manager |
| Cache | Edge Cache |
| Application Accelerator | Application Acceleration |
| AI Inference | Edge AI |
| Image Processor | Image Processing |
| Orchestrator | Edge Orchestrator |
| KV Store | Edge KV |
| Object Storage | Edge Storage |
| SQL Database | Edge SQL |
| Network Shield | Network Layer Protection |
| Data Stream | Data Streaming |
| Azion Platform | Azion Edge Platform |
| Azion Marketplace | Marketplace da Azion |

**The platform name.** `Azion Platform` is the canonical name; `Azion Web Platform` is an accepted alternative. Prefer `Azion Platform` in security content. Never `Azion Edge Platform`, in any language.

**Resources and products.** `Applications`, `Firewall`, `Connectors`, and `Console` are platform resources: capabilities of the platform itself. The modules of a resource are products. Name the product first and the resource as context: "Web Application Firewall (WAF) is a Firewall module that inspects HTTP and HTTPS requests", not "Firewall is a product that includes WAF".

**Historical documents are exempt.** Changelogs, release notes, and dated agreements record what was true when they were written. A 2020 Terms of Service keeps the names it was signed with. Do not rename products inside them.

**A URL or directory name is not evidence of a name.** Paths still carry legacy terms (`edge-application/`, `edge-firewall/`) that the prose has moved away from.

## Lowercase what the customer builds

The product name is capitalized; the thing a customer creates with it is a common noun and stays lowercase.

- `Use **Applications** to build your own applications.`
- `**Functions** runs your functions at the edge.`
- Not `Deploy your first Application.`

Capitalizing both leaves the reader unable to tell the product from the object.

## When a name is not here

Ask, or take it from the input you were given. Do not infer a product name from a URL, an older page, or a similar platform. An invented name is the naming version of an invented fact.

## Never translate

These stay in English in every language. They are generic technical vocabulary, not product names.

`edge computing` · `edge` · `edge location` · `data center` · `serverless` · `on-premise` · `template` · `compliance` · `e-commerce` · `e-mail` · `keywords` · `meta description`

Product names are never translated either: `Applications`, `Functions`, `Firewall`, `Azion Platform`, `Azion Marketplace` stay as they are in Portuguese text.

The strings `edge application`, `edge function`, and `edge firewall` also stay untranslated when they appear in existing text. That is guidance for **translation**, not permission to use them as product names. New English text uses the current names above.

## Portuguese substitutions

| Avoid | Use |
| --- | --- |
| borda | edge |
| computação na borda | edge computing |
| aplicativo | aplicação |
| centro de dados | data center |
| nodo | node |
| desempenho | performance |
| cacheado | armazenado em cache |
| Marketplace da Azion | Azion Marketplace |
| Plataforma na Borda da Azion | Plataforma da Azion |
| Plataforma Edge da Azion | Plataforma da Azion |

Do not replace `módulo`. It is the correct word for a module of a product or a resource: "WAF é um módulo do Firewall". Avoid `módulo` only when it stands loosely for a whole product.

## Forbidden expressions, all languages

Never use, in any language:

`digital landscape` / `paisagem digital` · `digital transformation` / `transformação digital` · `empower` / `capacitar` · `plethora` / `plétora` · `shed light` / `esclarecer` · `realm` / `reino` · `beacon` / `farol`

## Titles

Sentence case in both languages. Capitalize the first word and proper nouns only.

- `Configure cache policies`
- Not `Configure Cache Policies`

## Two rules that trip translators

**Permalinks are translated.** The Portuguese permalink is localized and ASCII-folded:

```
en:    /documentation/products/store/storage/create-bucket/
pt-br: /documentacao/produtos/store/storage/criar-bucket/
```

**`namespace` is never translated.** It is the key that pairs the two language versions, and it must be identical, character for character. The frontmatter contract is in `style-guide.md`.
