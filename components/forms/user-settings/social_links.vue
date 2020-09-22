<template>
  <vx-card no-shadow>
    <vs-input
      class="w-full mb-base"
      v-model="twitter"
      icon-pack="feather"
      icon="icon-twitter"
      label="Twitter"
      icon-no-border
    />
    <vs-input
      class="w-full mb-base"
      v-model="facebook"
      icon-pack="feather"
      icon="icon-facebook"
      label="Facebook"
      icon-no-border
    />
    <vs-input
      class="w-full mb-base"
      v-model="instagram"
      icon-pack="feather"
      icon="icon-instagram"
      label="Instagram"
      icon-no-border
    />
    <vs-input
      class="w-full mb-base"
      v-model="github"
      icon-pack="feather"
      icon="icon-github"
      label="GitHub"
      icon-no-border
    />
    <vs-input
      class="w-full mb-base"
      v-model="linkedin"
      icon-pack="feather"
      icon="icon-linkedin"
      label="Linkedin"
      icon-no-border
    />
    <vs-input
      class="w-full mb-base"
      v-model="slack"
      icon-pack="feather"
      icon="icon-slack"
      label="Slack"
      icon-no-border
    />

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="mt-2 ml-auto" @click="updateUser"
        >Save Changes</vs-button
      >
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
      twitter: this.$store.state.user.app_active_user.twitter,
      facebook: this.$store.state.user.app_active_user.facebook,
      instagram: this.$store.state.user.app_active_user.instagram,
      github: this.$store.state.user.app_active_user.github,
      linkedin: this.$store.state.user.app_active_user.linkedin,
      slack: this.$store.state.user.app_active_user.slack
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.user.app_active_user
    }
  },
  created() {
    let vm = this

    this.$fireStore
      .collection('user')
      .doc('info')
      .collection('social_links')
      .doc(this.activeUserInfo.uid)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          const userAll = { ...vm.activeUserInfo, ...doc.data() }
          vm.$store.dispatch('user/updateUserInfo', userAll)
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error)
      })
  },
  methods: {
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })
      let user = this.$store.state.user.app_active_user

      ;(user.twitter = this.twitter),
        (user.facebook = this.facebook),
        (user.instagram = this.instagram),
        (user.github = this.github),
        (user.linkedin = this.linkedin),
        (user.slack = this.slack)
      this.$store.dispatch('user/updateUserInfo', user)
    },
    updateUser() {
      
      let reft = this.$fireStore
        .collection('user')
        .doc('info')
        .collection('social_links')
        .doc(this.activeUserInfo.uid)

      reft
        .update({
          twitter: this.twitter,
          facebook: this.facebook,
          instagram: this.instagram,
          github: this.github,
          linkedin: this.linkedin,
          slack: this.slack
        })
        .then(() => {
          this.successUpload()
        })
    }
  }
}
</script>
