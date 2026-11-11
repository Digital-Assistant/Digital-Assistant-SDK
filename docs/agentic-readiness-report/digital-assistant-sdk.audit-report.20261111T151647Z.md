# Agentic readiness audit: digital-assistant-sdk

> [!NOTE]
> This audit reports; it does not gate. A check that could not be settled is UNKNOWN: it earns no credit and is never shown as a pass.

## Bottom line

- **0 blockers remaining.**
- **Not settled by this scan:**
  - No check is UNKNOWN.
  - 5 requirements are unattested: no check settles them.

**First actions** (2 of 2 open findings):

| # | Finding | Severity | Effort | What it blocks | Fix |
|---:|---|---|:---:|---|---|
| 1 | `AGT-11` (F-014) | COSMETIC | S | An agent cannot trust every specific line of AGENTS.md because one of them names a file that does not exist (util/storage.ts; the module is the folder src/util/storage/). | In the src/util/ row of the architecture map, write util/storage/ (StorageUtil) instead of util/storage.ts. |
| 2 | `NAV-05` (F-015) | COSMETIC | — | An agent cannot read intent from the source of every exported symbol because 89 of 266 exported TypeScript declarations (33%) have no doc comment. | Add short doc comments to the undocumented exported symbols, starting with the public surface in src/index.ts. |

## Provenance

| Field | Value |
|---|---|
| Framework | `v0.3.4`, checkout `0006e0f9012f` |
| Target | `/home/kc/Downloads/Junk/delete/temp/sdk-close-out-audit` |
| Commit | `4738ce533b8e` — clean working tree |
| Status | final |
| Started | `2026-11-11T15:06:39+00:00` |
| Finalised | `2026-11-11T15:16:47+00:00` |
| Catalogue | `0.7.0` |
| Engine | `python-agentic-audit` 0.3.4, ruleset `2026-11-10.5`, ruleset hash `9b2a2e2562a10c7a`, scanned `2026-11-11T15:08:09+00:00` |
| Agent (self-reported) | `Claude Code` with `claude-opus-5-5` |
| Probes | `format`, `format:check`, `lint`, `typecheck`, `test`, `check`, `security`, timeout 300 s |
| Report schema | `0.2` |

## Readiness summary

- **Phase-1 score: 0.99**, over 62 scored checks
- **0 blockers remaining**
- **Unattested:** 5 requirements that no check settles, listed below

No scored check is UNKNOWN. No agent finding is waiting for a person's decision.

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
| PASS | 74 | 1 | The requirement is met. |
| PARTIAL | 2 | 0.5 | Part of the requirement is met. |
| FAIL | 0 | 0 | The requirement is not met. |
| UNKNOWN | 0 | 0 | The evidence could not be gathered. It is never read as a pass. |
| NOT_APPLICABLE | 0 | outside the score | The check does not apply to this repository. |
| **Total** | **76** |  |  |

| Severity | Weight | Meaning | Scored checks | Not met |
|---|---:|---|---:|---:|
| BLOCKER | 3 | Agent work is impossible, unsafe or unverifiable. Fix before onboarding agents. | 16 | 0 |
| DEGRADER | 2 | Agent work is possible but unreliable or wasteful. | 39 | 1 |
| COSMETIC | 1 | Hygiene. Fix when convenient. | 7 | 0 |

## Command surface

The framework's seven verbs, resolved verb by verb on the target's runners — CMD-01's structured payload; CMD-02, AGT-05 and CI-02 read the same surface.

7 verbs of 7 verbs resolve. Every verb resolves.

| Verb | Resolved | Runner | Command |
|---|:---:|---|---|
| `format` | yes | `package.json` | `prettier --write .` |
| `format:check` | yes | `package.json` | `prettier --check . && npm run lint` |
| `lint` | yes | `package.json` | `eslint --max-warnings 686 "{src,test,scripts}/**/*.{ts,js,mjs}"` |
| `typecheck` | yes | `package.json` | `tsc --noEmit` |
| `test` | yes | `package.json` | `jest` |
| `check` | yes | `package.json` | `npm run format:check && npm run typecheck && npm run test:coverage` |
| `security` | yes | `package.json` | `npm audit --omit=dev --audit-level=high && npm audit --audit-level=critical` |

## Credential-shaped lines

8 credential-shaped lines across 4 files in tracked text files. The file-by-file detail is in the attention tables above; the report never records the value itself.

## Missing secret-shape ignore rules

The secret shapes SEC-01 and SEC-03 check for, and whether the repository's ignore rules cover each one. The suggested entry is paste-ready into `.gitignore` for a shape that is missing.

