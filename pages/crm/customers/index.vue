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
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
          <addingCompany />
        </div>
        <vs-row class="mt-6">
          <vs-col vs-w="6">
            <vs-button
              class="mb-4 mr-4 md:mb-0"
              @click="getSelectedRows()"
              color="primary"
              >View
            </vs-button>

            <!-- <vs-button @click="editSelectedRows()" color='success'>Edit Selected Rows</vs-button> -->
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
        :components="components"
        :gridOptions="gridOptions"
        class="my-4 ag-theme-material w-100 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="activeStaff"
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
import FormGenerator from '@/components/form-generator/formGenerator'
import addingCompany from '@/components/forms/register/register_staff'
import vSelect from 'vue-select'

import moment from 'moment'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

export default {
  components: {
    AgGridVue,
    FormGenerator,
    addingCompany,
    vSelect
  },
  data() {
    return {
      searchQuery: '',
      gridOptions: {},
      companies: [],
      contacts: [],

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
          headerName: 'Email',
          field: 'email',
          width: 175,
          filter: true
        },
        {
          headerName: 'Phone',
          field: 'number',
          filter: true,
          width: 175
        },
        {
          headerName: 'Name',
          field: 'name',
          filter: true,
          width: 250,
          pinned: 'left'
        },

        {
          headerName: 'Surname',
          field: 'surname',
          filter: true,
          width: 150,
          pinned: 'left'
        },
        {
          headerName: 'Position',
          field: 'position',
          filter: true,
          width: 150
        },
        {
          headerName: 'Description',
          field: 'description',
          filter: true,
          width: 125
        },
        {
          headerName: 'Address',
          field: 'formatted_address',
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
    },
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    },
    activeCompanyInfo() {
      return this.$store.state.crm.company
    },
    activeStaff() {
      return this.$store.getters['crm/staff']
    }
  },
  methods: {
    getSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      const selectedDataStringPresentation = selectedData.map(node => node)
      this.$router.push(`/crm/company/view-company`)
    },
    editSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      const selectedDataStringPresentation = selectedData.map(node => node)
    },
    deleteSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      const selectedDataStringPresentation = selectedData.map(node => node)
      let vm = this
      // let deleteDB;

      // if (this.is_blank) {
      //   deleteDB = db
      //     .collection(this.resellerName)
      //     .doc("apps")
      //     .collection(this.companyDetails.id)
      //     .doc("blank_page")
      //     .collection(this.blankRoute)
      //     .doc(this.routeName)
      //     .collection("features")
      //     .doc(this.form.id)
      //     .collection("submitted")
      //     .doc(selectedDataStringPresentation[0].id);
      // } else {
      //   deleteDB = db
      //     .collection(this.resellerName)
      //     .doc("apps")
      //     .collection(this.companyDetails.id)
      //     .doc(this.routeName)
      //     .collection("features")
      //     .doc(this.form.id)
      //     .collection("submitted")
      //     .doc(selectedDataStringPresentation[0].id);
      // }

      // deleteDB
      //   .delete()
      //   .then(function() {
      //     vm.successDelete();
      //     console.log("Document successfully deleted!");
      //   })
      //   .catch(function(error) {
      //     console.error("Error removing document: ", error);
      //   });
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
    if (process.client) {
      if (process.client) {
        let myStaff = []

        let getUsers = this.$fireStore
          .collection('apps')
          .doc('users')
          .collection(this.activeBusinessInfo.b_uid)
          .doc('info')
          .collection('general')

        getUsers.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            let doc = change.doc
            myStaff.push({
              company_id: doc.data().company_id,
              status: doc.data().status,
              online_status: doc.data().online_status,
              role: doc.data().role,
              uid: doc.data().uid,
              display_name: doc.data().display_name,
              photoURL: doc.data().photoURL,
              email: doc.data().email,
              name: doc.data().name,
              surname: doc.data().surname,
              company: doc.data().company,
              position: doc.data().position,
              branch: doc.data().branch,
              push_notes: doc.data().push_notes,
              verified: doc.data().verified,
              last_active: doc.data().last_active,
              created_month: doc.data().created_month,
              timestamp: doc.data().timestamp
            })
          })
        })

        this.$store.commit('crm/UPDATE_STAFF', myStaff)
      }
    }
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
