# Brief: troubleshooting — Troubleshoot WAF blocking legitimate requests

Generate one page of the kind **Troubleshooting**, English only.

- Product: Web Application Firewall (WAF). Symptom class: legitimate requests blocked.
- Standing rule: every fact is below, labeled given. A missing fact becomes `[GAP: <what>]`. Never invent.

## Page identity (given)

- Title: `Troubleshoot WAF blocking legitimate requests`
- Permalink: `/documentation/products/secure/troubleshoot-waf-false-positives/` — namespace: `docs_secure_troubleshoot_waf_false_positives`

## Facts (source: given; transcribed from `/documentation/products/guides/secure/tune-waf/` and `/documentation/products/secure/firewall/web-application-firewall/custom-allowed-rules/`)

**Symptom 1 — `403 Forbidden` on legitimate requests after turning on WAF in blocking mode.** Cause: a WAF internal rule matches the request; common examples: rule ID `1000` (SQL keywords), `1013` (apostrophe `'`), `1302` (HTML open tag `<`). Fix, via WAF Tuning: In Azion Console, go to **WAF Rules** and select the rule set. Go to the **Tuning** tab. Set a **Time Range** (for example *Last 12 hours*), select the domains in the **Workloads** dropdown — mandatory; results only appear with at least one domain selected — and select **Apply**. The **Possible Attacks** list shows **Rule ID**, **Description**, **Hits**, **Paths**, **IPs**, and **Countries**; drill down with **More Details**. Select the legitimate records with the **Field** checkbox and select the **Allow Rules** button. Outcome: the new allowed rule appears in the **Allowed Rules** tab of the WAF Rules page, and matching requests stop being blocked.

**Symptom 2 — form posts or uploads blocked.** Cause: rule ID `2` (request body larger than 128 kilobytes) or rule ID `13` (invalid POST format; blocked in some cases even in *Learning* mode). Fix, manually: in the rule set's **Allowed Rules** tab, select **+ Allowed Rule** and fill in **Rule ID**, **Path** (for example `/api/v1/data`), **Match Zone**, **Regex**, and **Status**. Match Zone options include `Specific Query String Value`, `Body Form Field Value`, `Raw Body`, `File Extension`. Outcome: the rule is listed and the requests pass.

**Fix via API (alternative):** `POST https://api.azion.com/v4/edge_firewall/wafs/{waf_id}/exceptions` with `{"rule_id": 1000, "reason": "...", "match_zone": "query_string", "match_pattern": "^[a-zA-Z0-9\\s]+$", "path": "/api/v1/search", "active": true}`. The Console calls these **Allowed Rules**; the API calls them **Exceptions**.

**Where to see blocked requests beyond Tuning:** Real-Time Events, `HTTP Requests` data source — fields `Waf Block` (`1` when blocked), `Waf Score`, `Waf Ev Headers`. Events are stored for the last 168 hours.

**Limit (given):** WAF Tuning queries cover up to 3 days.

## Links (given)

| Text | Permalink |
| --- | --- |
| WAF allowed rules | `/documentation/products/secure/firewall/web-application-firewall/custom-allowed-rules/` |
| Tune the WAF | `/documentation/products/guides/secure/tune-waf/` |
| Web Application Firewall | `/documentation/products/secure/firewall/web-application-firewall/` |
| Real-Time Events | `/documentation/products/observe/real-time-events/` |
