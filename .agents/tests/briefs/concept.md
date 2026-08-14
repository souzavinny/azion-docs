# Brief: concept — How Tiered Cache works

Generate one page of the kind **Concept**, English only.

- Standing rule: every fact is below, labeled given. A missing fact becomes `[GAP: <what>]`. Never invent.

## Page identity (given)

- Title: `How Tiered Cache works`
- Permalink: `/documentation/products/build/applications/cache/tiered-cache/` — namespace: `docs_build_tiered_cache`

## Facts (source: given; transcribed from `/documentation/products/build/applications/cache/tiered-cache/`)

**The mechanism:** Tiered Cache is a Cache module that creates an additional cache layer between the edge and the origin servers. End users hit the edge network, where content is cached; Tiered Cache adds a second layer between that edge layer and the origin. A request that misses the edge layer can still be answered by the tiered layer without reaching the origin. The result: content stays cached for longer periods, and the origin receives fewer requests.

**The region choice:** the second-layer servers are hosted in the United States (`na-united-states`) by default; Brazil (`sa-brazil`) is available, and switching requires contacting the Sales team. Selecting the region closest to the audience keeps the second layer's answers closer to users.

**TTL rules:** Tiered Cache can only be activated on cache policies with a TTL equal to or greater than 3 seconds. The default TTL is 60 seconds. Minimum TTL: 3 seconds; maximum: 2,592,000 seconds.

**The tradeoff — bypass:** the module does not support bypass cache. A Bypass Cache rule works at the edge layer, but an application with Tiered Cache active keeps content cached in the tiered layer for at least the minimum TTL. Content that must never be cached does not belong behind Tiered Cache.

**Purging:** Real-Time Purge expires Tiered Cache content before the TTL. Purge the tiered cache layer first and only later the edge Cache layer; the other order lets the edge re-fetch outdated content from the tiered layer.

**When to use:** designed for objects that can remain in cache for a long period of time. The module is available on request: activation goes through the Sales team.

## Links (given)

| Text | Permalink |
| --- | --- |
| Cache | `/documentation/products/build/applications/cache/` |
| Cache Settings | `/documentation/products/build/applications/cache-settings/` |
| Real-Time Purge | `/documentation/products/build/applications/real-time-purge/` |
| Configure cache policies | `/documentation/products/guides/cache-settings/` |
