<!-- =========================================================================================
  File Name: TheCustomizer.vue
  Description: Template Customizer
  Component Name: TheCustomizer
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="theme-customizer">
    <!-- Open Customizer Button -->
    <vs-button
      color="primary"
      type="filled"
      class="customizer-btn"
      icon-pack="feather"
      icon="icon-settings"
      @click.stop="active = !active"
      >Add Employee</vs-button
    >

    <!-- Customizer Content -->
    <vs-sidebar
      v-model="active"
      click-not-close
      hidden-background
      position-right
      class="items-no-padding"
    >
      <div class="h-full mx-4">
        <div
          class="customizer-header mt-6 flex items-center justify-between px-6"
        >
          <div>
            <!-- <h4>FARM WORKERS</h4> -->
            <small>Register your workers</small>
          </div>
          <feather-icon
            icon="XIcon"
            class="cursor-pointer"
            @click.stop="active = false"
          ></feather-icon>
        </div>

        <vs-divider class="mb-0" />
        <!-- Client Name -->
        <vs-input
          label="Client Name"
          name="contactperson"
          v-model="contactperson"
          class="w-full mt-5"
        />

        <!-- Client Surname -->
        <vs-input
          label="Client Surname"
          name="contactsurname"
          v-model="contactsurname"
          class="w-full mt-5"
        />

        <!-- Client Number -->
        <vs-input
          label="Contact number"
          name="number"
          v-model="number"
          type="number"
          class="w-full mt-5"
        />

        <!-- Client Email -->
        <vs-input
          label="Client email"
          name="email"
          v-model="email"
          type="email"
          class="w-full mt-5"
        />

        <p class="mt-5">Position</p>
        <v-select
          class="w-full "
          v-model="position"
          :options="positions"
        ></v-select>
        <div
          class="flex flex-wrap items-center justify-center p-6"
          slot="footer"
        >
          <vs-button class="mr-6" @click="newEmployee">Add Employee</vs-button>
          <vs-button
            type="border"
            color="danger"
            @click="isSidebarActiveLocal = false"
            >Cancel</vs-button
          >
        </div>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import moment from 'moment'
import vSelect from 'vue-select'

export default {
  components: { vSelect },
  data() {
    return {
      active: false,
      contactperson: '',
      contactsurname: '',
      email: '',
      number: '',
      position: '',
      positions: this.$store.state.business.app_active_business.positions
    }
  },
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    },
    activeCompanyInfo() {
      return this.$store.state.crm.company
    }
  },
  methods: {
    newEmployee() {
      let vm = this
      let credential = {}
      let company_id = ''

      if (this.activeCompanyInfo == null) {
        company_id = 0
      } else {
        company_id = this.activeCompanyInfo.b_uid
      }

      this.$fireAuth
        .createUserWithEmailAndPassword(this.email, this.email)
        .then(cred => {
          credential = cred
          this.$fireStore
            .collection('apps')
            .doc('users')
            .collection(this.activeBusinessInfo.b_uid)
            .doc('info')
            .collection('general')
            .doc(cred.user.uid)
            .set({
              status: 'Active',
              online_status: 'Online',
              role: 'User',
              company_id: company_id,
              owner_uid: this.activeUserInfo.uid,
              owner_branch: this.activeBusinessInfo.branch,
              uid: cred.user.uid,
              display_name: this.contactperson,
              photoURL: '',
              email: this.email,
              name: this.contactperson,
              surname: this.contactsurname,
              company: this.activeBusinessInfo.appname,
              number: this.number,
              position: this.position,
              branch: [],
              push_notes: [],
              verified: false,
              customer_last_active: moment().format('DD-MM-YYYY'),
              created_date: moment().format('DD-MM-YYYY'),
              created_month: moment().format('MM-YYYY'),
              timestamp: Date.now()
            })
            .then(cred => {
              console.log('setting')
              let general = vm.$fireStore
                .collection('user')
                .doc('info')
                .collection('general')
                .doc(credential.user.uid)

              general.set({
                status: 'online',
                uid: credential.user.uid,
                display_name: vm.contactperson,
                photoURL: '',
                number: vm.number,
                email: vm.email,
                name: vm.contactperson,
                surname: vm.contactsurname,
                last_active: moment().format('DD-MM-YYYY'),
                created_month: moment().format('DD-MM-YYYY'),
                timestamp: Date.now()
              })
            })
            .then(cred => {
              console.log('2', credential.user.uid)
              let uid = credential.user.uid
              let activeBusiness = vm.activeBusinessInfo
              const docRef = this.$fireStore
                .collection('user')
                .doc('apps')
                .collection(uid)
                .doc(vm.activeBusinessInfo.b_uid)

              return docRef.set({
                b_uid: activeBusiness.b_uid,
                uid: uid,
                appname: activeBusiness.appname,
                unique_name: activeBusiness.unique_name,
                logo: activeBusiness.logo,
                industry: activeBusiness.industry,
                contact_person: activeBusiness.contact_person,
                contact_surname: activeBusiness.contact_surname,
                contact_company: activeBusiness.appname,
                contact_email: activeBusiness.contact_email,
                contact_number: activeBusiness.contact_number,
                created_month: moment().format('DD-MM-YYYY'),
                timestamp: Date.now()
              })
            })
            .then(() => {
              vm.successUpload()
            })
        })
        .catch(err => {
          console.log(err)
          vm.successUpload(err)
        })
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
  }
}
</script>

<style lang="scss">
#theme-customizer {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 400px;
    max-width: 90vw;
    // @apply shadow-lg;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
      0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }
}

.customizer-btn {
  position: fixed;
  top: 50%;
  right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 50000;

  .vs-icon {
    animation: spin 1.5s linear infinite;
  }
}

.scroll-area--customizer {
  height: calc(100% - 5rem);
}
</style>
