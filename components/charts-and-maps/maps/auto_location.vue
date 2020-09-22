<template>
  <div>
    <div>
      <h5>Search and add location</h5>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace"
          style="padding: 8px; color: black; border-width: 1px; z-index: 5000000 "
        ></gmap-autocomplete>
        <vs-button @click="addMarker">Set Addressss</vs-button>
      </label>
      <br />

      <br />

      <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center = m.position"
        ></gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
// import Geohash from "latlon-geohash";
export default {
  name: 'GoogleMap',
  data() {
    return {
      // change this to whatever makes sense
      center: { lat: -25.8576, lng: 28.17035 },
      markers: [],
      places: [],
      currentPlace: null,
      geo1: 0,
      geo2: 0,
      geo3: 0,
      geo4: 0,
      geo5: 0,
      geo6: 0,
      geo7: 0,
      geo8: 0,
      geo9: 0
    }
  },

  created() {
    this.geolocate()
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place
      this.$store.dispatch('google/googlePlace', place)
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),

          lng: this.currentPlace.geometry.location.lng()
        }

        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
        this.$store.dispatch('google/googleMarker', marker)

        let geoHashNew = {
          geo1: this.geo1,
          geo2: this.geo2,
          geo3: this.geo3,
          geo4: this.geo4,
          geo5: this.geo5,
          geo6: this.geo6,
          geo7: this.geo7,
          geo8: this.geo8,
          geo9: this.geo9
        }

        this.$store.dispatch('google/geoHashSet', geoHashNew)
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
<style scoped></style>
