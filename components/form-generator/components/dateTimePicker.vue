<template>
<div>

<small>{{label}}</small>
  <flat-pickr :config="configdateTimePicker"  @input="$emit('input', datetime)" v-model="datetime" placeholder="Date Time" />

</div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
     name: "DatePicker",
  props: ["name", "label", ],
    data() {
        return {
            datetime: null,
            configdateTimePicker: {
              enableTime: true,
              dateFormat: 'd-m-Y H:i'
            }
        }
    },
    components: {
        flatPickr
    }
}
</script>