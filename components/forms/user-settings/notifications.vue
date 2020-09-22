<template>
  <vx-card no-shadow>
    <div class="mb-base">
      <h6 class="mb-4">Activity</h6>

      <div class="flex items-center mb-4">
        <vs-switch v-model="comment" />
        <span class="ml-4">Email me when someone comments onmy article</span>
      </div>
      <div class="flex items-center mb-4">
        <vs-switch v-model="answer" />
        <span class="ml-4">Email me when someone answers on my form</span>
      </div>
      <div class="flex items-center mb-4">
        <vs-switch v-model="follow" />
        <span class="ml-4">Email me hen someone follows me</span>
      </div>
    </div>

    <div>
      <h6 class="mb-4">Application</h6>

      <div class="flex items-center mb-4">
        <vs-switch v-model="news" />
        <span class="ml-4">News and announcements</span>
      </div>
      <div class="flex items-center mb-4">
        <vs-switch v-model="product_update" />
        <span class="ml-4">Weekly product updates</span>
      </div>
      <div class="flex items-center">
        <vs-switch v-model="blog" />
        <span class="ml-4">Weekly blog digest</span>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end mt-base">
      <vs-button class="ml-auto mt-2" @click="updateUser"
        >Save Changes</vs-button
      >
      <vs-button class="ml-4 mt-2" type="border" color="warning"
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
      comment: this.$store.state.user.app_active_user.comment,
      answer: this.$store.state.user.app_active_user.answer,
      follow: this.$store.state.user.app_active_user.follow,
      news: this.$store.state.user.app_active_user.news,
      product_update: this.$store.state.user.app_active_user.product_update,
      blog: this.$store.state.user.app_active_user.blog
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
      .collection('notifications')
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

      ;(user.comment = this.comment),
        (user.answer = this.answer),
        (user.follow = this.follow),
        (user.news = this.news),
        (user.product_update = this.product_update),
        (user.blog = this.blog),
        this.$store.dispatch('user/updateUserInfo', user)
    },
    updateUser() {
      let reft = this.$fireStore
        .collection('user')
        .doc('info')
        .collection('notifications')
        .doc(this.activeUserInfo.uid)

      reft
        .update({
          comment: this.comment,
          answer: this.answer,
          follow: this.follow,
          news: this.news,
          product_update: this.product_update,
          blog: this.blog
        })
        .then(() => {
          this.successUpload()
        })
    }
  }
}
</script>
