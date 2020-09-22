<template>
  <div class="w-full vx-col md:mt-10 mt-base">
    <vs-row
      vs-align="center"
      vs-type="flex"
      vs-justify="space-around"
      vs-w="12"
      class="py-10 mt-12"
    >
      <vs-col
        class="mt-12"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
      >
        <a :href="`tel:${this.activeCompanyInfo.phone}`">
          <vs-button color="primary" type="border" icon="phone"></vs-button>
        </a>
        <a :href="`mailto:${activeCompanyInfo.email}`">
          <vs-button color="primary" type="border" icon="email"></vs-button>
        </a>
        <a :href="`${this.activeCompanyInfo.addressUrl}`" target="_blank">
          <vs-button color="primary" type="border" icon="room"></vs-button>
        </a>

        <vs-button
          color="primary"
          type="border"
          icon="work"
          @click="goingMeeting"
        ></vs-button>
        <vs-button
          color="primary"
          type="border"
          icon="person"
          @click="goingCustomer"
        ></vs-button>
        <!-- <vs-button
          color="primary"
          type="border"
          icon="edit"
          :to="{ name: 'editcompany', params: { id: this.company.id } }"
        ></vs-button> -->
      </vs-col>
    </vs-row>

    <vx-card class="mt-5">
      <template slot="no-body">
        <vs-tabs vs-position="left" alignment="fixed">
          <vs-tab label="Details" vs-icon="extension">
            <div class="pl-2 mt-1">
              <div class="mt-5">
                <h6>Company Name:</h6>
                <p>{{ this.activeCompanyInfo.company }}</p>
              </div>
              <div class="mt-5">
                <h6>Email:</h6>
                <p>{{ this.activeCompanyInfo.email }}</p>
              </div>
              <div class="mt-5">
                <h6>Phone:</h6>
                <p>{{ this.activeCompanyInfo.phone }}</p>
              </div>
              <div class="mt-5">
                <h6>Address:</h6>
                <p>{{ this.activeCompanyInfo.formatted_address }}</p>
              </div>
              <div class="mt-5">
                <h6>Source:</h6>
                <p>{{ this.activeCompanyInfo.sources }}</p>
              </div>
              <div class="mt-5">
                <h6>Rating:</h6>
                <p>{{ this.activeCompanyInfo.ratings }}</p>
              </div>

              <div class="mt-5">
                <h6>Last Meeting:</h6>
                <p>{{ this.activeCompanyInfo.lastMeeting }}</p>
              </div>
            </div>
          </vs-tab>
          <vs-tab label="Notes" vs-icon="store">
            <div
              class="mt-5"
              v-for="companyrecord in companyrecords"
              :key="companyrecord.id"
            >
              <b>{{ companyrecord.timestamp }}</b>
              {{ companyrecord.text }}
            </div>
            <div class="pl-2 mt-1">
              <vx-input-group>
                <template slot="prepend">
                  <div class="prepend-text bg-primary">
                    <span>Description</span>
                  </div>
                </template>

                <vs-textarea v-model="companyupdates" />
              </vx-input-group>
              <div
                class="flex items-center justify-between p-3 mt-4 mb-4 mr-4 text-base text-lg font-medium border border-solid rounded-lg cursor-pointer text-primary border-primary"
                @click="addUpdates"
              >
                <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                <span class="ml-2 text-base text-primary">Add Note</span>
              </div>
            </div>
          </vs-tab>
          <vs-tab label="Sales" vs-icon="get_app">
            <div class="pl-2 mt-1">
              <div
                class="mt-5"
                v-for="companySalesRecord in companySalesRecords"
                :key="companySalesRecord.id"
              >
                <b
                  >{{ companySalesRecord.item }} - R{{
                    companySalesRecord.price
                  }}</b
                >
                {{ companySalesRecord.timestamp }}
              </div>
            </div>
          </vs-tab>
          <vs-tab label="Meetings" vs-icon="link">
            <div class="pl-2 mt-1">
              <div
                class="w-full vx-col lg:w-1/3 sm:w-1/2 mb-base"
                v-for="companymeeting in companymeetings"
                :key="companymeeting.id"
              >
                <vx-card class="p-2" @click="popUpMeeting(companymeeting)">
                  <div class="text-center">
                    <h4>
                      {{ companymeeting.displayName }}
                    </h4>
                    <p class="text-grey">
                      Duration: {{ companymeeting.hours }}h:{{
                        companymeeting.minutes
                      }}m:{{ companymeeting.seconds }}s
                    </p>
                  </div>
                  <!-- <vs-avatar class="block mx-auto my-6" size="80px" :src="card_5.userImg" /> -->
                  <div class="flex justify-between text-center">
                    <span>
                      <p class="text-xl font-semibold" style="color: black">
                        {{ companymeeting.details }}
                      </p>
                      <small class="text-grey">{{
                        companymeeting.created_date
                      }}</small>
                    </span>
                  </div>
                </vx-card>
                <vs-popup
                  class="holamundo"
                  title="Meeting"
                  :active.sync="popupActivo"
                >
                  <div class="text-center">
                    <h4>
                      {{ currentMeeting.displayName }}
                    </h4>
                    <p class="text-grey">
                      Duration: {{ currentMeeting.hours }}h:{{
                        currentMeeting.minutes
                      }}m:{{ currentMeeting.seconds }}s
                    </p>
                  </div>

                  <div class="flex justify-between text-center">
                    <span>
                      <p class="text-xl font-semibold" style="color: black">
                        {{ currentMeeting.details }}
                      </p>
                      <small class="text-black">{{
                        currentMeeting.created_date
                      }}</small>
                    </span>
                  </div>

                  <div
                    class="flex justify-between text-center"
                    style="border: solid 1px black; padding: 10px"
                  >
                    <h4>
                      {{ currentMeeting.displayName }}
                    </h4>
                    <img :src="currentMeeting.signature" style="height: 75px" />
                  </div>

                  <div
                    class="flex justify-between text-center"
                    v-for="customer in currentMeeting.customers"
                    :key="customer"
                    style="border: solid 1px black; padding: 10px"
                  >
                    <h4 style="color: black">
                      {{ customer.name }} {{ customer.surname }}
                    </h4>
                    <img :src="customer.img" style="height: 75px" />
                  </div>

                  {{ currentMeeting.geolocation }}
                  <client-only>
                    <GmapMap
                      v-if="currentMeeting.geolocation"
                      :center="currentMeeting.geolocation"
                      :zoom="7"
                      map-type-id="terrain"
                      style="width: 500px; height: 300px; padding: 15px; text-align: center"
                    >
                      <GmapMarker
                        :position="currentMeeting.geolocation"
                        :clickable="true"
                        :draggable="true"
                      />
                    </GmapMap>
                  </client-only>
                </vs-popup>
              </div>
            </div>
          </vs-tab>
        </vs-tabs>
      </template>
    </vx-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'

