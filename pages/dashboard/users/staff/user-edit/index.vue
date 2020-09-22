<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="page-user-edit">

    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'page-user-list'}" class="underline text-inherit">All Users</router-link>
      </span>
    </vs-alert>

    <vx-card v-if="user_data" class='mt-12'>

      <div slot="no-body" class="px-6 pt-6 tabs-container">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Account" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <user-edit-tab-account class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
          <vs-tab label="Information" icon-pack="feather" icon="icon-info">
            <div class="tab-text">
              <user-edit-tab-information class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
          <vs-tab label="Social" icon-pack="feather" icon="icon-share-2">
            <div class="tab-text">
              <user-edit-tab-social class="mt-4" :data="user_data" />
            </div>
          </vs-tab>

         <vs-tab label="Work" icon-pack="feather" icon="icon-work">
            <div class="tab-text">
              <user-edit-tab-work class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
        </vs-tabs>

      </div>

    </vx-card>
  </div>
</template>

<script>
import UserEditTabAccount     from "@/components/forms/employee-settings/account"
import UserEditTabInformation from "@/components/forms/employee-settings/information"
import UserEditTabSocial      from "@/components/forms/employee-settings/social"
// import UserEditTabWork        from "@/components/forms/employee-settings/work"


export default {
  components: {
    UserEditTabAccount,
    UserEditTabInformation,
    UserEditTabSocial,
    // UserEditTabWork
  },
  data() {
    return {
      // user_data: null,
      user_not_found: false,

      /*
        This property is created for fetching latest data from API when tab is changed

        Please check it's watcher
      */
      activeTab: 0,
    }
  },
  watch: {
    // activeTab() {
    //   this.fetch_user_data(this.$route.params.userId)
    // }
  },
  computed: {
     user_data(){
    return   this.$store.state.user.app_displayed_user
    },
  },
}

</script>
