<template>
<div>
<div v-if="edit" class='mx-4 my-6' >
       <h6>Current - {{label}}</h6>
        <p v-html="placeholder"></p>
      </div>
    <small>{{ label }}</small>
  <quill-editor v-model="content"   @input="$emit('input', content)"></quill-editor>

</div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
      name: "QuilEditor",
  props: ["name", "label", "edit", "placeholder"],
  data() {
    return {
      content: ``,
    }
  },
  components: {
    quillEditor,
  },
  created(){
    if(this.edit){
      console.log('this.pla', this.placeholder)
      this.content = this.placeholder
    }
  }
}
</script>