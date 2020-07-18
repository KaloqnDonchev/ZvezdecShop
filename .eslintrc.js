module.exports = {
  "extends": [
    "eslint:recommended",
  ],
  "parser": "babel-eslint",
  "rules": {
    // enable additional rules
    "indent": ["error", 4],
    // disable rules from base configurations
    "no-console": 1,
  },
  "env": {
    "browser": true,
    "node": true
  }
};