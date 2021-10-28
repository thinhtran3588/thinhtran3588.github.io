module.exports = {
  root: true,
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@next/next/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "no-null",
    "eslint-plugin-no-inline-styles",
    "prettier",
  ],
  rules: {
    "prettier/prettier": ["error", { "no-inline-styles": true }],
    "no-null/no-null": ["error"],
    "no-undef": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "import/prefer-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ], // force to define function return type
    "class-methods-use-this": [
      "error",
      {
        exceptMethods: [
          "componentDidCatch",
          "componentDidAppear",
          "componentDidDisappear",
        ],
      },
    ],
    "import/no-unresolved": [
      "error",
      {
        ignore: ["@core", "@store", "@locales", "@main"],
      },
    ], // ignore module import
    "max-len": ["error", 120], // change max length for a line to 120
    "no-console": "error", // don't allow console
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["res", "draft", "draftState"],
      },
    ], // no params reassigned except using immer, response
    "no-unused-expressions": ["error", { allowShortCircuit: true }], // don't use unused expressions except short circuit
    "no-unused-vars": "off",
    // eslint-disable-next-line max-len
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // don't use unused var except with _ prefix
    "@typescript-eslint/no-explicit-any": ["error"], // forbid to use 'any' type
    "react/jsx-closing-bracket-location": "off", // let prettier formats the code
    "react/require-default-props": "off",
    "react/jsx-wrap-multilines": "off",
    "react/jsx-one-expression-per-line": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-inline-styles/no-inline-styles": "error",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
};
