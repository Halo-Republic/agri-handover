<template>
  <div class="clearfix">
    <vs-input
      data-vv-validate-on="blur"
      label-placeholder="Username"
      name="displayName"
      placeholder="Username"
      v-model="displayName"
      class="w-full"
    />
    <!-- <span class="text-sm text-danger">{{ errors.first('displayName') }}</span> -->

    <vs-input
      name="email"
      type="email"
      label-placeholder="Email"
      placeholder="Email"
      v-model="email"
      class="w-full mt-6"
    />
    <!-- <span class="text-sm text-danger">{{ errors.first('email') }}</span> -->

    <vs-input
      ref="password"
      type="password"
      name="password"
      label-placeholder="Password"
      placeholder="Password"
      v-model="password"
      class="w-full mt-6"
    />
    <!-- <span class="text-sm text-danger">{{ errors.first('password') }}</span> -->

    <vs-input
      type="password"
      name="confirm_password"
      label-placeholder="Confirm Password"
      placeholder="Confirm Password"
      v-model="confirm_password"
      class="w-full mt-6"
    />
    <!-- <span class="text-sm text-danger">{{ errors.first('confirm_password') }}</span> -->

    <div class="mt-6">
      <a
        href="https://github.com/Halo-Republic/agri-ensights/files/4540482/PRIVACY.POLICY.AGRI.ENSIGHTS.pdf"
        target="_blank"
        rel="noopener noreferrer"
        >PRIVACY POLICY</a
      >
    </div>

    <a
      href="https://github.com/Halo-Republic/agri-ensights/files/4540484/TERMS.AND.CONDITIONS.AGRI.ENSIGHTS.pdf"
      target="_blank"
      rel="noopener noreferrer"
      >TERMS & CONDITIONS</a
    >

    <vs-checkbox v-model="isPrivatePolicyAccepted" class="mt-6"
      >Private Policy.</vs-checkbox
    >
    <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6"
      >Terms & Conditions.</vs-checkbox
    >

    <vs-button class="mt-3 mb-5 w-full" @click="registerUser"
      >Register</vs-button
    >

    <div>
      <vs-button
        class="float-right"
        type="border"
        @click="$router.push('/login')"
        >Login</vs-button
      >

      <vs-button type="border" @click="$router.push('/')">Home</vs-button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      password_1: '',
      password_2: '',
      setPas: false,
      displayName: '',
      email: '',
      password: '',
      confirm_password: '',
      isTermsConditionAccepted: true,
      isPrivatePolicyAccepted: true,
      phNo: '',
      appVerifier: '',
      otp: ''
    }
  },
  computed: {
    validateForm() {
      // return !this.errors.any() && this.displayName != '' && this.email != '' && this.password != '' && this.confirm_password != '' && this.isTermsConditionAccepted === true;
    },

    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn']
    }
  },

  methods: {
    signout() {
      if (process.client) {
        this.$fireAuth().signOut()
        this.$router.push({ path: '/' })
        window.location.reload() //reload on signout !
      }
    },
    checkLogin() {
      // If user is already logged in notify
      if (isUserLoggedIn) {
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
    registerUser() {
      // If form is not validated or user is already login return
      // if (!this.validateForm || !this.checkLogin()) return

      const payload = {
        userDetails: {
          displayName: this.displayName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirm_password,
          b_uid: this.$store.state.business.app_main_business.b_uid
        },
        notify: this.$vs.notify,
        router: this.$router
      }
      this.$store.dispatch('auth/registerUser', payload)
    }
  }
}
</script>
