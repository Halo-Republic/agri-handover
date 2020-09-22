<!-- =========================================================================================
    File Name: AgGridTable.vue
    Description: Ag Grid table
    ----------------------------------------------------------------------------------------
========================================================================================== -->

<template>
  <div id="ag-grid-demo">
    <vx-card class="mt-12">
      <!-- TABLE ACTION ROW -->
      <div class="flex flex-wrap items-center justify-between">
        <!-- ITEMS PER PAGE -->
        <div class="mb-4 mr-4 md:mb-0 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
              class="flex items-center justify-between p-4 font-medium border border-solid rounded-full cursor-pointer d-theme-border-grey-light d-theme-dark-bg"
            >
              <span class="mr-2"
                >{{
                  currentPage * paginationPageSize - (paginationPageSize - 1)
                }}
                -
                {{
                  contacts.length - currentPage * paginationPageSize > 0
                    ? currentPage * paginationPageSize
                    : contacts.length
                }}
                of {{ contacts.length }}</span
              >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                <span>50</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                <span>100</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                <span>150</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <div
          class="flex flex-wrap items-center justify-between ag-grid-table-actions-right"
        >
          <vs-input
            class="mb-4 mr-4 md:mb-0"
            v-model="searchQuery"
            @input="updateSearchQuery"
            placeholder="Search..."
          />
          <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()"
            >Export as CSV</vs-button
          >
          <addingProducts />
          <addingCategories v-if="activeUserInfo.role == 'Admin'" />
          <addingSubCategories v-if="activeUserInfo.role == 'Admin'" />
          <addingBrands v-if="activeUserInfo.role == 'Admin'" />
        </div>
        <vs-row class="mt-6">
          <vs-col vs-w="6">
            <vs-button
              class="mb-4 mr-4 md:mb-0"
              @click="getSelectedRows()"
              color="primary"
              >View
            </vs-button>

            <vs-button
              class="mb-4 mr-4 md:mb-0"
              @click="deleteSelectedRows()"
              color="danger"
              >Delete
            </vs-button>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
          </vs-col>
        </vs-row>
      </div>

      <ag-grid-vue
        ref="agGridTable"
        :gridOptions="gridOptions"
        class="my-4 ag-theme-material w-100 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="companies"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl"
      >
      </ag-grid-vue>

      <vs-popup
        class="holamundo"
        title="My Products"
        :active.sync="popupActivo"
      >
        <p>
          <PerfectScrollbar>
            <div class="h-full mx-4">
              <div
                class="customizer-header mt-6 flex items-center justify-between px-6"
              >
                <div>
                  <h4>Products</h4>
                  <!-- <small>Register your assets</small> -->
                </div>
                <feather-icon
                  icon="XIcon"
                  class="cursor-pointer"
                  @click.stop="active = false"
                ></feather-icon>
              </div>

              <vs-divider class="mb-0" />
              <div>
                <p class="mt-5">Branch</p>
                <v-select
                  class="w-full "
                  v-model="data.branch"
                  :options="activeBusinessInfo.branches"
                ></v-select>
                <div v-for="(addedItem, index) in data.addedItems" :key="index">
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

              <p class="mt-5">Category</p>

              <v-select
                label="category"
                class="w-full "
                v-model="data.category"
                :options="cats"
              ></v-select>
              <p class="mt-5">Sub Category</p>

              <v-select
                v-if="data.category"
                label="Sub Category"
                class="w-full "
                v-model="data.sub_category"
                :options="data.category.subcategory"
              ></v-select>
              <vs-input
                label="Product Name"
                name="assetname"
                v-model="data.product_name"
                class="w-full mt-5"
              />

              <vs-input
                label="Selling Price"
                name="number"
                v-model="data.price"
                type="number"
                class="w-full mt-5"
              />

              <vs-input
                label="Discount"
                name="number"
                v-model="data.discount"
                type="number"
                class="w-full mt-5"
              />

              <vs-input
                label="Reseller Comm in %"
                name="number"
                v-model="data.comm"
                type="number"
                class="w-full mt-5"
              />

              <vs-checkbox v-model="data.vat" class="w-full mt-5"
                >VAT incl</vs-checkbox
              >
              <vs-checkbox v-model="data.featured" class="w-full mt-5"
                >Featured Product</vs-checkbox
              >

              <vs-textarea
                class="w-full mt-5"
                label="Description"
                v-model="data.description"
              />

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
                <vs-button class="mr-6" @click="newProduct"
                  >Update Product</vs-button
                >
                <vs-button
                  type="border"
                  color="danger"
                  @click="isSidebarActiveLocal = false"
                  >Cancel</vs-button
                >
              </div>
            </div>
          </PerfectScrollbar>
        </p>
      </vs-popup>

      <vs-pagination
        :total="totalPages"
        :max="maxPageNumbers"
        v-model="currentPage"
      />
    </vx-card>
    <div>
      <vx-card v-if="activeUserInfo.role == 'Admin'" title="Brands">
        <vs-list>
          <vs-list-header title="Brands"> </vs-list-header>
          <vs-list-item
            :title="cat.brand"
            subtitle="Whole Category"
            v-for="(cat, index) in bras"
            :key="index"
          >
            <vs-button
              radius
              color="danger"
              icon="delete"
              @click="deleteBrand(cat.id, index)"
            ></vs-button>
          </vs-list-item>
        </vs-list>
      </vx-card>

      <vx-card v-if="activeUserInfo.role == 'Admin'" title="Categories">
        <vs-list v-for="(cat, index) in cats" :key="index">
          <vs-list-header :title="cat.category"> </vs-list-header>
          <vs-list-item :title="cat.category" subtitle="Whole Category">
            <vs-button
              radius
              color="danger"
              icon="delete"
              @click="deleteCategory(cat.id, index)"
            ></vs-button>
          </vs-list-item>
          <vs-list-item
            v-for="(sub, indx) in cat.subcategory"
            :key="indx"
            :title="sub"
          >
            <vs-button
              radius
              color="danger"
              type="gradient"
              icon="delete"
              @click="deleteSubCategory(sub, indx, cat.id, index)"
            ></vs-button>
          </vs-list-item>
        </vs-list>
      </vx-card>
    </div>
    <previous />
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import FormGenerator from '@/components/form-generator/formGenerator'
// import addingCompany from './addAssets'
import addingProducts from '@/components/forms/register/register_products'
import addingBrands from '@/components/forms/register/register_brand'
import addingCategories from '@/components/forms/register/register_category'
import addingSubCategories from '@/components/forms/register/register_sub_category'

