<!-- =========================================================================================
  File Name: Fanwall.vue
  Description: Fanwall Page
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div>
    <client-only>
      <topScroll style="margin-top: 80px; margin-bottom: 30px" />

      <div id="profile-page">
        <vs-tabs color="green" class="mt=10">
          <vs-tab @click="colorx = 'success'" label="Agri Ensights">
            <vs-row
              vs-align="center"
              vs-type="flex"
              vs-justify="space-around"
              vs-w="12"
            >
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="12"
              >
                <div class="con-tab-ejemplo">
                  <!-- COL AREA -->
                  <div class="vx-row">
                    <!-- COL 2 -->
                    <div class="w-full vx-col">
                      <!-- <div class="w-full vx-col lg:w-1/2"> -->
                      <vx-card
                        class="mt-base"
                        v-for="(post, index) in usersPosts"
                        :key="index"
                      >
                        <div>
                          <!-- POST HEADER -->
                          <div class="flex justify-between mb-4 post-header">
                            <div class="flex items-center">
                              <div>
                                <vs-avatar
                                  class="m-0"
                                  :src="userDetails.avatar"
                                  size="45px"
                                ></vs-avatar>
                              </div>
                              <div class="ml-4">
                                <h6>{{ post.author }}</h6>
                                <small>{{ post.time }} </small>
                              </div>
                            </div>
                            <div class="flex">
                              <feather-icon
                                class="ml-4"
                                icon="HeartIcon"
                                :svgClasses="{
                                  'text-danger fill-current stroke-current':
                                    post.isLiked
                                }"
                              ></feather-icon>
                            </div>
                          </div>
                          <div class="px-6 post-content">
                            <p>
                              <b>{{ post.title }}</b>
                            </p>
                          </div>
                          <!-- POST CONTENT -->
                          <div class="post-content">
                            <p>{{ post.text }}</p>
                          </div>
                          <div class="mt-4 mb-6 post-media-container">
                            <!-- <ul class="flex post-media-list">
              <li class="w-full m-1 post-media" v-for="(media, mediaIdex) in post.media.slice(0, 2)" :key="mediaIdex">-->
                            <img
                              class="rounded responsive"
                              :src="post.downloadURL"
                              alt="user-upload"
                            />
                          </div>

                          <!-- POST ACTION DATA -->
                          <div>
                            <div class="flex justify-between">
                              <div class="flex items-center">
                                <div class="flex items-center">
                                  <feather-icon
                                    class="mr-2"
                                    icon="HeartIcon"
                                    svgClasses="h-5 w-5"
                                  ></feather-icon>
                                  <span>{{ post.likes }}</span>
                                </div>
                                <ul class="ml-3 users-liked user-list sm:ml-6">
                                  <li
                                    v-for="(user, userIndex) in post.usersLiked"
                                    :key="userIndex"
                                  >
                                    <vx-tooltip
                                      :text="user.name"
                                      position="bottom"
                                    >
                                      <vs-avatar
                                        :src="user.img"
                                        size="30px"
                                        class="-m-1 border-2 border-white border-solid"
                                      ></vs-avatar>
                                    </vx-tooltip>
                                  </li>
                                </ul>
                                <small class="ml-2"
                                  >+{{ post.likes - 5 }} more</small
                                >
                              </div>
                              <div class="flex items-center">
                                <feather-icon
                                  class="mr-2"
                                  icon="MessageSquareIcon"
                                  svgClasses="h-5 w-5"
                                ></feather-icon>
                                <span>{{ post.comments }}</span>
                              </div>
                            </div>
                            <div class="mt-4 comments-container">
                              <ul class="user-comments-list">
                                <li
                                  v-for="(commentedUser,
                                  commentIndex) in post.usersCommented.slice(
                                    0,
                                    3
                                  )"
                                  :key="commentIndex"
                                  class="flex items-center mb-4 commented-user"
                                >
                                  <div class="mr-3">
                                    <vs-avatar
                                      class="m-0"
                                      :src="commentedUser.img"
                                      size="30px"
                                    />
                                  </div>
                                  <div class="leading-tight">
                                    <p class="font-medium">
                                      {{ commentedUser.author }}
                                    </p>
                                    <span class="text-xs">{{
                                      commentedUser.comment
                                    }}</span>
                                  </div>
                                  <div class="ml-auto">
                                    <div class="flex">
                                      <feather-icon
                                        icon="HeartIcon"
                                        svgClasses="h-4 w-4"
                                        class="mr-2 cursor-pointer"
                                      ></feather-icon>
                                      <feather-icon
                                        icon="MessageSquareIcon"
                                        svgClasses="h-4 w-4"
                                        class="cursor-pointer"
                                      ></feather-icon>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <span
                                class="flex justify-end"
                                v-if="post.usersCommented.length > 3"
                              >
                                <a
                                  class="inline-flex items-center text-sm"
                                  href
                                >
                                  <span>View All</span>
                                  <feather-icon
                                    :icon="
                                      $vs.rtl
                                        ? 'ChevronsLeftIcon'
                                        : 'ChevronsRightIcon'
                                    "
                                    svgClasses="h-4 w-4"
                                  ></feather-icon>
                                </a>
                              </span>
                            </div>
                            <div class="post-comment" v-if="isUserLogged">
                              <vs-textarea
                                label="Add Comment"
                                class="mb-2"
                                v-model="post.commentbox"
                              />
                              <vs-button size="small" @click="postComment(post)"
                                >Post Comment</vs-button
                              >
                            </div>
                          </div>
                        </div>
                      </vx-card>
                    </div>
                  </div>
                  <addData v-if="isUserLogged" />
                </div>
              </vs-col>
            </vs-row>
          </vs-tab>
          <vs-tab @click="instagram" label="Instagram">
            <div class="con-tab-ejemplo">
              <h3>Please share us to your favourite medium</h3>
              <social-sharing
                url="https://agri-ensights/"
                title="Agri Ensight"
                description="Agri Ensights ........ "
                quote="Agri Ensights ........"
                hashtags="agri,farming,technology"
                twitter-user="agriEnsights"
                inline-template
              >
                <div>
                  <network
                    network="email"
                    class="px-2"
                    style="font-size: 2em; color: Black;"
                  >
                    <i class="fas fa-envelope"> Email</i>
                  </network>
                  <network
                    network="facebook"
                    class="px-2"
                    style="font-size: 2em; color: #1b80e4;"
                  >
                    <i class="fab fa-facebook-square"> Facebook</i>
                  </network>

                  <network
                    network="line"
                    class="px-2"
                    style="font-size: 2em; color: #00b900;"
                  >
                    <i class="fab fa-line"> Line</i>
                  </network>
                  <network
                    network="linkedin"
                    class="px-2"
                    style="font-size: 2em; color: #1b80e4;"
                  >
                    <i class="fab fa-linkedin"> LinkedIn</i>
                  </network>
                  <network
                    network="odnoklassniki"
                    class="px-2"
                    style="font-size: 2em; color: #ffc107;"
                  >
                    <i class="fab fa-odnoklassniki"> Odnoklassniki</i>
                  </network>
                  <network
                    network="pinterest"
                    class="px-2"
                    style="font-size: 2em; color: #e53333;"
                  >
                    <i class="fab fa-pinterest-square"> Pinterest</i>
                  </network>
                  <network
                    network="reddit"
                    class="px-2"
                    style="font-size: 2em; color: Orange;"
                  >
                    <i class="fab fa-reddit-square"> Reddit</i>
                  </network>
                  <network
                    network="skype"
                    class="px-2"
                    style="font-size: 2em; color: Blue;"
                  >
                    <i class="fab fa-skype"> Skype</i>
                  </network>
                  <network
                    network="sms"
                    class="px-2"
                    style="font-size: 2em; color: Black;"
                  >
                    <i class="fas fa-sms"> SMS</i>
                  </network>
                  <network
                    network="telegram"
                    class="px-2"
                    style="font-size: 2em; color: Blue;"
                  >
                    <i class="fab fa-telegram"> Telegram</i>
                  </network>
                  <network
                    network="twitter"
                    class="px-2"
                    style="font-size: 2em; color: #03acf8;"
                  >
                    <i class="fab fa-twitter-square"> Twitter</i>
                  </network>
                  <network
                    network="vk"
                    class="px-2"
                    style="font-size: 2em; color: #03acf8;"
                  >
                    <i class="fab fa-vk"> VKontakte</i>
                  </network>
                  <network
                    network="weibo"
                    class="px-2"
                    style="font-size: 2em; color: red;"
                  >
                    <i class="fab fa-weibo"> Weibo</i>
                  </network>
                  <network
                    network="whatsapp"
                    class="px-2"
                    style="font-size: 2em; color: green;"
                  >
                    <i class="fab fa-whatsapp-square"> Whatsapp</i>
                  </network>
                </div>
              </social-sharing>
            </div>
          </vs-tab>
          <vs-tab @click="facebook" label="Facebook">
            <div class="con-tab-ejemplo">
              <network
                network="email"
                class="px-2"
                style="font-size: 2em; color: Black;"
              >
                <i class="fas fa-envelope"> Email</i>
              </network>
              <network
                network="facebook"
                class="px-2"
                style="font-size: 2em; color: #1b80e4;"
              >
                <i class="fab fa-facebook-square"> Facebook</i>
              </network>

              <network
                network="line"
                class="px-2"
                style="font-size: 2em; color: #00b900;"
              >
                <i class="fab fa-line"> Line</i>
              </network>
              <network
                network="linkedin"
                class="px-2"
                style="font-size: 2em; color: #1b80e4;"
              >
                <i class="fab fa-linkedin"> LinkedIn</i>
              </network>
              <network
                network="odnoklassniki"
                class="px-2"
                style="font-size: 2em; color: #ffc107;"
              >
                <i class="fab fa-odnoklassniki"> Odnoklassniki</i>
              </network>
              <network
                network="pinterest"
                class="px-2"
                style="font-size: 2em; color: #e53333;"
              >
                <i class="fab fa-pinterest-square"> Pinterest</i>
              </network>
              <network
                network="reddit"
                class="px-2"
                style="font-size: 2em; color: Orange;"
              >
                <i class="fab fa-reddit-square"> Reddit</i>
              </network>
              <network
                network="skype"
                class="px-2"
                style="font-size: 2em; color: Blue;"
              >
                <i class="fab fa-skype"> Skype</i>
              </network>
              <network
                network="sms"
                class="px-2"
                style="font-size: 2em; color: Black;"
              >
                <i class="fas fa-sms"> SMS</i>
              </network>
              <network
                network="telegram"
                class="px-2"
                style="font-size: 2em; color: Blue;"
              >
                <i class="fab fa-telegram"> Telegram</i>
              </network>
              <network
                network="twitter"
                class="px-2"
                style="font-size: 2em; color: #03acf8;"
              >
                <i class="fab fa-twitter-square"> Twitter</i>
              </network>
              <network
                network="vk"
                class="px-2"
                style="font-size: 2em; color: #03acf8;"
              >
                <i class="fab fa-vk"> VKontakte</i>
              </network>
              <network
                network="weibo"
                class="px-2"
                style="font-size: 2em; color: red;"
              >
                <i class="fab fa-weibo"> Weibo</i>
              </network>
              <network
                network="whatsapp"
                class="px-2"
                style="font-size: 2em; color: green;"
              >
                <i class="fab fa-whatsapp-square"> Whatsapp</i>
              </network>
            </div>
          </vs-tab>
          <vs-tab @click="twitter" label="Twitter">
            <div class="con-tab-ejemplo">
              <network
                network="email"
                class="px-2"
                style="font-size: 2em; color: Black;"
              >
                <i class="fas fa-envelope"> Email</i>
              </network>
              <network
                network="facebook"
                class="px-2"
                style="font-size: 2em; color: #1b80e4;"
              >
                <i class="fab fa-facebook-square"> Facebook</i>
              </network>

              <network
                network="line"
                class="px-2"
                style="font-size: 2em; color: #00b900;"
              >
                <i class="fab fa-line"> Line</i>
              </network>
              <network
                network="linkedin"
                class="px-2"
                style="font-size: 2em; color: #1b80e4;"
              >
                <i class="fab fa-linkedin"> LinkedIn</i>
              </network>
              <network
                network="odnoklassniki"
                class="px-2"
                style="font-size: 2em; color: #ffc107;"
              >
                <i class="fab fa-odnoklassniki"> Odnoklassniki</i>
              </network>
              <network
                network="pinterest"
                class="px-2"
                style="font-size: 2em; color: #e53333;"
              >
                <i class="fab fa-pinterest-square"> Pinterest</i>
              </network>
              <network
                network="reddit"
                class="px-2"
                style="font-size: 2em; color: Orange;"
              >
                <i class="fab fa-reddit-square"> Reddit</i>
              </network>
              <network
                network="skype"
                class="px-2"
                style="font-size: 2em; color: Blue;"
              >
                <i class="fab fa-skype"> Skype</i>
              </network>
              <network
                network="sms"
                class="px-2"
                style="font-size: 2em; color: Black;"
              >
                <i class="fas fa-sms"> SMS</i>
              </network>
              <network
                network="telegram"
                class="px-2"
                style="font-size: 2em; color: Blue;"
              >
                <i class="fab fa-telegram"> Telegram</i>
              </network>
              <network
                network="twitter"
                class="px-2"
                style="font-size: 2em; color: #03acf8;"
              >
                <i class="fab fa-twitter-square"> Twitter</i>
              </network>
              <network
                network="vk"
                class="px-2"
                style="font-size: 2em; color: #03acf8;"
              >
                <i class="fab fa-vk"> VKontakte</i>
              </network>
              <network
                network="weibo"
                class="px-2"
                style="font-size: 2em; color: red;"
              >
                <i class="fab fa-weibo"> Weibo</i>
              </network>
              <network
                network="whatsapp"
                class="px-2"
                style="font-size: 2em; color: green;"
              >
                <i class="fab fa-whatsapp-square"> Whatsapp</i>
              </network>
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </client-only>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import addData from '../components/social/addData'
import 'video.js/dist/video-js.css'
import topScroll from '../components/topScroll/index'
import firebase from 'firebase'
import moment from 'moment'
export default {
  components: { topScroll, videoPlayer, addData },

  data() {
    return {
      isNavOpen: false,
      isUserLogged: false,
      suggestedPagesShow: false,
      twitterFeedsShow: false,
      suggestedFriendsShow: false,
      userLatestPhotosShow: false,
      userPostsShow: false,
      pollsVote: false,
      currentDate: moment(Date.now()).format('LLLL'),
      loadMore: false,
      userPoll: '',
      user_info: {
        profile_img: require('@/assets/images/profile/user-uploads/user-13.jpg'),
        cover_img: require('@/assets/images/profile/user-uploads/cover.jpg')
      },
      mediaExtensions: {
        img: ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'exif', 'tiff'],
        video: ['avi', 'flv', 'wmv', 'mov', 'mp4', '3gp']
      },

      usersPosts: [],
      userPosts: [],

      wasSidebarOpen: null
    }
  },
  computed: {
    // userDetailsAdd() {
    //   return this.$store.getters['userManagement/userDetailsAdd']
    // },
    userDetails() {
      return this.$store.state.user.app_active_user
    },
    // companyDetails() {
    //   return this.$store.getters['app/companyDetails']
    // },
    // route() {
    //   return this.$store.getters['route/route']
    // },
    // routeID() {
    //   return this.$store.getters['route/routeID']
    // },
    // routeDisplayName() {
    //   return this.$store.getters['route/routeDisplayName']
    // },
    // routeName() {
    //   return this.$store.getters['route/routeName']
    // },
    // is_blank() {
    //   return this.$store.getters['route/isBlank']
    // },
    mediaType() {
      return (media) => {
        if (media.img) {
          const ext = media.img.split('.').pop()
          if (this.mediaExtensions.img.includes(ext)) return 'image'
        } else if (media.sources && media.poster) {
          // other validations
          return 'video'
        }
      }
    },
    playerOptions() {
      return (media) => {
        return {
          height: '360',
          fluid: true,
          autoplay: false,
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: media.sources,
          poster: media.poster
        }
      }
    }
  },
  methods: {
    instagram() {
      window.open('https://www.instagram.com/agri_ensights/', '_blank')
    },
    twitter() {
      window.open('https://twitter.com/AEnsights', '_blank')
    },
    facebook() {
      window.open('https://web.facebook.com/AgriEnsights/', '_blank')
    },
    postComment(post) {
      console.log('post', post)

      let vm = this
      let routeID = this.routeID
      let addingInformation
      console.log('this usersPosts', this.usersPosts)
      for (let i = 0; i < this.usersPosts.length; i++) {
        if (this.usersPosts[i].id == post.id) {
          console.log('Im in')
          this.usersPosts[i].usersCommented.push({
            comment: post.commentbox,
            author: vm.userDetails.displayName,
            img: vm.userDetails.photoURL,
            time: vm.currentDate
          })
        }
      }

      addingInformation = this.$fireStore
        .collection('agri-ensights')
        .doc('apps')
        .collection('social')
        .doc(post.id)

      addingInformation.update({
        usersCommented: firebase.firestore.FieldValue.arrayUnion({
          comment: post.commentbox,
          author: vm.userDetails.displayName,
          img: vm.userDetails.photoURL,
          time: vm.currentDate
        }),

        comments: 1 + post.comments
      })
      this.successUpload()
    },
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Whoop whoop, been uploaded'
      })
    },
    userDetailsAdding() {
      let payload = !this.userDetailsAdd
      this.$store.dispatch('userManagement/userDetailsAdd', payload)
    },
    loadContent() {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: '#button-load-more-posts',
        scale: 0.45
      })
      setTimeout(() => {
        this.$vs.loading.close('#button-load-more-posts > .con-vs-loading')
      }, 3000)
    }
  },

  created() {
    let vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.isUserLogged = true
      } else {
        vm.isUserLogged = false
      }
    })

    let myUsers = []
    let routeID = this.routeID

    let getFanWalls = this.$fireStore
      .collection('agri-ensights')
      .doc('apps')
      .collection('social')
      .orderBy('timestamp')

    getFanWalls.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let doc = change.doc
        if (change.type === 'added') {
          this.usersPosts.push({
            id: doc.id,
            downloadURL: doc.data().downloadURL,
            downloadUrl: doc.data().downloadUrl,
            uid: doc.data().uid,
            customer_name: doc.data().customer_name,
            customer_surname: doc.data().customer_surname,
            author: doc.data().author,
            time: doc.data().time,
            isLiked: doc.data().isLiked,
            text: doc.data().text,
            likes: doc.data().likes,
            comments: doc.data().comments,
            usersLiked: doc.data().usersLiked,
            commentbox: doc.data().commentbox,
            usersCommented: doc.data().usersCommented,
            created_date: doc.data().created_date,
            created_month: doc.data().created_month,
            timestamp: doc.data().timestamp
          })
        }
        if (change.type === 'modified') {
          for (let i = 0; i < this.usersPosts.length; i++) {
            if (this.usersPosts[i].id == change.doc.id) {
              this.usersPosts[i] = {
                id: doc.id,
                downloadURL: doc.data().downloadURL,
                downloadUrl: doc.data().downloadUrl,
                uid: doc.data().uid,
                customer_name: doc.data().customer_name,
                customer_surname: doc.data().customer_surname,
                author: doc.data().author,
                time: doc.data().time,
                isLiked: doc.data().isLiked,
                text: doc.data().text,
                likes: doc.data().likes,
                comments: doc.data().comments,
                usersLiked: doc.data().usersLiked,
                commentbox: doc.data().commentbox,
                usersCommented: doc.data().usersCommented,
                created_date: doc.data().created_date,
                created_month: doc.data().created_month,
                timestamp: doc.data().timestamp
              }
            }
          }
        }
        if (change.type === 'removed') {
          console.log('Removed city: ', change.doc.data())
        }
      })
    })
    // }
  },
  mounted() {
    this.wasSidebarOpen = this.$store.state.reduceButton
    this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
  },
  beforeDestroy() {
    if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/vuexy/pages/profile.scss';
</style>
