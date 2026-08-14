# Brief: tutorial — Build a user list API with Functions and SQL Database

Generate one page of the kind **Tutorial**, English only.

- The artifact: a function, running in an application, that queries a SQL database and answers on the application's domain.
- One linear path; the author (you) chooses every option.
- Standing rule: every fact is below, labeled given. A missing fact becomes `[GAP: <what>]`. Never invent.

## Page identity (given)

- Title: `Build a user list API with Functions and SQL Database`
- Permalink: `/documentation/products/guides/build-a-user-list-api/` — namespace: `docs_guides_build_user_list_api`

## Facts (source: given; transcribed from `/documentation/products/guides/edge-sql/retrieve-data-with-functions/`, `/documentation/runtime/api-reference/sql-database/`, `/documentation/products/guides/build/instantiate-functions/`)

**Prerequisites available to state:** an Azion account with a configured personal token; an existing application with the domain format `xxxxxxxxxx.map.azionedge.net`; the **Functions** module activated on the application (activating it can generate usage-related costs).

**Create the database (API, asynchronous):** `POST https://api.azion.com/v4/edge_sql/databases`, header `Authorization: Token [TOKEN VALUE]`, body `{"name": "mydatabase"}`. The response returns `"state": "pending"` and `"status": "creating"`. Poll with `GET` on the same endpoint until `status` is `created`.

**Create a table and seed it (API):** `POST https://api.azion.com/v4/edge_sql/databases/{id_database}/query` with:

```json
{"statements": ["CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL);", "INSERT INTO users (id, name) VALUES (1, 'Ana'), (2, 'Bruno');"]}
```

**Query it (API):** same endpoint with `{"statements": ["SELECT * FROM users;"]}`. Response shape: `{"state": "executed", "data": [{"results": {"columns": [...], "rows": [...]}}]}`.

**The function code (given, verbatim core):**

```js
import { Database } from "azion:sql";

async function db_query() {
  let connection = await Database.open("mydatabase");
  let rows = await connection.query("select * from users");
  return rows;
}
```

The full function wraps `db_query()` in a `handle_request(request)` that returns 405 for non-GET requests and 500 on error, and registers `addEventListener("fetch", (event) => event.respondWith(handle_request(event.request)));`. `Database.open(name)` opens a connection to the read replica; `Connection.query(sql)` returns `Rows`.

**Create the function (Console):** In Azion Console, go to **Functions** in the **Edge Libraries** section. Select the **+ Function** button. Name the function. Delete the placeholder code and paste the code. Select **Save**.

**Instantiate it (Console):** In Azion Console, go to **Applications** and select the application. Activate the **Functions** module and select **Save**. Go to the **Functions Instances** tab. Select **+ Function Instance**, name it, select the function, select **Save**. Then go to the **Rules Engine** tab, select **+ Rule**, name it, select **Request Phase**, set the criteria to the variable `${uri}` with the *is equal* operator and the argument `/users`, and in **Behaviors** select **Run Function** and the function. Select **Save**.

**Verify:** send a request to `https://<your-azion-domain>/users`; expect HTTP `200` with the query result. New rules can take a few minutes to propagate.

**Limits (given):** maximum columns per table 100; maximum SQL query duration 30 seconds.

## Links (given)

| Text | Permalink |
| --- | --- |
| SQL Database | `/documentation/products/store/sql-database/` |
| SQL Database API | `/documentation/runtime/api-reference/sql-database/` |
| Instantiate functions in an application | `/documentation/products/guides/build/instantiate-functions/` |
| Azion SQL library | `/documentation/products/azion-lib/sql/` |
