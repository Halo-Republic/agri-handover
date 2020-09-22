<template>
<div>
<small>{{label}}</small>
<div v-if="front = 'front'">
  true
  <datepicker  placeholder="Select Date" v-model="date"  @input="$emit('input', momentDate)"></datepicker>

</div>
<div v-else>
  <datepicker placeholder="Select Date" v-model="date"  @input="$emit('input', date)"></datepicker>
  {{date}}
</div>

 
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'

export default {
 name: "DatePicker",
  props: ["name", "label", "front"],
data() {
    return {
      date: null,
      momentDate: moment(this.date).format('YYYY-MM-DD')
    }
  },
  watch: {
    date(){
      console.log('moment', this.date)
      this.momentDate = moment(this.date).format('YYYY-MM-DD')
    }
  },
  computed: {
    testDate (){
      return moment(this.date).format('YYYY-MM-DD')
    }
  },
  components: {
    Datepicker
  }
}
</script>