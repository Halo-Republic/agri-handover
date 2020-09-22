<template>
  <div>
    <topScroll style="margin-top: 80px; margin-bottom: 30px" />

    <client-only>
      <vs-row class="px-3" vs-w="12">
        <vs-col vs-type="flex" class="px-3 " vs-w="9" vs-sm="9" vs-xs="12">
          <vs-row class="mb-5 " vs-w="12">
            <vs-col
              v-for="blog in allBlogs"
              :key="blog.id"
              vs-w="4"
              vs-sm="6"
              vs-xs="12"
              class="px-2 py-2 colDiv"
            >
              <vs-card
                style="background: rgba(255, 255, 255, 0.3)"
                v-if="blog.id !== 'signup'"
              >
                <!-- <nuxt-link :to="{name: `blogs-single`, params: {id: blog.id}}"> -->
                <img
                  :src="blog.downloadURL"
                  :alt="blog.title"
                  class="responsive"
                  style="height: auto; width: 100%;  border-radius: 15%"
                />
                <vs-chip color="primary" class="chip">
                  {{ blog.category }}
                </vs-chip>

                <h3>{{ blog.title }}</h3>
                <small>{{ blog.date }}</small>
                <h6 color="primary">
                  {{ blog.author_name }}
                </h6>
                <br />
                <client-only>
                  <!-- <span v-html="blog.html.slice(0,30)" /> -->
                </client-only>
                <!-- <span v-html="blog.html.substring(0, 30) + '...'" /> -->
                <!-- <span>{{blog.html}}</span> -->

                <br />
                <!-- </nuxt-link> -->
                <!-- <nuxt-link :to="{name: `blogs-single`, params: {id: blog.id}}"> -->
                <vs-button
                  size="small"
                  style="width: 100%; margin: 4px"
                  type="border"
                  color="primary"
                  @click="$router.push(`/blogs-single/${blog.id}`)"
                >
                  READ MORE
                </vs-button>
                <!-- </nuxt-link> -->
              </vs-card>
            </vs-col>
          </vs-row>
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="top"
          vs-w="3"
          vs-sm="3"
          vs-xs="12"
        >
          <div class="px-3 py-3">
            <sign-up />

            <vs-divider
              icon-pack="feather"
              icon="icon-check"
              position="center"
              color="rgb(29, 222, 194)"
            />
            <h4>Latest Blogs</h4>
            <div>
              <vs-row class="mt-6">
                <vs-col v-if="allBlogs.length > 0" vs-w="6">
                  <div @click="$router.push(`/blogs-single/${allBlogs[0].id}`)">
                    <img
                      :src="allBlogs[0].downloadURL"
                      :alt="allBlogs[0].title"
                      class="responsive"
                      style="width: 90%; max-height: 130px"
                    />
                    <small>{{ allBlogs[0].title }}</small>
                    <br />
                    <small>{{ allBlogs[0].date }}</small>
                  </div>
                </vs-col>

                <vs-col v-if="allBlogs.length > 1" vs-w="6">
                  <div @click="$router.push(`/blogs-single/${allBlogs[1].id}`)">
                    <img
                      :src="allBlogs[1].downloadURL || ``"
                      :alt="allBlogs[1].title"
                      class="responsive"
                      style="width: 90%; max-height: 130px"
                    />
                    <small>{{ allBlogs[1].title }}</small>
                    <br />
                    <small>{{ allBlogs[1].date }}</small>
                  </div>
                </vs-col>
              </vs-row>

              <vs-row v-if="allBlogs.length > 2" class="px-3 mt-6">
                <vs-col v-if="allBlogs.length > 2" vs-w="6">
                  <div @click="$router.push(`/blogs-single/${allBlogs[2].id}`)">
                    <img
                      :src="allBlogs[2].downloadURL || ``"
                      :alt="allBlogs[2].title"
                      class="responsive"
                      style="width: 90%; max-height: 130px"
                    />
                    <small>{{ allBlogs[2].title }}</small>
                    <br />
                    <small>{{ allBlogs[2].date }}</small>
                  </div>
                </vs-col>
                <vs-col v-if="allBlogs.length > 3" vs-w="6">
                  <div @click="$router.push(`/blogs-single/${allBlogs[3].id}`)">
                    <img
                      :src="allBlogs[3].downloadURL || ``"
                      :alt="allBlogs[3].title"
                      class="responsive"
                      style="width: 90%; max-height: 130px"
                    />
                    <small>{{ allBlogs[3].title }}</small>
                    <!-- <small>{{ allBlogs[3].title.substring(0, 20) + '...' }}</small> -->

                    <br />
                    <small>{{ allBlogs[3].date }}</small>
                  </div>
                </vs-col>
              </vs-row>
              <vs-divider
                icon-pack="feather"
                icon="icon-check"
                position="center"
                color="rgb(29, 222, 194)"
              />
              <h4>Categories</h4>
              <div v-for="cat in Categories" :key="cat.id">
                <small>{{ cat.category }}</small>
              </div>

              <vs-divider
                icon-pack="feather"
                icon="icon-check"
                position="center"
                color="rgb(29, 222, 194)"
              />
              <h4>Authors</h4>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </client-only>
  </div>
</template>
<script>
import signUp from '@/components/sign-up/index.vue'
import topScroll from '@/components/topScroll/index'

export default {
  components: { signUp, topScroll },
  data() {
    return {
      selected: [],

      users: [],
      newapps: [],
      allBlogs: [],
      Categories: [],
      name: '',
      email: '',
      itemsPerPage: 4,
      isMounted: false,
      addNewDataSidebar: false,
      addNewDataSidebarGroup: false
    }
  },

  created() {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()
    let thitoday = dd + ' ' + mm + ' ' + yyyy

    this.isMounted = true
    let routeID = this.routeID
    let blogRetrieve

    blogRetrieve = this.$fireStore
      .collection('agri-ensights')
      .doc('apps')
      .collection('blog')
    // .where("datePicker", "<=", thitoday)
    // .orderBy("date", "desc");

    blogRetrieve.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let doc = change.doc
        this.allBlogs.push({
          id: doc.id,
          title: doc.data().title,
          date: doc.data().date,
          author: doc.data().author,
          author_name: doc.data().author,
          time: doc.data().time,
          downloadURL: doc.data().downloadURL,
          component: doc.data().component,
          componentname: doc.data().componentname,
          category: doc.data().category,
          html: doc.data().html
        })
      })
    })
    this.$store.commit('blog/BLOGS', this.allBlogs)
  }
}
</script>
