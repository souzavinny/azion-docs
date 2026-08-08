---
name: azion-first-deploy
description: >-
  Faça o deploy de um projeto na Azion Web Platform e verifique que ele
  responde HTTP 200 no seu próprio domínio Azion. Use quando o usuário quiser
  colocar o primeiro projeto no ar na Azion — pela Azion CLI no terminal, ou
  guiado pelo Console.
---

# Faça o deploy do seu primeiro projeto na Azion

Objetivo: colocar o projeto do usuário no ar na Azion Web Platform, respondendo HTTP 200 no seu próprio domínio Azion. Prefira o caminho da CLI — ele roda inteiramente no terminal.

## Requisitos

- Uma conta Azion. Cadastro gratuito, sem cartão de crédito: https://console.azion.com/signup/
- Um projeto local usando um framework suportado, com as dependências instaladas. Começando do zero? Execute `azion init` para criar um projeto a partir de um template de framework e faça o deploy do mesmo jeito.

## Deploy com a Azion CLI

1. Instale a CLI:

```bash
curl -fsSL https://cli.azion.app/install.sh | bash
```

2. Autentique-se. Este passo é interativo — peça ao usuário para concluir o login quando solicitado:

```bash
azion login
```

3. Na raiz do projeto, vincule-o à Azion:

```bash
azion link
```

A CLI conduz o fluxo: confirme o vínculo, aceite ou ajuste o nome sugerido para a aplicação e escolha um preset compatível com o framework do projeto. Quando ela perguntar `Do you want to deploy your project?`, responda yes. (Se recusar, execute `azion deploy` quando estiver pronto.)

4. Capture o **domínio Azion** da aplicação impresso ao final do deploy.

## Verifique

```bash
curl -I https://<seu-dominio-azion>
# esperado: HTTP/2 200
```

URLs novas podem levar alguns minutos para propagar até as edge locations da Azion. Se der erro logo após o deploy, aguarde um momento e tente de novo antes de diagnosticar.

## Alternativas pelo Azion Console (com o usuário no navegador)

Estes caminhos precisam do usuário conduzindo um navegador:

- **Deploy de um template**: em https://console.azion.com, clique em **+ Create** → **Templates**, escolha um, preencha a configuração, clique em **Deploy** e acompanhe os logs até o domínio Azion aparecer.
- **Importar do GitHub**: em https://console.azion.com, clique em **+ Create** → **Import from GitHub**, conecte a conta, selecione o repositório, escolha um nome e o **Framework Preset**, informe o comando de instalação (geralmente `npm install`) e confirme.

Verifique qualquer um dos caminhos com o mesmo `curl -I` acima.

## Depois do deploy

- Entre em produção com um domínio próprio: https://www.azion.com/pt-br/documentacao/get-started/ative-em-producao.md
- Proteja a aplicação (Firewall, WAF): https://www.azion.com/pt-br/documentacao/secure/firewall.md
- Observe métricas e eventos: https://www.azion.com/pt-br/documentacao/observe/real-time-metrics.md
