#!/usr/bin/env node
// Checks a build before it ships:
//   - the PROD URL defaults are set in environments/<env>.env and inlined in dist/;
//   - no secret key has a value in the env file or the job environment, and no
//     secret key name or value appears in dist/.
// Logs key names only, never values.
//
// Usage: node scripts/ci/check-build-env.mjs [--env=<name>] [--dist=<dir>] [--allow-empty-urls]
//   --env               env file to read (default: $BUILD_ENV or "local")
//   --dist              build output directory (default: dist)
//   --allow-empty-urls  report empty PROD URL defaults as warnings, not errors
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

export const PROD_URL_KEYS = [
    'baseProdURL',
    'tokenProdUrl',
    'llmProdUrl',
    'keycloakProdUrl',
];
export const TEST_URL_KEYS = [
    'baseTestURL',
    'tokenTestUrl',
    'llmTestUrl',
    'keycloakTestUrl',
];
export const SECRET_KEYS = [
    'keycloakClientSecret',
    'profanityKey',
    'googleTranslateApiKey',
    'googleAnalyticsSecretKey',
];
const BUNDLES = ['index.esm.mjs', 'index.cjs.js'];

function parseArgs(argv) {
    const opts = {
        env: process.env.BUILD_ENV || 'local',
        dist: 'dist',
        allowEmptyUrls: false,
    };
    for (const arg of argv) {
        if (arg.startsWith('--env=')) opts.env = arg.slice('--env='.length);
        else if (arg.startsWith('--dist='))
            opts.dist = arg.slice('--dist='.length);
        else if (arg === '--allow-empty-urls') opts.allowEmptyUrls = true;
    }
    return opts;
}

// Same rules as dotenv for the subset we write: KEY=value, KEY="value", KEY = value.
export function parseEnvFile(contents) {
    const values = {};
    for (const line of contents.split(/\r?\n/)) {
        const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
        if (!match) continue;
        let value = match[2];
        if (
            value.length >= 2 &&
            ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'")))
        ) {
            value = value
                .slice(1, -1)
                .replace(/\\n/g, '\n')
                .replace(/\\(["\\])/g, '$1');
        }
        values[match[1]] = value;
    }
    return values;
}

export function check({ env, dist, allowEmptyUrls }, jobEnv = process.env) {
    const errors = [];
    const warnings = [];
    const envFile = resolve(ROOT, 'environments', `${env}.env`);
    const distDir = resolve(ROOT, dist);

    if (!/^[A-Za-z0-9_-]+$/.test(env)) {
        return { errors: [`invalid env name: ${env}`], warnings };
    }
    if (!existsSync(envFile)) {
        return {
            errors: [`env file not found: environments/${env}.env`],
            warnings,
        };
    }
    const values = parseEnvFile(readFileSync(envFile, 'utf8'));

    for (const key of SECRET_KEYS) {
        if (values[key])
            errors.push(
                `secret key ${key} has a value in environments/${env}.env`,
            );
        else if (key in values)
            warnings.push(
                `secret key ${key} is declared in environments/${env}.env (remove it)`,
            );
        if (jobEnv[key])
            errors.push(`secret key ${key} is set in the build environment`);
    }

    for (const key of PROD_URL_KEYS) {
        if (!values[key]) {
            const msg = `PROD URL default ${key} is empty in environments/${env}.env`;
            (allowEmptyUrls ? warnings : errors).push(msg);
        }
    }
    for (const key of TEST_URL_KEYS) {
        if (!values[key])
            warnings.push(
                `TEST URL default ${key} is empty in environments/${env}.env`,
            );
    }

    const bundles = BUNDLES.map((name) => resolve(distDir, name)).filter((p) =>
        existsSync(p),
    );
    if (bundles.length === 0) {
        errors.push(
            `no bundle found in ${dist}/ (${BUNDLES.join(', ')}); run the build first`,
        );
    }
    const secretValues = SECRET_KEYS.map((key) => [
        key,
        values[key] || jobEnv[key] || '',
    ]);
    for (const bundle of bundles) {
        const code = readFileSync(bundle, 'utf8');
        const name = `${dist}/${bundle.slice(distDir.length + 1)}`;
        for (const key of [...PROD_URL_KEYS, ...TEST_URL_KEYS]) {
            if (values[key] && !code.includes(values[key])) {
                errors.push(
                    `URL default ${key} is set but not inlined in ${name}`,
                );
            }
        }
        for (const [key, value] of secretValues) {
            if (code.includes(key))
                errors.push(`secret key name ${key} appears in ${name}`);
            if (value && code.includes(value))
                errors.push(`value of secret key ${key} appears in ${name}`);
        }
    }

    return { errors, warnings };
}

export function main(argv = process.argv.slice(2)) {
    const opts = parseArgs(argv);
    const { errors, warnings } = check(opts);
    const gha = Boolean(process.env.GITHUB_ACTIONS);
    for (const w of warnings)
        console.warn(gha ? `::warning::${w}` : `warning: ${w}`);
    for (const e of errors)
        console.error(gha ? `::error::${e}` : `error: ${e}`);
    if (errors.length > 0) {
        console.error(
            `check-build-env: ${errors.length} error(s) for environments/${opts.env}.env and ${opts.dist}/.`,
        );
        return 1;
    }
    console.log(
        `check-build-env: OK for environments/${opts.env}.env and ${opts.dist}/ ` +
            `(${warnings.length} warning(s)).`,
    );
    return 0;
}

if (
    process.argv[1] &&
    import.meta.url === pathToFileURL(process.argv[1]).href
) {
    process.exitCode = main();
}
