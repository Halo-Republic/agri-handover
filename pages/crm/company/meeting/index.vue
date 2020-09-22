<template>
  <div>
    <vs-card class="mt-10">
      <p class="mt-10">
        Elapsed Time:
        {{ hours }} : {{ minutes | zeroPad }} : {{ seconds | zeroPad }} :
        {{ milliSeconds | zeroPad(3) }}
      </p>
      <vs-button @click="startTimer" :disabled="isRunning">START</vs-button>
      <vs-button @click="pushTime" :disabled="!isRunning">LAP</vs-button>
      <vs-button @click="stopTimer" :disabled="!isRunning">STOP</vs-button>
      <vs-button @click="clearAll">CLEAR</vs-button>
      <ul v-if="times.length">
        <li v-for="item in times" :key="item">
          {{ item.hours }} : {{ item.minutes | zeroPad }} :
          {{ item.seconds | zeroPad }} :
          {{ item.milliSeconds | zeroPad(3) }}
        </li>
      </ul>
      <!-- DESCRIPTION -->
      <vs-textarea label="Description" v-model="details" class="w-full mt-5" />
      <div>
        <div v-for="(addedItem, index) in addedItems" :key="addedItem.index">
          <vs-select
            v-model="addedItem.customer"
            label="Customer"
            class="w-full mt-5"
          >
            <vs-select-item
              :key="item.text"
              :value="item"
              :text="`${item.name} ${item.surname}`"
              v-for="item in activeStaff"
            />
          </vs-select>

          <div id="app" class="mt-5">
            <VueSignaturePad
              width="100%"
              height="30%"
              style="border: solid grey 1px"
              ref="signaturePads"
              class="mt-5"
            />
            <div class="mt-5">
              <vs-button @click="saves(index)">Save</vs-button>
              <vs-button @click="undo">Undo</vs-button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <vs-button @click="AddMoreProd">Add another Customer</vs-button>
      </div>
      <VueSignaturePad
        width="100%"
        height="30%"
        style="border: solid grey 1px"
        ref="signaturePad"
        class="mt-5"
      />
      <div class="mt-5">
        <vs-button @click="save">Save</vs-button>
        <vs-button @click="undo">Undo</vs-button>
      </div>
      <img :src="this.signature" alt />
      <div class="mt-5">
        <vs-button @click="saveMeetings()">Save Meeting</vs-button>
      </div>
    </vs-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import firebase from 'firebase'
import moment from 'moment'

