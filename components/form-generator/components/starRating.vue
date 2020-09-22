<template>
  <div>
       <small>{{label}}</small>
  <star-rating :rtl="$vs.rtl" :max-rating="max" v-model="val"  :increment="increment"></star-rating>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
        name: "DatePicker",
  props: ["name", "label", 'max', 'increment', 'submittedData'],
  components: {
    StarRating
  },
  data(){
      return{
          val: 1
      }
  },
  watch: {
      submittedData: function(){
          console.log('submiterer', this.submittedData)
          this.val = this.submittedData
      },
     
      val: function(){
          this.ratingNow()
      }
  },
  created(){
          console.log('submitsdfaerer', this.submittedData)

  },
 methods: {
      ratingNow(){
       
          this.$emit('input', this.val)

      }
  }


}
</script>

<style>

</style>