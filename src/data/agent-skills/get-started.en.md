---
name: azion-get-started
description: >-
  Orient on the Azion Web Platform: what runs there, which product covers a
  given need, and which doc to fetch next. Use when the user is new to Azion,
  asks what Azion offers, or you need to pick the right Azion product for a
  task before acting.
---

# Get started with Azion

Goal: end knowing which Azion products fit the user's need, with the account ready and the next doc or skill fetched. If the user just wants something live now, skip the tour and follow https://www.azion.com/en/documentation/get-started/first-deploy.md instead.

## Requirements

- An Azion account. Free signup, no credit card. This is a browser step — ask the user to complete it: https://console.azion.com/signup/
- If the user's company already uses Azion, they should ask an administrator for an invite instead of opening a second account. Access is granted per team: https://www.azion.com/en/documentation/account/guides/teams-permissions.md

## The platform map

Fetch the doc for whichever area the task touches. Every URL below returns agent-readable markdown.

Build — deploy and run code:

- Applications, the unit you deploy; it runs on every point of the network at once: https://www.azion.com/en/documentation/build/applications.md
- Functions, JavaScript or WebAssembly running inside the request: https://www.azion.com/en/documentation/build/applications/functions.md
- AI Inference, hosted models behind an OpenAI-compatible endpoint: https://www.azion.com/en/documentation/build/ai-inference.md
- SQL Database, relational state next to the code: https://www.azion.com/en/documentation/store/sql-database.md
- KV Store, key-value state: https://www.azion.com/en/documentation/store/kv-store.md
- Object Storage, files and objects: https://www.azion.com/en/documentation/store/object-storage.md
- Framework build paths already written: https://www.azion.com/en/documentation/get-started/frameworks/overview.md

Protect and deliver:

- Firewall, the attach point for security; enabling it turns on DDoS mitigation: https://www.azion.com/en/documentation/secure/firewall/quickstart.md
- WAF, inspects requests for injection and scripting attacks: https://www.azion.com/en/documentation/secure/waf.md
- Bot Manager, scores automated traffic: https://www.azion.com/en/documentation/secure/bot-manager.md
- Network Shield, drops IP ranges, ASNs, or countries: https://www.azion.com/en/documentation/secure/network-shield.md
- Certificate Manager, TLS for the user's own domain: https://www.azion.com/en/documentation/secure/certificate-manager.md
- Edge DNS, authoritative DNS zone: https://www.azion.com/en/documentation/secure/edge-dns.md

Observe and automate:

- Real-Time Metrics: https://www.azion.com/en/documentation/observe/real-time-metrics.md
- Real-Time Events: https://www.azion.com/en/documentation/observe/real-time-events.md
- Data Stream, ships logs to external tools: https://www.azion.com/en/documentation/observe/data-stream.md
- CLI, the platform from the terminal: https://www.azion.com/en/documentation/products/azion-cli/overview.md
- API: https://www.azion.com/en/documentation/devtools/api.md
- Terraform provider: https://www.azion.com/en/documentation/products/terraform-provider.md
- Orchestrator: https://www.azion.com/en/documentation/deploy/orchestrator.md

## Hands-on next steps

- First deploy, skill-shaped, follow it directly: https://www.azion.com/en/documentation/get-started/first-deploy.md
- Go live on a custom domain: https://www.azion.com/en/documentation/get-started/production-checklist.md
- Task-indexed guides: https://www.azion.com/en/documentation/guides.md

## Verify

The account is ready when the user can open https://console.azion.com and see the Console home. This is a browser step — ask them to confirm. Task-level verification lives in each skill; the first-deploy skill ends with `curl -I` returning `HTTP/2 200`.
