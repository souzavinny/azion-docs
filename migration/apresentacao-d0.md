# Entregável 0: a nova documentação começa aqui

**Missão Q3 · reestruturação da documentação Azion · one-pager executivo**

## O problema, em três números medidos

| Número | O que significa |
|---|---|
| **2 de 4** | Tarefas que um agente de IA completa pelo caminho de API usando só a doc (nota média 66/100). Console: 4 de 4 |
| **188** | Links internos apontando para páginas que não existem (5,3% do corpus EN) |
| **0** | Tutoriais verificáveis atrás da promessa "aplicação no ar em 5 minutos" da home |

Diagnóstico completo em 8 relatórios (benchmark contra Cloudflare, Stripe, Vercel, AWS, Akamai, MongoDB, Fastly, Supabase), todos re-verificados de forma independente antes deste plano. A doc de 16 anos sustentou a operação até aqui — os problemas são de arquitetura de informação e processo, e têm plano.

## O que o D0 entrega (2–3 semanas)

**Antes:** home-índice com 3 famílias de URL para a mesma ferramenta, typo no posicionamento, link com tracking cru, e promessa de 5 minutos sem destino. **Depois:**

1. **Nova arquitetura de informação ratificada** — destino canônico para todas as 1.474 páginas (`migration/`), cânone de nomenclatura versionado, política "um assunto, um lar" com redirects obrigatórios.
2. **Home nova, por persona** — bloco "comece aqui" com CTA medido por clique para cada perfil validado.
3. **Tutorial genuíno de primeiro deploy** (EN+PT) — 3 caminhos completos (template, GitHub, CLI), cada um terminando em verificação real: `curl` → HTTP 200.
4. **Esqueleto da árvore nova** — hubs de cluster canonizados (`/build/`, `/secure/`, `/store/`, `/deploy/`, `/observe/`, `/devtools/`) com 301 das URLs antigas.

## Para quem estamos construindo

| Persona | Dor medida | Bloco na home nova |
|---|---|---|
| D1 Avaliador (dev testando) | "versátil, porém complexa"; 52,7% das páginas técnicas sem código | "Estou avaliando a Azion" → primeiro deploy |
| D2 Implementador (cliente ativo) | concluiu que a feature "está faltando" quando ela existe | "Preciso implementar algo específico" → hubs pelo termo do usuário |
| D3 Operador (SRE em produção) | relatório, custo e Console lento em volume | "Opero a Azion em produção" → administração como código |
| D4 Decisor (arquiteto/CTO) | "o que está incluído e quanto custa?" | "Estou comparando fornecedores" → pricing e limites |
| O Executor (agente de IA) | completa 2/4 tarefas via API; paga por token | rodapé "For AI agents" → MCP, llms.txt (D1) |

## A escada completa: valor a cada degrau

| Entregável | O que muda | Métrica que se move |
|---|---|---|
| **D0** IA + home + primeiro deploy | promessa de 5 min vira verificável | telemetria por persona no ar |
| **D1** Fundações (3 sem) | CI bloqueia regressão; descoberta por agentes | links quebrados 188 → 0; nota externa datada |
| **D2** Piloto Observe (3–4 sem) | primeiro cluster na arquitetura nova | tarefa agêntica: 68 → ≥90 |
| **D3** Secure + Contas (4–5 sem) | pior cluster medido reconstruído | 58 → ≥80; 8 duplicatas → 1 lar |
| **D4a/D4b** Build + DevTools (8–10 sem) | páginas mais visitadas na árvore nova; um lar para CLI e API | 78 → ≥90; checkpoint GA4 |
| **D5** Store + Deploy (2–3 sem) | agente cria-sobe-lê bucket só com a doc | 60 → ≥85 |
| **D6** Cauda longa (4–5 sem) | catálogo Marketplace; migração de 5 concorrentes particionada | zero páginas >8k tokens |
| **D7** Medição contínua | a doc tem dashboard | TSA API 4/4, média ≥80 |

## A conversa de recurso, com dado

Escada completa: **≈26–33 semanas solo** (~6–8 meses). O Q3 entrega com realismo **D0–D2** (fundações + piloto provado). Os clusters são independentes após o piloto: **cada escritor adicional comprime D3–D6 quase linearmente**. A decisão de acelerar é de alocação, não de plano.

## Demo ao vivo (roteiro de 5 minutos)

1. Abrir `azion.com/pt-br/documentacao/` — a home nova, bloco por persona.
2. Clicar "Estou avaliando a Azion" → tutorial de primeiro deploy.
3. Seguir o caminho CLI: `azion link` → deploy.
4. `curl -I https://<dominio-gerado>` → **HTTP 200**. A promessa dos 5 minutos, cumprida e cronometrada.
