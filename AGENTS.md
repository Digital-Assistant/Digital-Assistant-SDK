# AGENTS.md

## 1. Project Overview

`@digital-assistant/core` is a browser-embedded Digital Assistant (UDA) SDK. It is bundled as UMD/ESM/CJS via webpack and consumed by browser extensions and standalone host apps. In production it runs entirely client-side: it records and replays user click/hover sequences (simulating DOM events, matching clickable nodes), manages a Redux store for recording/flow/validation state, calls backend APIs through a Keycloak-authenticated HTTP client, and renders step tooltips with i18n.

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
- `npm start` — watch build (`--env build=local --mode=development`)
- `npm test` — Jest (jsdom)
- `npm test:watch` — Jest watch mode
- `npm test:coverage` — Jest with coverage (text, lcov, json, html)
- `npm run lint` — ESLint over `src/**/*.ts`
- `npm run format` — Prettier write over `src/**/*.ts`
- `npx tsc --noEmit` — type check (NOTE: no dedicated `typecheck` script exists; use this)

After any code change, run in order: `npm run lint` → `npx tsc --noEmit` → `npm test`. Build (`npm run build`) to verify the bundle compiles.

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

Known hotspots (high fan-in — treat changes here as risky): `store/slices/editableStepFormSlice.saveStateToStorage`, `store/slices/flowSlice.saveStateToStorage`, `services/userService.getUserId`, `util/node/events.trigger`, `services/apiClient.ApiClient.post`, `util/translate/translate`, `util/storage` (`StorageUtil`/`get`/`getBrowserAPI`), `util/translate/translation`.

## 5. Build & Environment Matrix

- Webpack config: `webpack.config.js` (single config, `--env build=<local|development|production|qa>`). Output goes to `dist/` (`index.cjs.js`, `index.esm.js`, `index.d.ts`).
- Environment variables are loaded per env via dotenv-webpack from `environments/` (e.g. `local.env`). No `.env` commit policy — see Security.
- `scripts/postinstall.js` patches `node_modules/domjson/dist/domJSON.js` (adds optional chaining for `window.location`, swaps `setImmediate` → `setTimeout`). This runs on install; if domjson behaviors break, reinstall and re-patch.
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
- **domjson patch**: after `npm install`, `postinstall` rewrites `node_modules/domjson` in place. Re-running install without the patch breaks DOM snapshotting.
- **ESM-only deps**: `parse-domain` and `winston` are mocked in `test/setup.ts` because they break Jest's CommonJS runtime — keep those mocks intact when touching tests.
- **`dist/` is committed**: built artifacts live in the repo; rebuild and include the diff when consumer-facing APIs change.

## 8. Security

- Never log, print, or commit secrets: `.env`, `local.env`, API keys, access tokens, session keys, or Keycloak credentials.
- `.env` exists in the repo root — do not add it to `package.json` `files` or the webpack bundle. Verify no secrets are bundled into `dist/`.
- Auth flows (Keycloak, `jwt-decode`, `AuthManager`) carry bearer tokens through `apiClient` interceptors. Interceptor logic (401 handling, logout) is security-sensitive — changes require review.
- Sanitize user-generated content: recording payloads and step metadata are validated (profanity check via `profanityCheck`) before persistence. Preserve that boundary.

## 9. Workflow

Standard change loop:

1. Locate code with graph tools (`search_graph` → `trace_path` inbound to size the blast radius).
2. Implement the change following section 6 conventions.
3. Run `npm run lint`, then `npx tsc --noEmit`.
4. Add/update colocated unit tests; run `npm test` (targeted: `npm test -- path/to/__tests__`).
5. Run `npm run build` to confirm the bundle compiles.
6. If public exports/`dist/` change, rebuild and commit the `dist/` diff.

## 10. Testing Conventions

- **Discovery**: `testMatch` = `**/src/**/__tests__/**/*.[jt]s?(x)` and `**/src/**/?(*.)+(spec|test).[jt]s?(x)`. Tests live next to the code they cover, inside `__tests__/`.
- **Environment**: `testEnvironment: 'jsdom'`. DOM APIs (`window`, `document`, `Element`) are available but minimal — polyfill in tests when needed.
- **Setup**: `test/setup.ts` runs before all suites. It globally mocks `winston` (prevents ESM/CJS parsing errors + keeps output clean) and `parse-domain` (ESM-only), seeds `window.UDAGlobalConfig`/`udaSpecialNodes`, and polyfills `Element.prototype.scrollTo`. Do not remove these mocks — they are load-bearing.
- **External mocks**: `__mocks__/sweetAlert2.ts` stubs browser alert UI for tests.
- **Mocking libraries**: use `axios-mock-adapter` for `apiClient`/axios HTTP, `redux-mock-store` for testing thunks and slice flows without a real store.
- **Pattern**: one `describe` block per unit, focused `it` cases with arrange/act/assert; export-only functions (RecordService, StepEditingService) are tested via their public names — use the aliased exports where they differ from action names.
- **Coverage**: default off; run `npm run test:coverage` for reports (text/lcov/json/html).
