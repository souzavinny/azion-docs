# Brief: reference — Object Storage

Generate one page of the kind **Reference**, English only.

- Standing rule: every fact is below, labeled given. A missing fact becomes `[GAP: <what>]`. Never invent.

## Page identity (given)

- Title: `Object Storage`
- Permalink: `/documentation/products/store/object-storage/` — namespace: `docs_store_object_storage`

## Facts (source: given; transcribed from `/documentation/products/store/object-storage/`)

**Definitional material:** Object Storage is a Store product that stores objects in buckets. A bucket is the container; an object is the stored item plus its metadata. All buckets are stored in the *us-east* cloud region.

**Buckets:** names are exclusive across all Azion accounts; 6 to 63 characters; must not start with `azion`; alphanumeric characters and hyphen accepted. Buckets cannot be renamed. A bucket can only be deleted when empty, after a 24-hour period following the removal of the final object.

**Objects:** **Object key** — the unique identifier string; it cannot be changed, and re-uploading with an existing key replaces the object with no way to retrieve earlier versions. **Prefix** — paths that simulate a folder hierarchy using forward slashes; example keys: `README.md`, `src/index.js`, `src/assets/images/image.png`. **Origin** — a bucket can serve as an origin in Connectors, from the root or from a prefix. **MIME type** — the `Content-Type` header sets it; when unspecified, Object Storage infers it from the file extension; `application/octet-stream` marks raw binary.

**Permissions** (attribute `workloads_access`): `read_only` — objects can be read but not modified by the Azion Web Platform; `read_write` — objects can be modified by the platform; `restricted` — objects can be modified and read through the API only; restricted buckets cannot be modified with Azion Runtime and cannot be used as an origin. Account-level operations are governed separately by Teams Permissions.

**Operations** (base `https://api.azion.com/v4/workspace/storage/buckets`), grouped in classes:

| Class | Operation | Method and path |
| --- | --- | --- |
| A | CreateBucket | `POST /` with `{"name": "...", "workloads_access": "read_only"}` |
| A | ListBuckets | `GET /` |
| A | UpdateBucket | `PATCH /{bucket_name}` with `{"workloads_access": "..."}` |
| A | ListObjects | `GET /{bucket_name}/objects` |
| B | GetObject | `GET /{bucket_name}/objects/{object_key}` |
| C | PutObject, PostObject | `PUT` / `POST /{bucket_name}/objects/{object_key}` |
| C | DeleteObject | `DELETE /{bucket_name}/objects/{object_key}` |
| C | DeleteBucket | `DELETE /{bucket_name}` |

Class A covers control, listing, and management; class B covers object reads; class C covers writes and upload management. Storage is billed per GB/hour with no minimum retention.

**Limits (given):**

| Scope | Limit |
| --- | --- |
| Buckets per account | 100 |
| Region | us-east |
| Maximum object size via PostObject | 20 MB |
| Bucket deletion | empty bucket, 24 hours after the last object is removed |

Limits can be raised on request to technical support.

Note: the corpus documents two API families for buckets; this brief uses the family from its source reference page (`/v4/workspace/storage/buckets`, field `workloads_access`).

## Links (given)

| Text | Permalink |
| --- | --- |
| Create an Object Storage bucket | `/documentation/products/store/storage/create-bucket/` |
| Update an Object Storage bucket | `/documentation/products/store/storage/update-buckets/` |
| Use a bucket as origin | `/documentation/products/store/storage/use-bucket-as-origin/` |
| Teams Permissions | `/documentation/products/accounts/teams-permissions/` |
