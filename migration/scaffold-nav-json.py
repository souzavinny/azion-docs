#!/usr/bin/env python3
"""
scaffold-nav-json.py — one-off: emite src/i18n/nav.menu.json (fonte curada do menu principal)
a partir da árvore atual de permalinks, já reagrupada na IA de labels:

  Get started / Build / Store / Secure / Observe / Developer tools / Resources / Manage / More

Reaproveita o walker de frontmatter e as tabelas de rótulos de generate-nav.py.
Depois desta geração inicial, o JSON é mantido À MÃO (curadoria editorial);
este script não deve rodar de novo por cima de um JSON curado.
"""
import glob, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

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
LEAF_LABEL_OVERRIDES = {
    "agreements/sla/25-may-2016": ("Service Level Agreement - May 25, 2016", "Acordo de Nível de Serviço - 25 de maio de 2016"),
    "agreements/customer-agreement/28-july-2016": ("Customer Agreement - July 28, 2016", "Contrato de Cliente - 28 de julho de 2016"),
}
OVERVIEW_CHILD_LABELS = {
    "agreements/tos": ("Current version", "Versão atual"),
    "agreements/sla": ("Current version", "Versão atual"),
    "agreements/customer-agreement": ("Current version", "Versão atual"),
    "get-started/journeys/protect": None,
}
PRODUCT_LABELS = {
    "sql-database": "SQL Database", "kv-store": "KV Store", "edge-dns": "Edge DNS",
    "waf": "WAF", "ddos-protection": "DDoS Protection", "ai-inference": "AI Inference",
    "cli": "CLI", "api": "API", "graphql": "GraphQL", "mcp": "MCP", "lib": "Lib",
    "console-kit": "Console Kit", "form-builder": "Form Builder", "sdk": "SDK",
    "runtime-apis": "Runtime APIs", "siem": "SIEM", "sso": "SSO", "mfa": "MFA", "idp": "IdP",
}
ORDER_HINT = {"overview": 0, "quickstart": 1, "guides": 2, "reference": 3, "concepts": 4, "v3": 9, "archive": 9}

# Subárvores profundas colapsadas em um link de hub (as páginas internas têm menu próprio):
# key -> (label EN, label PT, permalink EN do hub)
COLLAPSE_TO_LEAF = {
    "build/functions/runtime-apis": ("Runtime APIs", "Runtime APIs",
                                     "/documentation/build/functions/runtime-apis/overview/"),  # runtimeMenu (113 páginas)
}

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

def localized(en, pt):
    return {"en": en, "pt-br": pt} if pt and pt != en else {"en": en}

def slug_of(page):
    """slug bilíngue de uma página EN: PT ausente -> transform emite isFallback (/en/)."""
    _, ns = pages["en"][page]
    if ns and ns in ns_pt:
        return {"en": page, "pt-br": ns_pt[ns][0]}
    return {"en": page}

def emit(node_trie, path_segs):
    items = []
    for seg, sub in sorted(((k, v) for k, v in node_trie.items() if k != "__page__"), key=sort_key):
        key = "/".join(path_segs + [seg])
        page = sub.get("__page__")
        children = {k: v for k, v in sub.items() if k != "__page__"}
        force_group = seg in GROUP_LABELS and (not page or seg == "overview")
        if key in COLLAPSE_TO_LEAF:
            en_l, pt_l, hub = COLLAPSE_TO_LEAF[key]
            if hub not in pages["en"]:
                raise SystemExit(f"scaffold: collapse hub missing: {hub}")
            items.append({"key": key, "label": localized(en_l, pt_l), "slug": slug_of(hub)})
            continue
        if page:
            title, ns = pages["en"][page]
            pt_title = ns_pt[ns][1] if ns and ns in ns_pt else None
            if children or force_group:
                text = (label_for(seg, 0), label_for(seg, 1))
            else:
                text = (title, pt_title)
            if key in LEAF_LABEL_OVERRIDES and not children:
                text = LEAF_LABEL_OVERRIDES[key]
        else:
            text = (label_for(seg, 0), label_for(seg, 1))
        entry = {"key": key, "label": localized(text[0], text[1])}
        if page and not children:
            entry["slug"] = slug_of(page)
        if children:
            entry["items"] = emit(children, path_segs + [seg])
            # nó com página E filhos: linha expand-only; página vira primeiro filho "Overview"
            if page and not any(c.get("key") == f"{key}/overview" for c in entry["items"]):
                ov = OVERVIEW_CHILD_LABELS.get(key, ("Overview", "Visão geral"))
                ov_label = localized(*ov) if ov else localized(pages["en"][page][0], ns_pt[pages["en"][page][1]][1] if pages["en"][page][1] in ns_pt else None)
                entry["items"].insert(0, {"key": f"{key}/overview", "label": ov_label, "slug": slug_of(page)})
        items.append(entry)
    return items

