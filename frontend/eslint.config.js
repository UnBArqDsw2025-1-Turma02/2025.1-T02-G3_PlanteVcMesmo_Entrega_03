import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_$",
          argsIgnorePattern: "^_$",
          caughtErrorsIgnorePattern: "^_$",
        },
      ],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.{ts,tsx,vue}"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_$",
          argsIgnorePattern: "^_$",
          caughtErrorsIgnorePattern: "^_$",
        },
      ],
      "vue/multi-word-component-names": "off",
      "quotes": [ "error", "single" ]
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
]);
