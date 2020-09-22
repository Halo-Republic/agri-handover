<!-- =========================================================================================
  File Name: Profile.vue
  Description: Profile Page
  ----------------------------------------------------------------------------------------
========================================================================================== -->

<template>
  <div id="profile-page">
    <client-only>
      <!-- PROFILE HEADER -->
      <div class="profile-header">
        <div class="relative">
          <topScroll />
          <div class="profile-img-container pointer-events-none">
            <div>
              <vs-avatar
                class="user-profile-img"
                :src="activeUserInfo.avatar"
                size="85px"
                style="z-index: 500"
              />
            </div>
            <div class="profile-actions pointer-events-auto flex">
              <vs-button
                icon-pack="feather"
                radius
                icon="icon-edit-2"
                style="z-index: 500"
                @click="$router.push('/user_settings')"
              ></vs-button>
              <vs-button
                icon-pack="feather"
                radius
                icon="icon-settings"
                style="z-index: 500"
                class="ml-2 lg:ml-4"
              ></vs-button>
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-end flex-wrap profile-header-nav p-6"
        >
          <div class="block sm:hidden">
            <feather-icon
              @click="isNavOpen = !isNavOpen"
              icon="AlignJustifyIcon"
              v-show="!isNavOpen"
              class="vx-navbar-toggler cursor-pointer"
            />
            <feather-icon
              icon="XIcon"
              v-show="isNavOpen"
              @click="isNavOpen = !isNavOpen"
              class="vx-navbar-toggler cursor-pointer"
            />
          </div>
          <div
            :class="isNavOpen ? 'block' : 'hidden'"
            class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
          >
            <div class="text-sm sm:flex-grow">
              <ul
                class="sm:flex justify-around  w-full md:mt-0 md:ml-auto md:w-3/4"
              >
                <!-- <li class="p-2 sm:p-0 cur" @click="pageView('Timeline')">
                  Timeline
                </li> -->
                <li
                  class="p-2 sm:p-0 cur cursor-pointer"
                  @click="pageView('About')"
                >
                  About Me
                </li>
                <!-- <li class="p-2 sm:p-0 cur" @click="pageView('Photos')">
                  Photos
                </li> -->
                <li
                  class="p-2 sm:p-0 cur cursor-pointer"
                  @click="pageView('Business')"
                >
                  Business
                </li>

                <li
                  class="p-2 sm:p-0 cur cursor-pointer"
                  @click="pageView('Businesses')"
                  v-if="activeUserInfo.role == 'Admin'"
                >
                  All Businesses
                </li>
                <!-- <li class="p-2 sm:p-0 cur" @click="pageView('Videos')">
                  Videos
                </li>
                <li class="p-2 sm:p-0 cur" @click="pageView('Events')">
                  Events
                </li> -->
              </ul>
            </div>
          </div>
        </div>
        <!-- <vx-navbar> -->
        <!-- </vx-navbar> -->
      </div>

      <!-- COL AREA -->
      <div class="vx-row" v-if="pageViews === 'About'">
        <!-- COL 1 -->
        <div class="vx-col w-full lg:w-1/3"></div>
        <div class="vx-col w-full lg:w-1/3">
          <!-- ABOUT CARD -->
          <vx-card title="About" class="mt-base">
            <!-- ACTION SLOT -->
            <template slot="actions">
              <feather-icon icon="MoreHorizontalIcon"></feather-icon>
            </template>

            <!-- USER BIO -->
            <div class="user-bio">
              <p>{{ activeUserInfo.disp_name }}</p>
            </div>

            <!-- OTEHR DATA -->
            <div class="mt-5">
              <h6>Joined:</h6>
              <p>{{ activeUserInfo.date }}</p>
            </div>
            <!-- 
            <div class="mt-5">
              <h6>Lives:</h6>
              <p>New York, USA</p>
            </div> -->

            <div class="mt-5">
              <h6>Email:</h6>
              <p>{{ activeUserInfo.email }}</p>
            </div>

            <!-- <div class="mt-5">
              <h6>Website:</h6>
              <p>{{ activeUserInfo.Website }}</p>
            </div> -->

            <div class="mt-5">
              <h6>Business:</h6>
              <div v-for="biz in activeUserInfo.apps" :key="biz">
                <p>
                  {{ biz.b_name }}
                </p>
              </div>
            </div>

            <!-- <div class="social-links flex mt-4">
              <feather-icon
                svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded"
                class="mr-2"
                icon="FacebookIcon"
              ></feather-icon>
              <feather-icon
                svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded"
                class="mr-2"
                icon="TwitterIcon"
              ></feather-icon>
              <feather-icon
                svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded"
                class="mr-2"
                icon="InstagramIcon"
              ></feather-icon>
            </div> -->
          </vx-card>
        </div>
        <div class="vx-col w-full lg:w-1/3"></div>
        <!-- <company-card
          class="vx-col w-1/2 sm:w-1/2 md:w-1/3 xl:1/4"
          v-for="item in businesses"
          :key="item.id"
          icon="UsersIcon"
          :app="item"
          :b_name="item.b_name"
          :companyname="item.contact_company"
          :email="item.contact_email"
          :name="item.contact_person"
          :surname="item.contact_surname"
          :id="item.b_uid"
        ></company-card> -->
      </div>

      <div class="vx-row" v-if="pageViews == 'Business'">
        <div class="vx-col w-full">
          <div class="flex justify-center mt-base">
            <vs-button
              v-if="!$store.state.form.form_active"
              id="button-load-more-posts"
              class="vs-con-loading__container mb-4"
              @click="$store.commit('form/FORM_ACTIVE', true)"
              >Register Business</vs-button
            >

            <vs-button
              v-if="$store.state.form.form_active"
              id="button-load-more-posts"
              color="danger"
              class="vs-con-loading__container mb-4"
              @click="$store.commit('form/FORM_ACTIVE', false)"
              >Cancel</vs-button
            >
          </div>
        </div>

        <vs-card
          class="holamundo "
          title="Business Registration"
          v-if="$store.state.form.form_active"
        >
          <register-business />
        </vs-card>

        <company-card
          class="vx-col w-1/2 sm:w-1/2 md:w-1/3 xl:1/4"
          v-for="item in businesses"
          :key="item.id"
          icon="UsersIcon"
          :app="item"
          :b_name="item.b_name"
          :companyname="item.contact_company"
          :email="item.contact_email"
          :name="item.contact_person"
          :surname="item.contact_surname"
          :id="item.b_uid"
        ></company-card>
      </div>
      <div class="vx-row mx-12" v-if="pageViews == 'Businesses'">
        <vs-list>
          <vs-list-header title="Group 2" color="success"></vs-list-header>

          <vs-list-item
            v-for="app in apps"
            :key="app.id"
            :title="app.b_name"
            :subtitle="app.c_person"
          >
            <vs-switch
              color="warning"
              v-model="app.active"
              @change="appActive(app)"
            />
          </vs-list-item>
        </vs-list>
      </div>
    </client-only>
  </div>
