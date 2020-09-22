<!-- =========================================================================================
  File Name: TheCustomizer.vue
  Description: Template Customizer
  Component Name: TheCustomizer
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="theme-customizer">
    <!-- Open Customizer Button -->
    <vs-button color="primary" type="filled" @click="popupActivo4 = true"
      >Upload Products</vs-button
    >

    <!-- Customizer Content -->
    <vs-popup title="Asset allocation" :active.sync="popupActivo4">
      <PerfectScrollbar>
        <div class="h-full mx-4">
          <div
            class="customizer-header mt-6 flex items-center justify-between px-6"
          >
            <div>
              <h4>Products</h4>
              <small>Register your products</small>
            </div>
            <feather-icon
              icon="XIcon"
              class="cursor-pointer"
              @click.stop="active = false"
            ></feather-icon>
          </div>

          <vs-divider class="mb-0" />
          <div>
            <!-- <p class="mt-5">Branch</p>
            <v-select
              class="w-full "
              v-model="branch"
              :options="activeBusinessInfo.branches"
            ></v-select> -->
            <div v-for="(addedItem, index) in addedItems" :key="index">
              <p class="mt-5">Item</p>

              <v-select
                label="name"
                class="w-full"
                v-model="addedItem.product"
                :options="company_assets"
              ></v-select>

              <vs-input
                label="Quantity"
                name="quantity"
                v-model="addedItem.quantity"
                type="number"
                class="w-full mt-5"
              />

              <div id="app" class="mt-5">
                <!-- <div class="mt-5">
                  <vs-button @click="saves(index)">Save</vs-button>
                  <vs-button @click="undo">Undo</vs-button>
                </div> -->
                <!-- {{ addedItems }} -->
              </div>
            </div>
          </div>
          <div class="mt-5">
            <vs-button @click="AddMoreProd">Add More</vs-button>
          </div>
          <p class="mt-5" v-if="total_cost > 0">
            Product Cost: {{ total_cost }}
          </p>
          <vs-input
            label="Product Name"
            name="assetname"
            v-model="product_name"
            class="w-full mt-5"
          />

          <vs-textarea
            class="w-full mt-5"
            label="Description"
            v-model="description"
          />

          <vs-input
            label="Selling Price"
            name="number"
            v-model="number"
            type="number"
            class="w-full mt-5"
          />

          <p class="mt-5">Category</p>

          <v-select
            label="category"
            class="w-full "
            v-model="category"
            :options="cats"
          ></v-select>
          <p class="mt-5">Sub Category</p>

          <v-select
            label="Sub Category"
            class="w-full "
            v-model="subcat"
            :options="category.subcategory"
          ></v-select>

          <!-- 
          <vs-input
            label="Discount"
            name="number"
            v-model="discount"
            type="number"
            class="w-full mt-5"
          />

          <vs-input
            label="Reseller Comm in %"
            name="number"
            v-model="comm"
            min="5"
            type="number"
            class="w-full mt-5"
          /> -->

          <vs-checkbox v-model="vat" class="w-full mt-5">VAT incl</vs-checkbox>
          <!-- <vs-checkbox v-model="featured" class="w-full mt-5"
            >Featured Product</vs-checkbox
          > -->

          <div>
            <imageUpload class="mb-2  sm:mb-0" label="Add Images" />

            <p class="mt-2 text-sm">
              Allowed JPG, GIF or PNG. Max size of 800kB
            </p>
          </div>
          <div
            class="flex flex-wrap items-center justify-center p-6"
            slot="footer"
          >
            <vs-button class="mr-6" @click="newProduct">Add Product</vs-button>
            <vs-button
              type="border"
              color="danger"
              @click="isSidebarActiveLocal = false"
              >Cancel</vs-button
            >
          </div>
        </div>
      </PerfectScrollbar>
    </vs-popup>
  </div>
</template>

