<!-- =========================================================================================
  File Name: ECommerceShop.vue
  Description: eCommerce Shop Page
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div>
    <ais-instant-search
      :search-client="searchClient"
      index-name="products"
      id="algolia-instant-search-demo"
    >
      <div style="margin-top: 100px;"></div>
      <div class="md:hidden">
        <!-- <vs-button line-origin="left" type="line" @click="popupActivo = true" -->
        <!-- <vs-button
            line-origin="left"
            type="line"
            v-if="isLoggedIn"
            @click="$router.push('/registerProfile/sell')"
            >Register as a seller</vs-button
          > -->

        <vs-button
          line-origin="left"
          type="line"
          @click="$router.push('/register')"
          >Register as a seller</vs-button
        >

        <!-- <vs-button
            line-origin="left"
            type="line"
            @click="$router.push('/registerProfile/buy')"
            v-if="isLoggedIn"
            >Register as a buyer</vs-button
          > -->

        <vs-button
          line-origin="left"
          type="line"
          @click="$router.push('/register')"
          >Register as a buyer</vs-button
        >
      </div>
      <!-- AIS CONFIG -->
      <ais-configure :hits-per-page.camel="9" />

      <div class="algolia-header mb-4 mt-6">
        <div class="flex md:items-end items-center justify-between flex-wrap">
          <!-- TOGGLE SIDEBAR BUTTON -->
          <vs-button
            icon="search"
            class="inline-flex  cursor-pointer  ml-4 mr-4"
            @click.stop="toggleFilterSidebar"
          ></vs-button>

          <p class="lg:inline-flex hidden font-semibold algolia-filters-label">
            Filters
          </p>

          <div class="flex justify-between items-end flex-grow">
            <!-- Stats -->
            <ais-stats>
              <p
                slot-scope="{
                  hitsPerPage,
                  nbPages,
                  nbHits,
                  page,
                  processingTimeMS,
                  query
                }"
                class="font-semibold md:block hidden"
              >
                <!-- {{ nbHits }} results found in {{ processingTimeMS }}ms -->

                <!-- <nuxt-link :to="{ path: '/about', hash: '#target' }"> -->
                <!-- <vs-button
                    line-origin="left"
                    type="line"
                    v-if="isLoggedIn"
                    @click="$router.push('/registerProfile/sell')"
                    >Register as a seller</vs-button
                  > -->

                <vs-button
                  line-origin="left"
                  type="line"
                  @click="$router.push('/register')"
                  >Register as a seller</vs-button
                >

                <!-- <vs-button
                    line-origin="left"
                    type="line"
                    @click="$router.push('/registerProfile/buy')"
                    v-if="isLoggedIn"
                    >Register as a buyer</vs-button
                  > -->

                <vs-button
                  line-origin="left"
                  type="line"
                  @click="$router.push('/register')"
                  >Register as a buyer</vs-button
                >
                <!-- </nuxt-link> -->

                <vs-popup
                  class="holamundo"
                  title="Sell Online"
                  :active.sync="popupActivo"
                >
                  <img
                    src="@/assets/images/about/8.png"
                    alt="slide"
                    style="width: 100%; margin: auto"
                  />
                </vs-popup>
              </p>
            </ais-stats>

            <div class="flex flex-wrap">
              <!-- SORTING -->
              <ais-sort-by
                :items="[
                  { value: 'instant_search', label: 'Featured' },
                  {
                    value: 'instant_search_price_asc',
                    label: 'Lowest Price'
                  },
                  {
                    value: 'instant_search_price_desc',
                    label: 'Highest Price'
                  }
                ]"
              >
                <vs-select
                  :value="currentRefinement"
                  slot-scope="{ items, currentRefinement, refine }"
                  @input="val => refine(val)"
                  class="mr-4 vs-input-shadow-drop vs-select-no-border d-theme-input-dark-bg w-48"
                >
                  <vs-select-item
                    v-for="(item, index) in myProducts"
                    :key="index"
                    :value="item.value"
                    :text="item.label"
                  />
                </vs-select>
              </ais-sort-by>

              <!-- ITEM VIEW - GRID/LIST -->
              <div>
                <feather-icon
                  icon="GridIcon"
                  @click="currentItemView = 'item-grid-view'"
                  class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer"
                  :svgClasses="{
                    'text-primary stroke-current':
                      currentItemView == 'item-grid-view'
                  }"
                />
                <feather-icon
                  icon="ListIcon"
                  @click="currentItemView = 'item-list-view'"
                  class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer "
                  :svgClasses="{
                    'text-primary stroke-current':
                      currentItemView == 'item-list-view'
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="algolia-content-container" class="relative clearfix">
        <vs-sidebar
          class="items-no-padding vs-sidebar-rounded background-absolute"
          parent="#algolia-content-container"
          :click-not-close="clickNotClose"
          :hidden-background="clickNotClose"
          v-model="isFilterSidebarActive"
        >
          <div class="p-6 filter-container">
            <!-- MULTI RANGE -->
            <h6 class="font-bold mb-3">Multi Range</h6>

            <ul>
              <li
                v-for="item in numericItems"
                :key="item.value"
                class="flex items-center cursor-pointer py-1"
              >
                <vs-radio v-model="price" vs-name="price" :vs-value="item">{{
                  item.label
                }}</vs-radio>
                <!-- <feather-icon
                      icon="CircleIcon"
                      :svgClasses="[
                        { 'text-primary fill-current': item.isRefined },
                        'h-5 w-5'
                      ]"
                    />
                    <span
                      class="ml-2"
                      :class="{ 'text-primary': item.isRefined }"
                      >{{ item.label }}</span
                    > -->
              </li>
            </ul>

            <vs-divider />

            <!-- PRICE SLIDER -->
            <h6 class="font-bold mb-3">Price Slider</h6>
            <ais-range-input attribute="price">
              <div slot-scope="{ currentRefinement, range, refine }">
                <vs-slider
                  class="algolia-price-slider"
                  text-fixed="R"
                  :min="range.min"
                  :max="range.max"
                  :value="toValue(currentRefinement, range)"
                  @input="refine({ min: $event[0], max: $event[1] })"
                />
              </div>
            </ais-range-input>

            <vs-divider />

            <!-- CATEGORIES -->
            <h6 class="font-bold mb-4">Category</h6>
            <div>
              <ul>
                <li
                  v-for="(item, index) in categories"
                  :key="index"
                  class="flex items-center cursor-pointer py-1"
                >
                  <vs-radio
                    v-model="category"
                    vs-name="category"
                    :vs-value="item.category"
                    >{{ item.category }}</vs-radio
                  >
                </li>
              </ul>
            </div>

            <vs-divider />

            <!-- CATEGORIES -->
            <h6 class="font-bold mb-4">Brands {{ brand }}</h6>
            <!-- <ais-hierarchical-menu :attributes="algoliaBrands"> -->
            <div>
              <ul>
                <li
                  v-for="(item, index) in brands"
                  :key="index"
                  class="flex items-center cursor-pointer py-1"
                >
                  <vs-radio
                    v-model="brand"
                    vs-name="brand"
                    :vs-value="item.brand"
                    >{{ item.brand }}</vs-radio
                  >
                </li>
              </ul>
            </div>
            <!-- </ais-hierarchical-menu> -->

            <vs-divider />

            <!-- Brands -->
            <!-- <h6 class="font-bold mb-4">Brand</h6> -->

            <!-- <ais-refinement-list attribute="brand">
                            <div slot-scope="{
                              items,
                              isFromSearch,
                              refine,
                            }">

                                <ul>
                                    <li v-if="isFromSearch && !items.length">No results.</li>
                                    <li v-for="item in items" :key="item.value" class="mb-2 flex items-center justify-between">
                                        <vs-checkbox v-model="item.isRefined" class="ml-0" @click="refine(item.value)">{{ item.label }}</vs-checkbox>
                                        <span>{{ item.count }}</span>
                                    </li>
                                </ul>
                            </div>
                        </ais-refinement-list> -->
            <vs-divider />

            <!-- Rating -->
            <h6 class="font-bold mb-3">Rating</h6>
            <ais-rating-menu attribute="rating">
              <ul slot-scope="{ items, refine, createURL }">
                <li v-for="item in items" :key="item.value" class="mb-2">
                  <div
                    @click.prevent="refine(item.value)"
                    class="flex justify-between items-center"
                  >
                    <div class="flex items-center flex-wrap">
                      <feather-icon
                        icon="StarIcon"
                        :svgClasses="[
                          {
                            'text-warning': full,
                            'text-grey': !full,
                            'ml-1': index
                          },
                          'cursor-pointer stroke-current h-6 w-6'
                        ]"
                        v-for="(full, index) in item.stars"
                        :key="index"
                      />
                      <span class="ml-2">&amp; up</span>
                    </div>
                    <span>({{ item.count }})</span>
                  </div>
                </li>
              </ul>
            </ais-rating-menu>

            <vs-divider />

            <ais-clear-refinements class="flex justify-center">
              <vs-button
                class="w-full"
                slot-scope="{ canRefine, refine, createURL }"
                @click.prevent="refine"
                :disabled="!canRefine"
                >Remove Filters</vs-button
              >
            </ais-clear-refinements>
          </div>
        </vs-sidebar>

        <!-- RIGHT COL -->
        <div :class="{ 'sidebar-spacer-with-margin': clickNotClose }">
          <!-- SEARCH BAR -->
          <ais-search-box style="box-shadow: 5px 5px 5px 5px #1f684d;">
            <div slot-scope="{ currentRefinement, isSearchStalled, refine }">
              <div class="relative mb-8">
                <!-- SEARCH INPUT -->
                <vs-input
                  class="w-full vs-input-shadow-drop vs-input-no-border d-theme-input-dark-bg"
                  placeholder="Search here"
                  v-model="SearchQuery"
                  size="large"
                />

                <!-- SEARCH LOADING -->
                <p :hidden="!isSearchStalled" class="mt-4 text-grey">
                  <feather-icon
                    icon="ClockIcon"
                    svgClasses="w-4 h-4"
                    class="mr-2 align-middle"
                  />
                  <span>Loading...</span>
                </p>

                <!-- SEARCH ICON -->
                <div
                  slot="submit-icon"
                  class="absolute top-0 right-0 py-4 px-6"
                  v-show="!currentRefinement"
                >
                  <feather-icon icon="SearchIcon" svgClasses="h-6 w-6" />
                </div>

                <!-- CLEAR INPUT ICON -->
                <div
                  slot="reset-icon"
                  class="absolute top-0 right-0 py-4 px-6"
                  v-show="currentRefinement"
                >
                  <feather-icon
                    icon="XIcon"
                    svgClasses="h-6 w-6 cursor-pointer"
                    @click="refine('')"
                  />
                </div>
              </div>
            </div>
          </ais-search-box>

          <!-- SEARCH RESULT -->
          <ais-hits>
            <div slot-scope="{ items }">
              <!-- {{items}} -->

              <!-- GRID VIEW -->
              <template v-if="currentItemView == 'item-grid-view'">
                <div class="items-grid-view vx-row match-height">
                  <div
                    class="vx-col lg:w-1/3 sm:w-1/2 w-full"
                    v-for="item in filteredProducts"
                    :key="item.objectID"
                  >
                    <item-grid-view :item="item">
                      <!-- SLOT: ACTION BUTTONS -->
                      <template slot="action-buttons">
                        <div class="flex flex-wrap">
                          <!-- PRIMARY BUTTON: ADD TO WISH LIST -->
                          <div
                            class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
                            @click="toggleItemInWishList(item)"
                          >
                            <feather-icon
                              icon="HeartIcon"
                              :svgClasses="[
                                {
                                  'text-danger fill-current': isInWishList(
                                    item.objectID
                                  )
                                },
                                'h-4 w-4'
                              ]"
                            />

                            <span class="text-sm font-semibold ml-2"
                              >WISHLIST</span
                            >
                          </div>

                          <!-- SECONDARY BUTTON: ADD-TO/VIEW-IN CART -->
                          <div
                            class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                            @click="cartButtonClicked(item)"
                          >
                            <feather-icon
                              icon="ShoppingBagIcon"
                              svgClasses="h-4 w-4"
                            />

                            <span
                              class="text-sm font-semibold ml-2"
                              v-if="isInCart(item.objectID)"
                              >VIEW IN CART</span
                            >
                            <span class="text-sm font-semibold ml-2" v-else
                              >ADD TO CART</span
                            >
                          </div>
                        </div>
                      </template>
                    </item-grid-view>
                  </div>
                </div>
              </template>

              <!-- LIST VIEW -->
              <template v-else>
                <div
                  class="items-list-view mb-base"
                  v-for="item in filteredProducts"
                  :key="item.objectID"
                >
                  <item-list-view :item="item">
                    <!-- SLOT: ACTION BUTTONS -->
                    <template slot="action-buttons">
                      <div
                        class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
                        @click="toggleItemInWishList(item)"
                      >
                        <feather-icon
                          icon="HeartIcon"
                          :svgClasses="[
                            {
                              'text-danger fill-current': isInWishList(
                                item.objectID
                              )
                            },
                            'h-4 w-4'
                          ]"
                        />
                        <span class="text-sm font-semibold ml-2">WISHLIST</span>
                      </div>
                      <div
                        class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
                        @click="cartButtonClicked(item)"
                      >
                        <feather-icon
                          icon="ShoppingBagIcon"
                          svgClasses="h-4 w-4"
                        />

                        <span
                          class="text-sm font-semibold ml-2"
                          v-if="isInCart(item.objectID)"
                          >VIEW IN CART</span
                        >
                        <span class="text-sm font-semibold ml-2" v-else
                          >ADD TO CART</span
                        >
                      </div>
                    </template>
                  </item-list-view>
                </div>
              </template>
            </div>
          </ais-hits>

          <!-- PAGINATION -->
          <ais-pagination>
            <div
              slot-scope="{
                currentRefinement,
                nbPages,
                pages,
                isFirstPage,
                isLastPage,
                refine,
                createURL
              }"
            >
              <vs-pagination
                :total="nbPages"
                :max="7"
                :value="currentRefinement + 1"
                @input="
                  val => {
                    refine(val - 1)
                  }
                "
              />
            </div>
          </ais-pagination>

          <!-- ALGOLIA LOGO -->
          <!-- <img class="flex mt-4 mx-auto h-8" src="@/assets/images/pages/eCommerce/Algolia-logo.png" alt="algolia-logo"> -->
        </div>
      </div>
    </ais-instant-search>
  </div>
