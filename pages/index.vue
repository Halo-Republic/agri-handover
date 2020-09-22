<template>
  <div class="w-full">
    <div v-if="!myMiddleware">
      <topScroll style="margin-top: 90px; margin-bottom: 30px" />
      <div class="vx-row mt-12">
        <div class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base">
          <nuxt-link to="/about">
            <div
              class="cover-container rounded-t-lg"
              style=" position: relative;  text-align: center; color: white; background-color: rgba(109,213,237,.8)"
            >
              <img
                src="../assets/frontpage/1.jpg"
                alt="user-profile-cover"
                class="responsive block"
                style="max-height: 220px; "
              />
              <div class="shade" />
              <h2
                style="position: absolute; top: 50%; left: 50%;  transform: translate(-50%, -50%); color: white; font-size: 3em"
              >
                About Us
              </h2>
            </div>
          </nuxt-link>
        </div>
        <!-- {{ userAppsApps.length }} -->
        <div
          v-if="businesses.length > 0 && isLoggedIn"
          class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base"
          v-for="item in businesses"
          :key="item.id"
        >
          <div style="cursor: pointer" @click="setRouteComp(item)">
            <div
              class="cover-container rounded-t-lg"
              style=" position: relative;  text-align: center; color: white; background-color: rgba(109,213,237,.8)"
            >
              <img
                src="../assets/frontpage/2.jpg"
                alt="user-profile-cover"
                class="responsive block"
                style="max-height: 220px;   height: 100%"
              />
              <div class="shade" />
              <h2
                style="position: absolute; top: 50%; left: 50%;  transform: translate(-50%, -50%); color: white; font-size: 3em"
              >
                {{ item.b_name }}
              </h2>
            </div>
          </div>
        </div>

        <div v-if="isLoggedIn" class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base">
          <nuxt-link to="/farmsAround">
            <div
              class="cover-container rounded-t-lg"
              style=" position: relative;  text-align: center; color: white; background-color: rgba(109,213,237,.8)"
            >
              <img
                src="../assets/frontpage/3.jpg"
                alt="user-profile-cover"
                class="responsive block"
                style="max-height: 220px;  height: 100% "
              />
              <div class="shade" />
              <h2
                style="position: absolute; top: 50%; left: 50%;  transform: translate(-50%, -50%); color: white; font-size: 3em"
              >
                Agri Network
              </h2>
            </div>
          </nuxt-link>
        </div>

        <div class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base">
          <nuxt-link to="/eCommerce">
            <div
              class="cover-container rounded-t-lg"
              style=" position: relative;  text-align: center; color: white; background-color: rgba(109,213,237,.8)"
            >
              <img
                src="../assets/frontpage/4.jpg"
                alt="user-profile-cover"
                class="responsive block"
                style="max-height: 220px;  height: 100% "
              />
              <div class="shade" />
              <h2
                style="position: absolute; top: 50%; left: 50%;  transform: translate(-50%, -50%); color: white; font-size: 3em"
              >
                Agri MarketPlace
              </h2>
            </div>
          </nuxt-link>
        </div>

        <div
          class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base"
          @click="$router.push(`/360`)"
        >
          <nuxt-link to="/360">
            <div
              class="cover-container rounded-t-lg"
              style=" position: relative;  text-align: center; color: white; background-color: rgba(109,213,237,.8)"
            >
              <img
                src="../assets/frontpage/5.jpg"
                alt="user-profile-cover"
                class="responsive block"
                style="max-height: 220px; height: 100% "
              />
              <div class="shade" />
              <h2
                style="position: absolute; top: 50%; left: 50%;  transform: translate(-50%, -50%); color: white; font-size: 3em"
              >
                360 Degree Manager
              </h2>
            </div>
          </nuxt-link>
        </div>

        <div class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base">
          <nuxt-link to="/advisory">
            <div
              class="cover-container rounded-t-lg"
              style=" position: relative;  text-align: center; color: white; background-color: rgba(109,213,237,.8)"
            >
              <img
                src="../assets/frontpage/6.jpg"
                alt="user-profile-cover"
                class="responsive block"
                style="max-height: 220px; "
              />
              <div class="shade" />
              <h2
                style="position: absolute; top: 50%; left: 50%;  transform: translate(-50%, -50%); color: white; font-size: 3em"
              >
                Advisory Services
              </h2>
            </div>
          </nuxt-link>
        </div>

        <div class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base">
          <nuxt-link to="/news">
            <div
              class="cover-container rounded-t-lg"
              style=" position: relative;  text-align: center; color: white; background-color: rgba(109,213,237,.8)"
            >
              <img
                src="../assets/frontpage/7.jpg"
                alt="user-profile-cover"
                class="responsive block"
                style="max-height: 220px; "
              />
              <div class="shade" />
              <h2
                style="position: absolute; top: 50%; left: 50%;  transform: translate(-50%, -50%); color: white; font-size: 3em"
              >
                Latest News
              </h2>
            </div>
          </nuxt-link>
        </div>

        <div class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base">
          <nuxt-link to="/contact_us">
            <div
              class="cover-container rounded-t-lg"
              style=" position: relative;  text-align: center; color: white; background-color: rgba(109,213,237,.8)"
            >
              <img
                src="../assets/frontpage/8.jpg"
                alt="user-profile-cover"
                class="responsive block"
                style="max-height: 220px; "
              />
              <div class="shade" />
              <h2
                style="position: absolute; top: 50%; left: 50%;  transform: translate(-50%, -50%); color: white; font-size: 3em"
              >
                Contact Us
              </h2>
            </div>
          </nuxt-link>
        </div>

        <div class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base">
          <nuxt-link to="/panic">
            <div
              v-if="isLoggedIn"
              class="cover-container rounded-t-lg"
              style=" position: relative;  text-align: center; color: white; background-color: rgba(109,213,237,.8)"
            >
              <img
                src="../assets/frontpage/10.jpg"
                alt="user-profile-cover"
                class="responsive block"
                style="max-height: 220px; "
              />
              <div class="shade" />
              <h2
                style="position: absolute; top: 50%; left: 50%;  transform: translate(-50%, -50%); color: white; font-size: 3em"
              >
                Panic
              </h2>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-if="myMiddleware">
      <shopping />
    </div>
  </div>
