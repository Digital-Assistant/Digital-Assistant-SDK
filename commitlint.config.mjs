// Conventional Commits for every commit subject: the commit-msg hook (lefthook) and
// the `commits` CI job run this config. The type list is the one the PR-title
// check uses (.github/workflows/pr-title.yml); change both together.
export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'perf',
                'refactor',
                'docs',
                'test',
                'build',
                'ci',
                'chore',
                'revert',
            ],
        ],
        // Off, to agree with the PR-title check: subjects may start with a
        // name such as SDK or Dependabot, and squash bodies carry long lines.
        'subject-case': [0],
        'body-max-line-length': [0],
    },
};
