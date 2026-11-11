# 0003. Authenticate with Keycloak or a host-provided token

## Context

The SDK calls the backend with a bearer token. It runs in two kinds of host. A web page can sign the user in with
Keycloak. The browser extension's background worker runs its own sign-in and has no `window`.

## Decision

1. `src/services/apiClient.ts` attaches `Authorization: Bearer <token>` in its request interceptor. A token handed in
   by the host with `setAuthToken` (`src/services/hostAuthToken.ts`) beats every token stored in the Redux store.
2. The host token lives in module state, never in the store or in browser storage. The host renews it by calling
   `setAuthToken` again before `expiresAt`, or by registering a renewer with `setAuthTokenRenewer`.
3. Keycloak sign-in uses `keycloak-js` with `onLoad: 'check-sso'` (`src/services/AuthManager.ts`). It runs in the
   host page only when `enableKeycloakSso` is on, and never after the host passed a token with `setAuthToken`.
4. Every request also carries the `UDAN-Realm` header. A request without a realm and a client ID is rejected before it
   is sent.
5. `CustomConfig.clientSecret` is optional and deprecated. The token request carries it only when it is set.
6. Changes to the interceptor, to 401 handling or to logout need review (`AGENTS.md`, section 8).

Rationale for the precedence order: not recorded; owner to fill in.

## Alternatives Considered

| Alternative | Why it is rejected |
| --- | --- |
| Keycloak only | The extension's background worker has no page to run `check-sso` in |
| Store the host token in Redux | The store is persisted to browser storage; the token must not be |

## Consequences

### Positive

- The extension and web pages share one API client.
- The SDK never persists a host token.

### Negative / Trade-offs

- Two token sources make 401 handling harder to reason about; test both paths.
