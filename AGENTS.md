# AGENTS.md

## 1. Project Overview

`@udan/digital-assistant-core` is a browser-embedded Digital Assistant (UDA) SDK. It is bundled as UMD/ESM/CJS via webpack and consumed by browser extensions and standalone host apps. In production it runs entirely client-side: it records and replays user click/hover sequences (simulating DOM events, matching clickable nodes), manages a Redux store for recording/flow/validation state, calls backend APIs through a Keycloak-authenticated HTTP client, and renders step tooltips with i18n.

Stack: TypeScript 4.9 (strict, `allowJs`), Redux Toolkit + redux-thunk, webpack 5 multi-env builds, Jest 30 (jsdom) + ts-jest, ESLint 8 + Prettier, i18next, Keycloak, winston (remote logging).

## 2. Codebase-Memory-MCP Integration

This repo is indexed with codebase-memory-mcp (project: `home-kc-Projects-UDAN-Digital-Assistant-SDK`). ALWAYS prefer graph tools over grep for structural discovery:

1. `search_graph` — find functions, classes, routes, variables by pattern
2. `trace_path` — trace callers/callees (use `direction=inbound` for impact analysis)
3. `get_code_snippet` — read exact source (pass the qualified_name from `search_graph`)
4. `query_graph` — complex multi-hop Cypher patterns (complexity/hot-path queries)
5. `get_architecture` — high-level orientation (packages, hotspots, clusters)

Coverage notes (best-effort, from `index_status`):
- `.env` is `parse_partial` (lines 1–4 may be missing from graph) — grep it for truth.
- `dist/`, `environments/`, `node_modules/`, `.git` are excluded by design — not indexed.
- Fall back to grep for string literals, error messages, config values, and non-code files.
- Absence from index warnings is NOT a completeness guarantee; grep inside flagged ranges when uncertain.

## 3. Commands

Run from repo root.

- `npm run build` — webpack build, `local` env, development mode
- `npm run build:dev` / `build:qa` / `build:prod` — per-environment builds
- `npm run build:full` — remove `dist/` then build
- `npm start` — watch build (`--env build=local --mode=development`)
- `npm test` — Jest (jsdom)
- `npm run test:watch` — Jest watch mode
- `npm test:coverage` — Jest with coverage (text, lcov, json, html)
- `npm run lint` — ESLint over `src/**/*.ts`
- `npm run format` — Prettier write over `src/**/*.ts`
- `npm run format:check` — Prettier check (verify only, no writes)
- `npm run typecheck` — `tsc --noEmit`
- `npm run check` — `format:check` → `typecheck` → `test` (full local gate)
- `npm run security` — `npm audit` gate: production deps at `high` + `critical` anywhere (dev-only toolchain advisories are reported but non-blocking)
- `npm run clean` — remove `dist/`
- `npm run env:generate` — generate `environments/<BUILD_ENV>.env` from env vars (`scripts/generate-env.mjs`, default `local`; `--force` to overwrite)
- `npm run git:clean:dry` — list local branches whose upstream is gone (safe default, deletes nothing)
- `npm run git:clean` — delete those stale branches (`scripts/git-branch-janitor.mjs --apply`)

After any code change, run `npm run check` (or the individual gates) and `npm run build` to verify the bundle compiles. `dist/` is generated in CI and is **not** committed.

## 4. Architecture Map

Entry point `src/index.ts` bootstraps everything and exposes the public surface: `DigitalAssistantCore` class, `DigitalAssistantConfiguration`, `AppConfig`, `CustomConfig`, `AuthConfig`/`AuthDataConfig`, `store`, slices, selectors, services, configs, models, and utils. It also attaches `UDAPluginSDK`/`UDAGlobalConfig`/`UDAAuthConfig`/`UDAAuthDataConfig` to `window`/`global`.

| Directory | Responsibility |
|---|---|
| `src/services/` | API layer + business logic: `apiClient` (axios + Keycloak interceptors), `RecordService`, `SearchService`, `StepEditingService`, `AuthManager`, `TranslateService`, `ErrorLoggerService`, `trackingService`, `userService`, `UserVote` |
| `src/store/` | Redux store + slices (`flow`, `recording`, `editableStepForm`, `editing`, `user`, `validation`, `notification`) + selectors. Single exported `store` instance |
| `src/util/` | Framework-agnostic helpers. Core DOM-matching engine under `util/node/` (`checkNode`, `searchNodes`, `isClickableNode`, `getClickedInputLabels`, `events`, `getNodeInfo`, …); `util/browser/`, `util/screen/`, `util/storage.ts`, `util/translate/` (i18n), `util/playback/` (PlaybackService), `util/recording/`, `util/validation/` |
| `src/config/` | `AppConfig`, `CustomConfig`, `constants.ts` (incl. `Environment`, `enableNodeTypeSelection`), `endpoints.ts` |
| `src/models/` | `AuthData`, `CSPData`, `UDASessionData` |
| `src/types/` | Global ambient type declarations (`domjson.d.ts`) |
| `artefacts/` | Untracked scratch space for agents and developers (plans, handoff notes, reports). Gitignored in full — never commit its contents or link to it from tracked files |

