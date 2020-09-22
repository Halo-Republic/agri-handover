<template>
  <div>
    <client-only placeholder="Loading...">
      {{ currentPage }} / {{ pageCount }}
      <pdf
        class="pdf"
        :src="require('@/assets/pdfs/pp.pdf')"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        :page="1"
      ></pdf>
      <pdf
        class="pdf"
        :src="require('@/assets/pdfs/pp.pdf')"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        :page="2"
      ></pdf>
      <pdf
        class="pdf"
        :src="require('@/assets/pdfs/pp.pdf')"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        :page="3"
      ></pdf>
      <pdf
        class="pdf"
        :src="require('@/assets/pdfs/pp.pdf')"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        :page="4"
      ></pdf>
    </client-only>
  </div>
</template>

<script>
var vuePdf
if (process.browser) {
  vuePdf = require('vue-pdf').default
}
export default {
  components: {
    vuePdf
  },
  data() {
    return {
      currentPage: 0,
      pageCount: 0
    }
  },
  created() {
    // window.open(
    //   'https://drive.google.com/open?id=1yMg6GhuLi7Y0bZwU1PH_BXgHZMb_WaIV',
    //   '_blank',
    //   'fullscreen=yes'
    // )
    // this.$router.push('/')
  }
}
</script>

<style></style>
