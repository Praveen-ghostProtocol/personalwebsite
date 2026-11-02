import js from "@eslint/js";
export default [
  js.configs.recommended,
  {
    files: ["**/*.mjs"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        URL: "readonly",
        Buffer: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-constant-binary-expression": "error",
    },
  },
  {
    files: ["src/motion.mjs"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        HTMLElement: "readonly",
        HTMLButtonElement: "readonly",
        IntersectionObserver: "readonly",
      },
    },
  },
];
