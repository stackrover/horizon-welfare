import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginNext from "@next/eslint-plugin-next";
// import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // eslintPluginPrettierRecommended,
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "react/prop-types": 0,
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "no-shadow": "off",
      "import/no-cycle": "off",
      "no-console": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "off",
      "react/require-default-props": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "react/no-unknown-property": "off",
      // "prettier/prettier": [
      //   "error",
      //   { endOfLine: "auto" },
      //   { usePrettierrc: false },
      // ],
    },
  },

  {
    ignores: [
      "./src/components/ui/*",
      "./src/lib/utils.ts",
      "./src/hooks/use-toast.ts",
    ],
  },
];
