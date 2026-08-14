# Conformance record

One generation test per kind, run in isolation per `../README.md`. Every kind reached CONFORMANT with no manual edits to the output. Failures along the way were treated as rule defects; this index records which rules changed because of which round.

## Verdicts

| Kind | Verdict | Iterations | Gaps left in the final page |
| --- | --- | --- | --- |
| How-to (+ pt-br pair) | CONFORMANT | 3 | CLI update syntax; PATCH headers; two PT link permalinks |
| Tutorial | CONFORMANT | 1 | database-ID lookup; wrapper code body |
| Get started | CONFORMANT | 1 | none |
| Troubleshooting | CONFORMANT | 1 | the save control's name |
| Reference | CONFORMANT | 1 | none |
| Concept | CONFORMANT | 1 | none |
| Overview | CONFORMANT | 1 | secondary CTA; interfaces list; one link reason |
| Changelog | CONFORMANT | 1 | configuration code sample |
| Navigation hub | CONFORMANT | 1 | none |
| Architecture | CONFORMANT | 1 | none |
| Multi-product guide | CONFORMANT | 1 | none |
| Use case | CONFORMANT | 2 | no signal identifies a bypassed cart request |

Every gap marks a fact the brief deliberately withheld — the discipline working, not a defect. Iteration counts include regenerations forced by rule changes, not only by failures.

## Rules changed by the loop

**Round 1 — the how-to calibration:**

- `procedures.md`: a single-command procedure is a lead-in and the command, never a one-item numbered list; inside a `<Tabs>` panel, one lead-in per panel, never restated as a step.
- `content-types.md`: a task section's first sentence must add information its heading does not.
- `content-types.md`: prerequisites items are links or one-line commands *where one exists*, otherwise noun phrases.
- `bilingual.md`: fixed Portuguese forms for section names (`Pré-requisitos`, `Próximos passos`, `Recursos relacionados`), the link sentences (`Para mais informações, consulte …`), and untranslated Console labels.

**Round 2 — the regeneration and the reference test:**

- `procedures.md`: the outcome sentence states the entailed state change when the source shows no interface output; it never invents output, codes, or messages.
- `style-guide.md`: a list of one is a sentence, including a single prerequisite.
- `content-types.md`: the cross-linking matrix applies where the target exists; never invent a link to satisfy it.
- `content-types.md`: a get-started stage's procedure is numbered only at two or more actions.

**Wave A — codifications of blessed judgment calls:**

- `procedures.md`: a panel whose procedure the source cannot complete keeps its facts and a gap marker; a documented interface is never omitted silently, never filled from memory.
- `style-guide.md`: tool syntax needed to express a sourced fact is composition; a new product value is invention.

**Wave B — codifications and the one failure:**

- `content-types.md`: a mandated structural slot with no supplied content is emitted with a gap marker, never omitted, never invented.
- `changelog.md`: when release notes group entries by area, the product heading nests one level deeper.
- `page-shape.md` (use case): the scenario paragraph's three-to-five-sentence cap moved into the skeleton line itself — the only test that failed a review, regenerated to CONFORMANT after the fix.

**Use-case regeneration:**

- `style-guide.md`: the `---` separator count is "roughly three per page, unless the kind's skeleton shows otherwise" — the use-case skeleton's five separators are the skeleton winning, not a breach.
