module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'no-empty': 'warn',
    'no-extra-semi': 'warn',
    'no-irregular-whitespace': 'warn',
    curly: 'warn',
    'dot-notation': 'warn',
    'no-empty-function': 'warn',
    'no-multi-spaces': 'warn',
    camelcase: 'warn',
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': 'warn',
  },
};
