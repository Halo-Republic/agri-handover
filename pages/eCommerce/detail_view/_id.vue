<!-- =========================================================================================
  File Name: ECommerceItemDetail.vue
  Description: eCommerce Item Detail page
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="item-detail-page mt-20">
    <vs-alert
      color="danger"
      title="Error Fetching Product Data"
      :active.sync="error_occured"
    >
      <span>{{ error_msg }}. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'ecommerce-shop' }"
          class="text-inherit underline"
          >All Items</router-link
        >
      </span>
    </vs-alert>

    <vx-card
      v-if="item_data"
      :key="item_data.objectID"
      style="margin-top: 30px; margin-bottom: 30px"
    >
      <template slot="no-body">
        <div class="item-content">
          <!-- Item Main Info -->
          <div class="product-details p-6">
            <div class="vx-row mt-6">
              <div
                class="vx-col md:w-2/5 w-full flex items-center justify-center"
              >
                <div class="product-img-container w-3/5 mx-auto mb-10 md:mb-0">
                  <img
                    :src="item_data.images[0]"
                    :alt="item_data.product_name"
                    class="responsive"
                  />
                </div>
              </div>

              <!-- Item Content -->
              <div class="vx-col md:w-3/5 w-full mt-10">
                <h3>{{ item_data.product_name }}</h3>

                <p class="my-2">
                  <span class="mr-2">by</span>
                  <span>{{ item_data.brand }}</span>
                </p>
                <p class="flex items-center flex-wrap">
                  <span
                    class="text-2xl leading-none font-medium text-primary mr-4 mt-2"
                    >R{{ item_data.price }}</span
                  >
                  <span
                    class="pl-4 mr-2 mt-2 border border-solid d-theme-border-grey-light border-t-0 border-b-0 border-r-0"
                    ><star-rating
                      :show-rating="false"
                      :rating="item_data.rating"
                      :star-size="20"
                      read-only
                  /></span>
                  <span class="cursor-pointer leading-none mt-2">{{
                    item_data.times_rated
                  }}</span>
                </p>

                <vs-divider />

                <p v-html="item_data.description">
                  {{ item_data.description }}
                </p>

                <vs-list class="product-sales-meta-list px-0 pt-4">
                  <vs-list-item
                    v-if="item_data.free_shipping"
                    class="p-0 border-none"
                    title="Free Sheeping"
                    icon-pack="feather"
                    icon="icon-truck"
                  />
                </vs-list>

                <vs-divider />

                <!-- Quantity -->
                <div class="vx-row">
                  <div class="vx-col w-full">
                    <p class="my-2">
                      <span>Available</span>
                      <span class="mx-2">-</span>
                      <span class="text-success">In Stock</span>
                    </p>
                  </div>

                  <div class="vx-col w-full">
                    <div class="flex flex-wrap items-start mb-4">
                      <!-- Add To Cart Button -->
                      <vs-button
                        class="mr-4 mb-4"
                        icon-pack="feather"
                        icon="icon-shopping-cart"
                        v-if="!isInCart(item_data.objectID)"
                        @click="toggleItemInCart(item_data)"
                      >
                        ADD TO CART
                      </vs-button>

                      <vs-button
                        v-else
                        class="mr-4 mb-4"
                        icon-pack="feather"
                        icon="icon-shopping-cart"
                        @click="$router.push('/eCommerce/checkout')"
                      >
                        VIEW IN CART
                      </vs-button>
                      <!-- /Add To Cart Button -->

                      <!-- Wishlist Button -->
                      <vs-button
                        v-if="isInWishList(item_data.objectID)"
                        key="filled"
                        class="mb-4 mr-4"
                        icon-pack="feather"
                        icon="icon-heart"
                        color="danger"
                        @click="toggleItemInWishList(item_data)"
                      >
                        WHISHLIST
                      </vs-button>

                      <vs-button
                        v-else
                        key="border"
                        class="mb-4 mr-4"
                        type="border"
                        icon-pack="feather"
                        icon="icon-heart"
                        color="danger"
                        @click="toggleItemInWishList(item_data)"
                      >
                        WHISHLIST
                      </vs-button>
                    </div>
                  </div>
                </div>

                <div class="vx-row">
                  <div class="vx-col flex flex-wrap items-center">
                    <vs-button
                      class="mr-4"
                      icon-pack="feather"
                      color="#1551b1"
                      icon="icon-facebook"
                      radius
                      @click="facebook"
                    ></vs-button>
                    <vs-button
                      class="mr-4"
                      icon-pack="feather"
                      color="#00aaff"
                      icon="icon-twitter"
                      radius
                      @click="twitter"
                    ></vs-button>
                    <vs-button
                      class="mr-4"
                      icon-pack="feather"
                      color="#C8328C"
                      icon="icon-instagram"
                      radius
                      @click="instagram"
                    ></vs-button>
                  </div>
                </div>
                <div>
                  <nuxt-link to="/eCommerce">
                    <vs-button class="mt-4 mb-4">
                      CONTINUE SHOPPING
                    </vs-button>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </vx-card>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import algoliasearch from 'algoliasearch/lite'
import StarRating from 'vue-star-rating'