Known hotspots (high fan-in — treat changes here as risky): `store/slices/editableStepFormSlice.saveStateToStorage`, `store/slices/flowSlice.saveStateToStorage`, `services/userService.getUserId`, `util/node/events.trigger`, `services/apiClient.ApiClient.post`, `util/translate/translate`, `util/storage` (`StorageUtil`/`get`/`getBrowserAPI`), `util/translate/translation`.

## 5. Build & Environment Matrix

- Webpack config: `webpack.config.js` (single config, `--env build=<local|development|production|qa>`). Output goes to `dist/` (`index.cjs.js`, `index.esm.js`, `index.d.ts`).
- Environment variables are loaded per env via dotenv-webpack from `environments/<env>.env` (gitignored). `environments/local.env.example` is the committed schema; it activates dotenv-webpack `safe` mode, so every key it declares must be present in `<env>.env` (empty values are allowed). Local dev copies the example to `local.env`; CI generates `local.env` via `npm run env:generate` from environment variables.
- `scripts/postinstall.js` patches `node_modules/domjson/dist/domJSON.js` (adds optional chaining for `window.location`, swaps `setImmediate` → `setTimeout`). It runs via the `prepare` script (local `npm install`/`npm ci` and before `npm pack`/`npm publish`), never in consumer installs; if domjson behaviors break, reinstall and re-patch.
- `axios` is a peer dependency (`^1.0.0`) — host app must provide it.
- Browser polyfills (assert, browserify-zlib, os, path, stream, url, process) are wired through webpack for browser builds.

## 6. Conventions

- **Code style**: Prettier + ESLint (`eslint-plugin-prettier`) over `src/**/*.ts` only. 4-space indentation. No comments unless they explain non-obvious logic — prefer self-documenting code.
- **TypeScript**: `strict: true`. Prefer interfaces; `allowJs` is on, so some `.js` exists. Avoid `any` except at deliberate boundaries (DOM/extension interop, e.g. `(window as any)`).
- **Testing**: unit tests colocated in `src/**/__tests__/*.test.ts` (see Testing Conventions).
- **Redux**: per-domain slices in `src/store/slices/`, exported barrel `index.ts`, colocated selectors. Async via redux-thunk. Slice state persisted via `saveStateToStorage`/load helpers in `util/storage`.
- **Services**: `RecordService` and `StepEditingService` export standalone functions (not classes) re-exported from `services/index.ts`; aliased names avoid collisions with Redux action names (e.g. `updateStepNameService`, `updateCustomMetadataService`).
- **Event handling**: DOM-level event emitter pattern in `util/node/events` — central trigger for node interactions.
- **i18n**: all UI strings go through `translate` (from `util/translate/translation`), never hardcoded.

## 7. Gotchas & Footguns

- **Browser-only code**: `src/index.ts` guards `window`/`global`, but many utils assume a DOM. Run code paths through jest/jsdom tests; Node-only execution will crash.
- **`RecordService` gating flags**: recording behavior is gated by config flags (`enableRecording`, `enableSlowReplay`, `enableNodeTypeSelection`). A flag being off is the usual cause of "missing" behavior — check the constants/config before assuming a bug.
- **Circular references**: `util/node/removeCircularReference` strips circular structures before serialization; payloads that fail `JSON.stringify` usually bypassed this.
- **Click-node matching**: `checkNode`/`isClickableNode`/`processDistanceOfNodes` implement the core "did the user click the right element" logic. Small changes ripple into recording validation and playback — test `searchNodes`/`recordSequence` thoroughly.
- **Redux singleton**: `src/store` is a single global store instance; consumers interact via `DigitalAssistantCore.dispatch/getState/getSliceState`, not by creating new stores.
- **domjson patch**: after `npm install`, the `prepare` script rewrites `node_modules/domjson` in place. Re-running install without the patch breaks DOM snapshotting.
- **ESM-only deps**: `parse-domain` and `winston` are mocked in `test/setup.ts` because they break Jest's CommonJS runtime — keep those mocks intact when touching tests.
- **`dist/` is untracked**: build output is gitignored and generated in CI (`npm run build`); never commit it. Rebuild locally to verify the bundle compiles.

## 8. Security

- Never log, print, or commit secrets: `.env`, `local.env`, API keys, access tokens, session keys, or Keycloak credentials.
- All `environments/*.env` files and the root `.env` are gitignored; `environments/local.env.example` is the only committed env file and must contain no real values.
- **Rotate credentials that were previously committed** (the old `environments/local.env` is in git history). Untracking a file does not remove it from history, so exposed values must be rotated.
- **Build-time leakage**: `process.env.*` values referenced in `src/` are inlined into the browser bundle by dotenv-webpack. Treat every value in `environments/*.env` (and every CI-provided value) as public. Moving secret-bearing config to runtime host-provided config is a tracked follow-up.
- `.env` exists in the repo root — do not add it to `package.json` `files` or the webpack bundle. Verify no secrets are bundled into `dist/`.
- Auth flows (Keycloak, `jwt-decode`, `AuthManager`) carry bearer tokens through `apiClient` interceptors. Interceptor logic (401 handling, logout) is security-sensitive — changes require review.
- Sanitize user-generated content: recording payloads and step metadata are validated (profanity check via `profanityCheck`) before persistence. Preserve that boundary.

