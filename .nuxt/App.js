import Vue from 'vue'

import { getMatchedComponentsInstances, getChildrenComponentInstancesUsingFetch, promisify, globalHandleError, urlJoin, sanitizeComponent } from './utils'

import NuxtLoading from './components/nuxt-loading.vue'

import '../assets/css/main.css'

import '../node_modules/vuesax/dist/vuesax.css'

import '../assets/css/loader.css'

import '../assets/css/main.css'

import '../assets/css/iconfont.css'

import '../assets/scss/main.scss'

import '../node_modules/material-icons/iconfont/material-icons.css'

import '../node_modules/vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

import _355e213a from '../layouts/components/customizer/TheCustomizer.vue'
import _38fd0e7e from '../layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue'
import _c7c752be from '../layouts/components/horizontal-nav-menu/HorizontalNavMenuGroup.vue'
import _2f34f2aa from '../layouts/components/horizontal-nav-menu/HorizontalNavMenuHeader.vue'
import _3ed88eb1 from '../layouts/components/horizontal-nav-menu/HorizontalNavMenuItem.vue'
import _88f06324 from '../layouts/components/Logo.vue'
import _7a1a0ac0 from '../layouts/components/navbar/components/Bookmarks.vue'
import _2369d864 from '../layouts/components/navbar/components/CartDropDown.vue'
import _22dbc37b from '../layouts/components/navbar/components/I18n.vue'
import _d8030cce from '../layouts/components/navbar/components/NotificationDropDown.vue'
import _7254177d from '../layouts/components/navbar/components/ProfileDropDown.vue'
import _6aa9e60e from '../layouts/components/navbar/components/SearchBar.vue'
import _e618e0e0 from '../layouts/components/navbar/navbarSearchAndPinList.js'
import _d9e91aae from '../layouts/components/navbar/TheNavbarHorizontal.vue'
import _8e17a98a from '../layouts/components/navbar/TheNavbarVertical.vue'
import _7732faee from '../layouts/components/TheFooter.vue'
import _3cda3fe0 from '../layouts/components/vertical-nav-menu/navMenuItems.js'
import _623bfb1a from '../layouts/components/vertical-nav-menu/VerticalNavMenu.vue'
import _4b84eb85 from '../layouts/components/vertical-nav-menu/VerticalNavMenuGroup.vue'
import _c1506566 from '../layouts/components/vertical-nav-menu/VerticalNavMenuItem.vue'
import _537fb80d from '../layouts/components/vx-tooltip/VxTooltip.vue'
import _8c66b3b0 from '../layouts/components/VxBreadcrumb.vue'
import _6f6c098b from '../layouts/default.vue'
import _b1fb6098 from '../layouts/fullPage.vue'

const layouts = { "_components/customizer/TheCustomizer": sanitizeComponent(_355e213a),"_components/horizontal-nav-menu/HorizontalNavMenu": sanitizeComponent(_38fd0e7e),"_components/horizontal-nav-menu/HorizontalNavMenuGroup": sanitizeComponent(_c7c752be),"_components/horizontal-nav-menu/HorizontalNavMenuHeader": sanitizeComponent(_2f34f2aa),"_components/horizontal-nav-menu/HorizontalNavMenuItem": sanitizeComponent(_3ed88eb1),"_components/Logo": sanitizeComponent(_88f06324),"_components/navbar/components/Bookmarks": sanitizeComponent(_7a1a0ac0),"_components/navbar/components/CartDropDown": sanitizeComponent(_2369d864),"_components/navbar/components/I18n": sanitizeComponent(_22dbc37b),"_components/navbar/components/NotificationDropDown": sanitizeComponent(_d8030cce),"_components/navbar/components/ProfileDropDown": sanitizeComponent(_7254177d),"_components/navbar/components/SearchBar": sanitizeComponent(_6aa9e60e),"_components/navbar/navbarSearchAndPinList": sanitizeComponent(_e618e0e0),"_components/navbar/TheNavbarHorizontal": sanitizeComponent(_d9e91aae),"_components/navbar/TheNavbarVertical": sanitizeComponent(_8e17a98a),"_components/TheFooter": sanitizeComponent(_7732faee),"_components/vertical-nav-menu/navMenuItems": sanitizeComponent(_3cda3fe0),"_components/vertical-nav-menu/VerticalNavMenu": sanitizeComponent(_623bfb1a),"_components/vertical-nav-menu/VerticalNavMenuGroup": sanitizeComponent(_4b84eb85),"_components/vertical-nav-menu/VerticalNavMenuItem": sanitizeComponent(_c1506566),"_components/vx-tooltip/VxTooltip": sanitizeComponent(_537fb80d),"_components/VxBreadcrumb": sanitizeComponent(_8c66b3b0),"_default": sanitizeComponent(_6f6c098b),"_fullPage": sanitizeComponent(_b1fb6098) }

export default {
  render (h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })

    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [layoutEl])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter (el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [templateEl])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,

      transitionEl
    ])
  },

  data: () => ({
    isOnline: true,

    layout: null,
    layoutName: '',

    nbFetching: 0
    }),

  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    if (process.client) {
      // add to window so we can listen when ready
      window.$nuxt = this

      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
    // Add $nuxt.context
    this.context = this.$options.context
  },

  async mounted () {
    this.$loading = this.$refs.loading
  },

  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline () {
      return !this.isOnline
    },

    isFetching () {
      return this.nbFetching > 0
    },
  },

  methods: {
    refreshOnlineStatus () {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    async refresh () {
      const pages = getMatchedComponentsInstances(this.$route)

      if (!pages.length) {
        return
      }
      this.$loading.start()

      const promises = pages.map((page) => {
        const p = []

        // Old fetch
        if (page.$options.fetch && page.$options.fetch.length) {
          p.push(promisify(page.$options.fetch, this.context))
        }
        if (page.$fetch) {
          p.push(page.$fetch())
        } else {
          // Get all component instance to call $fetch
          for (const component of getChildrenComponentInstancesUsingFetch(page.$vnode.componentInstance)) {
            p.push(component.$fetch())
          }
        }

        if (page.$options.asyncData) {
          p.push(
            promisify(page.$options.asyncData, this.context)
              .then((newData) => {
                for (const key in newData) {
                  Vue.set(page.$data, key, newData[key])
                }
              })
          )
        }

        return Promise.all(p)
      })
      try {
        await Promise.all(promises)
      } catch (error) {
        this.$loading.fail(error)
        globalHandleError(error)
        this.error(error)
      }
      this.$loading.finish()
    },

    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) {
          this.$loading.fail(this.nuxt.err)
        }
        if (this.$loading.finish) {
          this.$loading.finish()
        }
      }
    },

    setLayout (layout) {
      if(layout && typeof layout !== 'string') {
        throw new Error('[nuxt] Avoid using non-string value as layout property.')
      }

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    },
  },

  components: {
    NuxtLoading
  }
}
