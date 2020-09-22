<template>
  <div class="flex items-center" @click="goto(params.data.image[0])" >
    <!-- <img :src="params.data.image[0]"  /> -->
       <vs-avatar :src="params.data.image[0]" class="flex-shrink-0 mr-2" size="80px" @click="goto(params.data)" />

    <!-- {{params.data}} -->
    <!-- <router-link :to="url" @click.stop.prevent class="text-inherit hover:text-primary">{{ params.value }}</router-link> -->
  </div>
</template>

<script>
    export default {
        name: 'CellRendererImage',
        computed: {
          url() {
            return "/apps/user/user-view/268"

            // Below line will be for actual product
            // Currently it's commented due to demo purpose - Above url is for demo purpose
            // return "/apps/user/user-view/" + this.params.data.id
          }
        },
        methods: {
          goto(data){
            let payload = data
            console.log('data', payload)
            // this.$store.dispatch('userManagement/currentUser', payload)
            // this.$router.push(`/apps/user/user-view/${data.id}`)
          }
        }
    }
</script>
