<template>
  <client-only>
    <div class="letsee">
      <div v-swiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide swipe1">
            <img
              src="../../assets/banner/ban4-min.jpg"
              alt="text"
              style="width: 100%;  "
              class="hidden md:block"
            />

            <img
              src="../../assets/banner/Banner1.jpg"
              alt="text"
              style="width: 100%;  "
              class=" sm:block md:hidden"
            />
          </div>
          <div class="swiper-slide swipe2">
            <div class="title" data-swiper-parallax="-100" vs-xs="hidden"></div>
            <img
              src="../../assets/banner/ban3-min.jpg"
              alt="text"
              style="width: 100%;"
              class="hidden md:block"
            />
            <img
              src="../../assets/banner/Banner2.jpg"
              alt="text"
              style="width: 100%;  "
              class=" sm:block md:hidden"
            />
          </div>
          <div class="swiper-slide swipe3">
            <div class="title" data-swiper-parallax="-100" vs-xs="hidden"></div>
            <img
              src="../../assets/banner/ban1-min.jpg"
              alt="text"
              style="width: 100%;"
              class="hidden md:block"
            />
            <img
              src="../../assets/banner/Banner3.jpg"
              alt="text"
              style="width: 100%;  "
              class=" sm:block md:hidden"
            />
          </div>
          <div class="swiper-slide swipe4">
            <div class="title" data-swiper-parallax="-100" vs-xs="hidden"></div>
            <img
              src="../../assets/banner/ban2-min.jpg"
              alt="text"
              style="width: 100%; "
              class="hidden md:block"
            />
            <img
              src="../../assets/banner/Banner4.jpg"
              alt="text"
              style="width: 100%;  "
              class=" sm:block md:hidden"
            />
          </div>
        </div>

        <div
          class="swiper-pagination swiper-pagination-white"
          slot="pagination"
        ></div>
        <div
          class="swiper-button-prev swiper-button-white"
          slot="button-prev"
        ></div>
        <div
          class="swiper-button-next swiper-button-white"
          slot="button-next"
        ></div>
      </div>

      <!-- <h1>{{isMobile}}</h1> -->
    </div>
  </client-only>
</template>

<script>
// import 'swiper/dist/css/swiper.min.css'
// if (process.client) {
//   var { swiper, swiperSlide } = require('vue-awesome-swiper')
// }
import { directive } from 'vue-awesome-swiper'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  directives: {
    swiper: directive
  },
  data() {
    return {
      popupActivo: false,
      swiperOption: {
        speed: 600,
        parallax: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 2500,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    isMobile() {
      return this.$store.getters['app/isMobile']
    },
    windowWidth() {
      return this.$store.state.windowWidth
    }
  },
  created() {},
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style scoped>
/* .letsee {
  position: relative;
} */
.ima {
  overflow: hidden;
}
/*  */
.myIma {
  position: absolute;
  bottom: 0;
  right: -30%;
  z-index: 5000;
}
.carousel-example .swiper-container .swiper-slide {
  text-align: center;
  font-size: 38px;
  font-weight: 700;
  background-color: #eee;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* min-height: 450px; */
}
.swiper-slide {
  font-size: 10px;
  color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* padding: 40px 60px; */
  background-color: transparent !important;
  justify-content: space-around !important;
}

.parallax-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 100%;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center;
}

.swiper-slide .title {
  font-size: 41px;
  font-weight: 300;
}

.swiper-slide .subtitle {
  font-size: 21px;
}

.swiper-slide .text {
  font-size: 14px;
  max-width: 400px;
  line-height: 1.3;
}
h1 {
  font-size: 6.5rem;
  color: white;
}
p {
  font-size: 2rem;
}
.button {
  z-index: 600001;
  width: 50%;
}
</style>