</template>

<script>
import topScroll from '~/components/topScroll/index.vue'
import shopping from './eCommerce/index'
// import myMiddleware from '@/middleware/routing'

export default {
  components: {
    topScroll,
    shopping
  },
  data() {
    return {
      isLoggedIn: false,
      businesses: [],
      myMiddleware: true
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.user.app_active_user
    },
    firstLoad() {
      return this.$store.state.app.firstLoad
    }
    // businesses() {
    //   return this.$store.state.user.app_active_user.apps
    // }
  },
  mounted() {
    if (this.$nuxt.context.from.name == 'index') {
      this.myMiddleware = true
    } else {
      this.myMiddleware = false
    }
    let vm = this
    let activeUserInfo = {}
    this.$fireAuth.onAuthStateChanged(function(user) {
      if (user) {
        vm.$fireStore
          .collection('apps')
          .doc('users')
          .collection('s8Sz6QcaSsjgkJX6ablN')
          .doc('info')
          .collection('general')
          .doc(user.uid)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              vm.$store.dispatch('user/updateUserInfo', doc.data())
              vm.$store.commit('user/APP_DISPLAYED_USER', doc.data())
              activeUserInfo = doc.data()
              // vm.getUserApps(user.uid)
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!')
            }
          })

          .catch(function(error) {
            console.log('Error getting document:', error)
          })

        let userApps = {
          apps: []
        }

        let getComponents = vm.$fireStore
          .collection('user')
          .doc('apps')
          .collection(user.uid)

        getComponents.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type == 'added') {
              let doc = change.doc
              userApps.apps.push({
                id: doc.data().b_uid,
                b_uid: doc.data().b_uid,
                b_name: doc.data().b_name,
                logo: doc.data().logo,

                c_email: doc.data().c_email,
                c_person: doc.data().c_person,
                c_surname: doc.data().c_surname,
                c_company: doc.data().c_company,
                un_name: doc.data().un_name
              })
            }
          })
        })

        const userAll = { ...activeUserInfo, ...userApps }
        vm.businesses = userApps.apps
        vm.$store.dispatch('user/updateUserInfo', userAll)
      }
      vm.isLoggedIn = true
    })
  },
  methods: {
    setRouteComp(app) {
      this.$store.commit('business/UPDATE_BUSINESS_INFO', app)
      this.$router.push(`/dashboard`)
    }
  }
}
</script>

<style></style>
