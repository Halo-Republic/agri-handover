<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="page-user-view">
    <vs-alert
      color="danger"
      title="User Not Found"
      :active.sync="user_not_found"
    >
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span
        ><nuxt-link
          :to="{ name: 'page-user-list' }"
          class="underline text-inherit"
          >All Users</nuxt-link
        >
      </span>
    </vs-alert>

    <div id="user-data" v-if="user_data">
      <vx-card title="Account" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="mb-4 img-container">
              <img :src="user_data.avatar" class="w-full rounded" />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="flex-1 vx-col" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Username</td>
                <td>{{ user_data.disp_name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Name</td>
                <td>{{ user_data.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Email</td>
                <td>{{ user_data.email }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="flex-1 vx-col" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Status</td>
                <td>{{ user_data.status }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Role</td>
                <td>{{ user_data.role }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Company</td>
                <td>{{ user_data.company }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Communication</td>
                <td v-if="user_data.p_notes">
                  {{ user_data.p_notes.join(', ') }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Branch</td>
                <td>{{ user_data.branch }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Position</td>
                <td>{{ user_data.position }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 2 -->
          <div class="flex w-full vx-col" id="account-manage-buttons">
            <vs-button
              @click="editUser"
              icon-pack="feather"
              icon="icon-edit"
              class="mr-4"
              >Edit</vs-button
            >

            <vs-button
              type="border"
              color="danger"
              class="mr-4"
              icon-pack="feather"
              icon="icon-trash"
              @click="confirmDeleteRecord"
              >Delete</vs-button
            >
            <vs-button
              icon-pack="feather"
              icon="icon-edit"
              class="mr-4"
              :to="{ name: 'todo', params: { id: $route.params.userId } }"
              >Todo</vs-button
            >
            <vs-button
              icon-pack="feather"
              icon="icon-edit"
              class="mr-4"
              :to="{
                name: 'calendar-simple-calendar',
                params: { userId: $route.params.userId }
              }"
              >Calendar</vs-button
            >
          </div>
        </div>
      </vx-card>

      <div class="vx-row">
        <div class="w-full vx-col lg:w-1/2">
          <vx-card title="Information" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Birth Date</td>
                <td>{{ user_data.dob }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Mobile</td>
                <td>{{ user_data.mobile }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Website</td>
                <td>{{ user_data.website }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Languages</td>
                <td v-for="lang in user_data.lang" :key="lang">
                  {{ lang.label }},
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Gender</td>
                <td>{{ user_data.gender }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Contact</td>
                <td>{{ user_data.contact_options }}</td>
              </tr>
            </table>
          </vx-card>
        </div>

        <div class="w-full vx-col lg:w-1/2">
          <vx-card title="Social Links" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Twitter</td>
                <td>{{ user_data.twt }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Facebook</td>
                <td>{{ user_data.fb }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Instagram</td>
                <td>{{ user_data.insta }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Github</td>
                <td>{{ user_data.github }}</td>
              </tr>
              <tr>
                <td class="font-semibold">CodePen</td>
                <td>{{ user_data.codepen }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Slack</td>
                <td>{{ user_data.slack }}</td>
              </tr>
            </table>
          </vx-card>
        </div>
      </div>

      <!-- Permissions -->
      <vx-card>
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
          <table class="w-full permissions-table">
            <tr>
              <th
                class="px-3 py-2 text-base font-semibold text-left"
                v-for="heading in [
                  'Module',
                  'Read',
                  'Write',
                  'Create',
                  'Delete'
                ]"
                :key="heading"
              >
                {{ heading }}
              </th>
            </tr>

            <tr v-for="(val, name) in user_data.permissions" :key="name">
              <td class="px-3 py-2">{{ name }}</td>
              <td
                v-for="(permission, name) in val"
                class="px-3 py-2"
                :key="name + permission"
              >
                <vs-checkbox v-model="val[name]" class="pointer-events-none" />
              </td>
            </tr>
          </table>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // user_data: null,
      user_not_found: false
    }
  },
  computed: {
    user_data() {
      return this.$store.state.user.app_displayed_user
    }
  },

  methods: {
    editUser() {
      this.$router.push(`/dashboard/users/staff/user-edit`)
    },
    confirmDeleteRecord() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm Delete`,
        text: `You are about to delete "${this.user_data.username}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord() {
      /* Below two lines are just for demo purpose */
      this.$router.push({ name: 'app-user-list' })
      this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.user_data.id)
      //   .then(()   => { this.$router.push({name:'app-user-list'}); this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    }
  }
}
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
</style>
