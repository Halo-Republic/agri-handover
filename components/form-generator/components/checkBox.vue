<template>
  <div>
    <div>
      <small>{{ label }}</small>
      <ul class="w-full mt-3 mb-3">
        <li v-for="(option, index) in options" :key="option">
          <vs-checkbox
            @input="$emit('input', options)"
            v-model="options[index].selected"
            >{{ option.name }}</vs-checkbox
          >
        </li>
      </ul>
       
    </div>
  </div>
</template>
<script>
export default {
  name: "radioButtons",
  props: ["options", "name", "label", "value", "valueIn"],
  data() {
    return {
      val: "",
      selected: [],
      selectedTrue: [],
    };
  },
  watch: {
    option: function() {
      this.optionss();
    },
    selected: function() {
      this.selecteds();
    }
  },
  created() {
    console.log('pop', this.options)
    // for (let i = 0; i < this.options.length; i++) {
    //   this.selectedTrue.push({
    //     name: this.options[i],
    //     selected: false
    //   });
    // }
  }
};
</script>
