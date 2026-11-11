# 0002. Squash into dev, merge dev into main, release with release-please

## Context

Release Please derives the version and `CHANGELOG.md` from Conventional Commits subjects. The SDK is published to npm
as `@udan/digital-assistant-sdk`, and a client tests each release before it becomes `latest`. The full procedure is in
[`RELEASE_PROCESS.md`](../../RELEASE_PROCESS.md).

## Decision

1. `dev` is the integration branch and the repository's default branch. All work happens on short branches named
   `<type>/<topic>` and reaches `dev` through a pull request and the merge queue.
2. Pull requests into `dev` are squash-merged, so the pull request title becomes the commit on `dev`. The title,
   every commit subject (`commitlint.config.mjs`) and the CI `Commit Subjects` job use one type list.
3. `main` holds released code only. It accepts pull requests from `dev` and from `release-please--*` branches
   (`.github/workflows/enforce-dev-base.yml`). `dev` to `main` is a merge commit, because Release Please needs the
   individual conventional commits.
4. Rulesets protect `dev` and `main`: no direct push, no force-push, no deletion.
5. On a push to `main`, `.github/workflows/release-and-sync.yml` runs Release Please. A release builds and packs the
   tarball once, attaches it to the GitHub release and stages it on npm as `next`. `latest` moves after a client
   TEST pass. A back-merge pull request brings `main` into `dev`.

## Alternatives Considered

| Alternative | Why it is rejected |
| --- | --- |
| Trunk-based development | Planned, see `RELEASE_PROCESS.md`, Future Plans. Not adopted yet |
| Squash `dev` into `main` | Release Please would see one commit and lose the per-change entries |
| `main` as the default branch | Clones, new pull requests and Dependabot security updates would start from released code |

## Consequences

### Positive

- `dev` has one revertible commit per pull request.
- Release notes come from the commit subjects, with no hand-written changelog.

### Negative / Trade-offs

- Stacked branches conflict after each squash merge and need a rebase before the next merge.
- `main` and `dev` differ until the back-merge pull request is merged.
