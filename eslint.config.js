import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";
export default ts.config(
  { ignores: ["dist/**", ".ssr/**", "node_modules/**"] },
  js.configs.recommended,
  ...ts.configs.recommended,
  { files: ["src/**/*.{ts,tsx}"], languageOptions: { globals: globals.browser } },
  { files: ["*.{js,ts}", "scripts/**/*.mjs"], languageOptions: { globals: globals.node } },
  { files: ["scripts/browser-smoke.mjs"], languageOptions: { globals: globals.browser } },
);
