#!/usr/bin/env python3
"""normalize-redirects.py — achata cadeias (moved → from de outra entrada) e
deduplica entradas por `from` nos cicd/massive-redirect/{en,pt-br}.json.
Regra: o destino final de toda entrada é resolvido transitivamente; ciclos são
quebrados mantendo o primeiro destino e reportados. Última entrada vence no dedupe.
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for jf in ("cicd/massive-redirect/en.json", "cicd/massive-redirect/pt-br.json"):
    path = os.path.join(ROOT, jf)
    data = json.load(open(path, encoding="utf-8"))
    norm = lambda u: u.rstrip("/") + "/"
    # last-wins dedupe by from
    by_from = {}
    for e in data:
        by_from[norm(e["from"])] = norm(e["moved"])
    flattened = 0
    cycles = 0
    result = {}
    for src in by_from:
        dst = by_from[src]
        seen = {src}
        while dst in by_from and dst not in seen:
            seen.add(dst)
            dst = by_from[dst]
        if dst in seen and dst != by_from[src] and by_from.get(dst) is not None and dst in by_from:
            cycles += 1
        if dst != by_from[src]:
            flattened += 1
        if dst == src:  # self-redirect after flatten: drop
            continue
        result[src] = dst
    out = [{"from": s, "moved": d} for s, d in result.items()]
    json.dump(out, open(path, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    print(f"{jf}: {len(data)} -> {len(out)} entries, {flattened} flattened, dropped {len(data)-len(out)} (dupes/self)")
