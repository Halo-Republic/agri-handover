<template>
  <div>
    <topScroll style="margin-top: 80px; margin-bottom: 30px" />

    <vs-card>
      <!-- <template slot="actions">
        <feather-icon icon="MoreVerticalIcon" svg-classes="w-6 h-6 text-grey" />
      </template> -->

      <h4>Advisory Services</h4>
      <h6 class="mb-6">Building Farmers</h6>
      <div class="knowledge-base2 "></div>
      <p class="mb-3 mt-6">
        The agricultural industry provides businesses, organisations and
        governments a unique and ever-changing global environment which requires
        it to continuously change and transform itself in order to remain
        competitive and relevant.
      </p>
      <p class="mb-3">
        The practice comprises of a network of trusted partners from both
        private and public sector. Our objective is to provide independent and
        professional service.
      </p>
    </vs-card>
  </div>
</template>
<script>
import topScroll from '../components/topScroll/index'

export default {
  components: {
    topScroll
  }
}
</script>
<style scoped>
p {
  font-size: 1.5em;
}
h4 {
  font-size: 2.5em;
  font-weight: 600;
  color: #236148;
}
h6 {
  font-size: 1.5em;
  color: #236148;
}

.knowledge-base2 {
  background-image: url('../assets/images/misc/wheat.jpg');
  height: 350px;
  background-size: cover;
  /* background-repeat: no-repeat; */
  background-attachment: fixed;
  /* background-position: bottom; */
}
</style>
