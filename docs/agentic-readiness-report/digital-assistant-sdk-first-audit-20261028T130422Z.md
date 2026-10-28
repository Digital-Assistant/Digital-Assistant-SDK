# Agentic readiness audit: digital-assistant-sdk

> [!NOTE]
> This audit reports; it does not gate. A check that could not be settled is UNKNOWN: it earns no credit and is never shown as a pass.

## Provenance

| Field | Value |
|---|---|
| Target | `/home/kc/Projects/UDAN/Digital-Assistant-SDK` |
| Commit | `ee2fb9e06753` on `dev` — clean working tree |
| Status | final |
| Started | `2026-10-28T12:49:14+00:00` |
| Finalised | `2026-10-28T13:04:22+00:00` |
| Recipe | `brownfield-audit` 0.1.0, catalogue `0.2.2` |
| Engine | `python-agentic-audit` 0.1.0, ruleset `2026-10-19.2`, ruleset hash `970e6792f98eeeb5`, scanned `2026-10-28T12:49:19+00:00` |
| Framework revision | `b4bf27df7915` |
| Agent (self-reported) | `Claude Code` with `claude-sonnet-5-5` |
| Probes | none: no command of the target was run |
| Report schema | `0.1` |

## Readiness summary

- **Phase-1 score: 0.77**, over 57 scored checks
- **3 blockers remaining: 1 FAIL, 2 PARTIAL**
- **Unattested:** 5 requirements that no check settles, listed below

1 of the 57 scored checks is UNKNOWN. An UNKNOWN check earns no credit, so the score understates what is true of the repository and does not certify it. No agent finding is waiting for a person's decision.

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
| PASS | 43 | 1 | The requirement is met. |
| PARTIAL | 10 | 0.5 | Part of the requirement is met. |
| FAIL | 17 | 0 | The requirement is not met. |
| UNKNOWN | 1 | 0 | The evidence could not be gathered. It is never read as a pass. |
| NOT_APPLICABLE | 0 | outside the score | The check does not apply to this repository. |
| **Total** | **71** |  |  |

| Severity | Weight | Meaning | Scored checks | Not met |
|---|---:|---|---:|---:|
| BLOCKER | 3 | Agent work is impossible, unsafe or unverifiable. Fix before onboarding agents. | 16 | 3 |
| DEGRADER | 2 | Agent work is possible but unreliable or wasteful. | 37 | 14 |
| COSMETIC | 1 | Hygiene. Fix when convenient. | 4 | 2 |

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

6 credential-shaped lines across 4 files in tracked text files. The file-by-file detail is in the attention tables above; the report never records the value itself.

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

3 of the 16 scored BLOCKER checks are not met.

