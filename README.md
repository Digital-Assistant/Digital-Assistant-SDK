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

## Releases

Releases are automated with Release Please from Conventional Commits, flowing `dev` → `main`.
See [`RELEASE_PROCESS.md`](RELEASE_PROCESS.md).

## Repository layout notes

- `dist/` is build output, generated in CI and never committed.
- `artefacts/` is an untracked scratch directory for agents and developers (plans, handoff notes,
  reports). Everything in it is gitignored; nothing there is part of the project.
