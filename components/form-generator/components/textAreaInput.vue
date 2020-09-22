<template>
  <div>
  
    <vs-textarea
      type="text"
      :name="name"
      :label="label"
      v-model="val"
      @input="$emit('input', val)"
      :placeholder="placeholder"
    />
  </div>
</template>
<script>
export default {
  name: "TextInput",
  props: ["placeholder", "label", "name", "value"],
  data() {
    return {
      val: ""
    };
  }
};
</script>
