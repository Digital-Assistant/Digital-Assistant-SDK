# Release Process

This project uses a GitFlow-inspired branching strategy combined with automated releases.

- `main` is the production branch. It contains only released code.
- `dev` is the active development branch — all feature/fix work is PR'd into it.
- `qa` is the integration / pre-release testing branch (see `build:qa`). It receives `dev`
  for verification before a release is staged; it accepts PRs **only from `dev`**.
- `main` accepts PRs **only from `qa`** (plus automated `release-please--*` release PRs).
- CI (`ci.yml`) guards every push/PR to `main`, `dev`, and `qa` — typecheck, format, lint,
  tests, and build are all blocking.
- Release automation (`release-and-sync.yml`) handles version bumps, changelog generation,
  GitHub releases, the back-merge to `dev`, and publishing to npm
  (`@udan/digital-assistant-sdk`, staged for maintainer approval).
- Source branches are enforced by `enforce-dev-base.yml` (`Check source branch`): `qa` only
  accepts `dev`, and `main` only accepts `qa` (or `release-please--*`).
- `main`, `dev`, and `qa` are protected by **repository rulesets** — every change must arrive via
  a PR (see [Branch Protection](#branch-protection-repository-rulesets)).
- Stale branches are pruned automatically by the local janitor, `npm run git:clean`
  (see [Branch Hygiene & Automated Cleanup](#branch-hygiene--automated-cleanup)).

> **One-time prerequisite:** set the repository **default branch to `main`** (it was previously
> `dev`). See [Repository Setup](#repository-setup) below.

## The Step-by-Step Release Process

1. **Develop:** All features and fixes are PR'd into `dev`.
2. **Verify on QA:** When ready to release, a maintainer opens a PR from `dev` to `qa` and
   merges it after CI passes. `qa` performs pre-release verification (`build:qa`).
3. **Promote to Main:** Once `qa` verification passes, a maintainer opens a PR from `qa` to
   `main` and merges it. (`main` accepts PRs only from `qa`.)
4. **Release Please:** GitHub Actions automatically opens a new "Release PR" against `main`.
   This PR contains the version bump (in `package.json`) and the updated `CHANGELOG.md`.
5. **Publish GitHub Release:** The maintainer reviews and merges the Release PR. The GitHub
   Release is automatically published.
   > The `publish` job then uploads the release to npm as a **staged** version. A maintainer
   > approves it on npmjs.com (passkey/2FA) before it goes live. See
   > [npm Publishing](#npm-publishing).
6. **⚠️ THE BACK-MERGE (DO NOT FORGET):** Because Release Please updated the version and
   changelog directly on `main`, `main` is now exactly one commit ahead of `dev`.
   **You MUST immediately back-merge `main` into `dev`** or merge the automated PR from
   `main` to `dev` (created by the `back-merge` job). If this is skipped, the next release
   will result in severe Git merge conflicts on `package.json` and `CHANGELOG.md`.
   > **Note:** post-release sync is `main → dev` only. `qa` intentionally lags `main` by the
   > release commit until the next `dev → qa` promotion carries it forward. This does not cause
   > conflicts because `qa` is a strict downstream of `dev`.

> **Note on versioning:** Release Please determines the next version from your commit
> messages (Conventional Commits — see `AGENTS.md` § 11). To lock a version instead of
> bumping it (e.g. keep `1.0.x` instead of `1.1.0`), edit the Release PR title and
> `package.json` inside the PR before merging; Release Please respects the override.

## Gate Status

All gates are blocking in CI:

| Gate | Workflow step | Status |
|---|---|---|
| `npm run typecheck` | CI | **Blocking** |
| `npm run format:check` | CI | **Blocking** |
| `npm run lint` | CI | **Blocking** (legacy debt reported as warnings) |
| `npm test` | CI | **Blocking** |
| `npm run build` | CI (after `env:generate`) | **Blocking** |
| `npm run security` | Security Audit | **Blocking** (production deps at `high`; `critical` anywhere) |

The `lint` gate passes while reporting pre-existing `no-explicit-any`/unused-var/
`@ts-ignore` debt as warnings; formatting is enforced as an error. The `security`
gate enforces production dependencies at `high` (currently 0) plus `critical`
anywhere (currently 0); dev-only toolchain advisories (chiefly `braces`/`micromatch`,
which have no patched release) are reported but do not block.

## Repository Setup

One-time settings, applied via `gh api` (or the GitHub UI):

```bash
# Use 'main' as the default branch (it was previously 'dev').
gh api -X PATCH repos/Digital-Assistant/Digital-Assistant-SDK \
  -f default_branch=main

# Delete PR head branches automatically once merged.
gh api -X PATCH repos/Digital-Assistant/Digital-Assistant-SDK \
  -f delete_branch_on_merge=true
```

### Release App (CI on bot-opened PRs)

PRs opened with the default `GITHUB_TOKEN` don't trigger workflows, so required checks
never report on them. `release-and-sync.yml` therefore opens the Release PR and the
back-merge PR with a GitHub App installation token
(`actions/create-github-app-token`). One-time setup:

1. Create a GitHub App in the `Digital-Assistant` org (webhook disabled) with repository
   permissions **Contents: Read and write**, **Pull requests: Read and write**, and
   **Issues: Read and write** (Release Please manages the `autorelease` labels).
2. Install it on `Digital-Assistant-SDK` only.
3. Store the App ID as repository variable `RELEASE_APP_ID` and a generated private key
   as repository secret `RELEASE_APP_PRIVATE_KEY`.

Without these, the release workflow fails on `main`.

## Branch Protection (Repository Rulesets)

`main`, `dev`, and `qa` are protected by **repository rulesets** (the modern successor to
classic branch protection). Configured with no bypass actors, direct pushes, force-pushes, and
branch deletion are blocked for everyone, including maintainers.

| Ruleset | Targets | Rules |
|---|---|---|
| `Protect main branch` | `refs/heads/main` | require PR, block deletion, block force-push, require status checks (`Check source branch`, `Build, Check, and Verify (ubuntu-latest)`, `(macos-latest)`, `(windows-latest)`, `Dependency Audit`) |
| `Protect dev branch` | `refs/heads/dev` | require PR, block deletion, block force-push, require status checks (`Build, Check, and Verify (ubuntu-latest)`, `(macos-latest)`, `(windows-latest)`, `Dependency Audit`) |
| `Protect qa branch` | `refs/heads/qa` | require PR, block deletion, block force-push, require status checks (`Check source branch`, `Build, Check, and Verify (ubuntu-latest)`, `(macos-latest)`, `(windows-latest)`, `Dependency Audit`) |

Consequences:

- **Every change to `main`, `dev`, or `qa` must arrive via a pull request.** `required_approving_review_count`
  is `0`, so a PR is required but a human approval is not.
- **Source-branch restrictions** are enforced by the `Check source branch` status (emitted by
  `.github/workflows/enforce-dev-base.yml`): `qa` only accepts `dev`; `main` only accepts `qa`
  or `release-please--*`. Rulesets cannot express source-branch rules themselves.
- Merges must pass CI: `Build, Check, and Verify` on `ubuntu-latest`, `macos-latest`, and
  `windows-latest`, plus `Dependency Audit` (all gates block).
- `strict_required_status_checks_policy` is `false` — a PR branch does not need to be up to
  date with the base branch before merging.

> These rules are the enforcement behind the convention "never commit directly to `main`, `dev`,
> or `qa`" (`AGENTS.md` § 11). They are configured on GitHub
> (**Settings → Rules → Rulesets**), not in repository files. Example creation via `gh api`:
>
> ```bash
> gh api -X POST repos/Digital-Assistant/Digital-Assistant-SDK/rulesets \
>   --input protect-main.ruleset.json
> ```
>
> where `protect-main.ruleset.json` includes `target` `branch`, the `refs/heads/main`
> include pattern, and the desired `rules` (pull request, deletion, non-fast-forward,
> required status checks).

## Branch Hygiene & Automated Cleanup

Feature, release, and back-merge PRs leave head branches behind after merge. This section
keeps local and remote branches at the clean state (`main`, `dev`, `qa`).

### 1. Delete remote head branches automatically (one-time GitHub setting)

Enable **"Automatically delete head branches"** in
`Settings → General → Pull Requests`, or set it via the API:

```bash
gh api -X PATCH repos/Digital-Assistant/Digital-Assistant-SDK \
  -f delete_branch_on_merge=true
```

GitHub then deletes a PR's head branch the moment it is merged. Release Please PRs
(`release-please--...`) are covered by this; the back-merge PR uses `main` as its head, so it
creates no transient branch to delete (`main` is never deleted — it is the default branch).

### 2. Prune remote-tracking references locally

```bash
git config --global fetch.prune true   # or drop --global for this repo only
```

Every `git fetch`/`git pull` then marks deleted remotes as `[gone]` instead of leaving
stale `origin/<branch>` pointers.

### 3. Delete stale local branches (`npm run git:clean`)

The janitor (`scripts/git-branch-janitor.mjs`) is a cross-platform Node ESM script — no build
step required. It deletes local branches whose upstream is gone, without touching `main`,
`dev`, or the current branch.

```bash
npm run git:clean:dry   # dry run — list what would be deleted (safe default)
npm run git:clean       # delete stale branches
```

Options: pass `--protected=main,dev,qa,release` to override the protected allowlist.

> **Why `-D` and not `-d`:** squash-merges make `git branch -d` refuse to delete a branch
> (it cannot see the merge), so the janitor force-deletes. It only targets branches whose
> upstream is already gone; a purely local branch with no upstream is never touched.

### 4. Keep `main` synced locally

```bash
git fetch origin main:main   # fast-forward local main without checkout (refuses non-FF)
```

If `main` is currently checked out, use `git pull --ff-only` instead.

### Recovery

If a branch was deleted by mistake, restore it from the reflog:

```bash
git reflog --all | grep <branch-name>
git branch <branch-name> <recovered-sha>
```

## npm Publishing

The package is published to npm as **`@udan/digital-assistant-sdk`** (npm org `udan`,
`--access public`) by the `publish` job in `release-and-sync.yml`, whenever a Release PR is
merged into `main`.

**How it works:**

- **Trusted Publishing** (GitHub OIDC, no stored token): on npmjs.com the package's
  **Settings → Trusted Publisher** allows owner `Digital-Assistant`, repository
  `Digital-Assistant-SDK`, workflow `release-and-sync.yml`, environment `production`.
  Publishing access is set to require 2FA and disallow tokens.
- The job runs in the GitHub Environment `production`, checks out the release tag, generates
  `environments/production.env`, and runs `npm stage publish --provenance --access public`
  (npm >= 11.21). The trusted publisher allows staged publishes only; a plain `npm publish`
  from CI fails with `403 OIDC permission denied for this action`.
  `prepublishOnly` runs `check`, `clean`, and `build:prod` (production mode, minified).
- **Build-time keys are intentionally empty.** Host applications pass configuration at
  runtime, so nothing secret is inlined into the public bundle.
- **Staged publishing:** the upload lands as a staged version. Approve it on npmjs.com
  (package page → staged versions) with your passkey/2FA, or from a terminal with
  `npm stage list @udan/digital-assistant-sdk` and `npm stage approve <stage-id>`. Only then
  does it become `latest`.
- The domjson patch runs from the `prepare` script, so consumer installs don't run it, and
  `tsconfig.build.json` keeps test files out of the emitted declarations.

**Package setup history:** `0.0.0-placeholder` was published by hand so that the trusted
publisher could be configured (npm requires the package to exist first). If the trusted
publisher configuration lapses or the repo/workflow/environment changes, update it on the
package's settings page; all four fields must match exactly.

## Security Note

- **Committed credentials must be rotated.** `environments/local.env` was previously tracked
  and remains in git history; untracking does not remove the values. Rotate
  `keycloakClientSecret`, `profanityKey`, `googleTranslateApiKey`, and
  `googleAnalyticsSecretKey` (and any other exposed keys) regardless of the untracking.
- **Secrets must not be baked into the browser bundle.** `webpack.config.js` uses
  `dotenv-webpack`, which inlines every `process.env.*` referenced in `src/` into the
  client-side bundle. Treat all `environments/*.env` values as public. The long-term fix
  (move secret-bearing config to runtime host-provided config) is a tracked follow-up.
