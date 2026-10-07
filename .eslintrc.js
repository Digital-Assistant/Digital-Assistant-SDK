module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // Formatting is enforced (prettier is an error). The rules below surface
    // legacy debt as warnings instead of errors: the SDK predates strict lint
    // enforcement and deliberately uses `any` at DOM/extension interop
    // boundaries. They are tracked for gradual cleanup (see AGENTS.md § 11).
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    'no-var': 'warn',
    'prefer-const': 'warn',
  },
};
