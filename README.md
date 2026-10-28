# @udan/digital-assistant-sdk

Core SDK for the Digital Assistant (UDA): a browser-embedded library that records and replays user
click/hover sequences, manages recording/playback state in a Redux store, and talks to the UDA backend
through a Keycloak-authenticated HTTP client. It is built with webpack as ESM and CommonJS bundles
and consumed by browser extensions and host web apps.

## Development

Requires Node.js 22+.

```bash
npm ci
cp environments/local.env.example environments/local.env   # fill in values
npm run check   # format check, type check, tests
npm run lint
npm run build   # output in dist/ (not committed)
```

See [`AGENTS.md`](AGENTS.md) for the full command list, architecture, and conventions.

## Using the SDK

- [`USAGE.md`](USAGE.md): installing, the runtime keys (`environment`, `apiBaseUrl`, `realm`, ...), precedence, the host-page script tags and load order, and the `UDASdkReady` rule for pages that talk to the browser extension.
- [`sample/index.html`](sample/index.html): a runnable host page.
- The Chrome extension that embeds this SDK lives in the `Digital_Assistant_Client` repository; its README explains how TEST and PROD are chosen at runtime.

## Releases

Releases are automated with Release Please from Conventional Commits, flowing `dev` → `main`.
See [`RELEASE_PROCESS.md`](RELEASE_PROCESS.md). A release is packed once in CI, published to npm under the `next` tag and moved to `latest` by a maintainer only after the Client has passed a TEST deploy ("Promotion and rollback" in that file).

## Repository layout notes

- `dist/` is build output, generated in CI and never committed.
- `artefacts/` is an untracked scratch directory for agents and developers (plans, handoff notes,
  reports). Everything in it is gitignored; nothing there is part of the project.