def section_items(seg):
    """filhos diretos da seção viram itens do grupo (a seção deixa de existir como linha)."""
    root = f"/documentation/{seg}/"
    kids = emit(build_trie(root), [seg])
    if root in pages["en"] and not any(k.get("key") == f"{seg}/overview" for k in kids):
        kids.insert(0, {"key": f"{seg}/overview", "label": localized("Overview", "Visão geral"), "slug": slug_of(root)})
    return kids

def section_row(seg, en_label, pt_label):
    """seção inteira vira UMA linha expand-only dentro de um grupo."""
    return {"key": f"row/{seg}", "label": localized(en_label, pt_label), "items": section_items(seg)}

def find(items, key):
    for i, it in enumerate(items):
        if it["key"] == key: return i, it
    raise SystemExit(f"scaffold: key not found: {key}")

# ---- montagem dos grupos (IA aprovada; razões no plano/PR) ----

build_items = section_items("build")
# Deploy vira folha dentro de Build (deploy = parte do fluxo de build/ship);
deploy_items = section_items("deploy")
_, deploy_ov = find(deploy_items, "deploy/overview")
build_items.append({"key": "deploy/overview", "label": localized("Deploy", None), "slug": deploy_ov["slug"]})

# Orchestrator = ferramenta de ops -> Developer tools
devtools_items = section_items("devtools")
_, orch = find(deploy_items, "deploy/orchestrator")
devtools_items.append(orch)

resources_items = [
    {"key": "guides/overview", "label": localized("Guides", "Guias"), "slug": slug_of("/documentation/guides/")},
    section_row("architectures", "Architectures", "Arquiteturas"),
    section_row("marketplace", "Marketplace", "Marketplace"),
]

manage_items = [
    section_row("platform", "Platform", "Plataforma"),
    section_row("account", "Accounts", "Contas"),
    section_row("services", "Services", "Serviços"),
]

more_items = [
    section_row("changelog", "Changelog", "Changelog"),
    section_row("agreements", "Agreements & Policies", "Acordos e políticas"),
    {"key": "systemStatus", "label": localized("System Status", "Status do sistema"),
     "icon": "pi pi-chart-line", "slug": {"en": "https://status.azion.com/"}},
]

menu = {
    "mobileAnchors": [
        {"key": "documentation", "label": localized("Documentation", "Documentação"),
         "slug": {"en": "/documentation/", "pt-br": "/documentacao/"}},
        {"key": "guides.mobile", "label": localized("Guides", "Guias"),
         "slug": {"en": "/documentation/guides/", "pt-br": "/documentacao/guides/"}},
        {"key": "devtools.mobile", "label": localized("Dev Tools", None),
         "slug": {"en": "/documentation/devtools/", "pt-br": "/documentacao/devtools/"}},
    ],
    "groups": [
        {"key": "grp/get-started", "ui": "menu.getStarted", "items": section_items("get-started")},
        {"key": "grp/build", "ui": "menu.build", "items": build_items},
        {"key": "grp/store", "ui": "menu.store", "items": section_items("store")},
        {"key": "grp/secure", "ui": "menu.secure", "items": section_items("secure")},
        {"key": "grp/observe", "ui": "menu.observe", "items": section_items("observe")},
        {"key": "grp/devtools", "ui": "menu.devTools", "items": devtools_items},
        {"key": "grp/resources", "ui": "menu.resources", "items": resources_items},
        {"key": "grp/manage", "ui": "menu.manage", "items": manage_items},
        {"key": "grp/more", "ui": "menu.more", "items": more_items},
    ],
}

def count(items):
    return sum(1 + count(i.get("items", [])) for i in items)

out = os.path.join(ROOT, "src/i18n/nav.menu.json")
open(out, "w", encoding="utf-8").write(json.dumps(menu, ensure_ascii=False, indent=1) + "\n")
total = sum(count(g["items"]) for g in menu["groups"])
for g in menu["groups"]:
    print(f"{g['key']:20} {count(g['items']):4} entries")
print(f"{'TOTAL':20} {total:4} entries (+{len(menu['mobileAnchors'])} mobile anchors) -> {os.path.relpath(out, ROOT)}")
