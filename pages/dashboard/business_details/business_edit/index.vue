<!-- =========================================================================================
  File Name: CompanyEdit.vue
  Description: Company Edit Page
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

    <vx-card
      v-if="activeBusinessInfo"
      style="margin-top: 80px; margin-bottom: 30px"
    >
      <div slot="no-body" class="px-6 pt-6 tabs-container">
        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Account" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <company-edit-tab-account
                class="mt-4"
                :data="activeBusinessInfo"
              />
            </div>
          </vs-tab>
          <vs-tab label="Information" icon-pack="feather" icon="icon-info">
            <div class="tab-text">
              <company-edit-tab-information
                class="mt-4"
                :data="activeBusinessInfo"
              />
            </div>
          </vs-tab>
          <vs-tab label="Social" icon-pack="feather" icon="icon-share-2">
            <div class="tab-text">
              <company-edit-tab-social
                class="mt-4"
                :data="activeBusinessInfo"
              />
            </div>
          </vs-tab>

          <vs-tab label="Group" icon-pack="feather" icon="icon-award">
            <div class="tab-text">
              <company-edit-tab-group class="mt-4" :data="activeBusinessInfo" />
            </div>
          </vs-tab>

          <vs-tab label="Employee" icon-pack="feather" icon="icon-award">
            <div class="tab-text">
              <company-edit-tab-employee
                class="mt-4"
                :data="activeBusinessInfo"
              />
            </div>
          </vs-tab>

          <vs-tab label="Sales" icon-pack="feather" icon="icon-award">
            <div class="tab-text">
              <company-edit-tab-sales class="mt-4" :data="activeBusinessInfo" />
            </div>
          </vs-tab>
          <vs-tab label="Banking" icon-pack="feather" icon="icon-award">
            <div class="tab-text">
              <company-edit-tab-banking
                class="mt-4"
                :data="activeBusinessInfo"
              />
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </vx-card>
    <previous />
  </div>
</template>

<script>
import CompanyEditTabAccount from '@/components/forms/business-settings/edit_tab_account'
import CompanyEditTabInformation from '@/components/forms/business-settings/edit_tab_information'
import CompanyEditTabSocial from '@/components/forms/business-settings/edit_tab_social'
import CompanyEditTabGroup from '@/components/forms/business-settings/edit_tab_groups'
import CompanyEditTabSales from '@/components/forms/business-settings/edit_tab_sales'
import CompanyEditTabEmployee from '@/components/forms/business-settings/edit_tab_employee'
import CompanyEditTabBanking from '@/components/forms/business-settings/edit_tab_banking'

// import CompanyEditTabTab from './CompanyEditTabTab'

export default {
  components: {
    CompanyEditTabSales,
    CompanyEditTabEmployee,
    CompanyEditTabAccount,
    CompanyEditTabInformation,
    CompanyEditTabSocial,
    CompanyEditTabGroup,
    CompanyEditTabBanking
    // CompanyEditTabTab
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
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    }
  }
}
</script>
