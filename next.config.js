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
      {
        source: '/en-CA/about',
        destination: '/en/about',
        locale: false,
        permanent: false,
      },
      {
        source: '/en-CA/projects',
        destination: '/en/projects',
        locale: false,
        permanent: false,
      },
      {
        source: '/en-CA/projects/:slug',
        destination: '/en/projects/:slug',
        locale: false,
        permanent: false,
      },
      {
        source: '/en-CA/blog',
        destination: '/en/blog',
        locale: false,
        permanent: false,
      },
      {
        source: '/en-CA/blog/:slug',
        destination: '/en/blog/:slug',
        locale: false,
        permanent: false,
      },
    ]
  },
}
