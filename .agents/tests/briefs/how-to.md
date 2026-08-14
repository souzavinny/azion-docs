# Brief: how-to — Create an Object Storage bucket

Generate one page of the kind **How-to**, plus its Brazilian Portuguese pair (two files).

- Tasks: create a bucket; change a bucket's permissions.
- Interfaces: Console, CLI, and API — the multi-interface pattern.
- Standing rule: every fact you need is below, labeled given. A missing fact becomes `[GAP: <what>]`. Never invent.

## Page identity (given)

- EN title: `Create an Object Storage bucket` — permalink `/documentation/products/store/storage/create-bucket/`
- PT title: `Criar um bucket do Object Storage` — permalink `/documentacao/produtos/store/storage/criar-bucket/`
- Shared namespace: `docs_store_journey_storage_create_bucket`

## Facts (source: given; transcribed from `/documentation/products/guides/create-and-modify-bucket/` and `/documentation/products/store/storage/create-bucket/`)

**Console — create:** In Azion Console, go to **Object Storage**. Select the **+ Bucket** button. Enter a **Bucket Name** (between 6 and 63 characters). Set **Workloads Access** to one of: *Read Only*, *Read-Write*, *Restricted*. Select **Save**. The bucket appears in the bucket list.

**Console — change permissions:** In the Object Storage bucket list, select the bucket name. Change the **Workloads Access** level. Select **Save**.

**CLI — create:** requires the Azion CLI installed and a configured personal token.

```
azion create edge-storage bucket --name '<your-bucket-name>' --edge-access 'read_only'
```

`--edge-access` accepts `read_only`, `read_write`, `restricted`. Update: `azion update edge-storage bucket`.

**API — create:**

```
curl --location 'https://api.azion.com/v4/storage/buckets' \
--header 'Accept: application/json' --header 'Content-Type: application/json' \
--header 'Authorization: Token [TOKEN VALUE]' \
--data '{"name": "<your-bucket-name>", "edge_access": "read_only"}'
```

Response: `{"state": "executed", "data": {"name": "...", "edge_access": "read_only"}}`.

**API — change permissions:** `PATCH https://api.azion.com/v4/storage/buckets/<your-bucket-name>` with `{"edge_access": "read_write"}`.

**Bucket naming rules:** names are exclusive across all Azion accounts; 6 to 63 characters; must not start with `azion`; alphanumeric characters and hyphen accepted.

Note: the corpus documents two API families for buckets; this brief uses the family from its source guide (`/v4/storage/buckets`, field `edge_access`).

## Links (given)

| Language | Text | Permalink |
| --- | --- | --- |
| EN | Object Storage | `/documentation/products/store/object-storage/` |
| EN | Update an Object Storage bucket | `/documentation/products/store/storage/update-buckets/` |
| EN | Upload an object to a bucket | `/documentation/products/store/storage/upload-object/` |
| EN | Use a bucket as origin | `/documentation/products/store/storage/use-bucket-as-origin/` |
| PT | Object Storage | `/documentacao/produtos/store/object-storage/` |
| PT | Atualizar um bucket do Object Storage | `/documentacao/produtos/store/storage/atualizar-buckets/` |

PT links not listed here: `[GAP]` rather than guessed.
