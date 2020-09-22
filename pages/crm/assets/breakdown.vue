<!-- =========================================================================================
    File Name: ApexCharts.vue
    Description: Apex Charts Demo
    ----------------------------------------------------------------------------------------
  
========================================================================================== -->

<template>
  <div id="extra-component-chartist-demo">
    <p class="mb-4">
      A Vue.js component for ApexCharts. Read full documnetation
      <a
        href="https://apexcharts.com/docs/installation/"
        target="_blank"
        rel="nofollow"
        >here</a
      >
    </p>

    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full mb-base">
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
      </div>

      <!-- LINE AREA CHART -->
      <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Line Area Chart" code-toggler>
          <vue-apex-charts
            type="area"
            height="350"
            :options="apexChatData.lineAreaChartSpline.chartOptions"
            :series="apexChatData.lineAreaChartSpline.series"
          ></vue-apex-charts>
          <template slot="codeContainer">
            {{ apexChatData.lineAreaChartSplineCode }}
          </template>
        </vx-card>
      </div>

      <!-- COLUMN CHART -->
      <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Column Chart">
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
        <vx-card title="Bar Chart" code-toggler>
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
        <vx-card title="Mixed Chart" code-toggler>
          <vue-apex-charts
            type="line"
            height="350"
            :options="apexChatData.mixedChart.chartOptions"
            :series="apexChatData.mixedChart.series"
          ></vue-apex-charts>
          <template slot="codeContainer">
            {{ apexChatData.mixedChartCode }}
          </template>
        </vx-card>
      </div>

      <!-- CANDLESTICK CHART -->
      <div class="vx-col w-full mb-base">
        <vx-card title="Candlestick Chart" code-toggler>
          <vue-apex-charts
            type="candlestick"
            height="350"
            :options="apexChatData.candlestickChart.chartOptions"
            :series="apexChatData.candlestickChart.series"
          ></vue-apex-charts>
          <template slot="codeContainer">
            {{ apexChatData.candlestickChartCode }}
          </template>
        </vx-card>
      </div>

      <!-- BUBBLE CHART -->
      <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="3D Bubble Chart" code-toggler>
          <vue-apex-charts
            type="bubble"
            height="350"
            :options="apexChatData.bubbleChart.chartOptions"
            :series="apexChatData.bubbleChart.series"
          ></vue-apex-charts>
          <template slot="codeContainer">
            {{ apexChatData.bubbleChartCode }}
          </template>
        </vx-card>
      </div>

      <!-- SCATTER CHART -->
      <div class="vx-col md:w-1/2 w-full mb-base">
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
      </div>

      <!-- HEAT MAP CHART -->
      <div class="vx-col w-full mb-base">
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
      </div>

      <!-- PIE CHART -->
      <div class="vx-col md:w-1/2 w-full mb-base">
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
      </div>

      <!-- DONUT CHART -->
      <div class="vx-col md:w-1/2 w-full mb-base">
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
      </div>

      <!-- RADIAL BAR CHART -->
      <div class="vx-col md:w-1/2 w-full mb-base">
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
      </div>

      <!-- RADAR CHART -->
      <div class="vx-col md:w-1/2 w-full">
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
      </div>
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
    columnChart: {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chartOptions: {
        colors: themeColors,
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
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct'
          ]
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter(val) {
              return `$ ${val} thousands`
            }
          }
        }
      }
    },
    inventoryChart() {
      let cat = []
      let data = []

      return {
        series: [
          {
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
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
            categories: [
              'South Korea',
              'Canada',
              'United Kingdom',
              'Netherlands',
              'Italy',
              'France',
              'Japan',
              'United States',
              'China',
              'Germany'
            ]
          }
        }
      }
    }
  }
}
</script>
