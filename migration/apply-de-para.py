#!/usr/bin/env python3
"""
apply-de-para.py — executa o mega-move estrutural do revamp (fases F1–F5 de uma vez, modo scratch).

Para cada linha de migration/de-para.csv:
  - MOVER / RELIGAR+MOVER / REESCREVER / VERSIONAR / MANTER / REESCREVER-EM-LUGAR:
      permalink do arquivo := novo_lar sem o prefixo de idioma (no-op se já igual)
  - ARQUIVAR: idem + meta_tag_robots_no_index: true
  - FUNDIR-EM / APOSENTAR-301: arquivo removido; links e redirects apontam para novo_lar

Depois:
  - reescreve TODOS os links internos (frontmatter + corpo) em src/content/docs/**/*.mdx
    usando o mapa antigo→novo (formas com prefixo de idioma e com domínio completo)
  - reescreve slugs nos menus (src/i18n/**/*.ts, src/data/**/*.ts) usando as formas sem prefixo
  - acrescenta as entradas de redirect em cicd/massive-redirect/{en,pt-br}.json,
    deduplicando por `from` e re-apontando entradas existentes que virariam cadeia

Uso: python3 migration/apply-de-para.py [--dry-run]
"""
import csv, json, re, sys, glob, os
from collections import defaultdict

DRY = "--dry-run" in sys.argv
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(ROOT, "migration", "de-para.csv")
PERMALINK_RE = re.compile(r"^[a-z0-9\-/|]+$")
LANG_PREFIX = {"en": "/en", "pt-br": "/pt-br"}
DELETE_ACTIONS = {"FUNDIR-EM", "APOSENTAR-301"}

rows = list(csv.DictReader(open(CSV, encoding="utf-8")))
assert len(rows) == 1474, f"expected 1474 rows, got {len(rows)}"

# join file paths from the inventory (de-para carries no path column)
INV = os.path.join(ROOT, "diagnosis", "azion-docs-inventario-mestre.csv")
path_by_key = {}
for inv in csv.DictReader(open(INV, encoding="utf-8")):
    path_by_key[(inv["url_norm"].rstrip("/") + "/", inv["lang"])] = inv["path"]
for r in rows:
    r["path"] = path_by_key.get((r["url_norm"].rstrip("/") + "/", r["lang"]), "")
missing_paths = [r["url_norm"] for r in rows if not r["path"]]
assert not missing_paths, f"{len(missing_paths)} rows without inventory path, e.g. {missing_paths[:3]}"

# ---------------------------------------------------------------------------
# ARBITRAGENS DE SCRATCH (documentadas; a fusão editorial verdadeira é trabalho
# das fases de cluster — aqui resolvemos as ambiguidades mecânicas do CSV):
#  R1. Hubs de cluster: as homes de cards ficam em /{cluster}/ (estado do D0);
#      as visões gerais de jornada que o CSV manda para /{cluster}/ estacionam
#      em /{cluster}/overview/ (conteúdo preservado, fusão fica para a fase).
#  R2. FUNDIR-EM de build-home/secure-home é cancelado (elas SÃO o hub).
#  R3. platform-home (APOSENTAR-301 → /account/) vira MOVER: o hub de Contas
#      precisa de dono; aposentar sem dono geraria 404 no /account/.
#  R4. Overrides pontuais de colisão (start-with-a-template, get-help,
#      network-lists PT, bucket-actions FUNDIR sem alvo → MOVER).
# ---------------------------------------------------------------------------
CLUSTER_ROOTS = {f"/{d}/{c}/" for d in ("documentation", "documentacao")
                 for c in ("build", "secure", "store", "deploy", "observe")}
RESERVED = {("en", "/documentation/get-started/"), ("en", "/documentation/get-started/first-deploy/"),
            ("pt-br", "/documentacao/get-started/"), ("pt-br", "/documentacao/get-started/first-deploy/"),
            ("en", "/documentation/store/"), ("pt-br", "/documentacao/store/")}
OVERRIDE_NOVO = {
    ("en", "/documentation/products/start-with-a-template/"): "/en/documentation/get-started/start-with-a-template/",
    ("en", "/documentation/products/get-help/"): "/en/documentation/services/support/get-help/",
    ("pt-br", "/documentacao/produtos/secure/firewall/network-shield/network-lists/"):
        "/pt-br/documentacao/secure/firewall/reference/network-shield/network-lists/",
}
FORCE_MOVER = set()  # keys (lang, url_norm) whose delete-action becomes a move

