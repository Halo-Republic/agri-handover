<template>
  <div>
    <small>{{label}}</small>
    <!-- <select
      :multiple="multi"
      :value="value"
      @input="$emit('input',
           $event.target.value)"
      class="w-full mb-3"
    style="border: solid 1px grey; padding: 10px; color: grey"
    >
      <option v-for="option in options" :key="option" class="optionStyle">{{option.displayName}}</option>
    </select> -->

     <vs-select v-model="val" class="w-full select-large" label="City"   @input="$emit('input',
           $event.target.value)">
    <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in options" class="w-full" />
    </vs-select>
  </div>
</template>
<script>
export default {
  name: "SelectList",
  props: ["multi", "options", "name", "label", "value"],
  data(){
    return{
      val: ''
    }
  }
};

</script>

<style >
.optionStyle {
  color: grey
}
</style>
