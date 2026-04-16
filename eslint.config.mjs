import antfu from "@antfu/eslint-config";
import pluginRouter from "@tanstack/eslint-plugin-router";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import reactCompiler from "eslint-plugin-react-compiler";

export default antfu(
  {
    type: "app",
    react: true,
    typescript: true,
    stylistic: false,
    formatters: false,
    ignores: ["**/*.md", "**/routeTree.gen.ts", "dist"],
  },
  {
    name: "react-compiler",
    plugins: {
      "react-compiler": reactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "error",
    },
  },
  {
    plugins: {
      "@tanstack/router": pluginRouter,
    },
    rules: {
      "@tanstack/router/create-route-property-order": "error",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}"],
    rules: {
      "perfectionist/sort-imports": ["error", { tsconfig: { rootDir: "." } }],
      "import/no-cycle": "off",
      "import/order": "off",
      "sort-imports": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/require-await": "off",
      "pnpm/json-enforce-catalog": "off",
    },
  },
  {
    files: ["src/routes/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  eslintConfigPrettier,
);
