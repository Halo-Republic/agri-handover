<template>
  <vx-card title="Sign Up" vs-align="center" vs-type="flex" vs-justify="center">
    <vs-input placeholder="Name" class="w-full mb-4" v-model="name" />
    <vs-input
      placeholder="Email"
      type="email"
      class="w-full mb-4"
      v-model="email"
    />

    <vs-button class="mr-4" @click="blogSignup">Submit</vs-button>
  </vx-card>
</template>
<script>
import moment from 'moment'
import firebase from 'firebase'
export default {
  components: {},
  data() {
    return {
      name: '',
      email: ''
    }
  },
  computed: {
    b_uid() {
      return this.$store.getters['b_uid']
    },
    routeSet() {
      return this.$store.getters['app/route']
    },
    user() {
      return this.$store.getters['profile/user']
    },
    companyDetails() {
      return this.$store.getters['app/companyDetails']
    },
    resellerName() {
      return this.$store.getters['app/resellerName']
    },
    component() {
      return this.$store.getters['app/componentDetails']
    },
    routeID() {
      return this.$store.getters['route/routeID']
    },
    routeDisplayName() {
      return this.$store.getters['route/routeDisplayName']
    },
    routeName() {
      return this.$store.getters['route/routeName']
    },
    is_blank() {
      return this.$store.getters['route/isBlank']
    },
    userDetails() {
      return this.$store.getters['userManagement/userDetails']
    }
  },

  methods: {
    blogSignup() {
      let routeID = this.routeID
      let aroundRetrieve

      aroundRetrieve = this.$fireStore
        .collection('agri-ensights')
        .doc('apps')
        .collection('blog')
        .doc('signup')

      aroundRetrieve
        .update({
          users: firebase.firestore.FieldValue.arrayUnion(this.email)
        })
        .then(() => {
          this.UserBlog()
        })
    },
    UserBlog() {
      let addUsers

      addUsers = this.$fireStore
        .collection('agri-ensights')
        .doc('apps')
        .collection('blog')
        .doc('signup')
        .collection('person')

      addUsers.add({
        name: this.name,
        email: this.email,
        created_date: moment().format('DD-MM-YYYY'),
        created_month: moment().format('MM-YYYY'),
        timestamp: Date.now()
      })
      this.successUpload()
    },
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'You have been loaded'
      })
    }
  }
}
</script>

<style></style>
