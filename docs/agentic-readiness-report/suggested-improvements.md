# Suggested improvements

## A. Audit recipe, framework and tools
1. **Probes against a clone are not possible with the current tools.** `engine.py` runs verbs only on the target path, and `report.py import-engine` rejects an engine report from a different path (`report.py` ~548-558, "the engine report is not of this draft's target"). Intakes that want "probe a disposable clone, never the real repo" cannot be honoured; this run skipped probes (TST-02 UNKNOWN). Suggest `engine.py --probe-root <clone>` (scan the target, run verbs in the clone, record both paths).
2. **SEC-02 test-fixture false positives.** Four BLOCKER findings (F-004..F-007) are mock labels in `__tests__` (`'test-api-key'`, `'secret-token'`). The check file already names this case in its Engine field, so the engine could downgrade keyword-pattern hits in test paths to a lower severity or a `needs-review` flag instead of 4 BLOCKERs that force 4 interactive decisions. Also one finding per file inflates counts (4 findings for 1 root cause).
3. **CI-03 false positives on `echo` text.** `echo "| npm integrity | ..."` and echoed Markdown containing backticked `npm dist-tag add` were parsed as commands (F-014..F-017, `ci.yml:243`, `release-and-sync.yml:201,315,319`). The scanner should skip `echo`/`printf` lines and Markdown inside `$GITHUB_STEP_SUMMARY` writes.
4. **Dispute workflow conflicts with the "no set-disposition" split.** Overriding a pending finding to PASS requires `set-disposition rejected` first, so a background run that stops before Stage 4 cannot dispute engine false positives (SEC-02, CI-03). Allow a `proposed_disposition`/note on a finding, or let `add-check` record an unconfirmed dispute.
5. **Shape of `add-check` errors is learned by failing.** `index_query` evidence needs `index_tool`, while an agent-captured item must not carry `tool`; this is only in the error text. Put an evidence example per kind in the `add-check` section of `docs/reference/tools-cli.md`.
6. **Empty engine summaries.** AGT-01, AGT-10 return `summary: ""` and no evidence for PASS BLOCKER/DEGRADER, so a Stage-2 verifier has nothing to check against. Engine should state what it matched.
7. **CON-01 PASS is loose.** It passes on file/paths in prose under `## 8. Security` (secrets guidance); there is no allow/deny artifact. Count a section only when it contains an imperative prohibition list, or report PARTIAL.
8. **IDX-01 registration source.** Only `~/.config/opencode/opencode.jsonc` was reported for a Claude Code run; the engine should also read `~/.claude.json` / project `.mcp.json`, or say which harness configs it looked at.
9. **`detect_changes` without `base_branch` errors** ("base_branch or HEAD is not a commit") on this repo; IDX-03 text should say to pass the default branch.
10. **Duplicate-root-cause findings.** DOC-01/02/04 + NAV-04 (no `docs/`) and BASE-01/02/03 (no baseline) each score one gap several times. Stage 3 asks for this review, but a grouping key in the report would help batch dispositions.
11. **NAV-03 flags `package-lock.json` as oversized.** Lockfiles should be exempt.
12. **Partial-ecosystem facts.** `facts.json` reports ecosystem `node` only; TypeScript is not surfaced (the profile is chosen from `node`). Add `languages`.
13. Hint: the pending list in `status` truncates at 8 (27 omitted); a `--all` flag would avoid reading the draft JSON.

## B. Project improvements not captured as findings
- Fix AGENTS.md: `npm test:coverage` to `npm run test:coverage`; `__mocks__/sweetAlert2.ts` to `sweetalert2.ts` (captured only as F-035 detail).
- Add `CLAUDE.md` (`@AGENTS.md` stub) in this repo so Claude Code started here loads the rules (F-023 covers it).
- Document `UDA_LOG_LEVEL` and the odd `UDA_LOG_LEVELNumber` (probably a typo for a numeric level) in `environments/local.env.example` or rename; they are read at runtime in `src/util/error/error-log.ts` but inlined at build time by dotenv-webpack only if defined.
- Add `LICENSE` (package.json says ISC; public npm package).
- Lint debt: AGENTS.md states 600+ warnings; record `eslint --max-warnings <N>` as a ratchet to close BASE-01..03 cheaply.
- Add `.env.*` to `.gitignore`, and name `test/` plus a "never weaken tests" rule in the AGENTS.md prohibitions.
- A working-tree `.env` at the repo root (ignored) is referenced by AGENTS.md; confirm it holds no secrets, since the build inlines env values into a public bundle. Not opened by this audit.

---
## Notes from landing and Stage 4 (parent session)
- Probes (format:check, lint, typecheck, test) could not run on any repo: `engine.py` runs verbs only against the audited path, and `report.py import-engine` refuses a report whose target differs from the draft's, so a disposable clone cannot be probed. The owner's "disposable worktree" intent is not achievable with the current tools.
- Stage 4 cannot be done before Stage 3 ends if an engine false positive must be disputed: `add-check` to PASS needs the finding rejected first, which needs the owner. A recipe step for "queue disputes" would help background sessions.
- CI gating of this docs landing: all four repos' CI already has a job-level docs-only skip so the required `CI Gate` still reports; `[skip ci]` in a commit would leave the required check pending and block the PR, so it was not used. Gaps: SDK's skip list allows only `*.md`, `artefacts/**`, `LICENSE`, `CHANGELOG.md` (the `.json` report triggers the full gate); Server's `ci.yml` has no docs-only skip. Consider adding `docs/agentic-readiness-report/**` to those filters.
- Owner decisions that differ across repos for the same pattern (CLAUDE.md pointer: rejected in Client and microServices, confirmed in Server) were taken per repo at Stage 4; the engine could not distinguish an `@AGENTS.md` import stub from a shadowing file.
- microServices: owner rejected F-046/F-047 (tracked `environments/local.env` files are intentional for local developer setup). The audit did not verify whether any value in them is live.
