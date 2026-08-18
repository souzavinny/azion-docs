---
name: azion-get-started
description: >-
  Oriente-se na Azion Web Platform: o que roda nela, qual produto cobre cada
  necessidade e qual doc buscar em seguida. Use quando o usuário for novo na
  Azion, perguntar o que a Azion oferece, ou você precisar escolher o produto
  certo da Azion antes de agir.
---

# Comece com a Azion

Objetivo: terminar sabendo quais produtos da Azion atendem à necessidade do usuário, com a conta pronta e o próximo doc ou skill carregado. Se o usuário só quer algo no ar agora, pule o tour e siga direto: https://www.azion.com/pt-br/documentacao/get-started/first-deploy.md

## Requisitos

- Uma conta Azion. Cadastro gratuito, sem cartão de crédito. Este passo é no navegador — peça ao usuário para concluir: https://console.azion.com/signup/
- Se a empresa do usuário já usa a Azion, ele deve pedir um convite a um administrador em vez de abrir uma segunda conta. O acesso é concedido por time: https://www.azion.com/pt-br/documentacao/account/guides/teams-permissions.md

## O mapa da plataforma

Busque o doc da área que a tarefa envolve. Toda URL abaixo retorna markdown legível por agentes.

Build — implante e execute código:

- Applications, a unidade de deploy; roda em todos os pontos da rede ao mesmo tempo: https://www.azion.com/pt-br/documentacao/build/applications.md
- Functions, JavaScript ou WebAssembly executando dentro da requisição: https://www.azion.com/pt-br/documentacao/build/functions.md
- AI Inference, modelos hospedados atrás de um endpoint compatível com OpenAI: https://www.azion.com/pt-br/documentacao/build/ai-inference.md
- SQL Database, estado relacional ao lado do código: https://www.azion.com/pt-br/documentacao/store/sql-database.md
- KV Store, estado chave-valor: https://www.azion.com/pt-br/documentacao/store/kv-store.md
- Object Storage, arquivos e objetos: https://www.azion.com/pt-br/documentacao/store/object-storage.md
- Caminhos de build prontos por framework: https://www.azion.com/pt-br/documentacao/get-started/frameworks/overview.md

Proteja e entregue:

- Firewall, o ponto de apoio da segurança; ativá-lo liga a mitigação de DDoS: https://www.azion.com/pt-br/documentacao/secure/firewall/quickstart.md
- WAF, inspeciona requisições em busca de ataques de injeção e scripting: https://www.azion.com/pt-br/documentacao/secure/waf.md
- Bot Manager, pontua tráfego automatizado: https://www.azion.com/pt-br/documentacao/secure/bot-manager.md
- Network Shield, descarta faixas de IP, ASNs ou países: https://www.azion.com/pt-br/documentacao/secure/network-shield.md
- Certificate Manager, TLS para o domínio do usuário: https://www.azion.com/pt-br/documentacao/secure/certificate-manager.md
- Edge DNS, zona DNS autoritativa: https://www.azion.com/pt-br/documentacao/secure/edge-dns.md

Observe e automatize:

- Real-Time Metrics: https://www.azion.com/pt-br/documentacao/observe/real-time-metrics.md
- Real-Time Events: https://www.azion.com/pt-br/documentacao/observe/real-time-events.md
- Data Stream, envia logs para ferramentas externas: https://www.azion.com/pt-br/documentacao/observe/data-stream.md
- CLI, a plataforma pelo terminal: https://www.azion.com/pt-br/documentacao/produtos/azion-cli/visao-geral.md
- API: https://www.azion.com/pt-br/documentacao/devtools/api/quickstart.md
- Terraform provider: https://www.azion.com/pt-br/documentacao/produtos/terraform-provider.md
- Orchestrator: https://www.azion.com/pt-br/documentacao/build/orchestrator.md

## Próximos passos práticos

- Primeiro deploy, em formato de skill, siga diretamente: https://www.azion.com/pt-br/documentacao/get-started/first-deploy.md
- Ative em produção com domínio próprio: https://www.azion.com/pt-br/documentacao/get-started/ative-em-producao.md
- Guias indexados por tarefa: https://www.azion.com/pt-br/documentacao/guides.md

## Verificação

A conta está pronta quando o usuário consegue abrir https://console.azion.com e ver a home do Console. Este passo é no navegador — peça a confirmação. A verificação de cada tarefa vive na skill correspondente; a skill de primeiro deploy termina com `curl -I` retornando `HTTP/2 200`.