</template>

<script>
import registerBusiness from '@/components/register/form.vue'
import companyCard from '@/components/ui-elements/card/card_company'
import topScroll from '@/components/topScroll/index'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
  components: {
    videoPlayer,
    companyCard,
    registerBusiness,
    topScroll
  },
  data() {
    return {
      isNavOpen: false,
      pageViews: 'About',
      apps: [],
      userPoll: '',
      user_info: {
        profile_img: require('@/assets/images/profile/user-uploads/user-13.jpg'),
        cover_img: require('@/assets/images/profile/user-uploads/cover.jpg')
      },
      mediaExtensions: {
        img: ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'exif', 'tiff'],
        video: ['avi', 'flv', 'wmv', 'mov', 'mp4', '3gp']
      },
      suggestedFriends: [
        {
          name: 'Carissa Dolle',
          avatar: require('@/assets/images/portrait/small/avatar-s-5.jpg'),
          mutualFriends: 6
        },
        {
          name: 'Liliana Pecor',
          avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
          mutualFriends: 3
        },
        {
          name: 'Isidra Strunk',
          avatar: require('@/assets/images/portrait/small/avatar-s-7.jpg'),
          mutualFriends: 2
        },
        {
          name: 'Gerald Licea',
          avatar: require('@/assets/images/portrait/small/avatar-s-8.jpg'),
          mutualFriends: 1
        },
        {
          name: 'Kelle Herrick',
          avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg'),
          mutualFriends: 1
        },
        {
          name: 'Cesar Lee',
          avatar: require('@/assets/images/portrait/small/avatar-s-10.jpg'),
          mutualFriends: 1
        },
        {
          name: 'John Doe',
          avatar: require('@/assets/images/portrait/small/avatar-s-11.jpg'),
          mutualFriends: 1
        },
        {
          name: 'Tonia Seabold',
          avatar: require('@/assets/images/portrait/small/avatar-s-12.jpg'),
          mutualFriends: 1
        }
      ],

      userPosts: [
        {
          author: 'Leeanna Alvord',
          time: 'Mon Dec 12 2018 07:46:05 GMT+0000 (GMT)',
          isLiked: true,
          text:
            'I love jujubes wafer pie ice cream tiramisu. Chocolate I love pastry pastry sesame snaps wafer. Pastry topping biscuit lollipop topping I love lemon drops sweet roll bonbon. Brownie donut icing.',
          media: [{ img: require('@/assets/images/profile/post-media/2.jpg') }],
          likes: 145,
          comments: 77,
          usersLiked: [
            {
              name: 'Trina Lynes',
              img: require('@/assets/images/portrait/small/avatar-s-1.jpg')
            },
            {
              name: 'Lilian Nenez',
              img: require('@/assets/images/portrait/small/avatar-s-2.jpg')
            },
            {
              name: 'Alberto Glotzbach',
              img: require('@/assets/images/portrait/small/avatar-s-3.jpg')
            },
            {
              name: 'George Nordick',
              img: require('@/assets/images/portrait/small/avatar-s-4.jpg')
            },
            {
              name: 'Vennie Mostowy',
              img: require('@/assets/images/portrait/small/avatar-s-5.jpg')
            }
          ],
          commentbox: '',
          usersCommented: [
            {
              comment: 'orthoplumbate morningtide naphthaline exarteritis',
              author: 'Kitty Allanson',
              img: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
              time: 'Mon Dec 10 2018 08:56:05 GMT+0000 (GMT)'
            },
            {
              comment: 'blockiness pandemy metaxylene speckle coppy',
              author: 'Jeanie Bulgrin',
              img: require('@/assets/images/portrait/small/avatar-s-8.jpg'),
              time: 'Mon Dec 10 2018 08:55:00 GMT+0000 (GMT)'
            }
          ]
        },
        {
          author: 'Leeanna Alvord',
          time: 'Mon Dec 11 2018 08:05:05 GMT+0000 (GMT)',
          isLiked: false,
          text:
            'Candy jelly beans powder brownie biscuit. Jelly marzipan oat cake cake. Cupcake I love wafer cake. Halvah I love powder jelly I love cheesecake cotton candy tiramisu brownie.',
          media: [
            { img: require('@/assets/images/profile/post-media/25.jpg') }
          ],
          likes: 276,
          comments: 105,
          usersLiked: [
            {
              name: 'Lai Lewandowski',
              img: require('@/assets/images/portrait/small/avatar-s-6.jpg')
            },
            {
              name: 'Elicia Rieske',
              img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
            },
            {
              name: 'Darcey Nooner',
              img: require('@/assets/images/portrait/small/avatar-s-8.jpg')
            },
            {
              name: 'Julee Rossignol',
              img: require('@/assets/images/portrait/small/avatar-s-10.jpg')
            },
            {
              name: 'Jeffrey Gerondale',
              img: require('@/assets/images/portrait/small/avatar-s-9.jpg')
            }
          ],
          commentbox: '',
          usersCommented: [
            {
              comment: 'I love cupcake danish jujubes sweet.',
              author: 'Darcey Nooner',
              img: require('@/assets/images/portrait/small/avatar-s-8.jpg'),
              time: 'Mon Dec 11 2018 09:56:05 GMT+0000 (GMT)'
            },
            {
              comment: 'Wafer I love brownie jelly bonbon tart apple pie',
              author: 'Lai Lewandowski',
              img: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
              time: 'Mon Dec 10 2018 09:50:00 GMT+0000 (GMT)'
            }
          ]
        },
        {
          author: 'Leeanna Alvord',
          time: 'Mon Dec 10 2018 12:05:05 GMT+0000 (GMT)',
          isLiked: false,
          text:
            'Wafer I love brownie jelly bonbon tart. Candy jelly beans powder brownie biscuit. Jelly marzipan oat cake cake.',
          media: [
            {
              sources: [
                { type: 'video/mp4', src: 'http://vjs.zencdn.net/v/oceans.mp4' }
              ],
              poster: 'https://goo.gl/xcCsDd'
            }
          ],
          likes: 269,
          comments: 98,
          usersLiked: [
            {
              name: 'Vennie Mostowy',
              img: require('@/assets/images/portrait/small/avatar-s-5.jpg')
            },
            {
              name: 'Elicia Rieske',
              img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
            },
            {
              name: 'Julee Rossignol',
              img: require('@/assets/images/portrait/small/avatar-s-10.jpg')
            },
            {
              name: 'Darcey Nooner',
              img: require('@/assets/images/portrait/small/avatar-s-8.jpg')
            },
            {
              name: 'Elicia Rieske',
              img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
            }
          ],
          commentbox: '',
          usersCommented: [
            {
              comment: 'I love cupcake danish jujubes sweet.',
              author: 'Darcey Nooner',
              img: require('@/assets/images/portrait/small/avatar-s-8.jpg'),
              time: 'Mon Dec 11 2018 09:56:05 GMT+0000 (GMT)'
            },
            {
              comment: 'Wafer I love brownie jelly bonbon tart apple pie',
              author: 'Lai Lewandowski',
              img: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
              time: 'Mon Dec 10 2018 09:50:00 GMT+0000 (GMT)'
            }
          ]
        }
      ],
      suggestedPages: [
        {
          img: require('@/assets/images/profile/pages/page-09.jpg'),
          title: 'Rockose',
          type: 'Company'
        },
        {
          img: require('@/assets/images/profile/pages/page-08.jpg'),
          title: "The Devil's",
          type: 'Clothing Store'
        },
        {
          img: require('@/assets/images/profile/pages/page-03.jpg'),
          title: 'The Magician',
          type: 'Public Figure'
        },
        {
          img: require('@/assets/images/profile/pages/page-02.jpg'),
          title: 'AC/DC',
          type: 'Music'
        },
        {
          img: require('@/assets/images/profile/pages/page-07.jpg'),
          title: 'eat hard',
          type: 'restaurant / bar'
        },
        {
          img: require('@/assets/images/profile/pages/page-04.jpg'),
          title: 'B4B',
          type: 'Beauty Store'
        },
        {
          img: require('@/assets/images/profile/pages/page-05.jpg'),
          title: 'Kylie Jenner',
          type: 'Public Figure'
        },
        {
          img: require('@/assets/images/profile/pages/page-01.jpg'),
          title: 'RDJ',
          type: 'Actor'
        },
        {
          img: require('@/assets/images/profile/pages/page-06.jpg'),
          title: 'Taylor Swift',
          type: 'Music'
        }
      ],
      polls: [
        {
          id: 59,
          title: 'Who is the best actor in Marvel Cinematic Universe?',
          options: [
            {
              text: 'RDJ',
              value: 'rdj',
              voted: 58,
              usersVoted: [
                {
                  name: 'Tonia Seabold',
                  avatar: require('@/assets/images/portrait/small/avatar-s-12.jpg')
                },
                {
                  name: 'Carissa Dolle',
                  avatar: require('@/assets/images/portrait/small/avatar-s-5.jpg')
                },
                {
                  name: 'Kelle Herrick',
                  avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg')
                },
                {
                  name: 'Len Bregantini',
                  avatar: require('@/assets/images/portrait/small/avatar-s-10.jpg')
                },
                {
                  name: 'John Doe',
                  avatar: require('@/assets/images/portrait/small/avatar-s-11.jpg')
                },
                {
                  name: 'Tonia Seabold',
                  avatar: require('@/assets/images/portrait/small/avatar-s-12.jpg')
                },
                {
                  name: 'Dirk Fornili',
                  avatar: require('@/assets/images/portrait/small/avatar-s-2.jpg')
                }
              ]
            },
            {
              text: 'Chris Hemsworth',
              value: 'chris hemsworth',
              voted: 16,
              usersVoted: [
                {
                  name: 'Liliana Pecor',
                  avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg')
                },
                {
                  name: 'Kasandra Nalevanko',
                  avatar: require('@/assets/images/portrait/small/avatar-s-1.jpg')
                }
              ]
            },
            {
              text: 'mark ruffalo',
              value: 'mark ruffalo',
              voted: 8,
              usersVoted: [
                {
                  name: 'Lorelei Lacsamana',
                  avatar: require('@/assets/images/portrait/small/avatar-s-4.jpg')
                }
              ]
            },
            {
              text: 'Chris Evans',
              value: 'chris evans',
              voted: 16,
              usersVoted: [
                {
                  name: 'Jeanie Bulgrin',
                  avatar: require('@/assets/images/portrait/small/avatar-s-8.jpg')
                },
                {
                  name: 'Graig Muckey',
                  avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg')
                }
              ]
            }
          ]
        }
      ],
      twitterFeeds: [
        {
          authorAvatar: require('@/assets/images/portrait/small/avatar-s-12.jpg'),
          authorUsername: 'tiana59',
          authorDisplayName: 'Tiana Vercetti',
          content:
            'I love cookie chupa chups sweet tart apple pie chocolate bar. Jelly-o oat cake chupa chups.',
          tags: ['js', 'vuejs'],
          time: 'Mon Dec 12 2018 07:46:05 GMT+0000 (GMT)'
        },
        {
          authorAvatar: require('@/assets/images/portrait/small/avatar-s-12.jpg'),
          authorUsername: 'tiana59',
          authorDisplayName: 'Tiana Vercetti',
          content:
            'Carrot cake cake gummies I love I love tiramisu. Biscuit marzipan cookie lemon drops.',
          tags: ['python'],
          time: 'Mon Dec 11 2018 01:05:05 GMT+0000 (GMT)'
        },
        {
          authorAvatar: require('@/assets/images/portrait/small/avatar-s-12.jpg'),
          authorUsername: 'tiana59',
          authorDisplayName: 'Tiana Vercetti',
          content:
            'I love cookie chupa chups sweet tart apple pie chocolate bar. Jelly-o oat cake chupa chups .',
          tags: [],
          time: 'Mon Dec 10 2018 03:33:05 GMT+0000 (GMT)'
        },
        {
          authorAvatar: require('@/assets/images/portrait/small/avatar-s-12.jpg'),
          authorUsername: 'tiana59',
          authorDisplayName: 'Tiana Vercetti',
          content:
            'Muffin candy caramels. I love caramels tiramisu jelly. Pie I love wafer. Chocolate cake lollipop tootsie roll cake.',
          tags: ['django', 'vuejs'],
          time: 'Mon Dec 9 2018 08:47:05 GMT+0000 (GMT)'
        }
      ],
      wasSidebarOpen: null
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.user.app_active_user
    },
    businesses() {
      return this.$store.state.user.app_active_user.apps
    },
    mediaType() {
      return media => {
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
      return media => {
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
    appActive(app) {
      console.log('app', app)
      this.$fireStore
        .collection('apps')
        .doc('info')
        .collection('general')
        .doc(app.id)
        .update({
          active: app.active
        })
    },
    pageView(view) {
      this.pageViews = view
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
    let userApps = {
      apps: []
    }
    let getComponents = this.$fireStore
      .collection('user')
      .doc('apps')
      .collection(this.activeUserInfo.uid)
    getComponents.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == 'added') {
          let doc = change.doc
          userApps.apps.push({
            id: doc.data().b_uid,
            b_uid: doc.data().b_uid,
            b_name: doc.data().b_name,
            logo: doc.data().logo,
            contact_email: doc.data().c_email,
            contact_person: doc.data().c_name,
            contact_surname: doc.data().c_surname,
            contact_company: doc.data().c_company,
            uniqueb_name: doc.data().un_name
          })
        }
      })
    })
    const userAll = { ...this.activeUserInfo, ...userApps }
    this.$store.dispatch('user/updateUserInfo', userAll)
    if (this.activeUserInfo.role == 'Admin') {
      let getComponents = this.$fireStore
        .collection('apps')
        .doc('info')
        .collection('general')
      getComponents.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == 'added') {
            let doc = change.doc
            this.apps.push({
              id: doc.data().b_uid,
              active: doc.data().active,
              b_uid: doc.data().b_uid,
              b_name: doc.data().b_name,
              logo: doc.data().logo,
              c_email: doc.data().c_email,
              c_person: doc.data().c_name,
              c_surname: doc.data().c_surname,
              c_company: doc.data().c_company,
              un_name: doc.data().un_name
            })
          }
        })
      })
    }
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
