const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
  },
  // This line is crucial for `next-i18next` to find your translation files.
  // It needs to be an absolute path on the server and a public path on the client.
  localePath: path.resolve('./public/locales'),
  react: { useSuspense: false }, // Recommended for server-side rendering / Next.js
  defaultNS: 'common',
  reloadOnPrerender: process.env.NODE_ENV === 'development',

  // Note: `next-i18next` is primarily designed for the Pages Router.
  // Full integration with the App Router (especially `appWithTranslation` HOC)
  // can be challenging. Alternative i18n strategies are often used for App Router.
};