export default {
  data() {
    return {
      times: [],
      animateFrame: 0,
      details: '',
      nowTime: 0,
      diffTime: 0,
      startTime: 0,
      isRunning: false,
      companyName: 'Test',
      signature: '',
      company: '',
      customer: '',
      lat: 0,
      lng: 0,
      addedItems: [
        {
          customer: '',
          data: ''
        }
      ]
    }
  },

  created() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.lat = pos.coords.latitude
      this.lng = pos.coords.longitude
    })

    if (process.client) {
      let myStaff = []
      console.log('active', this.activeBusinessInfo)

      let getUsers = this.$fireStore
        .collection('apps')
        .doc('users')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('info')
        .collection('general')
        .where('company_id', '==', this.activeCompanyInfo.id)

      getUsers.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let doc = change.doc
          myStaff.push({
            company_id: doc.data().company_id,
            status: doc.data().status,
            online_status: doc.data().online_status,
            role: doc.data().role,
            uid: doc.data().uid,
            display_name: doc.data().display_name,
            photoURL: doc.data().photoURL,
            email: doc.data().email,
            name: doc.data().name,
            surname: doc.data().surname,
            company: doc.data().company,
            position: doc.data().position,
            branch: doc.data().branch,
            push_notes: doc.data().push_notes,
            verified: doc.data().verified,
            last_active: doc.data().last_active,
            created_month: doc.data().created_month,
            timestamp: doc.data().timestamp
          })
        })
      })

      this.$store.commit('crm/UPDATE_STAFF', myStaff)
    }
  },
  methods: {
    AddMoreProd() {
      this.addedItems.push({
        customer: '',
        data: ''
      })
    },
    //signature pad
    undo() {
      this.$refs.signaturePad.undoSignature()
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      // this.addedItems[index].data = data;
      this.signature = data
    },

    saves(index) {
      const { isEmpty, data } = this.$refs.signaturePads[index].saveSignature()
      this.addedItems[index].data = data
    },
    // startTime
    setSubtractStartTime: function(time) {
      var time = typeof time !== 'undefined' ? time : 0
      this.startTime = Math.floor(performance.now() - time)
    },

    startTimer: function() {
      // loop()
      var vm = this
      vm.setSubtractStartTime(vm.diffTime)
      ;(function loop() {
        vm.nowTime = Math.floor(performance.now())
        vm.diffTime = vm.nowTime - vm.startTime
        vm.animateFrame = requestAnimationFrame(loop)
      })()
      vm.isRunning = true
    },
    //
    stopTimer: function() {
      this.isRunning = false
      cancelAnimationFrame(this.animateFrame)
    },

    pushTime: function() {
      this.times.push({
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
        milliSeconds: this.milliSeconds
      })
    },

    clearAll: function() {
      this.startTime = 0
      this.nowTime = 0
      this.diffTime = 0
      this.times = []
      this.stopTimer()
      this.animateFrame = 0
    },
    saveMeetings() {
      var arr = Object.values(this.addedItems)

      let currentAttendees = []
      for (let i = 0; i < arr.length; i++) {
        let newObject = {}
        newObject.img = arr[i].data
        newObject.name = arr[i].customer.name
        newObject.surname = arr[i].customer.surname
        ;(newObject.id = arr[i].customer.uid),
          (newObject.email = arr[i].customer.email),
          (newObject.position = arr[i].customer.position)
        currentAttendees.push(newObject)
      }

      let vm = this
      let docMeetings

      docMeetings = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('company')
        .collection('company')
        .doc(this.activeCompanyInfo.id)
        .collection('customermeetings')

      docMeetings
        .add({
          uid: this.activeUserInfo.uid,
          user_name: this.activeUserInfo.name,
          user_surname: this.activeUserInfo.surname,
          user_displayName: this.activeUserInfo.display_name,
          user_branch: this.activeUserInfo.branch,
          user_positions: this.activeUserInfo.position,
          startTime: this.startTime,
          endTime: this.diffTime,
          time: this.nowTime,
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds,
          milliSeconds: this.milliSeconds,
          company: this.activeCompanyInfo.company,
          details: this.details,
          customers: currentAttendees,
          companyID: this.activeCompanyInfo.id,
          company_id: this.activeCompanyInfo.id,
          signature: this.signature,
          geolocation: {
            lat: this.lat,
            lng: this.lng
          },
          created_date: moment().format('DD-MM-YYYY'),
          created_month: moment().format('MM-YYYY'),
          timestamp: Date.now()
        })
        .then(function() {
          vm.companyUpdate()
        })
        .catch(function(error) {
          vm.noSuccessUpload(error)
        })

      this.$router.go(-1)
    },
    companyUpdate() {
      let vm = this
      let compMeeting

      compMeeting = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('company')
        .collection('company')
        .doc(this.activeCompanyInfo.id)

      compMeeting
        .update({
          lastMeeting: moment().format('DD-MM-YYYY')
        })
        .then(function() {
          vm.successUpload()
        })
        .catch(function(error) {
          vm.noSuccessUpload(error)
        })
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
  computed: {
    google_place() {
      return this.$store.getters['google/google_place']
    },
    google_marker() {
      return this.$store.getters['google/google_marker']
    },
    hours: function() {
      return Math.floor(this.diffTime / 1000 / 60 / 60)
    },

    minutes: function() {
      return Math.floor(this.diffTime / 1000 / 60) % 60
    },

    seconds: function() {
      return Math.floor(this.diffTime / 1000) % 60
    },

    milliSeconds: function() {
      return Math.floor(this.diffTime % 1000)
    },
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    },
    activeCompanyInfo() {
      return this.$store.state.crm.company
    },
    activeStaff() {
      return this.$store.getters['crm/staff']
    }
  },
  filters: {
    //  String.prototype.padStart()
    zeroPad: function(value, num) {
      var num = typeof num !== 'undefined' ? num : 2
      return value.toString().padStart(num, '0')
    }
  }
}
</script>
