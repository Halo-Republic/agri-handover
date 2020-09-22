module.exports = {
  mode: 'spa',
  debug: true,
  // srcDir: 'src',
  // buildDir: 'functions/.nuxt',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'We are launching our Agri Marketplace'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    // VUESAX
    'vuesax/dist/vuesax.css',
    // SCSS file in the project
    '~/assets/css/loader.css',
    // Tailwind
    '~/assets/css/main.css',
    // SCSS file in the project
    '~/assets/css/iconfont.css',
    // SCSS file in the project
    '~/assets/scss/main.scss',
    // Material Icons
    'material-icons/iconfont/material-icons.css',
    //Scroll bar
    'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
  ],
  /*
   ** Router middleware
   */
  router: {
    middleware: 'routing'
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vuesax',
    { src: '~/plugins/globalComponents', mode: 'client' },
    { src: '~/plugins/i18n/i18n', mode: 'client' },
    { src: '~/plugins/filters', mode: 'client' }
    // { src: './plugins/vue-awesome-swiper.js', ssr: false }
    // { src: '~/plugins/axios', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    configPath: '~/config/tailwind.config.js',
    cssPath: '~/assets/css/main.css',
    purgeCSSInDev: false,
    purge: false
  },
  /*
   ** Router middleware
   */
  // router: {
  //   middleware: 'routing'
  // },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-purgecss',
    '@nuxtjs/firebase',
    // [
    //   'nuxt-lazy-load',
    //   {
    //     // These are the default values
    //     images: true,
    //     videos: true,
    //     audios: true,
    //     iframes: true,
    //     native: false,
    //     polyfill: true,
    //     directiveOnly: false,

    //     // Default image must be in the static folder
    //     defaultImage: '/assets/images/default-image.jpg',

    //     // To remove class set value to false
    //     loadingClass: 'isLoading',
    //     loadedClass: 'isLoaded',
    //     appendClass: 'lazyLoad',

    //     observerConfig: {
    //       // See IntersectionObserver documentation
    //     }
    //   }
    // ],
    [
      'nuxt-sass-resources-loader',
      ['./assets/css/main.scss'],
      ['~/assets/css/loader.css'],
      ['~/assets/css/iconfont.css'],
      ['~/assets/scss/main.scss'],
      ['material-icons/iconfont/material-icons.css'],
      ['vuesax/dist/vuesax.css'],
      ['swiper/dist/css/swiper.min.css'],
      ['vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css']
    ]
  ],

  /*
   ** Firebase Config
   */
  firebase: {
    config: {
      production: {
        apiKey: 'AIzaSyDasJZDwGeFlc2m26MwXyUvTeOdPUg1Wig',
        authDomain: 'test-halo-projects.firebaseapp.com',
        databaseURL: 'https://test-halo-projects.firebaseio.com',
        projectId: 'test-halo-projects',
        storageBucket: 'test-halo-projects.appspot.com',
        messagingSenderId: '874056508972',
        appId: '1:874056508972:web:92eacac0dc860a1f735389',
        measurementId: 'G-VM98TWRDL9'
      },
      development: {
        apiKey: 'AIzaSyDasJZDwGeFlc2m26MwXyUvTeOdPUg1Wig',
        authDomain: 'test-halo-projects.firebaseapp.com',
        databaseURL: 'https://test-halo-projects.firebaseio.com',
        projectId: 'test-halo-projects',
        storageBucket: 'test-halo-projects.appspot.com',
        messagingSenderId: '874056508972',
        appId: '1:874056508972:web:92eacac0dc860a1f735389',
        measurementId: 'G-VM98TWRDL9'
      }
    },
    customEnv: false,
    onFirebaseHosting: false,
    services: {
      auth: {
        // Experimental Feature, use with caution.
        initialize: {
          onSuccessMutation: 'SET_AUTH_USER',
          onSuccessAction: null,
          onErrorMutation: null,
          onErrorAction: 'handleAuthError',
          ssr: true // Default
        }
      },
      firestore: {
        static: false, // default
        preload: false, // default
        chunkName:
          process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
        enablePersistence: true
      },
      functions: {
        location: 'us-central1', // Default
        emulatorPort: 12345
      },
      storage: true,
      realtimeDb: true,
      performance: true,
      analytics: true,
      remoteConfig: {
        settings: {
          fetchTimeoutMillis: 60000, // Default
          minimumFetchIntervalMillis: 43200000 // Default
        },
        defaultConfig: {
          welcome_message: 'Welcome'
        }
      },
      messaging: {
        createServiceWorker: true
      }
    }
  },

  /*
   ** Purge CSS
   */
  purgeCSS: {
    enabled: false
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    transpile: [
      'vue-instantsearch',
      'instantsearch.js/es',
      'ag-grid-vue',
      'moment',
      'three',
      'vue-select',
      'verte',
      'vue2-perfect-scrollbar',
      'vue-svg-gauge',
      'vue2-google-maps',
      'vuedraggable',
      'vue-signature-pad',
      'latlon-geohash',
      'vue-simple-calendar'
    ],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.output.globalObject = 'this'
      config.module.rules.push({
        test: /\.pdf$/,
        loader: 'url-loader'
      })
    }
  }
}
