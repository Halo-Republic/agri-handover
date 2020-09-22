<!-- =========================================================================================
  File Name: TheCustomizer.vue
  Description: Template Customizer
  Component Name: TheCustomizer
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="theme-customizer">
    <!-- Open Customizer Button -->
    <PerfectScrollbar>
      <div class="h-full mx-4">
        <vs-divider class="mb-0" />
        <p class="mt-5">Branch</p>
        <v-select
          class="w-full "
          v-model="branch"
          :options="activeBusinessInfo.branches"
        ></v-select>

        <p class="mt-5">Asset Type</p>
        <v-select
          class="w-full "
          v-model="asset_type"
          :options="asset_types"
        ></v-select>

        <p class="mt-5" v-if="asset_type == 'Current Assets'">
          Current Asset Type
        </p>
        <v-select
          v-if="asset_type == 'Current Assets'"
          class="w-full "
          v-model="current_asset"
          :options="current_assets"
        ></v-select>

        <p class="mt-5" v-if="asset_type == 'Fixed Assets'">
          Fixed Asset Type
        </p>
        <v-select
          v-if="asset_type == 'Fixed Assets'"
          class="w-full "
          v-model="fixed_asset"
          :options="fixed_assets"
        ></v-select>

        <p
          class="mt-5"
          v-if="current_asset == 'Inventory' && asset_type == 'Current Assets'"
        >
          Inventory
        </p>
        <v-select
          v-if="current_asset == 'Inventory' && asset_type == 'Current Assets'"
          class="w-full "
          v-model="inventory"
          :options="inventories"
        ></v-select>

        <p
          class="mt-5"
          v-if="
            current_asset == 'Cash Equivalent' && asset_type == 'Current Assets'
          "
        >
          Cash Equivalent
        </p>
        <v-select
          v-if="
            current_asset == 'Cash Equivalent' && asset_type == 'Current Assets'
          "
          class="w-full "
          v-model="cash_equivalent"
          :options="cash_equivalents"
        ></v-select>
        <vs-input
          label="Asset Name"
          name="assetname"
          v-model="assetName"
          class="w-full mt-5"
        />

        <vs-input
          label="Purchased Price/Cost per item"
          name="number"
          v-model="cost"
          type="number"
          class="w-full mt-5"
        />

        <vs-input
          label="Quantity"
          name="quantity"
          v-model="quantity"
          type="number"
          class="w-full mt-5 mb-5"
        />

        <vs-radio v-model="valueType" vs-name="valueType" vs-value="Deprection"
          >Deprection</vs-radio
        >
        <vs-radio v-model="valueType" vs-name="valueType" vs-value="None"
          >None</vs-radio
        >

        <div v-if="valueType == 'Depreciation'">
          <vs-radio
            v-model="depreciationType"
            vs-name="depreciationType"
            vs-value="straight"
            >Straight Line</vs-radio
          >
          <vs-radio
            v-model="depreciationType"
            vs-name="depreciationType"
            vs-value="balance"
            >Reducing Balance</vs-radio
          >

          <vs-input
            label="Residual Value"
            name="residual"
            v-model="residual"
            class="w-full mt-5"
          />

          <vs-input
            label="Useful life (Months)"
            name="expectedLife"
            v-model="expectedLife"
            class="w-full mt-5"
          />
        </div>

        <p class="mt-5">
          Transaction Type
        </p>
        <v-select
          class="w-full "
          v-model="transactionType"
          :options="transactionTypes"
        ></v-select>

        <div v-if="transactionType == 'Credit'">
          <vs-input
            label="Deposit"
            name="deposit"
            v-model="deposit"
            class="w-full mt-5"
          />

          <vs-input
            disabled
            label="Loan Amount"
            name="loanAbout"
            v-model="loanAmount"
            class="w-full mt-5"
          />

          <vs-input
            label="Loan Term (months)"
            name="loanterm"
            v-model="loanTerm"
            class="w-full mt-5"
          />

          <vs-input
            label="Interest"
            name="interest"
            v-model="interest"
            class="w-full mt-5 mb-5"
          />

          <vs-radio
            v-model="interestType"
            vs-name="interestType"
            vs-value="variable"
            >Variable</vs-radio
          >

          <vs-radio
            v-model="interestType"
            vs-name="interestType"
            vs-value="fixed"
            >Fixed</vs-radio
          >
        </div>

        <vs-input
          label="Reference"
          name="reference"
          v-model="reference"
          class="w-full mt-5"
        />

        <vs-textarea
          class="w-full mt-5"
          label="Description"
          v-model="description"
        />

        <div>
          <imageUpload class="mb-2  sm:mb-0" label="Documentation" />

          <p class="mt-2 text-sm">
            Allowed JPG, GIF or PNG. Max size of 800kB
          </p>
        </div>
        <div
          class="flex flex-wrap items-center justify-center p-6"
          slot="footer"
        >
          <vs-row v-if="transactionType">
            <vs-col vs-w="6">
              <h6>Debit</h6>
              {{ debit }}
            </vs-col>
            <vs-col vs-w="6">
              <h6>Credit</h6>
              {{ credit }}
              {{ credit2 }}
            </vs-col>
          </vs-row>
          <vs-button class="mr-6" @click="newAsset">Add Asset</vs-button>
          <vs-button
            type="border"
            color="danger"
            @click="isSidebarActiveLocal = false"
            >Cancel</vs-button
          >
        </div>
      </div>
    </PerfectScrollbar>
  </div>
