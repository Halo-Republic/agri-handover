<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">
    <div class="vx-row">
      <div class="w-full vx-col md:w-1/2">
        <!-- Col Header -->
        <div class="flex items-end">
          <feather-icon icon="UserIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="font-medium leading-none">Personal Information</span>
        </div>

        <!-- Col Content -->
        <div>
          <!-- DOB -->
          <div class="mt-4">
            <label class="text-sm">Birth Date</label>
            <flat-pickr
              v-model="data_local.dob"
              :config="{ dateFormat: 'd F Y', maxDate: new Date() }"
              class="w-full"
              name="dob"
            />
            <!-- <span class="text-sm text-danger"  v-show="errors.has('dob')">{{ errors.first('dob') }}</span> -->
          </div>

          <vs-input
            class="w-full mt-4"
            label="Mobile"
            v-model="data_local.mobile"
            name="mobile"
          />
          <!-- <span class="text-sm text-danger"  v-show="errors.has('mobile')">{{ errors.first('mobile') }}</span> -->

          <vs-input
            class="w-full mt-4"
            label="Website"
            v-model="data_local.website"
            name="website"
            data-vv-as="field"
          />
          <!-- <span class="text-sm text-danger"  v-show="errors.has('website')">{{ errors.first('website') }}</span> -->

          <div class="mt-4">
            <label class="text-sm">Languages</label>
            <v-select
              v-model="data_local.languages_known"
              multiple
              :closeOnSelect="false"
              :options="langOptions"
              name="lang_known"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
            <!-- <span class="text-sm text-danger"  v-show="errors.has('lang_known')">{{ errors.first('lang_known') }}</span> -->
          </div>

          <!-- Gender -->
          <div class="mt-4">
            <label class="text-sm">Gender</label>
            <div class="mt-2">
              <vs-radio v-model="data_local.gender" vs-value="male" class="mr-4"
                >Male</vs-radio
              >
              <vs-radio
                v-model="data_local.gender"
                vs-value="female"
                class="mr-4"
                >Female</vs-radio
              >
              <vs-radio v-model="data_local.gender" vs-value="other"
                >Other</vs-radio
              >
            </div>
          </div>

          <div class="mt-6">
            <label>Contact Options</label>
            <div class="flex flex-wrap mt-1">
              <vs-checkbox
                v-model="data_local.contact_options"
                vs-value="email"
                class="mb-2 mr-4"
                >Email</vs-checkbox
              >
              <vs-checkbox
                v-model="data_local.contact_options"
                vs-value="message"
                class="mb-2 mr-4"
                >Message</vs-checkbox
              >
              <vs-checkbox
                v-model="data_local.contact_options"
                vs-value="phone"
                class="mb-2 "
                >Phone</vs-checkbox
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Address Col -->
      <div class="w-full vx-col md:w-1/2">
        <!-- Col Header -->
        <div class="flex items-end md:mt-0 mt-base">
          <feather-icon icon="MapPinIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="font-medium leading-none">Address</span>
        </div>

        <!-- Col Content -->
        <div>
          <vs-input
            class="w-full mt-4"
            label="Address Line 1"
            v-model="data_local.add_line_1"
            name="addd_line_1"
          />
          <!-- <span class="text-sm text-danger"  v-show="errors.has('addd_line_1')">{{ errors.first('addd_line_1') }}</span> -->

          <vs-input
            class="w-full mt-4"
            label="Address Line 2"
            v-model="data_local.add_line_2"
          />

          <vs-input
            class="w-full mt-4"
            label="Post Code"
            v-model="data_local.post_code"
            name="post_code"
          />
          <!-- <span class="text-sm text-danger"  v-show="errors.has('post_code')">{{ errors.first('post_code') }}</span> -->

          <vs-input
            class="w-full mt-4"
            label="City"
            v-model="data_local.city"
            name="city"
          />
          <!-- <span class="text-sm text-danger"  v-show="errors.has('city')">{{ errors.first('city') }}</span> -->

          <vs-input
            class="w-full mt-4"
            label="State"
            v-model="data_local.state"
            name="state"
          />
          <!-- <span class="text-sm text-danger"  v-show="errors.has('state')">{{ errors.first('state') }}</span> -->

          <vs-input
            class="w-full mt-4"
            label="Country"
            v-model="data_local.country"
            name="country"
          />
          <!-- <span class="text-sm text-danger"  v-show="errors.has('country')">{{ errors.first('country') }}</span> -->
        </div>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="w-full vx-col">
        <div class="flex flex-wrap items-center justify-end mt-8">
          <vs-button class="mt-2 ml-auto" @click="save_changes"
            >Save Changes</vs-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
    flatPickr
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      data_local: JSON.parse(JSON.stringify(this.data)),

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
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    user_data() {
      return this.$store.state.user.app_displayed_user
    }
  },
  methods: {
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })

      let user = this.user_data

      ;(user.dob = this.data_local.dob),
        (user.languages_known = this.data_local.languages_known),
        (user.mobile = this.data_local.mobile),
        (user.website = this.data_local.website),
        (user.gender = this.data_local.gender),
        (user.contact_options = this.data_local.contact_options),
        (user.add_line_1 = this.data_local.add_line_1),
        (user.add_line_2 = this.data_local.add_line_2),
        (user.post_code = this.data_local.post_code),
        (user.city = this.data_local.city),
        (user.state = this.data_local.state),
        (user.country = this.data_local.country)

      this.$store.commit('user/APP_DISPLAYED_USER', user)
    },
    save_changes() {
      this.$fireStore
        .collection('apps')
        .doc('users')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('info')
        .collection('info')
        .doc(this.user_data.uid)
        .update({
          dob: this.data_local.dob,
          languages_known: this.data_local.languages_known,
          mobile: this.data_local.mobile,
          website: this.data_local.website,
          gender: this.data_local.gender,
          contact_options: this.data_local.contact_options,
          add_line_1: this.data_local.add_line_1,
          add_line_2: this.data_local.add_line_2,
          post_code: this.data_local.post_code,
          city: this.data_local.city,
          state: this.data_local.state,
          country: this.data_local.country
        })
        .then(() => {
          this.successUpload()
        })
    }
  }
}
</script>