import vSelect from 'vue-select'
import imageUpload from '@/components/form-generator/components/imageUpload.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moment from 'moment'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import firebase from 'firebase'
export default {
  components: {
    AgGridVue,
    FormGenerator,
    addingProducts,
    addingBrands,
    addingCategories,
    vSelect,
    imageUpload,
    addingSubCategories
  },
  data() {
    return {
      searchQuery: '',
      gridOptions: {},
      companies: [],
      assets: [],
      contacts: [],
      cats: [],
      bras: [],
      categories: ['Livestock', 'Meat, Poultry, Fish', 'Fruit & Vegetables'],

      vat_itmes: true,

      maxPageNumbers: 7,
      popupActivo: false,
      gridApi: null,
      defaultColDef: {
        sortable: true,
        editable: true,
        resizable: true,
        suppressMenu: true
      },
      data: {},

      columnDefs: [
        {
          headerName: 'ID',
          field: 'id',
          width: 125,
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true
        },

        {
          headerName: 'Category',
          field: 'category',
          width: 175,
          filter: true
        },
        {
          headerName: 'Brand',
          field: 'brand',
          filter: true,
          width: 150
        },

        {
          // cellRendererFramework: "CellRendererCompany",
          headerName: 'Title',
          field: 'product_name',
          filter: true,
          width: 250,
          pinned: 'left',
          sortable: true,
          resizable: true,
          editable: true
        },

        {
          headerName: 'Amount',
          field: 'price',
          filter: true,
          width: 150
        },

        {
          headerName: 'Branch',
          field: 'branch',
          filter: true,
          width: 150
        },

        {
          headerName: 'Date',
          field: 'created_month',
          filter: true,
          width: 125
        }
      ]
    }
  },
  watch: {
    '$store.state.windowWidth'(val) {
      if (val <= 576) {
        this.maxPageNumbers = 4
        this.gridOptions.columnApi.setColumnPinned('email', null)
      } else this.gridOptions.columnApi.setColumnPinned('email', 'left')
    },
    uploaded_images: function() {
      let ref = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('products')
        .collection('products')
        .doc(this.data.id)

      ref.update({
        images: this.uploaded_images
      })
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.user.app_active_user
    },
    total_inv() {
      return this.$store.state.crm.total_inv
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
    },
    subcats() {
      let cat = []

      switch (this.data.category) {
        case 'Livestock':
          cat = [
            'Cattle',
            'Buls',
            'Cows',
            'Heifers',
            'Weaners',
            'Goat',
            'Sheep',
            'Chickens',
            'Broilers',
            'Layers',
            'Hardbody'
          ]
          break

        case 'Meat, Poultry, Fish':
          cat = ['Beef', 'Poultry', 'Lamb', 'Pork', 'Fish & Shellfish']
          break

        case 'Fruit & Vegetables':
          cat = ['Fresh Fruit', 'Fresh Vegetables', 'Herbs', 'In Season']
          break

        default:
          break
      }

      return cat
    },
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    },

    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 50
    },
    totalPages() {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    uploaded_images() {
      return this.$store.state.form.uploaded_images
    },
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    },
    total_cost() {
      let cost = 0
      if (this.data) {
        if (this.data.addedItems) {
          for (let i = 0; i < this.data.addedItems.length; i++) {
            console.log('i', i, this.data.addedItems[i])
            cost +=
              this.data.addedItems[i].product.price *
              this.data.addedItems[i].quantity
          }
        }
      }

      return cost
    }
  },
  methods: {
    successDelete() {
      this.$vs.notify({
        title: 'Delete',
        text: 'Item has been successfully deleted',
        color: 'Danger'
      })
    },
    deleteSubCategory(sub, indx, cat, index) {
      let vm = this
      console.log(sub, indx, cat, index)
      console.log('all', this.cats)
      this.$fireStore
        .collection('agri-ensights')
        .doc('crm')
        .collection('categories')
        .doc(cat)
        .update({
          subcategory: firebase.firestore.FieldValue.arrayRemove(sub)
        })
        .then(() => {
          const filteredItems = vm.cats[index].subcategory
            .slice(0, indx)
            .concat(
              vm.cats[index].subcategory.slice(
                indx + 1,
                vm.cats[index].subcategory.length
              )
            )
          vm.cats[index].subcategory = filteredItems
          vm.successDelete()
        })
        .catch(err => {
          console.log('error', err)
        })
    },
    deleteBrand(id, index) {
      let vm = this
      this.$fireStore
        .collection('agri-ensights')
        .doc('crm')
        .collection('brand')
        .doc(id)
        .delete()
        .then(() => {
          const filteredItems = vm.bras
            .slice(0, index)
            .concat(vm.bras.slice(index + 1, vm.bras.length))
          vm.bras = filteredItems
          vm.successDelete()
        })
        .catch(err => {
          console.log('error', err)
        })
    },
    deleteCategory(id, index) {
      let vm = this
      this.$fireStore
        .collection('agri-ensights')
        .doc('crm')
        .collection('categories')
        .doc(id)
        .delete()
        .then(() => {
          const filteredItems = vm.cats
            .slice(0, index)
            .concat(vm.cats.slice(index + 1, vm.cats.length))
          vm.cats = filteredItems
          vm.successDelete()
        })
        .catch(err => {
          console.log('error', err)
        })
    },
    AddMoreProd() {
      this.data.addedItems.push({
        product: '',
        quantity: 1
      })
    },
    getSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      const selectedDataStringPresentation = selectedData.map(node => node)
      this.data = selectedDataStringPresentation[0]
      this.popupActivo = true
      console.log('id', selectedDataStringPresentation[0].id)
      // this.$router.push(
      //   `/crm/company/ViewCompany/${selectedDataStringPresentation[0].id}`
      // )

      // this.$store.dispatch(
      //   'crm/companyCurrent',
      //   selectedDataStringPresentation[0]
      // )
    },
    newProduct() {
      let vm = this
      let myCategories = []

      let addProduct = {
        uid: vm.activeUserInfo.uid,
        product_name: this.data.product_name,
        branch: this.data.branch,
        price: this.data.price,
        quantity: this.data.quantity,
        description: this.data.description,
        active: this.data.active,
        vat: this.data.vat,
        category: this.data.category,
        sub_category: this.data.sub_category,
        featured: this.data.featured,
        brand: this.activeBusinessInfo.b_name,
        discount: this.data.discount,
        ctc: this.total_cost,
        comm: this.data.comm,
        addedItems: this.data.addedItems
      }

      let ref = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('products')
        .collection('products')
        .doc(this.data.id)

      ref
        .update(addProduct)
        .then(() => {
          this.$fireStore
            .collection('agri-ensights')
            .doc('crm')
            .collection('products')
            .doc(this.data.id)
            .update(addProduct)

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
    editSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      const selectedDataStringPresentation = selectedData.map(node => node)
      console.log('adfa', selectedDataStringPresentation)
    },
    deleteSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      const selectedDataStringPresentation = selectedData.map(node => node)
      let vm = this
      let deleteDB

      deleteDB = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('products')
        .collection('products')
        .doc(selectedDataStringPresentation[0].id)

      deleteDB
        .delete()
        .then(function() {
          vm.$fireStore
            .collection('agri-ensights')
            .doc('crm')
            .collection('products')
            .doc(selectedDataStringPresentation[0].id)
            .delete()
        })
        .catch(function(error) {
          console.error('Error removing document: ', error)
        })
    },
    AddCompany() {
      this.popupActivo = true
    },
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val)
    },

    setColumnFilter(column, val) {
      const filter = this.gridApi.getFilterInstance(column)
      let modelObj = null

      if (val !== 'all') {
        modelObj = { type: 'equals', filter: val }
      }

      filter.setModel(modelObj)
      this.gridApi.onFilterChanged()
    },
    resetColFilters() {
      // Reset Grid Filter
      this.gridApi.setFilterModel(null)
      this.gridApi.onFilterChanged()

      // Reset Filter Options
      this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = {
        label: 'All',
        value: 'all'
      }

      this.$refs.filterCard.removeRefreshAnimation()
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api

    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector(
        '.ag-header-container'
      )
      header.style.left =
        '-' + String(Number(header.style.transform.slice(11, -3)) + 9) + 'px'
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
          subcategory: doc.data().subcategory,
          id: doc.id
        })
      })
    })

    let docBrands = this.$fireStore
      .collection('agri-ensights')
      .doc('crm')
      .collection('brand')

    docBrands.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc
        if (change.type === 'added') {
          this.bras.push({
            id: doc.id,
            brand: doc.data().brand
          })
        }
      })
    })

    this.$fireStore
      .collection('apps')
      .doc('crm')
      .collection(this.activeBusinessInfo.b_uid)
      .doc('products')
      .collection('products')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let doc = change.doc
          this.companies.push({
            id: doc.id,
            uid: doc.data().uid,
            product_name: doc.data().product_name,
            branch: doc.data().branch,
            price: doc.data().price,
            quantity: doc.data().quantity,
            description: doc.data().description,
            active: doc.data().active,
            vat: doc.data().vat,
            category: doc.data().category,
            sub_category: doc.data().sub_category,
            featured: doc.data().featured,
            brand: doc.data().brand,
            discount: doc.data().discount,
            rating: doc.data().rating,
            ctc: doc.data().ctc,
            comm: doc.data().comm,
            addedItems: doc.data().addedItems,
            images: doc.data().images,
            reseller_id: doc.data().reseller_id,
            created_month: doc.data().created_month
          })
        })
      })
  }
}
</script>
<style lang="scss">
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}
</style>