| Shape | Status | Suggested `.gitignore` entry |
|---|:---:|---|
| dotenv | covered | `.env` |
| dotenv variant | covered | `.env.*` |
| ssh private key | covered | `id_rsa*` |
| PEM | covered | `*.pem` |
| key | covered | `*.key` |
| PKCS#12 | covered | `*.p12` |
| PFX | covered | `*.pfx` |
| keystore | covered | `*.keystore` |
| certificate (.crt) | covered | `*.crt` |
| certificate (.cer) | covered | `*.cer` |
| AWS credentials | covered | `.aws/*` |

## Checks that need attention

Each row is a finding, or a check that has none. A check is listed when it is not met, was overridden, was judged by the agent, or raised a finding. Evidence is grouped by who captured it, and a quote or command output is under Evidence in full. The decision on a finding is one of these:

- **interactive**: Decided by the person, on this finding alone.
- **batch**: Decided by the person, as one of a group of findings that are not blockers.
- **policy**: Set by the confirmation policy, not by a person.

### Blocker checks

0 of the 16 scored BLOCKER checks are not met.

| Check | Verdict | What we found | Evidence | Fix | Decision |
|---|---|---|---|---|---|
| `IDX-02` An index exists for this checkout | **PASS**<br>engine: UNKNOWN | The codebase-memory-mcp index answers for this checkout: project root equals the target and status is ready.<br>**Overridden.** The engine's verdict was UNKNOWN. Reason: The engine could not open a store (user config not read); a direct index_status query proves the index exists and answers for this root. | **agent** `project=home-kc-Downloads-Junk-delete-temp-sdk-close-out-audit` through `codebase-memory-mcp index_status` (status ready; root_path /home/kc/Downloads/Junk/delete/temp/sdk-close-out-audit; 1067 nodes, 2528 edges; indexed_at 2026-11-11T15:06:32Z) | — | — |
| `CMD-02` check composes the read-only verbs<br>finding `F-001` | **PASS**<br>engine: PARTIAL | An agent cannot trust one gate to verify the change set because the package.json check verb does not invoke test.<br>**Overridden.** The engine's verdict was PARTIAL. Reason: The engine matches the verb name test only; check calls npm run test:coverage, which is jest --coverage, so the tests run. Owner rejected F-001. | **tool** `package.json` (npm run format:check && npm run typecheck && npm run test:coverage)<br>**agent** `package.json` (check: npm run format:check && npm run typecheck && npm run test:coverage; test:coverage: jest --coverage; test: jest) | Make check invoke a format-check, a typecheck and the test suite, in that order, so one command is the gate. | **Rejected** (interactive)<br>Note: Owner: false positive; check runs jest through test:coverage. |
| `EXEC-04` Env-var inventory complete<br>finding `F-002` | **PASS**<br>engine: FAIL | An agent cannot know every variable the code needs before running it because 2 referenced key(s) are absent from any committed example file: UDA_LOG_LEVEL, UDA_LOG_LEVELNumber.<br>**Overridden.** The engine's verdict was FAIL. Reason: The engine reads only root-level example file names (framework issue #52); both keys are declared in environments/local.env.example. Owner rejected F-002. | **agent** `environments/local.env.example:64` (UDA_LOG_LEVEL= (value not quoted))<br>`environments/local.env.example:67` (UDA_LOG_LEVELNumber= (value not quoted)) | Add the missing keys to .env.example (values redacted) so the environment can be provisioned without reading the source. | **Rejected** (interactive)<br>Note: Owner: false positive; both keys are in environments/local.env.example (engine reads root names only, framework issue #52). |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-003` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/services/\_\_tests\_\_/TranslateService.test.ts contains 1 credential-shaped line(s).<br>**Overridden.** The engine's verdict was FAIL. Reason: Each flagged line assigns a hyphenated placeholder (test-api-key, keycloak-jwt-token, user-session-token, secret-token, new-token, received-token) in a unit test. Owner rejected F-003 to F-006. | **tool** `src/services/__tests__/TranslateService.test.ts:20` (credential-shaped string)<br>**agent** `src/services/__tests__/TranslateService.test.ts:20`<br>`src/services/__tests__/apiClient.test.ts:189-257`<br>`src/util/user/__tests__/AuthDataConfig.test.ts:135`<br>`src/util/user/__tests__/UDABindAccount.test.ts:78-185` | Remove the value from the file and its history, load it from the environment, and rotate the credential. The report never records the value itself. | **Rejected** (interactive)<br>Note: Owner: false positive; placeholder literal in a unit test. |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-004` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/services/\_\_tests\_\_/apiClient.test.ts contains 5 credential-shaped line(s). | **tool** `src/services/__tests__/apiClient.test.ts:189` (credential-shaped string)<br>`src/services/__tests__/apiClient.test.ts:217` (credential-shaped string)<br>`src/services/__tests__/apiClient.test.ts:237` (credential-shaped string)<br>`src/services/__tests__/apiClient.test.ts:674` (credential-shaped string)<br>`src/services/__tests__/apiClient.test.ts:689` (credential-shaped string) | Same as `F-003` | **Rejected** (interactive)<br>Note: Owner: false positive; placeholder literals in a unit test. |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-005` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/util/user/\_\_tests\_\_/AuthDataConfig.test.ts contains 1 credential-shaped line(s). | **tool** `src/util/user/__tests__/AuthDataConfig.test.ts:135` (credential-shaped string) | Same as `F-003` | **Rejected** (interactive)<br>Note: Owner: false positive; placeholder literal in a unit test. |
| `SEC-02` No key-shaped strings in tracked files<br>finding `F-006` | **PASS**<br>engine: FAIL | An agent cannot keep credentials out of the repository and its history because src/util/user/\_\_tests\_\_/UDABindAccount.test.ts contains 1 credential-shaped line(s). | **tool** `src/util/user/__tests__/UDABindAccount.test.ts:126` (credential-shaped string) | Same as `F-003` | **Rejected** (interactive)<br>Note: Owner: false positive; placeholder literals in a unit test. |