for r in rows:
    key = (r["lang"], r["url_norm"].rstrip("/") + "/")
    if key in OVERRIDE_NOVO:
        r["novo_lar"] = OVERRIDE_NOVO[key]
    pref = LANG_PREFIX[r["lang"]]
    tgt_np = r["novo_lar"][len(pref):].rstrip("/") + "/" if r["novo_lar"].startswith(pref) else None
    is_home_file = "/homes/" in r.get("path", "")
    if tgt_np in CLUSTER_ROOTS:
        if r["acao"] in DELETE_ACTIONS and is_home_file:
            r["acao"] = "MANTER"          # R2: a home É o hub
            r["url_norm"] = tgt_np         # já movida no D0
        elif not is_home_file and r["acao"] not in DELETE_ACTIONS:
            r["novo_lar"] = r["novo_lar"].rstrip("/") + "/overview/"   # R1
    if r["acao"] == "APOSENTAR-301" and is_home_file and tgt_np and tgt_np.endswith("/account/"):
        r["acao"] = "MOVER"                # R3
    if r["acao"] == "FUNDIR-EM" and "bucket-actions" in r.get("path", ""):
        r["acao"] = "MOVER"                # R4: alvo da fusão não existe; estaciona
    if not r["url_norm"].strip():          # blemish do CSV: url_norm vazio → lê do arquivo
        fp = os.path.join(ROOT, r["path"])
        if os.path.exists(fp):
            m = re.search(r"^permalink:\s*(\S+)", open(fp, encoding="utf-8").read(), re.M)
            if m:
                r["url_norm"] = m.group(1).strip().strip("'\"")

report = defaultdict(int)
problems = []
moves = {"en": {}, "pt-br": {}}          # old_permalink(no prefix) -> new_permalink(no prefix)
deletions = []                            # (path, lang, old, target_no_prefix)
archive_paths = set()
planned = []                              # (path, lang, old, new, acao)

for r in rows:
    lang, acao = r["lang"], r["acao"]
    old = r["url_norm"].rstrip("/") + "/"
    novo = r["novo_lar"].strip()
    path = os.path.join(ROOT, r["path"])
    pref = LANG_PREFIX[lang]
    if not novo.startswith(pref + "/"):
        problems.append(f"novo_lar sem prefixo {pref}: {novo} ({r['path']})"); continue
    new = novo[len(pref):].rstrip("/") + "/"
    if not PERMALINK_RE.match(new.strip("/") or "/"):
        problems.append(f"novo_lar viola regex de permalink: {new} ({r['path']})"); continue
    if not os.path.exists(path):
        problems.append(f"arquivo ausente: {r['path']}"); continue
    if acao in DELETE_ACTIONS:
        deletions.append((path, lang, old, new))
        if old != new:
            moves[lang][old] = new
        continue
    planned.append((path, lang, old, new, acao))
    if acao == "ARQUIVAR":
        archive_paths.add(path)
    if old != new:
        moves[lang][old] = new

# collision check: final permalink set per language must be unique
final = defaultdict(list)
for lang, url in RESERVED:
    final[(lang, url)].append("RESERVED-D0-PAGE")
for path, lang, old, new, acao in planned:
    final[(lang, new)].append(r"%s" % path)
collisions = {k: v for k, v in final.items() if len(v) > 1}
for (lang, new), paths in collisions.items():
    problems.append(f"COLISÃO {lang} {new}: {[os.path.relpath(p, ROOT) for p in paths]}")

# deletion targets must exist as someone's destination
dest_set = {(lang, new) for _, lang, _, new, _ in planned}
for path, lang, old, new in deletions:
    if (lang, new) not in dest_set:
        problems.append(f"FUNDIR/APOSENTAR alvo inexistente: {lang} {new} (de {os.path.relpath(path, ROOT)})")

print(f"planned moves: en={len(moves['en'])} pt-br={len(moves['pt-br'])} | deletions={len(deletions)} | archive={len(archive_paths)}")
print(f"problems: {len(problems)}")
for p in problems[:40]:
    print("  !", p)
if problems and not DRY:
    sys.exit("aborting: resolve problems first (run with --dry-run to inspect)")
if DRY:
    # action distribution of actual permalink changes
    changed = sum(1 for _, _, o, n, _ in planned if o != n)
    print(f"[dry-run] permalink edits: {changed}; no files touched")
    sys.exit(0)

