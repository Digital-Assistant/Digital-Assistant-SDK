# Release Process

This project uses a GitFlow-inspired branching strategy combined with automated releases.

- `main` is the production branch. It contains only released code.
- `dev` is the active development branch — all feature/fix work is PR'd into it.
- `qa` is the integration / pre-release testing branch. It receives `dev` builds for
  verification before a release is staged; it is a build environment (see `build:qa`), not a
  source of production releases.
- CI (`ci.yml`) guards every push/PR to `main` and `dev` — typecheck, format, lint,
  tests, and build are all blocking.
- Release automation (`release-and-sync.yml`) handles version bumps, changelog generation,
  GitHub releases, and the back-merge to `dev`. **npm publishing is currently disabled.**
- Direct PRs to `main` may only originate from `dev` (enforced by `enforce-dev-base.yml`).
- `main` and `dev` are protected by **repository rulesets** — every change must arrive via a PR
  (see [Branch Protection](#branch-protection-repository-rulesets)).
- Stale branches are pruned automatically by the local janitor, `npm run git:clean`
  (see [Branch Hygiene & Automated Cleanup](#branch-hygiene--automated-cleanup)).

> **One-time prerequisite:** set the repository **default branch to `main`** (it is currently
> `MVC-Task-80-Junie`). See [Repository Setup](#repository-setup) below.

## The Step-by-Step Release Process

1. **Develop:** All features and fixes are PR'd into `dev`.
2. **Stage for Release:** When ready to release, a maintainer opens a PR from `dev` to `main`.
3. **Merge to Main:** Once CI passes, merge `dev` into `main`.
4. **Release Please:** GitHub Actions automatically opens a new "Release PR" against `main`.
   This PR contains the version bump (in `package.json`) and the updated `CHANGELOG.md`.
5. **Publish GitHub Release:** The maintainer reviews and merges the Release PR. The GitHub
   Release is automatically published.
   > npm publishing is **disabled** for now; enable it later by following
   > [npm Publishing (Disabled, Future)](#npm-publishing-disabled-future).
6. **⚠️ THE BACK-MERGE (DO NOT FORGET):** Because Release Please updated the version and
   changelog directly on `main`, `main` is now exactly one commit ahead of `dev`.
   **You MUST immediately back-merge `main` into `dev`** or merge the automated PR from
   `main` to `dev` (created by the `back-merge` job). If this is skipped, the next release
   will result in severe Git merge conflicts on `package.json` and `CHANGELOG.md`.

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
# Use 'main' as the default branch (currently 'MVC-Task-80-Junie').
gh api -X PATCH repos/Digital-Assistant/Digital-Assistant-SDK \
  -f default_branch=main

# Delete PR head branches automatically once merged.
gh api -X PATCH repos/Digital-Assistant/Digital-Assistant-SDK \
  -f delete_branch_on_merge=true
```

## Branch Protection (Repository Rulesets)

Both `main` and `dev` are intended to be protected by **repository rulesets** (the modern
successor to classic branch protection). Configured with no bypass actors, direct pushes,
force-pushes, and branch deletion are blocked for everyone, including maintainers.

| Ruleset | Targets | Rules |
|---|---|---|
| `Protect main branch` | `refs/heads/main` | require PR, block deletion, block force-push, require status checks (`check-source-branch`, `Build, Check, and Verify`) |
| `Protect dev branch` | `refs/heads/dev` | require PR, block deletion, block force-push, require status checks (`Build, Check, and Verify`) |

Consequences:

- **Every change to `dev` or `main` must arrive via a pull request.** `required_approving_review_count`
  is `0`, so a PR is required but a human approval is not.
- **`main` only accepts PRs from `dev` or `release-please--*`.** The `check-source-branch` status
  (emitted by `.github/workflows/enforce-dev-base.yml`) fails any other head branch.
- Merges must pass CI: `Build, Check, and Verify` on `ubuntu-latest`, `macos-latest`, and
  `windows-latest` (all gates block).

> These rules are the enforcement behind the convention "never commit directly to `main`"
> (`AGENTS.md` § 11). They are configured in the GitHub UI
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

## npm Publishing (Disabled, Future)

The `publish` job in `release-and-sync.yml` is intentionally commented out. To enable it:

1. **Configure npm Trusted Publishing** (GitHub OIDC — no stored token). On
   <https://npmjs.com> open the `@digital-assistant/core` package →
   **Settings → Trusted Publishing**, enable it for source **GitHub** / owner
   **Digital-Assistant** / repository **Digital-Assistant-SDK**, and restrict it to the
   workflow **`release-and-sync.yml`**.
   The job signs with `--provenance` and authenticates via `id-token: write`; no
   `NPM_TOKEN` secret is required.
2. Ensure a publish-grade build environment exists. `build:prod` requires
   `environments/production.env`, generated from Secrets/Variables via
   `npm run env:generate`.
3. Uncomment the `publish` job in `.github/workflows/release-and-sync.yml` and adjust the
   build/`files` config so `dist/` is produced and packed.

## Security Note

- **Committed credentials must be rotated.** `environments/local.env` was previously tracked
  and remains in git history; untracking does not remove the values. Rotate
  `keycloakClientSecret`, `profanityKey`, `googleTranslateApiKey`, and
  `googleAnalyticsSecretKey` (and any other exposed keys) regardless of the untracking.
- **Secrets must not be baked into the browser bundle.** `webpack.config.js` uses
  `dotenv-webpack`, which inlines every `process.env.*` referenced in `src/` into the
  client-side bundle. Treat all `environments/*.env` values as public. The long-term fix
  (move secret-bearing config to runtime host-provided config) is a tracked follow-up.
