module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 80,
    tabWidth: 4,
    // YAML and JSON keep the 2-space indent they already use.
    overrides: [
        {
            files: ['*.yml', '*.yaml', '*.json'],
            options: { tabWidth: 2 },
        },
    ],
};
