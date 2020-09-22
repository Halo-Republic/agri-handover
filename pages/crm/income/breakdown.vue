<template>
  <div id="extra-component-chartist-demo" class="mt-12">
    <div class="vx-row">
      <!-- <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Line Chart" code-toggler>
          <vue-apex-charts
            type="line"
            height="350"
            :options="apexChatData.lineChartSimple.chartOptions"
            :series="apexChatData.lineChartSimple.series"
          ></vue-apex-charts>
          <template slot="codeContainer">
            {{ apexChatData.lineChartSimpleCode }}
          </template>
        </vx-card>
      </div> -->

      <!-- LINE AREA CHART -->
      <!-- <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Line Area Chart">
          <vue-apex-charts
            type="area"
            height="350"
            :options="lineAreaChartSpline.chartOptions"
            :series="lineAreaChartSpline.series"
          ></vue-apex-charts>
        </vx-card>
      </div> -->

      <!-- COLUMN CHART -->
      <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Total Monthly">
          <vue-apex-charts
            type="bar"
            height="350"
            :options="columnChart.chartOptions"
            :series="columnChart.series"
          ></vue-apex-charts>
        </vx-card>
      </div>

      <!-- Bar CHART -->
      <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Expenses - Value">
          <vue-apex-charts
            type="bar"
            height="350"
            :options="inventoryChart.chartOptions"
            :series="inventoryChart.series"
          ></vue-apex-charts>
        </vx-card>
      </div>

      <!-- MIXED CHART -->
      <div class="vx-col w-full mb-base">
        <vx-card title="Mixed Chart">
          <vue-apex-charts
            type="line"
            height="350"
            :options="mixedChart.chartOptions"
            :series="mixedChart.series"
          ></vue-apex-charts>
        </vx-card>
      </div>

      <!-- BUBBLE CHART -->
      <!-- <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="3D Bubble Chart">
          <vue-apex-charts
            type="bubble"
            height="350"
            :options="apexChatData.bubbleChart.chartOptions"
            :series="apexChatData.bubbleChart.series"
          ></vue-apex-charts>
        </vx-card>
      </div> -->

      <!-- SCATTER CHART -->
      <!-- <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Scatter Chart" code-toggler>
          <vue-apex-charts
            type="scatter"
            height="350"
            :options="apexChatData.scatterChart.chartOptions"
            :series="apexChatData.scatterChart.series"
          ></vue-apex-charts>
          <template slot="codeContainer">
            {{ apexChatData.scatterChartCode }}
          </template>
        </vx-card>
      </div> -->

      <!-- HEAT MAP CHART -->
      <!-- <div class="vx-col w-full mb-base">
        <vx-card title="Heat Map Chart" code-toggler>
          <vue-apex-charts
            type="heatmap"
            height="350"
            :options="apexChatData.heatMapChart.chartOptions"
            :series="apexChatData.heatMapChart.series"
          ></vue-apex-charts>
          <template slot="codeContainer">
            {{ apexChatData.heatMapChartCode }}
          </template>
        </vx-card>
      </div> -->

      <!-- PIE CHART -->
      <!-- <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Pie Chart" code-toggler>
          <vue-apex-charts
            type="pie"
            height="350"
            :options="apexChatData.pieChart.chartOptions"
            :series="apexChatData.pieChart.series"
          ></vue-apex-charts>
          <template slot="codeContainer">
            {{ apexChatData.pieChartCode }}
          </template>
        </vx-card>
      </div> -->

      <!-- DONUT CHART -->
      <!-- <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Donut Chart" code-toggler>
          <vue-apex-charts
            type="donut"
            height="350"
            :options="apexChatData.donutChart.chartOptions"
            :series="apexChatData.donutChart.series"
          ></vue-apex-charts>
          <template slot="codeContainer">
            {{ apexChatData.donutChartCode }}
          </template>
        </vx-card>
      </div> -->

      <!-- RADIAL BAR CHART -->
      <!-- <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Radial Bar Chart" code-toggler>
          <vue-apex-charts
            type="radialBar"
            height="350"
            :options="apexChatData.radialBarChart.chartOptions"
            :series="apexChatData.radialBarChart.series"
          ></vue-apex-charts>
          <template slot="codeContainer">
            {{ apexChatData.radialBarChartCode }}
          </template>
        </vx-card>
      </div> -->

      <!-- RADAR CHART -->
      <!-- <div class="vx-col md:w-1/2 w-full">
        <vx-card title="Radar Chart" code-toggler>
          <vue-apex-charts
            type="radar"
            height="350"
            :options="apexChatData.radarChart.chartOptions"
            :series="apexChatData.radarChart.series"
          ></vue-apex-charts>
          <template slot="codeContainer">
            {{ apexChatData.radarChartCode }}
          </template>
        </vx-card>
      </div> -->
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import apexChatData from '@/plugins/data'
export default {
  data() {
    return {
      apexChatData,
      inventory: {},
      themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E']
    }
  },
  components: {
    VueApexCharts
  },
  methods: {
    checkThere(x) {
      let y = {
        c: 0,
        f: 0,
        l: 0
      }
      if (x) {
        if (x.c_liab) {
          y.c = x.c_liab.val
        }
      }
      if (x) {
        if (x.f_liab) {
          y.f = x.f_liab.val
        }
      }
      if (x) {
        if (x.exp) {
          y.l = x.exp.val
        }
      }

      return y
    }
  },
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    },
    activeCompanyInfo() {
      return this.$store.state.crm.company
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
    total_exp() {
      return this.$store.state.crm.total_exp
    },
    assets_indv() {
      return this.$store.state.crm.assets_indv
    },
    company_assets() {
      let ass = []
      let arr_ass = Object.entries(this.total_exp)
      for (let i = 0; i < arr_ass.length; i++) {
        let sm_ass = {}
        sm_ass.name = arr_ass[i][0]
        sm_ass.val = arr_ass[i][1].val

        ass.push(sm_ass)
      }

      return ass
    },
    lineAreaChartSpline() {
      return {
        series: [
          {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
          },
          {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
          }
        ],
        chartOptions: {
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          colors: this.themeColors,
          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            }
          }
        }
      }
    },
    mixedChart() {
      let exp_jan = this.checkThere(this.total_month_jan)
      let exp_feb = this.checkThere(this.total_month_feb)
      let exp_march = this.checkThere(this.total_month_march)
      let exp_april = this.checkThere(this.total_month_april)
      let exp_may = this.checkThere(this.total_month_may)
      let exp_june = this.checkThere(this.total_month_june)
      let exp_july = this.checkThere(this.total_month_july)
      let exp_aug = this.checkThere(this.total_month_aug)
      let exp_sept = this.checkThere(this.total_month_sept)
      let exp_oct = this.checkThere(this.total_month_oct)
      let exp_nov = this.checkThere(this.total_month_nov)
      let exp_dec = this.checkThere(this.total_month_dec)

      let dataFA = [
        exp_jan.f,
        exp_feb.f,
        exp_march.f,
        exp_april.f,
        exp_may.f,
        exp_june.f,
        exp_july.f,
        exp_aug.f,
        exp_sept.f,
        exp_oct.f,
        exp_nov.f,
        exp_dec.f
      ]
      let dataA = [
        exp_jan.l,
        exp_feb.l,
        exp_march.l,
        exp_april.l,
        exp_may.l,
        exp_june.l,
        exp_july.l,
        exp_aug.l,
        exp_sept.l,
        exp_oct.l,
        exp_nov.l,
        exp_dec.l
      ]
      let dataCA = [
        exp_jan.c,
        exp_feb.c,
        exp_march.c,
        exp_april.c,
        exp_may.c,
        exp_june.c,
        exp_july.c,
        exp_aug.c,
        exp_sept.c,
        exp_oct.c,
        exp_nov.c,
        exp_dec.c
      ]

      return {
        series: [
          // {
          //   name: 'Assets Fixed',
          //   type: 'column',
          //   data: dataFA
          // },
          {
            name: 'Expenses',
            type: 'area',
            data: dataA
          }
          // {
          //   name: 'Assets Current',
          //   type: 'line',
          //   data: dataCA
          // }
        ],
        chartOptions: {
          colors: this.themeColors,
          chart: {
            stacked: false
          },
          stroke: {
            width: [0, 2, 5],
            curve: 'smooth'
          },
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          },

          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: 'light',
              type: 'vertical',
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100]
            }
          },
          labels: [
            '01/01/2020',
            '02/01/2020',
            '03/01/2020',
            '04/01/2020',
            '05/01/2020',
            '06/01/2020',
            '07/01/2020',
            '08/01/2020',
            '09/01/2020',
            '10/01/2020',
            '11/01/2020'
          ],
          markers: {
            size: 0
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            title: {
              text: 'Rand'
            },
            min: 0
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter(y) {
                if (typeof y !== 'undefined') {
                  return `${y.toFixed(0)} Rand`
                }
                return y
              }
            }
          }
        }
      }
    },
    columnChart() {
      let exp_jan = this.checkThere(this.total_month_jan)
      let exp_feb = this.checkThere(this.total_month_feb)
      let exp_march = this.checkThere(this.total_month_march)
      let exp_april = this.checkThere(this.total_month_april)
      let exp_may = this.checkThere(this.total_month_may)
      let exp_june = this.checkThere(this.total_month_june)
      let exp_july = this.checkThere(this.total_month_july)
      let exp_aug = this.checkThere(this.total_month_aug)
      let exp_sept = this.checkThere(this.total_month_sept)
      let exp_oct = this.checkThere(this.total_month_oct)
      let exp_nov = this.checkThere(this.total_month_nov)
      let exp_dec = this.checkThere(this.total_month_dec)

      let dataFA = [
        exp_jan.f,
        exp_feb.f,
        exp_march.f,
        exp_april.f,
        exp_may.f,
        exp_june.f,
        exp_july.f,
        exp_aug.f,
        exp_sept.f,
        exp_oct.f,
        exp_nov.f,
        exp_dec.f
      ]
      let dataA = [
        exp_jan.l,
        exp_feb.l,
        exp_march.l,
        exp_april.l,
        exp_may.l,
        exp_june.l,
        exp_july.l,
        exp_aug.l,
        exp_sept.l,
        exp_oct.l,
        exp_nov.l,
        exp_dec.l
      ]
      let dataCA = [
        exp_jan.c,
        exp_feb.c,
        exp_march.c,
        exp_april.c,
        exp_may.c,
        exp_june.c,
        exp_july.c,
        exp_aug.c,
        exp_sept.c,
        exp_oct.c,
        exp_nov.c,
        exp_dec.c
      ]

      return {
        series: [
          // {
          //   name: 'Fixed Liabilities',
          //   data: dataFA
          // },
          {
            name: 'Total Expenses',
            data: dataA
          }
          // {
          //   name: 'Current Liabilities',
          //   data: dataCA
          // }
        ],
        chartOptions: {
          colors: this.themeColors,
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: 'rounded',
              columnWidth: '55%'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },

          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          },
          yaxis: {
            title: {
              text: 'R - changed Value'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter(val) {
                return `R ${val} thousands`
              }
            }
          }
        }
      }
    },
    inventoryChart() {
      let cat = []
      let data = []

      for (let i = 0; i < this.company_assets.length; i++) {
        if (this.company_assets[i].name !== 'last') {
          cat.push(this.company_assets[i].name)
          data.push(this.company_assets[i].val)
        }
      }
      return {
        series: [
          {
            data: data
          }
        ],
        chartOptions: {
          colors: this.themeColors,
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: cat
          }
        }
      }
    }
  }
}
</script>

<style></style>
