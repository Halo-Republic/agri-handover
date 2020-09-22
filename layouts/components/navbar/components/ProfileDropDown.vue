<template>
  <div class="flex items-center the-navbar__user-meta">
    <!-- <div class="flex items-center the-navbar__user-meta" > -->

    <div
      class="hidden leading-tight text-right sm:block"
      v-if="activeUserInfo.disp_name"
    >
      <p class="font-semibold">
        {{ activeUserInfo.disp_name || 'undefined' }}
      </p>
      <!-- <p class="font-semibold">Me</p> -->

      <small>{{ activeUserInfo.status }}</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <client-only>
        <div class="ml-3 con-img">
          <!-- <img
            v-if="activeUserInfo.display_name"
            key="onlineImg"
            :src="activeUserInfo.photoURL"
            alt="user-img"
            width="40"
            height="40"
            class="block rounded-full shadow-md cursor-pointer"
          /> -->
          <img
            key="onlineImg"
            src="@/static/icon.png"
            alt="user-img"
            width="40"
            height="40"
            class="block rounded-full shadow-md cursor-pointer"
          />
        </div>
      </client-only>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/profile')"
            v-if="activeUserInfo.disp_name"
          >
            <feather-icon icon="UserIcon" svg-classes="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>

          <!-- <li
            class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/email')"
          >
            <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Inbox</span>
          </li>
          <li
            class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/calendar/vue-simple-calendar')"
          >
            <feather-icon icon="CalendarIcon" svg-classes="w-4 h-4" />
            <span class="ml-2">Calendar</span>
          </li> -->

          <!-- <li
            class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/todo')"
          >
            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Tasks</span>
          </li>

          <li
            class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/chat')"
          >
            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Chat</span>
          </li>

          <li
            class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/eCommerce/wish-list')"
          >
            <feather-icon icon="HeartIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Wish List</span>
          </li>

          <li
            class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/user/user-list-man')"
          >
            <feather-icon icon="HeartIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">MY TEAM</span>
          </li>
          <li
            class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/crm')"
          >
            <feather-icon icon="LayoutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">CRM</span>
          </li>
          <li
            class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push(`/dashboard-analytics`)"
          >
            <feather-icon icon="CheckSquareIcon" svg-classes="w-4 h-4" />
            <span class="ml-2">Dashboard </span>
          </li> -->
          <li
            class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
            @click="
              $router.push(`/m/${companyDetails.uniqueAppName}`).catch(() => {})
            "
            v-if="activeUserInfo.role == 'admin'"
          >
            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">App </span>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svg-classes="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data() {
    return {}
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.user.app_active_user
    }
  },

  methods: {
    logout() {
      // if user is logged in via firebase

      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>
