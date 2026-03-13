import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore scripts folder (they're allowed to use console)
    "scripts/**",
  ]),
  // Custom rules for code quality
  {
    rules: {
      // Warn on explicit any usage to encourage proper typing
      "@typescript-eslint/no-explicit-any": "warn",
      // Warn on console statements (use lib/logger.ts instead)
      "no-console": ["warn", { allow: ["error"] }],
    },
  },
]);

export default eslintConfig;
