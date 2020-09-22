<!-- =========================================================================================
    File Name: StatisticsCard.vue
    Description: Statistics card component
    ----------------------------------------------------------------------------------------
========================================================================================== -->

<template>
  <vx-card class="overflow-hidden mx-2">
    <div slot="no-body">
      <vs-button
        :color="colorx"
        type="line"
        size="small"
        style="float: right"
        @click="deleteComp(app.b_uid)"
        >X</vs-button
      >

      <div
        class="p-4"
        :class="{
          'flex justify-between flex-row-reverse items-center': iconRight,
          'text-center': !iconRight && hideChart,
          'pb-0': !hideChart
        }"
      >
        <div class="mb-3 con-img">
          <img
            key="onlineImg"
            :src="app.logo"
            alt="user-img"
            width="50"
            height="50"
            class="block rounded-full shadow-md cursor-pointer"
          />
        </div>

        <div class="pb-3 truncate">
          <h2 class="mb-1 font-bold">{{ app.b_name }}</h2>
          <span>{{ app.contact_company }}</span>
          <!-- <span>{{ app.id}}</span> -->

          <br />
          <span>{{ app.name }} {{ app.contact_surname }}</span>
          <br />
          <span>{{ app.contact_email }}</span>
        </div>

        <div class="pb-3 truncate">
          <h2 style="text-align: center">
            {{ windowUrl }}{{ app.uniqueAppName }}
          </h2>
        </div>
      </div>

      <!-- <nuxt-link :to="{name: 'dashboard', params: { id: app.id }}"> -->
      <vs-button
        icon-pack="feather"
        icon="icon-chevrons-right"
        icon-after
        class="w-full mt-4 shadow-md lg:mt-0"
        @click="setRouteComp(app)"
        >Enter Backend</vs-button
      >
      <!-- </nuxt-link> -->
    </div>
  </vx-card>
</template>

<script>
import _color from '@/assets/utils/color.js'
export default {
  props: {
    app: {
      type: Object
    },
    icon: {
      type: String,
      required: true
    },
    appname: {
      type: String,
      required: true
    },
    companyname: {
      type: String
    },
    name: {
      type: String
    },
    surname: {
      type: String
    },
    email: {
      type: String
    },
    id: {
      type: String
    },
    color: {
      type: String,
      default: 'primary'
    },
    colorTo: {
      type: String
    },
    // chartType: {
    //     type: String,
    //     default: 'line-chart',
    // },
    type: {
      type: String,
      default: 'line'
    },
    iconRight: {
      type: Boolean,
      default: false
    },
    hideChart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      windowUrl: null,
      chartOptions: null,
      colorx: '#c72a75',
      colorx2: '#5252e8'
    }
  },
  created() {
    this.windowUrl = window.location.href
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.user.app_active_user
    }
  },
  methods: {
    setRouteComp(app) {
      this.$store.commit('business/UPDATE_BUSINESS_INFO', app)
      this.$router.push(`/dashboard`)
    },
    successDelete() {
      this.$vs.notify({
        color: 'danger',
        title: 'Delete Success',
        text: 'App has been deleted under your profile'
      })
    },
    noDelete() {
      this.$vs.notify({
        color: 'success',
        title: 'Delete Cancelled',
        text: 'App has been deleted under your profile'
      })
    },
    deleteComp(id) {
      let vm = this
      let isDelete = confirm(
        'Are you sure you want to delete from your profile?'
      )
      if (isDelete) {
        this.$fireStore
          .collection('user')
          .doc('apps')
          .collection(this.activeUserInfo.uid)
          .doc(id)
          .delete()
          .then(function() {
            vm.successDelete()
          })
          .catch(function(error) {
            console.error('Error removing document: ', error)
          })
      } else {
        vm.noDelete()
      }
    }
  }
}
</script>
