<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
 
========================================================================================== -->

<template>
  <div class="relative">
    <div class="vx-navbar-wrapper" :class="classObj">
      <vs-navbar
        class="vx-navbar navbar-custom navbar-skelton"
        :color="navbarColorLocal"
        :class="textColor"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="p-2 cursor-pointer sm:inline-flex "
          icon="MenuIcon"
          @click.stop="showSidebar"
        />

        <nuxt-link
          tag="div"
          to="/"
          class="flex items-center mx-auto cursor-pointer vx-logo"
          v-if="!isMobile"
        >
          <logo class="w-10 mr-4 fill-current text-primary" alt="logo" />
        </nuxt-link>
        <p class="font-semibold ml-5" v-if="!isMobile">
          {{ $store.state.business.app_main_business.b_name }}
        </p>

        <!-- <bookmarks
          :navbarColor="navbarColor"
          v-if="windowWidth >= 992 && showNav.bookmarksNow"
        />
        <bookmarks
          :navbarColor="navbarColor"
          v-if="windowWidth >= 992 && showNav.bookmarksNow"
        /> -->

        <vs-spacer />

        <!-- <i18n v-if="showNav.i18nNow"/> -->

        <!-- <search-bar v-if='showNav.searchNow'/> -->

        <cart-drop-down v-if="isLoggedIn" />

        <notification-drop-down v-if="isLoggedIn" />

        <profile-drop-down v-if="isLoggedIn" />

        <feather-icon
          icon="LogOutIcon"
          class="ml-3"
          svg-classes="w-4 h-4"
          @click="logout"
          v-if="isLoggedIn"
        />
        <span
          class="ml-2"
          @click="logout"
          v-if="isLoggedIn"
          style="cursor: pointer"
          >Logout</span
        >

        <feather-icon
          icon="LogOutIcon"
          class="ml-3"
          svg-classes="w-4 h-4"
          @click="register"
          v-if="isLoggedIn && userApps.apps.length < 1"
        />
        <span
          class="ml-2"
          @click="register"
          v-if="isLoggedIn && userApps.apps.length < 1"
          style="cursor: pointer"
          >Register as a seller
        </span>
        <feather-icon
          icon="LogOutIcon"
          class="ml-3"
          svg-classes="w-4 h-4"
          @click="register"
          v-if="!isLoggedIn"
        />
        <span
          class="ml-2"
          @click="login"
          v-if="!isLoggedIn"
          style="cursor: pointer"
          >Login/Register</span
        >
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Logo from '../Logo.vue'
import Bookmarks from './components/Bookmarks.vue'
import I18n from './components/I18n.vue'
import SearchBar from './components/SearchBar.vue'
import CartDropDown from './components/CartDropDown.vue'
import NotificationDropDown from './components/NotificationDropDown.vue'
import ProfileDropDown from './components/ProfileDropDown.vue'

export default {
  name: 'TheNavbarVertical',
  components: {
    Logo,
    Bookmarks,
    I18n,
    SearchBar,
    CartDropDown,
    NotificationDropDown,
    ProfileDropDown
  },
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {}
  },
  computed: {
    userApps() {
      return this.$store.state.user.app_active_user
    },
    isMobile() {
      return this.$store.state.app.isMobile
    },
    showNav() {
      return this.$store.getters['navbar/showNav']
    },
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn']
    },
    navbarColorLocal() {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff'
        ? '#10163a'
        : this.navbarColor
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor() {
      return {
        'text-white':
          (this.navbarColor != '#10163a' &&
            this.$store.state.theme === 'dark') ||
          (this.navbarColor != '#fff' && this.$store.state.theme !== 'dark')
      }
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj() {
      if (this.verticalNavMenuWidth == 'default') return 'navbar-default'
      else if (this.verticalNavMenuWidth == 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth) return 'navbar-full'
    }
  },
  methods: {
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    },
    register() {
      this.$router.push('/register')
    },
    login() {
      this.$router.push('/login')
    },
    logout() {
      // if user is logged in via firebase
      let payload = {
        uid: 0, // From Auth
        disp_name: 'Guest', // From Auth
        about: 'Dessert chocolate cake lemon drops jujubes. Biscuit c',
        avatar: require('@/static/icon.png'), // From Auth
        status: 'online',
        userRole: 'admin'
      }

      this.$store.commit('user/UPDATE_USER_INFO', payload)

      let business = []

      this.$store.commit('business/UPDATE_BUSINESS_INFO', payload)

      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>
