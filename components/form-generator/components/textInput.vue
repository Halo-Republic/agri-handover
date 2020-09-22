<template>
  <div>
   
    <vs-input
      :type="textType"
      :name="name"
      :label="label"
      v-model="val"
      @input="$emit('input', val, input)"
      :placeholder="placeholder"
      class="w-full mb-3"
     
    />
  </div>
</template>
<script>
export default {
  name: "TextInput",
  props: ["placeholder", "label", "name", "value", "textType"],
  data(){
    return {
      val: '',
      input: {
          fieldType: "TextInput",
          placeholder: this.placeholder,
          label: this.label,
          name: this.name,
          val: this.val
      }
    }
  },
  created(){
    this.$emit('input', this.val, this.input)
  }
};
</script>
 