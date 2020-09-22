<!-- =========================================================================================
  File Name: UserEditTabSocial.vue
  Description: User Edit Social Tab content
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="user-edit-tab-info">
    <div class="vx-row">
      <!-- Col 1 -->
      <div class="w-full vx-col md:w-1/2">
        <vs-input
          class="w-full"
          v-model="data_local.twitter"
          icon-pack="feather"
          icon="icon-twitter"
          label="Twitter"
          icon-no-border
          name="twitter"
        />

        <vs-input
          class="w-full mt-4"
          v-model="data_local.facebook"
          icon-pack="feather"
          icon="icon-facebook"
          label="Facebook"
          icon-no-border
          name="facebook"
        />

        <vs-input
          class="w-full mt-4"
          v-model="data_local.instagram"
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
    },
    user_data() {
      return this.$store.state.user.app_displayed_user
    }
  },
  methods: {
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })

      let user = this.user_data

      ;(user.facebook = this.data_local.facebook),
        (user.github = this.data_local.github),
        (user.instagram = this.data_local.instagram),
        (user.linkedin = this.data_local.linkedin),
        (user.slack = this.data_local.slack),
        (user.twitter = this.data_local.twitter),
        (user.codepen = this.data_local.codepen)

      this.$store.commit('user/APP_DISPLAYED_USER', user)
    },
    save_changes() {
      this.$fireStore
        .collection('apps')
        .doc('users')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('info')
        .collection('social_links')
        .doc(this.user_data.uid)
        .update({
          facebook: this.data_local.facebook,
          github: this.data_local.github,
          instagram: this.data_local.instagram,
          linkedin: this.data_local.linkedin,
          slack: this.data_local.slack,
          twitter: this.data_local.twitter,
          codepen: this.data_local.codepen
        })
        .then(() => {
          this.successUpload()
        })
    }
  }
}
</script>
