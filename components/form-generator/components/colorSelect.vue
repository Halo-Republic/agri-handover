<template>
  <div>
   <vs-chip :color="selectedColor">
      {{label}}
      </vs-chip>
      <br>
    <div>
      <div>
        
      </div>
      <br/>
      <ul class="clearfix">
        <!-- WHITE COLOR -->
        <li
          class="float-left w-10 h-10 m-2 bg-white border border-solid rounded-lg cursor-pointer border-grey-light"
          :class="navbarColorOptionClasses('#fff')"
          @click="ColorLocal = '#fff' "
        />

        <!-- THEME COLORS -->
        <li
          class="float-left w-10 h-10 m-2 rounded-lg cursor-pointer"
          :class="navbarColorOptionClasses(color)"
          :style="{backgroundColor: color}"
          v-for="color in themeColors"
          :key="color"
          :name="name"
          :value="value"
          @click="ColorLocal = color"
        />

        <!-- CUSTOM COLOR -->
        <li
          class="float-left w-10 h-10 m-2 rounded-lg cursor-pointer"
          :class="navbarColorOptionClasses(navbarColorOptionClasses)"
          :style="{backgroundColor: customNavbarColor}"
          @click="ColorLocal = customNavbarColor"
        />

        <li class="float-left">
          <input
                  label='Color'

            class="w-10 h-10 m-2 rounded-lg cursor-pointer"
            v-model="customNavbarColor"
            type="color"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "colorSelect",
  props: ["multi", "options", "name", "label", "value"],
  data() {
    return {
      themeColors: ["#7367F0", "#28C76F", "#EA5455", "#FF9F43", "#1E1E1E"],
      customPrimaryColor: "#3DC9B3",
      customNavbarColor: "#3DC9B3",
      selectedColor: ""
    };
  },
  methods: {
    colorChange() {
      console.log(this.selectedColor);
    }
  },
  watch: {
    selectedColor: function() {
      this.value = this.selectedColor;
      this.$emit('input', this.selectedColor)
    }
  },

  computed: {
    ColorLocal: {
      get() {
        return this.navbarColor;
      },
      set(val) {
        this.selectedColor = val;
        this.colorChange();
      }
    },
    // value: {
    //   get() {
    //     return this.navbarColor;
    //   },
    //   set(val) {
    //     this.selectedColor = val;
    //     this.colorChange();
    //   }
    // },
    navbarColorOptionClasses() {
      return color => {
        let classes = {};
        if (color == this.navbarColorLocal) classes["shadow-outline"] = true;
        if (this.navbarTypeLocal == "static")
          classes["cursor-not-allowed"] = true;
        return classes;
      };
    }
  }
};
</script>
