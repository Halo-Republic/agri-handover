<template><client-only>
  <div>
    <div id="app">
      <div class="w-full mt-5">
        <h2>{{title}}</h2>
        <input class="mb-2 mr-4 sm:mb-0" label='Image Upload' color='primary' type="file" multiple @change="onFileChange" />
      </div>
      <div v-if="images">
        <div v-for="(image, index) in images" :key="index">
          <img :src="image" style="height: 250px" />
          <button @click="removeImage(index)">Remove image</button>
        </div>
      </div>
    </div>
  </div>
</client-only></template>
<script>
export default {
  props: ["title"],
  data() {
    return {
      name: "",
      appname: "",
      description: "",
      uploadTask: "",
      images: [],
      comp: [],
      radios: true,
      address: "",
      industry: "",
      imageName: "",
      imageFile: "",
      imageUrls: "",
      component: ""
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.createImage(files);
    },
    createImage(files) {
      var vm = this;
      for (var index = 0; index < files.length; index++) {
        this.imageName = files[0].name;
        var reader = new FileReader();
        var getImage = "";
        reader.onload = function(event) {
          const imageUrl = event.target.result;
          getImage = event.target.result;
          vm.images.push(imageUrl);
        };

        this.imageUrls = this.images;
        this.imageFile = files[0];
        reader.readAsDataURL(files[index]);
      }
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    newApp() {

      this.$store.dispatch("form/imageName", this.imageName);
      this.$store.dispatch("form/imageUrls", this.imageUrls);
      this.$store.dispatch("form/imageFile", this.imageFile);
    }
  },
  watch: {
    imageUrls: function() {
      this.newApp();
    }
  }
};
</script>
