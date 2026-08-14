# Brief: multi-product-guide — Serve a store with cached content and a protected checkout

Generate one page of the kind **Multi-product guide**, English only.

- The goal: a storefront whose catalogue answers from cache, whose cart never does, and whose checkout is rate-limited.
- Products on the route: Applications (cache) and Firewall (request filtering). The title carries the goal, not the products.
- Standing rule: every fact is below, labeled given. A missing fact becomes `[GAP: <what>]`. Never invent.

## Page identity (given)

- Title: `Serve a store with cached content and a protected checkout`
- Permalink: `/documentation/products/guides/store-caching-and-checkout-protection/` — namespace: `docs_guides_store_caching_checkout_protection`

## Facts (source: given; transcribed from `/documentation/products/guides/cache-settings/`, `/documentation/products/build/applications/rules-engine/`, `/documentation/products/secure/firewall/rules-engine/`)

**Stage: turn on Application Accelerator** (required for the Bypass Cache behavior): In Azion Console, go to **Applications** and select the application. In the **Main Settings** tab, **Modules** section, turn on the **Application Accelerator** switch. Select **Save**.

**Stage: cache the catalogue.** In the **Cache Settings** tab, select **+ Cache Setting**. Name it. In **Cache Expiration Policies**, set **CDN Cache Settings** to *Override Cache Settings* and enter a **Maximum TTL** in seconds — use `3600`, because the catalogue changes hourly (state this reason). Select **Save**. Then in the **Rules Engine** tab, select **+ Rule**, name it, select **Request Phase**, set the criteria `if ${uri} starts with /catalog`, set the behavior **Set Cache Policy** with the cache setting as its argument, and select **Save**.

**Stage: bypass cache for the cart.** In the **Rules Engine** tab, select **+ Rule**, name it, select **Request Phase**, set the criteria `if ${uri} starts with /cart`, set the behavior **Bypass Cache**, and select **Save**. Bypass Cache runs in the Request Phase only, requires Application Accelerator, and affects origin cache policies, not browser cache policies.

**Stage: rate-limit the checkout.** In Azion Console, go to **Firewall** and select the firewall. In the **Rules Engine** tab, select **+ Rule**, name it, set the criteria on the variable **Request URI** with the *starts with* operator and the argument `/checkout`, and in **Behaviors** select **Set Rate Limit**. Fields: **Type** (*Req/s* or *Req/min*), **Average Rate Limit**, applied per **Client IP address** or **Global**, and **Maximum burst size** (Req/s only). Use `10` Req/s per Client IP address as the example values, stated as a starting point to adjust from observed traffic. Rate-limited requests receive HTTP `429 Too Many Requests`. Select **Save**.

**Variable syntax (given):** `${uri}` is the normalized, URL-decoded URI with no query string.

**Limits (given):** 200 request or response rules per application; 5 criteria per rule; 10 behaviors per rule.

## Links (given)

| Text | Permalink |
| --- | --- |
| Rules Engine | `/documentation/products/build/applications/rules-engine/` |
| Cache Settings | `/documentation/products/build/applications/cache-settings/` |
| Rules Engine for Firewall | `/documentation/products/secure/firewall/rules-engine/` |
| Configure cache policies | `/documentation/products/guides/cache-settings/` |
