<!-- =========================================================================================
  File Name: UserEditTabSocial.vue
  Description: User Edit Social Tab content
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div>
    <client-only>
      <div id="user-edit-tab-info">
        <vs-list>
          <vs-list-header title="Product Types"></vs-list-header>
          <vs-list-item
            title="Add Product Types"
            subtitle="These are the product types that your business have"
            class="mb-5"
          >
            <vs-row>
              <v-select
                v-model="s_types"
                :clearable="false"
                :options="salesTypes"
                multiple
                name="role"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
              <vs-button @click="save('s_types')">+</vs-button>
            </vs-row>
          </vs-list-item>
          <vs-list-item
            :title="targets"
            v-for="(targets, i) in activeBusinessInfo.s_types"
            :key="i"
          >
            <vs-button
              type="border"
              color="danger"
              icon="delete"
              size="small"
              @click="deleteItem('s_types', targets, i)"
            ></vs-button>
          </vs-list-item>
          <vs-divider color="success" icon="check"></vs-divider>
          <vs-list-header title="Customer Groups"></vs-list-header>
          <vs-list-item
            title="Add Customer Groups"
            subtitle="You will be able to set customers to special groups"
            class="mb-5"
          >
            <vs-row>
              <vs-input v-model="c_grps" name="company" />

              <vs-button @click="save('c_grps')">+</vs-button>
            </vs-row>
          </vs-list-item>
          <vs-list-item
            :title="customer"
            v-for="(customer, i) in activeBusinessInfo.c_grps"
            :key="i"
          >
            <vs-row>
              <vs-button
                type="border"
                color="danger"
                icon="delete"
                size="small"
                @click="deleteItem('c_grps', customer, i)"
              ></vs-button>
              <vs-button
                @click="editItem('c_grps', customer, i)"
                color="primary"
                type="border"
                icon="edit"
                size="small"
                class="ml-5"
              ></vs-button>
            </vs-row>
          </vs-list-item>
        </vs-list>

        <vs-popup
          class="holamundo"
          :title="selectedGroup.branch"
          :active.sync="popupCustomerGroup"
          style="z-index: 1000;  "
        >
          <div class="mt-4">
            <div class="mx-8 mb-8">
              <ul>
                <li>
                  <b>Visit every</b> {{ selectedGroup.visit }} <b> days!</b>
                </li>
                <li>
                  <b>Discounts:</b> {{ selectedGroup.discount }} <b> %</b>
                </li>
              </ul>
            </div>
            <label class="vs-input--label"
              >Please fill for customer group:</label
            >

            <form-generator
              :schema="formStyle"
              v-model="formData"
              class="p-6"
            ></form-generator>
          </div>
          <div class="vx-row">
            <div class="w-full vx-col">
              <div class="flex flex-wrap items-center justify-end mt-8">
                <vs-button class="mt-2 ml-auto" @click="save_changes"
                  >Save Changes</vs-button
                >
                <vs-button
                  class="mt-2 ml-4"
                  type="border"
                  color="warning"
                  @click="popupCustomerGroup = !popupCustomerGroup"
                  >Cancel</vs-button
                >
              </div>
            </div>
          </div>
        </vs-popup>
      </div>
    </client-only>
  </div>
</template>

<script>
import firebase from 'firebase'
import vSelect from 'vue-select'
import formGenerator from '@/components/form-generator/formGenerator'
import moment from 'moment'

export default {
  components: {
    vSelect,
    formGenerator
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      salesTypes: ['Digital', 'Physical', 'Services'],
      s_types: '',
      c_grps: '',

      formStyle: [
        {
          fieldType: 'TextInput',
          placeholder: 'How often should visit?',
          label: 'How often should visit?',
          name: 'visit',
          type: 'number'
        },
        {
          fieldType: 'TextInput',
          placeholder: 'Discount',
          label: 'Discount',
          name: 'discount',
          type: 'number'
        }
      ],

      popupCustomerGroup: false,
      formData: {},

      selectedGroup: {},

      data_local: JSON.parse(JSON.stringify(this.data))
    }
  },

  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    }
  },
  methods: {
    deleteItem(type, data, i) {
      let vm = this

      this.$fireStore
        .collection('apps')
        .doc('info')
        .collection('groups')
        .doc(this.activeBusinessInfo.b_uid)
        .update({
          [type]: firebase.firestore.FieldValue.arrayRemove(data)
        })
        .then(() => {
          vm.successDelete(type, i)
        })
    },

    save(type) {
      let vm = this
      let collection = ''
      let data = []
      if (type === 's_types') {
        collection = 's_types'
        data = vm.s_types
      } else if (type === 'c_grps') {
        collection = 'c_grps'
        data.push(vm.c_grps)
      } else {
        vm.unsuccessUpload()
      }
      for (let i = 0; i < data.length; i++) {
        vm.$fireStore
          .collection('apps')
          .doc('info')
          .collection('groups')
          .doc(vm.activeBusinessInfo.b_uid)
          .update({
            [collection]: firebase.firestore.FieldValue.arrayUnion(data[i])
          })
          .then(() => {
            vm.successUpload(collection, data[i])
          })
      }
    },
    unsuccessUpload() {
      this.$vs.notify({
        color: 'danger',
        title: 'Oops',
        text: 'Something went wrong'
      })
    },

    successUpload(collection, value) {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })

      let business = this.activeBusinessInfo

      business[collection].push(value)

      this.$store.commit('business/UPDATE_BUSINESS_INFO', business)
    },
    successUpdate(collection, value) {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })
    },
    successDelete(collection, i) {
      this.$vs.notify({
        color: 'warning',
        title: 'Delete Success',
        text: 'Whoop whoop, been deleted'
      })

      let business = this.activeBusinessInfo
      let items = {}

      items = business[collection]
      const filteredItems = items
        .slice(0, i)
        .concat(items.slice(i + 1, items.length))
      business[collection] = filteredItems

      this.$store.commit('business/UPDATE_BUSINESS_INFO', business)
    },
    editItem(type, data, i) {
      let vm = this
      let collection = ''

      collection = 'c_grps'
      this.$fireStore
        .collection('apps')
        .doc('info')
        .collection('groups')
        .doc(vm.activeBusinessInfo.b_uid)
        .collection('c_grps')
        .doc(data)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            vm.selectedGroup = doc.data()
            vm.selectedGroup.id = doc.id
            vm.popupCustomerGroup = true
          } else {
            vm.$fireStore
              .collection('apps')
              .doc('info')
              .collection('groups')
              .doc(vm.activeBusinessInfo.b_uid)
              .collection('c_grps')
              .doc(data)
              .set({
                customer_group: data
              })
              .then(() => {
                vm.editItem(type, data, i)
              })
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    },

    save_changes() {
      let vm = this

      this.$fireStore
        .collection('apps')
        .doc('info')
        .collection('groups')
        .doc(vm.activeBusinessInfo.b_uid)
        .collection('c_grps')
        .doc(vm.selectedGroup.id)
        .set({
          visit: this.formData.visit,
          discount: this.formData.discount,
          created_date: moment().format('DD-MM-YYYY'),
          created_month: moment().format('MM-YYYY'),
          timestamp: Date.now()
        })
        .then(() => {
          vm.popupCustomerGroup = false
          vm.successUpdate()
        })
    }
  }
}
</script>
