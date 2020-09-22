<template>
  <div>
    <vue-cal
      :selected-date="selectedDate"
      :disable-views="['years', 'year']"
      :events="events"
      :on-event-click="onEventClick"
      style="padding-top: 75px"
    >
      ></vue-cal
    >

    <vs-popup
      class="holamundo"
      :title="selectedEvent.title"
      :active.sync="showDialog"
    >
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
          <img :src="selectedEvent.downloadURL" width="100%" />
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
          <p v-html="selectedEvent.contentFull" />
        </vs-col>
      </vs-row>
      <vs-divider color="success" icon="check"></vs-divider>
      <!-- {{selectedEvent}} -->
      <ul>
        <li>
          <b>{{
            selectedEvent.startDate &&
              selectedEvent.startDate.format('DD/MM/YYYY')
          }}</b>
        </li>
        <li>
          Event starts at:
          {{ selectedEvent.startDate && selectedEvent.startDate.formatTime() }}
        </li>
        <li>
          Event ends Date at:
          {{
            selectedEvent.endDate && selectedEvent.endDate.format('DD/MM/YYYY')
          }}
        </li>
        <li>
          Event ends at:
          {{ selectedEvent.endDate && selectedEvent.endDate.formatTime() }}
        </li>
      </ul>
      <p v-html="selectedEvent.adr_address" />
      <vs-divider color="success" icon="check"></vs-divider>
      <vs-row
        vs-type="flex"
        vs-justify="space-around"
        v-if="selectedEvent.add_filter"
      >
        <div v-if="selectedEvent.add_group_branches">
          <div
            v-for="branch in selectedEvent.add_group_branches_selected"
            :key="branch"
          >
            <div v-if="branch == userDetails.group_branches">
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="6"
              >
                <v-select
                  label="displayName"
                  :closeOnSelect="false"
                  v-model="userSelect"
                  :options="branchUsers"
                />
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="6"
              >
                <vs-button @click="addToFriendCalendar(selectedEvent)"
                  >Invite</vs-button
                >
              </vs-col>
            </div>
          </div>
        </div>
        <div v-if="selectedEvent.add_group_positions" style="width: 100%">
          <div
            v-for="position in selectedEvent.add_group_positions_selected"
            :key="position"
            style="width: 100%"
          >
            <div
              v-if="position == userDetails.group_positions"
              style="width: 100%"
            >
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="6"
              >
                <v-select
                  label="displayName"
                  :closeOnSelect="false"
                  v-model="userSelect"
                  :options="branchUsers"
                />
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="6"
              >
                <vs-button @click="addToFriendCalendar(selectedEvent)"
                  >Invite</vs-button
                >
              </vs-col>
            </div>
          </div>
        </div>
        <div v-if="selectedEvent.add_group_push_notes">
          <div
            v-for="pushNotes in selectedEvent.add_group_push_notes_selected"
            :key="pushNotes"
          >
            <div v-if="pushNotes == userDetails.group_push_notes">
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="6"
              >
                <v-select
                  label="displayName"
                  :closeOnSelect="false"
                  v-model="userSelect"
                  :options="branchUsers"
                />
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="6"
              >
                <vs-button @click="addToFriendCalendar(selectedEvent)"
                  >Invite</vs-button
                >
              </vs-col>
            </div>
          </div>
        </div>
        <div v-if="selectedEvent.add_group_views">
          <div
            v-for="views in selectedEvent.add_group_views_selected"
            :key="views"
          >
            <div v-if="views == userDetails.group_views">
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="6"
              >
                <v-select
                  label="displayName"
                  :closeOnSelect="false"
                  v-model="userSelect"
                  :options="branchUsers"
                />
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="6"
              >
                <vs-button @click="addToFriendCalendar(selectedEvent)"
                  >Invite</vs-button
                >
              </vs-col>
            </div>
          </div>
        </div>

        <vs-divider color="success" icon="check"></vs-divider>
      </vs-row>
      <vs-row vs-type="flex" vs-justify="space-around" v-else>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
          <v-select
            label="displayName"
            :closeOnSelect="false"
            v-model="userSelect"
            :options="branchUsers"
          />
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
          <vs-button @click="addToFriendCalendar(selectedEvent)"
            >Invite</vs-button
          >
        </vs-col>
        <vs-divider color="success" icon="check"></vs-divider>
      </vs-row>
      <vs-row
        vs-type="flex"
        vs-justify="space-around"
        v-if="
          selectedEvent.add_group_positions &&
            selectedEvent.add_group_positions_selected ==
              this.userDetails.group_positions
        "
      >
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
          <vs-button
            @click="addToMyCalendar(selectedEvent)"
            class="button_event"
            >I'm Going</vs-button
          >
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
          <vs-button
            @click="goToEvent(selectedEvent.address_url)"
            class="button_event"
            >Directions</vs-button
          >
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
          <vs-button
            @click="addNotToMyCalendar(selectedEvent)"
            class="button_event"
            >I'm NOT Going</vs-button
          >
        </vs-col>
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import moment from 'moment'
import vSelect from 'vue-select'

