#!/usr/bin/env python3
"""
generate-nav.py — APOSENTADO. O menu principal agora vive em src/i18n/nav.menu.json
(curado à mão; scaffold inicial por scaffold-nav-json.py; validação por lint:navcheck).
NÃO rode este script: ele sobrescreveria os wrappers src/i18n/{en,pt-br}/nav.ts.
Mantido como referência do formato antigo e como regenerador de rollback.

generate-nav.py — gera src/i18n/{en,pt-br}/nav.ts a partir da árvore nova de permalinks
("menu é dado": a navegação deriva do conteúdo, não o contrário).

EN: árvore aninhada completa (seções fixas do topo, produtos, grupos Quickstart/Guides/
Reference/Concepts como nós, páginas-folha com o title do frontmatter).
PT: dicionário plano NavDictionary keyed pelas mesmas keys, com texto/slug do gêmeo
(pareado por namespace); entradas sem gêmeo caem no fallback EN automático.
"""
import glob, json, os, re
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECTIONS = [  # (segmento, label EN, label PT, icon)
    ("get-started", "Get started", "Comece aqui", "pi pi-bolt"),
    ("platform", "Platform", "Plataforma", "ai ai-azion"),
    ("build", "Build", "Build", "ai ai-build-pillar"),
    ("store", "Store", "Store", "ai ai-store"),  # loaded @aziontech/icons has no ai-store-pillar
    ("secure", "Secure", "Secure", "ai ai-secure-pillar"),
    ("deploy", "Deploy", "Deploy", "ai ai-deploy-pillar"),
    ("observe", "Observe", "Observe", "ai ai-observe-pillar"),
    ("devtools", "Dev Tools", "Dev Tools", "pi pi-wrench"),
    ("marketplace", "Marketplace", "Marketplace", "ai ai-marketplace"),
    ("account", "Accounts", "Contas", "pi pi-user"),
    ("architectures", "Architectures", "Arquiteturas", "pi pi-compass"),
    ("guides", "Guides", "Guias", "pi pi-book"),
    ("services", "Services", "Serviços", "pi pi-comments"),
    ("changelog", "Changelog", "Changelog", "pi pi-megaphone"),
    ("agreements", "Agreements & Policies", "Acordos e políticas", "pi pi-file"),
]
GROUP_LABELS = {
    "quickstart": ("Quickstart", "Quickstart"), "guides": ("Guides", "Guias"),
    "reference": ("Reference", "Referência"), "concepts": ("Concepts", "Conceitos"),
    "overview": ("Overview", "Visão geral"), "first-deploy": ("First deploy", "Primeiro deploy"),
    "by-solution": ("By solution", "Por solução"), "archive": ("Archive", "Arquivo"),
    "v3": ("v3 (legacy)", "v3 (legado)"), "templates": ("Templates", "Templates"),
    "integrations": ("Integrations", "Integrações"), "support": ("Support", "Suporte"),
    "compatibility": ("Framework compatibility", "Compatibilidade de frameworks"),
    "tos": ("Terms of Service", "Termos de Serviço"), "sla": ("SLA", "SLA"),
}
LEAF_LABEL_OVERRIDES = {  # key -> (EN, PT) sidebar label replacing the page title
    # undated legal archives: date them so they read as versions next to "Current version"
    "agreements/sla/25-may-2016": ("Service Level Agreement - May 25, 2016", "Acordo de Nível de Serviço - 25 de maio de 2016"),
    "agreements/customer-agreement/28-july-2016": ("Customer Agreement - July 28, 2016", "Contrato de Cliente - 28 de julho de 2016"),
}
OVERVIEW_CHILD_LABELS = {  # node key -> (EN, PT) label for the injected landing child; None -> use the page/twin titles
    # legal docs: the landing page is the in-force version, not a summary
    "agreements/tos": ("Current version", "Versão atual"),
    "agreements/sla": ("Current version", "Versão atual"),
    "agreements/customer-agreement": ("Current version", "Versão atual"),
    # journey item: the page is one of three parallel journeys, so it keeps its own title
    "get-started/journeys/protect": None,
}
PRODUCT_LABELS = {  # slugs que não titleizam bem
    "sql-database": "SQL Database", "kv-store": "KV Store", "edge-dns": "Edge DNS",
    "waf": "WAF", "ddos-protection": "DDoS Protection", "ai-inference": "AI Inference",
    "cli": "CLI", "api": "API", "graphql": "GraphQL", "mcp": "MCP", "lib": "Lib",
    "console-kit": "Console Kit", "form-builder": "Form Builder", "sdk": "SDK",
    "runtime-apis": "Runtime APIs", "siem": "SIEM", "sso": "SSO", "mfa": "MFA", "idp": "IdP",
}
ORDER_HINT = {"overview": 0, "quickstart": 1, "guides": 2, "reference": 3, "concepts": 4, "v3": 9, "archive": 9}

