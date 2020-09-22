<template>
  <client-only>
    <div>
      <vs-row vs-type="flex" vs-justify="center">
        <gmap-autocomplete
          @place_changed="setPlace"
          style="padding: 8px; border: none"
        ></gmap-autocomplete>
        <vs-button type="border" @click="addMarker">SEARCH</vs-button>
      </vs-row>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'GoogleMap',
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    }
  },

  mounted() {
    this.geolocate()
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place
      this.$store.dispatch('google/googlePlaceSearch', place)
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
        this.$store.dispatch('google/googleMarkerSearch', marker)
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
