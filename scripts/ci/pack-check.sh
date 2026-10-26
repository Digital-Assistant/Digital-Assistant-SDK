#!/usr/bin/env bash
# Checks an `npm pack` tarball of the SDK before it is shipped (or after, for a
# tarball downloaded from npm or a GitHub release). The tarball is checked as it
# is; nothing is rebuilt.
#
#   1. Contents: only package.json, README, LICENSE and dist/; the entry points exist; no
#      env files, sources, tests or nested tarballs.
#   2. Env check (only with --env=<name>): scripts/ci/check-build-env.mjs runs
#      against the unpacked dist/ and environments/<name>.env (URL defaults
#      inlined, no secret key names or values).
#   3. publint and @arethetypeswrong/cli, pinned in scripts/ci/pack-tools.
#   4. A scratch project installs the tarball and loads it with ESM `import` and
#      CJS `require`. It fails if a PROD URL default is empty (R9) or if a secret
#      key name is in the package (R10). Logs key names only, never values.
#
# Usage: scripts/ci/pack-check.sh [--env=<name>] [--allow-empty-urls] <package.tgz>
#   --env               also run check-build-env.mjs with environments/<name>.env
#   --allow-empty-urls  report empty PROD URL defaults as warnings, not errors
# Needs: node >= 22, npm, tar, sha256sum, openssl, network access to the npm
# registry (the scratch project installs the package's dependencies).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TOOLS="$ROOT/scripts/ci/pack-tools"

ENV_NAME=""
ALLOW_EMPTY_URLS=false
TGZ=""
for arg in "$@"; do
  case "$arg" in
    --env=*) ENV_NAME="${arg#--env=}" ;;
    --allow-empty-urls) ALLOW_EMPTY_URLS=true ;;
    -h|--help) sed -n '2,20p' "$0"; exit 0 ;;
    -*) echo "pack-check: unknown option $arg" >&2; exit 2 ;;
    *) [[ -z "$TGZ" ]] || { echo "pack-check: only one tarball allowed" >&2; exit 2; }; TGZ="$arg" ;;
  esac
done
[[ -n "$TGZ" ]] || { echo "usage: $0 [--env=<name>] [--allow-empty-urls] <package.tgz>" >&2; exit 2; }
[[ -f "$TGZ" ]] || { echo "pack-check: tarball not found: $TGZ" >&2; exit 2; }
TGZ="$(cd "$(dirname "$TGZ")" && pwd)/$(basename "$TGZ")"

ERRORS=0
WARNINGS=0
fail() {
  ERRORS=$((ERRORS + 1))
  if [[ -n "${GITHUB_ACTIONS:-}" ]]; then echo "::error::$1"; else echo "error: $1" >&2; fi
}
warn() {
  WARNINGS=$((WARNINGS + 1))
  if [[ -n "${GITHUB_ACTIONS:-}" ]]; then echo "::warning::$1"; else echo "warning: $1" >&2; fi
}

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

SHA256="$(sha256sum "$TGZ" | cut -d' ' -f1)"
INTEGRITY="sha512-$(openssl dgst -sha512 -binary "$TGZ" | base64 -w0)"
echo "==> $(basename "$TGZ")"
echo "sha256=$SHA256"
echo "integrity=$INTEGRITY"