### Degrader checks

1 of the 39 scored DEGRADER checks is not met.

| Check | Verdict | What we found | Evidence | Fix | Decision |
|---|---|---|---|---|---|
| `IDX-03` Index freshness | **PASS**<br>engine: UNKNOWN | A direct freshness query reports no drift between the index and HEAD.<br>**Overridden.** The engine's verdict was UNKNOWN. Reason: The engine store exposes no revision, so it reported UNKNOWN; the index tool's own detect_changes against HEAD reports zero changed files. | **agent** `project=home-kc-Downloads-Junk-delete-temp-sdk-close-out-audit since=HEAD scope=files` through `codebase-memory-mcp detect_changes` (merge_base 4738ce533b8e; changed_total 0) | — | — |
| `AGT-08` No competing instruction files, and the reach matrix is stated<br>finding `F-007` | **PASS**<br>engine: FAIL | An agent cannot be sure that both files are read because CLAUDE.md shadows AGENTS.md for the harness that defines the pair, so only one of the two is ever loaded.<br>**Overridden.** The engine's verdict was FAIL. Reason: The engine cannot tell an @AGENTS.md import stub from a shadowing file (framework issue #26). Owner rejected F-007 and F-008; the seven unreached tools are an owner choice. | **tool** `CLAUDE.md`<br>`AGENTS.md`<br>**agent** `CLAUDE.md:1` (@AGENTS.md only)<br>`AGENTS.md:3` (the reach line names the tools that read the file) | Reconcile the two files, or delete the shadowed one — a file nobody reads still gets edited. | **Rejected** (batch)<br>Note: Owner: CLAUDE.md is only @AGENTS.md, a pointer; engine limit (framework issue #26). |
| `AGT-08` No competing instruction files, and the reach matrix is stated<br>finding `F-008` | **PASS**<br>engine: FAIL | An agent cannot know which instruction file is authoritative because 1 vendor-specific instruction files exist alongside the canonical one (CLAUDE.md). | **tool** `CLAUDE.md` | Keep AGENTS.md canonical; reduce each vendor file to a pointer at it, or delete it if the harness reads AGENTS.md natively. | **Rejected** (batch)<br>Note: Owner: CLAUDE.md is only @AGENTS.md, a pointer; engine limit (framework issue #26). |
| `CI-03` CI-only steps flagged<br>finding `F-009` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/ci.yml:259 runs \`npm integrity\` with no local runner entry for \`integrity\`.<br>**Overridden.** The engine's verdict was FAIL. Reason: The engine read words inside echo strings (a job-summary table row and release notes) as npm invocations. Owner rejected F-009 to F-012. | **tool** `.github/workflows/ci.yml:259` (npm integrity)<br>**agent** `.github/workflows/ci.yml:259` (echo of a Markdown table row: \| npm integrity \| ...)<br>`.github/workflows/release-and-sync.yml:201` (echo of a Markdown table row)<br>`.github/workflows/release-and-sync.yml:315` (echo of a heading)<br>`.github/workflows/release-and-sync.yml:319` (echo of an instruction for a person) | Add a local script/target for \`integrity\`, or document why the step is CI-only. | **Rejected** (batch)<br>Note: Owner: false positive; text inside an echo string. |
| `CI-03` CI-only steps flagged<br>finding `F-010` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/release-and-sync.yml:201 runs \`npm integrity\` with no local runner entry for \`integrity\`. | **tool** `.github/workflows/release-and-sync.yml:201` (npm integrity) | Same as `F-009` | **Rejected** (batch)<br>Note: Owner: false positive; text inside an echo string. |
| `CI-03` CI-only steps flagged<br>finding `F-011` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/release-and-sync.yml:315 runs \`echo "### Staged on npm with tag \\\`next\\\`"\` with no local runner entry for \`with\`. | **tool** `.github/workflows/release-and-sync.yml:315` (echo "### Staged on npm with tag \\\`next\\\`") | Add a local script/target for \`with\`, or document why the step is CI-only. | **Rejected** (batch)<br>Note: Owner: false positive; text inside an echo string. |
| `CI-03` CI-only steps flagged<br>finding `F-012` | **PASS**<br>engine: FAIL | An agent cannot reproduce a CI step on the local command surface because .github/workflows/release-and-sync.yml:319 runs \`echo "3. After the TEST pass: \\\`npm dist-tag add @udan/digital-assistant-sdk@$VERSION latest\\\`."\` with no local runner entry for \`dist-tag\`. | **tool** `.github/workflows/release-and-sync.yml:319` (echo "3. After the TEST pass: \\\`npm dist-tag add @udan/digital-assistant-sdk@$VERSION latest\\\`.") | Add a local script/target for \`dist-tag\`, or document why the step is CI-only. | **Rejected** (batch)<br>Note: Owner: false positive; text inside an echo string. |
| `TST-02` Suite status known | **PASS**<br>engine: UNKNOWN | The suite is green on this commit: CI's push run on dev for 4738ce533 ran 107 suites and 846 tests, all passing.<br>**Overridden.** The engine's verdict was UNKNOWN. Reason: The engine's probe could not start jest (No such file or directory: 'jest'; node_modules/.bin is not on the probe's PATH, framework issue #121). CI ran the same test verb on the audited commit. | **agent** command `gh run view 43043829452 -R Digital-Assistant/Digital-Assistant-SDK --log` (exit 0; output in Evidence in full) | — | — |
| `CI-04` CI enforces the same gate as the local check<br>agent, confidence high | **PASS** | Every verb job gates on its exit code, CI Gate aggregates them, and live rules on main and dev require CI Gate. | **agent** `.github/workflows/ci.yml:124-137` (verify job: typecheck, format:check (which runs lint) and lint run in parallel and exit 1 if any fails; Tests runs test:coverage, which fails below the 80% floor)<br>`.github/workflows/ci.yml:397-410` (CI Gate (if: always) needs changes, verify, pack, audit, gitleaks, commits, workflow-lint and fails on any result other than success or skipped)<br>command `grep -nE 'continue-on-error\|\|\| true\|set \+e' .github/workflows/*.yml` (exit 1; output in Evidence in full)<br>command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/dev` (exit 0; output in Evidence in full)<br>command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/main` (exit 0; output in Evidence in full) | — | — |
| `AGT-11` Instructions are specific and not inferable<br>finding `F-014`, severity COSMETIC · agent, confidence medium | **PARTIAL** | An agent cannot trust every specific line of AGENTS.md because one of them names a file that does not exist (util/storage.ts; the module is the folder src/util/storage/). | **agent** `AGENTS.md:59` | In the src/util/ row of the architecture map, write util/storage/ (StorageUtil) instead of util/storage.ts.<br>Playbook `adapt-agents-md` · Effort S | **Confirmed** (batch) |

### Cosmetic checks

0 of the 7 scored COSMETIC checks are not met.

| Check | Verdict | What we found | Evidence | Fix | Decision |
|---|---|---|---|---|---|
| `NAV-03` Structural red flags<br>finding `F-013` | **PASS**<br>engine: PARTIAL | An agent cannot work in a codebase without obvious structural traps because 1 oversized file(s), 0 catch-all director(y/ies), 0 checked-in binary file(s) and 0 minified asset(s).<br>**Overridden.** The engine's verdict was PARTIAL. Reason: The only oversized file is package-lock.json, a generated lockfile an agent never edits by hand. Owner rejected F-013. | **tool** `package-lock.json`<br>**agent** `package-lock.json` (over 512 KB; generated by npm; listed in docs/architecture/overview.md, Repository notes) | Split oversized files, break up catch-all directories, and keep binaries and minified assets out of the tree (generate them in the build). | **Rejected** (batch)<br>Note: Owner: the only oversized file is package-lock.json, a generated lockfile. |
| `NAV-05` Public-symbol documentation coverage<br>finding `F-015` | **PARTIAL**<br>not scored | An agent cannot read intent from the source of every exported symbol because 89 of 266 exported TypeScript declarations (33%) have no doc comment. | **agent** `src/index.ts` (engine ratio payload: numerator 177, denominator 266, method 'typescript: exported declarations'; unchanged since the first audit (owner chose to record it only)) | Add short doc comments to the undocumented exported symbols, starting with the public surface in src/index.ts. | **Confirmed** (batch)<br>Note: Owner: recorded only, as chosen in T6. |

## Overrides of the engine's verdicts

Where this report's verdict differs from the engine's, the row of the check above shows both, and the agent's counter-evidence is in its Evidence column or under Evidence in full.

| Check | Engine's verdict | This report's verdict | Reason |
|---|---|---|---|
| `IDX-02` | UNKNOWN | PASS | The engine could not open a store (user config not read); a direct index_status query proves the index exists and answers for this root. |
| `IDX-03` | UNKNOWN | PASS | The engine store exposes no revision, so it reported UNKNOWN; the index tool's own detect_changes against HEAD reports zero changed files. |
| `AGT-08` | FAIL | PASS | The engine cannot tell an @AGENTS.md import stub from a shadowing file (framework issue #26). Owner rejected F-007 and F-008; the seven unreached tools are an owner choice. |
| `CMD-02` | PARTIAL | PASS | The engine matches the verb name test only; check calls npm run test:coverage, which is jest --coverage, so the tests run. Owner rejected F-001. |
| `CI-03` | FAIL | PASS | The engine read words inside echo strings (a job-summary table row and release notes) as npm invocations. Owner rejected F-009 to F-012. |
| `EXEC-04` | FAIL | PASS | The engine reads only root-level example file names (framework issue #52); both keys are declared in environments/local.env.example. Owner rejected F-002. |
| `TST-02` | UNKNOWN | PASS | The engine's probe could not start jest (No such file or directory: 'jest'; node_modules/.bin is not on the probe's PATH, framework issue #121). CI ran the same test verb on the audited commit. |
| `NAV-03` | PARTIAL | PASS | The only oversized file is package-lock.json, a generated lockfile an agent never edits by hand. Owner rejected F-013. |
| `SEC-02` | FAIL | PASS | Each flagged line assigns a hyphenated placeholder (test-api-key, keycloak-jwt-token, user-session-token, secret-token, new-token, received-token) in a unit test. Owner rejected F-003 to F-006. |

## Evidence in full

Quotes and command output that the tables above point to, each under the check that cites it.

### TST-02: Suite status known

- Command `gh run view 43043829452 -R Digital-Assistant/Digital-Assistant-SDK --log` (exit 0) · captured by agent
  ```text
  Test Suites: 107 passed, 107 total; Tests: 846 passed, 846 total
  ```

### CI-04: CI enforces the same gate as the local check

- Command `grep -nE 'continue-on-error|\|\| true|set \+e' .github/workflows/*.yml` (exit 1) · captured by agent
  ```text
  no matches
  ```
- Command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/dev` (exit 0) · captured by agent
  ```text
  required_status_checks: CI Gate, Conventional Commit Title
  ```
- Command `gh api repos/Digital-Assistant/Digital-Assistant-SDK/rules/branches/main` (exit 0) · captured by agent
  ```text
  required_status_checks: CI Gate, Check source branch
  ```

## Coverage

**Examined:** nothing is recorded

No scope was skipped.

**Files:** 327 files inspected, 1 skipped; the scan was not cut short.

## Stack and components

| Stack | Detected |
|---|---|
| Ecosystems | `node` |
| Package managers | `npm` |
| CI providers | `github` |
| Test frameworks | `jest` |
| Hook managers | `lefthook` |

| Component | Path | Declared | Declared by | Manifest | AGENTS.md |
|---|---|---|---|---|---|
| (root) | `.` | yes | implicit | `package.json` | present |

## Run context

| Field | Value |
|---|---|
| Evaluation mode | no |
| Confirmation policy | `interactive` |
| Provider exposure acknowledged | yes: the model provider receives what the agent reads from the target |
| Code index | `mcp` `codebase-memory-mcp` — Close-out re-audit after the agentic-readiness implement run; project home-kc-Downloads-Junk-delete-temp-sdk-close-out-audit, indexed 2026-11-11 before the run. |
| Excluded | none |
| Known components | none |
| Stack profile | `typescript-node`, shipped, confirmed by the user |

## Appendix — all checks

All 76 checks, grouped by family. The command surface, the credential-shaped-lines total and the missing secret-shape ignore rules above are rendered from the engine's structured payloads; other payloads (env-key inventories, harness-reach matrices, and so on) are in the JSON report only, for now.

### IDX

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `IDX-01` | codebase-memory-mcp registered for this repository | BLOCKER | automated | yes | PASS | PASS | codebase-memory-mcp registered in: .mcp.json (project) |
| `IDX-02` | An index exists for this checkout | BLOCKER | automated | yes | PASS | UNKNOWN | The codebase-memory-mcp index answers for this checkout: project root equals the target and status is ready. |
| `IDX-03` | Index freshness | DEGRADER | automated | yes | PASS | UNKNOWN | A direct freshness query reports no drift between the index and HEAD. |

### AGT

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `AGT-01` | Instruction file present, canonical, and non-trivial | BLOCKER | automated | yes | PASS | PASS | — |
| `AGT-02` | Component coverage by instruction files | DEGRADER | automated | yes | PASS | PASS | single-root repository: no component-level instruction files required |
| `AGT-03` | Documentation contract named | DEGRADER | automated | yes | PASS | PASS | docs/, the style guide and the scratch contract are named |
| `AGT-04` | Definition of done stated | DEGRADER | automated | yes | PASS | PASS | definition of done ties a doc trigger to the same change set |
| `AGT-05` | Seven verbs named | DEGRADER | automated | yes | PASS | PASS | all 7 verbs named in AGENTS.md and resolved on a runner |
| `AGT-06` | Architectural boundaries declared | DEGRADER | automated | yes | PASS | PASS | 8 boundary rules reference real paths |
| `AGT-07` | Do-not-do / deny rules present | DEGRADER | automated | yes | PASS | PASS | prohibitions cover tests, generated files, the default branch and secrets |
| `AGT-08` | No competing instruction files, and the reach matrix is stated | DEGRADER | automated | yes | PASS | FAIL | AGENTS.md is canonical and states the 21 tools that read it; CLAUDE.md is a one-line @AGENTS.md import, so Claude Code reads AGENTS.md too. |
| `AGT-09` | Branch and release boundary declared | DEGRADER | automated | yes | PASS | PASS | the branch model and the release boundary are stated |
| `AGT-10` | Instruction indirection resolved | DEGRADER | automated | yes | PASS | PASS | — |
| `AGT-12` | Communication rules stated | COSMETIC | automated | yes | PASS | PASS | communication rules (AGENTS.md § 12. How to write for people) name the reader, reports and decisions |
| `AGT-11` | Instructions are specific and not inferable | DEGRADER | agent | yes | PARTIAL | — | About 94% of 161 rule lines are specific, but one specific line does not resolve: AGENTS.md:59 names util/storage.ts. |

### DOC

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `DOC-01` | docs/ exists | DEGRADER | automated | yes | PASS | PASS | 17 markdown file(s) under docs/ |
| `DOC-02` | docs/STYLE_GUIDE.md exists | DEGRADER | automated | yes | PASS | PASS | docs/STYLE_GUIDE.md present and named in AGENTS.md |
| `DOC-03` | artefacts/ exists and is ignored | DEGRADER | automated | yes | PASS | PASS | no scratch directory in use |
| `DOC-04` | ADR directory and index | COSMETIC | automated | yes | PASS | PASS | 4 ADR(s) indexed in docs/adr/README.md |
| `DOC-05` | Docs are readable | COSMETIC | automated | yes | PASS | PASS | 27/412 sentences over the limit (6.6%), 0 vague word(s) (0.00 per 1,000 words), 0 explanation or tutorial page(s) without a diagram, in 17 page(s) |

### CMD

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `CMD-01` | Seven verbs resolvable on one runner | BLOCKER | automated | yes | PASS | PASS | format -> package.json; format:check -> package.json; lint -> package.json; typecheck -> package.json; test -> package.json; check -> package.json; security -> package.json |
| `CMD-02` | check composes the read-only verbs | BLOCKER | automated | yes | PASS | PARTIAL | check (package.json) composes format:check (Prettier and lint), typecheck and test:coverage, which runs jest. |
| `CMD-03` | No divergent second definition | DEGRADER | automated | yes | PASS | PASS | one runner defines the gate |
| `CMD-04` | Write verbs separated from read-only verbs | DEGRADER | automated | yes | PASS | PASS | no read-only verb invokes a write verb |

### TOOL

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `TOOL-01` | Formatter configured | DEGRADER | automated | yes | PASS | PASS | formatter .prettierrc.js, package.json prettier + package.json format verb |
| `TOOL-02` | Linter configured | DEGRADER | automated | yes | PASS | PASS | linter .eslintrc.js + package.json lint verb |
| `TOOL-03` | Type checker configured | DEGRADER | automated | yes | PASS | PASS | strict config: tsconfig.json:strict |
| `TOOL-04` | Dependency / security scan verb | DEGRADER | automated | yes | PASS | PASS | security -> npm audit --omit=dev --audit-level=high && npm audit --audit-level=critical; CI: .github/workflows/ci.yml:291 security (npm audit --omit=dev --audit-level=high && npm audit --audit-level=critical); .github/workflows/security.yml:31 security (npm audit --omit=dev --audit-level=high && npm audit --audit-level=critical) |
| `TOOL-05` | Local hook chain active | DEGRADER | automated | yes | PASS | PASS | wired: lefthook.yml |
| `TOOL-06` | Commit convention enforced | COSMETIC | automated | yes | PASS | PASS | local: commitlint.config.mjs, lefthook.yml:commit-msg; CI: commitlint (.github/workflows/ci.yml) |
| `TOOL-07` | Local guard against commits to a protected branch | COSMETIC | automated | yes | PASS | PASS | branch guard at lefthook.yml:9; names dev, main |

### CI

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `CI-01` | Pipeline present, triggered on PRs | BLOCKER | automated | yes | PASS | PASS | PR-triggered: .github/workflows/ci.yml (github); .github/workflows/docs.yml (github); .github/workflows/enforce-dev-base.yml (github); .github/workflows/pr-title.yml (github) |
| `CI-02` | Local↔CI parity | BLOCKER | automated | yes | PASS | PASS | CI verbs: check, format:check, lint, security, test, typecheck; local read-only verbs not exercised: none |
| `CI-03` | CI-only steps flagged | DEGRADER | automated | yes | PASS | FAIL | Every CI step that runs a command maps to the local command surface; the four engine hits are text inside echo strings. |
| `CI-05` | Workflow files are linted | DEGRADER | automated | yes | PASS | PASS | github: local actionlint (docs/agentic-readiness-report/digital-assistant-sdk.audit-report.20261111T072141Z.json), actionlint (docs/agentic-readiness/digital-assistant-sdk-agentic-readiness-state.json), actionlint (lefthook.yml), actionlint (package.json), zizmor (docs/agentic-readiness-report/digital-assistant-sdk.audit-report.20261111T072141Z.json), zizmor (docs/agentic-readiness/digital-assistant-sdk-agentic-readiness-state.json), zizmor (lefthook.yml), zizmor (package.json), CI actionlint (… |
| `CI-04` | CI enforces the same gate as the local check | DEGRADER | agent | yes | PASS | — | Every verb job gates on its exit code, CI Gate aggregates them, and live rules on main and dev require CI Gate. |

### BASE

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `BASE-01` | Baseline artifact exists | DEGRADER | automated | yes | PASS | PASS | baseline/suppression mechanism present: docs/agentic-readiness/digital-assistant-sdk-quality-baseline.json |
| `BASE-02` | Current violation counts measured | DEGRADER | automated | yes | PASS | PASS | violation count configured: package.json, package.json:lint; method: static configuration scan; the target's own tools are never run |
| `BASE-03` | No-new-violations mechanism | DEGRADER | automated | yes | PASS | PASS | ratchet present: violation budget (package.json), violation budget (package.json:lint) |
| `BASE-04` | Coverage floor configured | DEGRADER | automated | yes | PASS | PASS | coverage threshold configured: jest.config.ts |

### CON

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `CON-01` | Allow/deny artifact present | BLOCKER | automated | yes | PASS | PASS | the prohibitions section of AGENTS.md names paths that exist: src/\*\*/\_\_tests\_\_/, test/, \*.test.ts, environments/local.env.example, src/, check-build-env.mjs, package.json |
| `CON-02` | Test directories protected | BLOCKER | automated | yes | PASS | PASS | the prohibitions section of AGENTS.md names the test directories (src/\_\_tests\_\_/, src/config/\_\_tests\_\_/, src/services/\_\_tests\_\_/, src/store/middleware/\_\_tests\_\_/, src/store/slices/\_\_tests\_\_/, src/util/\_\_tests\_\_/, src/util/browser/\_\_tests\_\_/, src/util/error/\_\_tests\_\_/ (+11 more)) |
| `CON-03` | artefacts/ excluded from index and agent reads | DEGRADER | automated | yes | PASS | PASS | no scratch or agent-state directory in use |
| `CON-04` | Draft allow/deny emitted | COSMETIC | automated | no | PASS | PASS | draft deny list written: /home/kc/Downloads/Junk/delete/temp/Digital-Assistant-SDK/artefacts/agentic-readiness-audit/engine-close-out/do-not-do.draft.md |

### EXEC

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `EXEC-01` | Toolchain pinned / wrapper committed | BLOCKER | automated | yes | PASS | PASS | pinned: node (package.json (engines.node)) |
| `EXEC-02` | Lockfile committed and consistent | BLOCKER | automated | yes | PASS | PASS | tracked: package-lock.json |
| `EXEC-03` | Non-interactive setup path | BLOCKER | automated | yes | PASS | PASS | documented setup command: README.md: npm ci |
| `EXEC-04` | Env-var inventory complete | BLOCKER | automated | yes | PASS | FAIL | Every key the code reads is declared in the committed example file environments/local.env.example, including UDA_LOG_LEVEL and UDA_LOG_LEVELNumber. |
| `EXEC-05` | No generated artifacts committed in-tree | DEGRADER | automated | yes | PASS | PASS | no tracked generated or vendored paths |
| `EXEC-06` | Documented commands resolve | DEGRADER | automated | yes | PASS | PASS | 7 documented command(s) resolve |
| `EXEC-07` | No competing configs for one concern | DEGRADER | automated | yes | PASS | PASS | format: .prettierrc.js; lint: .eslintrc.js; security: .gitleaks.toml; test: jest.config.ts; types (TypeScript): tsconfig.json |
| `EXEC-08` | Tool versions visible to dependency automation | DEGRADER | automated | yes | PASS | PASS | no literal tool version in 10 command file(s) |

### TST

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `TST-01` | Test verb exists, suite non-empty | BLOCKER | automated | yes | PASS | PASS | test verb on package.json (jest); 109 test file(s) |
| `TST-02` | Suite status known | DEGRADER | automated | yes | PASS | UNKNOWN | The suite is green on this commit: CI's push run on dev for 4738ce533 ran 107 suites and 846 tests, all passing. |
| `TST-03` | Skip / xfail census | DEGRADER | automated | yes | PASS | PASS | skip/xfail census across 109 test file(s): no markers; total 0 |
| `TST-04` | Fast path documented | DEGRADER | automated | yes | PASS | PASS | fast path documented: AGENTS.md:122 \`npx jest -t '\<test name>'\` (scope: README.md, AGENTS.md, CLAUDE.md, CONTRIBUTING.md) |
| `TST-05` | Coverage configuration present | COSMETIC | automated | yes | PASS | PASS | coverage configured: package.json script |

### NAV

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `NAV-01` | Declared component boundaries | DEGRADER | automated | yes | PASS | PASS | single-root repository declares package.json |
| `NAV-02` | Obvious entry points | DEGRADER | automated | yes | PASS | PASS | entry point(s): package.json:main=./dist/index.cjs.js, package.json:exports, src/index.ts |
| `NAV-03` | Structural red flags | COSMETIC | automated | yes | PASS | PARTIAL | No structural traps: 0 catch-all directories, 0 binaries, 0 minified assets; the one oversized file is the generated npm lockfile. |
| `NAV-04` | Architecture orientation artifact | COSMETIC | automated | no | PASS | PASS | docs/architecture/; an ADR directory |
| `NAV-05` | Public-symbol documentation coverage | COSMETIC | automated | no | PARTIAL | PARTIAL | 177/266 public symbols documented (67%); method: typescript: exported declarations |

### SEC

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `SEC-01` | .env untracked and ignored | BLOCKER | automated | yes | PASS | PASS | no tracked .env and ignore rules cover the shape |
| `SEC-02` | No key-shaped strings in tracked files | BLOCKER | automated | yes | PASS | FAIL | No real key-shaped strings in tracked files; the 8 engine hits are short placeholder literals in unit tests. |
| `SEC-03` | Ignore patterns cover secret shapes | DEGRADER | automated | yes | PASS | PASS | covered: dotenv, dotenv variant, ssh private key, PEM, key, PKCS#12, PFX, keystore, certificate (.crt), certificate (.cer), AWS credentials |

### HYG

| Check | Title | Severity | Method | Scored | Verdict | Engine | Summary |
|---|---|---|---|---|---|---|---|
| `HYG-01` | README present and non-placeholder | COSMETIC | automated | no | PASS | PASS | README.md present and non-placeholder |
| `HYG-02` | CODEOWNERS present | COSMETIC | automated | no | PASS | PASS | CODEOWNERS present at .github/CODEOWNERS |
| `HYG-03` | Pull-request template present | COSMETIC | automated | no | PASS | PASS | pull-request template present at .github/pull_request_template.md |
| `HYG-04` | Issue templates present | COSMETIC | automated | no | PASS | PASS | 2 issue template(s) present |
| `HYG-05` | CONTRIBUTING present | COSMETIC | automated | no | PASS | PASS | CONTRIBUTING present at CONTRIBUTING.md |
| `HYG-06` | SECURITY present | COSMETIC | automated | no | PASS | PASS | SECURITY present at SECURITY.md |
| `HYG-07` | CHANGELOG present and recent | COSMETIC | automated | no | PASS | PASS | CHANGELOG.md last changed 12 day(s) before HEAD |
| `HYG-08` | Release process documented | COSMETIC | automated | no | PASS | PASS | release document present at RELEASE_PROCESS.md |
| `HYG-09` | Dependency update automation configured | COSMETIC | automated | no | PASS | PASS | dependency automation configured at .github/dependabot.yml; covers github-actions, node |
| `HYG-10` | License present | COSMETIC | automated | no | PASS | PASS | license present at LICENSE |
| `HYG-11` | Branch protection declared as code | COSMETIC | automated | no | PASS | PASS | branch protection declared as code at .github/rulesets/dev-protection.json, .github/rulesets/main-protection.json; source-branch check at .github/workflows/enforce-dev-base.yml:25 |

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
