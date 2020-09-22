<template>
  <div>
    <vs-input
      name="email"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Email"
      v-model="email"
      class="w-full"
    />

    <vs-input
      type="password"
      name="password"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      label-placeholder="Password"
      v-model="password"
      class="w-full mt-6"
    />

    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3"
        >Remember Me</vs-checkbox
      >
      <router-link to="/forgot_password">Forgot Password?</router-link>
    </div>
    <vs-button class="mt-3 mb-5 w-full" @click="signInUser">Login</vs-button>

    <div>
      <vs-button
        class="float-right"
        type="border"
        @click="$router.push('/register')"
        >Register</vs-button
      >

      <vs-button type="border" @click="$router.push('/')">Home</vs-button>
    </div>

    <div class="flex flex-wrap items-center mt-4 social-login-buttons"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'demo@demo.com',
      password: 'demodemo',
      checkbox_remember_me: false
    }
  },
  computed: {
    validateForm() {
      //   return !this.errors.any() && this.email != '' && this.password != '';
    },
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn']
    },
    authUser() {
      return this.$store.state['user/authUser']
    }
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (isUserLoggedIn) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
        return false
      }
      return true
    },
    login() {
      // Loading
      this.$vs.loading()

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password,
          isLoggedIn: this.isLoggedIn
        },
        notify: this.$vs.notify,
        closeAnimation: this.$vs.loading.close
      }
      this.$store.dispatch('auth/loginAttempt', payload)
    },
    async signInUser() {
      let vm = this
      try {
        await this.$fireAuth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(function() {
            vm.$router.push('/')
          })
      } catch (e) {
        vm.failedLogin(e)
      }
    },

    failedLogin(e) {
      this.$vs.notify({
        title: 'Login Attempt',
        text: `${e}`,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      })
    }
  }
}
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>
