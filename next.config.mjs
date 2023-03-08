// @ts-check

//import { translations } from "./languages/translations.js";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
  i18n: {
    locales: ["en_US", "sv_SE"],
    defaultLocale: "en_US",
  },

  /*i18n: {
    locales: Object.keys(translations),
    defaultLocale: Object.keys(translations)[0] || 'en',
  },*/
};
export default config;
