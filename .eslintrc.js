module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:flowtype/recommended",
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  "plugins": [
    "flowtype",
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': ['error', { 'allow': ['_id'] }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
