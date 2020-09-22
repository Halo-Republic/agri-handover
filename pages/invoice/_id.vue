<template>
  <client-only>
    <div id="invoice-page" class="invoice-box">
      <vs-button
        class="mb-base mr-3"
        icon-pack="feather"
        icon="icon icon-file"
        v-if="showPrint"
        @click="printInvoice"
        >Print</vs-button
      >

      <!-- <vs-row
        vs-align="flex-start"
        vs-type="flex"
        vs-justify="center"
        vs-w="12"
      >
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6"> -->
      <vx-card id="invoice-container mx-12">
        <!-- INVOICE METADATA -->
        <div class="vx-row leading-loose p-base">
          <div class="vx-col w-1/2 mt-base">
            <img
              src="../../static/logo2.png"
              style="width:75px; max-width:300px;"
            />
          </div>
          <div class="vx-col w-1/2 text-right">
            <h1>Tax Invoice</h1>
            <div class="invoice__invoice-detail mt-6">
              <h6>INVOICE NO.</h6>
              <p>{{ details.m_payment_id }}</p>
              <h6 class="mt-3">VAT NO.</h6>
              <p>{{ detailsBiz.vat_number }}</p>
              <h6 class="mt-3">INVOICE DATE</h6>
              <p>{{ details.invoiced_date }}</p>
            </div>
          </div>
          <div class="vx-col w-1/2 mt-base  mt-12">
            <h5>Recipient</h5>
            <div v-if="detailsBiz">
              <div class="invoice__recipient-info my-4">
                <h5>{{ detailsBiz.b_name }}</h5>
                <!-- <h5>Reg: {{ detailsBiz.reg_number }}</h5> -->

                <h5 v-html="detailsBiz.addr_html"></h5>

                <!-- <p v-html="details.companyDetails.address_html"></p> -->
              </div>
            </div>

            <div class="invoice__company-contact">
              <p class="flex items-center">
                <feather-icon
                  icon="MailIcon"
                  svgClasses="h-4 w-4"
                ></feather-icon>
                <span class="ml-2">{{ detailsBiz.c_email }}</span>
              </p>
              <p class="flex items-center">
                <feather-icon
                  icon="PhoneIcon"
                  svgClasses="h-4 w-4"
                ></feather-icon>
                <span class="ml-2">{{
                  detailsBiz.c_number | k_formatter
                }}</span>
              </p>
            </div>
          </div>

          <div class="vx-col w-1/2 mt-base text-right mt-12">
            <h5>Agri Ensights (Pty) Ltd</h5>
            <div class="invoice__company-info my-4">
              <h5>Reg: 2020/143366/07</h5>
              <h5>Unit 13 Carlswald Meadows</h5>
              <h5>55 Acacia road</h5>
            </div>
            <div class="invoice__company-contact">
              <p class="flex items-center justify-end">
                <feather-icon
                  icon="MailIcon"
                  svgClasses="h-4 w-4"
                ></feather-icon>
                <span class="ml-2">sales@agriensights.co.za</span>
              </p>
              <p class="flex items-center justify-end">
                <feather-icon
                  icon="PhoneIcon"
                  svgClasses="h-4 w-4"
                ></feather-icon>
                <span class="ml-2">083 979 2558</span>
              </p>
            </div>
          </div>
        </div>

        <!-- INVOICE CONTENT -->
        <div class="p-base" v-if="details.c_items">
          <!-- INVOICE TASKS TABLE -->
          <!-- <vs-table hoverFlat :data="details.c_items">
                <template slot="thead">
                  <vs-th class="pointer-events-none">ITEM DETAILS</vs-th>
                  <vs-th class="pointer-events-none text-right"
                    >UNIT PRICE</vs-th
                  >
                  <vs-th class="pointer-events-none text-right">QUANTITY</vs-th>
                  <vs-th><h6 class="text-right">AMOUNT</h6></vs-th>
                </template>

                <template slot-scope="{ data }">
                  <vs-tr v-for="(tr, index) in data" :key="index">
                    <vs-td :data="data[index].product_name">{{
                      data[index].product_name
                    }}</vs-td>
                    <vs-td :data="data[index].price"
                      >R {{ data[index].price | k_formatter }}</vs-td
                    >
                    <vs-td :data="data[index].quantity">{{
                      data[index].quantity
                    }}</vs-td>
                    <vs-td :data="data[index].price" class="text-right"
                      >R
                      {{
                        (data[index].quantity * data[index].price) | k_formatter
                      }}</vs-td
                    >
                  </vs-tr>
                </template>
              </vs-table> -->

          <div style="border: 1px solid rgb(76, 201, 76, 0.5);">
            <vs-row style=" padding: 5px; ">
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <p>Item</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <p class="pointer-events-none ">Description</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <p class="pointer-events-none">Quantity</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <p class="pointer-events-none">Unit Price</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="3"
                style=" width 100%"
              >
                <p class="pointer-events-none">
                  Amount
                </p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="1"
              >
              </vs-col>
            </vs-row>
            <vs-row
              style=" padding: 5px; "
              class="pb-5"
              v-for="item in details.c_items"
              :key="item"
            >
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <p>1</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <p>{{ item.product_name }}</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <p>{{ item.quantity }}</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <p>
                  R
                  {{ item.price | k_formatter }}
                </p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="3"
              >
                <p>
                  R
                  {{ (item.price * item.quantity).toFixed(2) | k_formatter }}
                </p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="1"
              >
              </vs-col>
            </vs-row>
          </div>

          <!-- INVOICE SUMMARY TABLE -->
          <!-- <vs-table
                hoverFlat
                class="w-1/2 ml-auto mt-4 text-right"
                :data="details.c_items"
              >
                <vs-tr>
                  <vs-th class="pointer-events-none ">SUBTOTAL</vs-th>
                  <vs-td>R {{ details.t_cost | k_formatter }} </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-th class="pointer-events-none">DISCOUNT 0%</vs-th>
                  <vs-td>0</vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-th class="pointer-events-none">VAT</vs-th>
                  <vs-td>0</vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-th class="pointer-events-none">TOTAL</vs-th>
                  <vs-td>R {{ details.t_cost | k_formatter }} </vs-td>
                </vs-tr>
              </vs-table> -->

          <div class="mt-10">
            <vs-row style=" padding: 5px; ">
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="6"
              >
              </vs-col>

              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="2"
              >
                <p>Subtotal:</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="3"
              >
                <p>
                  R
                  {{ details.t_cost.toFixed(2) | k_formatter }}
                </p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="1"
              >
              </vs-col>
            </vs-row>
            <vs-row style=" padding: 5px; ">
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="6"
              >
              </vs-col>

              <!-- <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="2"
              >
                <p>Rebate:</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="3"
              > 
                <p>
                  R
                  {{
                    (details.c_items.quantity * details.c_items.comm).toFixed(
                      2
                    ) | k_formatter
                  }}
                </p>
              </vs-col>-->
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="1"
              >
              </vs-col>
            </vs-row>

            <vs-row style=" padding: 5px; ">
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="6"
              >
              </vs-col>

              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="2"
              >
                <p>VAT 15%:</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="3"
              >
                <p>
                  R
                  {{ vat.toFixed(2) | k_formatter }}
                </p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="1"
              >
              </vs-col>
            </vs-row>
            <vs-row style=" padding: 5px; ">
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="6"
              >
              </vs-col>

              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="2"
              >
                <p>TOTAL:</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="3"
                style="border-top: 1px solid black;  border-bottom: 2px solid black;"
              >
                <p>
                  R
                  {{ details.t_cost.toFixed(2) | k_formatter }}
                </p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="flex-end"
                vs-align="flex-end"
                vs-w="1"
              >
              </vs-col>
            </vs-row>
          </div>
        </div>

        <!-- INVOICE FOOTER -->
        <div class="invoice__footer  p-base">
          <!-- <p class="mb-4">Transfer the amounts to the business amount below. Please include invoice number on your check.</p>
                <p>
                    <span class="mr-8">BANK: <span class="font-semibold">FTSBUS33</span></span>
                    <span>IBAN: <span class="font-semibold"> G882-1111-2222-3333 </span></span>
                </p> -->
          <div class="invoice__footer  p-base">
            <p class="mb-4">
              Transfer the amounts to the business amount below. Please include
              invoice number.
            </p>
            <p>
              <span class="mr-4"
                >Bank: <span class="font-semibold">FNB</span></span
              >
              <br />
              <span class="mr-4"
                >Account Type:
                <span class="font-semibold">BUSINESS ACCOUNT</span></span
              >

              <br />
              <span class="mr-4"
                >Account Number:
                <span class="font-semibold">628 47683 225</span></span
              >
              <br />

              <span
                >Branch Number: <span class="font-semibold">210 853</span></span
              >
            </p>
          </div>
          <vs-divider></vs-divider>
          <p style="text-align: center">THANK YOU FOR YOUR BUSINESS</p>
        </div>
      </vx-card>
      <!-- </vs-col>
      </vs-row> -->
    </div>
  </client-only>
