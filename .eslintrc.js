module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-restricted-syntax': 'off',
    'object-curly-newline': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'max-len': 'off',
    camelcase: 'off',
  },
};
