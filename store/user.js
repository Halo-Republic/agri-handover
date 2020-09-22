const userDefaults = {
  uid: 0, // From Auth
  displayName: 'John Doe', // From Auth
  about: 'Dessert chocolate cake lemon drops jujubes. Biscuit c',
  avatar: require('@/static/icon.png'), // From Auth
  status: 'online',
  userRole: 'admin'
}

const userInfoLocalStorage = userDefaults

// Set default values for active-user
// More data can be added by auth provider or other plugins/packages
const getUserInfo = () => {
  let userInfo = {}

  // Update property in user
  Object.keys(userDefaults).forEach(key => {
    // If property is defined in localStorage => Use that
    userInfo[key] = userInfoLocalStorage[key]
      ? userInfoLocalStorage[key]
      : userDefaults[key]
  })

  // Include properties from localStorage
  Object.keys(userInfoLocalStorage).forEach(key => {
    if (userInfo[key] == undefined && userInfoLocalStorage[key] != null)
      userInfo[key] = userInfoLocalStorage[key]
  })

  return userInfo
}

export const state = () => ({
  authUser: null,
  app_active_user: getUserInfo(),
  app_displayed_user: {}
})

export const mutations = {
  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  // Updates user info in state and localstorage
  UPDATE_USER_INFO(state, payload) {
    if (process.client) {
      // Get Data localStorage
      let userInfo = state.app_active_user

      for (const property of Object.keys(payload)) {
        if (payload[property] != null) {
          // If some of user property is null - user default property defined in state.app_active_user
          state.app_active_user[property] = payload[property]

          // Update key in localStorage
          userInfo[property] = payload[property]
        }
      }
      // Store data in localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  },

  handleSuccessfulAuthentication({ commit }, { authUser, claims }) {
    // Install servicerWorker if supported on sign-in/sign-up page.
    if (process.browser && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-auth-sw.js', { scope: '/' })
    }
    commit('SET_AUTH_USER', { authUser })
  },

  checkVuexStore(ctx) {
    if (this.$fireAuth === null) {
      throw 'Vuex Store example not working - this.$fireAuth cannot be accessed.'
    }

    alert(
      'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
    )
    return
  },

  async logoutUser({ commit, dispatch }) {
    try {
      await this.$fireAuth.signOut()
    } catch (e) {
      // Do nothing, not properly signed in anyway.
      console.error(e)
    } finally {
      // Reset store
      commit('RESET_STORE')
    }
  },

  APP_DISPLAYED_USER(state, payload) {
    state.app_displayed_user = payload
  }
}

export const actions = {
  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },
  updateUserRole({ dispatch }, payload) {
    // Change client side
    payload.aclChangeRole(payload.userRole)

    // Make API call to server for changing role

    // Change userInfo in localStorage and store
    dispatch('updateUserInfo', { userRole: payload.userRole })
  }
}

export const getters = {
  app_active_user: state => state.app_active_user,
  isLoggedIn: state => {
    try {
      return state.app_active_user.uid !== 0
    } catch {
      return false
    }
  }
}

export const strict = false
