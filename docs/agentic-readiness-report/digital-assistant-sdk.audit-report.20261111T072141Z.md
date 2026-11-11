# Agentic readiness audit: digital-assistant-sdk

> [!NOTE]
> This audit reports; it does not gate. A check that could not be settled is UNKNOWN: it earns no credit and is never shown as a pass.

## Bottom line

- **4 blockers remaining: 2 FAIL, 2 PARTIAL.**
- **Not settled by this scan:**
  - 1 check is UNKNOWN: `TOOL-07`.
  - 5 requirements are unattested: no check settles them.

**First actions** (3 of 30 open findings):

| # | Finding | Severity | Effort | What it blocks | Fix |
|---:|---|---|:---:|---|---|
| 1 | `CON-02` (F-001) | BLOCKER | — | An agent cannot rely on the deny list to keep test directories out of an agent's reach because the prohibitions section of AGENTS.md does not name test/. | Name test/ in a code span in the prohibitions section of AGENTS.md. |
| 2 | `EXEC-04` (F-002) | BLOCKER | — | An agent cannot know every variable the code needs before running it because 2 referenced key(s) are absent from any committed example file: UDA_LOG_LEVEL, UDA_LOG_LEVELNumber. | Add the missing keys to .env.example (values redacted) so the environment can be provisioned without reading the source. |
| 3 | `IDX-01` (F-003) | BLOCKER | — | An agent cannot discover the codebase through an MCP index because no MCP configuration names codebase-memory-mcp for this repository. | Register the server in a project config (for example \`opencode.json\`) or a user config (\`~/.config/opencode/opencode.json\`). |

## Provenance

| Field | Value |
|---|---|
| Framework | `v0.3.4`, checkout `0006e0f9012f` |
| Target | `/home/kc/Downloads/Junk/delete/temp/Digital-Assistant-SDK` |
| Commit | `16c02fce8c70` on `agentic-readiness` — clean working tree |
| Status | final |
| Started | `2026-11-11T07:05:17+00:00` |
| Finalised | `2026-11-11T07:21:41+00:00` |
| Catalogue | `0.7.0` |
| Engine | `python-agentic-audit` 0.3.4, ruleset `2026-11-10.5`, ruleset hash `9b2a2e2562a10c7a`, scanned `2026-11-11T07:05:17+00:00` |
| Agent (self-reported) | `Claude Code` with `claude-sonnet-5-5 (Stages 2-3); claude-opus-5-5 (Stages 0-1, 4-5)` |
| Probes | `format`, `format:check`, `lint`, `typecheck`, `test`, `check`, `security`, timeout 300 s |
| Report schema | `0.2` |

## Readiness summary

- **Phase-1 score: 0.77**, over 62 scored checks
- **4 blockers remaining: 2 FAIL, 2 PARTIAL**
- **Unattested:** 5 requirements that no check settles, listed below

1 of the 62 scored checks is UNKNOWN. An UNKNOWN check earns no credit, so the score understates what is true of the repository and does not certify it. No agent finding is waiting for a person's decision.

The score is the weighted share of the scored checks that the repository meets. The weights are BLOCKER 3, DEGRADER 2, COSMETIC 1; PASS earns full credit, PARTIAL half, and FAIL and UNKNOWN none. The framework sets no pass mark, and a score says nothing about whether agents will write correct code.

### Unattested requirements

A person's review or the owner's declaration verifies these requirements, so no check gives them a verdict, and they are outside the score. One leaves this list only when a person records an outcome or the owner declares it.

| Requirement | Method | Property | Why |
|---|---|---|---|
| `REQ-SH-004` | attested | `index-in-use` | Whether the codebase index is actually used during agent work. |
| `REQ-BF-004` | attested | `baseline-adequacy` | Whether the committed baseline or budget is adequate. |
| `REQ-SH-050` | attested | `suite-trustworthiness` | Whether the passing test suite actually catches regressions. |
| `REQ-SH-020` | attested | `doc-accuracy` | Whether the documentation matches the code it describes. |
| `REQ-SH-026` | attested | `gate-honoured` | Whether the gate is actually run and honoured before merge. |

## Checks by verdict and severity

The first table counts every check in the report. The second counts the scored checks only.

| Verdict | Checks | Credit | Meaning |
|---|---:|---:|---|
| PASS | 47 | 1 | The requirement is met. |
| PARTIAL | 13 | 0.5 | Part of the requirement is met. |
| FAIL | 15 | 0 | The requirement is not met. |
| UNKNOWN | 1 | 0 | The evidence could not be gathered. It is never read as a pass. |
| NOT_APPLICABLE | 0 | outside the score | The check does not apply to this repository. |
| **Total** | **76** |  |  |

| Severity | Weight | Meaning | Scored checks | Not met |
|---|---:|---|---:|---:|
| BLOCKER | 3 | Agent work is impossible, unsafe or unverifiable. Fix before onboarding agents. | 16 | 4 |
| DEGRADER | 2 | Agent work is possible but unreliable or wasteful. | 39 | 12 |
| COSMETIC | 1 | Hygiene. Fix when convenient. | 7 | 5 |

## Command surface

The framework's seven verbs, resolved verb by verb on the target's runners — CMD-01's structured payload; CMD-02, AGT-05 and CI-02 read the same surface.

7 verbs of 7 verbs resolve. Every verb resolves.

| Verb | Resolved | Runner | Command |
|---|:---:|---|---|
| `format` | yes | `package.json` | `prettier --write "src/**/*.ts"` |
| `format:check` | yes | `package.json` | `prettier --check "src/**/*.ts"` |
| `lint` | yes | `package.json` | `eslint "src/**/*.ts"` |
| `typecheck` | yes | `package.json` | `tsc --noEmit` |
| `test` | yes | `package.json` | `jest` |
| `check` | yes | `package.json` | `npm run format:check && npm run typecheck && npm test` |
| `security` | yes | `package.json` | `npm audit --omit=dev --audit-level=high && npm audit --audit-level=critical` |

## Credential-shaped lines

8 credential-shaped lines across 4 files in tracked text files. The file-by-file detail is in the attention tables above; the report never records the value itself.

## Missing secret-shape ignore rules

The secret shapes SEC-01 and SEC-03 check for, and whether the repository's ignore rules cover each one. The suggested entry is paste-ready into `.gitignore` for a shape that is missing.

| Shape | Status | Suggested `.gitignore` entry |
|---|:---:|---|
| dotenv | covered | `.env` |
| dotenv variant | **missing** | `.env.*` |
| ssh private key | **missing** | `id_rsa*` |
| PEM | **missing** | `*.pem` |
| key | **missing** | `*.key` |
| PKCS#12 | **missing** | `*.p12` |
| PFX | **missing** | `*.pfx` |
| keystore | **missing** | `*.keystore` |
| certificate (.crt) | **missing** | `*.crt` |
| certificate (.cer) | **missing** | `*.cer` |
| AWS credentials | **missing** | `.aws/*` |

## Checks that need attention

Each row is a finding, or a check that has none. A check is listed when it is not met, was overridden, was judged by the agent, or raised a finding. Evidence is grouped by who captured it, and a quote or command output is under Evidence in full. The decision on a finding is one of these:

- **interactive**: Decided by the person, on this finding alone.
- **batch**: Decided by the person, as one of a group of findings that are not blockers.
- **policy**: Set by the confirmation policy, not by a person.

### Blocker checks

4 of the 16 scored BLOCKER checks are not met.

| Check | Verdict | What we found | Evidence | Fix | Decision |
|---|---|---|---|---|---|
| `IDX-01` codebase-memory-mcp registered for this repository<br>finding `F-003` | **FAIL** | An agent cannot discover the codebase through an MCP index because no MCP configuration names codebase-memory-mcp for this repository. | We did not find any evidence. | Register the server in a project config (for example \`opencode.json\`) or a user config (\`~/.config/opencode/opencode.json\`). | **Confirmed** (interactive) |
| `IDX-02` An index exists for this checkout | **PASS**<br>engine: UNKNOWN | The codebase-memory-mcp index answers for this checkout: project root equals the target and status is ready.<br>**Overridden.** The engine's verdict was UNKNOWN. Reason: The engine could not open a store (user config not read, no .zst); a direct index_status query proves the index exists and answers for this root. | **agent** `project=digital-assistant-sdk-agentic-readiness` through `codebase-memory-mcp index_status` (status ready; root_path /home/kc/Downloads/Junk/delete/temp/Digital-Assistant-SDK; 1549 nodes, 4106 edges; indexed_at 2026-11-11T06:58:06Z) | — | — |
| `CON-02` Test directories protected<br>finding `F-001` | **PARTIAL** | An agent cannot rely on the deny list to keep test directories out of an agent's reach because the prohibitions section of AGENTS.md does not name test/. | **tool** `AGENTS.md:97` (8. Security) | Name test/ in a code span in the prohibitions section of AGENTS.md. | **Confirmed** (interactive) |
| `EXEC-04` Env-var inventory complete<br>finding `F-002` | **FAIL** | An agent cannot know every variable the code needs before running it because 2 referenced key(s) are absent from any committed example file: UDA_LOG_LEVEL, UDA_LOG_LEVELNumber. | We did not find any evidence. | Add the missing keys to .env.example (values redacted) so the environment can be provisioned without reading the source. | **Confirmed** (interactive)<br>Note: Owner: add UDA_LOG_LEVEL and UDA_LOG_LEVELNumber to the example file; local setup is meant to be easy, so local.env carries real local defaults. |
| `SEC-01` .env untracked and ignored<br>finding `F-004` | **PARTIAL** | An agent cannot trust that a future .env stays out of history because ignore rules are incomplete (missing: dotenv variant). | **tool** `.gitignore` (node_modules)<br>`.gitignore` (dist)<br>`.gitignore` (build)<br>`.gitignore` (.env)<br>`.gitignore` (environments/\*)<br>`.gitignore` (environments/local.env.example)<br>`.gitignore` (coverage)<br>`.gitignore` (.jest-cache) | Add the .env shape without a leading slash (for example \`.env\` and \`.env.\*\`) to .gitignore so an environment file cannot be committed by accident, at any depth. | **Confirmed** (interactive) |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-005` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/services/\_\_tests\_\_/TranslateService.test.ts contains 1 credential-shaped line(s).<br>**Overridden.** The engine's verdict was FAIL. Reason: Each flagged line assigns a short hyphenated placeholder (test-api-key, keycloak-jwt-token, user-session-token, user-data-token, renewed-token twice, secret-token, received-token) in a unit test; the owner rejected F-005 to F-008 as false positives. | **tool** `src/services/__tests__/TranslateService.test.ts:20` (credential-shaped string)<br>**agent** `src/services/__tests__/TranslateService.test.ts:20` (placeholder literal test-api-key in a unit test)<br>`src/services/__tests__/apiClient.test.ts:189` (placeholder literal keycloak-jwt-token; lines 217, 237, 674, 689 alike)<br>`src/util/user/__tests__/AuthDataConfig.test.ts:135` (placeholder literal secret-token in a unit test)<br>`src/util/user/__tests__/UDABindAccount.test.ts:126` (placeholder literal received-token in a mocked response)<br>command `git grep -nE 'sk-[A-Za-z0-9_-]{16,}\|gh[pousr]_[A-Za-z0-9]{16,}\|AKIA[0-9A-Z]{16}\|-----BEGIN [A-Z ]*PRIVATE KEY-----\|Bearer [A-Za-z0-9._-]{16,}' -- . ':!package-lock.json' \| wc -l` (exit 0; output in Evidence in full) | Remove the value from the file and its history, load it from the environment, and rotate the credential. The report never records the value itself. | **Rejected** (interactive)<br>Note: Owner: false positive; placeholder literals in unit tests, verified line by line. |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-006` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/services/\_\_tests\_\_/apiClient.test.ts contains 5 credential-shaped line(s). | **tool** `src/services/__tests__/apiClient.test.ts:189` (credential-shaped string)<br>`src/services/__tests__/apiClient.test.ts:217` (credential-shaped string)<br>`src/services/__tests__/apiClient.test.ts:237` (credential-shaped string)<br>`src/services/__tests__/apiClient.test.ts:674` (credential-shaped string)<br>`src/services/__tests__/apiClient.test.ts:689` (credential-shaped string) | Same as `F-005` | **Rejected** (interactive)<br>Note: Owner: false positive; placeholder literals in unit tests, verified line by line. |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-007` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/util/user/\_\_tests\_\_/AuthDataConfig.test.ts contains 1 credential-shaped line(s). | **tool** `src/util/user/__tests__/AuthDataConfig.test.ts:135` (credential-shaped string) | Same as `F-005` | **Rejected** (interactive)<br>Note: Owner: false positive; placeholder literals in unit tests, verified line by line. |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-008` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/util/user/\_\_tests\_\_/UDABindAccount.test.ts contains 1 credential-shaped line(s). | **tool** `src/util/user/__tests__/UDABindAccount.test.ts:126` (credential-shaped string) | Same as `F-005` | **Rejected** (interactive)<br>Note: Owner: false positive; placeholder literals in unit tests, verified line by line. |

### Degrader checks

12 of the 39 scored DEGRADER checks are not met.

| Check | Verdict | What we found | Evidence | Fix | Decision |
|---|---|---|---|---|---|
| `IDX-03` Index freshness | **PASS**<br>engine: UNKNOWN | A direct freshness query reports no drift between the index and HEAD.<br>**Overridden.** The engine's verdict was UNKNOWN. Reason: The engine store exposes no revision, so it reported UNKNOWN; the index tool's own detect_changes against HEAD reports zero changed files. | **agent** `base_branch=HEAD scope=files` through `codebase-memory-mcp detect_changes` (merge_base 16c02fce8c70; changed_total 0; seed_symbols 0) | — | — |
| `AGT-03` Documentation contract named<br>finding `F-009` | **PARTIAL** | An agent cannot know where permanent and scratch documentation live because AGENTS.md does not name docs/STYLE_GUIDE.md. | **tool** `AGENTS.md:136` (docs/)<br>`AGENTS.md:61` (artefacts/) | Name docs/ as the canonical home for permanent knowledge, docs/STYLE_GUIDE.md as the authoring rules, and artefacts/ as off-limits scratch. | **Confirmed** (batch) |
| `AGT-04` Definition of done stated<br>finding `F-010` | **FAIL** | An agent cannot keep code and its documentation in step because no definition-of-done sentence ties a documentation trigger to the same change set. | We did not find any evidence. | State that a change altering a public interface, observable behaviour, architecture, a check's semantics or an ADR updates the affected docs and the ADR index in the same change set. | **Confirmed** (batch) |
| `AGT-08` No competing instruction files, and the reach matrix is stated<br>finding `F-024`, severity COSMETIC | **PARTIAL** | An agent cannot assume every harness on the team sees the project rules because 20 of 28 known harnesses reach an instruction file; Aider, Amazon Q Developer, Anthropic Claude Code, Continue, Google Gemini CLI, Qwen Code, Replit Agent, Void reach nothing. | — | Either state the supported harnesses in AGENTS.md, or add the vendor pointer files for the harnesses in use. | **Confirmed** (batch) |
| `DOC-02` docs/STYLE_GUIDE.md exists<br>finding `F-020` | **FAIL** | An agent cannot find the canonical authoring rules for documentation because docs/STYLE_GUIDE.md does not exist. | We did not find any evidence. | Create docs/STYLE_GUIDE.md and name it from the instruction file so writers have one set of authoring rules. | **Confirmed** (batch) |
| `TOOL-05` Local hook chain active<br>finding `F-022` | **FAIL** | An agent cannot rely on local hooks to run before a commit because no hook manager is configured. | **tool** `package.json` | Adopt a hook manager (pre-commit, lefthook, husky) and wire it so checks run before a commit rather than only in CI. | **Confirmed** (batch) |
| `CI-03` CI-only steps flagged<br>finding `F-015` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/ci.yml:253 runs \`npm integrity\` with no local runner entry for \`integrity\`.<br>**Overridden.** The engine's verdict was FAIL. Reason: The engine read words inside echo strings (a Markdown job-summary table row and release-notes text) as npm invocations; the owner rejected F-015 to F-018 as false positives. | **tool** `.github/workflows/ci.yml:253` (npm integrity)<br>**agent** `.github/workflows/ci.yml:253` (echo of a job-summary table row naming npm integrity; not a command)<br>`.github/workflows/release-and-sync.yml:201` (the same echo table row)<br>`.github/workflows/release-and-sync.yml:315` (echo of release-notes heading text)<br>`.github/workflows/release-and-sync.yml:319` (echo of a dist-tag instruction printed for a person) | Add a local script/target for \`integrity\`, or document why the step is CI-only. | **Rejected** (batch)<br>Note: Owner: false positive, verified line by line. echo of a Markdown table row. |
| `CI-03` CI-only steps flagged<br>finding `F-016` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/release-and-sync.yml:201 runs \`npm integrity\` with no local runner entry for \`integrity\`. | **tool** `.github/workflows/release-and-sync.yml:201` (npm integrity) | Same as `F-015` | **Rejected** (batch)<br>Note: Owner: false positive, verified line by line. echo of a Markdown table row. |
| `CI-03` CI-only steps flagged<br>finding `F-017` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/release-and-sync.yml:315 runs \`echo "### Staged on npm with tag \\\`next\\\`"\` with no local runner entry for \`with\`. | **tool** `.github/workflows/release-and-sync.yml:315` (echo "### Staged on npm with tag \\\`next\\\`") | Add a local script/target for \`with\`, or document why the step is CI-only. | **Rejected** (batch)<br>Note: Owner: false positive, verified line by line. echo of release-notes text. |
| `CI-03` CI-only steps flagged<br>finding `F-018` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/release-and-sync.yml:319 runs \`echo "3. After the TEST pass: \\\`npm dist-tag add @udan/digital-assistant-sdk@$VERSION latest\\\`."\` with no local runner entry for \`dist-tag\`. | **tool** `.github/workflows/release-and-sync.yml:319` (echo "3. After the TEST pass: \\\`npm dist-tag add @udan/digital-assistant-sdk@$VERSION latest\\\`.") | Add a local script/target for \`dist-tag\`, or document why the step is CI-only. | **Rejected** (batch)<br>Note: Owner: false positive, verified line by line. echo of an instruction for a person. |
| `CI-05` Workflow files are linted<br>finding `F-019` | **FAIL** | An agent cannot check a workflow change before it is pushed because no linter for the github workflow files runs locally or in CI. | **tool** `.github/workflows/ci.yml`<br>`.github/workflows/cross-os.yml`<br>`.github/workflows/enforce-dev-base.yml`<br>`.github/workflows/pr-title.yml`<br>`.github/workflows/release-and-sync.yml`<br>`.github/workflows/security.yml` | Add a workflow linter to the local command surface or a hook and run it in CI (GitHub: actionlint and zizmor; other providers: check-jsonschema with the provider's built-in schema). | **Confirmed** (batch) |
| `BASE-01` Baseline artifact exists<br>finding `F-011` | **PARTIAL** | An agent cannot diff today's findings against an accepted baseline because quality tooling is configured but no baseline or suppression artifact is committed. | **tool** `.eslintrc.js`<br>`.gitleaks.toml`<br>`package.json` (lint)<br>`package.json` (security)<br>`package.json` (typecheck) | Commit a baseline or suppression artifact (for example \`baseline.json\`, an eslint/ruff baseline, or \`.gitleaksignore\`), or document the equivalent mechanism in \`AGENTS.md\`. | **Confirmed** (batch) |
| `BASE-02` Current violation counts measured<br>finding `F-012` | **PARTIAL** | An agent cannot state how many violations exist today because a counting surface exists but no numeric violation budget or count is committed. | **tool** `.eslintrc.js`<br>`.gitleaks.toml`<br>`package.json` (lint)<br>`package.json` (security)<br>`package.json` (typecheck) | Commit the count or configure a budget (\`--max-warnings N\`, \`max-issues\`, or a \`violation budget\`) so a regression has a baseline number to compare against. | **Confirmed** (batch) |
| `BASE-03` No-new-violations mechanism<br>finding `F-013` | **PARTIAL** | An agent cannot stop the violation count from growing because no baseline, budget or comparison step exists, so the count is not guarded. | — | Once a baseline exists, wire a comparison step (the audit's own \`--baseline REPORT.JSON\` is the reference pattern) so new findings fail the build. | **Confirmed** (batch) |
| `BASE-04` Coverage floor configured<br>finding `F-014` | **FAIL** | An agent cannot know when coverage drops below an agreed floor because no coverage threshold is configured in the test runner. | We did not find any evidence. | Configure a coverage floor for the test runner so a drop fails the gate. | **Confirmed** (batch) |
| `TST-04` Fast path documented<br>finding `F-023` | **PASS**<br>engine: FAIL | An agent cannot run one test or a subset without the whole suite because none of the entry documents shows a single-test or subset invocation (scope: README.md, AGENTS.md).<br>**Overridden.** The engine's verdict was FAIL. Reason: The engine reads only fenced code blocks; the subset invocation is an inline code span in AGENTS.md step 4, which meets the rubric. The owner rejected F-023. | **tool** `README.md`<br>`AGENTS.md`<br>**agent** `AGENTS.md:114` (targeted: npm test -- path/to/\_\_tests\_\_) | Document a fast path (for example \`pytest -k \<name>\`, \`npm test -- \<name>\`, or \`go test -run \<name>\`) in a fenced shell block. | **Rejected** (batch)<br>Note: Owner: false positive, verified line by line. AGENTS.md:114 documents npm test -- path/to/\_\_tests\_\_ inline. |
| `SEC-03` Ignore patterns cover secret shapes<br>finding `F-021` | **PARTIAL** | An agent cannot trust that secret shapes cannot be committed because ignore rules are incomplete (missing: dotenv variant, ssh private key, PEM, key, PKCS#12, PFX, keystore, certificate (.crt), certificate (.cer), AWS credentials). | **tool** `.gitignore` (node_modules)<br>`.gitignore` (dist)<br>`.gitignore` (build)<br>`.gitignore` (.env)<br>`.gitignore` (environments/\*)<br>`.gitignore` (environments/local.env.example)<br>`.gitignore` (coverage)<br>`.gitignore` (.jest-cache) | Add the missing shapes to .gitignore — for example \`.env.\*\`, \`\*.pem\`, \`\*.key\`, \`\*.p12\`, \`\*.pfx\`, \`\*.keystore\`, \`id_rsa\*\`, \`\*.crt\`, \`\*.cer\`, \`.aws/\*\`. | **Confirmed** (batch) |
| `AGT-11` Instructions are specific and not inferable<br>finding `F-039` · agent, confidence medium | **PARTIAL** | An agent cannot trust every specific line of AGENTS.md because three of them name a command, a file or a state that does not resolve (npm test:coverage, \_\_mocks\_\_/sweetAlert2.ts, a root .env). | **agent** `AGENTS.md:35`<br>`AGENTS.md:123`<br>`AGENTS.md:103` | Fix the three lines: npm run test:coverage, \_\_mocks\_\_/sweetalert2.ts, and drop or reword the root .env sentence.<br>Playbook `adapt-agents-md` · Effort S | **Confirmed** (batch) |
| `CI-04` CI enforces the same gate as the local check<br>agent, confidence high | **PASS** | Every verb job gates on its exit code, CI Gate aggregates them, and live rules on main and dev require CI Gate. | **agent** `.github/workflows/ci.yml:119-131` (verify job: typecheck, format:check, lint run in parallel and exit 1 if any fails; tests run plainly; no continue-on-error)<br>`.github/workflows/ci.yml:325-345` (CI Gate job (if: always) fails on any needed job result other than success or skipped; skipped applies only to docs-only changes by design)<br>`.github/workflows/ci.yml:284-285` (audit job runs npm run security with no swallow)<br>command `grep -nE 'continue-on-error\|\|\| true\|set \+e' .github/workflows/*.yml` (exit 1; output in Evidence in full)<br>command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/main` (exit 0; output in Evidence in full)<br>command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/dev` (exit 0; output in Evidence in full) | — | — |

### Cosmetic checks

5 of the 7 scored COSMETIC checks are not met.

| Check | Verdict | What we found | Evidence | Fix | Decision |
|---|---|---|---|---|---|
| `AGT-12` Communication rules stated<br>finding `F-025` | **FAIL** | An agent cannot report to people or ask them for a decision in a form they expect because AGENTS.md has no section on writing for people and names no communication rules file. | We did not find any evidence. | Add a short section to the instruction file, for example 'How to write for people': who the reader is, the bottom line first and the layout of a report, and how to ask for a decision (the options, a recommendation and a default). Link a longer rules file if the repository has one. | **Confirmed** (batch) |
| `DOC-04` ADR directory and index<br>finding `F-026` | **FAIL** | An agent cannot find the decisions of record because no ADR directory (docs/architecture/adrs/ or docs/adr/) exists. | We did not find any evidence. | Add docs/architecture/adrs/ with NNNN-short-title.md files and a README index that lists them. | **Confirmed** (batch) |
| `DOC-05` Docs are readable<br>finding `F-027` | **PARTIAL** | An agent cannot rely on the documentation reading clearly to a new engineer because 13.5% of sentences are over 25 words (pass: at most 10%). | **tool** `docs/agentic-readiness-report/README.md:11` (long sentence)<br>`docs/agentic-readiness-report/digital-assistant-sdk-first-audit-20261028T130422Z.md:171` (long sentence)<br>`docs/agentic-readiness-report/digital-assistant-sdk-first-audit-20261028T130422Z.md:227` (long sentence)<br>`docs/agentic-readiness-report/suggested-improvements.md:4` (long sentence)<br>`docs/agentic-readiness-report/suggested-improvements.md:5` (long sentence)<br>`docs/agentic-readiness-report/suggested-improvements.md:7` (long sentence)<br>`docs/agentic-readiness-report/suggested-improvements.md:11` (long sentence)<br>`docs/agentic-readiness-report/suggested-improvements.md:12` (long sentence) | Rewrite the worst pages first: split sentences over 25 words, name the real item instead of a vague word, and add a Mermaid diagram to each explanation or tutorial page. Put the rules in docs/STYLE_GUIDE.md, and add a prose check with a baseline that only goes down. | **Confirmed** (batch) |
| `TOOL-06` Commit convention enforced<br>finding `F-038` | **PARTIAL**<br>engine: FAIL | An agent cannot learn a bad commit subject before it pushes because the Conventional Commits rule is enforced only on the pull-request title in CI, and no local commit-message rule exists.<br>**Overridden.** The engine's verdict was FAIL. Reason: The engine only recognises amannn/action-semantic-pull-request; .github/workflows/pr-title.yml enforces the same convention with an inline shell regex that exits 1 on a bad title. Per the rubric, CI-only is PARTIAL. | **agent** `.github/workflows/pr-title.yml:24-29` (shell regex on the PR title for feat\|fix\|perf\|refactor\|docs\|test\|build\|ci\|chore\|revert, exit 1 on mismatch)<br>`.github/workflows/pr-title.yml:24-29`<br>`package.json` (no commitlint, husky or lefthook entry)<br>**searches** `glob` for `commitlint.config.* \| .commitlintrc* \| .husky/commit-msg \| .githooks/*` in `repository (tracked files)`: no hits | Add a local commit-msg rule (commitlint in a hook) beside the existing CI title check.<br>Playbook `add-hooks-and-commit-rules` · Effort S | **Confirmed** (batch) |
| `TOOL-07` Local guard against commits to a protected branch | **UNKNOWN** | no hook chain to hold a branch guard; TOOL-05 owns that finding | We did not find any evidence. | — | — |
| `NAV-03` Structural red flags<br>finding `F-036` | **PASS**<br>engine: PARTIAL | An agent cannot work in a codebase without obvious structural traps because 1 oversized file(s), 0 catch-all director(y/ies), 0 checked-in binary file(s) and 0 minified asset(s).<br>**Overridden.** The engine's verdict was PARTIAL. Reason: The only oversized file is package-lock.json (526650 bytes), a generated lockfile an agent never edits by hand; the owner rejected F-036. | **tool** `package-lock.json`<br>**agent** command `stat -c %s package-lock.json` (exit 0; output in Evidence in full) | Split oversized files, break up catch-all directories, and keep binaries and minified assets out of the tree (generate them in the build). | **Rejected** (batch)<br>Note: Owner: the only oversized file is package-lock.json, a generated lockfile. |
| `NAV-04` Architecture orientation artifact<br>finding `F-037` | **FAIL**<br>not scored | An agent cannot orient itself from a map instead of exploring blindly because no docs/architecture/, ADR directory or diagram exists. | We did not find any evidence. | Add a short architecture page (with a diagram) so an agent can orient before it explores. | **Confirmed** (batch) |
| `NAV-05` Public-symbol documentation coverage<br>finding `F-040` | **PARTIAL**<br>not scored | An agent cannot read intent from the source of every exported symbol because 89 of 266 exported TypeScript declarations (33%) have no doc comment. | **agent** `src/index.ts` (engine ratio payload: numerator 177, denominator 266, method 'typescript: exported declarations'; undocumented symbols are listed in the engine report) | Add short doc comments to the undocumented exported symbols, starting with the public surface in src/index.ts. | **Confirmed** (batch) |
| `HYG-03` Pull-request template present<br>finding `F-028` | **FAIL**<br>not scored | An agent cannot file a change with the information reviewers need because no .github/pull_request_template file exists. | We did not find any evidence. | Add .github/pull_request_template.md describing what a good change records. | **Confirmed** (batch) |
| `HYG-04` Issue templates present<br>finding `F-029` | **FAIL**<br>not scored | An agent cannot report a bug or request in a structured way because no .github/ISSUE_TEMPLATE entry exists. | We did not find any evidence. | Add at least one file under .github/ISSUE_TEMPLATE/ (a bug report and a feature request are a good start). | **Confirmed** (batch) |
| `HYG-05` CONTRIBUTING present<br>finding `F-030` | **FAIL**<br>not scored | An agent cannot contribute without reverse-engineering the process because no CONTRIBUTING document exists. | We did not find any evidence. | Add CONTRIBUTING.md covering setup, the gate, and the review flow. | **Confirmed** (batch) |
| `HYG-06` SECURITY present<br>finding `F-031` | **FAIL**<br>not scored | An agent cannot report a vulnerability responsibly because no SECURITY document exists at the root, under .github/, .gitlab/ or docs/. | We did not find any evidence. | Add SECURITY.md with a private disclosure channel and a response expectation. | **Confirmed** (batch) |
| `HYG-09` Dependency update automation configured<br>finding `F-032` | **PARTIAL**<br>not scored | An agent cannot rely on the update policy reaching security updates because the \`github-actions\` entry sets \`target-branch\` together with \`groups\`, and Dependabot drops those options for security updates, which always go to the default branch. | **tool** `.github/dependabot.yml:11` (target-branch) | Remove \`target-branch\` when it names the default branch; otherwise make that branch the default, so the entry's options apply to security updates too. | **Confirmed** (batch) |
| `HYG-09` Dependency update automation configured<br>finding `F-033` | **PARTIAL**<br>not scored | An agent cannot rely on the update policy reaching security updates because the \`npm\` entry sets \`target-branch\` together with \`groups\`, and Dependabot drops those options for security updates, which always go to the default branch. | **tool** `.github/dependabot.yml:21` (target-branch) | Same as `F-032` | **Confirmed** (batch) |
| `HYG-09` Dependency update automation configured<br>finding `F-034` | **PARTIAL**<br>not scored | An agent cannot rely on the update policy reaching security updates because the \`npm\` entry sets \`target-branch\` together with \`groups\`, and Dependabot drops those options for security updates, which always go to the default branch. | **tool** `.github/dependabot.yml:34` (target-branch) | Same as `F-032` | **Confirmed** (batch) |
| `HYG-11` Branch protection declared as code<br>finding `F-035` | **FAIL**<br>not scored | An agent cannot reproduce the protected-branch rules as code because the github provider is detected but no branch-protection configuration exists. | **agent** command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rulesets` (exit 0; output in Evidence in full)<br>command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/main` (exit 0; output in Evidence in full)<br>command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/dev` (exit 0; output in Evidence in full)<br>**searches** `glob` for `.github/rulesets/*.json \| .github/settings.yml \| **/*.tf \| *branch-protection*` in `repository (tracked files)`: no hits | Declare branch protection in code (a JSON file per ruleset under .github/rulesets/ on GitHub, or a Terraform protection resource) so it is reviewed like any other change. | **Confirmed** (batch) |

## Overrides of the engine's verdicts

Where this report's verdict differs from the engine's, the row of the check above shows both, and the agent's counter-evidence is in its Evidence column or under Evidence in full.

| Check | Engine's verdict | This report's verdict | Reason |
|---|---|---|---|
| `IDX-02` | UNKNOWN | PASS | The engine could not open a store (user config not read, no .zst); a direct index_status query proves the index exists and answers for this root. |
| `IDX-03` | UNKNOWN | PASS | The engine store exposes no revision, so it reported UNKNOWN; the index tool's own detect_changes against HEAD reports zero changed files. |
| `TOOL-06` | FAIL | PARTIAL | The engine only recognises amannn/action-semantic-pull-request; .github/workflows/pr-title.yml enforces the same convention with an inline shell regex that exits 1 on a bad title. Per the rubric, CI-only is PARTIAL. |
| `CI-03` | FAIL | PASS | The engine read words inside echo strings (a Markdown job-summary table row and release-notes text) as npm invocations; the owner rejected F-015 to F-018 as false positives. |
| `TST-04` | FAIL | PASS | The engine reads only fenced code blocks; the subset invocation is an inline code span in AGENTS.md step 4, which meets the rubric. The owner rejected F-023. |
| `NAV-03` | PARTIAL | PASS | The only oversized file is package-lock.json (526650 bytes), a generated lockfile an agent never edits by hand; the owner rejected F-036. |
| `SEC-02` | FAIL | PASS | Each flagged line assigns a short hyphenated placeholder (test-api-key, keycloak-jwt-token, user-session-token, user-data-token, renewed-token twice, secret-token, received-token) in a unit test; the owner rejected F-005 to F-008 as false positives. |

## Evidence in full

Quotes and command output that the tables above point to, each under the check that cites it.

### SEC-02: No key-shaped strings in tracked files

- Command `git grep -nE 'sk-[A-Za-z0-9_-]{16,}|gh[pousr]_[A-Za-z0-9]{16,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|Bearer [A-Za-z0-9._-]{16,}' -- . ':!package-lock.json' | wc -l` (exit 0) · captured by agent
  ```text
  0
  ```

### CI-04: CI enforces the same gate as the local check

- Command `grep -nE 'continue-on-error|\|\| true|set \+e' .github/workflows/*.yml` (exit 1) · captured by agent
  ```text
  no matches (the only 'exit 0' lines are early returns for merge_group events in pr-title.yml and enforce-dev-base.yml)
  ```
- Command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/main` (exit 0) · captured by agent
  ```text
  required_status_checks: CI Gate, Check source branch; pull_request, deletion, non_fast_forward (ruleset 24590114, active)
  ```
- Command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/dev` (exit 0) · captured by agent
  ```text
  required_status_checks: CI Gate, Conventional Commit Title; pull_request, deletion, non_fast_forward, merge_queue SQUASH (ruleset 24590117, active)
  ```

### NAV-03: Structural red flags

- Command `stat -c %s package-lock.json` (exit 0) · captured by agent
  ```text
  526650
  ```

### HYG-11: Branch protection declared as code

- Command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rulesets` (exit 0) · captured by agent
  ```text
  two active branch rulesets: 'Protect dev branch' (24590117) and 'Protect main branch' (24590114)
  ```
- Command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/main` (exit 0) · captured by agent
  ```text
  required_status_checks CI Gate + Check source branch; pull_request; deletion; non_fast_forward
  ```
- Command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/dev` (exit 0) · captured by agent
  ```text
  required_status_checks CI Gate + Conventional Commit Title; pull_request; deletion; non_fast_forward; merge_queue SQUASH
  ```

## Coverage

**Examined:** nothing is recorded

No scope was skipped.

**Files:** 296 files inspected, 1 skipped; the scan was not cut short.

## Stack and components

| Stack | Detected |
|---|---|
| Ecosystems | `node` |
| Package managers | `npm` |
| CI providers | `github` |
| Test frameworks | `jest` |
| Hook managers | — |

| Component | Path | Declared | Declared by | Manifest | AGENTS.md |
|---|---|---|---|---|---|
| (root) | `.` | yes | implicit | `package.json` | present |

## Run context

| Field | Value |
|---|---|
| Evaluation mode | no |
| Confirmation policy | `interactive` |
| Provider exposure acknowledged | yes: the model provider receives what the agent reads from the target |
| Code index | `mcp` `codebase-memory-mcp` — Project digital-assistant-sdk-agentic-readiness, in-memory, indexed 2026-11-11 before the run. |
| Excluded | none |
| Known components | none |
| Stack profile | `typescript-node`, shipped, confirmed by the user |

## Appendix — all checks

All 76 checks, grouped by family. The command surface, the credential-shaped-lines total and the missing secret-shape ignore rules above are rendered from the engine's structured payloads; other payloads (env-key inventories, harness-reach matrices, and so on) are in the JSON report only, for now.

### IDX

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `IDX-01` | codebase-memory-mcp registered for this repository | BLOCKER | automated | yes | FAIL | FAIL | no project-level MCP configuration found (user-level configuration not read: --no-user-config) |
| `IDX-02` | An index exists for this checkout | BLOCKER | automated | yes | PASS | UNKNOWN | The codebase-memory-mcp index answers for this checkout: project root equals the target and status is ready. |
| `IDX-03` | Index freshness | DEGRADER | automated | yes | PASS | UNKNOWN | A direct freshness query reports no drift between the index and HEAD. |

### AGT

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `AGT-01` | Instruction file present, canonical, and non-trivial | BLOCKER | automated | yes | PASS | PASS | — |
| `AGT-02` | Component coverage by instruction files | DEGRADER | automated | yes | PASS | PASS | single-root repository: no component-level instruction files required |
| `AGT-03` | Documentation contract named | DEGRADER | automated | yes | PARTIAL | PARTIAL | does not name docs/STYLE_GUIDE.md |
| `AGT-04` | Definition of done stated | DEGRADER | automated | yes | FAIL | FAIL | no definition-of-done sentence ties a documentation trigger to the same change set |
| `AGT-05` | Seven verbs named | DEGRADER | automated | yes | PASS | PASS | all 7 verbs named in AGENTS.md and resolved on a runner |
| `AGT-06` | Architectural boundaries declared | DEGRADER | automated | yes | PASS | PASS | 7 boundary rules reference real paths |
| `AGT-07` | Do-not-do / deny rules present | DEGRADER | automated | yes | PASS | PASS | prohibitions cover tests, generated files, the default branch and secrets |
| `AGT-08` | No competing instruction files, and the reach matrix is stated | DEGRADER | automated | yes | PARTIAL | PARTIAL | 20/28 harnesses reached |
| `AGT-09` | Branch and release boundary declared | DEGRADER | automated | yes | PASS | PASS | the branch model and the release boundary are stated |
| `AGT-10` | Instruction indirection resolved | DEGRADER | automated | yes | PASS | PASS | — |
| `AGT-12` | Communication rules stated | COSMETIC | automated | yes | FAIL | FAIL | AGENTS.md has no section on writing for people and names no communication rules file |
| `AGT-11` | Instructions are specific and not inferable | DEGRADER | agent | yes | PARTIAL | — | About 93% of 129 rule lines are specific, but 3 specific lines do not resolve against the repository. |

### DOC

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `DOC-01` | docs/ exists | DEGRADER | automated | yes | PASS | PASS | 3 markdown file(s) under docs/ |
| `DOC-02` | docs/STYLE_GUIDE.md exists | DEGRADER | automated | yes | FAIL | FAIL | docs/STYLE_GUIDE.md is not present |
| `DOC-03` | artefacts/ exists and is ignored | DEGRADER | automated | yes | PASS | PASS | no scratch directory in use |
| `DOC-04` | ADR directory and index | COSMETIC | automated | yes | FAIL | FAIL | no ADR directory |
| `DOC-05` | Docs are readable | COSMETIC | automated | yes | PARTIAL | PARTIAL | 14/104 sentences over the limit (13.5%), 0 vague word(s) (0.00 per 1,000 words), 0 explanation or tutorial page(s) without a diagram, in 3 page(s) |

### CMD

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `CMD-01` | Seven verbs resolvable on one runner | BLOCKER | automated | yes | PASS | PASS | format -> package.json; format:check -> package.json; lint -> package.json; typecheck -> package.json; test -> package.json; check -> package.json; security -> package.json |
| `CMD-02` | check composes the read-only verbs | BLOCKER | automated | yes | PASS | PASS | check (package.json) composes: format-check, typecheck, test |
| `CMD-03` | No divergent second definition | DEGRADER | automated | yes | PASS | PASS | one runner defines the gate |
| `CMD-04` | Write verbs separated from read-only verbs | DEGRADER | automated | yes | PASS | PASS | no read-only verb invokes a write verb |

### TOOL

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `TOOL-01` | Formatter configured | DEGRADER | automated | yes | PASS | PASS | formatter .prettierrc.js, package.json prettier + package.json format verb |
| `TOOL-02` | Linter configured | DEGRADER | automated | yes | PASS | PASS | linter .eslintrc.js + package.json lint verb |
| `TOOL-03` | Type checker configured | DEGRADER | automated | yes | PASS | PASS | strict config: tsconfig.json:strict |
| `TOOL-04` | Dependency / security scan verb | DEGRADER | automated | yes | PASS | PASS | security -> npm audit --omit=dev --audit-level=high && npm audit --audit-level=critical; CI: .github/workflows/ci.yml:285 security (npm audit --omit=dev --audit-level=high && npm audit --audit-level=critical); .github/workflows/security.yml:31 security (npm audit --omit=dev --audit-level=high && npm audit --audit-level=critical) |
| `TOOL-05` | Local hook chain active | DEGRADER | automated | yes | FAIL | FAIL | no hook chain configured |
| `TOOL-06` | Commit convention enforced | COSMETIC | automated | yes | PARTIAL | FAIL | A CI pull-request title check enforces Conventional Commits, but no local commit-message rule exists. |
| `TOOL-07` | Local guard against commits to a protected branch | COSMETIC | automated | yes | UNKNOWN | UNKNOWN | no hook chain to hold a branch guard; TOOL-05 owns that finding |

### CI

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `CI-01` | Pipeline present, triggered on PRs | BLOCKER | automated | yes | PASS | PASS | PR-triggered: .github/workflows/ci.yml (github); .github/workflows/enforce-dev-base.yml (github); .github/workflows/pr-title.yml (github) |
| `CI-02` | Local↔CI parity | BLOCKER | automated | yes | PASS | PASS | CI verbs: check, format:check, lint, security, test, typecheck; local read-only verbs not exercised: none |
| `CI-03` | CI-only steps flagged | DEGRADER | automated | yes | PASS | FAIL | Every CI step that runs a command maps to the local command surface; the four engine hits are echo lines, not commands. |
| `CI-05` | Workflow files are linted | DEGRADER | automated | yes | FAIL | FAIL | github: local none, CI none |
| `CI-04` | CI enforces the same gate as the local check | DEGRADER | agent | yes | PASS | — | Every verb job gates on its exit code, CI Gate aggregates them, and live rules on main and dev require CI Gate. |

### BASE

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `BASE-01` | Baseline artifact exists | DEGRADER | automated | yes | PARTIAL | PARTIAL | quality tooling is configured but no baseline artifact is committed: .eslintrc.js, .gitleaks.toml, package.json:lint, package.json:security, package.json:typecheck |
| `BASE-02` | Current violation counts measured | DEGRADER | automated | yes | PARTIAL | PARTIAL | counting surface present but no committed count/budget: .eslintrc.js, .gitleaks.toml, package.json:lint, package.json:security, package.json:typecheck; method: static configuration scan; the target's own tools are never run |
| `BASE-03` | No-new-violations mechanism | DEGRADER | automated | yes | PARTIAL | PARTIAL | no ratchet and no baseline yet, so there is nothing to compare against |
| `BASE-04` | Coverage floor configured | DEGRADER | automated | yes | FAIL | FAIL | no coverage threshold configured |

### CON

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `CON-01` | Allow/deny artifact present | BLOCKER | automated | yes | PASS | PASS | the prohibitions section of AGENTS.md names paths that exist: environments/local.env.example, src/, check-build-env.mjs, package.json |
| `CON-02` | Test directories protected | BLOCKER | automated | yes | PARTIAL | PARTIAL | the prohibitions section covers src/\_\_tests\_\_/, src/config/\_\_tests\_\_/, src/services/\_\_tests\_\_/, src/store/middleware/\_\_tests\_\_/, src/store/slices/\_\_tests\_\_/, src/util/\_\_tests\_\_/, src/util/browser/\_\_tests\_\_/, src/util/error/\_\_tests\_\_/ (+10 more) but not test/ |
| `CON-03` | artefacts/ excluded from index and agent reads | DEGRADER | automated | yes | PASS | PASS | no scratch or agent-state directory in use |
| `CON-04` | Draft allow/deny emitted | COSMETIC | automated | no | PASS | PASS | draft deny list written: /home/kc/Downloads/Junk/delete/temp/agentic-readiness-audit/do-not-do.draft.md |

### EXEC

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `EXEC-01` | Toolchain pinned / wrapper committed | BLOCKER | automated | yes | PASS | PASS | pinned: node (package.json (engines.node)) |
| `EXEC-02` | Lockfile committed and consistent | BLOCKER | automated | yes | PASS | PASS | tracked: package-lock.json |
| `EXEC-03` | Non-interactive setup path | BLOCKER | automated | yes | PASS | PASS | documented setup command: README.md: npm ci |
| `EXEC-04` | Env-var inventory complete | BLOCKER | automated | yes | FAIL | FAIL | 2 referenced key(s) are absent from any committed example file: UDA_LOG_LEVEL, UDA_LOG_LEVELNumber |
| `EXEC-05` | No generated artifacts committed in-tree | DEGRADER | automated | yes | PASS | PASS | no tracked generated or vendored paths |
| `EXEC-06` | Documented commands resolve | DEGRADER | automated | yes | PASS | PASS | 5 documented command(s) resolve |
| `EXEC-07` | No competing configs for one concern | DEGRADER | automated | yes | PASS | PASS | format: .prettierrc.js; lint: .eslintrc.js; security: .gitleaks.toml; test: jest.config.ts; types (TypeScript): tsconfig.json |
| `EXEC-08` | Tool versions visible to dependency automation | DEGRADER | automated | yes | PASS | PASS | no literal tool version in 8 command file(s) |

### TST

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `TST-01` | Test verb exists, suite non-empty | BLOCKER | automated | yes | PASS | PASS | test verb on package.json (jest); 109 test file(s) |
| `TST-02` | Suite status known | DEGRADER | automated | yes | PASS | PASS | test verb exited 0 in 9.44s |
| `TST-03` | Skip / xfail census | DEGRADER | automated | yes | PASS | PASS | skip/xfail census across 109 test file(s): no markers; total 0 |
| `TST-04` | Fast path documented | DEGRADER | automated | yes | PASS | FAIL | AGENTS.md shows a subset test invocation: npm test -- path/to/\_\_tests\_\_. |
| `TST-05` | Coverage configuration present | COSMETIC | automated | yes | PASS | PASS | coverage configured: package.json script |

### NAV

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `NAV-01` | Declared component boundaries | DEGRADER | automated | yes | PASS | PASS | single-root repository declares package.json |
| `NAV-02` | Obvious entry points | DEGRADER | automated | yes | PASS | PASS | entry point(s): package.json:main=./dist/index.cjs.js, package.json:exports, src/index.ts |
| `NAV-03` | Structural red flags | COSMETIC | automated | yes | PASS | PARTIAL | No structural traps: 0 catch-all directories, 0 binaries, 0 minified assets; the one oversized file is the generated npm lockfile. |
| `NAV-04` | Architecture orientation artifact | COSMETIC | automated | no | FAIL | FAIL | no architecture orientation artifact |
| `NAV-05` | Public-symbol documentation coverage | COSMETIC | automated | no | PARTIAL | PARTIAL | 177/266 public symbols documented (67%); method: typescript: exported declarations |

### SEC

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `SEC-01` | .env untracked and ignored | BLOCKER | automated | yes | PARTIAL | PARTIAL | no tracked .env, but ignore rules are incomplete: missing: dotenv variant |
| `SEC-02` | No key-shaped strings in tracked files | BLOCKER | automated | yes | PASS | FAIL | No real key-shaped strings in tracked files; the 8 engine hits are placeholder literals in unit tests. |
| `SEC-03` | Ignore patterns cover secret shapes | DEGRADER | automated | yes | PARTIAL | PARTIAL | covered: dotenv; missing: dotenv variant, ssh private key, PEM, key, PKCS#12, PFX, keystore, certificate (.crt), certificate (.cer), AWS credentials |

### HYG

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `HYG-01` | README present and non-placeholder | COSMETIC | automated | no | PASS | PASS | README.md present and non-placeholder |
| `HYG-02` | CODEOWNERS present | COSMETIC | automated | no | PASS | PASS | CODEOWNERS present at .github/CODEOWNERS |
| `HYG-03` | Pull-request template present | COSMETIC | automated | no | FAIL | FAIL | no pull-request template |
| `HYG-04` | Issue templates present | COSMETIC | automated | no | FAIL | FAIL | no issue templates |
| `HYG-05` | CONTRIBUTING present | COSMETIC | automated | no | FAIL | FAIL | no CONTRIBUTING document |
| `HYG-06` | SECURITY present | COSMETIC | automated | no | FAIL | FAIL | no SECURITY document |
| `HYG-07` | CHANGELOG present and recent | COSMETIC | automated | no | PASS | PASS | CHANGELOG.md last changed 3 day(s) before HEAD |
| `HYG-08` | Release process documented | COSMETIC | automated | no | PASS | PASS | release document present at RELEASE_PROCESS.md |
| `HYG-09` | Dependency update automation configured | COSMETIC | automated | no | PARTIAL | PARTIAL | dependency automation at .github/dependabot.yml has 3 defect(s) |
| `HYG-10` | License present | COSMETIC | automated | no | PASS | PASS | license present at LICENSE |
| `HYG-11` | Branch protection declared as code | COSMETIC | automated | no | FAIL | FAIL | No branch-protection file in the repository; live read (consented) shows active rulesets on main and dev, so the rules exist but are not declared as code (drift). |

## Terms

| Term | Kind | Meaning |
|---|---|---|
| PASS | verdict | The requirement is met. |
| PARTIAL | verdict | Part of the requirement is met. |
| FAIL | verdict | The requirement is not met. |
| UNKNOWN | verdict | The evidence could not be gathered. It is never read as a pass. |
| NOT_APPLICABLE | verdict | The check does not apply to this repository. |
| BLOCKER | severity | Agent work is impossible, unsafe or unverifiable. Fix before onboarding agents. |
| DEGRADER | severity | Agent work is possible but unreliable or wasteful. |
| COSMETIC | severity | Hygiene. Fix when convenient. |
| pending | decision on a finding | No decision yet. |
| confirmed | decision on a finding | The finding stands as written. |
| edited | decision on a finding | The finding stands, with its wording or evidence corrected. |
| rejected | decision on a finding | The finding is wrong (a false positive). It leaves the backlog. |
| deferred | decision on a finding | The finding is real, and the person chose to leave it open for now. |

---

Rendered from the JSON report by `render_report.py`. The JSON report is the record.
