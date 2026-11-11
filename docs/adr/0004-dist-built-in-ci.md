# 0004. Build `dist/` in CI only

## Context

The package entry points (`main`, `module`, `types` and `exports` in `package.json`) all point into `dist/`.
`dist/` is build output from `webpack.config.js`, and its content depends on the build environment
([ADR 0001](0001-public-build-time-config.md)).

## Decision

1. `dist/` is git-ignored and never committed. Build it locally with `npm run build` to check that it compiles.
2. CI builds and packs the tarball in `.github/workflows/ci.yml` and keeps it as the `sdk-tarball` artifact.
3. A release builds and packs the tarball once, in the `pack` job of `.github/workflows/release-and-sync.yml`. The
   same file is attached to the GitHub release and published to npm.
4. `scripts/ci/pack-check.sh <package.tgz>` checks that tarball without rebuilding: the file list, the env check
   against the unpacked `dist/`, `publint`, `@arethetypeswrong/cli`, and an ESM `import` and a CJS `require`.

Rationale beyond reproducible releases: not recorded; owner to fill in.

## Alternatives Considered

| Alternative | Why it is rejected |
| --- | --- |
| Commit `dist/` | A stale or locally built bundle could ship, and diffs would carry generated code |
| Rebuild for each release step | The published file could differ from the one that was checked |

## Consequences

### Positive

- The published tarball is the file that was checked.

### Negative / Trade-offs

- Consumers cannot install from a git URL; they install the npm package.
