<!-- =========================================================================================
  File Name: UserEditTabSocial.vue
  Description: User Edit Social Tab content
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div>
    <client-only>
      <div id="user-edit-tab-info">
        <div class="vx-row">
          <!-- Col 1 -->
          <div class="w-full vx-col md:w-1/2">
            <vs-input
              class="w-full"
              v-model="data_local.twt"
              icon-pack="feather"
              icon="icon-twitter"
              label="Twitter"
              icon-no-border
              name="twitter"
            />

            <vs-input
              class="w-full mt-4"
              v-model="data_local.fb"
              icon-pack="feather"
              icon="icon-facebook"
              label="Facebook"
              icon-no-border
              name="facebook"
            />

            <vs-input
              class="w-full mt-4"
              v-model="data_local.insta"
              icon-pack="feather"
              icon="icon-instagram"
              label="Instagram"
              icon-no-border
              name="instagram"
            />
          </div>

          <!-- Col 2 -->
          <div class="w-full vx-col md:w-1/2">
            <vs-input
              class="w-full mt-4 md:mt-0"
              v-model="data_local.github"
              icon-pack="feather"
              icon="icon-github"
              label="GitHub"
              icon-no-border
              name="github"
            />

            <vs-input
              class="w-full mt-4"
              v-model="data_local.codepen"
              icon-pack="feather"
              icon="icon-codepen"
              label="CodePen"
              icon-no-border
              name="codepen"
            />

            <vs-input
              class="w-full mt-4"
              v-model="data_local.slack"
              icon-pack="feather"
              icon="icon-slack"
              label="Slack"
              icon-no-border
              name="slack"
            />
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
export default {
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

      ;(business.fb = this.data_local.fb),
        (business.github = this.data_local.github),
        (business.insta = this.data_local.insta),
        (business.linkedin = this.data_local.linkedin),
        (business.slack = this.data_local.slack),
        (business.twt = this.data_local.twt),
        (business.codepen = this.data_local.codepen)

      this.$store.commit('business/UPDATE_BUSINESS_INFO', business)
    },
    save_changes() {
      this.$fireStore
        .collection('apps')
        .doc('info')
        .collection('social_links')
        .doc(this.activeBusinessInfo.b_uid)
        .update({
          fb: this.data_local.fb,
          github: this.data_local.github,
          insta: this.data_local.insta,
          linkedin: this.data_local.linkedin,
          slack: this.data_local.slack,
          twt: this.data_local.twt,
          codepen: this.data_local.codepen
        })
        .then(() => {
          this.successUpload()
        })
    }
  }
}
</script>