export default {
  components: {
    swiper,
    swiperSlide,
    StarRating
  },
  data() {
    return {
      algolia_index: algoliasearch(
        'latency',
        '6be0576ff61c053d5f9a3225e2a90f76'
      ).initIndex('instant_search'),
      //   item_data: null,
      error_occured: false,
      error_msg: '',

      // Related Products Swiper
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 55,
        breakpoints: {
          1600: {
            slidesPerView: 4,
            spaceBetween: 55
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 55
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 55
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 55
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      // Below is data which is common in any item
      // Algolia's dataSet don't provide this kind of data. So, here's dummy data for demo
      available_item_colors: [
        '#7367F0',
        '#28C76F',
        '#EA5455',
        '#FF9F43',
        '#1E1E1E'
      ],
      opt_color: '#7367F0',
      is_hearted: false,

      related_items: [
        {
          name:
            'Apple - Apple Watch Series 1 42mm Space Gray Aluminum Case Black Sport Band - Space Gray Aluminum',
          brand: 'Apple',
          price: 229,
          image:
            'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
          rating: 4,
          objectID: '5546604'
        },
        {
          name:
            'Beats by Dr. Dre - Powerbeats2 Wireless Earbud Headphones - Black/Red',
          brand: 'Beats by Dr. Dre',
          price: 199.99,
          image:
            'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/08.png',
          rating: 4,
          objectID: '5565002'
        },
        {
          name: 'Amazon - Fire TV Stick with Alexa Voice Remote - Black',
          brand: 'Amazon',
          price: 39.99,
          image:
            'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/03.png',
          rating: 4,
          objectID: '5477500'
        },
        {
          name:
            'Apple - Apple Watch Nike+ 42mm Silver Aluminum Case Silver/Volt Nike Sport Band - Silver Aluminum',
          brand: 'Apple',
          price: 399,
          image:
            'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/07.png',
          rating: 4,
          objectID: '5547700'
        },
        {
          name: 'Google - Chromecast Ultra - Black',
          brand: 'Google',
          price: 69.99,
          image:
            'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
          rating: 4,
          objectID: '5578628'
        },
        {
          name: 'Beats by Dr. Dre - Beats EP Headphones - White',
          brand: 'Beats by Dr. Dre',
          price: 129.99,
          image:
            'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
          rating: 4,
          objectID: '5577781'
        },
        {
          name: 'LG - 40" Class (39.5" Diag.) - LED - 1080p - HDTV - Black',
          brand: 'LG',
          price: 279.99,
          image:
            'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
          rating: 4,
          objectID: '5613404'
        }
      ]
    }
  },
  computed: {
    item_qty() {
      const item = this.$store.getters['eCommerce/getCartItem'](
        this.item_data.objectID
      )
      return Object.keys(item).length ? item.quantity : 1
    },
    itemColor() {
      return (obj) => {
        const style_obj = {}

        obj.style.forEach((p) => {
          style_obj[p] = obj.color
        })

        return style_obj
      }
    },
    isInWishList() {
      return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
    },
    isInCart() {
      return (itemId) => this.$store.getters['eCommerce/isInCart'](itemId)
    },
    item_data() {
      return this.$store.getters['eCommerce/selectedItem']
    }
  },
  methods: {
    giveRating() {
      console.log('star')
    },
    instagram() {
      window.open('https://www.instagram.com/agri_ensights/', '_blank')
    },
    twitter() {
      window.open('https://twitter.com/AEnsights', '_blank')
    },
    facebook() {
      window.open('https://web.facebook.com/AgriEnsights/', '_blank')
    },
    toggleItemInWishList(item) {
      this.$store.dispatch('eCommerce/toggleItemInWishList', item)
    },
    toggleItemInCart(item) {
      this.$store.dispatch('eCommerce/toggleItemInCart', item)
    },
    fetch_item_details(id) {
      if (process.client) {
        this.algolia_index.getObject(id, (err, content) => {
          if (err) {
            this.error_occured = true
            this.error_msg = err.message
            console.error(err)
          } else {
            this.item_data = content
          }
        })
      }
    }
  },
  created() {
    if (process.client) {
      console.log(this.item_data)

      // this.fetch_item_details(this.$route.params.id)
      // this.fetch_item_details('5546604')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/vuexy/_variables.scss';

#item-detail-page {
  .color-radio {
    height: 2.28rem;
    width: 2.28rem;

    > div {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .item-features {
    background-color: #f7f7f7;

    .theme-dark & {
      background-color: $theme-dark-secondary-bg;
    }
  }

  .product-sales-meta-list {
    .vs-list--icon {
      padding-left: 0;
    }
  }

  .related-product-swiper {
    // padding-right: 2rem;
    // padding-left: 2rem;

    .swiper-wrapper {
      padding-bottom: 2rem;

      > .swiper-slide {
        background-color: #f7f7f7;
        box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.1),
          0 5px 12px 0 rgba(0, 0, 0, 0.08) !important;

        .theme-dark & {
          background-color: $theme-light-dark-bg;
        }
      }
    }

    .swiper-button-next,
    .swiper-button-prev {
      transform: scale(0.5);
      filter: hue-rotate(40deg);
    }

    .swiper-button-next {
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
    }
  }
}
</style>
