<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div>
    <client-only>
      <div id="user-edit-tab-info">
        <!-- Avatar Row -->
        <div class="vx-row">
          <div class="w-full vx-col">
            <div class="flex flex-col items-start sm:flex-row">
              <img :src="data.logo" class="w-24 h-24 mr-8 rounded" />
              <div>
                <imageUpload
                  class="mb-2 mr-4 sm:mb-0"
                  label="Change Company Logo"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Content Row -->
        <div class="vx-row">
          <div class="w-full vx-col md:w-1/2">
            <vs-input
              class="w-full mt-4"
              label="Business Name"
              v-model="data_local.b_name"
              name="appname"
            />

            <!-- INDUSTRY -->

            <p class="mt-5">Industry</p>
            <v-select
              class="w-full "
              v-model="data_local.indstr"
              :options="categories"
            ></v-select>

            <p class="mt-5">Currency</p>
            <v-select
              class="w-full "
              v-model="data_local.currency"
              :options="currencies"
            ></v-select>
            <!--show Public-->
            <vs-switch
              class="mt-5"
              color="success"
              icon-pack="feather"
              vs-icon-on="icon-check-circle"
              vs-icon-off="icon-slash"
              v-model="data_local.public"
            >
              <span slot="on">Public</span>
              <span slot="off">Not Public</span>
            </vs-switch>
          </div>

          <div class="w-full vx-col md:w-1/2">
            <vs-input
              class="w-full mt-4"
              label="VAT"
              v-model="data_local.tax"
              name="tax"
            />

            <vs-textarea
              class="w-full mt-4"
              label="Description"
              v-model="data_local.desc"
              name="description"
            />

            <vs-input
              v-if="!changeAddress"
              disabled
              class="w-full mt-4"
              label="Address"
              v-model="data_local.for_address"
              name="address"
            />
            <vs-row class="mt-4">
              <p>Change Address?</p>
              <vs-checkbox v-model="changeAddress" />
            </vs-row>

            <auto-location v-if="changeAddress" class="mt-4" />
          </div>
        </div>

        <!-- Save  Button -->
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
import autoLocation from '@/components/charts-and-maps/maps/auto_location'
import Geohash from 'latlon-geohash'
import imageUpload from '@/components/form-generator/components/imageUpload.vue'

import firebase from 'firebase'

