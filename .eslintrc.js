module.exports = {
  extends: 'google',
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    'no-tabs': 'off',
    'max-len': [
      'error',
      {
        ignoreStrings: true,
        code: 120,
        tabWidth: 4
      }
    ]
  }
};
