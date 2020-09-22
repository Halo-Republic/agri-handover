<template>
<div>
 <small>{{label}}</small>
 
 <div  v-if="!range">
   {{val}}
  <vs-slider text-fixed=%  @input="$emit('input', val)" v-model="val" :step='step' :step-decimals="decimals"  :max='max' :label="val" />

 </div>
 <div v-if="range">
   {{val2[0]}} - {{val2[1]}}
  <vs-slider  text-fixed=%   @input="$emit('input', val2)" v-model="val2" :step='step' :step-decimals="decimals" :min='min' :max='max' />

 </div>
</div>
   
</template>

<script>
export default {
 name: "TextInput",
  props: ["placeholder", "label", "name", "value", 'range', 'min', 'max', 'step', 'decimals'],
    data(){
        return{
                val: 5,
      val2:[this.min + 1,this.max - 1]
        }
    }

}
</script>

<style>

</style>