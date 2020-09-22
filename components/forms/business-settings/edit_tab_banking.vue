<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
========================================================================================== -->

<template>
  <div>
    <client-only>
      <div id="user-edit-tab-info">
        <div class="vx-row">
          <div class="w-full vx-col md:w-1/2">
            <!-- Col Header -->
            <div class="flex items-end">
              <feather-icon icon="UserIcon" class="mr-2" svgClasses="w-5 h-5" />
              <span class="font-medium leading-none">Personal Information</span>
            </div>
            <!-- Col Content -->
            <div>
              <vs-input
                class="w-full mt-4"
                label="Bank"
                v-model="data_local.bank"
                type="company"
                name="company"
              />

              <vs-input
                class="w-full mt-4"
                label="Account Type"
                v-model="data_local.acc_type"
                name="name"
              />

              <vs-input
                class="w-full mt-4"
                label="Account Number"
                v-model="data_local.acc_num"
                name="surname"
              />

              <vs-input
                class="w-full mt-4"
                label="Branch Number"
                v-model="data_local.br_num"
                type="number"
                name="number"
              />
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row">
          <div class="w-full vx-col">
            <div class="flex flex-wrap items-center justify-end mt-8">
              <vs-button class="mt-2 ml-auto" @click="save_changes"
                >Save Changes</vs-button
              >
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      data_local: JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    }
  },
  methods: {
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })

      let business = this.activeBusinessInfo

      ;(business.bank = this.data_local.bank),
        (business.acc_type = this.data_local.acc_type),
        (business.acc_num = this.data_local.acc_num),
        (business.br_num = this.data_local.br_num),
        this.$store.commit('business/UPDATE_BUSINESS_INFO', business)
    },
    save_changes() {
      this.$fireStore
        .collection('apps')
        .doc('info')
        .collection('general')
        .doc(this.activeBusinessInfo.b_uid)
        .update({
          bank: this.data_local.bank,
          acc_type: this.data_local.acc_type,
          acc_num: this.data_local.acc_num,
          br_num: this.data_local.br_num
        })
        .then(() => {
          this.successUpload()
        })
    }
  }
}
</script>
