<!-- =========================================================================================
  File Name: UserList.vue
  Description: User List page
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="page-user-list">
    <vx-card
      ref="filterCard"
      title="Filters"
      class="mb-8 user-list-filters"
      actionButtons
      @refresh="resetColFilters"
      @remove="resetColFilters"
    >
      <div class="vx-row">
        <div class="w-full vx-col md:w-1/4 sm:w-1/2">
          <label class="text-sm opacity-75">Role</label>
          <v-select
            :options="roleOptions"
            :clearable="false"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            v-model="roleFilter"
            class="mb-4 md:mb-0"
          />
        </div>
        <div class="w-full vx-col md:w-1/4 sm:w-1/2">
          <label class="text-sm opacity-75">Status</label>
          <v-select
            :options="statusOptions"
            :clearable="false"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            v-model="statusFilter"
            class="mb-4 md:mb-0"
          />
        </div>
        <div class="w-full vx-col md:w-1/4 sm:w-1/2">
          <label class="text-sm opacity-75">Verified</label>
          <v-select
            :options="isVerifiedOptions"
            :clearable="false"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            v-model="isVerifiedFilter"
            class="mb-4 sm:mb-0"
          />
        </div>
        <div class="w-full vx-col md:w-1/4 sm:w-1/2">
          <label class="text-sm opacity-75">Department</label>
          <v-select
            :options="departmentOptions"
            :clearable="false"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            v-model="departmentFilter"
          />
        </div>
      </div>
    </vx-card>

    <div class="p-6 vx-card">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
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
                  usersData.length - currentPage * paginationPageSize > 0
                    ? currentPage * paginationPageSize
                    : usersData.length
                }}
                of {{ usersData.length }}</span
              >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <vs-input
          class="order-3 w-full mt-4 mr-0 sm:mr-4 sm:w-auto sm:order-normal sm:mt-0"
          v-model="searchQuery"
          @input="updateSearchQuery"
          placeholder="Search..."
        />
        <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

        <!-- ACTION - DROPDOWN -->
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div
            class="flex items-end justify-center w-32 p-3 text-lg font-medium rounded-lg cursor-pointer shadow-drop d-theme-dark-light-bg"
          >
            <span class="mr-2 leading-none">Actions</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>

          <vs-dropdown-menu>
            <vs-dropdown-item>
              <span class="flex items-center">
                <feather-icon
                  icon="TrashIcon"
                  svgClasses="h-4 w-4"
                  class="mr-2"
                />
                <span>Delete</span>
              </span>
            </vs-dropdown-item>

            <vs-dropdown-item>
              <span class="flex items-center">
                <feather-icon
                  icon="ArchiveIcon"
                  svgClasses="h-4 w-4"
                  class="mr-2"
                />
                <span>Archive</span>
              </span>
            </vs-dropdown-item>

            <vs-dropdown-item>
              <span class="flex items-center">
                <feather-icon
                  icon="FileIcon"
                  svgClasses="h-4 w-4"
                  class="mr-2"
                />
                <span>Print</span>
              </span>
            </vs-dropdown-item>

            <vs-dropdown-item>
              <span class="flex items-center">
                <feather-icon
                  icon="SaveIcon"
                  svgClasses="h-4 w-4"
                  class="mr-2"
                />
                <span>CSV</span>
              </span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="my-4 ag-theme-material w-100 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="myStaff"
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

      <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
    </div>
    <userRegistration />
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'

import userRegistration from '@/components/forms/register/register_employee'
// Cell Renderer
import CellRendererLink from '@/components/cell-renderer/link.vue'
import CellRendererStatus from '@/components/cell-renderer/status.vue'
import CellRendererVerified from '@/components/cell-renderer/verified.vue'
import CellRendererActions from '@/components/cell-renderer/actions.vue'
import CellRendererAddStore from '@/components/cell-renderer/add_store'

import { getStaff } from '@/assets/utils/firestore/users'
// import  '@/assets/utils/firestore/user'

