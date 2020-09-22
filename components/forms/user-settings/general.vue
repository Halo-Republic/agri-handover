<template>
  <vx-card no-shadow>
    <!-- Img Row -->
    <div class="flex flex-wrap items-center mb-base">
      <vs-avatar :src="activeUserInfo.photoURL" size="70px" class="mb-4 mr-4" />
      <div>
        <imageUpload class="mb-2 mr-4 sm:mb-0" label="Profile Image" />
        <!-- <vs-button class="mb-2 mr-4 sm:mb-0">Upload photo</vs-button> -->
        <!-- <vs-button type="border" color="danger">Remove</vs-button> -->
        <p class="mt-2 text-sm">Allowed JPG, GIF or PNG. Max size of 800kB</p>
      </div>
    </div>

    <!-- Info -->
    <vs-input
      class="w-full mb-base"
      label-placeholder="Username"
      v-model="display_name"
    ></vs-input>
    <vs-input
      class="w-full mb-base"
      label-placeholder="Name"
      v-model="name"
    ></vs-input>
    <vs-input
      class="w-full mb-base"
      label-placeholder="Surname"
      v-model="surname"
    ></vs-input>
    <vs-input
      class="w-full mb-base"
      label-placeholder="Email"
      v-model="email"
    ></vs-input>

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

import imageUpload from '@/components/form-generator/components/imageUpload.vue'

export default {
  components: {
    imageUpload
  },
  data() {
    return {
      display_name: this.$store.state.user.app_active_user.display_name,
      name: this.$store.state.user.app_active_user.name,
      surname: this.$store.state.user.app_active_user.surname,
      email: this.$store.state.user.app_active_user.email
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.user.app_active_user
    },

    uploaded_images() {
      return this.$store.state.form.uploaded_images
    }
  },
  watch: {
    uploaded_images: function() {
      if (this.uploaded_images) {
        let vm = this

        let ref = vm.$fireStore
          .collection('user')
          .doc('info')
          .collection('general')
          .doc(this.activeUserInfo.uid)
        ref
          .update({
            photoURL: this.uploaded_images[0]
          })
          .then(() => {
            vm.successUpload()
            
          })
      }
    }
  },
  methods: {
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })

      //submit user to store
      let user = this.$store.state.user.app_active_user

      user.photoURL = this.uploaded_images[0]
      user.name = this.name
      user.surname = this.surname
      user.email = this.email

      this.$store.dispatch('user/updateUserInfo', user)
      let empty = []
            vm.$store.state.form.uploaded_images = []
    },
    updateUser() {
      let ref = this.$fireStore
        .collection('user')
        .doc('info')
        .collection('general')
        .doc(this.activeUserInfo.uid)
      ref
        .update({
          display_name: this.display_name,
          email: this.email,
          name: this.name,
          surname: this.surname
          //   about: this.activeUserInfo.about
        })
        .then(() => {
          console.log('this', this.name)
          this.successUpload()
        })
    }
  }
}
</script>