## 9. Workflow

Standard change loop:

1. Locate code with graph tools (`search_graph` → `trace_path` inbound to size the blast radius).
2. Implement the change following section 6 conventions.
3. Run `npm run check` (format + typecheck + tests); fix any regressions.
4. Add/update colocated unit tests; run `npm test` (targeted: `npm test -- path/to/__tests__`).
5. Run `npm run build` to confirm the bundle compiles.
6. Public API changes ship through the release pipeline — `dist/` is built in CI and never committed (see § 7).

## 10. Testing Conventions

- **Discovery**: `testMatch` = `**/src/**/__tests__/**/*.[jt]s?(x)` and `**/src/**/?(*.)+(spec|test).[jt]s?(x)`. Tests live next to the code they cover, inside `__tests__/`.
- **Environment**: `testEnvironment: 'jsdom'`. DOM APIs (`window`, `document`, `Element`) are available but minimal — polyfill in tests when needed.
- **Setup**: `test/setup.ts` runs before all suites. It globally mocks `winston` (prevents ESM/CJS parsing errors + keeps output clean) and `parse-domain` (ESM-only), seeds `window.UDAGlobalConfig`/`udaSpecialNodes`, and polyfills `Element.prototype.scrollTo`. Do not remove these mocks — they are load-bearing.
- **External mocks**: `__mocks__/sweetAlert2.ts` stubs browser alert UI for tests.
- **Mocking libraries**: use `axios-mock-adapter` for `apiClient`/axios HTTP, `redux-mock-store` for testing thunks and slice flows without a real store.
- **Pattern**: one `describe` block per unit, focused `it` cases with arrange/act/assert; export-only functions (RecordService, StepEditingService) are tested via their public names — use the aliased exports where they differ from action names.
- **Coverage**: default off; run `npm run test:coverage` for reports (text/lcov/json/html).

## 11. CI, Commit Conventions & Release Lifecycle

**Commit format:** all commits MUST follow the Conventional Commits specification
(`<type>(<scope>): <description>`). Release Please derives versions and the `CHANGELOG.md`
from these prefixes:
- `feat:` → MINOR bump
- `fix:` → PATCH bump
- `feat!:` / `fix!:` → MAJOR bump (breaking change)
- `chore:`, `docs:`, `test:`, `refactor:` → no bump, still recorded

**Branch strategy** (`feature → dev → qa → main`):
- All work happens on feature branches and is PR'd into `dev`. Never commit directly to `dev`, `qa`, or `main`.
- `dev` is the integration branch — all feature/fix work lands here first.
- `qa` is the integration/pre-release testing branch (see `build:qa`); it accepts PRs **only from `dev`**.
- `main` is production and contains only released code; it accepts PRs **only from `qa`** (plus automated `release-please--*` release PRs).
- Source-branch rules are enforced by `.github/workflows/enforce-dev-base.yml` (`Check source branch`).
- `main`, `dev`, and `qa` are protected by repository rulesets — changes arrive only via PR (no direct pushes, no force-push, no deletion).

**Gate status** (all gates are blocking in CI):

| Gate | Workflow | Status |
|---|---|---|
| `npm run typecheck` | CI | **Blocking** |
| `npm run format:check` | CI | **Blocking** |
| `npm run lint` | CI | **Blocking** (legacy debt reported as warnings) |
| `npm test` | CI | **Blocking** |
| `npm run build` | CI (after `env:generate`) | **Blocking** |
| `npm run security` | Security Audit | **Blocking** (production deps at `high`; `critical` anywhere) |

**Known lint debt:** the ESLint config downgrades `no-explicit-any`,
`no-unused-vars`, `ban-ts-comment`, `ban-types`, `no-var-requires`, `no-var`, and
`prefer-const` to warnings. These surface 600+ warnings across the legacy codebase;
formatting (`prettier/prettier`) remains an error. Gradual cleanup is a tracked
follow-up.

**Known audit debt:** `npm audit` reports dev-only toolchain advisories (chiefly
`braces`/`micromatch`, which currently have no patched release). The `security` gate
therefore enforces production dependencies at `high` severity plus `critical` anywhere.

**Release lifecycle:** version bumps, changelog generation, GitHub Releases, and the
`main` → `dev` back-merge are automated via `.github/workflows/release-and-sync.yml`
(npm publishing is currently disabled; the package is `@udan/digital-assistant-core`).
Release Please and the back-merge job open PRs with a GitHub App token
(`vars.RELEASE_APP_ID`, `secrets.RELEASE_APP_PRIVATE_KEY`) so CI runs on them. **See `RELEASE_PROCESS.md` for the full step-by-step
release lifecycle, ruleset setup, branch hygiene, and the security/rotation notes.**