export default {
  components: {
    AgGridVue,
    vSelect,
    userRegistration,

    // Cell Renderer
    CellRendererLink,
    CellRendererStatus,
    CellRendererVerified,
    CellRendererActions,
    CellRendererAddStore
  },
  data() {
    return {
      usersData: [],

      // Filter Options
      roleFilter: { label: 'All', value: 'all' },
      roleOptions: [
        { label: 'All', value: 'all' },
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Staff', value: 'staff' }
      ],

      statusFilter: { label: 'All', value: 'all' },
      statusOptions: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Deactivated', value: 'deactivated' },
        { label: 'Blocked', value: 'blocked' }
      ],

      isVerifiedFilter: { label: 'All', value: 'all' },
      isVerifiedOptions: [
        { label: 'All', value: 'all' },
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ],

      departmentFilter: { label: 'All', value: 'all' },
      departmentOptions: [
        { label: 'All', value: 'all' },
        { label: 'Sales', value: 'sales' },
        { label: 'Development', value: 'development' },
        { label: 'Management', value: 'management' }
      ],

      searchQuery: '',

      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
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
          cellRendererFramework: 'CellRendererLink',
          headerName: 'avatar',
          field: 'username',
          width: 110
        },
        // {

        //   headerName: 'Username',
        //   field: 'username',
        //   width: 110,
        // },
        {
          headerName: 'Username',
          field: 'display_name',
          filter: true,
          width: 210
        },
        {
          headerName: 'Email',
          field: 'email',
          filter: true,
          width: 225
        },
        {
          headerName: 'Name',
          field: 'name',
          filter: true,
          width: 200
        },
        {
          headerName: 'Surname',
          field: 'surname',
          filter: true,
          width: 200
        },
        {
          headerName: 'Role',
          field: 'role',
          filter: true,
          width: 150
        },
        {
          headerName: 'Status',
          field: 'status',
          filter: true,
          width: 150,
          cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: 'Verified',
          field: 'is_verified',
          filter: true,
          width: 125,
          cellRendererFramework: 'CellRendererVerified',
          cellClass: 'text-center'
        },
        {
          headerName: 'Department',
          field: 'department',
          filter: true,
          width: 150
        },
        {
          headerName: 'Actions',
          field: 'transactions',
          width: 150,
          cellRendererFramework: 'CellRendererActions'
        }
      ],

      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererStatus,
        CellRendererVerified,
        CellRendererActions,
        CellRendererAddStore
      }
    }
  },
  watch: {
    roleFilter(obj) {
      this.setColumnFilter('role', obj.value)
    },
    statusFilter(obj) {
      this.setColumnFilter('status', obj.value)
    },
    isVerifiedFilter(obj) {
      let val =
        obj.value === 'all' ? 'all' : obj.value == 'yes' ? 'true' : 'false'
      this.setColumnFilter('is_verified', val)
    },
    departmentFilter(obj) {
      this.setColumnFilter('department', obj.value)
    }
  },
  computed: {
    myStaff() {
      return this.$store.state.crm.staff
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
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 10
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
    },
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val)
    }
  },
  created() {
    let vm = this
    if (process.client) {
      let myStaff = []

      //    https://console.firebase.google.com/project/test-6a8f9/database/firestore/data/apps/users/w5TXHk55q8zQdowLPVeZ/info

      let getUsers = this.$fireStore
        .collection('apps')
        .doc('users')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('info')
        .collection('general')
        .where('company_id' === this.activeCompanyInfo.id)

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
            avatar: doc.data().avatar,
            email: doc.data().email,
            name: doc.data().name,
            surname: doc.data().surname,
            company: doc.data().company,
            position: doc.data().position,
            branch: doc.data().branch,
            p_notes: doc.data().p_notes,
            verified: doc.data().verified,
            last_active: doc.data().last_active,
            created_month: doc.data().created_month,
            timestamp: doc.data().timestamp
          })
          //     }).then(() => {
          //         console.log('store', store, myStaff)
          //       store.commit('business/UPDATE_STAFF', myStaff)
        })
      })

      vm.$store.commit('crm/UPDATE_STAFF', myStaff)
    }
  },
  mounted() {
    //   let business = this.$store.state.business.app_active_business
    //   let store = this.$store
    //   let fireStore = this.$fireStore
    //   getStaff('staff', business, store, fireStore)

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
