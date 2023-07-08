  module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'space-before-function-paren':0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 0,
    'no-useless-escape': 0,
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'no-extra-boolean-cast': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
