<template>
  <vx-card no-shadow>
    <vs-input
      class="w-full mb-base"
      label-placeholder="Old Password"
      v-model="old_password"
    />
    <vs-input
      class="w-full mb-base"
      label-placeholder="New Password"
      v-model="new_password"
    />
    <vs-input
      class="w-full mb-base"
      label-placeholder="Confirm Password"
      v-model="confirm_new_password"
    />

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="mt-2 ml-auto">Save Changes</vs-button>
      <vs-button class="mt-2 ml-4" type="border" color="warning"
        >Reset</vs-button
      >
    </div>
  </vx-card>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      old_password: '',
      new_password: '',
      confirm_new_password: ''
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    },
    userDetails() {
      return this.$store.getters['userManagement/userDetails']
    },
    resellerName() {
      return this.$store.getters['app/resellerName']
    },
    appType() {
      return this.$store.getters['app/appType']
    },
    companyDetails() {
      return this.$store.getters['app/companyDetails']
    }
  },
  methods: {
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })
    },
    newComponent() {
      if (this.appType == 'backend') {
        let ref = this.$fireStore
          .collection(this.resellerName)
          .doc('user')
          .collection('users')
          .doc(firebase.auth().currentUser.uid)

        ref.update({
          displayName: this.userDetails.displayName,
          email: this.userDetails.email,
          name: this.userDetails.name,
          surname: this.userDetails.surname,
          about: this.userDetails.about,
          phone: this.userDetails.phone,
          website: this.userDetails.website,
          lives: this.userDetails.lives
        })
        this.successUpload()
      } else {
        let reft = this.$fireStore
          .collection(this.resellerName)
          .doc(this.userDetails.b_uid)
          .collection('users')
          .doc(firebase.auth().currentUser.uid)

        reft.update({
          displayName: this.userDetails.displayName,
          email: this.userDetails.email,
          name: this.userDetails.name,
          surname: this.userDetails.surname,
          about: this.userDetails.about,
          phone: this.userDetails.phone,
          website: this.userDetails.website,
          lives: this.userDetails.lives
        })
        this.successUpload()
      }

      this.userDetailsAdd()
    }
  }
}
</script>
