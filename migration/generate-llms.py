#!/usr/bin/env python3
"""
generate-llms.py — gera as superfícies llms.txt a partir do frontmatter (R1, gap 1).

Saídas:
  public/llms.txt                          raiz curada: quickstarts no topo, fatos
                                           canônicos anti-deprecação (padrão Stripe),
                                           hubs e raízes de produto
  public/documentation/<secao>/llms.txt    uma por seção: todas as páginas EN da seção
Formato: https://llmstxt.org (H1, blockquote, seções H2 com [title](url): descrição).
"""
import glob, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://www.azion.com/en"
SECTIONS = ["get-started", "platform", "build", "store", "secure", "deploy", "observe",
            "devtools", "marketplace", "account", "architectures", "services", "changelog"]

def read_fm(path):
    txt = open(path, encoding="utf-8", errors="ignore").read()
    parts = txt.split("---", 2)
    head = parts[1] if len(parts) > 2 else ""
    def grab(key):
        m = re.search(rf"^{key}:\s*(.+)$", head, re.M)
        if not m: return ""
        v = m.group(1).strip().strip("'\"")
        if v in (">-", ">", "|", "|-"):
            m2 = re.search(rf"^{key}:\s*[>|]-?\s*\n((?:[ \t]+.+\n?)+)", head, re.M)
            v = " ".join(l.strip() for l in m2.group(1).strip().split("\n")) if m2 else ""
        return v
    return grab("permalink"), grab("title"), grab("description")

pages = []
for f in glob.glob(os.path.join(ROOT, "src/content/docs/en/**/*.mdx"), recursive=True):
    perm, title, desc = read_fm(f)
    if perm:
        pages.append((perm.rstrip("/") + "/", title or perm, desc))
pages.sort()

def entry(perm, title, desc):
    d = f": {desc}" if desc else ""
    return f"- [{title}]({BASE}{perm}){d}"

by_section = {s: [] for s in SECTIONS}
for perm, title, desc in pages:
    segs = perm.strip("/").split("/")
    if len(segs) >= 2 and segs[0] == "documentation" and segs[1] in by_section:
        by_section[segs[1]].append((perm, title, desc))

CANON = """## Important notes for AI agents

- REST API base: `https://api.azion.com/v4`. Authentication header: `Authorization: Token [TOKEN]`.
- Use the current product names. Renamed in 2024–2025: Applications (formerly Edge Application),
  Functions (Edge Functions), Cache (Edge Cache), Firewall (Edge Firewall), Object Storage
  (Edge Storage), SQL Database (Edge SQL), KV Store (Edge KV), Orchestrator (Edge Orchestrator),
  Certificate Manager (Digital Certificates), Network Shield (Network Layer Protection),
  Data Stream (Data Streaming). Edge DNS, Edge Pulse, Edge Node and Edge Services keep the prefix.
- v4 concepts: use **Connectors** (formerly Origins) and **Workloads** (formerly Domains).
  Never recommend Origins or Domains — they do not exist in the v4 API.
- MCP server: https://mcp.azion.com — documentation, code samples and CLI command search tools.
"""

root = ["# Azion Web Platform Documentation", "",
        "> Documentation for the Azion Web Platform: build, secure, deploy and observe",
        "> applications on a global distributed network. Bilingual (en, pt-br); every URL",
        "> below has a pt-br twin under /pt-br/documentacao/.", "", CANON, "## Get started", ""]
gs = dict(((p, (t, d)) for p, t, d in by_section["get-started"]))
for perm in sorted(gs, key=lambda p: (p.count("/"), p)):
    t, d = gs[perm]
    root.append(entry(perm, t, d))
root.append("")
for s in SECTIONS[1:]:
    if not by_section[s]: continue
    root.append(f"## {s.capitalize() if s != 'devtools' else 'Dev Tools'}")
    root.append("")
    hub = f"/documentation/{s}/"
    shown = 0
    for perm, t, d in by_section[s]:
        depth = perm.strip("/").count("/")
        if perm == hub or depth <= 2:      # hub + product/tool roots only
            root.append(entry(perm, t, d)); shown += 1
    root.append(f"- Full section index: {BASE}/documentation/{s}/llms.txt ({len(by_section[s])} pages)")
    root.append("")
open(os.path.join(ROOT, "public/llms.txt"), "w", encoding="utf-8").write("\n".join(root) + "\n")

for s in SECTIONS:
    if not by_section[s]: continue
    out = [f"# Azion Docs — {s}", "", f"> All pages of the {s} section. Root index: {BASE}/llms.txt", ""]
    for perm, t, d in by_section[s]:
        out.append(entry(perm, t, d))
    d = os.path.join(ROOT, "public/documentation", s)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "llms.txt"), "w", encoding="utf-8").write("\n".join(out) + "\n")

print(f"root: public/llms.txt ({sum(1 for l in root if l.startswith('- ['))} curated entries)")
print(f"sections: {[(s, len(by_section[s])) for s in SECTIONS if by_section[s]]}")
