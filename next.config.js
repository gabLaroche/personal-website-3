/* eslint-disable */
module.exports = {
  i18n: {
    locales: ['en-CA', 'en', 'fr'],
    defaultLocale: 'en-CA',
  },

  async redirects() {
    return [
      {
        source: '/ie11-death-countdown',
        destination: 'https://death-to-ie11.com/',
        permanent: true,
      },
    ]
  },
}