export default {
  components: { VueCal, vSelect },
  data() {
    return {
      selectedEvent: {},
      selectedDate: moment(Date.now()).format('YYYY MM DD'),
      showDialog: false,
      userSelect: {},
      branchDetails: {},
      OnboardTraning: false,

      events: [
        {
          start: '2018-11-20 14:00',
          end: '2018-11-20 18:00',
          title: 'Need to go shopping',
          icon: 'shopping_cart', // Custom attribute.
          content: 'Click to see my shopping list',
          contentFull:
            'My shopping list is rather long:<br><ul><li>Avocadoes</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>', // Custom attribute.
          class: 'leisure'
        },
        {
          start: '2018-11-22 10:00',
          end: '2018-11-22 15:00',
          title: 'Golf with John',
          icon: 'golf_course', // Custom attribute.
          content: 'Do I need to tell how many holes?',
          contentFull: 'Okay.<br>It will be a 18 hole golf course.', // Custom attribute.
          class: 'sport'
        }
      ]
    }
  },
  computed: {
    branchUsers() {
      let users = []

      // for (let i = 0; i < this.appUsers.length; i++) {
      //   if (
      //     this.appUsers[i].group_branches == this.userDetails.group_branches
      //   ) {
      //     users.push(this.appUsers[i])
      //   }
      // }
      return users
    },
    companyDetails() {
      return this.$store.getters['app/companyDetails']
    },
    resellerName() {
      return this.$store.getters['app/resellerName']
    },
    componentDetails() {
      return this.$store.getters['feature/componentDetails']
    },
    routes() {
      return this.$store.getters['route/route']
    },
    routeID() {
      return this.$store.getters['route/routeID']
    },
    appUsers() {
      return this.$store.getters['userManagement/users']
    },
    routeDisplayName() {
      return this.$store.getters['route/routeDisplayName']
    },
    routeName() {
      return this.$store.getters['route/routeName']
    },
    is_blank() {
      return this.$store.getters['route/isBlank']
    },

    appType() {
      return this.$store.getters['app/appType']
    },

    userDetails() {
      return this.$store.getters['userManagement/userDetails']
    },
    user_data() {
      return this.$store.getters['userManagement/currentDisplayUser']
    },
    currentlyDisplayingUser() {
      return this.$store.getters['userManagement/currentlyDisplayingUser']
    },
    componentID() {
      return this.$store.getters['feature/componentID']
    }
  },

  methods: {
    addToFriendCalendar(cal) {
      console.log('cal', cal)
      console.log('this', this.userSelect)
      let vm = this

      this.$fireStore
        .collection(vm.resellerName)
        .doc(vm.companyDetails.id)
        .collection('users')
        .doc(this.userSelect.id)
        .collection('calendar')
        .doc(cal.id)
        .set({
          id: cal.id,
          start: cal.start,
          end: cal.end,
          title: cal.title,
          icon: cal.icon, // Custom attribute.
          content: cal.content,
          contentFull: cal.contentFull, // Custom attribute.
          class: cal.class,
          downloadURL: cal.downloadURL,
          adr_address: cal.adr_address,
          address_url: cal.address_url,
          resellerName: vm.resellerName,
          companyDetails_id: vm.companyDetails.id,
          companyDetails_name: vm.companyDetails.appname
        })
        .then(() => {
          this.addFriendEvent(cal)
          this.addFriendNotification(cal)
          this.save_changes_branch()
          this.successUpload()
        })
    },
    addNotToMyCalendar(cal) {
      let currentUser
      let vm = this
      if (this.currentlyDisplayingUser) {
        currentUser = vm.user_data
      } else {
        currentUser = vm.userDetails
      }
      if (this.is_blank) {
        this.$fireStore
          .collection(this.resellerName)
          .doc('apps')
          .collection(this.companyDetails.b_uid)
          .doc('blank_page')
          .collection(this.componentID)
          .doc(this.$route.params.id)
          .collection('features')
          .doc(cal.id)
          .collection('Notgoing')
          .doc(currentUser.id)
          .set({
            name: currentUser.name,
            surname: currentUser.surname,
            uid: currentUser.id,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            branch: currentUser.group_branches,
            position: currentUser.group_positions
          })
      } else {
        this.$fireStore
          .collection(this.resellerName)
          .doc('apps')
          .collection(this.companyDetails.b_uid)
          .doc(this.$route.params.id)
          .collection('features')
          .doc(cal.id)
          .collection('Notgoing')
          .doc(currentUser.id)
          .set({
            name: currentUser.name,
            surname: currentUser.surname,
            uid: currentUser.id,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            branch: currentUser.group_branches,
            position: currentUser.group_positions
          })
          .then(() => {
            this.successUploadNot()
          })
      }
    },
    addToMyCalendar(cal) {
      let vm = this
      let currentUser

      if (this.currentlyDisplayingUser) {
        currentUser = vm.user_data
      } else {
        currentUser = vm.userDetails
      }

      this.$fireStore
        .collection(vm.resellerName)
        .doc(vm.companyDetails.id)
        .collection('users')
        .doc(currentUser.id)
        .collection('calendar')
        .doc(cal.id)
        .set({
          id: cal.id,
          start: cal.start,
          end: cal.end,
          title: cal.title,
          icon: cal.icon, // Custom attribute.
          content: cal.content,
          contentFull: cal.contentFull, // Custom attribute.
          class: cal.class,
          downloadURL: cal.downloadURL,
          adr_address: cal.adr_address,
          address_url: cal.address_url,
          resellerName: vm.resellerName,
          companyDetails_id: vm.companyDetails.id,
          companyDetails_name: vm.companyDetails.appname
        })
        .then(() => {
          this.adduserEvent(cal)
          this.addNotification(cal)
          this.save_changes_branch()
          this.successUpload()
        })
    },
    addFriendNotification(cal) {
      let vm = this

      this.$fireStore
        .collection(vm.resellerName)
        .doc(vm.companyDetails.id)
        .collection('users')
        .doc(this.userSelect.id)
        .collection('notification')
        .doc(cal.id)
        .set({
          id: cal.id,
          index: cal.id,
          title: 'Event added to Calendar',
          msg: cal.title,
          icon: 'CalendarIcon',
          time: Date.now(),
          category: 'warning'
        })
    },

    save_changes_branch() {
      let mySeller = this.resellerName
      let myCompanyDetails = this.companyDetails
      let vm = this
      let numberUsed

      if (this.branchDetails.used == undefined) {
        numberUsed = 1
      } else {
        numberUsed = this.branchDetails.used + 1
      }

      // console.log('MYSELLER', mySeller, myCompanyDetails.id, vm.selectedBranch.title)

      this.$fireStore
        .collection(this.resellerName)
        .doc('newapp')
        .collection('newapp')
        .doc(myCompanyDetails.id)
        .collection('group_branch')
        .doc(this.userDetails.group_branches)
        .update({
          used: numberUsed
        })

      this.successUpload()
    },

    addNotification(cal) {
      let vm = this
      let currentUser

      if (this.currentlyDisplayingUser) {
        currentUser = vm.user_data
      } else {
        currentUser = vm.userDetails
      }

      this.$fireStore
        .collection(vm.resellerName)
        .doc(vm.companyDetails.id)
        .collection('users')
        .doc(currentUser.id)
        .collection('notification')
        .doc(cal.id)
        .set({
          id: cal.id,
          index: cal.id,
          title: 'Event added to Calendar',
          msg: cal.title,
          icon: 'CalendarIcon',
          time: Date.now(),
          category: 'warning'
        })
    },
    addFriendEvent(cal) {
      let currentUser = this.userSelect

      if (this.is_blank) {
        this.$fireStore
          .collection(this.resellerName)
          .doc('apps')
          .collection(this.companyDetails.b_uid)
          .doc('blank_page')
          .collection(this.componentID)
          .doc(this.$route.params.id)
          .collection('features')
          .doc(cal.id)
          .collection('going')
          .doc(currentUser.id)
          .set({
            name: currentUser.name,
            surname: currentUser.surname,
            uid: currentUser.id,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            branch: currentUser.group_branches,
            position: currentUser.group_positions
          })
      } else {
        this.$fireStore
          .collection(this.resellerName)
          .doc('apps')
          .collection(this.companyDetails.b_uid)
          .doc(this.$route.params.id)
          .collection('features')
          .doc(cal.id)
          .collection('going')
          .doc(currentUser.id)
          .set({
            name: currentUser.name,
            surname: currentUser.surname,
            uid: currentUser.id,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            branch: currentUser.group_branches,
            position: currentUser.group_positions
          })
          .then(() => {
            console.log('going added')
          })
      }
    },
    adduserEvent(cal) {
      let currentUser
      let vm = this
      if (this.currentlyDisplayingUser) {
        currentUser = vm.user_data
      } else {
        currentUser = vm.userDetails
      }
      if (this.is_blank) {
        this.$fireStore
          .collection(this.resellerName)
          .doc('apps')
          .collection(this.companyDetails.b_uid)
          .doc('blank_page')
          .collection(this.componentID)
          .doc(this.$route.params.id)
          .collection('features')
          .doc(cal.id)
          .collection('going')
          .doc(currentUser.id)
          .set({
            name: currentUser.name,
            surname: currentUser.surname,
            uid: currentUser.id,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            branch: currentUser.group_branches,
            position: currentUser.group_positions
          })
      } else {
        this.$fireStore
          .collection(this.resellerName)
          .doc('apps')
          .collection(this.companyDetails.b_uid)
          .doc(this.$route.params.id)
          .collection('features')
          .doc(cal.id)
          .collection('going')
          .doc(currentUser.id)
          .set({
            name: currentUser.name,
            surname: currentUser.surname,
            uid: currentUser.id,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            branch: currentUser.group_branches,
            position: currentUser.group_positions
          })
          .then(() => {
            console.log('going added')
          })
      }
    },
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Event',
        text: 'Whoop whoop, been uploaded to your calendar'
      })
    },
    successUploadNot() {
      this.$vs.notify({
        color: 'danger',
        title: 'Event',
        text: 'We will miss you'
      })
    },
    goToEvent(event) {
      window.open(event)
    },

    onEventClick(event, e) {
      this.selectedEvent = event
      this.showDialog = true
      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation()
    }
  },
  created() {
    let routeID = this.routeID
    let myEvents = []

    let refff = this.$fireStore
      .collection('agri-ensights')
      .doc('apps')
      .collection('events')

    refff.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc
        myEvents.push({
          id: doc.id,
          start: `${doc.data().date} ${doc.data().time}`,
          end: `${doc.data().dateEnd} ${doc.data().timeEnd}`,
          title: doc.data().name,
          icon: 'golf_course', // Custom attribute.
          content: doc.data().description,
          contentFull: doc.data().html, // Custom attribute.
          class: doc.data().category,
          downloadURL: doc.data().downloadURL,
          adr_address: doc.data().adr_address,
          address_url: doc.data().address_url,
          add_filter: doc.data().add_filter,
          add_group_branches: doc.data().add_group_branches,
          add_group_branches_selected: doc.data().add_group_branches_selected,
          add_group_positions: doc.data().add_group_positions,
          add_group_positions_selected: doc.data().add_group_positions_selected,
          add_group_push_notes: doc.data().add_group_push_notes,
          add_group_push_notes_selected: doc.data()
            .add_group_push_notes_selected,
          add_group_views_selected: doc.data().add_group_views_selected,
          add_group_views: doc.data().add_group_views
        })
      })
    })

    this.events = myEvents
  }
}
</script>

<style>
.selectExample {
  z-index: 55000;
}
.vuecal__event {
  cursor: pointer;
}

.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0 8px;
}

.vuecal__event-time {
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  font-style: italic;
}
.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
.vuecal__event.yellow {
  background-color: rgba(225, 250, 85, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
.vuecal__event.blue {
  background-color: rgba(44, 26, 201, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
.vuecal__event.green {
  background-color: rgba(38, 201, 65, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
.vuecal__event.red {
  background-color: rgba(243, 10, 10, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
.vuecal__event.orange {
  background-color: rgba(224, 170, 21, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
.vuecal__event.brown {
  background-color: rgba(219, 104, 104, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
.button_event {
  width: 100%;
  height: 100%;
}
</style>
