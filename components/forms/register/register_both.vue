<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Page
    ----------------------------------------------------------------------------------------
========================================================================================== -->

<template>
  <div
    class="flex items-center justify-center w-full h-screen bg-img vx-row no-gutter"
  >
    <div class="m-4 vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
            <div
              class="self-center hidden mx-auto vx-col sm:hidden md:hidden lg:block lg:w-1/2"
            >
              <img
                :src="$store.state.business.app_active_business.logo"
                alt="register"
                style="max-width: 300px"
                class="mx-auto"
              />
            </div>
            <div
              class="self-center mx-auto vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg"
            >
              <div class="px-8 pt-8 register-tabs-container">
                <div class="mb-4 vx-card__title">
                  <h4 class="mb-4">Create Account</h4>
                  <p>Fill the below form to create a new account.</p>
                </div>
                <vs-tabs>
                  <vs-tab label="Buyer">
                    <register-firebase></register-firebase>
                  </vs-tab>
                  <vs-tab label="Sellers">
                    <register-phone></register-phone>
                  </vs-tab>
                </vs-tabs>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import RegisterFirebase from '@/components/forms/register/both/buyer.vue'
import RegisterPhone from '@/components/forms/register/both/seller.vue'

export default {
  layout: 'full_page',

  components: {
    RegisterFirebase,
    RegisterPhone
  },
  computed: {}
}
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 517px;

  .con-tab {
    padding-bottom: 23px;
  }
}
</style>
