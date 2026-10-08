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
  GitHub releases, and the back-merge to `dev`. **npm publishing is currently disabled.**
- Source branches are enforced by `enforce-dev-base.yml` (`Check source branch`): `qa` only
  accepts `dev`, and `main` only accepts `qa` (or `release-please--*`).
- `main`, `dev`, and `qa` are protected by **repository rulesets** — every change must arrive via
  a PR (see [Branch Protection](#branch-protection-repository-rulesets)).
- Stale branches are pruned automatically by the local janitor, `npm run git:clean`
  (see [Branch Hygiene & Automated Cleanup](#branch-hygiene--automated-cleanup)).

### Branch Model at a Glance

```mermaid
flowchart LR
    F["feature / fix branches"] -->|"PR"| D["dev<br/>integration"]
    D -->|"PR (dev only)"| Q["qa<br/>pre-release testing"]
    Q -->|"PR (qa only)"| M["main<br/>production"]
    RP["release-please--* branch"] -->|"Release PR"| M
    M -.->|"back-merge PR"| D

    classDef protected fill:#fde68a,stroke:#b45309,color:#000
    class D,Q,M protected
```

`dev`, `qa`, and `main` (highlighted) are protected by rulesets; nothing is pushed to them directly.

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
   > npm publishing is **disabled** for now; enable it later by following
   > [npm Publishing (Disabled, Future)](#npm-publishing-disabled-future).
6. **⚠️ THE BACK-MERGE (DO NOT FORGET):** Because Release Please updated the version and
   changelog directly on `main`, `main` is now exactly one commit ahead of `dev`.
   **You MUST immediately back-merge `main` into `dev`** or merge the automated PR from
   `main` to `dev` (created by the `back-merge` job). If this is skipped, the next release
   will result in severe Git merge conflicts on `package.json` and `CHANGELOG.md`.
   > **Note:** post-release sync is `main → dev` only. `qa` intentionally lags `main` by the
   > release commit until the next `dev → qa` promotion carries it forward. This does not cause
   > conflicts because `qa` is a strict downstream of `dev`.

### Release Lifecycle (End to End)

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    actor Mnt as Maintainer
    participant GH as GitHub (PRs and CI)
    participant RP as Release Please
    participant Bot as back-merge job

    Dev->>GH: PR feature branch into dev
    GH-->>Dev: CI and source-branch checks pass
    Dev->>GH: Merge into dev
    Mnt->>GH: PR dev into qa
    GH-->>Mnt: CI passes, merge
    Note over GH: qa verification (build:qa)
    Mnt->>GH: PR qa into main
    GH-->>Mnt: CI passes, merge
    GH->>RP: push to main triggers release-and-sync.yml
    RP->>GH: Open Release PR (version bump and CHANGELOG)
    Mnt->>GH: Review and merge Release PR
    RP->>GH: Tag and publish GitHub Release
    RP->>Bot: release_created = true
    Bot->>GH: Open PR main into dev
    Mnt->>GH: Merge back-merge PR (do not forget)
    Note over GH: npm publish is disabled
```

### Commit Messages and Version Bumps

```mermaid
flowchart TD
    C["Conventional Commit<br/>merged into main"] --> T{"Commit type?"}
    T -->|"feat!: or fix!:<br/>(breaking)"| MAJ["MAJOR bump"]
    T -->|"feat:"| MIN["MINOR bump"]
    T -->|"fix:"| PAT["PATCH bump"]
    T -->|"chore: docs: test: refactor:"| NO["No bump<br/>recorded in CHANGELOG"]
    MAJ --> RPR["Release Please computes<br/>the highest bump"]
    MIN --> RPR
    PAT --> RPR
    RPR --> PR["Release PR updates<br/>package.json and CHANGELOG.md"]
```

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

```mermaid
flowchart TD
    PR["Pull request or push<br/>to main, dev, or qa"] --> CI["ci.yml<br/>Build, Check, and Verify"]
    PR --> SEC["security.yml<br/>Dependency Audit"]
    PR --> SRC["enforce-dev-base.yml<br/>Check source branch<br/>(PRs into qa and main)"]

    subgraph MATRIX ["CI matrix: ubuntu, macos, windows"]
        direction LR
        A["typecheck"] --> B["format:check"] --> L["lint"] --> TS["test"] --> E["env:generate"] --> BL["build"]
    end
    CI --> MATRIX

    MATRIX --> OK{"All checks green?"}
    SEC --> OK
    SRC --> OK
    OK -->|"yes"| MERGE["Merge allowed"]
    OK -->|"no"| BLOCK["Merge blocked"]
```

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

### Release Automation Workflow

How `release-and-sync.yml` reacts to a push to `main`:

```mermaid
flowchart TD
    P["Push to main"] --> TOK["Generate GitHub App token<br/>RELEASE_APP_ID and RELEASE_APP_PRIVATE_KEY"]
    TOK --> RPJ["Release Please job<br/>release-please-config.json<br/>.release-please-manifest.json"]
    RPJ --> Q{"Is the pushed commit<br/>a merged Release PR?"}
    Q -->|"no"| OPEN["Open or update the Release PR<br/>version bump and CHANGELOG"]
    Q -->|"yes"| REL["Create tag and GitHub Release<br/>release_created = true"]
    REL --> BM["back-merge job<br/>gh pr create --base dev --head main"]
    BM --> BMPR["PR: sync main back to dev"]
    REL -.->|"disabled"| PUB["publish job (npm)"]

    classDef off fill:#e5e7eb,stroke:#6b7280,color:#374151,stroke-dasharray: 4 3
    class PUB off
```

The App token matters because PRs opened with the default `GITHUB_TOKEN` do not trigger
workflows, so required checks would never report on the Release PR or the back-merge PR.

### Why the Back-Merge Matters

```mermaid
gitGraph
    commit id: "v0.9.0"
    branch dev
    checkout dev
    commit id: "feat A"
    commit id: "fix B"
    branch qa
    checkout qa
    commit id: "dev promoted"
    checkout main
    merge qa id: "qa promoted"
    commit id: "release 0.10.0" tag: "v0.10.0"
    checkout dev
    merge main id: "back-merge"
    commit id: "next feature"
```

Release Please commits the version bump and changelog directly on `main`. Without the
`main → dev` back-merge, the next release hits conflicts on `package.json` and `CHANGELOG.md`.

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

### Branch Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Local: git checkout -b
    Local --> Pushed: git push -u origin
    Pushed --> PROpen: gh pr create --base dev
    PROpen --> PROpen: CI re-runs on new commits
    PROpen --> Merged: PR merged
    Merged --> RemoteDeleted: delete_branch_on_merge
    RemoteDeleted --> Gone: git fetch --prune marks upstream gone
    Gone --> [*]: npm run git:clean deletes local branch
```

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

### Source-Branch Enforcement

`enforce-dev-base.yml` emits the `Check source branch` status, which rulesets cannot express on their own:

```mermaid
flowchart TD
    PR["PR opened or updated"] --> BASE{"Base branch?"}
    BASE -->|"qa"| HQ{"Head is dev?"}
    BASE -->|"main"| HM{"Head is qa or<br/>release-please--*?"}
    BASE -->|"dev"| ANY["No source restriction<br/>(feature, fix, and back-merge PRs)"]
    HQ -->|"yes"| PASS["Check passes"]
    HQ -->|"no"| FAIL["Check fails<br/>merge blocked"]
    HM -->|"yes"| PASS
    HM -->|"no"| FAIL
    ANY --> PASS
```

## npm Publishing (Disabled, Future)

The package is published to npm as **`@udan/digital-assistant-core`** (npm org `udan`,
`--access public`). The `publish` job in `release-and-sync.yml` is still commented out.

**Prerequisites already in place:**

- The domjson patch runs from the `prepare` script, so consumer installs don't run it
  (`scripts/` is not published).
- `prepublishOnly` runs `check`, `clean`, and `build:prod` (production mode, minified). It
  needs `environments/production.env`.
- The webpack build uses `tsconfig.build.json`, which keeps test files out of the emitted
  declarations. `npm pack --dry-run` should list only `dist/`, `package.json`, and
  `README.md`.

**One-time manual first publish** (Trusted Publishing is configured per package, so the
package must exist first):

1. Check out the release tag and run `npm ci`.
2. Generate `environments/production.env` with the non-secret values only (URLs, realm,
   client ID, analytics ID) and leave `keycloakClientSecret`, `profanityKey`,
   `googleTranslateApiKey`, and `googleAnalyticsSecretKey` empty:
   `BUILD_ENV=production npm run env:generate` with only the non-secret variables exported.
3. `npm login` as a member of the `udan` org, run `npm pack --dry-run`, grep the packed
   bundles for each real secret value (expect no hits), then `npm publish --access public`.

**To enable automated publishing:**

1. **Configure npm Trusted Publishing** (GitHub OIDC — no stored token). On
   <https://npmjs.com> open the `@udan/digital-assistant-core` package →
   **Settings → Trusted Publishing**, enable it for source **GitHub** / owner
   **Digital-Assistant** / repository **Digital-Assistant-SDK**, and restrict it to the
   workflow **`release-and-sync.yml`**.
   The job signs with `--provenance` and authenticates via `id-token: write`; no
   `NPM_TOKEN` secret is required.
2. Create a GitHub **Environment** named `production` holding the build-time variables
   (see `environments/local.env.example`); the job generates `environments/production.env`
   from it with `npm run env:generate`.
3. Uncomment the `publish` job in `.github/workflows/release-and-sync.yml`.

```mermaid
flowchart LR
    subgraph ONCE ["One-time setup"]
        direction TB
        M1["Manual first publish<br/>(package must exist)"] --> M2["Configure npm Trusted Publishing<br/>for release-and-sync.yml"]
        M2 --> M3["Create GitHub Environment 'production'"]
        M3 --> M4["Uncomment publish job"]
    end
    subgraph AUTO ["Every release afterwards"]
        direction TB
        R1["Release created"] --> R2["env:generate production.env"]
        R2 --> R3["prepublishOnly:<br/>check, clean, build:prod"]
        R3 --> R4["npm publish --provenance<br/>(OIDC id-token)"]
    end
    ONCE --> AUTO
```

## Security Note

- **Committed credentials must be rotated.** `environments/local.env` was previously tracked
  and remains in git history; untracking does not remove the values. Rotate
  `keycloakClientSecret`, `profanityKey`, `googleTranslateApiKey`, and
  `googleAnalyticsSecretKey` (and any other exposed keys) regardless of the untracking.
- **Secrets must not be baked into the browser bundle.** `webpack.config.js` uses
  `dotenv-webpack`, which inlines every `process.env.*` referenced in `src/` into the
  client-side bundle. Treat all `environments/*.env` values as public. The long-term fix
  (move secret-bearing config to runtime host-provided config) is a tracked follow-up.
