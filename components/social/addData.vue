<!-- =========================================================================================
  File Name: Add data for Fanwall
  Description: Template Customizer
  Component Name: TheCustomizer
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="theme-customizer">
    <!-- Open Customizer Button -->
    <vs-button
      @click.stop="active = !active"
      color="primary"
      type="filled"
      class="customizer-btn"
      icon-pack="feather"
      icon="icon-settings"
    />

    <!-- Customizer Content -->
    <vs-sidebar
      click-not-close
      hidden-background
      position-right
      v-model="active"
      class="items-no-padding"
    >
      <div class="h-full">
        <div
          class="flex items-center justify-between px-6 mt-6 customizer-header"
        >
          <div>
            <h4></h4>
            <small>Send a Post</small>
          </div>
          <feather-icon
            icon="XIcon"
            @click.stop="active = false"
            class="cursor-pointer"
          ></feather-icon>
        </div>

        <vs-divider class="mb-0" />

        <div parent="body" default-index="1" color="primary">
          <div class="px-6">
            <!-- NAME -->
            <vs-input
              label="Title"
              name="appname"
              v-model="title"
              class="w-full mt-5"
            />
            <!-- DESCRIPTION -->
            <vs-textarea
              label="Message"
              v-model="description"
              class="w-full mt-5"
            />

            <div id="app">
              <div class="w-full mt-5">
                <input
                  label="file"
                  type="file"
                  multiple
                  @change="onFileChange"
                />
              </div>
            </div>

            <br />
            <div slot="footer">
              <vs-row vs-justify="flex-end">
                <vs-button color="primary" type="gradient" @click="letsTry"
                  >Submit</vs-button
                >
                <vs-button color="danger" type="gradient" @click="goBack"
                  >Cancel</vs-button
                >
              </vs-row>
            </div>
            <vs-divider color="primary" icon="check"></vs-divider>
            <br />
          </div>
          <vs-card actionable class="px-6" v-if="preview">
            <div class="flex justify-between px-6 mb-4 post-header">
              <div class="flex items-center">
                <div>
                  <vs-avatar
                    class="m-0"
                    :src="userDetails.photoURL"
                    size="45px"
                  ></vs-avatar>
                </div>
                <div class="ml-4">
                  <h6>{{ userDetails.displayName }}</h6>
                  <small>{{ currentDate }}</small>
                  <!-- <small>{{ Date.now() }} at {{ post.time | time }}</small> -->
                </div>
              </div>
              <div class="flex">
                <feather-icon
                  class="ml-4"
                  icon="HeartIcon"
                  :svgClasses="{
                    'text-danger fill-current stroke-current': false
                  }"
                ></feather-icon>
              </div>
            </div>
            <div class="px-6 post-content">
              <p>
                <b>{{ title }}</b>
              </p>
            </div>
            <!-- POST CONTENT -->
            <div class="px-6 post-content">
              <p>{{ description }}</p>
            </div>
            <div class="px-6 mt-4 mb-6 post-media-container">
              <ul class="flex post-media-list">
                <div v-if="images">
                  <li
                    class="w-full m-1 post-media"
                    v-for="(media, mediaIdex) in images"
                    :key="mediaIdex"
                  >
                    <img
                      class="rounded responsive"
                      :src="media"
                      alt="user-upload"
                    />
                  </li>
                </div>
              </ul>
            </div>
          </vs-card>
        </div>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import imageUpload from '@/components/image-upload/single-image'
// import addData from '@/components/components/forms/addData'
import moment from 'moment'