export default {
  components: {
    vSelect,
    autoLocation,
    imageUpload
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      changeAddress: false,
      geo1: 0,
      geo2: 0,
      geo3: 0,
      geo4: 0,
      geo5: 0,
      geo6: 0,
      geo7: 0,
      geo8: 0,
      geo9: 0,
      data_local: JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    categories() {
      return this.$store.state.app.industriesAvailable
    },
    currencies() {
      return this.$store.state.app.currencies
    },

    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    uploaded_images() {
      return this.$store.state.form.uploaded_images
    },
    google_place() {
      return this.$store.getters['google/google_place']
    },
    google_marker() {
      return this.$store.getters['google/google_marker']
    }
  },
  watch: {
    uploaded_images: function() {
      if (this.uploaded_images) {
        let vm = this

        let ref = vm.$fireStore
          .collection('apps')
          .doc('info')
          .collection('general')
          .doc(this.activeBusinessInfo.b_uid)
        ref
          .update({
            logo: this.uploaded_images[0]
          })
          .then(() => {
            vm.successUpload()
          })
      }
    },
    google_marker: function() {
      const geohash1 = Geohash.encode(
        `${this.google_marker.lat}`,
        `${this.google_marker.lng}`,
        1
      )
      this.geo1 = geohash1
      const geohash2 = Geohash.encode(
        `${this.google_marker.lat}`,
        `${this.google_marker.lng}`,
        2
      )
      this.geo2 = geohash2
      const geohash3 = Geohash.encode(
        `${this.google_marker.lat}`,
        `${this.google_marker.lng}`,
        3
      )
      this.geo3 = geohash3
      const geohash4 = Geohash.encode(
        `${this.google_marker.lat}`,
        `${this.google_marker.lng}`,
        4
      )
      this.geo4 = geohash4
      const geohash5 = Geohash.encode(
        `${this.google_marker.lat}`,
        `${this.google_marker.lng}`,
        5
      )
      this.geo5 = geohash5
      const geohash6 = Geohash.encode(
        `${this.google_marker.lat}`,
        `${this.google_marker.lng}`,
        6
      )
      this.geo6 = geohash6
      const geohash7 = Geohash.encode(
        `${this.google_marker.lat}`,
        `${this.google_marker.lng}`,
        7
      )
      this.geo7 = geohash7
      const geohash8 = Geohash.encode(
        `${this.google_marker.lat}`,
        `${this.google_marker.lng}`,
        8
      )
      this.geo8 = geohash8
      const geohash9 = Geohash.encode(
        `${this.google_marker.lat}`,
        `${this.google_marker.lng}`,
        9
      )
      this.geo9 = geohash9
      console.log('business address', this.activeBusinessInfo.b_uid)
      this.$fireStore
        .collection('apps')
        .doc('info')
        .collection('general')
        .doc(this.activeBusinessInfo.b_uid)
        .update({
          geo1: this.geo1,
          geo2: this.geo2,
          geo3: this.geo3,
          geo4: this.geo4,
          geo5: this.geo5,
          geo6: this.geo6,
          geo7: this.geo7,
          geo8: this.geo8,
          geo9: this.geo9,
          vicinity: this.google_place.vicinity,
          address_html: this.google_place.adr_address,
          formatted_address: this.google_place.formatted_address,
          utc_offset: this.google_place.utc_offset_minutes,
          address_url: this.google_place.url,
          lat: this.google_marker.lat,
          lng: this.google_marker.lng,
          geolocation: {
            lat: this.google_marker.lat,
            lng: this.google_marker.lng
          },

          vicinity: this.google_place.vicinity,
          addr_html: this.google_place.adr_address,
          for_address: this.google_place.formatted_address,
          lat: this.google_marker.lat,
          lng: this.google_marker.lng
        })
        .then(() => {
          //submit user to store
          let business = this.activeBusinessInfo

          ;(business.vicinity = this.google_place.vicinity),
            (business.addr_html = this.google_place.adr_address),
            (business.for_address = this.google_place.formatted_address),
            (business.lat = this.google_marker.lat),
            (business.lng = this.google_marker.lng)

          this.$store.commit('business/UPDATE_BUSINESS_INFO', business)
          this.productsUpdate()
          this.successUploadAddress()
        })
    }
  },
  methods: {
    productsUpdate() {
      console.log('1')
      let vm = this
      const collection = this.$fireStore
        .collection('agri-ensights')
        .doc('crm')
        .collection('products')

      const newDocumentBody = {
        addr: this.google_place.formatted_address
      }
      console.log('seller_id', this.activeBusinessInfo.b_uid)
      collection
        .where('seller_id', '==', this.activeBusinessInfo.b_uid)
        .get()
        .then(response => {
          let batch = vm.$fireStore.batch()
          response.docs.forEach(doc => {
            console.log('update')
            const docRef = collection.doc(doc.id)
            batch.update(docRef, newDocumentBody)
          })
          batch.commit().then(() => {
            console.log(`updated all documents inside ${collection}`)
          })
        })
    },
    successUploadAddress() {
      this.$vs.notify({
        color: 'success',
        title: 'Adress Success',
        text: 'Your Adress has been changed!'
      })
    },
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Update Success',
        text: 'Oh Yeah! Company info updated'
      })

      let logo = this.data_local.logo

      if (this.uploaded_images[0]) {
        logo = this.uploaded_images[0]
      }

      //submit user to store
      let business = this.activeBusinessInfo

      business.logo = logo
      ;(business.b_name = this.data_local.b_name),
        (business.indstr = this.data_local.indstr),
        (business.public = myPublic),
        (business.currency = this.data_local.currency),
        (business.tax = this.data_local.tax),
        (business.desc = this.data_local.desc)

      this.$store.commit('business/UPDATE_BUSINESS_INFO', business)
    },
    save_changes() {
      let myPublic = this.data_local.public
      if (this.data_local.public == undefined) {
        myPublic = false
      }
      this.$fireStore
        .collection('apps')
        .doc('info')
        .collection('general')
        .doc(this.activeBusinessInfo.b_uid)
        .update({
          b_name: this.data_local.b_name,
          indstr: this.data_local.indstr,
          public: myPublic,
          currency: this.data_local.currency,
          tax: this.data_local.tax,
          desc: this.data_local.desc
        })
        .then(() => {
          this.successUpload()
        })
    }
  }
}
</script>
