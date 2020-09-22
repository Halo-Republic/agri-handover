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

      <vx-card id="invoice-container mx-12">
        <!-- INVOICE METADATA -->
        <div class="vx-row leading-loose p-base">
          <div class="vx-col w-1/2 mt-base">
            <img
              v-if="detailsBiz"
              :src="detailsBiz.logo"
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
          <div class="vx-col w-1/2 mt-12">
            <h5>Recipient:</h5>
            <br />

            <h5>Agri Ensights (Pty) Ltd</h5>
            <div class="invoice__company-info my-4">
              <h5>Reg: 2020/143366/07</h5>
              <h5>Unit 13 Carlswald Meadows</h5>
              <h5>55 Acacia road</h5>
            </div>
            <div class="invoice__company-contact">
              <p class="flex items-center ">
                <feather-icon
                  icon="MailIcon"
                  svgClasses="h-4 w-4"
                ></feather-icon>
                <span class="ml-2">aobakwe@agriensights.co.za</span>
              </p>
              <p class="flex items-center ">
                <feather-icon
                  icon="PhoneIcon"
                  svgClasses="h-4 w-4"
                ></feather-icon>
                <span class="ml-2">012 123 1234</span>
              </p>
            </div>
          </div>

          <div class="vx-col w-1/2 mt-base text-right mt-12">
            <div v-if="detailsBiz">
              <div class="invoice__recipient-info my-4">
                <h5>{{ detailsBiz.b_name }}</h5>
                <h5>Reg: {{ detailsBiz.reg_number }}</h5>

                <h5 v-html="detailsBiz.addr_html"></h5>

                <!-- <p v-html="details.companyDetails.address_html"></p> -->
              </div>
            </div>

            <div class="invoice__company-contact">
              <p class="flex items-center justify-end">
                <feather-icon
                  icon="MailIcon"
                  svgClasses="h-4 w-4"
                ></feather-icon>
                <span class="ml-2">{{ detailsBiz.c_email }}</span>
              </p>
              <p class="flex items-center justify-end">
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
        </div>

        <!-- INVOICE CONTENT -->
        <div class="p-base" v-if="details.c_items">
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
            <vs-row style=" padding: 5px; ">
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
                <p>{{ details.c_items.product_name }}</p>
              </vs-col>
              <vs-col
                v-tooltip="'col - 3'"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <p>{{ details.c_items.quantity }}</p>
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
                  {{
                    (details.c_items.price -
                      (details.c_items.price * details.c_items.comm) / 100)
                      | k_formatter
                  }}
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
                  {{
                    (
                      details.c_items.quantity *
                      (details.c_items.price -
                        (details.c_items.price * details.c_items.comm) / 100)
                    ).toFixed(2) | k_formatter
                  }}
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
                  {{
                    (
                      details.c_items.quantity *
                      (details.c_items.price -
                        (details.c_items.price * details.c_items.comm) / 100)
                    ).toFixed(2) | k_formatter
                  }}
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
                <p v-if="details.c_items.vat">
                  R
                  {{
                    (
                      details.c_items.quantity *
                        (details.c_items.price -
                          (details.c_items.price * details.c_items.comm) /
                            100) -
                      (details.c_items.quantity *
                        (details.c_items.price -
                          (details.c_items.price * details.c_items.comm) /
                            100)) /
                        1.15
                    ).toFixed(2) | k_formatter
                  }}
                </p>
                <p v-else>
                  R 0
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
                  {{
                    (
                      details.c_items.quantity *
                      (details.c_items.price -
                        (details.c_items.price * details.c_items.comm) / 100)
                    ).toFixed(2) | k_formatter
                  }}
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
          <div class="invoice__footer  p-base">
            <p class="mb-4">
              Transfer the amounts to the business amount below. Please include
              invoice number.
            </p>
            <p>
              <span class="mr-4"
                >Bank:
                <span class="font-semibold">{{ detailsBiz.bank }}</span></span
              >
              <br />
              <span class="mr-4"
                >Account Type:
                <span class="font-semibold">
                  {{ detailsBiz.acc_type }}</span
                ></span
              >

              <br />
              <span class="mr-4"
                >Account Number:
                <span class="font-semibold"
                  >{{ detailsBiz.acc_num }}
                </span></span
              >
              <br />
              <span
                >Branch Number:
                <span class="font-semibold">
                  {{ detailsBiz.br_num }}
                </span></span
              >
            </p>
          </div>
          <vs-divider></vs-divider>
          <p style="text-align: center">THANK YOU FOR YOUR BUSINESS</p>
        </div>
      </vx-card>
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
      details: {
        companyDetails: {
          appname: '',
          address_html: ''
        }
      },
      detailsBiz: {}
    }
  },
  computed: {
    companyDetailss() {
      return this.$store.getters['app/companyDetails']
    }
  },
  filters: {
    thousandSeprator(amount) {
      let myamount = 0

      if (amount) {
        myamount = amount
      }
      return myamount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
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
        .doc('sales')
        .collection('sales')
        .doc(docID)

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log('Document data:', doc.data())
            vm.details = doc.data()

            console.log('detials', vm.details)
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
      window.print()
    }
  },
  components: {},
  mounted() {
    this.$emit('setAppClasses', 'invoice-page')
  }
}
</script>

<style lang="scss">
p {
  margin: 0;
}
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

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

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
