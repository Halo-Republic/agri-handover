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
              <!-- <span class="mr-2"
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
              > -->
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
          <client-only>
            <addingAssets />
          </client-only>
          <vs-button @click="$router.push('/crm/assets/breakdown')"
            >BreakDown</vs-button
          >
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
        :rowData="assets_indv"
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

      <vs-pagination
        :total="totalPages"
        :max="maxPageNumbers"
        v-model="currentPage"
      />
    </vx-card>
    <previous />
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
// import FormGenerator from '@/components/form-generator/formGenerator'
// import addingCompany from './addAssets'
import addingAssets from '@/components/forms/register/register_assets'

import vSelect from 'vue-select'

import moment from 'moment'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

export default {
  components: {
    AgGridVue,
    // FormGenerator,
    addingAssets,
    vSelect
  },
  data() {
    return {
      searchQuery: '',
      gridOptions: {},
      maxPageNumbers: 7,
      popupActivo: false,
      gridApi: null,
      defaultColDef: {
        sortable: true,
        editable: true,
        resizable: true,
        suppressMenu: true
      },

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
          field: 'asset_type',
          width: 175,
          filter: true
        },

        {
          // cellRendererFramework: "CellRendererCompany",
          headerName: 'Title',
          field: 'asset_name',
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
          headerName: 'Quantity',
          field: 'quantity',
          filter: true,
          width: 150
        },
        {
          headerName: 'Reference',
          field: 'reference',
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
          //  cellRendererFramework: "CellRendererLink",

          headerName: 'Documentation',
          field: 'documentation',
          filter: true,
          width: 125
        },
        {
          headerName: 'Date',
          field: 'created_date',
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
    }
  },
  computed: {
    total_assets() {
      return this.$store.state.crm.total_assets
    },
    assets_indv() {
      return this.$store.state.crm.assets_indv
    },
    company_assets() {
      let ass = []
      let arr_ass = Object.entries(this.total_assets)
      for (let i = 0; i < arr_ass.length; i++) {
        let sm_ass = {}
        sm_ass.name = arr_ass[i][0]
        sm_ass.val = arr_ass[i][1].val

        ass.push(sm_ass)
      }

      return ass
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
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    }
  },
  methods: {
    getSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      const selectedDataStringPresentation = selectedData.map(node => node)
      this.$router.push(
        `/crm/company/ViewCompany/${selectedDataStringPresentation[0].id}`
      )

      this.$store.dispatch(
        'crm/companyCurrent',
        selectedDataStringPresentation[0]
      )
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
    let vm = this
    this.$fireStore
      .collection('apps')
      .doc('crm')
      .collection(this.activeBusinessInfo.b_uid)
      .doc('assets')
      .collection('total')
      .doc('total')
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let assets = doc.data()
          vm.$store.commit('crm/ASSETS_UPDATE', assets)
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error)
      })

    let assets = []

    let docR

    docR = this.$fireStore
      .collection('apps')
      .doc('crm')
      .collection(this.activeBusinessInfo.b_uid)
      .doc('book')
      .collection('book')
      .where('ass_type', 'in', ['Fixed Assets', 'Current Assets'])

    docR.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc
        assets.push({
          id: doc.id,
          created_date: doc.data().last,
          uid: doc.data().uid,
          asset_name: doc.data().ass_name,
          asset_type: doc.data().ass_type,
          documentation: doc.data().docs,
          branch: doc.data().branch,
          price: doc.data().t_cost,
          quantity: doc.data().qty,
          reference: doc.data().ref
        })
      })
      vm.$store.commit('crm/ASSETS_INDV_UPDATE', assets)
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
