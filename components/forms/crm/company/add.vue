<template>
  <div id="theme-customizer">
    <vs-button
      @click.stop="active = !active"
      color="primary"
      class="ml-5"
      type="filled"
      icon-pack="feather"
      icon="icon-settings"
      >Add Company</vs-button
    >
    <vs-sidebar
      hidden-background
      position-right
      v-model="active"
      click-not-close
      class="items-no-padding"
    >
      <div
        class="flex items-center justify-between px-6 mt-6 customizer-header"
      >
        <div>
          <h4>Add Company</h4>
          <small>Let's do this</small>
        </div>
        <feather-icon
          icon="XIcon"
          @click.stop="active = false"
          class="cursor-pointer"
        ></feather-icon>
      </div>
      <vs-divider class="mb-0"></vs-divider>

      <VuePerfectScrollbar
        class="pt-4 pb-6 scroll-area--customizer"
        :settings="settings"
      >
        <p v-if="currentlyDisplayingUser" class="px-6 font-semibold">
          Adding for: {{ currentDisplayUser.displayName }}
        </p>
        <form-generator
          :schema="formStyle"
          v-model="formData"
          class="p-6"
        ></form-generator>

        <div class="flex flex-wrap items-center justify-center p-6">
          <vs-button class="mr-6" @click="newCategory">Add Data</vs-button>
          <vs-button type="border" color="danger" @click="active = false"
            >Cancel</vs-button
          >
        </div>
      </VuePerfectScrollbar>
    </vs-sidebar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import FormGenerator from '@/components/form-generator/formGenerator'
import moment from 'moment'

export default {
  data() {
    return {
      formStyle: [
        {
          fieldType: 'TextInput',
          placeholder: 'Company',
          label: 'Company',
          name: 'Company',
          type: 'text'
        },
        {
          fieldType: 'TextInput',
          placeholder: 'Email',
          label: 'Email',
          name: 'Email',
          type: 'text'
        },
        {
          fieldType: 'TextInput',
          placeholder: 'Phone',
          label: 'Phone',
          name: 'Phone',
          type: 'text'
        },
        {
          fieldType: 'TextInput',
          placeholder: 'Website',
          label: 'Website',
          name: 'Website',
          type: 'text'
        },
        {
          fieldType: 'SelectList',
          name: 'Sources',
          multi: false,
          label: 'Sources',
          options: [
            'Facebook',
            'Website',
            'Networks',
            'Direct Marketing',
            'Others'
          ]
        },
        {
          fieldType: 'SelectList',
          name: 'Ratings',
          multi: false,
          label: 'Ratings',
          options: this.$store.state.business.app_active_business
            .customer_groups
        },
        {
          fieldType: 'GoogleAddress',
          placeholder: 'Address',
          label: 'Address',
          name: 'Address'
        },
        {
          fieldType: 'TextArea',
          placeholder: 'Description',
          label: 'Description',
          name: 'Description'
        }
      ],
      active: false,

      popupActivo4: false,
      configdateTimePicker: {
        enableTime: true,
        enableSeconds: true,
        noCalendar: true
      },

      formData: {},

      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    }
  },

  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    }
  },

  mounted() {},
  methods: {
    frontChange() {
      this.front = !this.front
    },
    newCategory() {
      let userAdding = {
        uid: this.activeUserInfo.id,
        user_name: this.activeUserInfo.name,
        user_surname: this.activeUserInfo.surname,
        user_displayName: this.activeUserInfo.displayName,
        user_branch: this.activeUserInfo.branches,
        user_positions: this.activeUserInfo.ositions
      }

      let vm = this

      if (userAdding.user_branch == undefined) {
        userAdding.user_branch = 'not set'
      }

      if (userAdding.user_positions == undefined) {
        userAdding.user_positions = 'not set'
      }
      let docR
      docR = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('company')
        .collection('company')

      docR
        .add({
          uid: this.activeUserInfo.uid,
          user_name: this.activeUserInfo.name,
          user_surname: this.activeUserInfo.surname,
          user_displayName: this.activeUserInfo.display_name,
          user_branch: this.activeUserInfo.branch,
          user_positions: this.activeUserInfo.position,
          company: this.formData.Company,
          companyDisplayname: this.formData.Company,
          email: this.formData.Email,
          phone: this.formData.Phone,
          website: this.formData.Website,
          sources: this.formData.Sources,
          ratings: this.formData.Ratings,
          lastMeeting: moment().format('DD-MM-YYYY'),
          adr_address: this.formData.Address.places[0].adr_address,
          formatted_address: this.formData.Address.places[0].formatted_address,
          address_url: this.formData.Address.places[0].url,
          vicinity: this.formData.Address.places[0].vicinity,
          lat: this.formData.Address.markers[0].position.lat,
          lng: this.formData.Address.markers[0].position.lng,
          geolocation: {
            lat: this.formData.Address.markers[0].position.lat,
            lng: this.formData.Address.markers[0].position.lng
          },
          geo1: this.formData.Address.geoAll.geo1,
          geo2: this.formData.Address.geoAll.geo2,
          geo3: this.formData.Address.geoAll.geo3,
          geo4: this.formData.Address.geoAll.geo4,
          geo5: this.formData.Address.geoAll.geo5,
          geo6: this.formData.Address.geoAll.geo6,
          geo7: this.formData.Address.geoAll.geo7,
          geo8: this.formData.Address.geoAll.geo8,
          geo9: this.formData.Address.geoAll.geo9,

          created_date: moment().format('DD-MM-YYYY'),
          created_month: moment().format('MM-YYYY'),
          description: this.formData.Description,
          timestamp: Date.now()
        })
        .then(function() {
          vm.successUpload()
        })
        .catch(function(error) {
          vm.noSuccessUpload(error)
        })
      this.active = false
    },
    noSuccessUpload(err) {
      this.$vs.notify({
        color: 'red',
        title: 'Oops! Something wrong',
        text: `Here it is: ${err}`
      })
    },
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })
    }
  },

  components: {
    VuePerfectScrollbar,
    FormGenerator
  }
}
</script>

<style lang="scss">
#theme-customizer {
  .vs-sidebar {
    position: fixed;
    z-index: 520;
    width: 400px;
    max-width: 90vw;
  }
}
.pac-container {
  z-index: 52011;
  background-color: inherit;
}
textarea {
  background-color: inherit;
  color: white;
}
select {
  background-color: inherit;
  color: white;
}
.customizer-btn {
  position: fixed;
  top: 50%;
  right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 500;

  .vs-icon {
    animation: spin 1.5s linear infinite;
  }
}

.scroll-area--customizer {
  height: calc(100% - 5rem);
}
</style>
