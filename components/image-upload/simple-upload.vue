<template><client-only>
  <form enctype="multipart/form-data">
    <div class="field">
      <label for="file" class="label">Upload file</label>
      <input label='Upload File' type="file" @change="selectFile" ref="file" />
    </div>
    <div class="field">
      <vs-button class="button is-info" @click="sendFile">Send</vs-button>
    </div>
  </form>
</client-only></template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      file: "",
      message: '',
      error: false
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    async sendFile() {
      const formData = new FormData();

      formData.append("file", this.file);

      try {
        await axios.post("http://localhost:3128/upload", formData);
        this.message = "File has been uploaded"
        this.file = ''
        this.error = false
      } catch (error) {
        console.log(error);
        this.message = "somehting went wrong"
        this.error = true

      }
    }
  }
};
</script>

<style>
</style>