</template>

<script>
import {
  AisClearRefinements,
  AisConfigure,
  AisHierarchicalMenu,
  AisHits,
  AisInstantSearch,
  AisNumericMenu,
  AisPagination,
  AisRangeInput,
  AisRatingMenu,
  AisRefinementList,
  AisSearchBox,
  AisSortBy,
  AisStats
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'

export default {
  components: {
    ItemGridView: () => import('./components/ItemGridView.vue'),
    ItemListView: () => import('./components/ItemListView.vue'),
    AisClearRefinements,
    AisConfigure,
    AisHierarchicalMenu,
    AisHits,
    AisInstantSearch,
    AisNumericMenu,
    AisPagination,
    AisRangeInput,
    AisRatingMenu,
    AisRefinementList,
    AisSearchBox,
    AisSortBy,
    AisStats
  },
  data() {
    return {
      searchClient: algoliasearch(
        '7XTLH5RPF1',
        '504d33c2a80b43d071e1a9c9f4cdeaa2'
      ),
      myProducts: [],
      // Filter Sidebar
      popupActivo: false,
      isFilterSidebarActive: true,
      clickNotClose: true,
      currentItemView: 'item-grid-view',
      numericItems: [
        { label: 'All' },
        { label: '<= R10', end: 10 },
        { label: 'R10 - R100', start: 10, end: 100 },
        { label: 'R100 - R500', start: 100, end: 500 },
        { label: '>= R500', start: 500 }
      ],
      SearchQuery: '',
      price: 'All',
      brands: [],
      brand: '',
      categories: [],
      category: '',

      algoliaCategories: ['category.category'],
      algoliaBrands: ['brand']
    }
  },
  computed: {
    toValue() {
      return (value, range) => [
        value.min !== null ? value.min : range.min,
        value.max !== null ? value.max : range.max
      ]
    },
    filteredProducts() {
      return this.myProducts.filter(
        item =>
          item.product_name
            .toLowerCase()
            .includes(this.SearchQuery.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(this.SearchQuery.toLowerCase()) ||
          item.brand.toLowerCase().includes(this.SearchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(this.SearchQuery.toLowerCase())
      )
    },

    // GRID VIEW
    isInCart() {
      return itemId => this.$store.getters['eCommerce/isInCart'](itemId)
    },
    isInWishList() {
      return itemId => this.$store.getters['eCommerce/isInWishList'](itemId)
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn']
    },
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  watch: {
    brand() {
      this.SearchQuery = this.brand
    },
    category() {
      this.SearchQuery = this.category
    },
    windowWidth() {
      this.setSidebarWidth()
    }
  },
  methods: {
    setSidebarWidth() {
      if (this.windowWidth < 992) {
        this.isFilterSidebarActive = this.clickNotClose = false
      } else {
        this.isFilterSidebarActive = this.clickNotClose = true
      }
    },

    // GRID VIEW - ACTIONS
    toggleFilterSidebar() {
      if (this.clickNotClose) return
      this.isFilterSidebarActive = !this.isFilterSidebarActive
    },
    toggleItemInWishList(item) {
      this.$store.dispatch('eCommerce/toggleItemInWishList', item)
    },
    additemInCart(item) {
      this.$store.dispatch('eCommerce/additemInCart', item)
    },
    cartButtonClicked(item) {
      this.isInCart(item.objectID)
        ? this.$router.push('/eCommerce/checkout')
        : this.additemInCart(item)
    }
  },
  created() {
    this.setSidebarWidth()
    let vm = this
    this.$fireStore
      .collection('agri-ensights')
      .doc('crm')
      .collection('products')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let produ = {
            id: doc.id,
            objectID: doc.id,
            ...doc.data()
          }
          vm.myProducts.push(produ)
          // doc.data() is never undefined for query doc snapshots
        })
      })

    this.$fireStore
      .collection('agri-ensights')
      .doc('crm')
      .collection('categories')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let produ = {
            id: doc.id,
            objectID: doc.id,
            ...doc.data()
          }
          vm.categories.push(produ)
          // doc.data() is never undefined for query doc snapshots
        })
      })

    this.$fireStore
      .collection('agri-ensights')
      .doc('crm')
      .collection('brand')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let produ = {
            id: doc.id,
            objectID: doc.id,
            ...doc.data()
          }
          vm.brands.push(produ)
          // doc.data() is never undefined for query doc snapshots
        })
      })
  }
}
</script>

<style lang="scss">
#algolia-instant-search-demo {
  .algolia-header {
    .algolia-filters-label {
      width: calc(260px + 2.4rem);
    }
  }

  #algolia-content-container {
    .vs-sidebar {
      position: relative;
      float: left;
    }
  }

  .algolia-search-input-right-aligned-icon {
    padding: 1rem 1.5rem;
  }

  .algolia-price-slider {
    min-width: unset;
  }

  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
  }
}

.theme-dark {
  #algolia-instant-search-demo {
    #algolia-content-container {
      .vs-sidebar {
        background-color: #10163a;
      }
    }
  }
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: 0.5rem;
    }

    .vs-sidebar--items {
      border-radius: 0.5rem;
    }
  }
}

@media (max-width: 992px) {
  #algolia-content-container {
    .vs-sidebar {
      position: absolute !important;
      float: none !important;
    }
  }
}
</style>
