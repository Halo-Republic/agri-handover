<template>
  <div id="theme-customizer">
    <vs-button
      color="primary"
      type="filled"
      icon-pack="feather"
      icon="icon-settings"
      @click="popupActivo4 = true"
      >Add Sub Category</vs-button
    >
    <vs-popup title="Product Categories" :active.sync="popupActivo4">
      <div
        class="flex items-center justify-between px-6 mt-6 customizer-header"
      >
        <div>
          <h4>Add a Sub Category</h4>
          <!-- <small>Let's do this</small> -->
        </div>
        <feather-icon
          icon="XIcon"
          @click.stop="active = false"
          class="cursor-pointer"
        ></feather-icon>
      </div>
      <vs-divider class="mb-0"></vs-divider>
      <p class="mt-5">Category</p>
      <v-select
        label="category"
        class="w-full "
        v-model="cat"
        :options="cats"
      ></v-select>
      <vs-input
        label="Sub Category"
        name="assetname"
        v-model="sub_cat"
        class="w-full mt-5"
      />

      <div class="flex flex-wrap items-center justify-center p-6">
        <vs-button class="mr-6" @click="newCategoryAdd">Add Data</vs-button>
        <vs-button type="border" color="danger" @click="active = false"
          >Cancel</vs-button
        >
      </div>
      <div class="px-4">
        <vs-chip color="primary" v-for="cat in categories" :key="cat">
          {{ cat }}
        </vs-chip>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import FormGenerator from '@/components/form-generator/formGenerator'
import moment from 'moment'
import vSelect from 'vue-select'
import firebase from 'firebase'
export default {
  props: ['categories', 'brands'],
  data() {
    return {
      popupActivo4: false,
      configdateTimePicker: {
        enableTime: true,
        enableSeconds: true,
        noCalendar: true
      },
      Categories: [''],
      formData: {},
      htmlForEditor: '',
      sub_cat: '',
      active: false,
      date: null,
      cats: [],
      cat: '',

      time: null,
      dateEnd: null,
      timeEnd: null,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    }
  },
  // watch: {

  // },
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    },
    activeCompanyInfo() {
      return this.$store.state.crm.company
    },
    formStyle() {
      return [
        {
          fieldType: 'TextInput',
          placeholder: 'Category',
          label: 'Category',
          name: 'Category',
          type: 'text'
        }
      ]
    }
  },

  mounted() {
    let docBrands = this.$fireStore
      .collection('agri-ensights')
      .doc('crm')
      .collection('categories')

    docBrands.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc
        this.cats.push({
          category: doc.data().category,
          subcategory: doc.data().subcategory
        })
      })
    })
  },
  methods: {
    frontChange() {
      this.front = !this.front
    },
    newCategoryAdd() {
      console.log('adding DATA')
      let vm = this
      console.log('cat', this.cat)

      let docR
      docR = this.$fireStore
        .collection('agri-ensights')
        .doc('crm')
        .collection('categories')
        .doc(this.cat.category)

      docR
        .update({
          subcategory: firebase.firestore.FieldValue.arrayUnion(this.sub_cat)
        })
        .then(function() {
          vm.successUpload()
        })
        .catch(function(error) {
          vm.noSuccessUpload(error)
        })
      this.active = false
    },
    noSuccessUpload(err) {
      this.$vs.notify({
        color: 'red',
        title: 'Oops! Something wrong',
        text: `Here it is: ${err}`
      })
    },
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })
    }
  },

  components: {
    FormGenerator,
    vSelect
  }
}
</script>

<style lang="scss">
#theme-customizer {
  .vs-sidebar {
    position: fixed;
    z-index: 520;
    width: 400px;
    max-width: 90vw;
  }
}
.pac-container {
  z-index: 52011;
  background-color: inherit;
}
textarea {
  background-color: inherit;
  color: white;
}
select {
  background-color: inherit;
  color: white;
}
.customizer-btn {
  position: fixed;
  top: 50%;
  right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 500;

  .vs-icon {
    animation: spin 1.5s linear infinite;
  }
}

.scroll-area--customizer {
  height: calc(100% - 5rem);
}
</style>
