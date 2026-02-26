import eslint from "@eslint/js";

export default [
  eslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "prefer-const": "error",
      suggestCanonicalClasses: "ignore",
    },
  },
];
