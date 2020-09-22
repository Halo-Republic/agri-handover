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
          <vs-list-header title="Employee Targets"></vs-list-header>
          <vs-list-item
            title="Add Employee Targets"
            subtitle="How is your employees measured in?"
            class="mb-5"
          >
            <vs-row>
              <v-select
                v-model="trgt_type"
                :clearable="false"
                :options="productTypes"
                multiple
                name="role"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
              <vs-button @click="save('targets')">+</vs-button>
            </vs-row>
          </vs-list-item>
          <vs-list-item
            :title="targets"
            v-for="(targets, i) in activeBusinessInfo.trgt_type"
            :key="i"
          >
            <vs-button
              type="border"
              color="danger"
              icon="delete"
              size="small"
              @click="deleteItem('trgt_type', targets, i)"
            ></vs-button>
          </vs-list-item>
          <vs-divider color="success" icon="check"></vs-divider>
          <vs-list-header title="Leave Approval"></vs-list-header>
          <vs-list-item
            title="Add Approval"
            subtitle="These are the positions that can approve leave"
            class="mb-5"
          >
            <vs-row>
              <v-select
                v-model="leave"
                :clearable="false"
                :options="data.pos"
                multiple
                name="role"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
              <vs-button @click="save('leave')">+</vs-button>
            </vs-row>
          </vs-list-item>
          <vs-list-item
            :title="leave"
            v-for="(leave, i) in activeBusinessInfo.leave"
            :key="i"
          >
            <vs-row>
              <vs-button
                type="border"
                color="danger"
                icon="delete"
                size="small"
                @click="deleteItem('leave', leave, i)"
              ></vs-button>
            </vs-row>
          </vs-list-item>

          <vs-divider color="success" icon="check"></vs-divider>
          <vs-list-header title="Claims Approval"></vs-list-header>
          <vs-list-item
            title="Add Approval"
            subtitle="These are the position within your that can approve Claims"
            class="mb-5"
          >
            <vs-row>
              <v-select
                v-model="claims"
                :clearable="false"
                :options="data.pos"
                multiple
                name="role"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
              <vs-button @click="save('claims')">+</vs-button>
            </vs-row>
          </vs-list-item>
          <vs-list-item
            :title="claims"
            v-for="(claims, i) in activeBusinessInfo.claims"
            :key="i"
          >
            <vs-row>
              <vs-button
                type="border"
                color="danger"
                icon="delete"
                size="small"
                @click="deleteItem('employee_target_claims', claims, i)"
              ></vs-button>
            </vs-row>
          </vs-list-item>
        </vs-list>
      </div>
    </client-only>
  </div>
</template>

<script>
import firebase from 'firebase'
import vSelect from 'vue-select'
import moment from 'moment'

export default {
  components: {
    vSelect
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      productTypes: ['Units', 'Revenue'],
      trgt_type: [],
      claims: [],
      leave: [],

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
      if (type === 'targets') {
        collection = 'trgt_type'
        data = vm.trgt_type
      } else if (type === 'claims') {
        collection = 'claims'
        data = vm.claims
      } else if (type === 'leave') {
        collection = 'leave'
        data = vm.leave
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
    successDelete(collection, i) {
      this.$vs.notify({
        color: 'warning',
        title: 'Delete Success',
        text: 'Whoop whoop, been deleted'
      })

      let business = this.activeBusinessInfo
      let items = {}

      items = business[collection]
      console.log('iem', items)
      const filteredItems = items
        .slice(0, i)
        .concat(items.slice(i + 1, items.length))
      business[collection] = filteredItems

      console.log('busines', business)

      this.$store.commit('business/UPDATE_BUSINESS_INFO', business)
    }
  }
}
</script>