def read_frontmatter(path):
    txt = open(path, encoding="utf-8", errors="ignore").read()
    fm = txt.split("---", 2)
    head = fm[1] if len(fm) > 2 else txt[:3000]
    def grab(key):
        m = re.search(rf"^{key}:\s*(.+)$", head, re.M)
        if not m: return None
        v = m.group(1).strip().strip("'\"")
        if v in (">-", ">", "|", "|-"):
            m2 = re.search(rf"^{key}:\s*[>|]-?\s*\n((?:[ \t]+.+\n?)+)", head, re.M)
            v = " ".join(l.strip() for l in m2.group(1).strip().split("\n")) if m2 else ""
        return v
    return grab("permalink"), grab("title"), grab("namespace")

pages = {"en": {}, "pt-br": {}}   # permalink(no lang) -> (title, namespace)
ns_pt = {}                          # namespace -> (pt_permalink, pt_title)
for lang in ("en", "pt-br"):
    for f in glob.glob(os.path.join(ROOT, f"src/content/docs/{lang}/**/*.mdx"), recursive=True):
        perm, title, ns = read_frontmatter(f)
        if not perm: continue
        perm = perm.rstrip("/") + "/"
        pages[lang][perm] = (title or perm, ns)
        if lang == "pt-br" and ns:
            ns_pt[ns] = (perm, title or perm)

def label_for(seg, lang_ix):
    if seg in GROUP_LABELS: return GROUP_LABELS[seg][lang_ix]
    if seg in PRODUCT_LABELS: return PRODUCT_LABELS[seg]
    return seg.replace("-", " ").title().replace("Api", "API").replace("Dns", "DNS")

def build_trie(prefix_root):
    trie = {}
    for perm in pages["en"]:
        if not perm.startswith(prefix_root): continue
        rest = perm[len(prefix_root):].strip("/")
        if not rest: continue
        node = trie
        for seg in rest.split("/"):
            node = node.setdefault(seg, {})
        node["__page__"] = perm
    return trie

def sort_key(item):
    seg, sub = item
    return (ORDER_HINT.get(seg, 5), seg)

en_lines, pt_entries = [], []

def emit(node_trie, path_segs, depth):
    items = []
    for seg, sub in sorted(((k, v) for k, v in node_trie.items() if k != "__page__"), key=sort_key):
        key = "/".join(path_segs + [seg])
        page = sub.get("__page__")
        children = {k: v for k, v in sub.items() if k != "__page__"}
        # A section's /overview/ leaf is labeled "Overview" in the sidebar even though its
        # page title is the section name (e.g. "Secure") — the page H1 stays descriptive.
        force_group = seg in GROUP_LABELS and (not sub.get("__page__") or seg == "overview")
        if page:
            title, ns = pages["en"][page]
            text = label_for(seg, 0) if (children or force_group) else title
            if key in LEAF_LABEL_OVERRIDES and not children:
                text = LEAF_LABEL_OVERRIDES[key][0]
            # A node with both a page and children is expand-only, like section headers:
            # no slug (the row only toggles), page surfaced as its first "Overview" child.
            entry = {"text": text, "key": key} if children else {"text": text, "key": key, "slug": page}
        else:
            entry = {"text": label_for(seg, 0), "key": key}
        if page and children:
            # PT twin of the toggle row must also be slug-less: the NavDictionary merge does
            # `matchedObject.slug || entry.slug`, so a slugged PT entry would resurrect the link.
            pt_entries.append({"text": label_for(seg, 1), "key": key})
        elif page and ns and ns in ns_pt:
            pt_perm, pt_title = ns_pt[ns]
            if key in LEAF_LABEL_OVERRIDES:
                pt_title = LEAF_LABEL_OVERRIDES[key][1]
            pt_entries.append({"text": (label_for(seg, 1) if force_group else pt_title), "slug": pt_perm, "key": key})
        elif not page:
            pt_entries.append({"text": label_for(seg, 1), "key": key})
        if children:
            entry["items"] = emit(children, path_segs + [seg], depth + 1)
            if page and not any(c.get("key") == f"{key}/overview" for c in entry["items"]):
                ov = OVERVIEW_CHILD_LABELS.get(key, ("Overview", "Visão geral"))
                entry["items"].insert(0, {"text": (ov[0] if ov else title), "slug": page, "key": f"{key}/overview"})
                if ns and ns in ns_pt:
                    pt_entries.append({"text": (ov[1] if ov else ns_pt[ns][1]), "slug": ns_pt[ns][0], "key": f"{key}/overview"})
                # no PT twin -> emit no PT entry: the merge's isFallback path links to /en/,
                # while a slug-less placeholder would inherit the EN permalink and 404 under /pt-br/
        items.append(entry)
    return items

