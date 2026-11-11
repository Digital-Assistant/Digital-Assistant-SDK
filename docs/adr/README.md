# Architecture decision records

Each record states one current decision about this SDK. How to add, change or delete one:
[`ADR_POLICY.md`](../ADR_POLICY.md).

| Number | Title | Summary |
|---|---|---|
| [0000](0000-template.md) | Template | The four sections every record has. Copy it for a new record |
| [0001](0001-public-build-time-config.md) | Keep build-time configuration public | The env schema holds public keys only; values are inlined into the bundle; TEST or PROD is picked at runtime |
| [0002](0002-branch-and-release-model.md) | Squash into dev, merge dev into main, release with release-please | `dev` is the default branch; `main` takes promotions; one tarball is staged on npm `next` |
| [0003](0003-authentication.md) | Authenticate with Keycloak or a host-provided token | A token from `setAuthToken` beats every stored token; Keycloak SSO is opt-in |
| [0004](0004-dist-built-in-ci.md) | Build `dist/` in CI only | `dist/` is never committed; each release packs one tarball and checks it |
