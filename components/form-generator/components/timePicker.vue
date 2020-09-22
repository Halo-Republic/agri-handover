<template>
<div>
    <small>{{label}}</small>
    <br/>
  <flat-pickr style="width: 100%"
    :config="configdateTimePicker" @input="$emit('input', time)" v-model="time" placeholder="Choose time" />
  {{time}}
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
            time: null,
            configdateTimePicker: {
              enableTime: true,
              enableSeconds: true,
              noCalendar: true
            }
        }
    },
    components: {
        flatPickr
    }
}
</script>
        