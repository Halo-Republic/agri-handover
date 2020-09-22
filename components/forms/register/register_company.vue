<template>
  <div
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
  >
    <div class="flex items-center justify-between md:px-6 mt-6">
      <!-- <vs-button @click="popupActivo = true" color="primary" type="border"
        >SEE PRICING STRUCTURE</vs-button
      >
      <p>R{{ subscriptionPrice }}</p> -->

      <!-- <feather-icon
        icon="XIcon"
        @click.stop="addBusiness"
        class="cursor-pointer"
      ></feather-icon> -->
    </div>
    <!-- <vs-divider class="mb-0"></vs-divider> -->

    <div class="p-6">
      <!-- NAME -->

      <h6 class="mt-4">Business Type</h6>
      <v-select
        class="w-full  mb-5"
        label="Business Type"
        v-model="b_type"
        :options="['Individual', 'Company']"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
      />

      <div v-if="b_type == 'Individual'">
        <!-- Client Name -->
        <vs-input
          label="Name"
          name="contactperson"
          v-model="contactperson"
          class="w-full mt-5"
        />

        <!-- Client Surname -->
        <vs-input
          label="Surname"
          name="contactsurname"
          v-model="contactsurname"
          class="w-full mt-5"
        />

        <vs-input
          label="ID Number"
          name="number"
          v-model="id_number"
          type="number"
          class="w-full mt-5"
        />
        <h6 class="mt-4 ">Gender</h6>
        <v-select
          class="w-full  mb-5"
          label="Business Type"
          v-model="gender"
          :options="['Male', 'Female', 'Other', 'Choose not to give']"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
        />

        <!-- Client Number -->
        <vs-input
          label="Contact number"
          name="number"
          v-model="number"
          type="number"
          class="w-full mt-5"
        />

        <!-- Client Email -->
        <vs-input
          label="Email"
          name="email"
          v-model="email"
          type="email"
          class="w-full mt-5"
        />
      </div>
      <div v-if="b_type == 'Company'">
        <h6 class="mt-4 ">Business Name</h6>

        <vs-input name="appname" v-model="b_name" class="w-full " />

        <h6 class="mt-4 ">Type of legal entity</h6>
        <v-select
          label="Type of legal entity"
          :closeOnSelect="false"
          v-model="selectedLegal"
          :options="optionsLegal"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
        />

        <!-- Client Number -->
        <vs-input
          label="Company Reg No"
          name="number"
          v-model="reg_number"
          type="number"
          class="w-full mt-5"
        />
        <vs-input
          label="Vat No"
          name="number"
          v-model="vat_number"
          type="number"
          class="w-full mt-5"
        />
      </div>

      <!-- INDUSTRY -->
      <h6 class="mt-5">Type of Platform User</h6>
      <v-select
        label="Type of Platform User"
        multiple
        :closeOnSelect="false"
        v-model="selectedPlatform"
        :options="options"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
      />

      <!-- <vs-input
        class="w-full"
        label-placeholder="Type of Farming, e.g. crop, livestock or mixed farming"
        v-model="farmType"
      ></vs-input> -->

      <h6 class="mt-4 ">Province</h6>

      <!-- <vs-input name="province" v-model="province" class="w-full mt-5" /> -->
      <v-select
        class="w-full mb-5"
        label="Province"
        v-model="province"
        :options="provinces"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
      />

      <h6 class="mt-4 ">Municipality</h6>

      <v-select
        class="w-full  mb-5"
        label="Municipality"
        v-model="municipality"
        :options="munis"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
      />

      <vs-textarea
        label="Description"
        v-model="description"
        class="w-full mt-5"
      />
      <!-- <img
        :src="uploaded_images[0]"
        v-if="uploaded_images[0]"
        style="height: 125px"
      />
      <br />
      <imageUpload class="mb-2 mr-4 sm:mb-0" label="Company Logo" /> -->
      <br />

      <br />

      <vs-radio v-model="radios1" vs-name="radios1" vs-value="auto"
        >Auto</vs-radio
      >
      <vs-radio v-model="radios1" vs-name="radios1" vs-value="manual"
        >Manual</vs-radio
      >
      <auto-location v-if="radios1 == 'auto'" />
      <manualLocation v-if="radios1 == 'manual'" />
      <br />
      <vs-divider color="success" icon="check"></vs-divider>
      <h4>Business Owner Details</h4>
      <small
        >Please use client details so that they can login to their own
        backend</small
      >

      <!-- Company -->
      <!-- <vs-input
        label="Company"
        name="company"
        v-model="company"
        class="w-full mt-5"
      /> -->

      <!-- Client Name -->
      <vs-input
        label="Owner Name"
        name="contactperson"
        v-model="contactperson"
        class="w-full mt-5"
      />

      <!-- Client Surname -->
      <vs-input
        label="Owner Surname"
        name="contactsurname"
        v-model="contactsurname"
        class="w-full mt-5"
      />

      <!-- Client Number -->
      <vs-input
        label="Contact Number"
        name="number"
        v-model="number"
        type="number"
        class="w-full mt-5"
      />

      <!-- Client Email -->
      <vs-input
        label="Client Email"
        name="email"
        v-model="email"
        type="email"
        class="w-full mt-5"
      />

      <vs-divider color="success" icon="check"></vs-divider>
      <h4>Bank Details</h4>

      <!-- Company -->
      <!-- <vs-input
        label="Company"
        name="company"
        v-model="company"
        class="w-full mt-5"
      /> -->

      <!-- Client Name -->
      <vs-input label="Bank" name="bank" v-model="bank" class="w-full mt-5" />

      <!-- Client Surname -->
      <vs-input
        label="Account Type"
        name="acc_type"
        v-model="acc_type"
        class="w-full mt-5"
      />

      <!-- Client Number -->
      <vs-input
        label="Account Number"
        name="acc_num"
        v-model="acc_num"
        type="number"
        class="w-full mt-5"
      />

      <!-- Client Email -->
      <vs-input
        label="Branch Number"
        name="br_num"
        v-model="br_num"
        type="email"
        class="w-full mt-5"
      />
    </div>
    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button class="mr-6" @click="registerUser">Save</vs-button>
      <vs-button type="border" color="danger" @click="$router.push('/')"
        >Cancel</vs-button
      >
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
import vSelect from 'vue-select'

