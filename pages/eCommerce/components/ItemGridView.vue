<!-- =========================================================================================
  File Name: ItemGridView.vue
  Description: Item Component - Grid VIew
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <!-- <div class="item-grid-view vx-row match-height">
        <div class="vx-col" :class="gridColumnWidth" v-for="item in items" :key="item.objectID"> -->
  <vx-card class="grid-view-item mb-base overflow-hidden" v-on="$listeners">
    <template slot="no-body">
      <!-- ITEM IMAGE -->
      <div
        class="item-img-container bg-white h-64 flex items-center justify-center mb-4 cursor-pointer"
        @click="navigate_to_detail_view"
      >
        <img
          :src="item.images[0]"
          :alt="item.name"
          class="grid-view-img px-4"
        />
      </div>
      <div class="item-details px-4">
        <!-- RATING & PRICE -->
        <div class="flex justify-between items-center">
          <div
            class="text-warning border border-solid border-warning flex py-1 px-2 rounded"
          >
            <span
              class="pl-4 mr-2 mt-2 border border-solid d-theme-border-grey-light border-t-0 border-b-0 border-r-0"
              v-if="ratingGive"
              ><star-rating
                :show-rating="true"
                v-model="giveThis"
                :star-size="20"
                @rating-selected="giveRating(item)"
            /></span>
            <span
              v-if="!ratingGive"
              class="text-sm mr-1"
              @click="ratingset()"
              >{{ item.rating.toFixed(1) }}</span
            >
            <feather-icon
              v-if="!ratingGive"
              icon="StarIcon"
              svgClasses="h-4 w-4"
              @click="ratingset()"
            />
          </div>
          <small>{{ itemAddr }}</small>
          <h6 class="font-bold">R{{ item.price }}</h6>
        </div>

        <!-- TITLE & DESCRIPTION -->
        <div class="my-4">
          <h6
            class="truncate font-semibold mb-1 hover:text-primary cursor-pointer"
            @click="navigate_to_detail_view"
          >
            {{ item.product_name }}
          </h6>
          <p
            class="item-description truncate text-sm"
            v-html="item.description"
          >
            {{ item.description | str_limit(8) }}
          </p>
          <p class="item-description truncate text-sm" v-if="!item.description">
            ...
          </p>
        </div>
      </div>

      <!-- SLOT: ACTION BUTTONS -->
      <slot name="action-buttons" />
    </template>
  </vx-card>
  <!--  </div>
    </div> -->
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  components: {
    StarRating
  },
  data() {
    return {
      ratingGive: false,
      giveThis: 1
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  filters: {
    str_limit(value, size) {
      if (!value) return ''
      value = value.toString()

      if (value.length <= size) {
        return value
      }
      return value.substr(0, size) + '...'
    }
  },
  computed: {
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
    giveRating(item) {
      console.log('item', item)
      let newRating = 0
      let newTimesRating = 0

      if (Number(item.rating) == 0) {
        newRating = Number(this.giveThis)
        newTimesRating = 1
      } else {
        newTimesRating = Number(item.times_rated) + 1
        let previousRating = Number(item.times_rated) * Number(item.rating)
        newRating =
          (previousRating + this.giveThis) / (Number(item.times_rated) + 1)
      }
      console.log('new', newRating, newTimesRating)
      this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(item.seller_id)
        .doc('products')
        .collection('products')
        .doc(item.objectID)
        .update({
          rating: newRating,
          times_rated: newTimesRating
        })
        .then(() => {
          this.$fireStore
            .collection('agri-ensights')
            .doc('crm')
            .collection('products')
            .doc(item.objectID)
            .update({
              rating: newRating,
              times_rated: newTimesRating
            })
        })
    },
    ratingset() {
      console.log('rating')
      this.ratingGive = true
    },
    navigate_to_detail_view() {
      this.$store.dispatch('eCommerce/selectedItem', this.item)

      this.$router.push(`/eCommerce/detail_view/${this.item.objectID}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-view-item {
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
