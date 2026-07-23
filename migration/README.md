# migration/ — espec de registro da nova arquitetura de informação

Este diretório é a fonte de verdade da reestruturação da documentação (Missão Q3 2026). Origem e evidências: `diagnosis/` (diagnósticos, benchmark, personas, arquitetura de informação, plano de execução). O que está aqui **normatiza**; o que está em `diagnosis/` **fundamenta**.

| Artefato | Papel |
|---|---|
| `README.md` | A árvore-alvo, as 3 regras geradoras, política de redirects, mapeamento de fases |
| `de-para.csv` | Mapa de migração de registro: 1.474 páginas → destino canônico, seção Diátaxis, ação e fase |
| `glossario.yaml` | Cânone de nomenclatura (nome vigente, aliases históricos, datas) |
| `generate-redirects.mjs` | Gera entradas de redirect (`{from, moved}`) a partir do de-para, por fase |
| `scaffold-nav-json.py` | One-off: gerou o `src/i18n/nav.menu.json` inicial (menu curado + regras de curadoria); o JSON é mantido à mão desde então |
| `generate-nav.py` | **Aposentado** — gerava os nav.ts antigos; mantido só como referência/rollback |
| `apresentacao-d0.md` | One-pager C-level do Entregável 0 |

## As 3 regras que geram a árvore inteira

1. **Um assunto, um lar.** Cada documento tem exatamente uma URL canônica; toda URL anterior vira 301.
2. **Padrão por produto: Overview, Quickstart, Guides, Reference, Concepts.** Cada seção corresponde a exatamente um tipo Diátaxis; `limits-and-plans/` é subseção obrigatória de Reference.
3. **Menu é dado, pasta é tipo, URL é frontmatter.** A navegação não define estrutura de pastas; o `permalink` desacopla URL de arquivo.

## A árvore-alvo

Slugs idênticos em EN e PT sob os prefixos de idioma (`/en/documentation/` e `/pt-br/documentacao/`).

```
/documentation/
│   Home: espinha de jornada, "comece aqui" por persona
├── get-started/            before-you-begin/ · first-deploy/ · frameworks/<fw>/ ·
│                           migrate/<vendor>/ · production-checklist/
├── build/                  Applications · Functions · Connectors · Workloads · AI Inference
├── secure/                 Firewall · WAF · Bot Manager · DDoS Protection · Network Shield ·
│                           Edge DNS · Certificate Manager · Custom Pages
├── store/                  Object Storage · SQL Database · KV Store
├── deploy/                 Orchestrator (inclui Edge Services e Edge Node)
├── observe/                Data Stream · Real-Time Metrics · Real-Time Events · Edge Pulse · SIEM
│   └── cada produto segue: <cluster>/<produto>/ (Overview) · quickstart/ · guides/<slug>/ ·
│       reference/<slug>/ (com limits-and-plans/; v3/ quando existir) · concepts/<slug>/
├── devtools/               CLI · API (REST v4 + v4-migration) · GraphQL · Terraform · Lib ·
│                           MCP · Console Kit · Form Builder — mesmo padrão de 5 seções
├── marketplace/            reference/ · integrations/<slug> · templates/<slug>
├── account/                lar único de Contas: quickstart · guides · reference
├── platform/               overview · pricing · compliance · shared-responsibility · network-program
├── architectures/          biblioteca de explanation por solução
├── services/               suporte e serviços profissionais
├── changelog/              release notes (vivo) + archive/ (2016-2021, noindex)
├── agreements/             legal; versões antigas sob índice único + noindex
└── guides/                 1 página: hub gerado por frontmatter, não árvore paralela
```

## Política de redirects

- **Toda mudança de `permalink` acompanha, no mesmo PR, uma entrada `{from, moved}`** (URLs completas) em `cicd/massive-redirect/en.json` e/ou `pt-br.json`.
- Nenhuma página morre em 404; remoção física só após confirmação de tráfego zero (GA4).
- Estado do pipeline (verificado em 19/07/2026): uma entrada existente do `en.json` responde 301 vivo na borda (`/en/documentation/products/core-concepts/` → `azion-platform-overview`). O SLA de propagação de entradas **novas** está pendente de confirmação com UX Engineering (spike S1 do plano de execução).

## De-para: leitura do CSV

Uma linha por página do inventário (1.474). Colunas-chave: `url_norm` (URL atual, sem prefixo de idioma), `novo_lar` (URL canônica nova, com prefixo de idioma), `secao` (tipo Diátaxis no destino), `acao` (MOVER, REESCREVER, MANTER, RELIGAR+MOVER, ARQUIVAR, FUNDIR-EM, REESCREVER-EM-LUGAR, VERSIONAR, APOSENTAR-301), `fase` (F0–F5), `motivo` (com código de evidência), `flag_revisao` (`t1-pendente` nas 291 linhas cujo slug PT ainda diverge do EN e normaliza no T1 da fase do seu cluster).

Nota de integridade: a IA §2.1 cita um recorte 256/35 dentro das 291 (35 pedindo revisão humana); esse recorte **não é derivável do CSV** e será arbitrado no T1 de cada fase — até lá, as 291 carregam a mesma flag.

## Fases (de-para) → entregáveis (plano de execução)

| Fase | Entregável | Escopo resumido |
|---|---|---|
| F0 | **D0** (parcial) + **D1** | D0: home por persona, get-started/first-deploy, canonização dos hubs, redirects, este diretório. D1: CI (linkcheck, lint de nomenclatura, frontmatter), llms.txt, for-ai.md, .well-known, quick wins, baselines externos |
| F1 | **D2** | Piloto Observe (Data Stream primeiro) |
| F2 | **D3** | Secure + lar único de Contas |
| F3 | **D4a** (Build) + **D4b** (DevTools) | Applications/Functions/Runtime; CLI/API/pricing |
| F4 | **D5** | Store + Deploy |
| F5 | **D6** | Marketplace, arquiteturas, monólitos de migração |
| — | **D7** | Medição contínua (TSA mensal, scans trimestrais) |

## Regras transversais (valem para todo PR da migração)

1. Paridade EN+PT no mesmo PR; página nova nasce com slug idêntico nos 2 idiomas.
2. Mudança de permalink ⇒ entrada de redirect no mesmo PR.
3. Um assunto, um lar (colisão de slug falha o build).
4. Tipo Diátaxis declarado em toda página nova ou tocada.
5. Zero links internos quebrados novos (baseline 19/07/2026: EN 189, PT 198 — só desce).
6. TSA re-executado no gate de cada cluster.
7. Conventional commits; 2 aprovações de code owner; conteúdo → Developer Education, estrutura → UX Engineering.
