<template>
  <div id="app" v-cloak>
    <div v-if="errorStr">
      Sorry, but the following error occurred: {{ errorStr }}
    </div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>

    <div>
      Your location data is:
      <br />
      {{ lat }}, {{ lng }}
    </div>

    <div v-if="address">
      {{ address }}
    </div>
    <vs-button class="my-2 ml-12" @click="getAddress()"
      >Get Location Data</vs-button
    >
    <div>
      <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
        <gmap-marker :position="center"></gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      location: null,
      gettingLocation: false,
      errorStr: null,
      mapStr: null,
      address: null,
      lat: 0,
      lng: 0,
      center: { lat: -25.32, lng: 28.2 }
    }
  },

  methods: {
    async getStreetAddressFrom(lat, long) {
      try {
        var { data } = await axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            lat +
            ',' +
            long +
            '&key=AIzaSyD71CLr4Y5Il5MHYyi6FcBVyspOnS6t1is'
        )

        if (data.error_message) {
          let errorStr = error.message
        } else {
          this.address = data.results[0].formatted_address
          let payload = data.results[0]
          this.$store.commit('google/MANUAL_SET', payload)
        }
      } catch (error) {
        this.errorStr = error.message
      }
    },
    getAddress() {
      let vm = this
      if (process.client) {
        // check for Geolocation support
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              vm.getStreetAddressFrom(
                position.coords.latitude,
                position.coords.longitude
              )
              vm.lat = position.coords.latitude
              vm.lng = position.coords.longitude

              vm.center.lat = position.coords.latitude
              vm.center.lng = position.coords.longitude
            },
            error => {
              vm.errorStr = error.message
              this.handlePermission()
            }
          )
        } else {
          this.$vs.notify({
            title: 'Not supported',
            text: 'Geolocation is not supported for this Browser/OS.',
            color: 'warning'
          })
        }
      }
    },
    handlePermission() {
      let vm = this
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function(result) {
          if (result.state == 'granted') {
            vm.report(result.state)
            // geoBtn.style.display = 'none';
          } else if (result.state == 'prompt') {
            vm.report(result.state)
            // geoBtn.style.display = 'none';
            navigator.geolocation.getCurrentPosition(
              revealPosition,
              positionDenied,
              geoSettings
            )
          } else if (result.state == 'denied') {
            vm.report(result.state)
            // geoBtn.style.display = 'inline';
          }
          result.onchange = function() {
            vm.report(result.state)
          }
        })
    },

    report(state) {
      this.$vs.notify({
        title: 'Permission',
        text: `Permission ${state}`,
        color: 'primary'
      })
    }
  },

  created() {
    //do we support geolocation
  }
}
</script>
