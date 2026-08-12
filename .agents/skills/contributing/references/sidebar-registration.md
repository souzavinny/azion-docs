# Sidebar registration

**A new page appears in no sidebar on its own.** Nothing scans the content directory. Registration is a manual edit, and skipping it ships a page that exists at its URL and is reachable from nowhere.

Agent-only. The style guide does not cover sidebars; `conventions/frontmatter.mdx` only says the `menu_namespace` field exists.

## Menus are JSON, one file per sidebar

```
src/i18n/nav.menu.json          the main sidebar
src/i18n/menus/<name>.menu.json one per product sidebar
```

**Both languages live in the same file.** There is no `en/` and `pt-br/` pair to keep in step. `label` and `slug` are objects keyed by language.

> An earlier version of this file described hand-maintained TypeScript arrays under `src/i18n/en/` and `src/i18n/pt-br/`, and named menus such as `storeMenu` and `buildMenu`. That layout was migrated to JSON and those menu names no longer exist. The JSON format below is current.

## The two halves

**1. Point the page at a menu** with `menu_namespace` in its frontmatter:

```yaml
menu_namespace: objectStorageMenu
```

The value must appear in `src/data/availableMenu.ts`. An unregistered value is a navcheck error. Omitting the field entirely is fine: the page uses the default menu and navcheck skips it.

**2. Add the entry to the JSON menu**, in one place, for both languages:

```json
{
  "key": "obj/create-bucket",
  "label": {
    "en": "How to create an Object Storage bucket",
    "pt-br": "Como criar um bucket do Object Storage"
  },
  "slug": {
    "en": "/documentation/store/object-storage/guides/create-bucket/",
    "pt-br": "/documentacao/store/object-storage/guides/criar-bucket/"
  }
}
```

Each `slug` is that language's `permalink`, character for character, with no language prefix.

## Product menu shape

```json
{
  "meta": {
    "title": { "en": "Object Storage" },
    "root":  { "en": "/documentation/store/object-storage/",
               "pt-br": "/documentacao/store/object-storage/" }
  },
  "groups": [
    { "key": "obj/grp", "items": [ ... ] }
  ]
}
```

A row in `nav.menu.json` opens a product sidebar with a `menu` field naming the registered menu, and its own `slug` must equal that menu's `meta.root`:

```json
{ "key": "start/support", "label": { "en": "Support" },
  "slug": { "en": "/documentation/support/" }, "menu": "supportMenu" }
```

Note the two naming conventions: the registered name is camelCase (`objectStorageMenu`), the file is kebab-case (`object-storage.menu.json`).

## What navcheck enforces

`npm run lint:navcheck` runs inside `build:local`. Exits 1 on:

- A slug that resolves to no content permalink in its language
- A duplicate `key` across all menus
- A row with neither `slug` nor `items`
- Depth greater than 5
- A group `ui` key missing from the English `ui.ts` dictionary
- A product menu with no valid `meta`
- A nav row whose `menu` has no matching file, or whose slug differs from that menu's root
- A product menu referenced by no nav row
- A page whose explicit `menu_namespace` is unregistered, or whose permalink is missing from the menu it selects

Informational only, and safe to ignore: rows at depth 4, the Portuguese twin fallback report, and the orphan report listing pages in no menu.

## Checklist

- [ ] `menu_namespace` matches a name in `src/data/availableMenu.ts`, or is absent
- [ ] Entry added to the JSON menu, with both `en` and `pt-br` slugs
- [ ] Each slug equals that language's `permalink` exactly
- [ ] `key` is unique across every menu file
- [ ] `npm run lint:navcheck` prints `navcheck: OK`
