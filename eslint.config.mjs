import globals from "globals";

export default [
  {
    files: ["**/*.js"], 
    rules: {
      semi: ["error", "always"]
    },
    languageOptions: {
      sourceType: "module"
    }
  },
  {
    languageOptions: { 
      globals: globals.browser 
    }
  },
];