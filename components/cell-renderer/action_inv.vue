<template>
  <div :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
    <a
      target="_blank"
      :href="
        `https://agri-ensights.web.app/invoice/${activeBusinessInfo.b_uid}&${params.data.id}`
      "
    >
      <feather-icon
        icon="BookmarkIcon"
        svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
        @click="goTo(params.data)"
      />
      View Invoice!</a
    >
  </div>
</template>

<script>
export default {
  name: 'CellRendererActions',
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    }
  },
  methods: {
    goTo(params) {
      console.log(params)
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
