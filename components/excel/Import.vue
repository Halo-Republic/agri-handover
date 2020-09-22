<!-- =========================================================================================
    File Name: i18n.vue
    Description: I18n demo
    ----------------------------------------------------------------------------------------
 
========================================================================================== -->

<template>
  <div>
    <div class="mb-8">
      <import-excel :onSuccess="loadDataInTable" />
    </div>
    <vs-button @click="uploadData">Submit</vs-button>
    <vx-card v-if="tableData.length && header.length">
      <vs-table stripe pagination :max-items="10" search :data="tableData">
        <template slot="header">
          <h4>{{ sheetName }}</h4>
        </template>

        <template slot="thead">
          <vs-th :sort-key="heading" v-for="heading in header" :key="heading">{{
            heading
          }}</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td
              :data="col"
              v-for="(col, indexcol) in data[indextr]"
              :key="indexcol + col"
            >
              {{ col }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
    <div class="centerx example-loading">
      <div class="fill-row-loading">
        <div
          :class="{ activeLoading: activeLoading }"
          id="loading-radius"
          class="vs-con-loading__container loading-example"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import ImportExcel from '@/components/excel/ImportExcel.vue'
import moment from 'moment'
export default {
  components: {
    ImportExcel
  },
  data() {
    return {
      tableData: [],
      header: [],
      sheetName: '',
      activeLoading: false
    }
  },
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    }
  },
  methods: {
    loadDataInTable({ results, header, meta }) {
      this.header = header
      this.tableData = results
      this.sheetName = meta.sheetName
    },
    uploadData() {
      //   console.log('header', this.header)
      console.log('tabelData', this.tableData)
      //   console.log('this.shee', this.sheetName)
      this.activeLoading = true
      this.$vs.loading({
        type: 'radius'
      })

      let vm = this
      for (let i = 0; i < this.tableData.length; i++) {
        console.log('adding', this.tableData[i])

        let assetsAdd = {
          uid: vm.activeUserInfo.uid,
          ref: this.tableData[i].Reference,
          branch: this.tableData[i].Branch,
          ass_type: 'Current Assets',
          entry_type: 'Asset Allocation',
          ass_name: this.tableData[i].Name,
          i_cost: this.tableData[i].Cost,
          t_cost: this.tableData[i].Total,
          qty: this.tableData[i].Quantity,
          desc: this.tableData[i].Description,
          val_type: 'none',
          trans_type: 'Cash',
          c_asset: 'Inventory',
          inv: 'Finished Goods',
          docs: [],
          credit: `Cash : ${this.tableData[i].Total}`,
          debit: `Current Assets : ${this.tableData[i].Total}`,
          last: moment().format('DD-MM-YYYY'),
          date: moment().format('DD-MM-YYYY'),
          month: moment().format('MM-YYYY'),

          t_stamp: Date.now()
        }

        let ref = this.$fireStore

          .collection('apps')
          .doc('crm')
          .collection(this.activeBusinessInfo.b_uid)
          .doc('book')
          .collection('book')

        ref.add(assetsAdd).then(() => {
          let e = this.tableData.length - 1
          console.log('done', i, e, e == i)

          if (i == e) {
            console.log('last')
            vm.activeLoading = false
            vm.$vs.loading.close()
          }
        })
      }
    }
  }
}
</script>
<style lang="stylus">
.fill-row-loading
  display flex
  align-items center
  justify-content center
  flex-wrap wrap
  .loading-example
    width 120px;
    float left
    height 120px;
    box-shadow 0px 5px 20px 0px rgba(0,0,0,.05)
    border-radius 10px;
    margin 8px
    transition all .3s ease
    cursor pointer
    &:hover
      box-shadow 0px 0px 0px 0px rgba(0,0,0,.05)
      transform translate(0,4px)
    h4
      z-index 40000
      position relative
      text-align center
      padding 10px

    &.activeLoading
      opacity 0 !important
      transform scale(.5)
</style>