<script>
import moment from 'moment'
import vSelect from 'vue-select'
import imageUpload from '@/components/form-generator/components/imageUpload.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: { vSelect, imageUpload, VuePerfectScrollbar },
  data() {
    return {
      popupActivo4: false,
      product_name: '',
      branch: 'HQ',
      number: 0,
      quantity: 0,
      discount: 0,
      comm: 5,
      description: '',
      reference: '',
      active: false,
      vat: true,
      featured: false,
      assets: [],
      cats: [],
      // categories: ['Livestock', 'Meat, Poultry, Fish', 'Fruit & Vegetables'],

      brands: [],
      category: '',
      subcat: '',
      brand: '',
      addedItems: [
        {
          product: '',
          quantity: 1
        }
      ]
    }
  },
  computed: {
    // subcats() {
    //   let cat = []

    //   switch (this.category) {
    //     case 'Livestock':
    //       cat = [
    //         'Cattle',
    //         'Buls',
    //         'Cows',
    //         'Heifers',
    //         'Weaners',
    //         'Goat',
    //         'Sheep',
    //         'Chickens',
    //         'Broilers',
    //         'Layers',
    //         'Hardbody'
    //       ]
    //       break

    //     case 'Meat, Poultry, Fish':
    //       cat = ['Beef', 'Poultry', 'Lamb', 'Pork', 'Fish & Shellfish']
    //       break

    //     case 'Fruit & Vegetables':
    //       cat = ['Fresh Fruit', 'Fresh Vegetables', 'Herbs', 'In Season']
    //       break

    //     default:
    //       break
    //   }

    //   return cat
    // },
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    },
    activeCompanyInfo() {
      return this.$store.state.crm.company
    },
    uploaded_images() {
      return this.$store.state.form.uploaded_images
    },
    reseller_id() {
      return this.$store.state.business.reseller_id
    },
    total_inv() {
      return this.$store.state.crm.total_inv
    },
    total_cost() {
      let cost = 0
      for (let i = 0; i < this.addedItems.length; i++) {
        console.log('i', i, this.addedItems[i])
        cost += this.addedItems[i].product.price * this.addedItems[i].quantity
      }
      return cost
    },
    company_assets() {
      let ass = []
      let arr_ass = Object.entries(this.total_inv)
      for (let i = 0; i < arr_ass.length; i++) {
        let sm_ass = {}
        sm_ass.name = arr_ass[i][0]
        sm_ass.val = arr_ass[i][1].val
        sm_ass.qty = arr_ass[i][1].qty
        sm_ass.price = arr_ass[i][1].price

        this.assets.push(sm_ass)
        ass.push(sm_ass)
      }

      return ass
    }
  },
  watch: {
    comm() {
      if (this.comm < 5) {
        this.successComm()
        this.comm = 5
        this.commMessage = 'Minimum Reseller Comm is set at 5%'
      } else {
        this.commMessage = ''
      }
    },
    asset_type() {
      if (this.asset_type == 'Fixed Asset') {
        ;(this.inventory = ''),
          (this.current_asset = ''),
          (this.cash_equivalent = '')
      } else if (this.asset_type == 'Current Asset') {
        this.fixed_asset = ''
      }
    },
    current_asset() {
      if (this.current_asset == 'Inventory') {
        this.cash_equivalent = ''
      } else if (this.current_asset == 'Cash Equivalent') {
        this.current_asset = ''
      }
    }
  },
  created() {
    if (this.activeBusinessInfo.branches) {
      this.activeBusinessInfo.branches.push('All')
    }

    let docs = this.$fireStore
      .collection('agri-ensights')
      .doc('crm')
      .collection('categories')

    docs.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc
        this.cats.push({
          category: doc.data().category,
          subcategory: doc.data().subcategory
        })
      })
    })

    let docBrands = this.$fireStore
      .collection('apps')
      .doc('crm')
      .collection(this.activeBusinessInfo.b_uid)
      .doc('brand')
      .collection('brand')

    docBrands.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc
        this.brands.push({
          brand: doc.data().brand
        })
      })
    })

    let docCat = this.$fireStore
      .collection('apps')
      .doc('crm')
      .collection(this.activeBusinessInfo.b_uid)
      .doc('category')
      .collection('category')

    docCat.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc
        this.categories.push({
          category: doc.data().category
        })
      })
    })
  },
  methods: {
    AddMoreProd() {
      this.addedItems.push({
        product: '',
        quantity: 1
      })
    },
    newProduct() {
      let vm = this
      let myCategories = []

      for (let i = 0; i < this.category.length; i++) {
        myCategories.push(this.category[i].category)
      }

      let addProduct = {
        uid: vm.activeUserInfo.uid,
        product_name: this.product_name,
        branch: this.branch,
        price: this.number,
        quantity: 0,
        description: this.description,
        active: false,
        vat: this.vat,
        category: this.category.category,
        sub_category: this.subcat,
        featured: this.featured,
        brand: this.activeBusinessInfo.b_name,
        discount: this.discount,
        rating: 0,
        ctc: this.total_cost,
        times_rated: 0,
        comm: this.comm,
        addedItems: this.addedItems,
        images: vm.uploaded_images,
        reseller_id: this.reseller_id,
        seller_id: this.activeBusinessInfo.b_uid,
        seller_email: this.activeBusinessInfo.c_email,
        addr: this.activeBusinessInfo.for_address,
        last_active: moment().format('DD-MM-YYYY'),
        created_month: moment().format('DD-MM-YYYY'),
        timestamp: Date.now()
      }
      let ref = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('products')
        .collection('products')

      ref
        .add(addProduct)
        .then(docRef => {
          console.log('docr', docRef)
          vm.goingUp(docRef, addProduct)
        })
        .catch(err => {
          vm.unsuccessUpload(err)
        })
    },
    goingUp(docRef, addProduct) {
      console.log('1', docRef, addProduct)
      console.log('2', this.activeBusinessInfo.b_uid)
      let vm = this
      this.$fireStore
        .collection('agri-ensights')
        .doc('crm')
        .collection('products')
        .doc(docRef.id)
        .set(addProduct)
        .then(() => {
          vm.successUpload()
          this.product_name = ''
          this.branch = ''
          this.number = 0
          this.quantity = 0
          this.discount = 0
          this.comm = 0
          this.description = ''
          this.reference = ''
          this.active = false
          this.vat = true
          this.featured = false
          this.category = ''
          this.brand = ''
        })
        .catch(err => {
          vm.unsuccessUpload(err)
        })
    },
    successComm() {
      this.$vs.notify({
        color: 'success',
        title: 'Reseller Commission',
        text: 'Minimum commission is set at 5%'
      })
    },
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Asset Added',
        text: 'Whoop whoop, been uploaded'
      })
    },
    unsuccessUpload(er) {
      this.$vs.notify({
        color: 'danger',
        title: 'Oh no',
        text: `Error ${er}`
      })
    }
  }
}
</script>

<style lang="scss">
#theme-customizer {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 400px;
    max-width: 90vw;
    // @apply shadow-lg;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
      0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }
}

.customizer-btn {
  position: fixed;
  top: 50%;
  right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 50000;

  .vs-icon {
    animation: spin 1.5s linear infinite;
  }
}

.scroll-area--customizer {
  height: calc(100% - 5rem);
}
</style>
