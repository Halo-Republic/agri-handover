<template>
  <vx-card no-shadow>
    <!-- Bio -->
    <vs-textarea label="Bio" v-model="about" placeholder="Your bio..." />

    <!-- DOB -->
    <div class="mt-8">
      <label class="text-sm">Birth Date</label>
      <flat-pickr
        v-model="dob"
        :config="{ dateFormat: 'd F Y' }"
        class="w-full"
      />
    </div>

    <!-- Country -->
    <div class="mt-8">
      <label class="text-sm">Country</label>
      <v-select
        v-model="country"
        :options="countryOptions"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
      />
    </div>

    <!-- Languages -->
    <div class="mt-8">
      <label class="text-sm">Languages</label>
      <v-select
        v-model="languages_known"
        multiple
        :closeOnSelect="false"
        :options="langOptions"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
      />
    </div>

    <!-- Mobile Number -->
    <vs-input
      class="w-full mt-8"
      type="number"
      label-placeholder="Mobile"
      v-model="mobile"
    />

    <!-- Website  -->
    <vs-input
      class="w-full mt-8"
      label-placeholder="Website"
      v-model="website"
    />

    <!-- Gender -->
    <div class="mt-8 mb-base">
      <label class="text-sm">Gender</label>
      <div class="mt-2">
        <vs-radio v-model="gender" vs-value="male" class="mr-4">Male</vs-radio>
        <vs-radio v-model="gender" vs-value="female" class="mr-4"
          >Female</vs-radio
        >
        <vs-radio v-model="gender" vs-value="other">Other</vs-radio>
      </div>
    </div>

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
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'
import firebase from 'firebase'

export default {
  components: {
    flatPickr,
    vSelect
  },
  data() {
    return {
      about: this.$store.state.user.app_active_user.about,
      dob: this.$store.state.user.app_active_user.dob,
      country: this.$store.state.user.app_active_user.country,
      languages_known: this.$store.state.user.app_active_user.languages_known,
      gender: this.$store.state.user.app_active_user.gender,
      mobile: this.$store.state.user.app_active_user.mobile,
      website: this.$store.state.user.app_active_user.website,

      // Options
      countryOptions: [
        { label: 'Australia', value: 'australia' },
        { label: 'France', value: 'france' },
        { label: 'Germany', value: 'germany' },
        { label: 'India', value: 'india' },
        { label: 'Jordan', value: 'jordan' },
        { label: 'Morocco', value: 'morocco' },
        { label: 'Portuguese', value: 'portuguese' },
        { label: 'Syria', value: 'syria' },
        { label: 'USA', value: 'usa' }
      ],
      langOptions: [
        { label: 'English', value: 'english' },
        { label: 'Spanish', value: 'spanish' },
        { label: 'French', value: 'french' },
        { label: 'Russian', value: 'russian' },
        { label: 'German', value: 'german' },
        { label: 'Arabic', value: 'arabic' },
        { label: 'Sanskrit', value: 'sanskrit' }
      ]
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
      .collection('info')
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

      //submit user to store
      let user = this.$store.state.user.app_active_user

      ;(user.about = this.about),
        (user.dob = this.dob),
        (user.country = this.country),
        (user.languages_known = this.languages_known),
        (user.mobile = this.mobile),
        (user.website = this.website),
        (user.gender = this.gender)

      this.$store.dispatch('user/updateUserInfo', user)
    },
    updateUser() {
      let reft = this.$fireStore

        .collection('user')
        .doc('info')
        .collection('info')
        .doc(this.activeUserInfo.uid)

      reft
        .update({
          about: this.about,
          dob: this.dob,
          country: this.country,
          languages_known: this.languages_known,
          mobile: this.mobile,
          website: this.website,
          gender: this.gender
        })
        .then(() => {
          this.successUpload()
        })
    }
  }
}
</script>
