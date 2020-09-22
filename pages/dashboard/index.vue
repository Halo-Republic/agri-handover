<template>
  <div>
    <client-only>
      <topScroll style="margin-top: 90px;" />

      <div id="dashboard-analytics">
        <div class="vx-row">
          <!-- CARD 1: CONGRATS -->
          <div class="w-full vx-col  mb-base ">
            <vx-card
              slot="no-body"
              class="text-center bg-primary greet-user "
              background=""
            >
              <h1 class="mb-6 mt-6 text-white">
                {{
                  $store.state.business.app_active_business.b_name.toUpperCase()
                }}
              </h1>
              <p
                class="w-4/5 mx-auto text-white xl:w-3/4 lg:w-4/5 md:w-2/3"
              ></p>
            </vx-card>
          </div>
        </div>
        <!-- <h6>{{ activeBusinessInfo.active }}</h6> -->
        <div class="vx-row" v-if="!active">
          <!-- CARD 1: CONGRATS -->
          <div class="w-full vx-col  mb-base  text-center ">
            <h6 style="color: black" class="text-centre">
              Waiting for Activation:
            </h6>
            <br />
            <small style="color: black"
              >Email: info@agriensights.co.za for any queries</small
            >
          </div>
        </div>
        <div class="vx-row" v-if="active">
          <div
            class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
            v-for="(item, i) in dashboardCards"
            :key="i"
          >
            <nuxt-link :to="item.route">
              <statistics-card-line
                hide-chart
                class="mb-base"
                :icon="item.icon"
                icon-right
                :statistic="item.statistic"
                :statistic-title="item.statistic_title"
                :color="item.color"
              />
            </nuxt-link>
          </div>
        </div>
      </div>
      <previous />
    </client-only>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import StatisticsCardLine from '@/components/ui-elements/card/statistics_card_line.vue'
import moment from 'moment'
import topScroll from '@/components/topScroll/index'
export default {
  data() {
    return {
      general: {},
      groups: {},
      social_links: {},
      front_end: {},
      active: false,
      dashboardCards: [
        {
          route: '/dashboard/business_details',
          icon: 'CpuIcon',
          statistic: 'Business',
          statistic_title: 'Manage Business info',
          color: 'success'
        },
        {
          route: '/dashboard/analytics',
          icon: 'BarChart2Icon',
          statistic: 'Analytics',
          statistic_title: 'Manage Business info',
          color: 'success'
        },
        {
          route: '/dashboard/users/staff',
          icon: 'SmileIcon',
          statistic: 'Staff',
          statistic_title: 'Manage your staff',
          color: 'success'
        },
        {
          route: '/dashboard/business_details',
          icon: 'UsersIcon',
          statistic: 'Clients',
          statistic_title: 'Manage your clients',
          color: 'success'
        }
        // {
        //   route: '/crm',
        //   icon: 'ActivityIcon',
        //   statistic: 'CRM',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // },
        // {
        //   route: '/email',
        //   icon: 'MailIcon',
        //   statistic: 'Email Campaign',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // },
        // {
        //   route: '/dashboard/business_details',
        //   icon: 'TruckIcon',
        //   statistic: 'Logistics',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // },
        // {
        //   route: '/video_chat',
        //   icon: 'MonitorIcon',
        //   statistic: 'Video Call',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // },
        // {
        //   route: '/whiteboard',
        //   icon: 'BookOpenIcon',
        //   statistic: 'Education',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // },
        // {
        //   route: '/dashboard/business_details',
        //   icon: 'CheckIcon',
        //   statistic: 'Todo',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // },
        // {
        //   route: '/dashboard/business_details',
        //   icon: 'MessageSquareIcon',
        //   statistic: 'Chat',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // },
        // {
        //   route: '/builder',
        //   icon: 'EyeIcon',
        //   statistic: 'Builder',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // },
        // {
        //   route: '/dashboard/business_details',
        //   icon: 'CalendarIcon',
        //   statistic: 'Calendar',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // },
        // {
        //   route: '/form_builder',
        //   icon: 'LayoutIcon',
        //   statistic: 'Form Builder',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // },
        // {
        //   route: '/eCommerce',
        //   icon: 'ShoppingBagIcon',
        //   statistic: 'Shop View',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // },
        // {
        //   route: '/eCommerce',
        //   icon: 'ZapIcon',
        //   statistic: 'Marketing',
        //   statistic_title: 'Manage Business info',
        //   color: 'warning'
        // }
      ]
    }
  },
  components: {
    vSelect,
    StatisticsCardLine,
    topScroll
  },
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    }
  },
  methods: {
    getGeneral() {
      let app_id = this.activeBusinessInfo.b_uid
      let vm = this
      if (process.client) {
        vm.$fireStore
          .collection('apps')
          .doc('info')
          .collection('general')
          .doc(app_id)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              vm.general = doc.data()
              vm.active = doc.data().active
              vm.getSocial()
            }
          })
          .catch(function(error) {
            console.log('Error getting document:', error)
          })
      }
    },
    getSocial() {
      let vm = this
      let app_id = this.activeBusinessInfo.b_uid
      if (process.client) {
        vm.$fireStore
          .collection('apps')
          .doc('info')
          .collection('social_links')
          .doc(app_id)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              vm.social_links = doc.data()
              vm.getGroups()
            }
          })
          .catch(function(error) {
            console.log('Error getting document:', error)
          })
      }
    },
    getGroups() {
      let vm = this
      if (process.client) {
        let app_id = this.activeBusinessInfo.b_uid
        vm.$fireStore
          .collection('apps')
          .doc('info')
          .collection('groups')
          .doc(app_id)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              vm.groups = doc.data()
              vm.getFrontEnd()
            }
          })
          .catch(function(error) {
            console.log('Error getting document:', error)
          })
      }
    },
    getFrontEnd() {
      console.log('groups')
      let vm = this
      if (process.client) {
        let app_id = this.activeBusinessInfo.b_uid
        vm.$fireStore
          .collection('apps')
          .doc('info')
          .collection('front_end')
          .doc(app_id)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              vm.front_end = doc.data()
              vm.updateBusiness()
            }
          })
          .catch(function(error) {
            vm.updateBusiness()
            console.log('Error getting document:', error)
          })
      }
    },
    updateBusiness() {
      let app = {
        ...this.activeBusinessInfo,
        ...this.general,
        ...this.social_links,
        ...this.groups,
        ...this.front_end
      }
      this.$store.commit('business/UPDATE_BUSINESS_INFO', app)
    }
  },
  created() {
    this.getGeneral()
  }
}
</script>

<style lang="scss">
/*! rtl:begin:ignore */
#dashboard-analytics {
  .greet-user {
    position: relative;
    .decore-left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .decore-right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  @media (max-width: 576px) {
    .decore-left,
    .decore-right {
      width: 140px;
    }
  }
}
/*! rtl:end:ignore */
</style>
