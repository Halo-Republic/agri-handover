<template>
  <div class="flex items-center">
    <vs-avatar
      :src="params.data.photoURL"
      class="flex-shrink-0 mr-2"
      size="30px"
      @click="goto(params.data)"
    />
  </div>
</template>

<script>
export default {
  name: 'CellRendererLink',
  data() {
    return {
      general: {},
      info: {},
      social: {},
      noti: {}
    }
  },
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    }
  },
  methods: {
    goto(data) {
      this.general = data
      let uid = data.uid
      let vm = this

      var docRef = this.$fireStore
        .collection('apps')
        .doc('users')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('info')
        .collection('info')
        .doc(uid)

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            vm.info = doc.data()
            vm.getSocial(uid)
            vm.getNoti(uid)
          } else {
            console.log('No such document!')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    },
    getSocial(uid) {
      let vm = this

      var docRef = this.$fireStore
        .collection('apps')
        .doc('users')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('info')
        .collection('social_links')
        .doc(uid)

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            vm.social = doc.data()
          } else {
            console.log('No such document!')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    },
    getNoti(uid) {
      let vm = this

      var docRef = this.$fireStore
        .collection('apps')
        .doc('users')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('info')
        .collection('notifications')
        .doc(uid)

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            vm.noti = doc.data()
            vm.getGoing()
          } else {
            console.log('No such document!')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    },
    getGoing() {
      let data = { ...this.general, ...this.info, ...this.social, ...this.noti }

      this.$store.commit('user/APP_DISPLAYED_USER', data)
      this.$router.push(`/dashboard/users/staff/user-view`)
    }
  }
}
</script>
