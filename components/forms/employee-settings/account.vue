<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="user-edit-tab-info">
    <!-- Avatar Row -->
    <div class="vx-row">
      <div class="w-full vx-col">
        <div class="flex flex-col items-start sm:flex-row">
          <img :src="data.photoURL" class="w-24 h-24 mr-8 rounded" />
          <div>
            <p class="mt-4 mb-2 text-lg font-medium sm:mt-0">
              {{ data.name }} {{ data.surname }}
            </p>
            <div>
              <imageUpload class="mb-2 mr-4 sm:mb-0" label="Profile Image" />

              <p class="mt-2 text-sm">
                Allowed JPG, GIF or PNG. Max size of 800kB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Row -->
    <div class="vx-row">
      <div class="w-full vx-col md:w-1/2">
        <vs-input
          class="w-full mt-4"
          label="Username"
          v-model="data_local.display_name"
          name="username"
        />

        <vs-input
          class="w-full mt-4"
          label="Name"
          v-model="data_local.name"
          name="name"
        />

        <vs-input
          class="w-full mt-4"
          label="Surname"
          v-model="data_local.surname"
          name="surname"
        />

        <vs-input
          class="w-full mt-4"
          label="Email"
          v-model="data_local.email"
          type="email"
          name="email"
        />
      </div>

      <div class="w-full vx-col md:w-1/2">
        <div class="mt-4">
          <label class="vs-input--label">Status</label>
          <v-select
            v-model="data_local.status"
            :clearable="false"
            :options="statusOptions"
            name="status"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
        </div>

        <div class="mt-4">
          <label class="vs-input--label">Role</label>
          <v-select
            v-model="data_local.role"
            :clearable="false"
            :options="roleOptions"
            name="role"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
        </div>

        <div class="mt-4">
          <label class="vs-input--label">Communication</label>
          <v-select
            v-model="data_local.push_notes"
            :clearable="false"
            :options="communicationOptions"
            multiple
            name="role"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
        </div>

        <div class="mt-4">
          <label class="vs-input--label">Position</label>
          <v-select
            v-model="data_local.position"
            :clearable="false"
            :options="groupPositions"
            name="positions"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
        </div>

        <div class="mt-4">
          <label class="vs-input--label">Branch</label>
          <v-select
            v-model="data_local.branch"
            :clearable="false"
            :options="groupBranches"
            name="branch"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
        </div>

        <vs-input
          class="w-full mt-4"
          label="Company"
          v-model="data_local.company"
          name="company"
        />
      </div>
    </div>

    <!-- Permissions -->
    <vx-card class="mt-base" no-shadow card-border>
      <div class="vx-row">
        <div class="w-full vx-col">
          <div class="flex items-end px-3">
            <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
            <span class="text-lg font-medium leading-none">Permissions</span>
          </div>
          <vs-divider />
        </div>
      </div>

      <div class="block overflow-x-auto">
        <table class="w-full">
          <tr>
            <!--
              You can also use `Object.keys(Object.values(data_local.permissions)[0])` this logic if you consider,
              our data structure. You just have to loop over above variable to get table headers.
              Below we made it simple. So, everyone can understand.
             -->
            <th
              class="px-3 py-2 text-base font-semibold text-left"
              v-for="heading in ['Module', 'Read', 'Write', 'Create', 'Delete']"
              :key="heading"
            >
              {{ heading }}
            </th>
          </tr>
          <tr v-for="(val, name) in data_local.permissions" :key="name">
            <td class="px-3 py-2">{{ name }}</td>
            <td
              v-for="(permission, name) in val"
              class="px-3 py-2"
              :key="name + permission"
            >
              <vs-checkbox v-model="val[name]" />
            </td>
          </tr>
        </table>
      </div>
    </vx-card>

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
import vSelect from 'vue-select'
import imageUpload from '@/components/form-generator/components/imageUpload.vue'

export default {
  components: {
    vSelect,
    imageUpload
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

      statusOptions: ['Active', 'Blocked', 'Deactivated'],
      roleOptions: ['User', 'Staff', 'Admin']
    }
  },

  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    user_data() {
      return this.$store.state.user.app_displayed_user
    },
    uploaded_images() {
      return this.$store.state.form.uploaded_images
    },

    communicationOptions() {
      return this.activeBusinessInfo.push_notes
    },

    groupBranches() {
      return this.activeBusinessInfo.branches
    },
    groupPositions() {
      return this.activeBusinessInfo.positions
    }
  },
  watch: {
    uploaded_images: function() {
      if (this.uploaded_images) {
        let vm = this

        var docRef = this.$fireStore
          .collection('apps')
          .doc('users')
          .collection(this.activeBusinessInfo.b_uid)
          .doc('info')
          .collection('general')
          .doc(vm.user_data.uid)
        docRef
          .update({
            photoURL: this.uploaded_images[0]
          })
          .then(() => {
            vm.successUpload('url')
          })
      }
    }
  },

  methods: {
    successUpload(update) {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })

      let user = this.user_data

      let myposition
      let mybranch
      let permissions

      if (this.data_local.position == undefined) {
        myposition = ''
      } else {
        myposition = this.data_local.position
      }

      if (this.data_local.branch == undefined) {
        mybranch = ''
      } else {
        mybranch = this.data_local.branch
      }

      if (this.data_local.permissions == undefined) {
        permissions = ''
      } else {
        permissions = this.data_local.permissions
      }

      if (update === 'url') {
        user.photoURL = this.uploaded_images[0]
      } else {
        ;(user.display_name = this.data_local.display_name),
          (user.email = this.data_local.email),
          (user.name = this.data_local.name),
          (user.surname = this.data_local.surname),
          (user.company = this.data_local.company),
          (user.photoURL = this.data_local.photoURL),
          (user.role = this.data_local.role),
          (user.branch = mybranch),
          (user.position = myposition),
          (user.status = this.data_local.status),
          (user.permissions = permissions),
          (user.push_notes = this.data_local.push_notes)
      }

      this.$store.commit('user/APP_DISPLAYED_USER', user)
    },

    save_changes() {
      let vm = this

      let myposition
      let mybranch
      let permissions

      if (this.data_local.position == undefined) {
        myposition = ''
      } else {
        myposition = this.data_local.position
      }

      if (this.data_local.branch == undefined) {
        mybranch = ''
      } else {
        mybranch = this.data_local.branch
      }

      if (this.data_local.permissions == undefined) {
        permissions = ''
      } else {
        permissions = this.data_local.permissions
      }

      this.$fireStore
        .collection('apps')
        .doc('users')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('info')
        .collection('general')
        .doc(vm.user_data.uid)
        .update({
          display_name: this.data_local.display_name,
          email: this.data_local.email,
          name: this.data_local.name,
          surname: this.data_local.surname,
          company: this.data_local.company,
          photoURL: this.data_local.photoURL,
          role: this.data_local.role,
          branch: mybranch,
          position: myposition,
          status: this.data_local.status,
          permissions: permissions,

          push_notes: this.data_local.push_notes
        })
        .then(() => {
          this.successUpload()
        })
    }
  }
}
</script>
