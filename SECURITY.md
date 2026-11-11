# Security Policy

Report a vulnerability in `@udan/digital-assistant-sdk` privately, through GitHub. Do not open a public issue for it.

## Report a vulnerability

1. Open the repository's **Security** tab on GitHub.
2. Select **Report a vulnerability**.
3. Describe the issue, the affected version and the steps to reproduce it.

GitHub private vulnerability reporting is on for this repository. Only the maintainers see the report.

## Supported versions

The latest release on npm (the `latest` tag) receives security fixes. A fix ships as a new release; older versions
are not patched.

## What to expect

The maintainers confirm the report, fix it in a private fork when needed, and publish a GitHub security advisory with
the release that fixes it.

## Scope

- In scope: the SDK source in `src/`, its build and release workflows in `.github/workflows/`, and the published
  npm package.
- Values the SDK inlines into its browser bundle are public by design (`docs/adr/0001-public-build-time-config.md`).
  A secret that reaches the bundle is a vulnerability; a public URL is not.