export default {
  data() {
    return {
      rowsPerPageItems: [8, 16, 24],
      pagination: {
        rowsPerPage: 8
      },
      company: [],
      companyName: 'Test',
      details: true,
      notes: false,
      sales: false,
      meetings: false,
      clients: false,
      currentMeeting: {},
      companyupdates: null,
      companyrecords: [],
      companymeetings: [],
      currency: null,
      companySalesRecords: [],
      id: this.$route.params.id,
      popupActivo: false
    }
  },
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    },
    activeCompanyInfo() {
      return this.$store.state.crm.company
    }
  },

  methods: {
    goingCustomer() {
      this.$router.push(`/crm/company/customers`)
    },
    goingMeeting() {
      this.$router.push(`/crm/company/meeting`)
    },
    popUpMeeting(meeting) {
      this.currentMeeting = meeting
      this.popupActivo = true
    },
    detailsCheck() {
      this.$data.details = true
      this.$data.notes = false
      this.$data.sales = false
      this.$data.meetings = false
      this.$data.clients = false
    },
    notesCheck() {
      this.$data.details = false
      this.$data.notes = true
      this.$data.sales = false
      this.$data.meetings = false
      this.$data.clients = false
    },
    salesCheck() {
      this.$data.details = false
      this.$data.notes = false
      this.$data.sales = true
      this.$data.meetings = false
      this.$data.clients = false
    },
    meetingsCheck() {
      this.$data.details = false
      this.$data.notes = false
      this.$data.sales = false
      this.$data.meetings = true
      this.$data.clients = false
    },
    clientsCheck() {
      this.$data.details = false
      this.$data.notes = false
      this.$data.sales = false
      this.$data.meetings = false
      this.$data.clients = true
    },
    addUpdates() {
      //     console.log('adding')
      let docRes
      docRes = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('company')
        .collection('company')
        .doc(this.activeCompanyInfo.id)
        .collection('companyrecords')
      docRes.add({
        company_id: this.activeCompanyInfo.id,
        text: this.companyupdates,
        company: this.companyName,
        date: moment().format('DD-MM-YYYY'),
        timestamp: Date.now()
      })
    }
  },

  created() {
    // Single Company
    if (process.client) {
      let docRes

      docRes = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('company')
        .collection('company')
        .doc(this.activeCompanyInfo.id)
        .collection('companyrecords')
        .orderBy('timestamp', 'asc')

      docRes.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == 'added') {
            let doc = change.doc
            this.companyrecords.push({
              id: doc.id,
              text: doc.data().text,
              date: doc.data().date,
              timestamp: moment(doc.data().timestamp).format('ll')
            })
          }
        })
      })

      let docSales

      docSales = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('company')
        .collection('company')
        .doc(this.activeCompanyInfo.id)
        .collection('sales')
        .orderBy('timestamp', 'desc')

      // Company Sales Records

      docSales.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == 'added') {
            let doc = change.doc
            this.companySalesRecords.push({
              id: doc.id,
              item: doc.data().item_name,
              price: doc.data().price,
              timestamp: moment(doc.data().timestamp).format('ll')
            })
          }
        })
      })

      // // Company Meetings

      let docMeetings

      docMeetings = this.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('company')
        .collection('company')
        .doc(this.activeCompanyInfo.id)
        .collection('customermeetings')
        .orderBy('timestamp', 'desc')

      docMeetings.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == 'added') {
            let doc = change.doc
            this.companymeetings.push({
              id: doc.id,
              name: doc.data().user_name,
              surname: doc.data().user_surname,
              displayName: doc.data().user_displayName,
              date: doc.data().date,
              startTime: moment(doc.data().startTime).format('llll'),
              endTime: moment(doc.data().endTime).format('llll'),
              time: doc.data().time,
              details: doc.data().details,
              seconds: doc.data().seconds,
              minutes: doc.data().minutes,
              hours: doc.data().hours,
              customers: doc.data().customers,
              geolocation: doc.data().geolocation,
              signature: doc.data().signature,
              created_date: doc.data().created_date,
              timestamp: moment(doc.data().timestamp).format('ll')
            })
          }
        })
      })
      let currentCompany = {
        ...this.activeCompanyInfo,
        ...this.companymeetings,
        ...this.companySalesRecords,
        ...this.companyrecords
      }
      this.$store.commit('crm/SET_COMPANY', currentCompany)
    }
  }
}
</script>
