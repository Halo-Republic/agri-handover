<template><client-only>
  <vs-card class="penBar">
    <my-image-upload
      @upload-success="uploadImageSuccess"
      @before-remove="beforeRemove"
      @edit-image="editImage"
      @data-change="dataChange"
    ></my-image-upload>

    <vs-button @click="imagesSubmit" v-if="imagesLoaded">Add Image</vs-button>
  </vs-card>
</client-only></template>

 <script>
import myImageUpload from ".multi-image";
export default {
  components: { myImageUpload },
  data: () => ({
    images: [],
    imagesLoaded: false
  }),

  methods: {
    uploadImageSuccess(formData, index, fileList) {
      console.log("data", formData, index, fileList);
      console.log("fileList", fileList[0].path);
      // var img = new Image();
      // img.onload = function() {
      //   alert(this.width + "x" + this.height);
      // };
      // img.src = `${fileList[0].path}`;
      this.imagesLoaded = true;
      this.images = fileList;
    },
    beforeRemove(index, done, fileList) {
      console.log("index", index, fileList);
      var r = confirm("remove image");
      if (r == true) {
        done();
      } else {
      }
    },
    editImage(formData, index, fileList) {
      console.log("edit data", formData, index, fileList);
    },
    dataChange(data) {
      console.log(data);
    },
    imagesSubmit: function() {
      console.log("here it is", this.images);
      const payload = this.images;
      payload;
      this.$store.dispatch("drawInfo/imagesSet", payload);
      this.images = [];
    }
  }
};
</script>

<style scoped>
.penBar {
  position: absolute;
  top: 35%;
  left: 50px;
  width: 200px;
  z-index: 500000;
}
</style>