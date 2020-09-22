<template>
  <div>
    <topScroll style="margin-top: 80px; margin-bottom: 30px" />

    <vs-card class="mt-10">
      <h4>Pricing</h4>
      <h6 class="mb-6">Dedicated to the Agriculture Industry</h6>
      <div class="knowledge-base5"></div>

      <p class="mt-6">
        Agri Ensights offers users Free access to the application.
      </p>
      <p>
        Sellers can set up their online stores on the application for selling
        their products and or services.
      </p>
      <p class="mb-3">
        A service fee of 5% (excl. VAT) is charged to the seller for all
        transactions. The service fee excludes any banking related charges. At
        Agri-Ensights we strive to provide our customers with fair and
        transparent trading platform.
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

.knowledge-base5 {
  background-image: url('../assets/images/misc/chick.png');
  height: 350px;
  background-size: cover;
  /* background-repeat: no-repeat; */
  background-attachment: fixed;
  /* background-position: bottom; */
}
</style>
