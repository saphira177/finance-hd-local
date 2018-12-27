module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_id',
          '__t',
          '__v',
        ],
      },
    ],
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
};
