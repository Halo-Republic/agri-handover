<template>
  <div>
    <label>{{name}}</label>
     <vs-input-number v-model="val" :label="name"  :step='step' :step-decimals="decimals" :min='min' :max='max'  @input="$emit('input', val)"/>
  </div>
</template>
<script>
export default {
  name: "NumberInput",
  props: ["placeholder", "label", "name", "value", 'range', 'min', 'max', 'step', 'decimals'],
  data(){
    return{
      val: this.min +1,
    }
  }
};
</script>
