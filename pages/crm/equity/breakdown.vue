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
        <vx-card title="Fixed vs Total vs Current">
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
        <vx-card title="Inventory - Value">
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
        if (x.c_eq) {
          y.c = x.c_eq.val
        }
      }
      if (x) {
        if (x.f_eq) {
          y.f = x.f_eq.val
        }
      }
      if (x) {
        if (x.eq) {
          y.l = x.eq.val
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
    total_eq() {
      return this.$store.state.crm.total_eq
    },
    assets_indv() {
      return this.$store.state.crm.assets_indv
    },
    company_assets() {
      let ass = []
      let arr_ass = Object.entries(this.total_eq)
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
      let ass_jan = this.checkThere(this.total_month_jan)
      let ass_feb = this.checkThere(this.total_month_feb)
      let ass_march = this.checkThere(this.total_month_march)
      let ass_april = this.checkThere(this.total_month_april)
      let ass_may = this.checkThere(this.total_month_may)
      let ass_june = this.checkThere(this.total_month_june)
      let ass_july = this.checkThere(this.total_month_july)
      let ass_aug = this.checkThere(this.total_month_aug)
      let ass_sept = this.checkThere(this.total_month_sept)
      let ass_oct = this.checkThere(this.total_month_oct)
      let ass_nov = this.checkThere(this.total_month_nov)
      let ass_dec = this.checkThere(this.total_month_dec)

      let dataFA = [
        ass_jan.f,
        ass_feb.f,
        ass_march.f,
        ass_april.f,
        ass_may.f,
        ass_june.f,
        ass_july.f,
        ass_aug.f,
        ass_sept.f,
        ass_oct.f,
        ass_nov.f,
        ass_dec.f
      ]
      let dataA = [
        ass_jan.l,
        ass_feb.l,
        ass_march.l,
        ass_april.l,
        ass_may.l,
        ass_june.l,
        ass_july.l,
        ass_aug.l,
        ass_sept.l,
        ass_oct.l,
        ass_nov.l,
        ass_dec.l
      ]
      let dataCA = [
        ass_jan.c,
        ass_feb.c,
        ass_march.c,
        ass_april.c,
        ass_may.c,
        ass_june.c,
        ass_july.c,
        ass_aug.c,
        ass_sept.c,
        ass_oct.c,
        ass_nov.c,
        ass_dec.c
      ]

      return {
        series: [
          // {
          //   name: 'Assets Fixed',
          //   type: 'column',
          //   data: dataFA
          // },
          {
            name: 'Equity',
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
      let ass_jan = this.checkThere(this.total_month_jan)
      let ass_feb = this.checkThere(this.total_month_feb)
      let ass_march = this.checkThere(this.total_month_march)
      let ass_april = this.checkThere(this.total_month_april)
      let ass_may = this.checkThere(this.total_month_may)
      let ass_june = this.checkThere(this.total_month_june)
      let ass_july = this.checkThere(this.total_month_july)
      let ass_aug = this.checkThere(this.total_month_aug)
      let ass_sept = this.checkThere(this.total_month_sept)
      let ass_oct = this.checkThere(this.total_month_oct)
      let ass_nov = this.checkThere(this.total_month_nov)
      let ass_dec = this.checkThere(this.total_month_dec)

      let dataFA = [
        ass_jan.f,
        ass_feb.f,
        ass_march.f,
        ass_april.f,
        ass_may.f,
        ass_june.f,
        ass_july.f,
        ass_aug.f,
        ass_sept.f,
        ass_oct.f,
        ass_nov.f,
        ass_dec.f
      ]
      let dataA = [
        ass_jan.l,
        ass_feb.l,
        ass_march.l,
        ass_april.l,
        ass_may.l,
        ass_june.l,
        ass_july.l,
        ass_aug.l,
        ass_sept.l,
        ass_oct.l,
        ass_nov.l,
        ass_dec.l
      ]
      let dataCA = [
        ass_jan.c,
        ass_feb.c,
        ass_march.c,
        ass_april.c,
        ass_may.c,
        ass_june.c,
        ass_july.c,
        ass_aug.c,
        ass_sept.c,
        ass_oct.c,
        ass_nov.c,
        ass_dec.c
      ]
      return {
        series: [
          {
            name: 'Total Equity',
            data: dataA
          }
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
