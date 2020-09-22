<!-- =========================================================================================
    File Name: DashboardEcommerce.vue
    Description: Dashboard - Ecommerce
    ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div class="p-10">
    <vs-card style="margin-top: 80px; margin-bottom: 30px">
      <vs-row vs-w="12" vs-justify="space-around">
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="3"
          vs-sm="6"
          vs-xs="6"
        >
          <book-entry />
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="3"
          vs-sm="6"
          vs-xs="6"
        >
          <vs-button @click="$router.push('/dashboard/bulk')"
            >Bulk Entry</vs-button
          >
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="3"
          vs-sm="6"
          vs-xs="6"
        >
          <register-products />
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="3"
          vs-sm="6"
          vs-xs="6"
        >
          <nuxt-link to="/crm/products">
            <vs-button type="border">View Products</vs-button>
          </nuxt-link>
        </vs-col>
      </vs-row>
    </vs-card>

    <div class="vx-row">
      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base">
        <nuxt-link :to="`/crm/assets`">
          <statistics-card-line
            icon="TargetIcon"
            :statistic="AssetsData.analyticsData.revenue | k_formatter"
            statisticTitle="Total Assets"
            :chartData="AssetsData.series"
            type="area"
            color="success"
          />
        </nuxt-link>
      </div>

      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base">
        <nuxt-link :to="`/crm/liabilities`">
          <statistics-card-line
            icon="TrendingDownIcon"
            :statistic="liabilitiesData.analyticsData.revenue | k_formatter"
            statisticTitle="Total Liabilities"
            :chartData="liabilitiesData.series"
            type="area"
            color="danger"
          />
        </nuxt-link>
      </div>

      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base">
        <nuxt-link :to="`/crm/equity`">
          <statistics-card-line
            icon="PieChartIcon"
            :statistic="equityData.analyticsData.revenue | k_formatter"
            statisticTitle="Equity"
            :chartData="equityData.series"
            type="area"
            color="warning"
          />
        </nuxt-link>
      </div>

      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <nuxt-link :to="`/crm/assets`">
          <statistics-card-line
            icon="TargetIcon"
            :statistic="CurrentAssetsData.analyticsData.revenue | k_formatter"
            statisticTitle="Current Assets"
            :chartData="CurrentAssetsData.series"
            type="area"
            color="success"
          />
        </nuxt-link>
      </div>

      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <nuxt-link :to="`/crm/assets`">
          <statistics-card-line
            icon="TargetIcon"
            :statistic="FixedAssetsData.analyticsData.revenue | k_formatter"
            statisticTitle="Fixed Assets"
            :chartData="FixedAssetsData.series"
            type="area"
            color="success"
          />
        </nuxt-link>
      </div>

      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <nuxt-link :to="`/crm/liabilities`">
          <statistics-card-line
            icon="TrendingDownIcon"
            :statistic="
              CurrentliabilitiesData.analyticsData.revenue | k_formatter
            "
            statisticTitle="Current Liabilities"
            :chartData="CurrentliabilitiesData.series"
            type="area"
            color="danger"
          />
        </nuxt-link>
      </div>
      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <nuxt-link :to="`/crm/liabilities`">
          <statistics-card-line
            icon="TrendingDownIcon"
            :statistic="
              FixedliabilitiesData.analyticsData.revenue | k_formatter
            "
            statisticTitle="Long Term Liabilities"
            :chartData="FixedliabilitiesData.series"
            type="area"
            color="danger"
          />
        </nuxt-link>
      </div>

      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <nuxt-link :to="`/crm/income`">
          <statistics-card-line
            icon="TrendingUpIcon"
            :statistic="IncomeData.analyticsData.revenue | k_formatter"
            statisticTitle="Income"
            :chartData="IncomeData.series"
            color="success"
            type="area"
          />
        </nuxt-link>
      </div>
      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <nuxt-link :to="`/crm/expenses`">
          <statistics-card-line
            icon="TrendingDownIcon"
            :statistic="ExpenseData.analyticsData.revenue | k_formatter"
            statisticTitle="Expense"
            :chartData="ExpenseData.series"
            type="area"
            color="danger"
          />
        </nuxt-link>
      </div>
      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <nuxt-link :to="`/crm/products`">
          <statistics-card-line
            icon="FileTextIcon"
            :statistic="inventoryData.analyticsData.revenue | k_formatter"
            statisticTitle="Inventory "
            :chartData="inventoryData.series"
            type="area"
          />
        </nuxt-link>
      </div>
      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <nuxt-link :to="`/crm/products`">
          <statistics-card-line
            icon="FileTextIcon"
            :statistic="WOPinventoryData.analyticsData.revenue | k_formatter"
            statisticTitle="Inventory (WOP)"
            :chartData="WOPinventoryData.series"
            type="area"
          />
        </nuxt-link>
      </div>

      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <nuxt-link :to="`/crm/products`">
          <statistics-card-line
            icon="FileTextIcon"
            :statistic="FGinventoryData.analyticsData.revenue | k_formatter"
            statisticTitle="Inventory (FG)"
            :chartData="FGinventoryData.series"
            type="area"
          />
        </nuxt-link>
      </div>

      <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <nuxt-link :to="`/crm/products`">
          <statistics-card-line
            icon="FileTextIcon"
            :statistic="PMinventoryData.analyticsData.revenue | k_formatter"
            statisticTitle="Inventory (PM)"
            :chartData="PMinventoryData.series"
            type="area"
          />
        </nuxt-link>
      </div>
      <previous />
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/ui-elements/card/statistics_card_line.vue'
import vSelect from 'vue-select'
import moment from 'moment'
import bookEntry from '@/components/forms/register/register_entry'
import registerProducts from '@/components/forms/register/register_products2'
export default {
  components: {
    VueApexCharts,
    StatisticsCardLine,
    vSelect,
    bookEntry,
    registerProducts
  },
  data() {
    return {
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      year: 2020
    }
  },
  filters: {
    k_formatter(amount) {
      let myamount = 0

      if (amount) {
        myamount = amount
      }
      return myamount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
  },

  computed: {
    total_assets() {
      return this.$store.state.crm.total_assets
    },
    assets_indv() {
      return this.$store.state.crm.assets_indv
    },
    company_assets() {
      let ass = []
      let arr_ass = Object.entries(this.total_assets)
      for (let i = 0; i < arr_ass.length; i++) {
        let sm_ass = {}
        sm_ass.name = arr_ass[i][0]
        sm_ass.val = arr_ass[i][1].val

        ass.push(sm_ass)
      }

      return ass
    },
    jan() {
      return moment()
        .month(0)
        .year(this.year)
        .format('MM-YYYY')
    },
    feb() {
      return moment()
        .month(1)
        .year(this.year)
        .format('MM-YYYY')
    },
    march() {
      return moment()
        .month(2)
        .year(this.year)
        .format('MM-YYYY')
    },
    april() {
      return moment()
        .month(3)
        .year(this.year)
        .format('MM-YYYY')
    },
    may() {
      return moment()
        .month(4)
        .year(this.year)
        .format('MM-YYYY')
    },
    june() {
      return moment()
        .month(5)
        .year(this.year)
        .format('MM-YYYY')
    },
    july() {
      return moment()
        .month(6)
        .year(this.year)
        .format('MM-YYYY')
    },
    aug() {
      return moment()
        .month(7)
        .year(this.year)
        .format('MM-YYYY')
    },
    sept() {
      return moment()
        .month(8)
        .year(this.year)
        .format('MM-YYYY')
    },
    oct() {
      return moment()
        .month(9)
        .year(this.year)
        .format('MM-YYYY')
    },
    nov() {
      return moment()
        .month(10)
        .year(this.year)
        .format('MM-YYYY')
    },
    dec() {
      return moment()
        .month(11)
        .year(this.year)
        .format('MM-YYYY')
    },
    total() {
      return this.$store.state.crm.total_data
    },
    total_month() {
      return this.$store.state.crm.total_data_month
    },
    total_month_jan() {
      return this.$store.state.crm.total_data_month_jan
    },
    total_month_feb() {
      return this.$store.state.crm.total_data_month_feb
    },
    total_month_march() {
      return this.$store.state.crm.total_data_month_march
    },
    total_month_april() {
      return this.$store.state.crm.total_data_month_april
    },
    total_month_may() {
      return this.$store.state.crm.total_data_month_may
    },
    total_month_june() {
      return this.$store.state.crm.total_data_month_june
    },
    total_month_july() {
      return this.$store.state.crm.total_data_month_july
    },
    total_month_aug() {
      return this.$store.state.crm.total_data_month_aug
    },
    total_month_sept() {
      return this.$store.state.crm.total_data_month_sept
    },
    total_month_oct() {
      return this.$store.state.crm.total_data_month_oct
    },
    total_month_nov() {
      return this.$store.state.crm.total_data_month_nov
    },
    total_month_dec() {
      return this.$store.state.crm.total_data_month_dec
    },
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    },

    AssetsData() {
      return {
        series: [
          {
            name: 'Assets',
            data: this.AssetsMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.AssetsMonth}`
        }
      }
    },
    AssetsMonth() {
      let assets = 0
      if (this.total.ass) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.ass))
        assets = parsedobj.val
      }

      return assets
    },
    AssetsMonthData() {
      let myassets = []
      if (this.total.ass) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.ass))
        let tot = 0
        for (let i = 0; i < parsedobj.data.length; i++) {
          tot = tot + parsedobj.data[i]
          myassets.push(tot)
        }
      }

      return myassets
    },
    //Current
    CurrentAssetsData() {
      return {
        series: [
          {
            name: 'Assets',
            data: this.CurrentAssetsMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.CurrentAssetsMonth}`
        }
      }
    },
    CurrentAssetsMonth() {
      let assets = 0
      if (this.total.c_ass) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.c_ass))
        assets = parsedobj.val
      }

      return assets
    },
    CurrentAssetsMonthData() {
      let myassets = []
      if (this.total.c_ass) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.c_ass))
        let tot = 0
        for (let i = 0; i < parsedobj.data.length; i++) {
          tot = tot + parsedobj.data[i]
          myassets.push(tot)
        }
      }

      return myassets
    },
    //Fixed
    FixedAssetsData() {
      return {
        series: [
          {
            name: 'Assets',
            data: this.FixedAssetsMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.FixedAssetsMonth}`
        }
      }
    },
    FixedAssetsMonth() {
      let assets = 0
      if (this.total.f_ass) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.f_ass))
        assets = parsedobj.val
      }

      return assets
    },
    FixedAssetsMonthData() {
      let myassets = []
      if (this.total.f_ass) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.f_ass))
        let tot = 0
        for (let i = 0; i < parsedobj.data.length; i++) {
          tot = tot + parsedobj.data[i]
          myassets.push(tot)
        }
      }

      return myassets
    },
    liabilitiesData() {
      return {
        series: [
          {
            name: 'Liabilities',
            data: this.liabilitiesMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.liabilitiesMonth}`
        }
      }
    },
    liabilitiesMonth() {
      let liabilites = 0
      if (this.total.liab) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.liab))
        liabilites = parsedobj.val
      }
      return liabilites
    },
    liabilitiesMonthData() {
      let myliabilities = []
      if (this.total.liab) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.liab))
        let tot = 0
        for (let i = 0; i < parsedobj.data.length; i++) {
          tot = tot + parsedobj.data[i]
          myliabilities.push(tot)
        }
      }

      return myliabilities
    },
    //current
    CurrentliabilitiesData() {
      return {
        series: [
          {
            name: 'Liabilities',
            data: this.CurrentliabilitiesMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.CurrentliabilitiesMonth}`
        }
      }
    },
    CurrentliabilitiesMonth() {
      let liabilites = 0
      if (this.total.c_liab) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.c_liab))
        liabilites = parsedobj.val
      }
      return liabilites
    },
    CurrentliabilitiesMonthData() {
      let myliabilities = []
      if (this.total.c_liab) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.c_liab))
        let tot = 0
        for (let i = 0; i < parsedobj.data.length; i++) {
          tot = tot + parsedobj.data[i]
          myliabilities.push(tot)
        }
      }

      return myliabilities
    },

    //fixed
    FixedliabilitiesData() {
      return {
        series: [
          {
            name: 'Liabilities',
            data: this.FixedliabilitiesMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.FixedliabilitiesMonth}`
        }
      }
    },
    FixedliabilitiesMonth() {
      let liabilites = 0
      if (this.total.f_liab) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.f_liab))
        liabilites = parsedobj.val
      }
      return liabilites
    },
    FixedliabilitiesMonthData() {
      let myliabilities = []
      if (this.total.f_liab) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.f_liab))
        let tot = 0
        for (let i = 0; i < parsedobj.data.length; i++) {
          tot = tot + parsedobj.data[i]
          myliabilities.push(tot)
        }
      }

      return myliabilities
    },
    equityData() {
      return {
        series: [
          {
            name: 'Equities',
            data: this.equityMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.equityMonth}`
        }
      }
    },
    equityMonth() {
      let equities = 0
      if (this.total.eq) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.eq))
        equities = parsedobj.val
      }
      return equities
    },
    equityMonthData() {
      let myEquity = []
      if (this.total.eq) {
        var parsedobj = JSON.parse(JSON.stringify(this.total.eq))
        let tot = 0
        for (let i = 0; i < parsedobj.data.length; i++) {
          tot = tot + parsedobj.data[i]
          myEquity.push(tot)
        }
      }

      return myEquity
    },

    ExpenseData() {
      return {
        series: [
          {
            name: 'Inventory',
            data: this.expenseMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.expenseMonth}`
        }
      }
    },
    expenseMonth() {
      let equities = 0
      if (this.total_month) {
        if (this.total_month.exp) {
          var parsedobj = JSON.parse(JSON.stringify(this.total_month.exp))
          equities = parsedobj.val
        }
      }

      return equities
    },
    expenseMonthData() {
      let myEquity = []
      if (this.total_month) {
        if (this.total_month.exp) {
          var parsedobj = JSON.parse(JSON.stringify(this.total_month.exp))
          let tot = 0
          for (let i = 0; i < parsedobj.data.length; i++) {
            tot = tot + parsedobj.data[i]
            myEquity.push(tot)
          }
        }
      }

      return myEquity
    },

    IncomeData() {
      return {
        series: [
          {
            name: 'Inventory',
            data: this.incomeMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.incomeMonth}`
        }
      }
    },
    incomeMonth() {
      let equities = 0
      if (this.total_month) {
        if (this.total_month.inc) {
          var parsedobj = JSON.parse(JSON.stringify(this.total_month.inc))
          equities = parsedobj.val
        }
      }

      return equities
    },
    incomeMonthData() {
      let myEquity = []
      if (this.total_month) {
        if (this.total_month.inc) {
          var parsedobj = JSON.parse(JSON.stringify(this.total_month.inc))
          let tot = 0
          for (let i = 0; i < parsedobj.data.length; i++) {
            tot = tot + parsedobj.data[i]
            myEquity.push(tot)
          }
        }
      }

      return myEquity
    },

    inventoryData() {
      return {
        series: [
          {
            name: 'Inventory',
            data: this.inventoryMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.inventoryMonth}`
        }
      }
    },
    inventoryMonth() {
      let vm = this
      let equities = 0
      // if (this.total['Inventory']) {
      //   var parsedobj = JSON.parse(JSON.stringify(this.total['Inventory']))
      //   equities = parsedobj.val
      // }
      for (let i = 0; i < vm.assets_indv.length; i++) {
        if (vm.assets_indv[i].c_asset) {
          if (vm.assets_indv[i].c_asset == 'Inventory') {
            equities = equities + Number(vm.assets_indv[i].price)
          }
        }
      }
      return equities
    },
    inventoryMonthData() {
      let myEquity = []
      if (this.total['Inventory']) {
        var parsedobj = JSON.parse(JSON.stringify(this.total['Inventory']))
        let tot = 0
        for (let i = 0; i < parsedobj.data.length; i++) {
          tot = tot + parsedobj.data[i]
          myEquity.push(tot)
        }
      }

      return myEquity
    },
    FGinventoryData() {
      return {
        series: [
          {
            name: 'Inventory',
            data: this.FGinventoryMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.FGinventoryMonth}`
        }
      }
    },
    FGinventoryMonth() {
      let equities = 0
      let vm = this
      // if (this.total['Finished Goods']) {
      //   var parsedobj = JSON.parse(JSON.stringify(this.total['Finished Goods']))
      //   equities = parsedobj.val
      // }
      for (let i = 0; i < vm.assets_indv.length; i++) {
        if (vm.assets_indv[i].c_asset) {
          if (vm.assets_indv[i].inv == 'Finished Goods') {
            equities = equities + Number(vm.assets_indv[i].price)
          }
        }
      }
      return equities
    },
    FGinventoryMonthData() {
      let myEquity = []
      if (this.total['Finished Goods']) {
        var parsedobj = JSON.parse(JSON.stringify(this.total['Finished Goods']))
        let tot = 0
        for (let i = 0; i < parsedobj.data.length; i++) {
          tot = tot + parsedobj.data[i]
          myEquity.push(tot)
        }
      }

      return myEquity
    },
    PMinventoryData() {
      return {
        series: [
          {
            name: 'Inventory',
            data: this.PMinventoryMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.PMinventoryMonth}`
        }
      }
    },
    PMinventoryMonth() {
      let equities = 0
      if (this.total['Raw and Packaging Material']) {
        var parsedobj = JSON.parse(
          JSON.stringify(this.total['Raw and Packaging Material'])
        )
        equities = parsedobj.val
      }
      return equities
    },
    PMinventoryMonthData() {
      let myEquity = []
      if (this.total['Raw and Packaging Material']) {
        var parsedobj = JSON.parse(
          JSON.stringify(this.total['Raw and Packaging Material'])
        )
        let tot = 0
        for (let i = 0; i < parsedobj.data.length; i++) {
          tot = tot + parsedobj.data[i]
          myEquity.push(tot)
        }
      }

      return myEquity
    },

    WOPinventoryData() {
      return {
        series: [
          {
            name: 'Inventory',
            data: this.WOPinventoryMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.WOPinventoryMonth}`
        }
      }
    },
    WOPinventoryMonth() {
      let equities = 0
      if (this.total['Work in Progress']) {
        var parsedobj = JSON.parse(
          JSON.stringify(this.total['Work in Progress'])
        )
        equities = parsedobj.val
      }
      return equities
    },
    WOPinventoryMonthData() {
      let myEquity = []
      if (this.total['Work in Progress']) {
        var parsedobj = JSON.parse(
          JSON.stringify(this.total['Work in Progress'])
        )
        let tot = 0
        for (let i = 0; i < parsedobj.data.length; i++) {
          tot = tot + parsedobj.data[i]
          myEquity.push(tot)
        }
      }

      return myEquity
    }
  },

  created() {
    // this.$store.commit('crm/SET_COMPANY', null)
    // let currentUser = this.activeUserInfo
    // let currentBusiness = this.activeBusinessInfo
    let docR
    let assets = []

    docR = this.$fireStore
      .collection('apps')
      .doc('crm')
      .collection(this.activeBusinessInfo.b_uid)
      .doc('book')
      .collection('book')
      .where('ass_type', 'in', ['Fixed Assets', 'Current Assets'])

    docR.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc
        assets.push({
          id: doc.id,
          created_date: doc.data().last,
          uid: doc.data().uid,
          asset_name: doc.data().ass_name,
          asset_type: doc.data().ass_type,
          documentation: doc.data().docs,
          branch: doc.data().branch,
          price: doc.data().t_cost,
          quantity: doc.data().qty,
          reference: doc.data().ref,
          c_asset: doc.data().c_asset,
          inv: doc.data().inv
        })
      })
      vm.$store.commit('crm/ASSETS_INDV_UPDATE', assets)
    })

    let vm = this
    if (process.client) {
      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('inventory')
        .collection('total')
        .doc('total')
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_INV', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document! 1')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc('total')
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE', total)
          } else {
            console.log('No such document! 2')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(moment().format('MM-YYYY'))
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document! 3')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.jan)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_JAN', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document! 4')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.feb)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_FEB', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!5')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.march)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_MARCH', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!6')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.april)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_APRIL', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!7')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.may)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_MAY', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!8')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.june)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_JUNE', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!9')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.july)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_JULY', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!10')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.aug)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_AUG', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!11')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.sept)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_SEPT', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!12')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.oct)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_OCT', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!13')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.nov)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_NOV', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!14')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(this.activeBusinessInfo.b_uid)
        .doc('stats')
        .collection('total')
        .doc(this.dec)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let total = doc.data()
            vm.$store.commit('crm/TOTAL_UPDATE_MONTH_DEC', total)
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!15')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    }
  }
}
</script>

<style lang="scss">
.chat-card-log {
  height: 400px;

  .chat-sent-msg {
    background-color: #f2f4f7 !important;
  }
}
</style>
