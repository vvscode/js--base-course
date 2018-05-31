module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ["starndard", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    sourceType: "module"
  },
  plugins: ["prettier"],
  rules: {
    indent: ["error", "tab"],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-tabs": "off",
    "max-len": [
      "error",
      {
        ignoreStrings: true,
        code: 120,
        tabWidth: 4
      }
    ]
  }
};