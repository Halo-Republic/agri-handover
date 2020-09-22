import firebase from 'firebase'
import moment from 'moment'

export const state = () => ({
  namespaced: true,
  isUserLoggedIn: () => {
    let isAuthenticated = false

    // get firebase current user
    const firebaseCurrentUser = this.$fireAuth.currentUser

    if (firebaseCurrentUser) isAuthenticated = true
    else isAuthenticated = false

    return localStorage.getItem('userInfo') && isAuthenticated
  },
  router: ''
})

export const actions = {
  loginAttempt({ dispatch }, payload) {
    // New payload for login action
    const newPayload = {
      userDetails: payload.userDetails,
      notify: payload.notify,
      closeAnimation: payload.closeAnimation
    }

    // If remember_me is enabled change firebase Persistence
    if (!payload.checkbox_remember_me) {
      // Change firebase Persistence
      this.$fireAuth
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)

        // If success try to login
        .then(function() {
          dispatch('login', newPayload)
        })

        // If error notify
        .catch(function(err) {
          // Close animation if passed as payload
          if (payload.closeAnimation) payload.closeAnimation()

          payload.notify({
            time: 2500,
            title: 'Error',
            text: err.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    } else {
      // Try to login
      dispatch('login', newPayload)
    }
  },
  async login({ commit, state, dispatch }, payload) {
    console.log('userDetialse', payload)
    let vm = this
    try {
      await this.$fireAuth
        .signInWithEmailAndPassword(
          payload.userDetails.email,
          payload.userDetails.password
        )
        .then(function() {
          payload.router.push('/')
        })
    } catch (e) {
      alert(e)
    }
  },

  registerUser({ dispatch }, payload) {
    // create user using firebase
    this.$fireAuth
      .createUserWithEmailAndPassword(
        payload.userDetails.email,
        payload.userDetails.password
      )
      .then(
        (cred) => {
          payload.notify({
            title: 'Account Created',
            text: 'You are successfully registered!',
            iconPack: 'feather',
            icon: 'icon-check',
            color: 'success'
          })

          const newPayload = {
            userDetails: payload.userDetails,
            notify: payload.notify,
            router: payload.router,
            updateUsername: true
          }

          let general = this.$fireStore
            .collection('user')
            .doc('info')
            .collection('general')
            .doc(cred.user.uid)

          let bus_general = this.$fireStore
            .collection('apps')
            .doc('users')
            .collection(payload.userDetails.b_uid)
            .doc('info')
            .collection('general')
            .doc(cred.user.uid)

          general.set({
            uid: cred.user.uid,
            disp_name: payload.userDetails.displayName,
            email: payload.userDetails.email,
            date: moment().format('DD-MM-YYYY'),
            t_stamp: Date.now()
          })

          bus_general.set({
            date: moment().format('DD-MM-YYYY'),
            month: moment().format('MM-YYYY'),

            t_stamp: Date.now(),
            branch: '',
            disp_name: payload.userDetails.displayName,
            email: payload.userDetails.email,
            uid: cred.user.uid,
            l_act: moment().format('DD-MM-YYYY'),
            name: '',
            mobile: null,
            o_status: 'Online',
            avatar: '',
            pos: '',
            p_notes: [],
            role: 'User',
            status: 'Active',
            surname: '',
            verified: false
          })

          dispatch('login', newPayload)
        },
        (error) => {
          payload.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        }
      )
  },

  updateUsername({ commit }, payload) {
    payload.user
      .updateProfile({
        displayName: payload.displayName
      })
      .then(() => {
        // If username update is success
        // update in localstorage
        let newUserData = Object.assign({}, payload.user.providerData[0])
        newUserData.displayName = payload.displayName
        commit('UPDATE_USER_INFO', newUserData, { root: true })

        // If reload is required to get fresh data after update
        // Reload current page
        if (payload.isReloadRequired) {
          router.push(router.currentRoute.query.to || '/')
        }
      })
      .catch((err) => {
        payload.notify({
          time: 8800,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
  }
}