</template>

<script>
import moment from 'moment'
import vSelect from 'vue-select'
import imageUpload from '@/components/form-generator/components/imageUpload.vue'

export default {
  components: { vSelect, imageUpload },
  data() {
    return {
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
    },
    debit() {
      return `${this.asset_type} : ${this.totalAmount}`
    },
    credit() {
      if (this.transactionType == 'Cash') {
        return `Cash : ${this.totalAmount}`
      } else if (this.transactionType == 'Credit') {
        return `Cash : ${this.deposit}`
      }
    },
    credit2() {
      if (this.transactionType == 'Cash') {
        return ''
      } else if (this.transactionType == 'Credit') {
        return `Long Term loans : ${this.loanAmount}`
      }
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
        debit: vm.debit,
        credit: vm.credit,
        credit2: vm.credit2,
        uid: vm.activeUserInfo.uid,
        ref: vm.reference,
        entry_type: 'Asset Allocation',
        branch: vm.branch,
        ass_type: vm.asset_type,
        ass_name: vm.assetName,
        i_cost: vm.cost,
        t_cost: vm.totalAmount,
        qty: vm.quantity,
        desc: vm.description,
        val_type: vm.valueType,
        trans_type: vm.transactionType,
        last: moment().format('DD-MM-YYYY'),
        date: moment().format('DD-MM-YYYY'),
        month: moment().format('MM-YYYY'),
        timestamp: Date.now()
      }

      if (vm.uploaded_images) {
        assetsAdd.docs = vm.uploaded_images
      }

      if (vm.asset_type == 'Fixed Assets') {
        assetsAdd.f_asset = vm.fixed_asset
      }

      if (vm.asset_type == 'Current Assets') {
        assetsAdd.c_asset = vm.current_asset
      }

      if (vm.current_asset == 'Inventory') {
        assetsAdd.inv = vm.inventory
      }

      if (vm.current_asset == 'Cash Equivalent') {
        assetsAdd.c_eq = vm.cash_equivalent
      }

      if (vm.valueType == 'Depreciation') {
        assetsAdd.residual = vm.residual
        assetsAdd.exp_life = vm.expectedLife
      }

      if (vm.transactionType == 'Credit') {
        assetsAdd.dep = vm.deposit
        assetsAdd.l_amount = vm.loanAmount
        assetsAdd.l_term = vm.loanTerm
        assetsAdd.interest = vm.interest
        assetsAdd.interest_type = vm.interestType
        assetsAdd.liab_type = 'Fixed'
        assetsAdd.t_liab = vm.loanAmount
        assetsAdd.f_liab = 'Long Term Loans'
      }

      let ref = this.$fireStore

        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('book')
        .collection('book')

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