import firebase from 'firebase'
export default {
  data() {
    return {
      data: {
        name: `${this.$route.params.id}`,
        addingData: {
          schema: [
            {
              fieldType: 'TextInput',
              placeholder: 'Name',
              label: 'Name',
              name: 'name'
            }
          ],
          Location: false,
          ImageUpload: true,
          Html: true
        }
      },
      currentDate: moment(Date.now()).format('LLLL'),
      myPhoto: {
        description: ''
      },
      active: false,
      getPhotosDetails: [],
      name: '',
      title: '',
      description: '',
      component: '',
      currentComponent: '',
      imageName: '',
      imageFile: '',
      imageUrls: '',
      preview: false,
      image: '',
      images: [],

      comp: [],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    }
  },
  watch: {
    title: function() {
      this.preview = true
    },
    description: function() {
      this.preview = true
    },
    addFormData: function() {
      this.letsTry()
    }
  },

  created() {
    let getPhoto = this.$fireStore
      .collection('agri-ensights')
      .doc('apps')
      .collection('social')

    getPhoto.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc
        this.getPhotosDetails.push({
          id: doc.id,
          description: doc.data().description,
          name: doc.data().name,
          title: doc.data().title,
          downloadURL: doc.data().downloadURL,
          downloadUrl: doc.data().downloadUrl
        })
      })
    })
  },
  computed: {
    featureCurrent() {
      return this.$store.getters['feature/componentSet']
    },
    companyDetails() {
      return this.$store.getters['app/companyDetails']
    },
    userDetails() {
      return this.$store.getters['userManagement/userDetails']
    },
    resellerName() {
      return this.$store.getters['app/resellerName']
    },
    imageUrl() {
      return this.$store.getters['form/imageUrls']
    },

    imageMulti() {
      return this.$store.getters['form/imageMulti']
    },
    bucketName() {
      return this.$store.getters['storageBucket']
    },
    blank_page() {
      return this.$store.getters['blank_page']
    },
    blank_route() {
      return this.$store.getters['blank_route']
    },
    addFormData() {
      return this.$store.getters['form/addFormData']
    },
    route() {
      return this.$store.getters['route/route']
    },
    routeID() {
      return this.$store.getters['route/routeID']
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

    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        if (!val) {
          this.$emit('closeSidebar')
          this.initValues()
        }
      }
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      this.createImage(files)
    },
    createImage(files) {
      var vm = this
      for (var index = 0; index < files.length; index++) {
        this.imageName = files[0].name
        var reader = new FileReader()
        var getImage = ''
        reader.onload = function(event) {
          const imageUrl = event.target.result
          getImage = event.target.result
          vm.images.push(imageUrl)
        }

        this.imageUrls = this.images
        this.imageFile = files[0]
        reader.readAsDataURL(files[index])
      }
    },
    removeImage(index) {
      this.images.splice(index, 1)
    },
    letsTry() {
      let routeID = this.routeID

      const storageRef = firebase.storage().ref()
      const mountainsRef = storageRef.child(`images/${this.imageName}`)
      const bucketName = this.bucketName
      const filePath = this.imageName
      let resellerName = this.companyDetails.reseller

      let addingInformation = this.$fireStore
        .collection('agri-ensights')
        .doc('apps')
        .collection('social')

      mountainsRef.put(this.imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.imageUrls = downloadURL

          addingInformation.add({
            downloadURL,
            downloadUrl:
              `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/images` +
              '%2F' +
              `${encodeURIComponent(filePath)}?alt=media`,
            uid: firebase.auth().currentUser.uid,
            customer_name: this.userDetails.name,
            customer_surname: this.userDetails.surname,
            author: this.userDetails.displayName,
            time: this.currentDate,
            isLiked: false,
            text: this.description,
            media: 'image',
            likes: 0,
            comments: 0,
            usersLiked: [],
            commentbox: '',
            usersCommented: [],
            created_date: moment().format('DD-MM-YYYY'),
            created_month: moment().format('MM-YYYY'),
            timestamp: Date.now()
          })
          this.successUpload()
        })
      })
    },
    newApp() {
      var storageRef = firebase.storage().ref()

      var mountainsRef = storageRef.child(`images/${this.imageName}`)

      mountainsRef.put(this.imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.imageUrls = downloadURL
          const bucketName = this.storageBucket
          const filePath = this.imageName

          this.$fireStore
            .collection('agri-ensights')
            .doc('apps')
            .collection('social')
            .add({
              downloadURL,
              downloadUrl:
                `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/images` +
                '%2F' +
                `${encodeURIComponent(filePath)}?alt=media`,
              uid: firebase.auth().currentUser.uid,
              customer_name: this.userDetails.name,
              customer_surname: this.userDetails.surname,
              author: this.userDetails.displayName,
              time: this.currentDate,
              isLiked: false,
              text: this.description,
              media: [{ img: downloadURL }],
              likes: 0,
              comments: 0,
              usersLiked: [],
              commentbox: '',
              usersCommented: [],
              created_date: moment().format('DD-MM-YYYY'),
              created_month: moment().format('MM-YYYY'),
              timestamp: Date.now()
            })
        })
      })
      this.successUpload()
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
    imageUpload
    // addData
  }
}
</script>

<style lang="scss">
#theme-customizer {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 400px;
    max-width: 90vw;
    // @apply shadow-lg;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
      0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }
}

.customizer-btn {
  position: fixed;
  top: 50%;
  right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 50000;

  .vs-icon {
    animation: spin 1.5s linear infinite;
  }
}

.scroll-area--customizer {
  height: calc(100% - 5rem);
}
</style>