</template>

<script>
export default {
  layout: 'full_page',
  data() {
    return {
      mailTo: '',
      showPrint: true,
      detailsBiz: {},
      details: {
        companyDetails: {
          appname: '',
          address_html: ''
        }
      }
    }
  },
  computed: {
    companyDetailss() {
      return this.$store.getters['app/companyDetails']
    },

    filters: {
      thousandSeprator(amount) {
        return num > 999 ? `${(num / 1000).toFixed(1)}k` : num
      }
    },

    vat() {
      let vat = 0

      if (this.details) {
        for (let i = 0; i < this.details.c_items.length; i++) {
          console.log('i', this.details.c_items[i].vat)
          if (this.details.c_items[i].vat) {
            let num =
              this.details.c_items[i].price -
              this.details.c_items[i].price / 1.15

            vat = vat + num
          }
        }
      }

      return vat
    }
  },
  created() {
    let vm = this
    if (process.client) {
      let id = this.$route.params.id
      console.log('createdd', this.$route.params)
      let routeParams = this.$route.params.id
      let routeSplit = routeParams.split('&')
      console.log('rou', routeSplit)
      let bizID = routeSplit[0]
      let docID = routeSplit[1]

      var docRef = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(bizID)
        .doc('purchases')
        .collection('purchases')
        .doc(docID)

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            vm.details = doc.data()
            console.log('details', vm.details)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      var docRef = this.$fireStore
        .collection('apps')
        .doc('info')
        .collection('general')
        .doc(bizID)

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log('Document data:', doc.data())
            vm.detailsBiz = doc.data()

            console.log('detials', vm.details)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    }
  },
  filters: {
    k_formatter(amount) {
      let myamount = 0

      if (amount) {
        myamount = amount
      }
      return myamount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
  },
  methods: {
    printInvoice() {
      if (process.client) {
        window.print()
      }
    }
  }
  // components: {},
  // mounted() {
  //   this.$emit('setAppClasses', 'invoice-page')
  // }
}
</script>

<style lang="scss">
@media print {
  .invoice-page {
    * {
      visibility: hidden;
    }

    #content-area {
      margin: 0 !important;
    }

    #invoice-container,
    #invoice-container * {
      visibility: visible;
    }
    #invoice-container {
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: none;
    }
  }
}

.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  color: #555;
}

// .invoice-box table {
//   width: 100%;
//   line-height: inherit;
//   text-align: left;
// }

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial,
    sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}
</style>
