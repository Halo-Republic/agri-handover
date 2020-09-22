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
export default {
  components: {},
  data() {
    return {
      active: false,
      contactperson: '',
      contactsurname: '',
      email: '',
      number: ''
    }
  },
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    }
  },
  methods: {
    newEmployee() {
      let vm = this
      let myCred

      this.$fireAuth
        .createUserWithEmailAndPassword(this.email, this.email)
        .then(cred => {
          myCred = cred
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
              role: 'Staff',
              uid: cred.user.uid,
              display_name: this.contactperson,
              photoURL: '',
              email: this.email,
              name: this.contactperson,
              surname: this.contactsurname,
              company: this.activeBusinessInfo.b_name,
              number: this.number,
              position: [],
              branch: [],
              push_notes: [],
              verified: false,
              last_active: moment().format('DD-MM-YYYY'),
              created_month: moment().format('DD-MM-YYYY'),
              timestamp: Date.now()
            })
            .then(cred => {
              console.log('setting', myCred)
              let general = vm.$fireStore
                .collection('user')
                .doc('info')
                .collection('general')
                .doc(myCred.user.uid)

              general.set({
                status: 'online',
                uid: myCred.user.uid,
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
              console.log('next')
              const docRef = this.$fireStore
                .collection('user')
                .doc('apps')
                .collection(myCred.user.uid)
                .doc(vm.activeBusinessInfo.b_uid)

              return docRef.set({
                b_uid: vm.activeBusinessInfo.b_uid,
                uid: myCred.user.uid,
                b_name: vm.activeBusinessInfo.b_name,
                un_name: vm.activeBusinessInfo.un_name,
                logo: vm.activeBusinessInfo.logo,
                indstr: vm.activeBusinessInfo.indstr,
                c_person: vm.activeBusinessInfo.c_person,
                c_surname: vm.activeBusinessInfo.c_surname,
                c_company: vm.activeBusinessInfo.b_name,
                c_email: vm.activeBusinessInfo.c_email,
                c_number: vm.activeBusinessInfo.c_number,
                month: moment().format('DD-MM-YYYY'),
                t_stamp: Date.now()
              })
            })
            .then(() => {
              vm.successUpload()
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Asset Added',
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
