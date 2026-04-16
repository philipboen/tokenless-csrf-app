import antfu from "@antfu/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import reactCompiler from "eslint-plugin-react-compiler";

export default antfu(
  {
    type: "app",
    react: true,
    typescript: true,
    stylistic: false,
    formatters: false,
    ignores: ["**/*.md", "dist"],
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
  eslintConfigPrettier,
);
