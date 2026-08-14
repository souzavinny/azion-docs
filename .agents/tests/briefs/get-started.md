# Brief: get-started — Get started with Applications

Generate one page of the kind **Get started**, English only.

- The first success: the reader's first application, deployed from a template and answering on an Azion domain.
- One linear path: Console. The CLI is one link, not a parallel track.
- Standing rule: every fact is below, labeled given. A missing fact becomes `[GAP: <what>]`. Never invent.

## Page identity (given)

- Title: `Get started with Applications`
- Permalink: `/documentation/products/build/applications/get-started/` — namespace: `docs_build_applications_get_started`

## Facts (source: given; transcribed from `/documentation/products/start-with-a-template/` and `/documentation/products/use-a-template-via-azion-console/`)

**Prerequisites available to state:** an Azion account (`https://console.azion.com`); a GitHub account, for templates that integrate with GitHub — those show a **Connect with GitHub** button during configuration.

**The flow:** In Azion Console, select the **+ Create** button on the homepage. In the modal, select the **Templates** option. Browse and choose a template. On the configuration page, provide the information to configure the application. Select the **Deploy** button, in the bottom-right corner.

**During deployment:** a window shows the deployment logs. On completion, the page shows the application name, the deploy logs, and the **Azion domain**.

**What the reader ends with:** an application on an auto-generated Azion subdomain in the format `xxxxxxxxxx.map.azionedge.net/`. This domain cannot be modified.

**Verify:** open the application's domain in the browser. The URL can take a few minutes to activate after deployment; on an error right after deploying, wait and retry before diagnosing.

## Links (given)

| Text | Permalink |
| --- | --- |
| Go live with a custom domain | `/documentation/products/go-live-with-azion/` |
| Use a template via Azion Console | `/documentation/products/use-a-template-via-azion-console/` |
| Deploy with the Azion CLI | `/documentation/products/azion-cli/create-application/` |
| Azion Platform overview | `/documentation/products/azion-platform-overview/` |
