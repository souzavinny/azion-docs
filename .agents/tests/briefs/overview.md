# Brief: overview — Data Stream

Generate one page of the kind **Overview**, English only.

- Standing rule: every fact is below, labeled given. A missing fact becomes `[GAP: <what>]`. Never invent.

## Page identity (given)

- Title: `Data Stream`
- Permalink: `/documentation/products/observe/data-stream/` — namespace: `docs_observe_data_stream`

## Facts (source: given; transcribed from `/documentation/products/observe/data-stream/`)

**Definition material:** Data Stream is an Observe product that feeds stream processing, SIEM, and big data platforms with the event logs from your applications on Azion, in real time. It collects, groups, and transmits raw logs to a destination you choose. You choose which Azion products and domains to collect from and which variables to use. Logs use ASCII encoding to avoid parser issues.

**Data sources (selection is mandatory):** Activity History · Applications · Functions · WAF Events.

**Templates per source:** Activity History Collector · Applications + WAF Event Collector · Functions Event Collector · WAF Event Collector · Custom Template.

**Connectors (destinations):** Apache Kafka · AWS Kinesis Data Firehose · Azure Blob Storage · Azure Monitor · Datadog · Elasticsearch · Google BigQuery · IBM QRadar · S3 - Simple Storage Service · Splunk · Standard HTTP/HTTPS POST.

**Key capabilities:**

- Domain association: **Filter Domains** or **All Domains**, plus a **Sampling (%)** field. Sampling is limited to one active stream and is not available on all account plans.
- Customizable payload for the Standard HTTP/HTTPS POST connector: **Max Size** in bytes (accepts values from 1000000), **Log Line Separator**, **Payload Format**. Recommended: NDJSON, separator `\n`, format `$dataset`.
- Endpoint health monitoring once a minute: HTTP `504` on timeout (20 seconds for HTTP POST endpoints), HTTP `503` when the endpoint is unavailable.

**Limits (given):** streams send data every 60 seconds or in packages of 2,000 requests, whichever happens first (AWS Kinesis Data Firehose: 60 seconds or 500 requests). Data transfer to the destination takes up to 3 minutes.

## Links (given)

| Text | Permalink |
| --- | --- |
| Data Stream first steps | `/documentation/products/observe/data-stream/first-steps/` |
| Configure Data Stream main settings | `/documentation/products/guides/use-data-stream/` |
| Associate Workloads on Data Stream | `/documentation/products/guides/data-stream-associate-workloads/` |
| Real-Time Events | `/documentation/products/observe/real-time-events/` |

Use the first-steps link as the primary CTA.
