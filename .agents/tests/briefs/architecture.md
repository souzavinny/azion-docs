# Brief: architecture — Content delivery at the edge

Generate one page of the kind **Architecture**, English only.

- Standing rule: every fact is below, labeled given. A missing fact becomes `[GAP: <what>]`. Never invent.
- The source documents the dataflow in eight steps; the architecture kind caps the numbered dataflow at six items, so consolidate without losing any documented behavior.

## Page identity (given)

- Title: `Content delivery at the edge`
- Permalink: `/documentation/architectures/content-delivery/` — namespace: `docs_architectures_content_delivery`

## Facts (source: given; transcribed from `/documentation/architectures/edge-application/content-delivery/`)

**The problem this design solves:** serving a site's content from locations close to users, cutting latency and origin infrastructure load, for teams that deliver static-heavy sites and applications.

**Diagram (given):** asset `/assets/docs/images/uploads/content-delivery-arch.png`, alt text "Overview of a request/response through Applications".

**Dataflow, as documented (eight steps to consolidate):**

1. A client sends an HTTP or HTTPS request to a domain associated with an application.
2. At the edge node, Rules Engine processes the request, applying cache policies and image optimization behaviors in the request phase.
3. The cache layer evaluates the request; on a cache-key match, the object is delivered from cache.
4. If configured, Image Processor retrieves the image from the origin, processes it, and the edge node caches the optimized image.
5. On a cache miss, the request is forwarded to the origin server.
6. The origin responds; the content is cached at the edge node; a cache key is generated and included in the `X-Cache-Key` response header.
7. Before the response returns to the client, Rules Engine processes response-phase policies.
8. The content is delivered to the user.

**Components (roles given):** **Applications** — the application at the edge; **Cache** — caches content at the edge; **Application Accelerator** — customizes cache rules, cache keys, and cookie handling; **Rules Engine** — configures which cache policy applies in which scenario; **Image Processor** — image manipulation through the request line.

**Implementation facts (links only on the page):** cache policy recommendations from the source: static files cached for at most 15 days (432000 seconds); images for 1 year (31536000 seconds); two Rules Engine rules enforce them (one for static files, one for images).

## Links (given)

| Text | Permalink |
| --- | --- |
| Application Accelerator | `/documentation/products/build/applications/application-accelerator/` |
| Cache | `/documentation/products/build/applications/cache/` |
| Rules Engine | `/documentation/products/build/applications/rules-engine/` |
| Configure cache policies | `/documentation/products/guides/cache-settings/` |
