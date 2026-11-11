# Documentation Style Guide

This page sets the rules for every Markdown page in this repository. People and AI agents follow the same rules.
Link to these rules from other pages; do not restate them, because copies drift.

## 1. Where knowledge lives

| Content | Location |
|---|---|
| Docs index | [`docs/README.md`](README.md) |
| This style guide | `docs/STYLE_GUIDE.md` |
| Architecture overview | [`docs/architecture/overview.md`](architecture/overview.md) |
| Decisions of record (ADRs) | [`docs/adr/`](adr/README.md), rules in [`ADR_POLICY.md`](ADR_POLICY.md) |
| Host-page integration guide | [`USAGE.md`](../USAGE.md) |
| Release lifecycle and repository setup | [`RELEASE_PROCESS.md`](../RELEASE_PROCESS.md) |
| Rules for AI coding agents | [`AGENTS.md`](../AGENTS.md) |
| Agentic-readiness audit reports and state | `docs/agentic-readiness-report/`, `docs/agentic-readiness/` |
| Scratch: plans, drafts, notes | `artefacts/` (git-ignored, never linked from a tracked file) |

- `docs/` and the root pages above hold permanent knowledge. `artefacts/` is scratch only.
- Update the page that exists instead of writing a second one on the same topic.
- `CHANGELOG.md` is written by release-please. Never edit it by hand.

## 2. Content rules

1. **Ground every claim.** Cite code by its path, for example `src/config/environment.ts`. Never describe a
   planned feature as working. Mark it with a `> [!NOTE]` that says it is planned.
2. **Change docs with the code.** A change to a public interface, to observable behaviour or to the architecture
   updates the affected pages in the same change.
3. **Record decisions as ADRs.** A decision an agent would otherwise get wrong or reopen goes in `docs/adr/`.
   Read [`ADR_POLICY.md`](ADR_POLICY.md) first.
4. **No secret values.** Never copy a value from an env file, a credential, a token or a keystore. Name the
   variable instead. Every build value is public (see [ADR 0001](adr/0001-public-build-time-config.md)).

## 3. Formatting

- Lint rules: [`.markdownlint-cli2.jsonc`](../.markdownlint-cli2.jsonc). Run `npm run docs:lint`.
- Headings: ATX style (`#`, `##`, `###`), at most four levels, one blank line before and after.
- Tables: GitHub tables. The compact `|---|` delimiter row is fine.
- Line length is not enforced. Wrap prose near 120 characters in new pages.
- Links: relative paths inside the repository.
- Code, commands and file names go in backticks; multi-line commands go in fenced blocks with a language.

## 4. Plain language

Write for a new engineer who knows TypeScript, Git and npm, but not this SDK. These rules come from ASD-STE100
(Simplified Technical English), without its fixed word list: technical names are fine. The audit check `DOC-05`
measures rules 2 and 6 over every page under `docs/`.

1. **Bottom line first.** Put the answer, the result or the decision in the first two lines.
2. **Short sentences.** At most 20 words in a step of a procedure. At most 25 words in other text.
3. **One instruction per sentence.** Write steps in the imperative: "Run the tests", not "You should run them".
4. **Active voice.** Say who does what: "The service reads the file", not "The file is read".
5. **One word, one meaning.** Use the same term every time. Do not change words for variety.
6. **No vague or padded words.** Do not write `simply`, `just`, `obviously`, `clearly`, `basically`, `easily`,
   `utilize`, `leverage`, `in order to`, `and/or` or `etc.`. Name the real items instead of `etc.`.

Example (the "before" text breaks rules 2, 4 and 6 on purpose, so the check skips it):

<!-- prose-check off -->

> Before: In order to ensure that the build is green, it is recommended that the tests are run by the
> contributor prior to the proposal of a change.
>
> After: Run the tests before you propose a change.

<!-- prose-check on -->

## 5. Diagrams

A diagram often explains a flow faster than text. Every page under `docs/architecture/` has at least one Mermaid
diagram. Pick the type by what you show:

| You show | Mermaid type |
|---|---|
| Steps and choices in a process | `flowchart` |
| Who calls whom, in order | `sequenceDiagram` |
| The states of one thing and how it moves between them | `stateDiagram-v2` |
| Data shapes and how they relate | `classDiagram` or `erDiagram` |

- Keep a diagram to about 12 nodes. Split a larger one.
- Write one sentence before the diagram that says what it shows.
- Put the diagram in a fenced `mermaid` block. Do not add an image when Mermaid can show it.
- Validate every block before you commit it. The docs CI job renders each block with the Mermaid CLI.