import Geohash from 'latlon-geohash'
// if (process.client) {
//   var Geohash = require('latlon-geohash')
// }
// import imageUpload from '@/components/form-generator/components/imageUpload.vue'

import autoLocation from '@/components/charts-and-maps/maps/auto_location'
import manualLocation from '@/components/google/google-man.vue'

export default {
  data() {
    return {
      popupActivo: false,
      radios1: 'auto',
      subscriptionPrice: null,
      name: '',
      b_name: '',
      b_type: '',
      reg_number: null,
      vat_number: null,
      id_number: null,
      gender: '',
      bank: '',
      acc_type: '',
      acc_num: '',
      br_num: '',
      uid: 0,
      options: [
        'Primary producer',
        'Agri Service Provider',
        'Agri Supplier',
        'Market Agent',
        'Auctioneer',
        'Retailer',
        'Financial Services',
        'Abattoir',
        'Agro Processor',
        'Individual'
      ],
      optionsLand: ['Owned', 'Leased', 'Communual'],
      optionsLegal: ['Sole Prop', 'Pty Ltd', 'Co-operative'],
      selectedPlatform: '',
      selectedLand: '',
      selectedLegal: '',
      landSize: '',
      farmType: '',
      municipality: '',
      provinces: [
        'Eastern Cape',
        'Free State',
        'Gauteng',
        'Northern Cape',
        'Western Cape',
        'KwaZulu Natal',
        'North West',
        'Mpumalanga',
        'Limpopo'
      ],
      province: 'Gauteng',

      price: '',
      currency: '',
      company: '',
      contactperson: '',
      contactsurname: '',
      email: '',
      number: '',
      description: '',
      uploadTask: '',
      images: [],
      tax: 0,
      radios: true,
      address: '',
      industry: '',
      imageName: '',
      imageFile: '',
      imageUrls: '',
      docIdNow: null,
      geo1: 0,
      geo2: 0,
      geo3: 0,
      geo4: 0,
      geo5: 0,
      geo6: 0,
      geo7: 0,
      geo8: 0,
      geo9: 0,

      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    }
  },
  // watch: {
  //   industry: function() {
  //     if (this.industry == 'Community' || this.industry == 'Complexes') {
  //       this.isEstate = false
  //       this.subscriptionPrice = 499
  //     } else if (this.industry == 'Estate') {
  //       this.isEstate = true
  //       this.setEstatePrice()
  //     } else {
  //       this.isEstate = false
  //       this.subscriptionPrice = 699
  //     }
  //   },
  //   isMyEstate: function() {
  //     if (this.isMyEstate == 'Amenities') {
  //       this.subscriptionPrice = 899
  //     } else {
  //       this.subscriptionPrice = 1299
  //     }
  //   }
  // },

  computed: {
    munis() {
      let mu = []

      switch (this.province) {
        case 'Eastern Cape':
          mu = [
            'Alfred Nzo District Municipality',
            'Amahlathi Local Municipality',
            'Amathole District Municipality',
            'Beyers Naude Municipality (Baviaans Local Municipality)',
            'Blue Crane Route Local Municipality',
            'Buffalo City Metropolitan Municipality',
            'Camdeboo Local Municipality',
            'Chris Hani District Municipality',
            'Elundini Local Municipality',
            'Emalahleni Local Municipality',
            'Engcobo Local Municipality',
            'Gariep Local Municipality',
            'Greater Kei Local Municipality',
            'Ikwezi Local Municipality',
            'Inkwanca Local Municipality',
            'Intsika Yethu Local Municipality',
            'Inxuba Yethemba Local Municipality',
            'Joe Gqabi District Municipality',
            'King Sabatha Dalindyebo Local Municipality',
            'Kou-Kamma Local Municipality',
            'Kouga Local Municipality',
            'Lukhanji Local Municipality',
            'Makana Local Municipality',
            'Maletswai Local Municipality',
            'Matatiele Local Municipality',
            'Mbhashe Local Municipality',
            'Mbizana Local Municipality',
            'Mnquma Local Municipality',
            'Ndlambe Local Municipality',
            'Nelson Mandela Bay Metropolitan Municipality',
            'Ngqushwa Local Municipality',
            'Nkonkobe Local Municipality',
            'Ntabankulu Local Municipality',
            'Nxuba Local Municipality',
            'Nyandeni Local Municipality',
            'OR Tambo District Municipality',
            'Port St Johns Local Municipality',
            'Sakhisizwe Local Municipality',
            'Sarah Baartman District Municipality',
            'Senqu Local Municipality',
            'Sundays River Valley Local Municipality',
            'Tsolwana Local Municipality',
            'Umzimvubu Local Municipality'
          ]

          break

        case 'Free State':
          mu = [
            'Dihlabeng Local Municipality',
            'Fezile Dabi District Municipality',
            'Kopanong Local Municipality',
            'Lejweleputswa District Municipality',
            'Letsemeng Local Municipality',
            'Mafube Local Municipality',
            'Maluti a Phofong Local Municipality',
            'Mangaung Metropolitan Municipality',
            'Mantsopa Local Municipality',
            'Masilonyana Local Municipality',
            'Matjhabeng Local Municipality',
            'Metsimaholo Local Municipality',
            'Mohokare Local Municipality',
            'Moqhaka Local Municipality',
            'Nala Local Municipality',
            'Naledi Local Municipality',
            'Ngwathe Local Municipality',
            'Nketoana Local Municipality',
            'Phumelela Local Municipality',
            'Setsoto Local Municipality',
            'Thabo Mofutsanyana District Municipality',
            'Tokologo Local Municipality',
            'Tswelopele Local Municipality',
            'Xhariep District Municipality'
          ]
          break
        case 'Gauteng':
          mu = [
            'City of Johannesburg Metropolitan',
            'City of Tshwane Metropolitan',
            'City of Ekurhuleni Metropolitan',
            'Sedibeng District Municipality',
            'Emfuleni Local Municipality',
            'Midvaal Local Municipality',
            'Lesedi Local Municipality',
            'West Rand District Municipality',
            'Merafong City Local Municipality',
            'Mogale City Local Municipality',
            'Rand West City Local Municipality'
          ]
          break
        case 'KwaZulu Natal':
          mu = [
            'eThekwini Metropolitan Municipality',
            'Amajuba District Municipality',
            'Dannhauser Local Municipality',
            'eMadlangeni Local Municipality',
            'Newcastle Local Municipality',
            'Harry Gwala District Municipality',
            'Greater Kokstad Local Municipality',
            'Ingwe Local Municipality',
            'Ubuhlebezwe Local Municipality',
            'uMzimkhulu Local Municipality',
            'iLembe District Municipality',
            'KwaDukuza Local Municipality',
            'Mandeni Local Municipality',
            'Maphumulo Local Municipality',
            'Ndwedwe Local Municipality',
            'Ugu District Municipality',
            'Hibiscus Coast (Ray Nkonyen) Local Municipality',
            'Umdoni Local Municipality',
            'Umuziwabantu Local Municipality',
            'Umzumbe Local Municipality ',
            'uMgungundlovu District Municipality',
            'Impendle Local Municipality ',
            'Mkhambathini Local Municipality',
            'Mooi Mpofana Local Municipality',
            'Msunduzi Local Municipality',
            'Richmond Local Municipality',
            'uMngeni Local Municipality',
            'uMshwathi Local Municipality',
            'uMkhanyakude District Municipality',
            'Big 5 Hlabisa Local Municipality ',
            'Jozini Local Municipality ',
            'Mtubatuba Local Municipality',
            'uMhlabuyalingana Local Municipality',
            'uMzinyathi District Municipality',
            'Endumeni Local Municipality',
            'Msinga Local Municipality',
            'Nquthu Local Municipality',
            'Umvoti Local Municipality',
            'uThukela District Municipality',
            'Alfred Duma (Emnambithi/Ladysmith) Local Municipality',
            'Okhahlamba Local Municipality',
            'Inkosi Langalibelele local Municipality',
            'King Cetshwayo (uThungulu) District Municipality',
            'City of uMhlathuze Local Municipality ',
            'Mfolozi Local Municipality ',
            'Mthonjaneni Local Municipality',
            'Nkandla Local Municipality',
            'uMlalazi Local Municipality',
            'Zululand District Municipality',
            'AbaQulusi Local Municipality ',
            'eDumbe Local Municipality ',
            'Nongoma Local Municipality',
            'Ulundi Local Municipality',
            'uPhongolo Local Municipality'
          ]
          break
        case 'Limpopo':
          mu = [
            'Capricorn District Municipality',
            'Blouberg Local Municipality',
            'Lepelle-Nkumpi Local Municipality',
            'Molemole Local Municipality',
            'Polokwane Local Municipality',
            'Mopani District Municipality',
            'Ba-Phalaborwa Local Municipality',
            'Greater Giyani Local Municipality',
            'Greater Letaba Local Municipality',
            'Greater Tzaneen Local Municipality',
            'Maruleng Local Municipality',
            'Greater Sekhukhune District Municipality',
            'Elias Motsoaledi Local Municipality',
            'Ephraim Mogale Local Municipality',
            'Fetakgomo Local Municipality / Greater Tubatse Local Municipality',
            'Makhuduthamaga Local Municipality',
            'Vhembe District Municipality',
            'Collins Chabane Local Municipality (LIM345)',
            'Makhado Local Municipality',
            'Musina Local Municipality',
            'Thulamela Local Municipality',
            'Waterberg District Municipality',
            'Bela-Bela Local Municipality',
            'Lephalale Local Municipality',
            'Modimolle Local Municipality LIM 368 Local Municipality (LIM368)',
            'Mogalakwena Local Municipality',
            'Thabazimbi Local Municipality'
          ]
          break
        case 'Mpumalanga':
          mu = [
            'Ehlanzeni District Municipality',
            'Bushbuckridge Local Municipality',
            'Nkomazi Local Municipality',
            'City of Mbombela Local Municipality',
            'Thaba Chweu Local Municipality',
            'Gert Sibande District Municipality',
            'Dipaleseng Local Municipality',
            'Dr Pixley Ka Isaka Seme Local Municipality',
            'Govan Mbeki Local Municipality',
            'Lekwa Local Municipality',
            'Mkhondo Local Municipality',
            'Msukaligwa Local Municipality',
            'Nkangala District Municipality',
            'Dr JS Moroka Local Municipality',
            'Emakhazeni Local Municipality',
            'Emalahleni Local Municipality',
            'Steve Tshwete Local Municipality'
          ]
          break
        case 'Northern Cape':
          mu = [
            'Dikgatlong Local Municipality',
            'Emthanjeni Local Municipality',
            'Frances Baard District Municipality',
            'Ga-segonyana Local Municipality',
            'Gamagara Local Municipality',
            'Hantam Local Municipality',
            'Joe Morolong Local Municipality',
            'John Taolo Gaetsewe District Municipality',
            'Kai Garib Local Municipality',
            'Kamiesberg Local Municipality',
            'Kareeberg Local Municipality',
            'Karoo Hoogland Local Municipality',
            'Kgatelopele Local Municipality',
            'Khai Ma Local Municipality',
            'Khara Hais Local Municipality',
            'Kheis Local Municipality',
            'Magareng Local Municipality',
            'Mier Local Municipality',
            'Nama-khoi Local Municipality',
            'Namakwa District Municipality',
            'Phokwane Local Municipality',
            'Pixley Ka Seme District Municipality',
            'Renosterburg Local Municipality',
            'Richtersveld Local Municipality',
            'Siyancuma Local Municipality',
            'Siyathemba Local Municipality',
            'Sol Plaatje Local Municipality',
            'Thembelihle Local Municipality',
            'Tsantsabane Local Municipality',
            'Ubuntu Local Municipality',
            'Umsobomvu Local Municipality',
            'ZF Mgcawu District Municipality'
          ]
          break
        case 'North West':
          mu = [
            'Bojanala Platinum District Municipality',
            'Kgetlengrivier Local Municipality',
            'Madibeng Local Municipality',
            'Moretele Local Municipality',
            'Moses Kotane Local Municipality',
            'Rustenburg Local Municipality',
            'Dr Kenneth Kaunda District Municipality',
            'City of Matlosana Local Municipality',
            'Maquassi Hills Local Municipality',
            'JB Marks Local Municipality',
            'Dr Ruth Segomotsi Mompati District Municipality',
            'Greater Taung Local Municipality',
            'Kagisano-Molopo Local Municipality',
            'Lekwa-Teemane Local Municipality',
            'Mamusa Local Municipality',
            'Naledi Local Municipality',
            'Ngaka Modiri Molema District Municipality',
            'Ditsobotla Local Municipality',
            'Mahikeng Local Municipality',
            'Ramotshere Moiloa Local Municipality',
            'Ratlou Local Municipality',
            'Tswaing Local Municipality'
          ]
          break
        case 'Western Cape':
          mu = [
            'City of Cape Town Metropolitan Municipality',
            'Cape Winelands District Municipality',
            'Langeberg Local Municipality',
            'Stellenbosch Local Municipality',
            'Witzenberg Local Municipality',
            'Central Karoo District Municipality',
            'Beaufort West Local Municipality',
            'Laingsburg Local Municipality',
            'Prince Albert Local Municipality',
            'Eden District Municipality',
            'Bitou Local Municipality',
            'George Local Municipality',
            'Hessequa Local Municipality',
            'Kannaland Local Municipality',
            'Knysna Local Municipality',
            'Mossel Bay Local Municipality',
            'Oudtshoorn Local Municipality',
            'Overberg District Municipality',
            'Cape Agulhas Local Municipality',
            'Overstrand Local Municipality',
            'Swellendam Local Municipality',
            'Theewaterskloof Local Municipality',
            'West Coast District Municipality',
            'Bergrivier Local Municipality',
            'Cederberg Local Municipality',
            'Matzikama Local Municipality',
            'Saldanha Bay Local Municipality',
            'Swartland Local Municipality'
          ]
          break

        default:
          break
      }

      return mu
    },
    uploaded_images() {
      return this.$store.state.form.uploaded_images
    },
    activeUserInfo() {
      return this.$store.state.user.app_active_user
    },
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    categories() {
      return this.$store.state.app.industriesAvailable
    },
    currencies() {
      return this.$store.state.app.currencies
    },
    reseller() {
      return this.$store.state.business.reseller
    },
    sub_sellers() {
      return this.$store.state.business.sub_sellers
    },
    google_place() {
      return this.$store.getters['google/google_place']
    },
    google_marker() {
      return this.$store.getters['google/google_marker']
    },
    google_man() {
      return this.$store.state.google.google_man
    }
  },
  methods: {
    registerUser() {
      // create user using firebase
      let vm = this
      this.$fireAuth
        .createUserWithEmailAndPassword(this.email, this.email)
        .then(cred => {
          this.uid = cred.user.uid

          let general = this.$fireStore
            .collection('user')
            .doc('info')
            .collection('general')
            .doc(cred.user.uid)

          let bus_general = this.$fireStore
            .collection('apps')
            .doc('users')
            .collection(this.activeBusinessInfo.b_uid)
            .doc('info')
            .collection('general')
            .doc(cred.user.uid)

          general.set({
            uid: cred.user.uid,
            disp_name: this.contactperson,
            email: this.email,
            date: moment().format('DD-MM-YYYY'),
            t_stamp: Date.now()
          })

          bus_general.set({
            date: moment().format('DD-MM-YYYY'),
            month: moment().format('MM-YYYY'),

            t_stamp: Date.now(),
            branch: '',
            disp_name: this.contactperson,
            email: this.email,
            uid: cred.user.uid,
            l_act: moment().format('DD-MM-YYYY'),
            name: '',
            mobile: null,
            o_status: 'Online',
            avatar: '',
            pos: '',
            p_notes: [],
            role: 'User',
            status: 'Active',
            surname: '',
            verified: false
          })

          vm.newBusiness()
        })
        .catch(err => {
          this.$vs.notify({
            title: 'Failed',
            text: `${err.message}`,
            color: 'danger'
          })
        })
    },

    newBusiness() {
      if (process.client) {
        if (this.radios1 == 'auto') {
          const geohash1 = Geohash.encode(
            `${this.google_marker.lat}`,
            `${this.google_marker.lng}`,
            1
          )
          this.geo1 = geohash1
          const geohash2 = Geohash.encode(
            `${this.google_marker.lat}`,
            `${this.google_marker.lng}`,
            2
          )
          this.geo2 = geohash2
          const geohash3 = Geohash.encode(
            `${this.google_marker.lat}`,
            `${this.google_marker.lng}`,
            3
          )
          this.geo3 = geohash3
          const geohash4 = Geohash.encode(
            `${this.google_marker.lat}`,
            `${this.google_marker.lng}`,
            4
          )
          this.geo4 = geohash4
          const geohash5 = Geohash.encode(
            `${this.google_marker.lat}`,
            `${this.google_marker.lng}`,
            5
          )
          this.geo5 = geohash5
          const geohash6 = Geohash.encode(
            `${this.google_marker.lat}`,
            `${this.google_marker.lng}`,
            6
          )
          this.geo6 = geohash6
          const geohash7 = Geohash.encode(
            `${this.google_marker.lat}`,
            `${this.google_marker.lng}`,
            7
          )
          this.geo7 = geohash7
          const geohash8 = Geohash.encode(
            `${this.google_marker.lat}`,
            `${this.google_marker.lng}`,
            8
          )
          this.geo8 = geohash8
          const geohash9 = Geohash.encode(
            `${this.google_marker.lat}`,
            `${this.google_marker.lng}`,
            9
          )
          this.geo9 = geohash9

          let vm = this
          let uniqueName = this.b_name.toLowerCase().replace(/\s/g, '_')

          let newLogo = ''
          if (this.uploaded_images[0]) {
            newLogo = this.uploaded_images[0]
          }

          let businessDetails = {
            logo: newLogo,
            uid: this.uid,
            disp_name: this.contactperson,
            u_email: this.email,
            b_name: this.b_name,
            // b_email: this.b_email,
            un_name: uniqueName,
            indstr: 'Agriculture',
            c_name: this.contactperson,
            c_surname: this.contactsurname,
            c_company: this.company,
            c_email: this.email,
            c_number: this.number,
            bank: this.bank,
            acc_type: this.acc_type,
            acc_num: this.acc_num,
            br_num: this.br_num,
            reg_type: 'Seller',
            date: moment().format('DD-MM-YYYY'),
            month: moment().format('MM-YYYY'),
            currency: '',
            desc: this.description,
            tax: 0,
            configuration: 'done',
            t_stamp: Date.now(),
            public: true,
            active: false,
            paid: true,
            b_uid: '',
            reseller: '',
            sub_sellers: [],
            geo1: this.geo1,
            geo2: this.geo2,
            geo3: this.geo3,
            geo4: this.geo4,
            geo5: this.geo5,
            geo6: this.geo6,
            geo7: this.geo7,
            geo8: this.geo8,
            geo9: this.geo9,
            vicinity: this.google_place.vicinity,
            addr_html: this.google_place.adr_address,
            for_address: this.google_place.formatted_address,
            utc_offset: this.google_place.utc_offset_minutes,
            addr_url: this.google_place.url,
            lat: this.google_marker.lat,
            lng: this.google_marker.lng
          }

          if (this.b_type == 'Individual') {
            businessDetails.b_name = this.contactperson
            businessDetails.un_name = this.contactperson
              .toLowerCase()
              .replace(/\s/g, '_')
            businessDetails.b_type = this.b_type
            businessDetails.id_number = this.id_number
            businessDetails.gender = this.gender
          } else {
            businessDetails.b_type = this.b_type
            businessDetails.reg_number = this.reg_number
            businessDetails.vat_number = this.vat_number
          }

          let ref = this.$fireStore
            .collection('apps')
            .doc('info')
            .collection('general')
          ref.add(businessDetails).then(function(docRef) {
            vm.successUpload()
            vm.$store.commit('form/FORM_ACTIVE', false)
            vm.$router.push('/')
          })
        } else {
          console.log('here google', this.google_man)
          const geohash1 = Geohash.encode(
            `${this.google_man.geometry.location.lat}`,
            `${this.google_man.geometry.location.lng}`,
            1
          )
          this.geo1 = geohash1
          const geohash2 = Geohash.encode(
            `${this.google_man.geometry.location.lat}`,
            `${this.google_man.geometry.location.lng}`,
            2
          )
          this.geo2 = geohash2
          const geohash3 = Geohash.encode(
            `${this.google_man.geometry.location.lat}`,
            `${this.google_man.geometry.location.lng}`,
            3
          )
          this.geo3 = geohash3
          const geohash4 = Geohash.encode(
            `${this.google_man.geometry.location.lat}`,
            `${this.google_man.geometry.location.lng}`,
            4
          )
          this.geo4 = geohash4
          const geohash5 = Geohash.encode(
            `${this.google_man.geometry.location.lat}`,
            `${this.google_man.geometry.location.lng}`,
            5
          )
          this.geo5 = geohash5
          const geohash6 = Geohash.encode(
            `${this.google_man.geometry.location.lat}`,
            `${this.google_man.geometry.location.lng}`,
            6
          )
          this.geo6 = geohash6
          const geohash7 = Geohash.encode(
            `${this.google_man.geometry.location.lat}`,
            `${this.google_man.geometry.location.lng}`,
            7
          )
          this.geo7 = geohash7
          const geohash8 = Geohash.encode(
            `${this.google_man.geometry.location.lat}`,
            `${this.google_man.geometry.location.lng}`,
            8
          )
          this.geo8 = geohash8
          const geohash9 = Geohash.encode(
            `${this.google_man.geometry.location.lat}`,
            `${this.google_man.geometry.location.lng}`,
            9
          )
          this.geo9 = geohash9

          let vm = this
          let uniqueName = this.b_name.toLowerCase().replace(/\s/g, '_')

          let newLogo = ''
          if (this.uploaded_images[0]) {
            newLogo = this.uploaded_images[0]
          }

          let businessDetails = {
            logo: newLogo,
            uid: this.uid,
            disp_name: this.contactperson,
            u_email: this.email,
            b_name: this.b_name,
            // b_email: this.b_email,
            un_name: uniqueName,
            indstr: 'Agriculture',
            c_name: this.contactperson,
            c_surname: this.contactsurname,
            c_company: this.company,
            c_email: this.email,
            c_number: this.number,
            bank: this.bank,
            acc_type: this.acc_type,
            acc_num: this.acc_num,
            br_num: this.br_num,
            reg_type: 'Seller',
            date: moment().format('DD-MM-YYYY'),
            month: moment().format('MM-YYYY'),
            currency: '',
            desc: this.description,
            tax: 0,
            configuration: 'done',
            t_stamp: Date.now(),
            public: true,
            active: false,
            paid: true,
            b_uid: '',
            reseller: '',
            sub_sellers: [],
            geo1: this.geo1,
            geo2: this.geo2,
            geo3: this.geo3,
            geo4: this.geo4,
            geo5: this.geo5,
            geo6: this.geo6,
            geo7: this.geo7,
            geo8: this.geo8,
            geo9: this.geo9,
            vicinity: this.google_man.address_components[0],
            addr_html: this.google_man.formatted_address,
            for_address: this.google_man.formatted_address,
            lat: this.google_man.geometry.location.lat,
            lng: this.google_man.geometry.location.lng
          }

          if (this.b_type == 'Individual') {
            businessDetails.b_name = this.contactperson
            businessDetails.un_name = this.contactperson
              .toLowerCase()
              .replace(/\s/g, '_')
            businessDetails.b_type = this.b_type
            businessDetails.id_number = this.id_number
            businessDetails.gender = this.gender
          } else {
            businessDetails.b_type = this.b_type
            businessDetails.reg_number = this.reg_number
            businessDetails.vat_number = this.vat_number
          }

          let ref = this.$fireStore
            .collection('apps')
            .doc('info')
            .collection('general')
          ref.add(businessDetails).then(function(docRef) {
            vm.successUpload()
            vm.$store.commit('form/FORM_ACTIVE', false)
            vm.$router.push('/')
          })
        }
      }
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
    autoLocation,
    vSelect,
    manualLocation
    // imageUpload
  }
}
</script>

<style lang="scss" scoped>
.text-style {
  color: black;
  text-align: center;
}
.add-new-data-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  height: calc(100% - 4.3rem);
}
</style>