| Check | Verdict | What we found | Evidence | Fix | Decision |
|---|---|---|---|---|---|
| `CON-02` Test directories protected<br>finding `F-001` | **PARTIAL** | An agent cannot rely on the deny list to keep test directories out of an agent's reach because the prohibitions section of AGENTS.md does not name test/. | **tool** `AGENTS.md:97` (8. Security) | Name test/ in a code span in the prohibitions section of AGENTS.md. | **Deferred** (interactive)<br>Note: Owner: real gap, deferred on purpose (first-audit Stage 4) |
| `EXEC-04` Env-var inventory complete<br>finding `F-002` | **FAIL** | An agent cannot know every variable the code needs before running it because 2 referenced key(s) are absent from any committed example file: UDA_LOG_LEVEL, UDA_LOG_LEVELNumber. | We did not find any evidence. | Add the missing keys to .env.example (values redacted) so the environment can be provisioned without reading the source. | **Deferred** (interactive)<br>Note: Owner: low impact optional logging vars, deferred |
| `SEC-01` .env untracked and ignored<br>finding `F-003` | **PARTIAL** | An agent cannot trust that a future .env stays out of history because no ignore rule covers dotenv variant. | **tool** `.gitignore` (node_modules)<br>`.gitignore` (dist)<br>`.gitignore` (build)<br>`.gitignore` (.env)<br>`.gitignore` (environments/\*)<br>`.gitignore` (coverage)<br>`.gitignore` (.jest-cache)<br>`.gitignore` (.DS_Store) | Add the .env shape (for example \`.env\` and \`.env.\*\`) to .gitignore so an environment file cannot be committed by accident. | **Confirmed** (interactive)<br>Note: Owner confirmed |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-004` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/services/\_\_tests\_\_/TranslateService.test.ts contains 1 credential-shaped line(s).<br>**Overridden.** The engine's verdict was FAIL. Reason: Engine matched hyphenated placeholder labels in test code (the check file lists this false-positive case); owner rejected F-004..F-007. | **tool** `src/services/__tests__/TranslateService.test.ts:20` (credential-shaped string)<br>**agent** `src/services/__tests__/apiClient.test.ts:173`<br>`src/util/user/__tests__/AuthDataConfig.test.ts:135`<br>`src/util/user/__tests__/UDABindAccount.test.ts:96` | Remove the value from the file and its history, load it from the environment, and rotate the credential. The report never records the value itself. | **Rejected** (interactive)<br>Note: Owner: mock labels in jest tests, false positive |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-005` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/services/\_\_tests\_\_/apiClient.test.ts contains 3 credential-shaped line(s). | **tool** `src/services/__tests__/apiClient.test.ts:173` (credential-shaped string)<br>`src/services/__tests__/apiClient.test.ts:201` (credential-shaped string)<br>`src/services/__tests__/apiClient.test.ts:221` (credential-shaped string) | Same as `F-004` | **Rejected** (interactive)<br>Note: Owner: mock test labels, false positive |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-006` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/util/user/\_\_tests\_\_/AuthDataConfig.test.ts contains 1 credential-shaped line(s). | **tool** `src/util/user/__tests__/AuthDataConfig.test.ts:135` (credential-shaped string) | Same as `F-004` | **Rejected** (interactive)<br>Note: Owner: mock test labels, false positive |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-007` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/util/user/\_\_tests\_\_/UDABindAccount.test.ts contains 1 credential-shaped line(s). | **tool** `src/util/user/__tests__/UDABindAccount.test.ts:96` (credential-shaped string) | Same as `F-004` | **Rejected** (interactive)<br>Note: Owner: mock test labels, false positive |

### Degrader checks

14 of the 37 scored DEGRADER checks are not met.

| Check | Verdict | What we found | Evidence | Fix | Decision |
|---|---|---|---|---|---|
| `IDX-03` Index freshness | **PASS**<br>engine: UNKNOWN | Index built after HEAD commit; detect_changes against dev reports no drift.<br>**Overridden.** The engine's verdict was UNKNOWN. Reason: Engine UNKNOWN only because Tier C was off; the recipe says to ask the index tool directly. | **agent** `index_status + detect_changes(base_branch=dev)` through `codebase-memory-mcp` | — | — |
| `AGT-03` Documentation contract named<br>finding `F-008` | **PARTIAL** | An agent cannot know where permanent and scratch documentation live because AGENTS.md does not name docs/STYLE_GUIDE.md. | **tool** `AGENTS.md:136` (docs/)<br>`AGENTS.md:61` (artefacts/) | Name docs/ as the canonical home for permanent knowledge, docs/STYLE_GUIDE.md as the authoring rules, and artefacts/ as off-limits scratch. | **Confirmed** (batch) |
| `AGT-04` Definition of done stated<br>finding `F-009` | **FAIL** | An agent cannot keep code and its documentation in step because no definition-of-done sentence ties a documentation trigger to the same change set. | We did not find any evidence. | State that a change altering a public interface, observable behaviour, architecture, a check's semantics or an ADR updates the affected docs and the ADR index in the same change set. | **Confirmed** (batch) |
| `AGT-08` No competing instruction files, and the reach matrix is stated<br>finding `F-023`, severity COSMETIC | **PARTIAL** | An agent cannot assume every harness on the team sees the project rules because 19 of 27 known harnesses reach an instruction file; Aider, Amazon Q Developer, Anthropic Claude Code, Continue, Google Gemini CLI, Qwen Code, Replit Agent, Void reach nothing. | — | Either state the supported harnesses in AGENTS.md, or add the vendor pointer files for the harnesses in use. | **Confirmed** (batch) |
| `DOC-01` docs/ exists<br>finding `F-018` | **FAIL** | An agent cannot find the project's documentation because no docs/ directory exists in the repository. | We did not find any evidence. | Create docs/ as the canonical home for permanent knowledge, with docs/STYLE_GUIDE.md holding the authoring rules. | **Confirmed** (batch) |
| `DOC-02` docs/STYLE_GUIDE.md exists<br>finding `F-019` | **FAIL** | An agent cannot find the canonical authoring rules for documentation because docs/STYLE_GUIDE.md does not exist. | We did not find any evidence. | Create docs/STYLE_GUIDE.md and name it from the instruction file so writers have one set of authoring rules. | **Confirmed** (batch) |
| `TOOL-05` Local hook chain active<br>finding `F-021` | **FAIL** | An agent cannot rely on local hooks to run before a commit because no hook manager is configured. | **tool** `package.json` | Adopt a hook manager (pre-commit, lefthook, husky) and wire it so checks run before a commit rather than only in CI. | **Confirmed** (batch) |
| `CI-03` CI-only steps flagged<br>finding `F-014` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/ci.yml:243 runs \`npm integrity\` with no local runner entry for \`integrity\`.<br>**Overridden.** The engine's verdict was FAIL. Reason: Engine parsed Markdown inside echo strings as npm commands; owner rejected F-014..F-017. | **tool** `.github/workflows/ci.yml:243` (npm integrity)<br>**agent** `.github/workflows/ci.yml:243`<br>`.github/workflows/release-and-sync.yml:201`<br>`.github/workflows/release-and-sync.yml:315-319` | Add a local script/target for \`integrity\`, or document why the step is CI-only. | **Rejected** (batch)<br>Note: Owner: engine false positive |
| `CI-03` CI-only steps flagged<br>finding `F-015` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/release-and-sync.yml:201 runs \`npm integrity\` with no local runner entry for \`integrity\`. | **tool** `.github/workflows/release-and-sync.yml:201` (npm integrity) | Same as `F-014` | **Rejected** (batch)<br>Note: Owner: engine false positive |
| `CI-03` CI-only steps flagged<br>finding `F-016` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/release-and-sync.yml:315 runs \`echo "### Staged on npm with tag \\\`next\\\`"\` with no local runner entry for \`with\`. | **tool** `.github/workflows/release-and-sync.yml:315` (echo "### Staged on npm with tag \\\`next\\\`") | Add a local script/target for \`with\`, or document why the step is CI-only. | **Rejected** (batch)<br>Note: Owner: engine false positive |
| `CI-03` CI-only steps flagged<br>finding `F-017` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/release-and-sync.yml:319 runs \`echo "3. After the TEST pass: \\\`npm dist-tag add @udan/digital-assistant-sdk@$VERSION latest\\\`."\` with no local runner entry for \`dist-tag\`. | **tool** `.github/workflows/release-and-sync.yml:319` (echo "3. After the TEST pass: \\\`npm dist-tag add @udan/digital-assistant-sdk@$VERSION latest\\\`.") | Add a local script/target for \`dist-tag\`, or document why the step is CI-only. | **Rejected** (batch)<br>Note: Owner: engine false positive |
| `BASE-01` Baseline artifact exists<br>finding `F-010` | **PARTIAL** | An agent cannot diff today's findings against an accepted baseline because quality tooling is configured but no baseline or suppression artifact is committed. | **tool** `.eslintrc.js`<br>`package.json` (lint)<br>`package.json` (security)<br>`package.json` (typecheck) | Commit a baseline or suppression artifact (for example \`baseline.json\`, an eslint/ruff baseline, or \`.gitleaksignore\`), or document the equivalent mechanism in \`AGENTS.md\`. | **Confirmed** (batch) |
| `BASE-02` Current violation counts measured<br>finding `F-011` | **PARTIAL** | An agent cannot state how many violations exist today because a counting surface exists but no numeric violation budget or count is committed. | **tool** `.eslintrc.js`<br>`package.json` (lint)<br>`package.json` (security)<br>`package.json` (typecheck) | Commit the count or configure a budget (\`--max-warnings N\`, \`max-issues\`, or a \`violation budget\`) so a regression has a baseline number to compare against. | **Confirmed** (batch) |
| `BASE-03` No-new-violations mechanism<br>finding `F-012` | **PARTIAL** | An agent cannot stop the violation count from growing because no baseline, budget or comparison step exists, so the count is not guarded. | — | Once a baseline exists, wire a comparison step (the audit's own \`--baseline REPORT.JSON\` is the reference pattern) so new findings fail the build. | **Confirmed** (batch) |
| `BASE-04` Coverage floor configured<br>finding `F-013` | **FAIL** | An agent cannot know when coverage drops below an agreed floor because no coverage threshold is configured in the test runner. | We did not find any evidence. | Configure a coverage floor for the test runner so a drop fails the gate. | **Confirmed** (batch) |
| `TST-02` Suite status known | **UNKNOWN** | probe not run: probes disabled (pass --run-gates) | We did not find any evidence. | — | — |
| `TST-04` Fast path documented<br>finding `F-022` | **FAIL** | An agent cannot run one test or a subset without the whole suite because none of the entry documents shows a single-test or subset invocation (scope: README.md, AGENTS.md). | **tool** `README.md`<br>`AGENTS.md` | Document a fast path (for example \`pytest -k \<name>\`, \`npm test -- \<name>\`, or \`go test -run \<name>\`) in a fenced shell block. | **Confirmed** (batch) |
| `SEC-03` Ignore patterns cover secret shapes<br>finding `F-020` | **PARTIAL** | An agent cannot trust that secret shapes cannot be committed because ignore rules do not cover dotenv variant, ssh private key, PEM, key, PKCS#12, PFX, keystore, certificate (.crt), certificate (.cer), AWS credentials. | **tool** `.gitignore` (node_modules)<br>`.gitignore` (dist)<br>`.gitignore` (build)<br>`.gitignore` (.env)<br>`.gitignore` (environments/\*)<br>`.gitignore` (coverage)<br>`.gitignore` (.jest-cache)<br>`.gitignore` (.DS_Store) | Add the missing shapes to .gitignore — for example \`.env.\*\`, \`\*.pem\`, \`\*.key\`, \`\*.p12\`, \`\*.pfx\`, \`\*.keystore\`, \`id_rsa\*\`, \`\*.crt\`, \`\*.cer\`, \`.aws/\*\`. | **Confirmed** (batch) |
| `AGT-11` Instructions are specific and not inferable<br>finding `F-035` · agent, confidence medium | **PARTIAL** | An agent cannot trust every specific instruction in AGENTS.md because two do not resolve: \`npm test:coverage\` (line 36) is not a valid invocation, and \`\_\_mocks\_\_/sweetAlert2.ts\` (line 126) is \`\_\_mocks\_\_/sweetalert2.ts\` on disk. | **agent** `AGENTS.md:36` (npm test:coverage)<br>`AGENTS.md:126` (\_\_mocks\_\_/sweetAlert2.ts vs sweetalert2.ts) | Change to \`npm run test:coverage\` and correct the mock filename case. | **Confirmed** (batch) |
| `CI-04` CI enforces the same gate as the local check<br>agent, confidence high | **PASS** | No workflow swallows a gating exit code, and CI Gate is a required status check on both dev and main rulesets. | **agent** `.github/workflows/ci.yml:108-121` (verify job: parallel typecheck/format:check/lint with explicit wait and exit rc; tests run plainly; no continue-on-error or \|\| true in any workflow (grep over .github/workflows).)<br>`.github/workflows/ci.yml:279-298` (CI Gate job (if: always()) fails when any needed job result is not success or skipped.)<br>`.github/workflows/cross-os.yml:1-3` (macOS/Windows verify is deliberately non-blocking, weekly, documented as not a required check; it is not the gating workflow.)<br>command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rulesets/{24590117,24590114} (read-only GitHub API)` (exit 0; output in Evidence in full)<br>**searches** `grep` for `continue-on-error\|\|\| true\|set \+e` in `.github/workflows/*.yml`: no hits | — | — |

### Cosmetic checks

2 of the 4 scored COSMETIC checks are not met.

| Check | Verdict | What we found | Evidence | Fix | Decision |
|---|---|---|---|---|---|
| `DOC-04` ADR directory and index<br>finding `F-024` | **FAIL** | An agent cannot find the decisions of record because no ADR directory (docs/architecture/adrs/ or docs/adr/) exists. | We did not find any evidence. | Add docs/architecture/adrs/ with NNNN-short-title.md files and a README index that lists them. | **Confirmed** (batch) |
| `TOOL-06` Commit convention enforced<br>finding `F-034` | **FAIL** | An agent cannot rely on a consistent commit-message convention because no commitlint config, commit-msg hook, or equivalent exists. | **tool** `package.json` | Add a commitlint config or a commit-msg hook so commit messages follow one convention. | **Confirmed** (batch) |
| `NAV-03` Structural red flags<br>finding `F-032` | **PASS**<br>engine: PARTIAL | An agent cannot work in a codebase without obvious structural traps because 1 oversized file(s), 0 catch-all director(y/ies), 0 checked-in binary file(s) and 0 minified asset(s).<br>**Overridden.** The engine's verdict was PARTIAL. Reason: A lockfile is generated and not a structural trap; owner rejected F-032. | **tool** `package-lock.json`<br>**agent** `package-lock.json` | Split oversized files, break up catch-all directories, and keep binaries and minified assets out of the tree (generate them in the build). | **Rejected** (batch)<br>Note: Owner: engine false positive |
| `NAV-04` Architecture orientation artifact<br>finding `F-033` | **FAIL**<br>not scored | An agent cannot orient itself from a map instead of exploring blindly because no docs/architecture/, ADR directory or diagram exists. | We did not find any evidence. | Add a short architecture page (with a diagram) so an agent can orient before it explores. | **Confirmed** (batch) |
| `NAV-05` Public-symbol documentation coverage | **PARTIAL**<br>not scored | 169/255 public symbols documented (66%); method: typescript: exported declarations | — | — | — |
| `HYG-02` CODEOWNERS present<br>finding `F-025` | **FAIL**<br>not scored | An agent cannot know who owns a path before changing it because no CODEOWNERS file exists at the root, under .github/, or under docs/. | We did not find any evidence. | Add .github/CODEOWNERS mapping paths to owners so review routing is machine-readable. | **Confirmed** (batch) |
| `HYG-03` Pull-request template present<br>finding `F-026` | **FAIL**<br>not scored | An agent cannot file a change with the information reviewers need because no .github/pull_request_template file exists. | We did not find any evidence. | Add .github/pull_request_template.md describing what a good change records. | **Confirmed** (batch) |
| `HYG-04` Issue templates present<br>finding `F-027` | **FAIL**<br>not scored | An agent cannot report a bug or request in a structured way because no .github/ISSUE_TEMPLATE entry exists. | We did not find any evidence. | Add at least one file under .github/ISSUE_TEMPLATE/ (a bug report and a feature request are a good start). | **Confirmed** (batch) |
| `HYG-05` CONTRIBUTING present<br>finding `F-028` | **FAIL**<br>not scored | An agent cannot contribute without reverse-engineering the process because no CONTRIBUTING document exists. | We did not find any evidence. | Add CONTRIBUTING.md covering setup, the gate, and the review flow. | **Confirmed** (batch) |
| `HYG-06` SECURITY present<br>finding `F-029` | **FAIL**<br>not scored | An agent cannot report a vulnerability responsibly because no SECURITY document exists at the root, under .github/, or under docs/. | We did not find any evidence. | Add SECURITY.md with a private disclosure channel and a response expectation. | **Confirmed** (batch) |
| `HYG-10` License present<br>finding `F-030` | **FAIL**<br>not scored | An agent cannot know the terms under which the code may be used because no LICENSE (or COPYING) file exists at the repository root. | We did not find any evidence. | Add a LICENSE file; choose one deliberately rather than defaulting to all rights reserved. | **Confirmed** (batch) |
| `HYG-11` Branch protection declared as code<br>finding `F-031` | **FAIL**<br>not scored | An agent cannot reproduce the protected-branch rules as code because the github provider is detected but no branch-protection configuration exists. | We did not find any evidence. | Declare branch protection in code (a Terraform resource or .github/branch-protection) so it is reviewed like any other change. | **Confirmed** (batch) |

## Overrides of the engine's verdicts

Where this report's verdict differs from the engine's, the row of the check above shows both, and the agent's counter-evidence is in its Evidence column or under Evidence in full.

| Check | Engine's verdict | This report's verdict | Reason |
|---|---|---|---|
| `IDX-03` | UNKNOWN | PASS | Engine UNKNOWN only because Tier C was off; the recipe says to ask the index tool directly. |
| `CI-03` | FAIL | PASS | Engine parsed Markdown inside echo strings as npm commands; owner rejected F-014..F-017. |
| `NAV-03` | PARTIAL | PASS | A lockfile is generated and not a structural trap; owner rejected F-032. |
| `SEC-02` | FAIL | PASS | Engine matched hyphenated placeholder labels in test code (the check file lists this false-positive case); owner rejected F-004..F-007. |

## Evidence in full

Quotes and command output that the tables above point to, each under the check that cites it.

### CI-04: CI enforces the same gate as the local check

- Command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rulesets/{24590117,24590114} (read-only GitHub API)` (exit 0) · captured by agent
  ```text
  rulesets 'Protect dev branch' and 'Protect main branch' active; required_status_checks: CI Gate (dev); CI Gate + Check source branch (main)
  ```

## Coverage

**Examined:** nothing is recorded

No scope was skipped.

**Files:** 285 files inspected, 4 skipped; the scan was not cut short.

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
| Code index | `mcp` `codebase-memory-mcp` — project home-kc-Projects-UDAN-Digital-Assistant-SDK |
| Excluded | `node_modules/*`, `dist/*`, `build/*`, `.gradle/*`, `.git/*`, `coverage/*` |
| Known components | none |
| Stack profile | — |

## Appendix — all checks

All 71 checks, grouped by family. The command surface, the credential-shaped-lines total and the missing secret-shape ignore rules above are rendered from the engine's structured payloads; other payloads (env-key inventories, harness-reach matrices, and so on) are in the JSON report only, for now.

### IDX

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `IDX-01` | codebase-memory-mcp registered for this repository | BLOCKER | automated | yes | PASS | PASS | codebase-memory-mcp registered in: /home/kc/.config/opencode/opencode.jsonc (user) |
| `IDX-02` | An index exists for this checkout | BLOCKER | automated | yes | PASS | PASS | index store /home/kc/.cache/codebase-memory-mcp contains a project rooted at /home/kc/Projects/UDAN/Digital-Assistant-SDK |
| `IDX-03` | Index freshness | DEGRADER | automated | yes | PASS | UNKNOWN | Index built after HEAD commit; detect_changes against dev reports no drift. |

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
| `AGT-11` | Instructions are specific and not inferable | DEGRADER | agent | yes | PARTIAL | — | AGENTS.md is overwhelmingly project-specific (commands, real paths, gotchas, gate table), but two specific lines do not resolve against the repository. |

### DOC

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `DOC-01` | docs/ exists | DEGRADER | automated | yes | FAIL | FAIL | no docs/ directory |
| `DOC-02` | docs/STYLE_GUIDE.md exists | DEGRADER | automated | yes | FAIL | FAIL | docs/STYLE_GUIDE.md is not present |
| `DOC-03` | artefacts/ exists and is ignored | DEGRADER | automated | yes | PASS | PASS | artefacts/ present, ignored, and untracked |
| `DOC-04` | ADR directory and index | COSMETIC | automated | yes | FAIL | FAIL | no ADR directory |

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
| `TOOL-04` | Dependency / security scan verb | DEGRADER | automated | yes | PASS | PASS | security -> npm audit --omit=dev --audit-level=high && npm audit --audit-level=critical |
| `TOOL-05` | Local hook chain active | DEGRADER | automated | yes | FAIL | FAIL | no hook chain configured |
| `TOOL-06` | Commit convention enforced | COSMETIC | automated | yes | FAIL | FAIL | no commit-message rule |

### CI

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `CI-01` | Pipeline present, triggered on PRs | BLOCKER | automated | yes | PASS | PASS | PR-triggered: .github/workflows/ci.yml (github); .github/workflows/enforce-dev-base.yml (github) |
| `CI-02` | Local↔CI parity | BLOCKER | automated | yes | PASS | PASS | CI verbs: check, format:check, lint, security, test, typecheck; local read-only verbs not exercised: none |
| `CI-03` | CI-only steps flagged | DEGRADER | automated | yes | PASS | FAIL | The flagged lines are echo text in workflow summaries, not commands that need a local runner. |
| `CI-04` | CI enforces the same gate as the local check | DEGRADER | agent | yes | PASS | — | No workflow swallows a gating exit code, and CI Gate is a required status check on both dev and main rulesets. |

### BASE

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `BASE-01` | Baseline artifact exists | DEGRADER | automated | yes | PARTIAL | PARTIAL | quality tooling is configured but no baseline artifact is committed: .eslintrc.js, package.json:lint, package.json:security, package.json:typecheck |
| `BASE-02` | Current violation counts measured | DEGRADER | automated | yes | PARTIAL | PARTIAL | counting surface present but no committed count/budget: .eslintrc.js, package.json:lint, package.json:security, package.json:typecheck; method: static configuration scan; the target's own tools are never run |
| `BASE-03` | No-new-violations mechanism | DEGRADER | automated | yes | PARTIAL | PARTIAL | no ratchet and no baseline yet, so there is nothing to compare against |
| `BASE-04` | Coverage floor configured | DEGRADER | automated | yes | FAIL | FAIL | no coverage threshold configured |

### CON

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `CON-01` | Allow/deny artifact present | BLOCKER | automated | yes | PASS | PASS | the prohibitions section of AGENTS.md names paths that exist: .env, environments/local.env.example, environments/local.env, src/, check-build-env.mjs, package.json, dist/ |
| `CON-02` | Test directories protected | BLOCKER | automated | yes | PARTIAL | PARTIAL | the prohibitions section covers src/config/\_\_tests\_\_/, src/services/\_\_tests\_\_/, src/store/middleware/\_\_tests\_\_/, src/store/slices/\_\_tests\_\_/, src/util/\_\_tests\_\_/, src/util/browser/\_\_tests\_\_/, src/util/error/\_\_tests\_\_/, src/util/headers/\_\_tests\_\_/ (+9 more) but not test/ |
| `CON-03` | artefacts/ excluded from index and agent reads | DEGRADER | automated | yes | PASS | PASS | artefacts/ present, ignored, and untracked |
| `CON-04` | Draft allow/deny emitted | COSMETIC | automated | no | PASS | PASS | draft deny list written: do-not-do.draft.md |

### EXEC

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `EXEC-01` | Toolchain pinned / wrapper committed | BLOCKER | automated | yes | PASS | PASS | pinned: node (package.json (engines.node)) |
| `EXEC-02` | Lockfile committed and consistent | BLOCKER | automated | yes | PASS | PASS | tracked: package-lock.json |
| `EXEC-03` | Non-interactive setup path | BLOCKER | automated | yes | PASS | PASS | documented setup command: README.md: npm ci |
| `EXEC-04` | Env-var inventory complete | BLOCKER | automated | yes | FAIL | FAIL | 2 referenced key(s) are absent from any committed example file: UDA_LOG_LEVEL, UDA_LOG_LEVELNumber |
| `EXEC-05` | No generated artifacts committed in-tree | DEGRADER | automated | yes | PASS | PASS | no tracked generated or vendored paths |
| `EXEC-06` | Documented commands resolve | DEGRADER | automated | yes | PASS | PASS | 5 documented command(s) resolve |
| `EXEC-07` | No competing configs for one concern | DEGRADER | automated | yes | PASS | PASS | format: .prettierrc.js; lint: .eslintrc.js; test: jest.config.ts; types: tsconfig.json |

### TST

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `TST-01` | Test verb exists, suite non-empty | BLOCKER | automated | yes | PASS | PASS | test verb on package.json (jest); 108 test file(s) |
| `TST-02` | Suite status known | DEGRADER | automated | yes | UNKNOWN | UNKNOWN | probe not run: probes disabled (pass --run-gates) |
| `TST-03` | Skip / xfail census | DEGRADER | automated | yes | PASS | PASS | skip/xfail census across 108 test file(s): no markers; total 0 |
| `TST-04` | Fast path documented | DEGRADER | automated | yes | FAIL | FAIL | no single-test/subset invocation in fenced shell blocks (scope: README.md, AGENTS.md) |
| `TST-05` | Coverage configuration present | COSMETIC | automated | yes | PASS | PASS | coverage configured: package.json script |

### NAV

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `NAV-01` | Declared component boundaries | DEGRADER | automated | yes | PASS | PASS | single-root repository declares package.json |
| `NAV-02` | Obvious entry points | DEGRADER | automated | yes | PASS | PASS | entry point(s): package.json:main=./dist/index.cjs.js, package.json:exports, src/index.ts |
| `NAV-03` | Structural red flags | COSMETIC | automated | yes | PASS | PARTIAL | The only oversized file is the package-lock.json lockfile; no catch-all dirs, binaries or minified files. |
| `NAV-04` | Architecture orientation artifact | COSMETIC | automated | no | FAIL | FAIL | no architecture orientation artifact |
| `NAV-05` | Public-symbol documentation coverage | COSMETIC | automated | no | PARTIAL | PARTIAL | 169/255 public symbols documented (66%); method: typescript: exported declarations |

### SEC

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `SEC-01` | .env untracked and ignored | BLOCKER | automated | yes | PARTIAL | PARTIAL | no tracked .env, but ignore rules miss dotenv variant |
| `SEC-02` | No key-shaped strings in tracked files | BLOCKER | automated | yes | PASS | FAIL | The 6 credential-shaped lines are mock labels in jest tests; no real credential is tracked. |
| `SEC-03` | Ignore patterns cover secret shapes | DEGRADER | automated | yes | PARTIAL | PARTIAL | covered: dotenv; missing: dotenv variant, ssh private key, PEM, key, PKCS#12, PFX, keystore, certificate (.crt), certificate (.cer), AWS credentials |

### HYG

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `HYG-01` | README present and non-placeholder | COSMETIC | automated | no | PASS | PASS | README.md present and non-placeholder |
| `HYG-02` | CODEOWNERS present | COSMETIC | automated | no | FAIL | FAIL | no CODEOWNERS file |
| `HYG-03` | Pull-request template present | COSMETIC | automated | no | FAIL | FAIL | no pull-request template |
| `HYG-04` | Issue templates present | COSMETIC | automated | no | FAIL | FAIL | no issue templates |
| `HYG-05` | CONTRIBUTING present | COSMETIC | automated | no | FAIL | FAIL | no CONTRIBUTING document |
| `HYG-06` | SECURITY present | COSMETIC | automated | no | FAIL | FAIL | no SECURITY document |
| `HYG-07` | CHANGELOG present and recent | COSMETIC | automated | no | PASS | PASS | CHANGELOG.md last changed 0 day(s) before HEAD |
| `HYG-08` | Release process documented | COSMETIC | automated | no | PASS | PASS | release document present at RELEASE_PROCESS.md |
| `HYG-09` | Dependency update automation configured | COSMETIC | automated | no | PASS | PASS | dependency automation configured at .github/dependabot.yml |
| `HYG-10` | License present | COSMETIC | automated | no | FAIL | FAIL | no license file at the repository root |
| `HYG-11` | Branch protection declared as code | COSMETIC | automated | no | FAIL | FAIL | github offers branch protection as code, none found |

---

Rendered from the JSON report by `render_report.py`. The JSON report is the record.
