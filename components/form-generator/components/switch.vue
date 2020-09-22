<template>
  <div>
      <small>{{ label }}</small>
      <vs-switch v-model="val" @input="$emit('input', val)" />
  </div>
</template>
<script>
export default {
  name: "SwitchSelect",
  props: ["options", "name", "label", "value"],
  data() {
    return {
      val: true
    };
  }
};
</script>
<style></style>
