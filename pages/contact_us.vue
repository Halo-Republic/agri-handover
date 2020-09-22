<template>
  <div>
    <div>
      <topScroll style="margin-top: 80px; margin-bottom: 10px" />

      <vs-row vs-w="12">
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="3"
          vs-sm="3"
          vs-xs="12"
        >
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="6"
          vs-sm="6"
          vs-xs="12"
        >
          <vx-card
            style="background: rgba(255, 255, 255, 0.3)"
            class="margin: 10%"
          >
            <!-- <img src="../static/logo.png" class="center"/>
            <vs-divider></vs-divider>
            <div class="text-center">
              <h4>Agri Ensights</h4> 
            </div>-->
            <!-- <vs-avatar class="block mx-auto my-6" size="80px" :src=" contact.downloadURL " /> -->
            <div class="mt-6 mb-8 text-center">
              <p>
                Agri Ensights vision is to become the trusted enabler of Agri
                businesses
              </p>
            </div>

            <vs-row
              vs-align="flex-start"
              vs-type="flex"
              vs-justify="center"
              vs-w="12"
            >
              <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                <!-- <a :href="`${contact.website}`" target="_blank">
                  <vs-button
                    :style="
                    `background-size: cover; background-repeat: no-repeat;`
                  "
                    icon="web"
                  ></vs-button>
                </a> -->
                <a href="tel:0839792558" target="_blank">
                  <vs-button
                    :style="
                      `background-size: cover; background-repeat: no-repeat; background-color: `
                    "
                    icon="speaker_phone"
                    class="ml-2"
                  ></vs-button>
                </a>
                <a href="mailto:info@agriensights.co.za" target="_blank">
                  <vs-button
                    :style="
                      `background-size: cover; background-repeat: no-repeat;  `
                    "
                    icon="mail"
                    class="ml-2"
                  ></vs-button>
                </a>
                <!-- <a
                  :href="
                  `http://www.google.com/maps/place/${contact.lat},${contact.lng}`
                "
                  target="_blank"
                >
                  <vs-button
                    :style="
                    `background-size: cover; background-repeat: no-repeat;    `
                  "
                    icon="location_on"
                    class="ml-2"
                  ></vs-button>
                </a> -->
              </vs-col>
            </vs-row>
            <vs-divider></vs-divider>

            <h2 class="mt-8 mx-auto">Send us a mail</h2>
            <div class="vx-row">
              <div class="vx-col sm:w-1/2 w-full mb-2">
                <vs-input
                  class="w-full"
                  label-placeholder="First Name"
                  v-model="name"
                />
              </div>
              <div class="vx-col sm:w-1/2 w-full mb-2">
                <vs-input
                  class="w-full"
                  label-placeholder="Last Name"
                  v-model="surname"
                />
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col sm:w-1/2 w-full mb-2">
                <vs-input
                  class="w-full"
                  label-placeholder="City"
                  v-model="city"
                />
              </div>
              <div class="vx-col sm:w-1/2 w-full mb-2">
                <vs-input
                  class="w-full"
                  label-placeholder="Country"
                  v-model="country"
                />
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col sm:w-1/2 w-full mb-2">
                <vs-input
                  class="w-full"
                  label-placeholder="Company"
                  v-model="company"
                />
              </div>
              <div class="vx-col sm:w-1/2 w-full mb-6">
                <vs-input
                  type="email"
                  class="w-full"
                  label-placeholder="Email"
                  v-model="email"
                />
              </div>
            </div>
            <div>
              <vs-textarea label="Message" v-model="textarea" />
            </div>

            <div class="vx-row">
              <div class="vx-col w-full">
                <vs-button class="mr-3 mb-2" @click="submitMail"
                  >Submit</vs-button
                >
                <vs-button
                  color="warning"
                  type="border"
                  class="mb-2"
                  @click="
                    input25 = input26 = input27 = input28 = input29 = input30 =
                      ''
                    check7 = false
                  "
                  >Reset</vs-button
                >
              </div>
            </div>
          </vx-card>
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="3"
          vs-sm="3"
          vs-xs="12"
        >
        </vs-col>
      </vs-row>

      <whatsapp />
    </div>
  </div>
</template>

<script>
import topScroll from '@/components/topScroll/index'
import whatsapp from '@/components/whatsapp/index'

import cardProfile from '@/components/ui-elements/card/CardProfile'
export default {
  components: { cardProfile, topScroll, whatsapp },
  data() {
    return {
      name: '',
      surname: '',
      city: '',
      country: '',
      company: '',
      email: '',
      textarea: '',

      isMounted: false
    }
  },
  computed: {
    b_uid() {
      return this.$store.getters['b_uid']
    },
    componentDetails() {
      return this.$store.getters['feature/componentDetails']
    },
    companyDetails() {
      return this.$store.getters['app/companyDetails']
    },
    route() {
      return this.$store.getters['route/route']
    },
    routeID() {
      return this.$store.getters['route/routeID']
    },
    componentID() {
      return this.$store.getters['feature/componentID']
    },
    routeDisplayName() {
      return this.$store.getters['route/routeDisplayName']
    },
    routeName() {
      return this.$store.getters['route/routeName']
    },
    is_blank() {
      return this.$store.getters['route/isBlank']
    },
    resellerName() {
      return this.$store.getters['app/resellerName']
    }
  },
  methods: {
    submitMail() {
      let ref = this.$fireStore
        .collection('all')
        .doc('forms')
        .collection('contact_us')
      ref
        .add({
          name: this.name,
          surname: this.surname,
          city: this.city,
          country: this.country,
          company: this.company,
          email: this.email,
          textarea: this.textarea
        })
        .then(() => {
          this.successUpload()
          ;(this.name = ''),
            (this.surname = ''),
            (this.city = ''),
            (this.country = ''),
            (this.company = ''),
            (this.email = ''),
            (this.textarea = '')
        })
    },
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Message Sent',
        text: 'We will get back to you ASAP'
      })
    }
  }
}
</script>

<style lang="scss">
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
