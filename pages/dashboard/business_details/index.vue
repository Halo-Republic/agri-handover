<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div id="page-user-view">
    <vs-alert
      color="danger"
      title="User Not Found"
      :active.sync="user_not_found"
    >
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'page-user-list' }"
          class="underline text-inherit"
          >All Users</router-link
        >
      </span>
    </vs-alert>

    <div id="user-data" v-if="activeBusinessInfo">
      <vx-card title="Account" class="mb-base mt-12">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="mb-4 img-container">
              <img :src="activeBusinessInfo.logo" class="w-full rounded" />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="flex-1 vx-col" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">App Name</td>
                <td>{{ activeBusinessInfo.b_name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Industry</td>
                <td v-if="activeBusinessInfo.indstr">
                  {{ activeBusinessInfo.indstr }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Public</td>
                <td>{{ activeBusinessInfo.public }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- <div class="flex-1 vx-col" id="account-info-col-2">
            <table>
              
              <tr>
                <td class="font-semibold">Communication</td>
                <td>{{ user_data.group_p_notes.join(", ") }}</td>
              </tr>
            </table>
          </div> -->

          <!-- Information - Col 2 -->
          <div class="flex-1 vx-col" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Currency</td>
                <td>{{ activeBusinessInfo.currency }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Vat</td>
                <td>{{ activeBusinessInfo.tax }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Description</td>
                <td>{{ activeBusinessInfo.desc }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Address</td>
                <td>{{ activeBusinessInfo.for_address }}</td>
              </tr>
              <!-- <tr>
                <td class="font-semibold">Communication</td>
                <td>{{ user_data.group_p_notes.join(", ") }}</td>
              </tr> -->
            </table>
          </div>
          <!-- /Information - Col 2 -->
          <div class="flex w-full vx-col" id="account-manage-buttons">
            <vs-button
              icon-pack="feather"
              icon="icon-edit"
              class="mr-4"
              @click="goTo"
              >Edit</vs-button
            >
            <!-- <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Delete</vs-button> -->
          </div>
        </div>
      </vx-card>

      <div class="vx-row">
        <div class="w-full vx-col lg:w-1/2">
          <vx-card title="App Owner Information" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Company</td>
                <td>{{ activeBusinessInfo.c_company }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Name</td>
                <td>{{ activeBusinessInfo.c_person }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Surname</td>
                <td>{{ activeBusinessInfo.c_surname }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Number</td>
                <td>{{ activeBusinessInfo.c_number }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Email</td>
                <td>{{ activeBusinessInfo.c_email }}</td>
              </tr>
            </table>
          </vx-card>
        </div>

        <div class="w-full vx-col lg:w-1/2">
          <vx-card title="Groups Information" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Communication</td>
                <td v-if="activeBusinessInfo.p_notes != undefined">
                  {{ activeBusinessInfo.p_notes.join(', ') }}
                </td>
              </tr>

              <tr>
                <td class="font-semibold">Positions</td>
                <td v-if="activeBusinessInfo.pos != undefined">
                  {{ activeBusinessInfo.pos.join(', ') }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Branches</td>
                <td v-if="activeBusinessInfo.branches != undefined">
                  {{ activeBusinessInfo.branches.join(', ') }}
                </td>
              </tr>
            </table>
          </vx-card>
        </div>

        <div class="w-full vx-col lg:w-1/2">
          <vx-card title="Sales Info" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Customer Groups</td>
                <td v-if="activeBusinessInfo.c_groups != undefined">
                  {{ activeBusinessInfo.c_groups.join(', ') }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Product Types</td>
                <td v-if="activeBusinessInfo.s_types != undefined">
                  {{ activeBusinessInfo.s_types.join(', ') }}
                </td>
              </tr>
            </table>
          </vx-card>
        </div>

        <div class="w-full vx-col lg:w-1/2">
          <vx-card title="Employee Info" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Sales Targets</td>
                <td v-if="activeBusinessInfo.target != undefined">
                  {{ activeBusinessInfo.target.join(', ') }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Leave Request</td>
                <td v-if="activeBusinessInfo.leave != undefined">
                  {{ activeBusinessInfo.leave.join(', ') }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Claim Request</td>
                <td v-if="activeBusinessInfo.claims != undefined">
                  {{ activeBusinessInfo.claims.join(', ') }}
                </td>
              </tr>
            </table>
          </vx-card>
        </div>

        <div class="w-full vx-col lg:w-1/2">
          <vx-card title="Social Links" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Twitter</td>
                <td v-if="activeBusinessInfo.twt != undefined">
                  {{ activeBusinessInfo.twitter }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Facebook</td>
                <td v-if="activeBusinessInfo.facebook != undefined">
                  {{ activeBusinessInfo.fb }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Instagram</td>
                <td v-if="activeBusinessInfo.insta != undefined">
                  {{ activeBusinessInfo.insta }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Github</td>
                <td v-if="activeBusinessInfo.github != undefined">
                  {{ activeBusinessInfo.github }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">CodePen</td>
                <td v-if="activeBusinessInfo.codepen != undefined">
                  {{ activeBusinessInfo.codepen }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Slack</td>
                <td v-if="activeBusinessInfo.slack != undefined">
                  {{ activeBusinessInfo.slack }}
                </td>
              </tr>
            </table>
          </vx-card>
        </div>
      </div>
    </div>
    <previous />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // user_data: null,
      user_not_found: false
    }
  },
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    }
  },

  methods: {
    goTo() {
      this.$router.push('/dashboard/business_details/business_edit')
    }
  }
}
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
</style>
