<template>
  <div>
    <topScroll style="margin-top: 80px; margin-bottom: 30px" />

    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <img
          src="../assets/images/about/2.png"
          alt="slide"
          style="width: 100%; margin: auto"
        />
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <img
          src="../assets/images/about/3.png"
          alt="slide"
          style="width: 100%; margin: auto"
        />
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <img
          src="../assets/images/about/4.png"
          alt="slide"
          style="width: 100%; margin: auto"
        />
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <img
          src="../assets/images/about/5.png"
          alt="slide"
          style="width: 100%; margin: auto"
        />
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <img
          src="../assets/images/about/6.png"
          alt="slide"
          style="width: 100%; margin: auto"
        />
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <img
          src="../assets/images/about/7.png"
          alt="slide"
          style="width: 100%; margin: auto"
        />
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        id="target"
        vs-w="12"
      >
        <div id="target"></div>
        <img
          src="../assets/images/about/8.png"
          alt="slide"
          style="width: 100%; margin: auto"
        />
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <img
          src="../assets/images/about/9.png"
          alt="slide"
          style="width: 100%; margin: auto"
        />
      </vs-col>
    </vs-row>
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
<style scoped></style>
