# 0001. Keep build-time configuration public

## Context

The SDK runs in the browser: in host pages and in the browser extension's background worker. webpack inlines every
`process.env.<KEY>` that `src/` reads into the bundle (`webpack.config.js`, `dotenv-webpack`). Anything set at build
time is therefore readable by anyone who loads the bundle. One published package serves both the TEST and the PROD
backends.

## Decision

1. `environments/local.env.example` is the key schema. dotenv-webpack runs in `safe` mode, so every key in it must be
   present in `environments/<env>.env`. Empty values are allowed.
2. The schema holds public keys only: backend, token, LLM and Keycloak URLs, the profanity and translation
   endpoints, and the log-level defaults. Secret keys are never in it. `scripts/ci/check-build-env.mjs` fails the
   build when a secret key has a value or appears in `dist/`.
3. CI writes `environments/<env>.env` from environment variables with `npm run env:generate`
   (`scripts/generate-env.mjs`). Local development copies the example to `environments/local.env`.
4. One build serves TEST and PROD. `src/config/environment.ts` reads `globalThis.UDAGlobalConfig` on every call.
   An explicit page key (`apiBaseUrl`, `tokenUrl`, `llmUrl`, `keycloakUrl`) wins. Otherwise the build default for
   `environment` applies, and `PROD` is the default environment.
5. A page supplies its own realm and client ID at runtime. They have no build default.

Rationale beyond the public-bundle constraint: not recorded; owner to fill in.

## Alternatives Considered

| Alternative | Why it is rejected |
| --- | --- |
| Secrets in the build env | Every value is inlined into a public bundle |
| One build per backend environment | Rationale not recorded; owner to fill in. The current build serves both |

## Consequences

### Positive

- No secret can reach `dist/` without failing `check-build-env.mjs`.
- One tarball is tested and published for both backends.

### Negative / Trade-offs

- Adding a build key means editing the schema, the CI variables and `generate-env.mjs` input together.
- A host page must set the realm and client ID, or every request is rejected.
