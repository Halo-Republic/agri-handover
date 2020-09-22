<template>
  <div>
    <div>
      <small>{{ label }}</small>
      <ul class="w-full mb-3">
        <li v-for="option in options" :key="option">
          <!-- <input
            type="radio"
            :name="name"
            :value="option"
            @input="$emit('input',
           $event.target.value)"
       
          />
          {{option}} -->

          <vs-radio
            @input="$emit('input', val)"
            v-model="val"
            :vs-value="option"
            >{{ option }}</vs-radio
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "radioButtons",
  props: ["options", "name", "label", "value"],
  data() {
    return {
      val: "dark"
    };
  },
  created() {
    console.log("options", this.options);
  }
};
</script>
