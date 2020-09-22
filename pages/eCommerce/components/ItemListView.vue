<!-- =========================================================================================
    File Name: ItemListView.vue
    Description: Item Component - List VIew

========================================================================================== -->

<template>
  <vx-card class="list-view-item overflow-hidden" v-on="$listeners">
    <template slot="no-body">
      <div class="vx-row item-details no-gutter">
        <!-- IMG COL -->
        <div
          class="vx-col sm:w-1/4 w-full item-img-container bg-white flex items-center justify-center cursor-pointer"
          @click="navigate_to_detail_view"
        >
          <img
            :src="item.images[0]"
            :alt="item.name"
            class="grid-view-img p-4"
          />
        </div>
        <div class="vx-col sm:w-1/2">
          <div class="p-4 pt-6">
            <slot name="item-meta">
              <h6
                class="item-name font-semibold mb-1 hover:text-primary cursor-pointer"
                @click="navigate_to_detail_view"
              >
                {{ item.product_name }}
              </h6>
              <p class="text-sm mb-4">
                By
                <span class="font-semibold cursor-pointer">{{
                  item.brand
                }}</span>
              </p>
              <p class="item-description text-sm" v-html="item.description">
                {{ item.description }}
              </p>
            </slot>
          </div>
        </div>

        <div
          class="vx-col sm:w-1/4 w-full flex items-center sm:border border-0 border-solid d-theme-border-grey-light border-r-0 border-t-0 border-b-0"
        >
          <div class="p-4 flex flex-col w-full">
            <div
              class="text-warning flex self-end border border-solid border-warning py-1 px-2 rounded"
            >
              <span class="text-sm mr-1">{{ item.rating }}</span>
              <feather-icon icon="StarIcon" svgClasses="h-4 w-4" />
            </div>
            <small>{{ itemAddr }}</small>

            <div class="my-6">
              <h5 class="font-bold text-center">
                R{{ item.price | thousandSeprator }}
              </h5>
              <span
                class="text-grey flex items-start justify-center mt-1"
                v-if="item.free_shipping"
              >
                <feather-icon icon="ShoppingCartIcon" svgClasses="w-4 h-4" />
                <span class="text-sm ml-2">Free Shipping</span>
              </span>
            </div>

            <slot name="action-buttons" />
          </div>
        </div>
      </div>
    </template>
  </vx-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    thousandSeprator(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  computed: {
    isInCart() {
      return (itemId) => this.$store.getters['eCommerce/isInCart'](itemId)
    },
    isInWishList() {
      return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
    },
    itemAddr() {
      let address = ''
      if (this.item.addr) {
        var add = this.item.addr.split(',')
        console.log('add', add)
        address = add[1] + ' ' + add[2]
      }

      return address
    }
  },
  methods: {
    toggleItemInWishList(item) {
      this.$store.dispatch('eCommerce/toggleItemInWishList', item)
    },
    additemInCart(item) {
      this.$store.dispatch('eCommerce/additemInCart', item)
    },
    cartButtonClicked(item) {
      this.isInCart(item.objectID)
        ? this.$router.push('/eCommerce/checkout').catch(() => {})
        : this.additemInCart(item)
    },
    navigate_to_detail_view() {
      this.$router.push(`/eCommerce/detail_view/${item.objectID}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-view-item {
  .item-name,
  .item-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-name {
    -webkit-line-clamp: 2;
  }

  .item-description {
    -webkit-line-clamp: 5;
  }

  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }
}
</style>