# ---- 1. apply permalink edits (+ noindex for ARQUIVAR) ----
perm_line = re.compile(r"^(permalink:\s*)(\S+)\s*$", re.M)
for path, lang, old, new, acao in planned:
    txt = open(path, encoding="utf-8").read()
    m = perm_line.search(txt)
    if not m:
        problems.append(f"permalink não encontrado em {os.path.relpath(path, ROOT)}"); continue
    cur = m.group(2).strip().strip("'\"").rstrip("/") + "/"
    if cur != old and cur != new:
        report["permalink_inesperado"] += 1  # e.g. hubs já movidos no D0
    if cur != new:
        txt = perm_line.sub(lambda mm: mm.group(1) + new, txt, count=1)
        report["permalink_editado"] += 1
    if path in archive_paths and "meta_tag_robots_no_index: true" not in txt:
        if re.search(r"^meta_tag_robots_no_index:", txt, re.M):
            txt = re.sub(r"^meta_tag_robots_no_index:.*$", "meta_tag_robots_no_index: true", txt, count=1, flags=re.M)
        else:
            txt = txt.replace("---\n", "---\nmeta_tag_robots_no_index: true\n", 1)
        report["noindex_aplicado"] += 1
    open(path, "w", encoding="utf-8").write(txt)

# ---- 2. delete FUNDIR/APOSENTAR files ----
for path, lang, old, new in deletions:
    os.remove(path)
    report["arquivos_removidos"] += 1

# ---- 3. rewrite internal links everywhere in content ----
def build_replacer(mapping):
    if not mapping:
        return None
    keys = sorted(mapping.keys(), key=len, reverse=True)
    pat = re.compile("(" + "|".join(re.escape(k) for k in keys) + r")(?![a-z0-9\-])")
    return pat, mapping

link_maps = {}
for lang in ("en", "pt-br"):
    pref = LANG_PREFIX[lang]
    with_pref = {pref + o: pref + n for o, n in moves[lang].items()}
    full = {"https://www.azion.com" + k: "https://www.azion.com" + v for k, v in with_pref.items()}
    link_maps[lang] = {**with_pref, **full}

all_content = glob.glob(os.path.join(ROOT, "src/content/docs/**/*.mdx"), recursive=True)
combined = {**link_maps["en"], **link_maps["pt-br"]}
pat, mapping = build_replacer(combined)
for f in all_content:
    txt = open(f, encoding="utf-8").read()
    new_txt, n = pat.subn(lambda m: mapping[m.group(1)], txt)
    if n:
        open(f, "w", encoding="utf-8").write(new_txt)
        report["links_reescritos"] += n
        report["arquivos_com_links_reescritos"] += 1

# ---- 4. rewrite menu/i18n/data ts files (no-prefix + with-prefix + full forms) ----
menu_map = {}
for lang in ("en", "pt-br"):
    menu_map.update(moves[lang])          # sem prefixo (slugs de menu)
menu_map.update(combined)                  # com prefixo e com domínio
mpat, mmapping = build_replacer(menu_map)
ts_files = glob.glob(os.path.join(ROOT, "src/i18n/**/*.ts"), recursive=True) + \
           glob.glob(os.path.join(ROOT, "src/data/**/*.ts"), recursive=True)
for f in ts_files:
    txt = open(f, encoding="utf-8").read()
    new_txt, n = mpat.subn(lambda m: mmapping[m.group(1)], txt)
    if n:
        open(f, "w", encoding="utf-8").write(new_txt)
        report["menu_slugs_reescritos"] += n
        report["menus_alterados"] += 1

# ---- 5. redirects ----
for lang, jf in (("en", "cicd/massive-redirect/en.json"), ("pt-br", "cicd/massive-redirect/pt-br.json")):
    jpath = os.path.join(ROOT, jf)
    data = json.load(open(jpath, encoding="utf-8"))
    pref = LANG_PREFIX[lang]
    url_map = {("https://www.azion.com" + pref + o): ("https://www.azion.com" + pref + n) for o, n in moves[lang].items()}
    by_from = {e["from"]: e for e in data}
    # retarget existing entries whose destination moved (avoid chains)
    for e in data:
        tgt = e["moved"].rstrip("/") + "/"
        if tgt in url_map:
            e["moved"] = url_map[tgt]
            report[f"redirects_reapontados_{lang}"] += 1
    for src, dst in url_map.items():
        if src in by_from:
            if by_from[src]["moved"] != dst:
                by_from[src]["moved"] = dst
                report[f"redirects_atualizados_{lang}"] += 1
        else:
            data.append({"from": src, "moved": dst})
            report[f"redirects_novos_{lang}"] += 1
    json.dump(data, open(jpath, "w", encoding="utf-8"), indent=2, ensure_ascii=False)

print(json.dumps(report, indent=2, ensure_ascii=False))
if problems:
    print("PROBLEMS DURING APPLY:")
    for p in problems:
        print("  !", p)
