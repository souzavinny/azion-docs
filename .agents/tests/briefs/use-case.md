# Brief: use-case — E-commerce storefront

Generate one page of the kind **Use case**, English only, using the `writing-a-use-case` skill.

- Standing rule: every fact is below, labeled given. A missing fact becomes `[GAP: <what>]`. Never invent.

## Page identity (given)

- Title: `E-commerce storefront` — pick the final title per the skill's rules if a better goal statement fits.
- Permalink: `/documentation/products/guides/e-commerce-storefront/` — namespace: `docs_guides_ecommerce_storefront`

## The narrowed statement (given)

A storefront team that already deploys a catalogue site configures cache rules, a bypass for the cart, and rate limiting on checkout, so that catalogue pages answer from cache and cart pages never do.

Interface: Console. Not covered: payment processing, inventory synchronization.

## The evidence table (given, pre-verified)

| Requirement | Technical need | Product | Source | Link | Verified |
| --- | --- | --- | --- | --- | --- |
| Catalogue loads from cache | Cache rule on the catalogue path | Applications | cache-settings guide | `/documentation/products/guides/cache-settings/` | transcribed |
| Cart is never shared between users | Bypass Cache rule on the cart path | Applications | Rules Engine reference | `/documentation/products/build/applications/rules-engine/` | transcribed |
| Checkout resists abusive traffic | Rate limit on the checkout path | Firewall | Firewall Rules Engine reference | `/documentation/products/secure/firewall/rules-engine/` | transcribed |

## Configuration facts (source: given)

**Application Accelerator prerequisite** (needed by Bypass Cache): Applications → application → **Main Settings** tab → **Modules** → turn on **Application Accelerator** → **Save**.

**Catalogue cache:** **Cache Settings** tab → **+ Cache Setting** → name it → **Cache Expiration Policies** → **CDN Cache Settings**: *Override Cache Settings* → **Maximum TTL** `3600` seconds — the catalogue changes hourly, so one hour is the longest safe TTL (state this reason). **Save**. Then **Rules Engine** tab → **+ Rule** → **Request Phase** → criteria `if ${uri} starts with /catalog` → behavior **Set Cache Policy** with the cache setting → **Save**.

**Cart bypass:** **Rules Engine** tab → **+ Rule** → **Request Phase** → criteria `if ${uri} starts with /cart` → behavior **Bypass Cache** → **Save**. Bypass Cache affects origin cache policies, not browser cache policies.

**Checkout rate limit:** **Firewall** → firewall → **Rules Engine** tab → **+ Rule** → criteria on **Request URI** *starts with* `/checkout` → behavior **Set Rate Limit** → **Type** *Req/s*, **Average Rate Limit** `10`, per **Client IP address** — a starting point to adjust from observed traffic (state this). Blocked excess receives HTTP `429 Too Many Requests`. **Save**.

## Verification facts (source: given)

- Catalogue: a response served through the application carries the `X-Cache-Key` header, generated when content is cached at the edge. `curl -I https://<your-domain>/catalog/<a-page>` — the header is present.
- Cart: no response-header fact is given for verifying a bypassed request; handle per the gap rule.
- Checkout: send more than 10 requests in one second from one client; the excess receives HTTP `429`.

## Links (given)

| Text | Permalink |
| --- | --- |
| Rules Engine | `/documentation/products/build/applications/rules-engine/` |
| Cache Settings | `/documentation/products/build/applications/cache-settings/` |
| Rules Engine for Firewall | `/documentation/products/secure/firewall/rules-engine/` |
| Configure cache policies | `/documentation/products/guides/cache-settings/` |
| Application Accelerator | `/documentation/products/build/applications/application-accelerator/` |
