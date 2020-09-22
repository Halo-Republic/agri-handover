<!-- =========================================================================================
  File Name: ECommerceCheckout.vue
  Description: eCommerce Checkout page
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="ecommerce-checkout-demo">
    <form-wizard
      ref="checkoutWizard"
      color="rgba(var(--vs-primary), 1)"
      :title="null"
      :subtitle="null"
      :hide-buttons="true"
      style="margin-top: 85px"
    >
      <!-- tab 1 content -->
      <tab-content title="Cart" icon="feather icon-shopping-cart" class="mb-5">
        <!-- IF CART HAVE ITEMS -->
        <div class="vx-row" v-if="cartItems.length">
          <!-- LEFT COL -->
          <div class="vx-col lg:w-2/3 w-full relative">
            <div
              class="items-list-view"
              v-for="(item, index) in cartItems"
              :key="item.objectID"
            >
              <item-list-view :item="item" class="mb-base">
                <!-- SLOT: ITEM META -->
                <template slot="item-meta">
                  <h6
                    class="item-name font-semibold mb-1 cursor-pointer hover:text-primary"
                    @click="
                      $router.push({
                        name: 'ecommerce-item-detail-view',
                        params: { item_id: item.objectID }
                      })
                    "
                  >
                    {{ item.name }}
                  </h6>
                  <p class="text-sm mb-2">
                    By
                    <span class="font-semibold cursor-pointer">{{
                      item.brand.brand
                    }}</span>
                  </p>
                  <p class="text-success text-sm">In Stock</p>

                  <p class="mt-4 font-bold text-sm">Quantity</p>
                  <vs-input-number
                    min="1"
                    max="10"
                    :value="item.quantity"
                    @input="updateItemQuantity($event, index)"
                    class="inline-flex"
                  />

                  <!-- <p class="font-medium text-grey mt-4">
                    Delivery by, {{ item.delivery_date }}
                  </p> -->
                  <p class="text-success font-medium">
                    {{ item.discount_in_percentage }}% off
                    {{ item.offers_count }} offers Available
                  </p>
                </template>

                <!-- SLOT: ACTION BUTTONS -->
                <template slot="action-buttons">
                  <!-- PRIMARY BUTTON: REMOVE -->
                  <div
                    class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
                    @click="removeItemFromCart(item)"
                  >
                    <feather-icon icon="XIcon" svgClasses="h-4 w-4" />
                    <span class="text-sm font-semibold ml-2">REMOVE</span>
                  </div>

                  <!-- SECONDARY BUTTON: MOVE-TO/VIEW-IN WISHLIST -->
                  <div
                    class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
                    @click="wishListButtonClicked(item)"
                  >
                    <feather-icon
                      icon="HeartIcon"
                      :svgClasses="[
                        {
                          'text-white fill-current': isInWishList(item.objectID)
                        },
                        'h-4 w-4'
                      ]"
                    />
                    <span
                      class="text-sm font-semibold ml-2"
                      v-if="isInWishList(item.objectID)"
                      >WISHLIST</span
                    >
                    <span class="text-sm font-semibold ml-2" v-else
                      >WISHLIST</span
                    >
                  </div>
                </template>
              </item-list-view>
            </div>
          </div>

          <!-- RIGHT COL -->
          <div class="vx-col lg:w-1/3 w-full">
            <vx-card>
              <p class="text-grey mb-3">Options</p>
              <div class="flex justify-between">
                <span class="font-semibold">Coupons</span>
                <span class="font-medium text-primary cursor-pointer"
                  >Apply</span
                >
              </div>

              <vs-divider />

              <p class="font-semibold mb-3">Price Details</p>
              <div class="flex justify-between mb-2">
                <span class="text-grey">Total MRP</span>
                <span>R{{ cost | thousandSeprator }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-grey">Discount</span>
                <span class="text-success"
                  >R{{ totalDiscount | thousandSeprator }}</span
                >
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-grey">Estimated Tax</span>
                <!-- <span>R{{ totalVat | thousandSeprator }} Covered per product</span> -->
                <span>R0</span>
              </div>
              <!-- <div class="flex justify-between mb-2">
                <span class="text-grey">EMI Eligibility</span>
                <a href="#" class="text-primary">Details</a>
              </div> -->
              <div class="flex justify-between mb-2">
                <span class="text-grey">Delivery Charges</span>
                <span class="text-success">Not included</span>
              </div>

              <vs-divider />

              <div class="flex justify-between font-semibold mb-3">
                <span>Total</span>
                <span>R{{ totalCost | thousandSeprator }}</span>
              </div>

              <vs-button class="w-full" @click="$refs.checkoutWizard.nextTab()"
                >PLACE ORDER</vs-button
              >
            </vx-card>
          </div>
        </div>

        <!-- IF NO ITEMS IN CART -->
        <vx-card title="You don't have any items in your cart." v-else>
          <vs-button @click="$router.push('/apps/eCommerce/shop')"
            >Browse Shop</vs-button
          >
        </vx-card>
      </tab-content>

      <!-- tab 2 content -->
      <tab-content title="Address" icon="feather icon-home" class="mb-5">
        <div>
          <ul class="ml-10 mb-10">
            <!-- <li>
        <vs-checkbox v-model="checkBox1">Delivery</vs-checkbox>
      </li>
      <li>
        <vs-checkbox v-model="checkBox2">Pickup</vs-checkbox>
      </li>-->
            <li>
              <vs-radio
                v-model="checkBox1"
                vs-name="checkBox1"
                vs-value="Delivery"
                >Delivery</vs-radio
              >
            </li>
            <li>
              <vs-radio
                v-model="checkBox1"
                vs-name="checkBox1"
                vs-value="Pickup"
                >Pickup</vs-radio
              >
            </li>
          </ul>
        </div>
        <div class="vx-row" v-if="checkBox1 == 'Pickup'">
          <vx-card
            title="Pick up"
            subtitle='Be sure to check "Pickup at this address" when you have finished'
            class="mb-base"
          >
            <div
              class="items-list-view"
              v-for="item in cartItems"
              :key="item.objectID"
            >
              <!-- SLOT: ITEM META -->

              <h6
                class="item-name font-semibold mb-1 cursor-pointer hover:text-primary"
                @click="
                  $router.push({
                    name: 'ecommerce-item-detail-view',
                    params: { item_id: item.objectID }
                  })
                "
              >
                {{ item.name }}
              </h6>
              <p class="text-sm mb-2">
                By
                <span class="font-semibold cursor-pointer">{{
                  item.brand
                }}</span>
              </p>
              <p class="text-success text-sm">In Stock</p>

              <p class="mt-4 font-bold text-sm">Pickup from:</p>
              <p class="text-sm mb-2">
                Farm
                <span class="font-semibold cursor-pointer">{{
                  item.sellerName
                }}</span>
              </p>
              <vs-divider></vs-divider>
            </div>
            <vs-button
              class="mt-6 ml-auto flex"
              @click="$refs.checkoutWizard.nextTab()"
              >Continue</vs-button
            >
          </vx-card>
        </div>

        <div class="vx-row" v-if="checkBox1 == 'Delivery'">
          <!-- LEFT COL: NEW ADDRESS -->
          <div class="vx-col lg:w-2/3 w-full">
            <vx-card
              title="Add New Address"
              subtitle='Be sure to check "Deliver to this address" when you have finished'
              class="mb-base"
            >
              <form data-vv-scope="add-new-address">
                <div class="vx-row">
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      data-vv-as="field"
                      name="fullName"
                      label="Full Name:"
                      v-model="fullName"
                      class="w-full mt-5"
                    />
                    <!-- <span v-show="errors.has('add-new-address.fullName')" class="text-danger">{{ errors.first('add-new-address.fullName') }}</span> -->
                  </div>

                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      name="mobileNum"
                      label="Mobile Number:"
                      v-model="mobileNum"
                      class="w-full mt-5"
                    />
                    <!-- <span v-show="errors.has('add-new-address.mobileNum')" class="text-danger">{{ errors.first('add-new-address.mobileNum') }}</span> -->
                  </div>
                </div>

                <div class="vx-row">
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      name="houseNum"
                      label="Flat, House No:"
                      v-model="houseNum"
                      class="w-full mt-5"
                    />
                    <!-- <span v-show="errors.has('add-new-address.houseNum')" class="text-danger">{{ errors.first('add-new-address.houseNum') }}</span> -->
                  </div>

                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      name="landmark"
                      label="Landmark e.g. near apollo hospital:"
                      v-model="landmark"
                      class="w-full mt-5"
                    />
                  </div>
                </div>

                <div class="vx-row">
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      name="city"
                      label="Town/City:"
                      v-model="city"
                      class="w-full mt-5"
                    />
                    <!-- <span v-show="errors.has('add-new-address.city')" class="text-danger">{{ errors.first('add-new-address.city') }}</span> -->
                  </div>

                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      name="pincode"
                      label="Area Code:"
                      v-model="pincode"
                      class="w-full mt-5"
                    />
                    <!-- <span v-show="errors.has('add-new-address.pincode')" class="text-danger">{{ errors.first('add-new-address.pincode') }}</span> -->
                  </div>
                </div>

                <div class="vx-row">
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      name="state"
                      label="Province:"
                      v-model="state"
                      class="w-full mt-5"
                    />
                    <!-- <span v-show="errors.has('add-new-address.state')" class="text-danger">{{ errors.first('add-new-address.state') }}</span> -->
                  </div>

                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-select
                      label="Address Type:"
                      v-model="addressType"
                      class="w-full mt-5"
                    >
                      <vs-select-item
                        :key="index"
                        :value="item.value"
                        :text="item.text"
                        v-for="(item, index) in addressTypeOptions"
                      />
                    </vs-select>
                  </div>
                </div>
                <vs-button
                  class="mt-6 ml-auto flex"
                  @click.prevent="submitNewAddressForm"
                  >SAVE AND DELIVER HERE</vs-button
                >
              </form>
            </vx-card>
          </div>

          <!-- RIGHT COL: CONTINUE WITH SAVED ADDRESS -->

          <div class="vx-col lg:w-1/3 w-full">
            <vx-card
              :title="comp.appname"
              v-for="comp in userCompanies"
              :key="comp.id"
            >
              <div v-html="comp.address_html">
                {{ comp.address_html }}
              </div>

              <vs-divider />

              <vs-button class="w-full" @click="submitComp('Company', comp)"
                >DELIVER TO THIS ADDRESS</vs-button
              >
            </vx-card>

            <div v-if="branchesAvail">
              <vx-card
                :title="comp.branch"
                v-for="comp in branchesAvail"
                :key="comp.id"
              >
                <div v-html="comp.adr_address">
                  {{ comp.adr_address }}
                </div>

                <vs-divider />

                <vs-button
                  class="w-full"
                  @click="submitAddress('Company', comp)"
                  >DELIVER TO THIS ADDRESS</vs-button
                >
              </vx-card>
            </div>

            <vx-card :title="app_active_user.display_name">
              <!-- <div v-html="comp.address_html">
                {{ comp.address_html }}
              </div> -->

              <vs-divider />

              <vs-button
                class="w-full"
                @click="submitAddress('Personal', 'toets')"
                >DELIVER TO THIS ADDRESS</vs-button
              >
            </vx-card>
          </div>
        </div>
      </tab-content>

      <!-- tab 3 content -->
      <tab-content title="Payment" icon="feather icon-credit-card" class="mb-5">
        <div class="vx-row">
          <!-- <div class="vx-col lg:w-2/3 w-full">
                        <vx-card title="Payment Options" subtitle="Be sure to click on correct payment option" class="mb-base">

                            <div class="mt-3">
                                <ul>
                                  <li>
                                    <div class="flex flex-wrap justify-between items-center">
                                        <vs-radio v-model="paymentMethod" vs-value="debit-card">
                                            <div class="flex items-center">
                                                <img src="@/assets/images/pages/eCommerce/bank.png" alt="bank-logo" height="40" width="50" class="inline-flex">
                                                <span>US Unlocked Debit Card 12XX XXXX XXXX 0000</span>
                                            </div>
                                        </vs-radio>
                                        <span>John Doe</span>
                                        <span>11/2020</span>
                                    </div>

                                    <form data-vv-scope="cvv-form">
                                        <div class="flex items-center flex-wrap">
                                            <span class="mt-4">Enter CVV: </span>
                                            <vs-input
                                               
                                                name="cvv"
                                                v-model="cvv"
                                                class="mr-3 ml-2 mt-4" />
                                            <vs-button class="mt-4" @click.prevent="makePayment" :disabled="false">CONTINUE</vs-button>
                                        </div>
                                    </form>
                                  </li>

                                  <vs-divider class="my-6" />

                                 
                                  <li>
                                    <vs-radio v-model="paymentMethod" vs-value="credit-debit-atmCard">Credit / Debit / ATM Card</vs-radio>
                                  </li>

                                 
                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="netBanking">Net Banking</vs-radio>
                                  </li>

                                 
                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="emi">EMI (Easy Installment)</vs-radio>
                                  </li> 

                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="cashOnDelivery">Cash On Delivery</vs-radio>
                                  </li>
                                </ul>

                                <vs-divider />

                                <div class="inline-flex items-center cursor-pointer">
                                    <feather-icon icon="PlusSquareIcon" class="mr-2" svgClasses="h-6 w-6" />
                                    <span>Add Gift Card</span>
                                </div>
                            </div>
                        </vx-card>
                    </div> -->

          <!-- RIGHT COL: PRICE -->
          <div class="vx-col lg:w-1/3 w-full">
            <vx-card title="Pay now online">
              <div class="flex justify-between mb-2">
                <span>Price 3 Items</span>
                <span class="font-semibold"
                  >R{{ totalCost | thousandSeprator }}</span
                >
              </div>
              <div class="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span class="text-success">Not included</span>
              </div>

              <vs-divider />

              <div class="flex justify-between">
                <span>Amount Payable</span>
                <span class="font-semibold"
                  >R{{ totalCost | thousandSeprator }}</span
                >
              </div>
              <vs-button @click="buyingNow('Payment')" class="mt-4"
                >Buy Now</vs-button
              >
            </vx-card>
          </div>
          <div class="vx-col lg:w-1/3 w-full">
            <vx-card title="Get Quote">
              <div class="flex justify-between mb-2">
                <span>Price 3 Items</span>
                <span class="font-semibold"
                  >R{{ totalCost | thousandSeprator }}</span
                >
              </div>
              <div class="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span class="text-success">Not included</span>
              </div>

              <vs-divider />

              <div class="flex justify-between">
                <span>Amount Payable</span>
                <span class="font-semibold"
                  >R{{ totalCost | thousandSeprator }}</span
                >
              </div>
              <vs-button @click="buyingNow('Quote')" class="mt-4"
                >Get Quote</vs-button
              >
            </vx-card>
          </div>
          <div class="vx-col lg:w-1/3 w-full">
            <vx-card title="Arrange Viewing">
              <div class="flex justify-between mb-2">
                <span>Price 3 Items</span>
                <span class="font-semibold"
                  >R{{ totalCost | thousandSeprator }}</span
                >
              </div>
              <div class="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span class="text-success">Not included</span>
              </div>

              <vs-divider />

              <div class="flex justify-between">
                <span>Amount Payable</span>
                <span class="font-semibold"
                  >R{{ totalCost | thousandSeprator }}</span
                >
              </div>
              <vs-button @click="buyingNow('Viewing')" class="mt-4"
                >Arrange Viewing</vs-button
              >
            </vx-card>
          </div>
        </div>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
const ItemListView = () => import('@/components/eCommerce/ItemListView.vue')

const { PayFastAPI } = require('@gettruck/payfast-js')
// const payfast = new PayFastAPI({ merchant_id: "10017515", merchant_key: "omnkr3wlkmlfn", production: true | false });
const payfast = new PayFastAPI({
  merchant_id: '10017515',
  merchant_key: 'omnkr3wlkmlfn',
  production: false
})

import moment from 'moment'

export default {
  data() {
    return {
      checkBox1: 'Delivery',
      paymentID: null,
      quoteRequest: false,
      // TAB 2
      savedAddress: false,
      deliveryToo: {},
      branchesAvail: [],
      transActionType: '',
      transactionDetails: {
        created_date: moment().format('DD-MM-YYYY'),
        created_month: moment().format('MM-YYYY'),
        timestamp: Date.now()
      },
      fullName: '',
      mobileNum: '',
      pincode: '',
      houseNum: '',
      area: '',
      landmark: '',
      city: '',
      state: '',
      addressType: 'Home',
      addressTypeOptions: [
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' }
      ],

      // TAB 3
      paymentMethod: 'debit-card',
      cvv: ''
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
    shopType() {
      return this.$store.state.eCommerce.shopType
    },
    app_active_user() {
      return this.$store.state.user.app_active_user
    },
    userCompanies() {
      return this.$store.state.user.app_active_user.apps
    },
    cartItems() {
      return this.$store.state.eCommerce.cartItems.slice().reverse()
    },
    isInWishList() {
      return itemId => this.$store.getters['eCommerce/isInWishList'](itemId)
    },
    cost() {
      let cartTotal = 0
      for (let i = 0; i < this.cartItems.length; i++) {
        let cost =
          parseInt(this.cartItems[i].price) *
          parseInt(this.cartItems[i].quantity)
        cartTotal += cost
      }
      return cartTotal
    },
    totalCost() {
      return this.cost + this.totalVat - this.totalDiscount
    },
    totalVat() {
      return 0
    },
    totalDiscount() {
      return 0
    }
  },
  methods: {
    buyingOwner() {
      let vm = this

      for (let i = 0; i < this.cartItems.length; i++) {
        let individualTransaction = {
          m_payment_id: this.paymentID,
          client_uid: this.app_active_user.uid,
          client_displayname: this.app_active_user.display_name,
          client_email: this.app_active_user.email,
          cart_items: this.cartItems[i],
          price: this.cartItems[i].price,
          ctc: this.cartItems[i].ctc,
          item_ref: this.cartItems[i].objectID,
          total_price:
            Number(this.cartItems[i].price) *
            Number(this.cartItems[i].quantity),
          total_profit:
            (Number(this.cartItems[i].price) - Number(this.cartItems[i].ctc)) *
            Number(this.cartItems[i].quantity),
          total_quantity: this.cartItems[i].quantity,
          total_CTC:
            Number(this.cartItems[i].ctc) * Number(this.cartItems[i].quantity),
          payment_received: false,
          verify_payfast: false,
          stage: this.transActionType,
          invoiced_date: moment().format('DD-MM-YYYY'),
          invoiced_month: moment().format('MM-YYYY'),
          created_date: moment().format('DD-MM-YYYY'),
          created_month: moment().format('MM-YYYY'),
          timestamp: Date.now()
        }

        if (this.transActionType == 'Invoice') {
          individualTransaction.invoiced_date = moment().format('DD-MM-YYYY')
          individualTransaction.invoiced_month = moment().format('MM-YYYY')
        } else if (this.transActionType == 'Quote') {
          individualTransaction.quoted_date = moment().format('DD-MM-YYYY')
          individualTransaction.quoted_month = moment().format('MM-YYYY')
        } else if (this.transActionType == 'Viewing') {
          individualTransaction.viewing_request_date = moment().format(
            'DD-MM-YYYY'
          )
          individualTransaction.viewing_request_month = moment().format(
            'MM-YYYY'
          )
        }

        if (this.savedAddress) {
          individualTransaction.full_name = this.fullName
          individualTransaction.mobile_num = this.mobileNum
          individualTransaction.pincode = this.pincode
          individualTransaction.house_num = this.houseNum
          individualTransaction.area = this.area
          individualTransaction.landmark = this.landmark
          individualTransaction.city = this.city
          individualTransaction.state = this.state
          individualTransaction.address_type = this.addressType
        } else {
          individualTransaction.deliveryToo = this.deliveryToo
        }

        vm.$fireStore
          .collection('apps')
          .doc('crm')
          .collection(vm.cartItems[i].sellerID)
          .doc('sales')
          .collection('sales')
          .add(individualTransaction)
      }
      this.buyingNow()
    },
    buyingNow(type) {
      let buyer = this.app_active_user
      // let buyer = this.userDetails
      this.paymentID = Math.floor(Math.random() * 1000000000)
      let vm = this
      this.transActionType = type

      if (this.transActionType == 'Invoice') {
        this.transactionDetails.invoiced_date = moment().format('DD-MM-YYYY')
        this.transactionDetails.invoiced_month = moment().format('MM-YYYY')
      } else if (this.transActionType == 'Quote') {
        this.transactionDetails.quoted_date = moment().format('DD-MM-YYYY')
        this.transactionDetails.quoted_month = moment().format('MM-YYYY')
      } else if (this.transActionType == 'Viewing') {
        this.transactionDetails.viewing_request_date = moment().format(
          'DD-MM-YYYY'
        )
        this.transactionDetails.viewing_request_month = moment().format(
          'MM-YYYY'
        )
      }

      if (this.savedAddress) {
        this.transactionDetails.full_name = this.fullName
        this.transactionDetails.mobile_num = this.mobileNum
        this.transactionDetails.pincode = this.pincode
        this.transactionDetails.house_num = this.houseNum
        this.transactionDetails.area = this.area
        this.transactionDetails.landmark = this.landmark
        this.transactionDetails.city = this.city
        this.transactionDetails.state = this.state
        this.transactionDetails.address_type = this.addressType
      } else {
        this.transactionDetails.deliveryToo = this.deliveryToo
      }
      this.transactionDetails.shopType = this.shopType
      ;(this.transactionDetails.m_payment_id = this.paymentID),
        (this.transactionDetails.client_uid = this.app_active_user.uid),
        (this.transactionDetails.client_displayname = this.app_active_user.display_name),
        (this.transactionDetails.client_email = this.app_active_user.email),
        (this.transactionDetails.cart_items = this.cartItems),
        (this.transactionDetails.total_cost = this.totalCost),
        (this.transactionDetails.collection_type = this.checkBox1),
        (this.transactionDetails.paid_owner = false),
        (this.transactionDetails.verify_payfast = false),
        (this.transactionDetails.stage = this.transActionType)
      this.transactionDetails.comp_email = this.$store.state.business.app_main_business.contact_email
      this.transactionDetails.comp_name = this.$store.state.business.app_main_business.appname
      this.transactionDetails.comp_id = this.$store.state.business.app_main_business.b_uid

      // this.$store.commit(
      //   '/eCommerce/UPDATE_TRANSACTION',
      //   this.transactionDetails
      // )

      // if (this.shopType == 'resells') {
      console.log('tra', this.transactionDetails)
      this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.$store.state.business.app_main_business.b_uid)
        .doc('sales')
        .collection('transactions')
        .add(this.transactionDetails)
      // }

      // if (this.transActionType == 'Payment') {?
      payfast.addPaymentDetails({
        amount: this.totalCost,
        item_name: this.$store.state.business.app_main_business.appname,
        // cell_number: buyer.mobile,
        currency: 'ZAR',
        email_address: buyer.email,
        item_description: this.cartItems,
        name_first: buyer.displayName,
        name_last: buyer.surname,
        payment_method: 'PayFast'
      })

      payfast.addReferenceDetails({
        m_payment_id: buyer.id,
        // cell_number: buyer.mobile,
        email_address: buyer.email,
        item_description: this.cartItems,
        name_first: buyer.displayName,
        name_last: buyer.surname
      })
      let site
      if (process.client) {
        site = window.location.hostname
      }

      payfast.returnURL(`https://${site}/transaction/success`)
      payfast.cancelURL(`https://${site}/transaction/cancelled`)
      payfast.notifyURL(`https://${site}/success`)
      // payfast.generateURL()

      window.open(payfast.generateURL())
      // } else if (this.transActionType == 'Quote') {
      // } else {
      // }
    },
    // TAB 1
    removeItemFromCart(item) {
      this.$store.dispatch('eCommerce/toggleItemInCart', item)
    },
    wishListButtonClicked(item) {
      // Toggle in Wish List
      if (this.isInWishList(item.objectID))
        this.$router.push('/apps/eCommerce/wish-list').catch(() => {})
      else {
        this.toggleItemInWishList(item)
        this.removeItemFromCart(item)
      }
    },
    toggleItemInWishList(item) {
      this.$store.dispatch('eCommerce/toggleItemInWishList', item)
    },
    updateItemQuantity(event, index) {
      const itemIndex = Math.abs(index + 1 - this.cartItems.length)
      this.$store.dispatch('eCommerce/updateItemQuantity', {
        quantity: event,
        index: itemIndex
      })
    },
    submitComp(who, comp) {
      let vm = this
      this.savedAddress = false
      this.deliveryToo.name = comp.appname
      this.deliveryToo.id = comp.id
      this.deliveryToo.type = 'company'
      console.log('comp', comp.id)
      this.$fireStore
        .collection('apps')
        .doc('info')
        .collection('groups')
        .doc(comp.id)
        .collection('branches')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            vm.branchesAvail.push(doc.data())
            console.log(doc.id, ' => ', doc.data())
          })
        })
        .catch(function(error) {
          console.log('rer', error)
          alert('No Branches set')
        })
    },
    submitAddress(who, comp) {
      this.savedAddress = false
      if (who == 'Company') {
        this.deliveryToo.branch = comp.branch
        this.deliveryToo.address = comp.adr_address
      } else {
        this.deliveryToo.name = this.app_active_user.display_name
        this.deliveryToo.id = this.app_active_user.uid
        this.deliveryToo.type = 'person'
      }
      this.$refs.checkoutWizard.nextTab()
    },
    // TAB 2
    submitNewAddressForm() {
      this.savedAddress = true
      this.$refs.checkoutWizard.nextTab()

      // return new Promise(() => {
      //   this.$validator.validateAll('add-new-address').then(result => {
      //     if (result) {
      //       // if form have no errors
      //       this.$refs.checkoutWizard.nextTab()
      //     } else {
      //       this.$vs.notify({
      //         title: 'Error',
      //         text: 'Please enter valid details',
      //         color: 'warning',
      //         iconPack: 'feather',
      //         icon: 'icon-alert-circle'
      //       })
      //     }
      //   })
      // })
    },

    // TAB 3
    makePayment() {
      return new Promise(() => {
        this.$validator.validateAll('cvv-form').then(result => {
          if (result) {
            // if form have no errors
            this.$vs.notify({
              title: 'Success',
              text: 'Payment received successfully',
              color: 'success',
              iconPack: 'feather',
              icon: 'icon-check'
            })
          } else {
            this.$vs.notify({
              title: 'Error',
              text: 'Please enter valid details',
              color: 'warning',
              iconPack: 'feather',
              icon: 'icon-alert-circle'
            })
          }
        })
      })
    }
  },
  components: {
    ItemListView,
    FormWizard,
    TabContent
  }
}
</script>

<style lang="scss" scoped>
#ecommerce-checkout-demo {
  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
  }

  .item-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
  }

  .vue-form-wizard {
    padding-bottom: 0;

    ::v-deep .wizard-header {
      padding: 0;
    }

    ::v-deep .wizard-tab-content {
      padding-right: 0;
      padding-left: 0;
      padding-bottom: 0;

      .wizard-tab-container {
        margin-bottom: 0 !important;
      }
    }
  }
}
</style>
