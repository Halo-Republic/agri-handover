<template>
  <div>
    <vs-row style="margin-top: 80px; margin-bottom: 30px">
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="12"
        vs-sm="12"
        vs-xs="12"
      >
        <vx-card>
          <div slot="no-body">
            <img
              :src="blog.downloadURL"
              alt="content-img"
              class="responsive card-img-top"
              style="width: 100%"
            />
          </div>
          <div ref="content">
            <h3>{{ blog.title }}</h3>
            <vs-divider></vs-divider>

            <div v-html="blog.html"></div>
          </div>

          <vs-divider></vs-divider>
          <div class="flex flex-wrap justify-between">
            <vs-button class="mt-4 shadow-lg" color="primary" @click="ViewAll"
              >View All</vs-button
            >
            <vs-button
              class="mt-4 shadow-lg"
              type="border"
              color="primary"
              @click="download(blog)"
              >Download</vs-button
            >
          </div>
        </vx-card>
      </vs-col>
      <!-- <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="top"
          vs-w="3"
          vs-sm="3"
          vs-xs="12"
        >
          <div class="pl-5 mt-6"> -->
      <!-- <sign-up /> -->
      <!-- <vs-divider
              icon-pack="feather"
              icon="icon-check"
              position="center"
              color="rgb(29, 222, 194)"
            ></vs-divider>
            <h4>Categories</h4>
            <div v-for="cat in categories" :key="cat.id">
              <small>{{ cat.category }}</small>
            </div>

            <vs-divider
              icon-pack="feather"
              icon="icon-check"
              position="center"
              color="rgb(29, 222, 194)"
            ></vs-divider>
            <h4>Authors</h4>
            <div v-for="auth in Authors" :key="auth.id" class="mb-6">
              <small>{{ auth.author }}</small>
            </div> -->

      <!-- <h4>Latest Blogs</h4>
            <div>
              <vs-row class="mt-6">
                <vs-col vs-w="6" v-if="blogs.length > 0">
                  <router-link
                    :to="{ name: `blogs-single`, params: { id: blogs[0].id } }"
                  >
                    <img
                      :src="blogs[0].downloadURL"
                      :alt="blogs[0].title"
                      class="responsive"
                      style="width: 90%"
                    />
                    <small>{{ blogs[0].title.substring(0, 20) + '...' }}</small>
                    <br />
                    <small>{{ blogs[0].date }}</small>
                  </router-link>
                </vs-col>

                <vs-col vs-w="6" v-if="blogs.length > 1">
                  <router-link
                    :to="{ name: `blogs-single`, params: { id: blogs[1].id } }"
                  >
                    <img
                      :src="blogs[1].downloadURL"
                      :alt="blogs[1].title"
                      class="responsive"
                      style="width: 90%"
                    />
                    <small>{{ blogs[1].title.substring(0, 20) + '...' }}</small>
                    <br />
                    <small>{{ blogs[1].date }}</small>
                  </router-link>
                </vs-col>
              </vs-row>

              <vs-row class="mt-6">
                <vs-col vs-w="6" v-if="blogs.length > 2">
                  <router-link
                    :to="{ name: `blogs-single`, params: { id: blogs[2].id } }"
                  >
                    <img
                      :src="blogs[2].downloadURL"
                      :alt="blogs[2].title"
                      class="responsive"
                      style="width: 90%"
                    />
                    <small>{{ blogs[2].title.substring(0, 20) + '...' }}</small>
                    <br />
                    <small>{{ blogs[2].date }}</small>
                  </router-link>
                </vs-col>
                <vs-col vs-w="6" v-if="blogs.length > 3">
                  <router-link
                    :to="{ name: `blogs-single`, params: { id: blogs[3].id } }"
                  >
                    <img
                      :src="blogs[3].downloadURL"
                      :alt="blogs[3].title"
                      class="responsive"
                      style="width: 90%"
                    />
                    <small>{{ blogs[3].title.substring(0, 20) + '...' }}</small>
                    <br />
                    <small>{{ blogs[3].date }}</small>
                  </router-link>
                </vs-col>
              </vs-row>
            </div> -->
      <!-- </div>
        </vs-col> -->
    </vs-row>
  </div>
</template>
<script>
import signUp from '@/components/sign-up'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
export default {
  components: {
    signUp
  },
  data() {
    return {
      blog: {}
    }
  },
  computed: {
    blogs() {
      return this.$store.state.blog.blogs
    }
  },
  methods: {
    download(blog) {
      console.log('blo', blog)
      if (process.client) {
        let pdfName = blog.title
        var doc = new jsPDF()
        // doc.text(blog.html, 10, 10);
        // doc.save(pdfName + '.pdf');
        /** WITH CSS */
        var canvasElement = document.createElement('canvas')
        html2canvas(this.$refs.content, { canvas: canvasElement }).then(
          function(canvas) {
            const img = canvas.toDataURL('image/jpeg', 0.8)
            doc.addImage(img, 'JPEG', 20, 20)
            doc.save(pdfName + '.pdf')
          }
        )
      }
    },
    ViewAll() {
      let goingRoute = `/blog/${this.route}`
      this.$router.push(goingRoute)
    }
  },
  created() {
    let myBlogs = this.blogs
    let routeParams = this.$route.params.id
    for (let i = 0; i < myBlogs.length; i++) {
      if (myBlogs[i].id == routeParams) {
        this.blog = myBlogs[i]
      }
    }
  }
}
</script>

<style lang="scss"></style>
