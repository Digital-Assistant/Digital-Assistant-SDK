# Contributing

Thank you for helping. This page says how a change reaches `dev`. Setup and the commands are in
[`README.md`](README.md) and [`AGENTS.md`](AGENTS.md) section 3; the docs rules are in
[`docs/STYLE_GUIDE.md`](docs/STYLE_GUIDE.md).

## Make a change

1. Branch from `dev`: `git switch -c <type>/<topic> origin/dev` (for example `fix/token-refresh`).
2. Run `npm install` once. It installs the local hooks (lefthook); run `npx lefthook install` if a clone has none.
3. Make the change, with tests beside the code in `src/**/__tests__/`.
4. Run `npm run check` (format, lint, type check, tests with the coverage floor) and `npm run build`.
5. Update the docs in the same change when it alters a public interface, behaviour or a decision.

## Commits and pull requests

- Every commit subject and every pull request title is a Conventional Commit: `<type>(<scope>): <description>`.
  Allowed types: `feat`, `fix`, `perf`, `refactor`, `docs`, `test`, `build`, `ci`, `chore`, `revert`.
- Open the pull request into `dev`. Fill in the template.
- CI must be green: the required checks are `CI Gate` and `Conventional Commit Title`.
- A maintainer adds the pull request to the merge queue. `dev` squash-merges, so the title becomes the commit.
- `main` takes only the `dev` promotion and release-please pull requests
  ([`RELEASE_PROCESS.md`](RELEASE_PROCESS.md)).

## Rules that block a merge

- Never commit a secret, an env file or a value from one. `environments/local.env.example` holds key names and two public log-level defaults only.
- Never edit, skip or delete a test to make it pass.
- Never raise the ESLint warning budget or lower the coverage floor without the maintainer
  (`docs/agentic-readiness/digital-assistant-sdk-quality-baseline.json`).

Report a security problem privately, as [`SECURITY.md`](SECURITY.md) says.
