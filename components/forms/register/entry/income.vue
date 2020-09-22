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

        <p class="mt-5">Equity Type</p>
        <v-select
          class="w-full "
          v-model="equity_type"
          :options="equity_types"
        ></v-select>

        <vs-input
          label="Purchased Price/Cost per item"
          name="number"
          v-model="cost"
          type="number"
          class="w-full mt-5"
        />

        <p class="mt-5">
          Transaction Type
        </p>
        <v-select
          class="w-full "
          v-model="transactionType"
          :options="transactionTypes"
          disabled
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
        <div
          class="flex flex-wrap items-center justify-center p-6"
          slot="footer"
        >
          <vs-button class="mr-6" @click="newEquity">Add Equity</vs-button>
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
// import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: { vSelect, imageUpload },
  data() {
    return {
      expectedLife: 1,
      depreciationType: 'straight',
      valueType: 'None',
      transactionTypes: ['Cash', 'Credit'],
      transactionType: 'Cash',
      equity_type: '',
      equity_types: ['Common Stock', 'Preferred Stock'],
      branch: '',
      description: '',
      reference: '',
      interest: 0,
      interestType: 'fixed',
      deposit: 0,
      residual: 0,
      loanTerm: 0,
      cost: 0,
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
    loanAmount() {
      return this.cost - this.deposit
    },
    debit() {
      return `Cash : ${this.cost}`
    },
    credit() {
      return `${this.equity_type} : ${this.cost}`
    }
  },

  methods: {
    newEquity() {
      let vm = this
      let equityAdd = {
        uid: vm.activeUserInfo.uid,
        reference: vm.reference,
        branch: vm.branch,
        entry_type: 'Equity Allocation',
        description: vm.description,
        value_type: vm.valueType,
        equity_type: vm.equity_type,
        t_cost: vm.cost,
        transaction_type: vm.transactionType,
        last: moment().format('DD-MM-YYYY'),
        date: moment().format('DD-MM-YYYY'),
        month: moment().format('MM-YYYY'),
        timestamp: Date.now()
      }

      if (vm.transactionType == 'Credit') {
        equityAdd.deposit = vm.deposit
        equityAdd.loan_amount = vm.loanAmount
        equityAdd.loan_term = vm.loanTerm
        equityAdd.interest = vm.interest
        equityAdd.interest_type = vm.interestType
      }

      if (vm.uploaded_images) {
        equityAdd.documentation = vm.uploaded_images
      }

      let ref = this.$fireStore

        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('book')
        .collection('book')

      ref
        .add(equityAdd)
        .then(() => {
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
