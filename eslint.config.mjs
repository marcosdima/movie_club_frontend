import globals from "globals";

export default [
  {
    files: ["**/*.js"], 
    rules: {
      semi: ["error", "always"],
      indent: ["error", 2],
      "object-curly-newline": ["error", {
        "ObjectExpression": { "multiline": true, "minProperties": 3 },
        "ObjectPattern": { "multiline": true },
        "ImportDeclaration": { "multiline": true, "minProperties": 3 },
        "ExportDeclaration": { "multiline": true, "minProperties": 3 }
      }],
      "no-multiple-empty-lines": "error",
      "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "never"
      }],
      "arrow-parens": ["error", "always"],
    },
    languageOptions: {
      sourceType: "module",
    }
  },
  {
    languageOptions: { 
      globals: globals.browser ,
    }
  },
];