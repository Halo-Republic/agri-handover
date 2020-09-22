<template>
  <div>
    <topScroll style="margin-top: 30px; margin-bottom: 30px" />

    <vs-card class="mt-10">
      <h4>360 Degree Manager</h4>
      <h6 class="mb-6">Dedicated to the Agricultural Industry</h6>
      <!-- <img
          :src="card_bg_img_3"
          alt="content-img"
          class="responsive rounded-lg"
        /> -->
      <div class="knowledge-base3 "></div>

      <!-- <p class="mb-3 mt-6">
        360 degree farmer is a mobile tool that assist farmers to manage the day
        to day performance of the farm’s operations. Farmer will be able to
        manage inputs, infrastructure, labour, services, output Over time with
        the rich data, farm productivity will become more predictable, bankable
        and investable to provide the much needed capital growth. In ensuring
        optimum livestock and crop performance, and we provide the necessary
        soil, health and feed programmes which will assist with planning.
      </p>

      <p class="mb-3">
        AgriBiz is a mobile tool that assist farmers to manage the day to day
        operations at their fingertips. Farmer will be able to manage their
        inventory and assets, manage and capture expenses and generate invoices.
      </p> -->

      <p>
        360 Degree Manager is a mobile tool that assist farmers to manage the
        day to day performance of the farm’s operations. Farmer will be able to
        manage inputs, infrastructure, labour, services, output.
      </p>
      <p class="mb-3">
        Over time with the rich data, farm productivity will become more
        predictable, bankable and investable to provide the much needed capital
        growth. In ensuring optimum livestock, vegetables and crop performance,
        and we provide the necessary soil, health and feed programmes which
        assist with planning and forecasting.
      </p>
    </vs-card>
  </div>
</template>
<script>
import topScroll from '../components/topScroll/index'

export default {
  components: {
    topScroll
  },
  data() {
    return {}
  }
}
</script>
<style scoped>
p {
  font-size: 1.5em;
}
h4 {
  font-size: 2.5em;
  color: #236148;
  font-weight: 600;
}

.knowledge-base3 {
  background-image: url('../assets/images/misc/fence.png');
  height: 350px;
  background-size: cover;
  /* background-repeat: no-repeat; */
  background-attachment: fixed;
  /* background-position: bottom; */
}
</style>