# --- 1. Contents ---------------------------------------------------------------
echo "==> contents"
tar -tzf "$TGZ" > "$TMP/files.txt"
echo "$(wc -l < "$TMP/files.txt") entries"
while IFS= read -r entry; do
  case "$entry" in
    *.env|*.env.*|*/.env*|*/environments/*|*/src/*|*/__tests__/*|*.tgz|*/node_modules/*)
      fail "forbidden file in tarball: $entry"; continue ;;
  esac
  [[ "$entry" == */ ]] && continue # directory entry (npm pack writes none)
  case "$entry" in
    package/package.json|package/README*|package/LICENSE*|package/LICENCE*|package/dist/*) ;;
    *) fail "unexpected file in tarball: $entry" ;;
  esac
done < "$TMP/files.txt"
for required in package/package.json package/dist/index.esm.js package/dist/index.cjs.js package/dist/index.d.ts; do
  grep -qxF "$required" "$TMP/files.txt" || fail "missing from tarball: $required"
done

mkdir -p "$TMP/unpacked"
tar -xzf "$TGZ" -C "$TMP/unpacked"
PKG="$TMP/unpacked/package"
PKG_NAME="$(node -p 'require(process.argv[1]).name' "$PKG/package.json")"
PKG_VERSION="$(node -p 'require(process.argv[1]).version' "$PKG/package.json")"
echo "package=$PKG_NAME@$PKG_VERSION"

# Secret key names (R10). The list is the one check-build-env.mjs uses.
SECRET_KEYS="$(node --input-type=module -e \
  "import { SECRET_KEYS } from '$ROOT/scripts/ci/check-build-env.mjs'; console.log(SECRET_KEYS.join(' '))")"
for key in $SECRET_KEYS; do
  if grep -rqF -- "$key" "$PKG"; then fail "secret key name $key appears in the tarball"; fi
done

# --- 2. Env file check (optional) ----------------------------------------------
if [[ -n "$ENV_NAME" ]]; then
  echo "==> check-build-env (environments/$ENV_NAME.env against the tarball's dist/)"
  env_args=(--env="$ENV_NAME" --dist="$PKG/dist")
  [[ "$ALLOW_EMPTY_URLS" == true ]] && env_args+=(--allow-empty-urls)
  node "$ROOT/scripts/ci/check-build-env.mjs" "${env_args[@]}" || fail "check-build-env failed on the tarball"
fi

# --- 3. publint and attw (pinned) ----------------------------------------------
if [[ ! -x "$TOOLS/node_modules/.bin/publint" || ! -x "$TOOLS/node_modules/.bin/attw" ]]; then
  echo "==> installing pinned pack tools (scripts/ci/pack-tools)"
  npm ci --prefix "$TOOLS" --ignore-scripts --no-audit --no-fund --loglevel=error
fi
echo "==> publint $("$TOOLS/node_modules/.bin/publint" --version 2>/dev/null || true)"
# Errors fail; warnings and suggestions are printed only.
"$TOOLS/node_modules/.bin/publint" run "$TGZ" || fail "publint reported errors"

echo "==> attw $("$TOOLS/node_modules/.bin/attw" --version)"
# unexpected-module-syntax: dist/index.esm.js is ESM in a package without
# "type": "module" (Node loads it through syntax detection; bundlers are fine).
# Known since 0.10.x; fixing it changes the package layout (logged in the C05
# output). Every other rule fails the check.
(cd "$TMP" && FORCE_COLOR=0 "$TOOLS/node_modules/.bin/attw" "$TGZ" \
  --no-definitely-typed --no-emoji --no-color --format table-flipped \
  --ignore-rules unexpected-module-syntax) || fail "attw reported problems"

# --- 4. Scratch project: ESM import, CJS require, URL defaults -----------------
echo "==> scratch project install"
CONSUMER="$TMP/consumer"
mkdir -p "$CONSUMER"
printf '{ "name": "pack-check-consumer", "version": "1.0.0", "private": true }\n' > "$CONSUMER/package.json"
# The axios peer dependency is installed automatically (npm >= 7).
(cd "$CONSUMER" && npm install --ignore-scripts --no-audit --no-fund --no-package-lock --loglevel=error "$TGZ")

cat > "$CONSUMER/check.cjs" <<'EOF'
const name = process.argv[2];
const allowEmpty = process.argv[3] === 'true';
const out = { errors: [], warnings: [] };
const cjs = require(name);
import(name).then((esm) => {
    const cjsKeys = Object.keys(cjs).sort();
    const esmKeys = Object.keys(esm).filter((k) => k !== 'default').sort();
    console.log(`require: ${cjsKeys.length} exports; import: ${esmKeys.length} exports`);
    const missing = cjsKeys.filter((k) => !esmKeys.includes(k));
    if (missing.length) out.errors.push(`exports missing from ESM: ${missing.join(', ')}`);
    for (const fn of ['AppConfig', 'getBuildDefaults', 'resolveRuntimeEnvironment']) {
        if (typeof cjs[fn] !== 'function') out.errors.push(`CJS export ${fn} is not a function`);
        if (typeof esm[fn] !== 'function') out.errors.push(`ESM export ${fn} is not a function`);
    }
    if (typeof globalThis.UDAPluginSDK !== 'function') out.errors.push('globalThis.UDAPluginSDK is not set');
    const defaults = typeof cjs.getBuildDefaults === 'function' ? cjs.getBuildDefaults() : {};
    for (const env of ['PROD', 'TEST']) {
        for (const [key, value] of Object.entries(defaults[env] || {})) {
            if (value) continue;
            const msg = `${env} URL default ${key} is empty in the bundle`;
            if (env === 'PROD' && !allowEmpty) out.errors.push(msg);
            else out.warnings.push(msg);
        }
    }
    if (!defaults.PROD) out.errors.push('getBuildDefaults() has no PROD entry');
    if (cjs.CustomConfig && cjs.CustomConfig.clientSecret) out.errors.push('CustomConfig.clientSecret has a default value');
    console.log(JSON.stringify(out));
}).catch((err) => {
    console.log(JSON.stringify({ errors: [`ESM import failed: ${err.message}`], warnings: [] }));
});
EOF

echo "==> load with require and import"
if ! result="$(cd "$CONSUMER" && node check.cjs "$PKG_NAME" "$ALLOW_EMPTY_URLS" 2> "$TMP/load.err")"; then
  cat "$TMP/load.err" >&2
  fail "loading the package failed"
  result='{"errors":[],"warnings":[]}'
fi
echo "$result" | head -n -1
json="$(echo "$result" | tail -n 1)"
while IFS= read -r m; do [[ -n "$m" ]] && fail "$m"; done < <(node -e 'const r=JSON.parse(process.argv[1]); console.log(r.errors.join("\n"))' "$json")
while IFS= read -r m; do [[ -n "$m" ]] && warn "$m"; done < <(node -e 'const r=JSON.parse(process.argv[1]); console.log(r.warnings.join("\n"))' "$json")

if (( ERRORS > 0 )); then
  echo "pack-check: FAILED with $ERRORS error(s), $WARNINGS warning(s) for $PKG_NAME@$PKG_VERSION" >&2
  exit 1
fi
echo "pack-check: OK for $PKG_NAME@$PKG_VERSION ($WARNINGS warning(s)); sha256=$SHA256"
