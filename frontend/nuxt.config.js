import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,

  target: 'static',

  head: {
    titleTemplate: '%s - frontend',
    title: 'frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [
    { src:'~/plugins/marquee.js', ssr: false },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  robots: {
    UserAgent: '*',
    Disallow: '/'
  },

  axios: {
    // proxy: true
    proxy: false
  },
  proxy:{
    '/api/v1': { target: 'http://localhost:5230/api/v1', pathRewrite: { '^/api/v1': '' } }
  },
  env:{
    api_url_dev : "/api/v1",
    api_url_prod : "http://localhost:5230/api/v1",
    argv:'prod'
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          dg1:'#028174',
          dg2:'#0AB68B',
          dg3:'#92DE8B',
          dg4:'#FFE3B3',
          dg5:'#ebebeb',
          dg6:'#657e98',
          while:'#FFFFFF',
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      },
    },
  },

  build: {},
}
