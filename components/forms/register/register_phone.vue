<template>
  <div class="clearfix">
    <div v-if="getOPT">
      <vue-tel-input v-model="phNo" v-bind="bindProps"></vue-tel-input>

      <vs-button id="sign-in-button" @click="sendOtp" class="mt-6"
        >Get OTP</vs-button
      >
      <div id="recaptcha-container"></div>
      <br />
    </div>
    <div v-if="!getOPT && !setPas">
      <vs-input class="w-full" type="number" v-model="otp" placeholder="OTP" />
      <vs-button @click="verifyOtp" class="mt-6">Verify</vs-button><br />
      <vs-button @click="sendOtp()" class="float-right mt-6"
        >Resend OTP</vs-button
      >
    </div>
    <div v-if="setPas">
      <!-- <h2>Set Password</h2> -->
      <vs-input
        class="w-full"
        placeholder="Enter Password"
        v-model="password_1"
      /><br />
      <vs-input
        class="w-full"
        placeholder="Re-enter Password"
        v-model="password_2"
      /><br />
      <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6"
        >I accept the terms & conditions.</vs-checkbox
      >
      <vs-button @click="setPassword" class="mt-6">Set Password</vs-button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      getOPT: true,
      phone: '',
      password_1: '',
      password_2: '',
      setPas: false,
      displayName: '',
      email: '',
      password: '',
      confirm_password: '',
      isTermsConditionAccepted: true,
      phNo: '',
      appVerifier: '',
      otp: '',
      bindProps: {
        mode: 'international',
        defaultCountry: 'ZA',
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: 'Enter a phone number',
        required: false,
        enabledCountryCode: false,
        enabledFlags: true,
        preferredCountries: ['AU', 'BR'],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: 'off',
        name: 'telephone',
        maxLen: 25,
        wrapperClasses: '',
        inputClasses: '',
        dropdownOptions: {
          disabledDialCode: false
        },
        inputOptions: {
          showDialCode: true
        }
      }
    }
  },
  computed: {
    validateForm() {
      // return !this.errors.any() && this.displayName != '' && this.email != '' && this.password != '' && this.confirm_password != '' && this.isTermsConditionAccepted === true;
    },
    resellerName() {
      return this.$store.getters['app/resellerName']
    },
    appType() {
      return this.$store.getters['app/appType']
    },
    companyDetails() {
      return this.$store.getters['app/companyDetails']
    },
    isLoggedIn() {
      return this.$store.getters['isLoggedIn']
    }
  },
  created() {
    this.initReCaptcha()
  },
  methods: {
    successOTP() {
      this.$vs.notify({
        color: 'success',
        title: 'SMS Sent',
        text: 'OTP will arrive soon'
      })
    },
    wrongCode() {
      this.$vs.notify({
        color: 'danger',
        title: 'Wrong details',
        text: 'Please check again'
      })
    },
    passwordSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Success',
        text:
          'Password Set successfully ! You can now Login with PHONE & PASSWORD !'
      })
    },
    passwordFailure(err) {
      this.$vs.notify({
        color: 'danger',
        title: 'Error',
        text: `Error : + ${err.message}`
      })
    },
    setPassword() {
      if (process.client) {
        if (this.password_1 != this.password_2) {
          alert('Password did not match !')
        } else {
          console.log('setting password')
          let vm = this
          var user = firebase.auth().currentUser
          //
          let newEmail = firebase.auth().currentUser.phoneNumber
          let newPassword = this.password_1
          //
          user
            .updateEmail(newEmail)
            .then(function() {
              user
                .updatePassword(newPassword)
                .then(function() {
                  vm.passwordSuccess()
                  vm.$router.push('/login') //route to app home !
                })
                .catch(function(error) {
                  vm.passwordFailure(error)
                })
            })
            .catch(function(error) {
              //Logout if session expires !
              if (error.code == 'auth/requires-recent-login') {
                alert(
                  'Your Session has been Expired to Set Password ! Please try again !'
                )
                //
                vm.signout()
              }
            })
        }
      }
    },
    signout() {
      if (process.client) {
        firebase.auth().signOut()
        this.$router.push({ path: '/' })
        window.location.reload() //reload on signout !
      }
    },
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
    registerUser() {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return

      const payload = {
        userDetails: {
          displayName: this.displayName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirm_password,
          resellerName: this.resellerName,
          appType: this.appType,
          b_uid: this.companyDetails.b_uid
        },
        notify: this.$vs.notify
      }
      this.$store.dispatch('auth/registerUser', payload)
    },
    // Cell Phone registeration
    sendOtp() {
      let vm = this
      // if (this.phNo.length > 10) {
      //   alert('Invalid Phone Number Format !')
      // } else {
      //
      let countryCode = '+27' //south africa
      let phoneNumber = this.phNo
      //
      let appVerifier = this.appVerifier
      //
      if (process.client) {
        console.log('phone number', phoneNumber)
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function(confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult
            //
            vm.successOTP()
            vm.getOPT = false
          })
          .catch(function(error) {
            // Error; SMS not sent
            // ...
            alert('Error ! SMS not sent')
          })
        // }
      }
    },
    //
    verifyOtp() {
      if (this.otp.length != 6) {
        vm.wrongCode()
      } else {
        if (process.client) {
          //
          let vm = this
          let code = this.otp
          //
          window.confirmationResult
            .confirm(code)
            .then(function(result) {
              // User signed in successfully.
              var user = result.user
              // ...
              //route to set password !
              vm.setPas = true
            })
            .catch(function(error) {
              vm.wrongCode()
              // User couldn't sign in (bad verification code?)
              // ...
            })
        }
      }
    },
    initReCaptcha() {
      if (process.client) {
        setTimeout(() => {
          let vm = this
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            'recaptcha-container',
            {
              size: 'invisible',
              callback: function(response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
              },
              'expired-callback': function() {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
              }
            }
          )
          //
          this.appVerifier = window.recaptchaVerifier
        }, 1000)
      }
    }
  }
}
</script>
