module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'indent': ['error', 4, {'SwitchCase': 1}],
    '@typescript-eslint/indent': ['error', 4],
    'eol-last': ['error', 'never'],
    'quote-props': 'off',
    'space-before-function-paren': 'off',
    'object-curly-spacing': 'off',
    'camelcase': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'off'
  }
}
