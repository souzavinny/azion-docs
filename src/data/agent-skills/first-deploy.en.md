---
name: azion-first-deploy
description: >-
  Deploy a project to the Azion Web Platform and verify it answers HTTP 200 on
  its own Azion domain. Use when the user wants to put their first project
  live on Azion — via the Azion CLI from the terminal, or guided through the
  Console.
---

# Deploy your first project to Azion

Goal: put the user's project live on the Azion Web Platform, answering HTTP 200 on its own Azion domain. Prefer the CLI path — it runs entirely from the terminal.

## Requirements

- An Azion account. Free signup, no credit card: https://console.azion.com/signup/
- A local project using a supported framework, with dependencies installed. Starting from scratch instead? Run `azion init` to create a project from a framework template, then deploy it the same way.

## Deploy with the Azion CLI

1. Install the CLI:

```bash
curl -fsSL https://cli.azion.app/install.sh | bash
```

2. Authenticate. This is interactive — ask the user to complete the login when prompted:

```bash
azion login
```

3. From the project's root folder, link it to Azion:

```bash
azion link
```

The CLI guides the flow: confirm the linking, accept or adjust the suggested application name, and pick a preset matching the project's framework. When it asks `Do you want to deploy your project?`, answer yes. (If declined, run `azion deploy` when ready.)

4. Capture the application's **Azion domain** printed at the end of the deploy.

## Verify

```bash
curl -I https://<your-azion-domain>
# expect HTTP/2 200
```

New URLs can take a few minutes to propagate to Azion's edge locations. On an error right after deploying, wait a moment and retry before diagnosing.

## Alternatives via Azion Console (human-in-the-loop)

These paths need the user driving a browser:

- **Deploy a template**: in https://console.azion.com, click **+ Create** → **Templates**, pick one, fill in the configuration, click **Deploy**, and follow the logs until the Azion domain appears.
- **Import from GitHub**: in https://console.azion.com, click **+ Create** → **Import from GitHub**, connect the account, select the repository, choose a name and **Framework Preset**, enter the install command (usually `npm install`), and confirm.

Verify either path with the same `curl -I` check above.

## After the deploy

- Go live with a custom domain: https://www.azion.com/en/documentation/get-started/production-checklist.md
- Secure the application (Firewall, WAF): https://www.azion.com/en/documentation/secure/overview.md
- Observe metrics and events: https://www.azion.com/en/documentation/observe/overview.md
