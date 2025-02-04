// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'es5',
  useTabs: false,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
