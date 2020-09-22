<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="page-user-edit">
    <vs-alert
      color="danger"
      title="User Not Found"
      :active.sync="user_not_found"
    >
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'page-user-list' }"
          class="underline text-inherit"
          >All Users</router-link
        >
      </span>
    </vs-alert>

    <vx-card v-if="user_data">
      <div slot="no-body" class="px-6 pt-6 tabs-container">
        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Travel" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <work-edit-tab-travel class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
          <vs-tab label="Leave" icon-pack="feather" icon="icon-info">
            <div class="tab-text">
              <work-edit-tab-leave class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
          <vs-tab label="Payslip" icon-pack="feather" icon="icon-share-2">
            <div class="tab-text">
              <work-edit-tab-payslip class="mt-4" :data="user_data" />
            </div>
          </vs-tab>

          <vs-tab label="Targets" icon-pack="feather" icon="icon-share-2">
            <div class="tab-text">
              <work-edit-tab-targets class="mt-4" :data="user_data" />
            </div>
          </vs-tab>

          <!-- <vs-tab label="Work" icon-pack="feather" icon="icon-work">
            <div class="tab-text">
              <user-edit-tab-work class="mt-4" :data="user_data" />
            </div>
          </vs-tab> -->
        </vs-tabs>
      </div>
    </vx-card>
  </div>
</template>

<script>
import WorkEditTabTravel from './work/WorkEditTabTravel'
import WorkEditTabLeave from './work/WorkEditTabLeave'
import WorkEditTabPayslip from './work/WorkEditTabPayslip'
import WorkEditTabTargets from './work/WorkEditTabTargets'

import UserEditTabSocial from './UserEditTabSocial.vue'
import UserEditTabWork from './UserEditTabWork'

export default {
  components: {
    WorkEditTabTravel,
    WorkEditTabLeave,
    UserEditTabSocial,
    UserEditTabWork,
    WorkEditTabPayslip,
    WorkEditTabTargets
  },
  data() {
    return {
      // user_data: null,
      user_not_found: false,

      /*
        This property is created for fetching latest data from API when tab is changed

        Please check it's watcher
      */
      activeTab: 0
    }
  },
  watch: {
    // activeTab() {
    //   this.fetch_user_data(this.$route.params.userId)
    // }
  },
  computed: {
    user_data() {
      return this.$store.getters['userManagement/currentDisplayUser']
    }
  }
}
</script>
