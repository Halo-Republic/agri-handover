<template>
  <div>
    <div>
      <div v-if="edit" >
       <h6>Current</h6>
        <p v-html="placeholder"></p>
      </div>
     
      <br>
      <small>{{label}}</small>
      <br>
      
      <label> 
        <gmap-autocomplete
          @place_changed="setPlace"
          style="padding: 8px; color: black; border-width: 1px; z-index: 57000 "
        ></gmap-autocomplete>
        <vs-button @click="addMarker">Set Address</vs-button>
      </label>
      <br />

      <br />
      <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center=m.position"
        ></gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
// import Geohash from "latlon-geohash";
export default {
  name: "GoogleMap",
  props: ["placeholder", "label", "name", "value", "edit"],

  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
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
      geo9: 0,
      geoAll: ''
    };
  },

  mounted() {
    this.geolocate();
    console.log("place", this.placeholder)
  },

  watch: {
      currentPlace: function(){
           let payload = {
                markers: this.markers,
                places: this.places,
                currentPlace: this.currentPlace,
geoAll: this.geoAll
            }
      this.$emit('input', payload)
      },
      geoAll: function(){
           let payload = {
                markers: this.markers,
                places: this.places,
                currentPlace: this.currentPlace,
geoAll: this.geoAll
            }
      this.$emit('input', payload)
      }
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
      
     
    },
    addMarker() {
      if (this.currentPlace) {
      
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),

          lng: this.currentPlace.geometry.location.lng()
        };

        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        

        // const geohash1 = Geohash.encode(`${marker.lat}`, `${marker.lng}`, 1);
        // this.geo1 = geohash1;

        // const geohash2 = Geohash.encode(`${marker.lat}`, `${marker.lng}`, 2);
        // this.geo2 = geohash2;
        // const geohash3 = Geohash.encode(`${marker.lat}`, `${marker.lng}`, 3);
        // this.geo3 = geohash3;
        // const geohash4 = Geohash.encode(`${marker.lat}`, `${marker.lng}`, 4);
        // this.geo4 = geohash4;
        // const geohash5 = Geohash.encode(`${marker.lat}`, `${marker.lng}`, 5);
        // this.geo5 = geohash5;
        // const geohash6 = Geohash.encode(`${marker.lat}`, `${marker.lng}`, 6);
        // this.geo6 = geohash6;
        // const geohash7 = Geohash.encode(`${marker.lat}`, `${marker.lng}`, 7);
        // this.geo7 = geohash7;
        // const geohash8 = Geohash.encode(`${marker.lat}`, `${marker.lng}`, 8);
        // this.geo8 = geohash8;
        // const geohash9 = Geohash.encode(`${marker.lat}`, `${marker.lng}`, 9);
        // this.geo9 = geohash9;
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
        };
        this.geoAll = geoHashNew

     
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
       
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>
<style scoped>
</style>