def ts_value(entry, indent):
    pad = "\t" * indent
    parts = [f"{pad}{{", f"{pad}\ttext: {json.dumps(entry['text'], ensure_ascii=False)},"]
    if entry.get("header"): parts.append(f"{pad}\theader: true,")
    if entry.get("anchor"): parts.append(f"{pad}\tanchor: true,")
    if entry.get("type"): parts.append(f"{pad}\ttype: 'learn',")
    if entry.get("onlyMobile"): parts.append(f"{pad}\tonlyMobile: true,")
    if entry.get("icon"): parts.append(f"{pad}\ticon: {json.dumps(entry['icon'])},")
    if entry.get("slug"): parts.append(f"{pad}\tslug: {json.dumps(entry['slug'])},")
    parts.append(f"{pad}\tkey: {json.dumps(entry['key'])},")
    if entry.get("items"):
        parts.append(f"{pad}\titems: [")
        for it in entry["items"]:
            parts.append(ts_value(it, indent + 2) + ",")
        parts.append(f"{pad}\t],")
    parts.append(f"{pad}}}")
    return "\n".join(parts)

top = []
# mobile header entries
for text_en, text_pt, slug_en, slug_pt, key in (
    ("Documentation", "Documentação", "/documentation/", "/documentacao/", "documentation"),
    ("Guides", "Guias", "/documentation/guides/", "/documentacao/guides/", "guides.mobile"),
    ("Dev Tools", "Dev Tools", "/documentation/devtools/", "/documentacao/devtools/", "devtools.mobile"),
):
    top.append({"text": text_en, "onlyMobile": True, "header": True, "anchor": True, "type": "learn", "slug": slug_en, "key": key})
    pt_entries.append({"text": text_pt, "slug": slug_pt, "key": key})

for seg, en_label, pt_label, icon in SECTIONS:
    root = f"/documentation/{seg}/"
    trie = build_trie(root)
    # Section headers are expand-only: clicking a section toggles its dropdown and never
    # navigates (no slug). The section landing is surfaced as the first "Overview" child.
    entry = {"text": en_label, "header": True, "anchor": True, "type": "learn", "icon": icon, "key": f"sec/{seg}"}
    pt_entries.append({"text": pt_label, "key": f"sec/{seg}"})
    kids = emit(trie, [seg], 1)
    # If the section root hub page exists and no /{seg}/overview/ leaf is already present,
    # surface the hub as the first "Overview" child so it stays reachable from the sidebar.
    # (Pillar sections keep their own /overview/ child, which ORDER_HINT already sorts first.)
    if root in pages["en"] and not any(k.get("key") == f"{seg}/overview" for k in kids):
        _, ns = pages["en"][root]
        kids.insert(0, {"text": "Overview", "slug": root, "key": f"{seg}/overview"})
        if ns and ns in ns_pt:
            pt_entries.append({"text": "Visão geral", "slug": ns_pt[ns][0], "key": f"{seg}/overview"})
        # no PT twin -> emit no PT entry: a matched slug-less "Visão geral" would suppress
        # isFallback and inherit the EN permalink, building a /pt-br/documentation/... 404;
        # omitting it makes the merge fall back to a working /en/ link instead
    if kids:
        entry["items"] = kids
    top.append(entry)

top.append({"text": "System Status", "header": True, "anchor": True, "type": "learn",
            "icon": "pi pi-chart-line", "slug": "https://status.azion.com/", "key": "systemStatus"})
pt_entries.append({"text": "Status do sistema", "slug": "https://status.azion.com/", "key": "systemStatus"})

en_out = "/**\n * GERADO por migration/generate-nav.py — não edite à mão; regenere.\n */\nexport default [\n"
en_out += ",\n".join(ts_value(e, 1) for e in top)
en_out += ",\n];\n"
open(os.path.join(ROOT, "src/i18n/en/nav.ts"), "w", encoding="utf-8").write(en_out)

pt_out = "/**\n * GERADO por migration/generate-nav.py — não edite à mão; regenere.\n */\nimport { NavDictionary } from '../translation-checkers';\n\nexport default NavDictionary([\n"
seen = set()
lines = []
for e in pt_entries:
    if e["key"] in seen: continue
    seen.add(e["key"])
    slug_part = f", slug: {json.dumps(e['slug'])}" if e.get("slug") else ""
    lines.append(f"\t{{ text: {json.dumps(e['text'], ensure_ascii=False)}{slug_part}, key: {json.dumps(e['key'])} }}")
pt_out += ",\n".join(lines) + ",\n]);\n"
open(os.path.join(ROOT, "src/i18n/pt-br/nav.ts"), "w", encoding="utf-8").write(pt_out)

n_nodes = len(seen)
print(f"EN sections: {len(top)} | total keys: {n_nodes} | PT dict entries: {len(lines)}")
