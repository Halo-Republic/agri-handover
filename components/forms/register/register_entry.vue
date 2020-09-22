<!-- =========================================================================================
  File Name: TheCustomizer.vue
  Description: Template Customizer
  Component Name: TheCustomizer
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="theme-customizer">
    <!-- Open Customizer Button -->
    <vs-button
      color="primary"
      type="border"
      icon-pack="feather"
      icon="book-open-icon"
      @click="popupActivo4 = true"
      >Book Entry</vs-button
    >

    <!-- Customizer Content -->
    <vs-popup title="Book Entry" :active.sync="popupActivo4">
      <PerfectScrollbar>
        <div class="h-full mx-4">
          <div
            class="customizer-header mt-6 flex items-center justify-between px-6"
          >
            <div>
              <h4>Select transaction type</h4>
              <small>Register your {{ entryType }}</small>
              <vs-row>
                <vs-radio
                  v-model="entryType"
                  vs-name="entryType"
                  vs-value="Assets"
                  >Assets</vs-radio
                >
                <vs-radio
                  v-model="entryType"
                  vs-name="entryType"
                  vs-value="Equity"
                  >Equity</vs-radio
                >
                <vs-radio
                  v-model="entryType"
                  vs-name="entryType"
                  vs-value="Liability"
                  >Liability</vs-radio
                >
                <vs-radio
                  v-model="entryType"
                  vs-name="entryType"
                  vs-value="Expense"
                  >Expense</vs-radio
                >
                <!-- <vs-radio
                  v-model="entryType"
                  vs-name="entryType"
                  vs-value="Income"
                  >Income</vs-radio
                > -->
              </vs-row>
            </div>
            <!-- <feather-icon
              icon="XIcon"
              class="cursor-pointer"
              @click.stop="active = false"
            ></feather-icon> -->
          </div>

          <vs-divider class="mb-0" />
          <div v-if="entryType == 'Assets'">
            <registerAssets />
          </div>
          <div v-if="entryType == 'Equity'">
            <registerEquity />
          </div>
          <div v-if="entryType == 'Liability'">
            <registerLiability />
          </div>
          <div v-if="entryType == 'Income'">
            <registerIncome />
          </div>
          <div v-if="entryType == 'Expense'">
            <registerExpense />
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
// import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import registerAssets from './entry/assets'
import registerEquity from './entry/equity'
import registerLiability from './entry/liability'
import registerIncome from './entry/income'
import registerExpense from './entry/expenses'
export default {
  components: {
    vSelect,
    imageUpload,
    registerAssets,
    registerEquity,
    registerLiability,
    registerIncome,
    registerExpense
  },
  data() {
    return {
      entryType: 'Assets',
      asset_types: ['Current Assets', 'Fixed Assets'],
      fixed_assets: [
        'Building',
        'Computer Equipment',
        'Computer Software',
        'Construction in progress',
        'Furniture and fixtures',
        'Intangible Assets',
        'Land',
        'Leasehold improvements',
        'Machinery',
        'Office equipment',
        'Vehicles'
      ],
      interest: 0,
      interestType: 'fixed',
      deposit: 0,
      residual: 0,
      loanTerm: 0,
      expectedLife: 1,
      depreciationType: 'straight',
      valueType: 'None',
      transactionTypes: ['Cash', 'Credit'],
      transactionType: '',
      // https://quickbooks.intuit.com/in/resources/accountants-and-bookkeepers-accountants-and-bookkeepers/what-are-current-assets/
      current_assets: [
        'Cash',
        'Cash Equivalent',
        'Inventory',
        'Accounts Receivable',
        'Marketable Securities',
        'Prepaid Expenses',
        'Other Liquid Assets'
      ],
      cash_equivalents: [
        'Bank Balances',
        'Bank Overdraft',
        'Cheques',
        'Drafts-On-Hand',
        'Demand deposits',
        'Short-term investments'
      ],
      cash_equivalent: '',
      inventories: [
        'Raw and Packaging Material',
        'Finished Goods',
        'Work in Progress'
      ],
      inventory: '',
      fixed_asset: '',
      current_asset: '',
      asset_type: '',
      assetName: '',
      branch: '',
      cost: 0,
      quantity: 0,
      description: '',
      reference: '',
      active: false,
      popupActivo4: false
    }
  },
  computed: {
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
    totalAmount() {
      return this.quantity * this.cost
    },
    loanAmount() {
      return this.totalAmount - this.deposit
    },
    straightLine() {
      return (this.totalAmount - this.residual) / this.expectedLife
    }
  },
  watch: {
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
        this.inventory = ''
      }
    }
  },
  methods: {
    newAsset() {
      let vm = this
      let assetsAdd = {
        uid: vm.activeUserInfo.uid,
        reference: vm.reference,
        branch: vm.branch,

        asset_type: vm.asset_type,
        asset_name: vm.assetName,
        cost: vm.cost,
        total_cost: vm.totalAmount,
        quantity: vm.quantity,
        description: vm.description,
        value_type: vm.valueType,
        transaction_type: vm.transactionType,
        last_active: moment().format('DD-MM-YYYY'),
        created_date: moment().format('DD-MM-YYYY'),
        created_month: moment().format('MM-YYYY'),

        timestamp: Date.now()
      }

      if (vm.uploaded_images) {
        assetsAdd.documentation = vm.uploaded_images
      }

      if (vm.asset_type == 'Fixed Assets') {
        assetsAdd.fixed_asset = vm.fixed_asset
      }

      if (vm.asset_type == 'Current Assets') {
        assetsAdd.current_asset = vm.current_asset
      }

      if (vm.current_asset == 'Inventory') {
        assetsAdd.inventory = vm.inventory
      }

      if (vm.current_asset == 'Cash Equivalent') {
        assetsAdd.cash_equivalent = vm.cash_equivalent
      }

      if (vm.valueType == 'Depreciation') {
        assetsAdd.residual = vm.residual
        assetsAdd.expected_life = vm.expectedLife
      }

      if (vm.transactionType == 'Credit') {
        assetsAdd.deposit = vm.deposit
        assetsAdd.loan_amount = vm.loanAmount
        assetsAdd.loan_term = vm.loanTerm
        assetsAdd.interest = vm.interest
        assetsAdd.interest_type = vm.interestType
      }

      let ref = this.$fireStore

        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('assets')
        .collection('assets')

      ref
        .add(assetsAdd)
        .then(() => {
          ;(vm.inventory = ''),
            (vm.fixed_asset = ''),
            (vm.current_asset = ''),
            (vm.asset_type = ''),
            (vm.assetName = ''),
            (vm.branch = ''),
            (vm.cost = 0),
            (vm.quantity = 0),
            (vm.description = ''),
            (vm.reference = ''),
            (vm.interest = 0),
            (vm.interestType = 'fixed'),
            (vm.deposit = 0),
            (vm.residual = 0),
            (vm.loanTerm = 0),
            (vm.expectedLife = 1),
            (vm.depreciationType = 'straight'),
            (vm.valueType = 'None'),
            vm.successUpload()
        })
        .catch(err => {
          vm.unsuccessUpload(err)
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
