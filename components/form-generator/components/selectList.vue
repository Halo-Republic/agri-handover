<template>
  <div>
 
    <div v-if="edit" class="mx-4 my-6">
      <h6>Current: {{ placeholder }}</h6>
    </div>

    {{ label }}


      <v-select
      class="w-full mb-3 select-large "
      :value="val"
      v-if="!multi && usersMult"
      v-model="val"
      label="displayName"
      @input="$emit('input', val)"
      :options="branchUsers"
    ></v-select>
  

     <v-select
      v-if="multi && usersMult"
      :label="label"
      multiple
      v-model="selected"
      :options="branchUsers"
      :dir="$vs.rtl ? 'rtl' : 'ltr'"
      @input="$emit('input', selected)"
    />

    <v-select
      class="w-full mb-3 select-large "
      :value="val"
      v-if="!multi && positionMult"
      v-model="val"
      :label="label"
      @input="$emit('input', val)"
      :options="companyDetails.group_positions"
    ></v-select>


    <v-select
      v-if="multi && positionMult"
      :label="label"
      multiple
      :closeOnSelect="false"
      v-model="selected"
      :options="positions"
      :dir="$vs.rtl ? 'rtl' : 'ltr'"
      @input="$emit('input', selected)"
    />

    <v-select
      class="w-full mb-3 select-large "
      :value="val"
      v-if="!multi && branchMult"
      v-model="val"
      label="center"
      @input="$emit('input', val)"
      :options="companyDetails.group_branches"
    ></v-select>

  
    <v-select
      v-if="multi && branchMult"
      :label="label"
      multiple
      :closeOnSelect="false"
      v-model="selected"
      :options="branches"
      :dir="$vs.rtl ? 'rtl' : 'ltr'"
      @input="$emit('input', selected)"
    />

    <v-select
      class="w-full mb-3 select-large "
      :value="val"
      v-if="!multi && !branchMult && !positionMult && !usersMult"
      v-model="val"
      :label="label"
      @input="$emit('input', val)"
      :options="options"
    ></v-select>

    <!-- <vs-select
      v-if="!multi && !branchMult && !positionMult && !usersMult"
      v-model="val"
      class="w-full mb-3 select-large"
      :label="label"
      @input="$emit('input', val)"
    >
      <vs-select-item
        :key="index"
        :value="item"
        :text="item"
        v-for="(item, index) in options"
        class="w-full"
      />
    </vs-select> -->

    <v-select
      v-if="multi && !branchMult && !positionMult && !usersMult"
      :label="label"
      multiple
      :closeOnSelect="false"
      v-model="selected"
      :options="options"
      :dir="$vs.rtl ? 'rtl' : 'ltr'"
      @input="$emit('input', selected)"
    />
  </div>
</template>
<script>
import vSelect from "vue-select";
export default {
  name: "SelectList",
  props: [
    "multi",
    "options",
    "placeholder",
    "edit",
    "name",
    "label",
    "value",
    "usersMult",
    "positionMult",
    "branchMult"
  ],
  components: {
    "v-select": vSelect
  },
  data() {
    return {
      unshift: false,
      val: "",
      val2: [],
      selected: [],
      myUsers: []
    };
  },
  watch: {
    edit: function() {
      if (this.edit) {
        console.log("place", this.placeholder);
        (this.val = this.placeholder), (this.val2 = this.placeholder);
      }
    },
    myUsers: function() {
      this.$store.dispatch("userManagement/setUsers", this.myUsers);
    }
  },

  created() {
    console.log('comp', this.multi, this.branchMult)
  },
  methods: {
    async otherUsers() {
      console.log("oterh users");

      let getUsers = this.$fireStore
        .collection(this.resellerName)
        .doc(this.companyDetails.id)
        .collection("users");

      try {
        getUsers.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type == "added") {
              let doc = change.doc;
              this.myUsers.push({
                id: doc.data().id,
                uid: doc.data().uid,

                displayName: doc.data().displayName,
                username: doc.data().displayName,
                photoURL: doc.data().photoURL,
                email: doc.data().email,
                name: doc.data().name,
                surname: doc.data().surname,
                dob: doc.data().dob,
                gender: doc.data().gender,
                bio: doc.data().bio,
                about: doc.data().bio,
                country: doc.data().country,
                resells: doc.data().resells,
                active: doc.data().active,
                paid: doc.data().paid,
                role: doc.data().role,
                status: doc.data().status,
                online_status: "online",
                is_verified: doc.data().is_verified,
                department: doc.data().department,
                company: doc.data().company,
                mobile: doc.data().mobile,
                website: doc.data().website,
                languages_known: doc.data().languages_known,
                contact_options: doc.data().contact_options,
                group_push_notes: doc.data().group_push_notes,
                group_views: doc.data().group_views,
                location: {
                  add_line_1: "",
                  add_line_2: "",
                  post_code: "",
                  city: "",
                  state: "",
                  country: ""
                },
                social_links: {
                  twitter: doc.data().social_links.twitter,
                  facebook: doc.data().social_links.facebook,
                  instagram: doc.data().social_links.instagram,
                  github: doc.data().social_links.github,
                  linkedin: doc.data().social_links.linkedin,
                  slack: doc.data().social_links.slack,
                  codepen: doc.data().social_links.codepen
                },
                permissions: {
                  users: {
                    read: doc.data().permissions.users.read,
                    write: doc.data().permissions.users.write,
                    create: doc.data().permissions.users.create,
                    delete: doc.data().permissions.users.delete
                  },
                  posts: {
                    read: doc.data().permissions.posts.read,
                    write: doc.data().permissions.posts.write,
                    create: doc.data().permissions.posts.create,
                    delete: doc.data().permissions.posts.delete
                  },
                  comments: {
                    read: doc.data().permissions.comments.read,
                    write: doc.data().permissions.comments.write,
                    create: doc.data().permissions.comments.create,
                    delete: doc.data().permissions.comments.delete
                  }
                },
                created_month: doc.data().created_month,
                timestamp: doc.data().timestamp
              });
            }
          });
        });
      } catch (err) {
        console.log("Error getting documents", err);
      }
    }
  },
  computed: {
    users() {
      return this.$store.getters["userManagement/users"];
    },
    userDetails() {
      return this.$store.getters["userManagement/userDetails"];
    },
    companyDetails() {
      return this.$store.getters["app/companyDetails"];
    },
    branchUsers() {
      let myusers = [];
      console.log('user', this.userDetails.group_branches)

  //      {{users[0]}}
  // {{users[0].group_branches}}

  // {{users.length}}
  // {{userDetails.group_branches}}

      for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].group_branches == this.userDetails.group_branches) {
        console.log('i', i)
         myusers.push(this.users[i]);
        }
      }
      return myusers
    },
    branches() {
      let myBranches = [];
      for (let i = 0; i < this.companyDetails.group_branches.length; i++) {
        myBranches.push({
          center: this.companyDetails.group_branches[i]
        });
      }
      console.log("my Branches", myBranches);

      return myBranches;
    },
    positions() {
      return this.$store.getters["app/group_positions"];
    }
  }
};
</script>

<style>
.optionStyle {
  color: grey;
}
.zDex {
  z-index: 55000;
}
</style>
