module.exports = {
  plugins: [
    'eslint-comments',
    'jest',
    'promise',
  ],
  extends: [
    'airbnb-typescript',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
  ],
  rules: {
    'indent': ['error', 2],
  },
}
