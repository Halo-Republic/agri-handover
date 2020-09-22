<!-- =========================================================================================
    File Name: DashboardEcommerce.vue
    Description: Dashboard - Ecommerce
    ----------------------------------------------------------------------------------------

========================================================================================== -->

<template>
  <div class="p-10">
    <client-only>
      <vs-card style="width: 100%" class="mt-10">
        <vs-row vs-w="12" vs-justify="space-around">
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-lg="4"
            vs-sm="4"
            vs-xs="6"
          >
            <div>
              <vs-row vs-w="12" vs-type="flex" vs-justify="center">
                <feather-icon
                  icon="UsersIcon"
                  svgClasses="w-8 h-8 text-grey"
                  @click="setSeeOver"
                ></feather-icon>
                <v-select
                  v-if="SeeOver"
                  class="w-full mb-3 select-large "
                  :value="selectSee"
                  v-model="selectSee"
                  label="center"
                  :options="overSeeingDisplayName"
                ></v-select>
              </vs-row>
              <vs-row class="pt-3">
                <small v-if="selectSee">{{ selectSee }} </small>
                <small v-else>{{ activeUserInfo.display_name }} </small>
              </vs-row>
            </div>
          </vs-col>

          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-lg="4"
            vs-sm="4"
            vs-xs="6"
          >
            <div>
              <vs-row vs-w="12" vs-type="flex" vs-justify="center">
                <feather-icon
                  icon="WatchIcon"
                  svgClasses="w-8 h-8 text-grey"
                  @click="setDateWatch"
                ></feather-icon>

                <div class="my-4" v-if="DateWatch">
                  <small class="date-label">Date</small>
                  <datepicker
                    name="start-date"
                    v-model="startDate"
                    minimum-view="month"
                  ></datepicker>
                </div>
              </vs-row>
              <vs-row class="pt-3">
                <small>{{ createdMonth }} </small>
              </vs-row>
            </div>
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-lg="4"
            vs-sm="4"
            vs-xs="6"
          >
            <!-- <div v-if="timeSheets[0].startTime && timeSheets[0].endTime"> -->
            <div>
              <vs-row vs-w="12" vs-type="flex" vs-justify="center">
                <feather-icon
                  icon="SunriseIcon"
                  style="color: yellow"
                  svgClasses="w-8 h-8 text-grey"
                  @click="setStartDay"
                ></feather-icon>
              </vs-row>
              <vs-row class="pt-3">
                <small
                  >Prev:
                  <!-- {{ timeSheets[0].startTime }} - -->
                  <!-- {{ timeSheets[0].endTime }} -->
                </small>
              </vs-row>
            </div>
            <!-- <div v-if="timeSheets[0].startTime && !timeSheets[0].endTime"> -->
            <div>
              <!-- <vs-row class="pt-3">
              <small> {{ timeSheets[0].startTime }} - </small>
            </vs-row> -->
              <vs-row>
                <feather-icon
                  icon="SunsetIcon"
                  svgClasses="w-12 h-12 text-grey"
                  @click="setEndDay"
                ></feather-icon>
              </vs-row>
              <vs-row class="pt-3">
                <!-- <small>Start: {{ timeSheets[0].startTime }}</small> -->
              </vs-row>
            </div>
          </vs-col>
        </vs-row>
      </vs-card>

      <vs-row> </vs-row>
      <div class="vx-row">
        <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/5 xl:w-1/5 mb-base">
          <nuxt-link :to="`crm/company`">
            <statistics-card-line
              icon="LayoutIcon"
              :statistic="CompaniesData.analyticsData.revenue"
              statisticTitle="Companies"
              :chartData="CompaniesData.series"
              type="area"
            />
          </nuxt-link>
        </div>

        <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/5 xl:w-1/5 mb-base">
          <nuxt-link :to="`crm/customers`">
            <statistics-card-line
              icon="LayoutIcon"
              :statistic="CustomersData.analyticsData.revenue"
              statisticTitle="Customers"
              :chartData="CustomersData.series"
              type="area"
            />
          </nuxt-link>
        </div>

        <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/5 xl:w-1/5 mb-base">
          <nuxt-link :to="`crm/expenses`">
            <statistics-card-line
              icon="FileTextIcon"
              :statistic="invs.analyticsData.subscribers"
              statisticTitle="Invoices"
              :chartData="invs.series"
              type="area"
              color="warning"
            />
          </nuxt-link>
        </div>
        <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/5 xl:w-1/5 mb-base">
          <nuxt-link :to="`crm/expenses`">
            <statistics-card-line
              icon="FileTextIcon"
              :statistic="quotes.analyticsData.subscribers"
              statisticTitle="Quotes"
              :chartData="quotes.series"
              type="area"
              color="warning"
            />
          </nuxt-link>
        </div>

        <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/5 xl:w-1/5 mb-base">
          <nuxt-link :to="`crm/expenses`">
            <statistics-card-line
              icon="FileTextIcon"
              :statistic="meetings.analyticsData.subscribers"
              statisticTitle="Meetings"
              :chartData="meetings.series"
              type="area"
            />
          </nuxt-link>
        </div>

        <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
          <nuxt-link :to="`crm/products`">
            <statistics-card-line
              icon="DollarSignIcon"
              :statistic="salesDatass.analyticsData.revenue | k_formatter"
              statisticTitle="Profit Generated"
              :chartData="salesDatass.series"
              color="success"
              type="area"
            />
          </nuxt-link>
        </div>

        <div
          class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base"
          style=" position: relative; "
        >
          <nuxt-link :to="`crm/sales`">
            <statistics-card-line
              icon="DollarSignIcon"
              :statistic="unitsData.analyticsData.revenue"
              statisticTitle="Units Sold"
              :chartData="unitsData.series"
              color="success"
              type="area"
            />
          </nuxt-link>
        </div>
        <div
          class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base"
          style=" position: relative; "
        >
          <nuxt-link :to="`crm/expenses`">
            <statistics-card-line
              icon="DollarSignIcon"
              :statistic="
                RunningExpensesData.analyticsData.revenue | k_formatter
              "
              statisticTitle="Operating Expenses"
              :chartData="RunningExpensesData.series"
              type="area"
              color="danger"
            />
          </nuxt-link>
        </div>

        <!-- <div
          class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base"
          style=" position: relative; "
        >
          <nuxt-link :to="`crm/expenses`">
            <statistics-card-line
              icon="ShoppingCartIcon"
              :statistic="quarterlySales.analyticsData.sales"
              statisticTitle="Quarterly Sales"
              :chartData="quarterlySales.series"
              color="danger"
              type="area"
            />
          </nuxt-link>
        </div> -->
        <!-- <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
          <nuxt-link :to="`crm/expenses`">
            <statistics-card-line
              icon="ShoppingBagIcon"
              :statistic="ordersRecevied.analyticsData.orders | k_formatter"
              statisticTitle="Orders Received"
              :chartData="ordersRecevied.series"
              color="warning"
              type="area"
            />
          </nuxt-link>
        </div> -->
        <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
          <nuxt-link :to="`crm/expenses`">
            <statistics-card-line
              icon="FileTextIcon"
              :statistic="AssetsData.analyticsData.revenue | k_formatter"
              statisticTitle="Inventory"
              :chartData="AssetsData.series"
              type="line"
            />
          </nuxt-link>
        </div>

        <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base">
          <nuxt-link :to="`crm/assets`">
            <statistics-card-line
              icon="FileTextIcon"
              :statistic="AssetsData.analyticsData.revenue | k_formatter"
              statisticTitle="Total Assets"
              :chartData="AssetsData.series"
              type="area"
            />
          </nuxt-link>
        </div>

        <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base">
          <nuxt-link :to="`crm/expenses`">
            <statistics-card-line
              icon="DollarSignIcon"
              :statistic="liabilitiesData.analyticsData.revenue | k_formatter"
              statisticTitle="Total Liabilities"
              :chartData="liabilitiesData.series"
              type="area"
              color="danger"
            />
          </nuxt-link>
        </div>

        <div class="w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base">
          <nuxt-link :to="`crm/expenses`">
            <statistics-card-line
              icon="FileTextIcon"
              :statistic="meetings.analyticsData.subscribers"
              statisticTitle="Equity"
              :chartData="meetings.series"
              type="area"
            />
          </nuxt-link>
        </div>
      </div>

      <div class="vx-row">
        <!-- LINE CHART -->
        <div class="w-full vx-col md:w-2/3 mb-base">
          <vx-card title="Revenue" v-if="RevenueMonth">
            <template slot="actions">
              <feather-icon
                icon="SettingsIcon"
                svgClasses="w-6 h-6 text-grey"
                @click="setRevenueMonth"
              ></feather-icon>
            </template>

            <div slot="no-body" class="p-6 pb-0">
              <div class="flex">
                <div class="mr-6">
                  <p class="mb-1 font-semibold">This Month</p>
                  <p class="text-3xl text-success">
                    <sup class="mr-1 text-base">R</sup
                    >{{
                      revenueComparisonLineMonth.analyticsData.thisMonth.toLocaleString()
                    }}
                  </p>
                </div>
                <div>
                  <p class="mb-1 font-semibold">Last Month</p>
                  <p class="text-3xl">
                    <sup class="mr-1 text-base">R</sup
                    >{{
                      revenueComparisonLineMonth.analyticsData.lastMonth.toLocaleString()
                    }}
                  </p>
                </div>
              </div>
              <vue-apex-charts
                type="line"
                height="266"
                :options="analyticsData.revenueComparisonLine.chartOptions"
                :series="revenueComparisonLineMonth.series"
              />
            </div>
          </vx-card>

          <vx-card title="Revenue" v-else>
            <template slot="actions">
              <feather-icon
                icon="SettingsIcon"
                svgClasses="w-6 h-6 text-grey"
                @click="setRevenueMonth"
              ></feather-icon>
            </template>

            <div slot="no-body" class="p-6 pb-0">
              <div class="flex">
                <div class="mr-6">
                  <p class="mb-1 font-semibold">This Month</p>
                  <p class="text-3xl text-success">
                    <sup class="mr-1 text-base">R</sup
                    >{{
                      revenueComparisonLineMonth.analyticsData.thisMonth.toLocaleString()
                    }}
                  </p>
                </div>
                <div>
                  <p class="mb-1 font-semibold">{{ oneMonth }}</p>
                  <p class="text-3xl">
                    <sup class="mr-1 text-base">R</sup
                    >{{
                      revenueComparisonLineMonth.analyticsData.lastMonth.toLocaleString()
                    }}
                  </p>
                </div>
                <div
                  v-if="
                    revenueComparisonLineMonth.analyticsData.lastTwoMonth.toLocaleString() >
                      0
                  "
                >
                  <p class="mb-1 font-semibold">{{ twoMonth }}</p>
                  <p class="text-3xl">
                    <sup class="mr-1 text-base">R</sup
                    >{{
                      revenueComparisonLineMonth.analyticsData.lastTwoMonth.toLocaleString()
                    }}
                  </p>
                </div>
                <div
                  v-if="
                    revenueComparisonLineMonth.analyticsData.lastThreeMonth.toLocaleString() >
                      0
                  "
                >
                  <p class="mb-1 font-semibold">{{ threeMonth }}</p>
                  <p class="text-3xl">
                    <sup class="mr-1 text-base">R</sup
                    >{{
                      revenueComparisonLineMonth.analyticsData.lastThreeMonth.toLocaleString()
                    }}
                  </p>
                </div>
                <div
                  v-if="
                    revenueComparisonLineMonth.analyticsData.lastFourMonth.toLocaleString() >
                      0
                  "
                >
                  <p class="mb-1 font-semibold">{{ fourMonth }}</p>
                  <p class="text-3xl">
                    <sup class="mr-1 text-base">R</sup
                    >{{
                      revenueComparisonLineMonth.analyticsData.lastFourMonth.toLocaleString()
                    }}
                  </p>
                </div>
                <div
                  v-if="
                    revenueComparisonLineMonth.analyticsData.lastFiveMonth.toLocaleString() >
                      0
                  "
                >
                  <p class="mb-1 font-semibold">{{ fiveMonth }}</p>
                  <p class="text-3xl">
                    <sup class="mr-1 text-base">R</sup
                    >{{
                      revenueComparisonLineMonth.analyticsData.lastFiveMonth.toLocaleString()
                    }}
                  </p>
                </div>
                <div
                  v-if="
                    revenueComparisonLineMonth.analyticsData.lastSixMonth.toLocaleString() >
                      0
                  "
                >
                  <p class="mb-1 font-semibold">{{ sixMonth }}</p>
                  <p class="text-3xl">
                    <sup class="mr-1 text-base">R</sup
                    >{{
                      revenueComparisonLineMonth.analyticsData.lastSixMonth.toLocaleString()
                    }}
                  </p>
                </div>
              </div>
              <vue-apex-charts
                type="line"
                height="266"
                :options="analyticsData.revenueComparisonLine.chartOptions"
                :series="revenueComparisonLineMonth.series"
              />
            </div>
          </vx-card>
        </div>

        <!-- RADIAL CHART -->
        <div class="w-full vx-col md:w-1/3 mb-base" v-if="Personal & un">
          <vx-card title="Personal Goal">
            <template slot="actions">
              <feather-icon
                icon="UsersIcon"
                svgClasses="w-6 h-6 text-grey"
                @click="setPersonal"
              ></feather-icon>
            </template>
            <template slot="actions">
              <feather-icon
                icon="DollarSignIcon"
                svgClasses="w-6 h-6 text-green"
                @click="setUn"
              ></feather-icon>
            </template>

            <!-- CHART -->
            <template slot="no-body">
              <div class="mt-10">
                <vue-apex-charts
                  type="radialBar"
                  height="240"
                  :options="analyticsData.goalOverviewRadialBar.chartOptions"
                  :series="goalOverviewUnits.series"
                />
              </div>
            </template>

            <!-- DATA -->
            <div
              class="flex justify-between mt-6 text-center"
              slot="no-body-bottom"
            >
              <div
                class="w-1/2 border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light"
              >
                <p class="mt-4">Units Sold</p>
                <p class="mb-4 text-3xl font-semibold">{{ UnitsMonth }}</p>
              </div>
              <div
                class="w-1/2 border border-b-0 border-r-0 border-solid d-theme-border-grey-light"
              >
                <p class="mt-4">Target</p>
                <p class="mb-4 text-3xl font-semibold">
                  {{ ownTargetThisMonth.own_unit_target }}
                </p>
              </div>
            </div>
          </vx-card>
        </div>
        <div class="w-full vx-col md:w-1/3 mb-base" v-if="!Personal & un">
          <vx-card title="Manager Goal">
            <template slot="actions">
              <feather-icon
                icon="UsersIcon"
                svgClasses="w-6 h-6 text-grey"
                @click="setPersonal"
              ></feather-icon>
            </template>
            <template slot="actions">
              <feather-icon
                icon="DollarSignIcon"
                svgClasses="w-6 h-6 text-green"
                @click="setUn"
              ></feather-icon>
            </template>

            <!-- CHART -->
            <template slot="no-body">
              <div class="mt-10">
                <vue-apex-charts
                  type="radialBar"
                  height="240"
                  :options="analyticsData.goalOverviewRadialBar.chartOptions"
                  :series="goalOverviewUnitsMan.series"
                />
              </div>
            </template>

            <!-- DATA -->
            <div
              class="flex justify-between mt-6 text-center"
              slot="no-body-bottom"
            >
              <div
                class="w-1/2 border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light"
              >
                <p class="mt-4">Units Sold</p>
                <p class="mb-4 text-3xl font-semibold">{{ UnitsMonth }}</p>
              </div>
              <div
                class="w-1/2 border border-b-0 border-r-0 border-solid d-theme-border-grey-light"
              >
                <p class="mt-4">Target</p>
                <p class="mb-4 text-3xl font-semibold">
                  {{ ownTargetThisMonth.manager_unit_target }}
                </p>
              </div>
            </div>
          </vx-card>
        </div>

        <!-- RADIAL CHART -->

        <div class="w-full vx-col md:w-1/3 mb-base" v-if="Personal & !un">
          <vx-card title="Personal Goal">
            <template slot="actions">
              <feather-icon
                icon="UsersIcon"
                svgClasses="w-6 h-6 text-grey"
                @click="setPersonal"
              ></feather-icon>
            </template>
            <template slot="actions">
              <feather-icon
                icon="DollarSignIcon"
                svgClasses="w-6 h-6 text-green"
                @click="setUn"
              ></feather-icon>
            </template>

            <!-- CHART -->
            <template slot="no-body">
              <div class="mt-10">
                <vue-apex-charts
                  type="radialBar"
                  height="240"
                  :options="analyticsData.goalOverviewRadialBar.chartOptions"
                  :series="goalOverviewValue.series"
                />
              </div>
            </template>

            <!-- DATA -->
            <div
              class="flex justify-between mt-6 text-center"
              slot="no-body-bottom"
            >
              <div
                class="w-1/2 border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light"
              >
                <p class="mt-4">Value Sold</p>
                <p class="mb-4 text-3xl font-semibold">{{ SalesMonth }}</p>
              </div>
              <div
                class="w-1/2 border border-b-0 border-r-0 border-solid d-theme-border-grey-light"
              >
                <p class="mt-4">Target</p>
                <p class="mb-4 text-3xl font-semibold">
                  {{ ownTargetThisMonth.own_value_target }}
                </p>
              </div>
            </div>
          </vx-card>
        </div>
        <div class="w-full vx-col md:w-1/3 mb-base" v-if="!Personal & !un">
          <vx-card title="Manager Goal">
            <template slot="actions">
              <feather-icon
                icon="UsersIcon"
                svgClasses="w-6 h-6 text-grey"
                @click="setPersonal"
              ></feather-icon>
            </template>
            <template slot="actions">
              <feather-icon
                icon="DollarSignIcon"
                svgClasses="w-6 h-6 text-green"
                @click="setUn"
              ></feather-icon>
            </template>

            <!-- CHART -->
            <template slot="no-body">
              <div class="mt-10">
                <vue-apex-charts
                  type="radialBar"
                  height="240"
                  :options="analyticsData.goalOverviewRadialBar.chartOptions"
                  :series="goalOverviewValueMan.series"
                />
              </div>
            </template>

            <!-- DATA -->
            <div
              class="flex justify-between mt-6 text-center"
              slot="no-body-bottom"
            >
              <div
                class="w-1/2 border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light"
              >
                <p class="mt-4">Value Sold</p>
                <p class="mb-4 text-3xl font-semibold">{{ SalesMonth }}</p>
              </div>
              <div
                class="w-1/2 border border-b-0 border-r-0 border-solid d-theme-border-grey-light"
              >
                <p class="mt-4">Target</p>
                <p class="mb-4 text-3xl font-semibold">
                  {{ ownTargetThisMonth.manager_value_target }}
                </p>
              </div>
            </div>
          </vx-card>
        </div>
      </div>

      <div class="vx-row">
        <div class="w-full vx-col md:w-1/3 lg:w-1/3 xl:w-1/3 mb-base">
          <vx-card title="Position Seen">
            <div
              v-for="(browser, index) in positionsAnalytics"
              :key="browser.id"
              :class="{ 'mt-4': index }"
            >
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <span class="mb-1">{{ browser.name }}</span>
                  <h4>{{ browser.ratio }}%</h4>
                </div>
                <div class="flex flex-col text-right">
                  <span class="flex -mr-1">
                    <span class="mr-1">{{ browser.comparedResult }}</span>
                    <feather-icon
                      :icon="
                        browser.comparedResult < 0
                          ? 'ArrowDownIcon'
                          : 'ArrowUpIcon'
                      "
                      :svgClasses="[
                        browser.comparedResult < 0
                          ? 'text-danger'
                          : 'text-success',
                        'stroke-current h-4 w-4 mb-1 mr-1'
                      ]"
                    ></feather-icon>
                  </span>
                </div>
              </div>
              <vs-progress :percent="browser.ratio"></vs-progress>
            </div>
          </vx-card>
        </div>

        <div class="w-full vx-col md:w-2/3">
          <vx-card title="Sales Conversion">
            <div class="flex">
              <span class="flex items-center"
                ><div class="w-3 h-3 mr-1 rounded-full bg-primary"></div>
                <span>New Invoices</span></span
              >
              <span class="flex items-center ml-4"
                ><div class="w-3 h-3 mr-1 rounded-full bg-danger"></div>
                <span>New Quotes</span></span
              >
            </div>
            <vue-apex-charts
              type="bar"
              height="277"
              :options="analyticsData.clientRetentionBar.chartOptions"
              :series="clientRetentionBar.series"
            />
          </vx-card>
        </div>
      </div>

      <div class="vx-row">
        <!-- CARD 6: Product Orders -->
        <div class="w-full vx-col lg:w-1/3 mb-base">
          <vx-card title="Product Orders">
            <!-- CARD ACTION -->
            <template slot="actions">
              <change-time-duration-dropdown />
            </template>

            <!-- Chart -->
            <div slot="no-body">
              <vue-apex-charts
                type="radialBar"
                height="420"
                :options="analyticsData.productOrdersRadialBar.chartOptions"
                :series="productsOrder.series"
              />
            </div>

            <ul>
              <li
                v-for="orderData in productsOrder.analyticsData"
                :key="orderData.orderType"
                class="flex justify-between mb-3"
              >
                <span class="flex items-center">
                  <span
                    class="inline-block w-4 h-4 mr-2 bg-white border-solid rounded-full border-3"
                    :class="`border-${orderData.color}`"
                  ></span>
                  <span class="font-semibold">{{ orderData.orderType }}</span>
                </span>
                <span>{{ orderData.counts }}</span>
              </li>
            </ul>
          </vx-card>
        </div>

        <!-- CARD 7: Sales Stats -->
        <div class="w-full vx-col lg:w-1/3 mb-base">
          <vx-card title="Sales Stats" subtitle="Last 6 Months">
            <template slot="actions">
              <feather-icon
                icon="MoreVerticalIcon"
                svgClasses="w-6 h-6 text-grey"
              ></feather-icon>
            </template>
            <div class="flex">
              <span class="flex items-center"
                ><div class="w-3 h-3 mr-1 rounded-full bg-primary"></div>
                <span>Sales</span></span
              >
              <span class="flex items-center ml-4"
                ><div class="w-3 h-3 mr-1 rounded-full bg-success"></div>
                <span>Visits</span></span
              >
            </div>
            <div slot="no-body-bottom">
              <vue-apex-charts
                type="radar"
                height="385"
                :options="analyticsData.statisticsRadar.chartOptions"
                :series="salesRadar.series"
              />
            </div>
          </vx-card>
        </div>

        <!-- CARD 8: Activity Timeline -->
        <div class="w-full vx-col lg:w-1/3 mb-base">
          <vx-card title="Activity Timeline">
            <vx-timeline :data="timelineData" />
          </vx-card>
        </div>
      </div>

      <div class="vx-row">
        <!-- Sessions By Device 
            <div class="w-full vx-col lg:w-1/3 lg:mt-0 mt-base">
                <vx-card title="Sessions By Device">
                   
                    <template slot="actions">
                        <change-time-duration-dropdown />
                    </template>

                    <div slot="no-body">
                        <vue-apex-charts class="mt-6 mb-8" type=donut height=325 :options="analyticsData.sessionsByDeviceDonut.chartOptions" :series="sessionsData.series" />
                    </div>

                    <ul class="mt-6">
                        <li v-for="deviceData in sessionsData.analyticsData" :key="deviceData.device" class="flex mb-3">
                            <feather-icon :icon="deviceData.icon" :svgClasses="[`h-5 w-5 stroke-current text-${deviceData.color}`]"></feather-icon>
                            <span class="inline-block ml-2 font-semibold">{{ deviceData.device }}</span>
                            <span class="mx-2">-</span>
                            <span class="mr-4">{{ deviceData.sessionsPercentage }}%</span>
                            <div class="flex ml-auto -mr-1">
                            <span class="mr-1">{{ deviceData.comparedResultPercentage }}%</span>
                            <feather-icon :icon=" deviceData.comparedResultPercentage < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[deviceData.comparedResultPercentage < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>
                            </div>
                        </li>
                    </ul>
                </vx-card>
            </div> -->

        <!-- CHAT CARD 
            <div class="w-full vx-col lg:w-1/3 lg:mt-0 mt-base">
                <vx-card title="Chat" class="overflow-hidden">
                    <template slot="no-body">
                        <div class="chat-card-log">
                            <VuePerfectScrollbar ref="chatLogPS" class="px-6 pt-6 scroll-area" :settings="settings" :key="$vs.rtl">
                                <ul ref="chatLog">
                                        <li class="flex items-start" :class="{'flex-row-reverse': msg.isSent, 'mt-4': index}" v-for="(msg, index) in chatLog" :key="index">
                                            <vs-avatar size="40px" class="flex-shrink-0 m-0" :class="msg.isSent ? 'ml-5' : 'mr-5'" :src="msg.senderImg"></vs-avatar>
                                            <div class="relative max-w-md px-4 py-3 mb-2 bg-white rounded-lg shadow-md msg" :class="{'chat-sent-msg bg-primary-gradient text-white': msg.isSent, 'border border-solid d-theme-border-grey-light': !msg.isSent}">
                                                <span>{{ msg.msg }}</span>
                                            </div>
                                        </li>
                                </ul>
                            </VuePerfectScrollbar>
                        </div>
                        <div class="flex p-6 bg-white chat-input-container">
                            <vs-input class="w-full mr-3" v-model="chatMsgInput" @keyup.enter="chatMsgInput = ''" placeholder="Type Your Message" ></vs-input>
                            <vs-button icon-pack="feather" icon="icon-send" @click="chatMsgInput = ''"></vs-button>
                        </div>
                    </template>
                </vx-card>
            </div> -->

        <!-- CUSTOMERS CHART 
            <div class="w-full vx-col lg:w-1/3 lg:mt-0 mt-base">
                <vx-card title="Customers">
                   
                    <template slot="actions">
                        <change-time-duration-dropdown />
                    </template>

                    <div slot="no-body">
                       
                        <vue-apex-charts type=pie height=345 class="mt-10 mb-10" :options="analyticsData.customersPie.chartOptions" :series="customersData.series" />

                       
                        <ul class="mb-1">
                            <li v-for="customerData in customersData.analyticsData" :key="customerData.customerType" class="flex justify-between px-6 py-3 border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light">
                                <span class="flex items-center">
                                    <span class="inline-block w-3 h-3 mr-2 rounded-full" :class="`bg-${customerData.color}`"></span>
                                    <span class="font-semibold">{{ customerData.customerType }}</span>
                                </span>
                                <span>{{ customerData.counts }}</span>
                            </li>
                        </ul>
                    </div>

                </vx-card>
            </div>-->
      </div>
    </client-only>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/ui-elements/card/statistics_card_line.vue'
import analyticsData from '@/components/ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import VxTimeline from '@/components/charts-and-maps/charts/VxTimeline'
import vSelect from 'vue-select'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import { en, he } from 'vuejs-datepicker/src/locale'

export default {
  components: {
    VueApexCharts,
    StatisticsCardLine,
    ChangeTimeDurationDropdown,
    VxTimeline,
    vSelect,
    Datepicker
  },
  data() {
    return {
      subscribersGained: {},
      revenueGenerated: {},
      quarterlySales: {},
      ordersRecevied: {},
      total: {},
      customers: [],
      targets: [],
      expenses: [],
      Personal: true,
      RevenueMonth: true,
      SeeOver: false,
      DateWatch: false,
      selectSee: '',
      timeSheets: [],
      companymeetings: [],

      oneMonth: moment()
        .subtract(1, 'months')
        .endOf('month')
        .format('LL'),
      twoMonth: moment()
        .subtract(2, 'months')
        .endOf('month')
        .format('LL'),
      threeMonth: moment()
        .subtract(3, 'months')
        .endOf('month')
        .format('LL'),
      fourMonth: moment()
        .subtract(4, 'months')
        .endOf('month')
        .format('LL'),
      fiveMonth: moment()
        .subtract(5, 'months')
        .endOf('month')
        .format('LL'),
      sixMonth: moment()
        .subtract(6, 'months')
        .endOf('month')
        .format('LL'),

      createdMonth: moment().format('MM-YYYY'),
      startDate: '',

      revenueComparisonLine: {},
      un: false,
      goalOverview: {},
      sales: [],
      companies: [],
      products: [],

      browserStatistics: [],
      // clientRetentionBar: {},

      sessionsData: {},
      chatLog: [],
      chatMsgInput: '',
      customersData: {},
      Invoiced: 0,
      myInvoices: this.InvoicesMonth,
      inv: {
        series: [
          {
            name: 'Invoices',
            data: [28, 40, 36, 52, 38, 60, 55]
          }
        ],
        analyticsData: {
          subscribers: this.myInvoices
        }
      },

      analyticsData: analyticsData,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      checkpointReward: {},
      OverseeingGroups: {},

      salesBarSession: {},
      supportTracker: {},

      lat: '',
      lng: '',
      currentSelectedPerson: {},

      timelineData: [
        {
          color: 'primary',
          icon: 'PlusIcon',
          title: 'Client Meeting',
          desc: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
          time: '25 mins Ago'
        },
        {
          color: 'warning',
          icon: 'MailIcon',
          title: 'Email Newsletter',
          desc: 'Cupcake gummi bears soufflé caramels candy',
          time: '15 Days Ago'
        },
        {
          color: 'danger',
          icon: 'UsersIcon',
          title: 'Plan Webinar',
          desc: 'Candy ice cream cake. Halvah gummi bears',
          time: '20 days ago'
        },
        {
          color: 'success',
          icon: 'LayoutIcon',
          title: 'Launch Website',
          desc:
            'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears soufflé caramels candy.',
          time: '25 days ago'
        },
        {
          color: 'primary',
          icon: 'TvIcon',
          title: 'Marketing',
          desc: 'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.',
          time: '28 days ago'
        }
      ],

      dispatchedOrders: [],
      overSeeingDisplayName: []
    }
  },

  watch: {
    startDate: function() {
      this.createdMonth = this.dateSet
    },

    OverseeingGroups: function() {
      let IamOverseeing = [this.userDetails]
      for (let i = 0; i < this.usersData.length; i++) {
        if (
          this.usersData[i].group_branches == this.userDetails.group_branches
        ) {
          for (
            let e = 0;
            e < this.OverseeingGroups.group_overSeeing.length;
            e++
          ) {
            if (
              this.usersData[i].group_positions ==
              this.OverseeingGroups.group_overSeeing[e]
            ) {
              IamOverseeing.push(this.usersData[i])
              this.overSeeingDisplayName.push(this.usersData[i].displayName)
            }
          }
        }
      }
      this.overSeeingDisplayName.push(this.userDetails.displayName)
      this.$store.dispatch('userManagement/IamOverseeing', IamOverseeing)
    },
    selectSee: function() {
      console.log('this.am', this.IamOverseeingthem)
      for (let i = 0; i < this.IamOverseeingthem.length; i++) {
        if (this.selectSee == this.IamOverseeingthem[i].displayName) {
          this.currentSelectedPerson = this.IamOverseeingthem[i]
        }
      }

      this.$store.dispatch(
        'userManagement/currentUser',
        this.currentSelectedPerson
      )
      this.getCurrentSelectedPersondata()
    },
    companies: function() {
      let allCompanies = []
      for (let i = 0; i < this.customers.length; i++) {
        allCompanies.push(this.customers[i])
      }

      for (let i = 0; i < this.companies.length; i++) {
        allCompanies.push(this.companies[i])
      }

      this.$store.dispatch('crm/myCompanies', allCompanies)
    },
    SeeOver: function() {
      this.$store.dispatch(
        'userManagement/currentlyDisplayingUser',
        this.SeeOver
      )
      this.getCurrentSelectedPersondata()
    }
  },
  computed: {
    activeBusinessInfo() {
      return this.$store.state.business.app_active_business
    },
    activeUserInfo() {
      return this.$store.state.user.app_displayed_user
    },
    dateSet() {
      return moment(this.startDate).format('MM-YYYY')
    },
    ownTargets() {
      return 0
    },
    currentlyDisplayingUser() {
      return this.$store.getters['userManagement/currentlyDisplayingUser']
    },
    currentDisplayUser() {
      return this.$store.getters['userManagement/currentDisplayUser']
    },
    ownTargetThisMonth() {
      let Month = {
        own_unit_target: 0,
        own_value_target: 0,
        manager_unit_target: 0,
        manager_value_target: 0
      }
      for (let i = 0; i < this.targets.length; i++) {
        if (this.targets[i].month == this.createdMonth) {
          Month = {
            own_unit_target: this.targets[i].own_unit_target,
            own_value_target: this.targets[i].own_value_target,
            manager_unit_target: this.targets[i].manager_unit_target,
            manager_value_target: this.targets[i].manager_value_target
          }
        }
      }

      return Month
    },
    goalOverviewUnits() {
      return {
        analyticsData: {
          completed: 786617,
          inProgress: 13561
        },
        series: [
          (
            (this.UnitsMonth / this.ownTargetThisMonth.own_unit_target) *
            100
          ).toFixed(1)
        ]
      }
    },
    goalOverviewValue() {
      return {
        analyticsData: {
          completed: 786617,
          inProgress: 13561
        },
        series: [
          (
            (this.SalesMonth / this.ownTargetThisMonth.own_value_target) *
            100
          ).toFixed(1)
        ]
      }
    },
    goalOverviewUnitsMan() {
      return {
        analyticsData: {
          completed: 786617,
          inProgress: 13561
        },
        series: [
          (
            (this.UnitsMonth / this.ownTargetThisMonth.manager_unit_target) *
            100
          ).toFixed(1)
        ]
      }
    },
    goalOverviewValueMan() {
      return {
        analyticsData: {
          completed: 786617,
          inProgress: 13561
        },
        series: [
          (
            (this.SalesMonth / this.ownTargetThisMonth.manager_value_target) *
            100
          ).toFixed(1)
        ]
      }
    },
    revenueComparisonLineMonth() {
      return {
        analyticsData: {
          thisMonth: this.SalesMonth,
          lastMonth: this.SalesPrevMonth,
          lastTwoMonth: this.SalesPrevTwoMonth,
          lastThreeMonth: this.SalesPrevThreeMonth,
          lastFourMonth: this.SalesPrevFourMonth,
          lastFiveMonth: this.SalesPrevFiveMonth,
          lastSixMonth: this.SalesPrevSixMonth
        },
        series: [
          {
            name: 'This Month',
            data: this.SalesMonthData
          },
          {
            name: 'Last Month',
            data: this.SalesPrevMonthData
          },
          {
            name: this.twoMonth,
            data: this.SalesPrevTwoMonthData
          },
          {
            name: this.threeMonth,
            data: this.SalesPrevThreeMonthData
          },
          {
            name: this.fourMonth,
            data: this.SalesPrevFourMonthData
          },
          {
            name: this.fiveMonth,
            data: this.SalesPrevFiveMonthData
          },
          {
            name: this.sixMonth,
            data: this.SalesPrevSixMonthData
          }
        ]
      }
    },
    CompaniesMonth() {
      let companies = 0

      for (let i = 0; i < this.companies.length; i++) {
        if (this.companies[i].created_month == this.createdMonth) {
          companies = companies + 1
        }
      }

      return companies
    },
    CompaniesMonthData() {
      let mycompanies = []
      let companies = 0
      for (let i = 0; i < this.companies.length; i++) {
        if (this.companies[i].created_month == this.createdMonth) {
          companies = companies + 1
          mycompanies.push(companies)
        }
      }

      return mycompanies
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
      let myassets = []
      let assets = this.total.ass_val
      // let assets = 0
      // for (let i = 0; i < this.products.length; i++) {
      //   if (this.products[i].created_month == this.createdMonth) {
      //     assets = assets + this.products[i].stock * this.products[i].price
      //     myassets.push(this.products[i].stock * this.products[i].price)
      //   }
      // }
      return assets
    },
    AssetsMonthData() {
      let myassets = this.total.ass_data
      // let myassets = []
      // let assets = 0
      // for (let i = 0; i < this.products.length; i++) {
      //   if (this.products[i].created_month == this.createdMonth) {
      //     assets = assets + this.products[i].stock * this.products[i].price
      //     myassets.push(this.products[i].stock * this.products[i].price)
      //   }
      // }

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
      let liabilites = this.total.liab_val
      // let myliabilities = []
      // let liabilites = 0
      // for (let i = 0; i < this.products.length; i++) {
      //   if (this.products[i].created_month == this.createdMonth) {
      //     liabilites = liabilites + this.products[i].stock * this.products[i].price
      //     myliabilities.push(this.products[i].stock * this.products[i].price)
      //   }
      // }
      return liabilites
    },
    liabilitiesMonthData() {
      let myliabilities = this.total.liab_data
      // let liabilites = 0
      // for (let i = 0; i < this.products.length; i++) {
      //   if (this.products[i].created_month == this.createdMonth) {
      //     liabilites = liabilites + this.products[i].stock * this.products[i].price
      //     myliabilities.push(liabilites)
      //   }
      // }

      return myliabilities
    },
    CompaniesData() {
      return {
        series: [
          {
            name: 'Companies',
            data: this.CompaniesMonthData
          }
        ],
        analyticsData: {
          revenue: this.CompaniesMonth
        }
      }
    },
    CustomersMonth() {
      let companies = 0
      for (let i = 0; i < this.customers.length; i++) {
        if (this.customers[i].created_month == this.createdMonth) {
          companies = companies + 1
        }
      }

      return companies
    },
    CustomersMonthData() {
      let mycompanies = []
      let companies = 0
      for (let i = 0; i < this.customers.length; i++) {
        if (this.customers[i].created_month == this.createdMonth) {
          companies = companies + 1
          mycompanies.push(companies)
        }
      }

      return mycompanies
    },
    CustomersData() {
      return {
        series: [
          {
            name: 'Customers',
            data: this.CustomersMonthData
          }
        ],
        analyticsData: {
          revenue: this.CustomersMonth
        }
      }
    },
    ExpensesMonth() {
      let expenses = 0

      for (let i = 0; i < this.expenses.length; i++) {
        if (this.expenses[i].created_month == this.createdMonth) {
          expenses = expenses + Number(this.expenses[i].totalExpense)
        }
      }

      return expenses
    },
    ExpensesMonthData() {
      let myexpenses = []
      let expenses = 0
      for (let i = 0; i < this.expenses.length; i++) {
        if (this.expenses[i].created_month == this.createdMonth) {
          expenses = expenses + Number(this.expenses[i].totalExpense)
          myexpenses.push(Number(this.expenses[i].totalExpense))
        }
      }

      return myexpenses
    },
    ExpensesData() {
      return {
        series: [
          {
            name: 'Expenses',
            data: this.ExpensesMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.ExpensesMonth}`
        }
      }
    },

    RunningExpensesMonth() {
      let expenses = 0

      for (let i = 0; i < this.expenses.length; i++) {
        if (
          this.expenses[i].created_month == this.createdMonth &&
          this.expenses[i].type == 'Operating Expense'
        ) {
          expenses = expenses + Number(this.expenses[i].totalExpense)
        }
      }

      return expenses
    },
    RunningExpensesMonthData() {
      let myexpenses = []
      let expenses = 0
      for (let i = 0; i < this.expenses.length; i++) {
        if (
          this.expenses[i].created_month == this.createdMonth &&
          this.expenses[i].type == 'Operating Expense'
        ) {
          expenses = expenses + Number(this.expenses[i].totalExpense)
          myexpenses.push(Number(this.expenses[i].totalExpense))
        }
      }

      return myexpenses
    },
    RunningExpensesData() {
      return {
        series: [
          {
            name: 'Expenses',
            data: this.RunningExpensesMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.RunningExpensesMonth}`
        }
      }
    },

    InvoicesMonth() {
      let invoices = 0
      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].stage == 'Payment') {
          invoices = invoices + 1
        }
      }

      return invoices
    },
    InvoicesMonthData() {
      let myInvoices = []
      let invoices = 0
      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].stage == 'Payment') {
          invoices = invoices + 1
          myInvoices.push(invoices)
        }
      }
      return myInvoices
    },
    invs() {
      return {
        series: [
          {
            name: 'Invoices',
            data: this.InvoicesMonthData
          }
        ],
        analyticsData: {
          subscribers: this.InvoicesMonth
        }
      }
    },
    QuotesMonth() {
      let invoices = 0
      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].stage == 'Quote') {
          invoices = invoices + 1
        }
      }

      return invoices
    },
    QuotesMonthData() {
      let myInvoices = []
      let invoices = 0
      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].stage == 'Quote') {
          invoices = invoices + 1
          myInvoices.push(invoices)
        }
      }
      return myInvoices
    },
    quotes() {
      return {
        series: [
          {
            name: 'Quotes',
            data: this.QuotesMonthData
          }
        ],
        analyticsData: {
          subscribers: this.QuotesMonth
        }
      }
    },

    meetingsMonth() {
      let invoices = 0
      for (let i = 0; i < this.companymeetings.length; i++) {
        if (this.companymeetings[i].created_month == this.createdMonth) {
          invoices = invoices + 1
        }
      }

      return invoices
    },
    meetingsMonthData() {
      let myInvoices = []
      let invoices = 0
      for (let i = 0; i < this.companymeetings.length; i++) {
        if (this.companymeetings[i].created_month == this.createdMonth) {
          invoices = invoices + 1
          myInvoices.push(invoices)
        }
      }
      return myInvoices
    },
    meetings() {
      return {
        series: [
          {
            name: 'Meetings',
            data: this.meetingsMonthData
          }
        ],
        analyticsData: {
          subscribers: this.meetingsMonth
        }
      }
    },
    positionsSeen() {
      let positions = {
        Total: 0,
        Individual: 0
      }
      for (let i = 0; i < this.companymeetings.length; i++) {
        if (this.companymeetings[i].created_month == this.createdMonth) {
          if (this.companymeetings[i].customers) {
            let cust = this.companymeetings[i].customers

            for (let e = 0; e < cust.length; e++) {
              let name = cust[e].position
              let number
              if (positions[cust[e].position] == undefined) {
                number = 0
              } else {
                number = positions[cust[e].position]
              }

              positions[name] = number + 1
              positions.Total = positions.Total + 1
            }
          } else {
            positions.Individual = positions.Individual + 1
            positions.Total = positions.Total + 1
          }
        }
      }

      return positions
    },
    positionsAnalytics() {
      let myPositionsSeen = []

      let myObj = Object.entries(this.positionsSeen)
      for (let i = 0; i < myObj.length; i++) {
        let ratio = (myObj[i][1] / myObj[0][1]) * 100

        myPositionsSeen.push({
          id: i,
          name: myObj[i][0],
          ratio: Number(ratio.toFixed(2)),
          time: new Date(),
          comparedResult: myObj[0][1]
        })
      }
      return myPositionsSeen
    },

    UnitsMonth() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        let price
        if (this.sales[i].totalQuantity == undefined) {
          price = 0
        } else {
          price = this.sales[i].totalQuantity
        }
        sales = sales + price
      }
      return sales
    },
    UnitsMonthData() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        let price
        if (this.sales[i].totalQuantity == undefined) {
          price = 0
        } else {
          price = this.sales[i].totalQuantity
        }

        sales = sales + price
        mySales.push(sales)
      }

      return mySales
    },
    unitsData() {
      return {
        series: [
          {
            name: 'Invoices',
            data: this.UnitsMonthData
          }
        ],
        analyticsData: {
          revenue: this.UnitsMonth
        }
      }
    },
    SalesMonth() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].created_month == this.createdMonth) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }
          sales = sales + price
        }
      }

      return sales
    },
    SalesMonthData() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].created_month == this.createdMonth) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }

          sales = sales + price
          mySales.push(sales)
        }
      }
      return mySales
    },
    salesData() {
      return {
        series: [
          {
            name: 'Sales',
            data: this.SalesMonthData
          }
        ],
        analyticsData: {
          revenue: this.SalesMonth
        }
      }
    },
    SalesPrevMonth() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(1, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }
          sales = sales + price
        }
      }

      return sales
    },
    SalesPrevMonthData() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(1, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }

          sales = sales + price
          mySales.push(sales)
        }
      }

      return mySales
    },

    SalesPrevTwoMonth() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(2, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }
          sales = sales + price
        }
      }

      return sales
    },
    SalesPrevTwoMonthData() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(2, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }

          sales = sales + price
          mySales.push(sales)
        }
      }

      return mySales
    },

    SalesPrevThreeMonth() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(3, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }
          sales = sales + price
        }
      }

      return sales
    },
    SalesPrevThreeMonthData() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(3, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }

          sales = sales + price
          mySales.push(sales)
        }
      }

      return mySales
    },
    SalesPrevFourMonth() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(4, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }
          sales = sales + price
        }
      }

      return sales
    },
    SalesPrevFourMonthData() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(4, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }

          sales = sales + price
          mySales.push(sales)
        }
      }

      return mySales
    },
    SalesPrevFiveMonth() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(5, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }
          sales = sales + price
        }
      }

      return sales
    },
    SalesPrevFiveMonthData() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(5, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }

          sales = sales + price
          mySales.push(sales)
        }
      }

      return mySales
    },
    SalesPrevSixMonth() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(6, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }
          sales = sales + price
        }
      }

      return sales
    },
    SalesPrevSixMonthData() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        var dateFrom = moment()
          .subtract(6, 'months')
          .endOf('month')
          .format('MM-YYYY')
        if (this.sales[i].created_month == dateFrom) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }

          sales = sales + price
          mySales.push(sales)
        }
      }

      return mySales
    },
    SalesMonth() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        console.log('sales', this.sales[i])

        let price
        let cost
        if (this.sales[i].totalProfit == undefined) {
          price = 0
        } else {
          price = this.sales[i].totalProfit
        }
        sales = sales + price
      }

      return sales
    },
    SalesMonthData() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        let price
        if (this.sales[i].totalProfit == undefined) {
          price = 0
        } else {
          price = this.sales[i].totalProfit
        }

        sales = sales + price
        mySales.push(this.sales[i].totalProfit)
      }

      return mySales
    },
    salesDatass() {
      return {
        series: [
          {
            name: 'Sales',
            data: this.SalesMonthData
          }
        ],
        analyticsData: {
          revenue: `R ${this.SalesMonth}`
        }
      }
    },
    ///January
    SalesMonthJan() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        console.log(this.sales[i])

        let price
        if (this.sales[i].totalPrice == undefined) {
          price = 0
        } else {
          price = this.sales[i].totalPrice
        }
        sales = sales + price
      }

      return sales
    },
    SalesMonthDataJan() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        let price
        if (this.sales[i].totalPrice == undefined) {
          price = 0
        } else {
          price = this.sales[i].totalPrice
        }

        sales = sales + price
        mySales.push(sales)
      }

      return mySales
    },
    salesDataJan() {
      return {
        series: [
          {
            name: 'Sales',
            data: this.SalesMonthData
          }
        ],
        analyticsData: {
          revenue: this.SalesMonth
        }
      }
    },

    //February
    SalesMonthFeb() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        console.log(this.sales[i])

        if (this.sales[i].created_month == `02-` + moment().format('YYYY')) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }
          sales = sales + price
        }
      }

      return sales
    },
    SalesMonthDataFeb() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].created_month == `02-` + moment().format('YYYY')) {
          let price
          if (this.sales[i].totalPrice == undefined) {
            price = 0
          } else {
            price = this.sales[i].totalPrice
          }

          sales = sales + price
          mySales.push(sales)
        }
      }

      return mySales
    },
    salesDataFeb() {
      return {
        series: [
          {
            name: 'Sales',
            data: this.SalesMonthDataFeb
          }
        ],
        analyticsData: {
          revenue: this.SalesMonthFeb
        }
      }
    },
    ownTargetsFeb() {
      return 0
    },
    ownTargetThisMonthFeb() {
      let Month = {
        own_unit_target: 0,
        own_value_target: 0,
        manager_unit_target: 0,
        manager_value_target: 0
      }
      for (let i = 0; i < this.targets.length; i++) {
        if (this.targets[i].month == `01-` + moment().format('MM-YYYY')) {
          Month = {
            own_unit_target: this.targets[i].own_unit_target,
            own_value_target: this.targets[i].own_value_target,
            manager_unit_target: this.targets[i].manager_unit_target,
            manager_value_target: this.targets[i].manager_value_target
          }
        }
      }

      return Month
    },
    goalOverviewUnitsFeb() {
      return {
        analyticsData: {
          completed: 786617,
          inProgress: 13561
        },
        series: [
          (
            (this.UnitsMonth / this.ownTargetThisMonth.own_unit_target) *
            100
          ).toFixed(1)
        ]
      }
    },
    goalOverviewValueFeb() {
      return {
        analyticsData: {
          completed: 786617,
          inProgress: 13561
        },
        series: [
          (
            (this.SalesMonth / this.ownTargetThisMonth.own_value_target) *
            100
          ).toFixed(1)
        ]
      }
    },

    InvoicesMonthFeb() {
      let invoices = 0
      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].stage == 'Invoiced') {
          invoices = invoices + 1
        }
      }

      return invoices
    },
    InvoicesMonthDataFeb() {
      let myInvoices = []
      let invoices = 0
      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].stage == 'Invoiced') {
          invoices = invoices + 1
          myInvoices.push(invoices)
        }
      }

      return myInvoices
    },
    invsFeb() {
      return {
        series: [
          {
            name: 'Invoices',
            data: this.InvoicesMonthData
          }
        ],
        analyticsData: {
          subscribers: this.InvoicesMonth
        }
      }
    },
    UnitsMonthFeb() {
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        console.log(this.sales[i])

        let price
        if (this.sales[i].totalQuantity == undefined) {
          price = 0
        } else {
          price = this.sales[i].totalQuantity
        }
        sales = sales + price
      }

      return sales
    },
    UnitsMonthDataFeb() {
      let mySales = []
      let sales = 0
      for (let i = 0; i < this.sales.length; i++) {
        let price
        if (this.sales[i].totalQuantity == undefined) {
          price = 0
        } else {
          price = this.sales[i].totalQuantity
        }

        sales = sales + price
        mySales.push(sales)
      }

      return mySales
    },
    unitsDataFeb() {
      return {
        series: [
          {
            name: 'Invoices',
            data: this.UnitsMonthData
          }
        ],
        analyticsData: {
          revenue: this.UnitsMonth
        }
      }
    },
    productsOrder() {
      let totalQuote = 0
      let totalPaid = 0
      let totalView = 0

      let created_month = moment().format('MM-YYYY')

      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].stage == 'Quote') {
          totalQuote -= 1
        } else if (this.sales[i].stage == 'Payment') {
          totalPaid += 1
        } else {
          totalView += 1
        }
      }
      return {
        series: [
          {
            name: 'Paid Clients',
            data: [0, 0, 0, 0, totalPaid, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: 'Quoted Clients',
            data: [-0, -0, -0, -0, totalQuote, -0, -0, -0, -0, -0, -0, -0]
          }
        ]
      }
    },
    salesRadar() {
      let totalQuote = 0
      let totalPaid = 0
      let totalView = 0

      let created_month = moment().format('MM-YYYY')

      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].stage == 'Quote') {
          totalQuote -= 1
        } else if (this.sales[i].stage == 'Payment') {
          totalPaid += 1
        } else {
          totalView += 1
        }
      }
      return {
        series: [
          {
            name: 'Paid Clients',
            data: [0, 0, 0, 0, totalPaid, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: 'Quoted Clients',
            data: [-0, -0, -0, -0, totalQuote, -0, -0, -0, -0, -0, -0, -0]
          }
        ]
      }
    },
    clientRetentionBar() {
      let totalQuote = 0
      let totalPaid = 0
      let totalView = 0

      let created_month = moment().format('MM-YYYY')

      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].stage == 'Quote') {
          totalQuote -= 1
        } else if (this.sales[i].stage == 'Payment') {
          totalPaid += 1
        } else {
          totalView += 1
        }
      }
      return {
        series: [
          {
            name: 'Paid Clients',
            data: [0, 0, 0, 0, totalPaid, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: 'Quoted Clients',
            data: [-0, -0, -0, -0, totalQuote, -0, -0, -0, -0, -0, -0, -0]
          }
        ]
      }
    }

    // myComponents() {
    //   return this.$store.getters['feature/mycomponents']
    // },
    // userDetails() {
    //   return this.$store.getters['userManagement/userDetails']
    // },
    // companyDetails() {
    //   return this.$store.getters['app/companyDetails']
    // },
    // routeName() {
    //   return this.$store.getters['route/routeName']
    // },
    // resellerName() {
    //   return this.$store.getters['app/resellerName']
    // },
    // IamOverseeingthem() {
    //   return this.$store.getters['userManagement/IamOverseeing']
    // },
    // usersData() {
    //   return this.$store.state.userManagement.users
    // }
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
  methods: {
    getCurrentSelectedPersondata() {
      //   let myUserID
      //   if (this.SeeOver) {
      //     myUserID = this.currentSelectedPerson.id
      //   } else {
      //     myUserID = this.userDetails.id
      //   }
      //   let expenses = []
      //   let myExpenses = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('crm')
      //     .doc('crm')
      //     .collection('expenses')
      //     .where('uid', '==', myUserID)
      //   myExpenses.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       let doc = change.doc
      //       expenses.push({
      //               id: doc.id,
      //       created_date: doc.data().created_date,
      //       uid: doc.data().uid,
      //        name: doc.data().name,
      //       title: doc.data().name,
      //       category: doc.data().category,
      //       description: doc.data().html,
      //       //  branch: this.formData.branch,
      //       price: doc.data().price,
      //       stock: doc.data().stock,
      //       ctc: doc.data().ctc,
      //       vat: doc.data().vat,
      //       docRef: doc.data().id,
      //       totalExpense: doc.data().totalExpense,
      //        totalStock: doc.data().totalStock,
      //         type: doc.data().type,
      //         totalVat: doc.data().totalVat,
      //       receipt: doc.data().receipt,
      //       created_date: moment().format("DD-MM-YYYY"),
      //       created_month: moment().format("MM-YYYY"),
      //       timestamp: Date.now()
      //       })
      //     })
      //   })
      //   this.expenses = expenses
      //    let products = []
      //   let myProducts = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('crm')
      //     .doc('crm')
      //     .collection('physical')
      //   myProducts.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       let doc = change.doc
      //       products.push({
      //               id: doc.id,
      //       created_date: doc.data().created_date,
      //       uid: doc.data().uid,
      //        name: doc.data().name,
      //       title: doc.data().name,
      //       category: doc.data().category,
      //       description: doc.data().html,
      //       //  branch: this.formData.branch,
      //       price: doc.data().price,
      //       stock: doc.data().stock,
      //       ctc: doc.data().ctc,
      //       vat: doc.data().vat,
      //       docRef: doc.data().id,
      //       created_date: moment().format("DD-MM-YYYY"),
      //       created_month: moment().format("MM-YYYY"),
      //       timestamp: Date.now()
      //       })
      //     })
      //   })
      //   this.products = products
      //   let targets = []
      //   let ref = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('users')
      //     .doc(myUserID)
      //     .collection('targets')
      //   ref.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       let doc = change.doc
      //       targets.push({
      //         id: doc.id,
      //         own_unit_target: doc.data().own_unit_target,
      //         own_value_target: doc.data().own_value_target,
      //         manager_unit_target: doc.data().manager_unit_target,
      //         manager_value_target: doc.data().manager_value_target,
      //         month: doc.data().month,
      //         created_date: doc.data().created_date,
      //         created_month: doc.data().created_month,
      //         timestamp: doc.data().timestamp
      //       })
      //     })
      //   })
      //   this.targets = targets
      //   let timeSheets = []
      //   this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('users')
      //     .doc(myUserID)
      //     .collection('timesheet')
      //     .orderBy('timestamp', 'desc')
      //     .limit(1)
      //     .onSnapshot(snapshot => {
      //       snapshot.docChanges().forEach(change => {
      //         let doc = change.doc
      //         timeSheets.push({
      //           id: doc.id,
      //           startGeolocation: doc.data().startGeolocation,
      //           startTime: doc.data().startTime,
      //           startDate: doc.data().startDate,
      //           endGeolocation: doc.data().endGeolocation,
      //           endTime: doc.data().endTime,
      //           endDate: doc.data().endDate,
      //           created_date: doc.data().created_date,
      //           created_month: doc.data().created_month,
      //           timestamp: doc.data().timestamp
      //         })
      //       })
      //     })
      //   this.timeSheets = timeSheets
      //   let companymeetings = []
      //   let docMeetings
      //   docMeetings = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('crm')
      //     .doc('crm')
      //     .collection('customer-ind')
      //     .doc('customermeetings')
      //     .collection('customermeetings')
      //     .where('uid', '==', myUserID)
      //   docMeetings.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       if (change.type == 'added') {
      //         let doc = change.doc
      //         this.companymeetings.push({
      //           id: doc.id,
      //           name: doc.data().user_name,
      //           surname: doc.data().user_surname,
      //           displayName: doc.data().user_displayName,
      //           date: doc.data().date,
      //           startTime: moment(doc.data().startTime).format('llll'),
      //           endTime: moment(doc.data().endTime).format('llll'),
      //           time: doc.data().time,
      //           details: doc.data().details,
      //           seconds: doc.data().seconds,
      //           minutes: doc.data().minutes,
      //           hours: doc.data().hours,
      //           customer_name: doc.data().name,
      //           customer_surname: doc.data().surname,
      //           geolocation: doc.data().geolocation,
      //           signature: doc.data().signature,
      //           signatureClient: doc.data().signatureClient,
      //           created_date: doc.data().created_date,
      //           created_month: doc.data().created_month,
      //           timestamp: moment(doc.data().timestamp).format('ll')
      //         })
      //       }
      //     })
      //   })
      //   let docMeetingsComp
      //   docMeetingsComp = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('crm')
      //     .doc('crm')
      //     .collection('companies')
      //     .doc('customermeetings')
      //     .collection('customermeetings')
      //     .where('uid', '==', myUserID)
      //   docMeetingsComp.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       if (change.type == 'added') {
      //         let doc = change.doc
      //         this.companymeetings.push({
      //           id: doc.id,
      //           name: doc.data().user_name,
      //           surname: doc.data().user_surname,
      //           displayName: doc.data().user_displayName,
      //           date: doc.data().date,
      //           startTime: moment(doc.data().startTime).format('llll'),
      //           endTime: moment(doc.data().endTime).format('llll'),
      //           time: doc.data().time,
      //           details: doc.data().details,
      //           seconds: doc.data().seconds,
      //           minutes: doc.data().minutes,
      //           hours: doc.data().hours,
      //           customers: doc.data().customers,
      //           geolocation: doc.data().geolocation,
      //           signature: doc.data().signature,
      //           created_date: doc.data().created_date,
      //           created_month: doc.data().created_month,
      //           timestamp: moment(doc.data().timestamp).format('ll')
      //         })
      //       }
      //     })
      //   })
      //   console.log('companymeetings', companymeetings)
      //   this.companymeetings = companymeetings
      //   let sales = []
      //   let docR
      //   docR = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('crm')
      //     .doc('crm')
      //     .collection('sales')
      //     // .where('user_uid', '==', myUserID)
      //   docR.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       let doc = change.doc
      //       sales.push({
      //         id: doc.id,
      //         client_id: doc.data().client_id,
      //         client_displayname: doc.data().client_displayname,
      //         client_email: doc.data().client_email,
      //         client_phone: doc.data().client_phone,
      //         client_formatted_address: doc.data().client_formatted_address,
      //         user_uid: doc.data().user_uid,
      //         user_displayname: doc.data().user_displayname,
      //         user_email: doc.data().user_email,
      //         companyDetails: doc.data().companyDetails,
      //         ItemsAdd: doc.data().ItemsAdd,
      //         totalPrice: doc.data().totalPrice,
      //         totalQuantity: doc.data().totalQuantity,
      //         stage: doc.data().stage,
      //         invoiced_date: doc.data().invoiced_date,
      //         invoiced_month: doc.data().invoiced_month,
      //         created_date: doc.data().created_date,
      //         created_month: doc.data().created_month,
      //         timestamp: doc.data().timestamp
      //       })
      //     })
      //   })
      //   this.sales = sales
      //   let customers = []
      //   let docI = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('crm')
      //     .doc('crm')
      //     .collection('customer-ind')
      //     .where('uid', '==', myUserID)
      //   docI.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       let doc = change.doc
      //       customers.push({
      //         id: doc.id,
      //         uid: doc.data().uid,
      //         user_displayName: doc.data().user_displayName,
      //         user_name: doc.data().user_name,
      //         user_surname: doc.data().user_surname,
      //         name: doc.data().name,
      //         surname: doc.data().surname,
      //         clientDisplayname: `${doc.data().name} ${doc.data().surname}`,
      //         email: doc.data().email,
      //         formatted_address: doc.data().formatted_address,
      //         adr_address: doc.data().adr_address,
      //         phone: doc.data().phone,
      //         description: doc.data().description,
      //         created_date: doc.data().created_date,
      //         created_month: doc.data().created_month,
      //         timestamp: doc.data().timestamp
      //       })
      //     })
      //   })
      //   this.customers = customers
      //   let companies = []
      //   let docC = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('crm')
      //     .doc('crm')
      //     .collection('companies')
      //     .where('uid', '==', myUserID)
      //   docC.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       let doc = change.doc
      //       companies.push({
      //         id: doc.id,
      //         created_date: doc.data().created_date,
      //         created_month: doc.data().created_month,
      //         timestamp: doc.data().timestamp,
      //         uid: doc.data().uid,
      //         displayName: doc.data().user_displayName,
      //         clientDisplayname: doc.data().companyDisplayname,
      //         name: doc.data().user_name,
      //         surname: doc.data().user_surname,
      //         company: doc.data().company,
      //         companyDisplayname: doc.data().companyDisplayname,
      //         sources: doc.data().sources,
      //         ratings: doc.data().ratings,
      //         email: doc.data().email,
      //         formatted_address: doc.data().formatted_address,
      //         adr_address: doc.data().adr_address,
      //         phone: doc.data().phone,
      //         website: doc.data().website
      //       })
      //     })
      //   })
      //   this.companies = companies
      //   // this.$store.dispatch("crm/myCompanies", this.companies);
      //   // let allCompanies = []
      //   //   allCompanies.push(this.customers)
      //   //   allCompanies.push(this.companies)
      //   // this.$store.dispatch("crm/myCompanies", allCompanies);
    },
    successDayStart() {
      //   this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('users')
      //     .doc(this.userDetails.id)
      //     .collection('timesheet')
      //     .orderBy('timestamp', 'desc')
      //     .limit(1)
      //     .onSnapshot(snapshot => {
      //       snapshot.docChanges().forEach(change => {
      //         let doc = change.doc
      //         this.timeSheets.push({
      //           id: doc.id,
      //           startGeolocation: doc.data().startGeolocation,
      //           startTime: doc.data().startTime,
      //           startDate: doc.data().startDate,
      //           endGeolocation: doc.data().endGeolocation,
      //           endTime: doc.data().endTime,
      //           endDate: doc.data().endDate,
      //           created_date: doc.data().created_date,
      //           created_month: doc.data().created_month,
      //           timestamp: doc.data().timestamp
      //         })
      //       })
      //     })
      //   this.$vs.notify({
      //     color: 'success',
      //     title: 'Day Starting!',
      //     text: 'Have a great day'
      //   })
    },
    successDayEnd() {
      //   this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('users')
      //     .doc(this.userDetails.id)
      //     .collection('timesheet')
      //     .orderBy('timestamp', 'desc')
      //     .limit(1)
      //     .onSnapshot(snapshot => {
      //       snapshot.docChanges().forEach(change => {
      //         let doc = change.doc
      //         this.timeSheets.push({
      //           id: doc.id,
      //           startGeolocation: doc.data().startGeolocation,
      //           startTime: doc.data().startTime,
      //           startDate: doc.data().startDate,
      //           endGeolocation: doc.data().endGeolocation,
      //           endTime: doc.data().endTime,
      //           endDate: doc.data().endDate,
      //           created_date: doc.data().created_date,
      //           created_month: doc.data().created_month,
      //           timestamp: doc.data().timestamp
      //         })
      //       })
      //     })
      //   this.$vs.notify({
      //     color: 'success',
      //     title: 'Day Ending',
      //     text: 'Time to relax'
      //   })
    },
    setStartDay() {
      //   let vm = this
      //   let date = moment().format('DD-MM-YYYY')
      //   let time = moment().format('HH:mm')
      //   this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('users')
      //     .doc(this.userDetails.id)
      //     .collection('timesheet')
      //     .add({
      //       startGeolocation: {
      //         lat: this.lat,
      //         lng: this.lng
      //       },
      //       startTime: time,
      //       date: date,
      //       created_date: moment().format('DD-MM-YYYY'),
      //       created_month: moment().format('MM-YYYY'),
      //       timestamp: Date.now()
      //     })
      //     .then(function() {
      //       vm.successDayStart()
      //     })
      //     .catch(function(error) {
      //       console.log('error', error)
      //       // vm.noSuccessUpload(error);
      //     })
    },
    setEndDay() {
      //   let vm = this
      //   let date = moment().format('DD-MM-YYYY')
      //   let time = moment().format('HH:mm')
      //   this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('users')
      //     .doc(this.userDetails.id)
      //     .collection('timesheet')
      //     .doc(this.timeSheets[0].id)
      //     .update({
      //       endGeolocation: {
      //         lat: this.lat,
      //         lng: this.lng
      //       },
      //       endTime: time,
      //       endDate: date,
      //       timestamp: Date.now()
      //     })
      //     .then(function() {
      //       vm.successDayEnd()
      //     })
      //     .catch(function(error) {
      //       console.log('error', error)
      //       // vm.noSuccessUpload(error);
      //     })
    },
    setSeeOver() {
      this.SeeOver = !this.SeeOver
    },
    setDateWatch() {
      this.DateWatch = !this.DateWatch
    },
    setPersonal() {
      this.Personal = !this.Personal
    },
    setUn() {
      this.un = !this.un
    },
    setRevenueMonth() {
      this.RevenueMonth = !this.RevenueMonth
    }
  },
  mounted() {
    if (process.client) {
      //   console.log('this.res', this.resellerName, this.companyDetails.id)
      //   console.log('this.res', this.userDetails.id)
      //   let ref = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection("users")
      //     .doc(this.userDetails.id)
      //     .collection("targets");
      //   ref.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       let doc = change.doc;
      //       this.targets.push({
      //         id: doc.id,
      //         own_unit_target: doc.data().own_unit_target,
      //         own_value_target: doc.data().own_value_target,
      //         manager_unit_target: doc.data().manager_unit_target,
      //         manager_value_target: doc.data().manager_value_target,
      //         month: doc.data().month,
      //         created_date: doc.data().created_date,
      //         created_month: doc.data().created_month,
      //         timestamp: doc.data().timestamp
      //       });
      //     });
      //   });
      //   if (this.userDetails.group_positions) {
      //     this.$fireStore
      //       .collection('all')
      //       .doc('apps')
      //       .collection('apps')
      //       .doc(this.companyDetails.id)
      //       .collection('group_position')
      //       .doc(this.userDetails.group_positions)
      //       .get()
      //       .then(doc => {
      //         if (!doc.exists) {
      //           console.log('No such document!')
      //         } else {
      //           this.OverseeingGroups = doc.data()
      //           this.$store.dispatch('userManagement/overSeeing', doc.data())
      //         }
      //       })
      //       .catch(err => {
      //         console.log('Error getting document', err)
      //       })
      //     this.getCurrentSelectedPersondata()
      //   }
    }
  },
  created() {
    this.$store.commit('crm/SET_COMPANY', null)
    let currentUser = this.activeUserInfo
    let currentBusiness = this.activeBusinessInfo

    let vm = this
    if (process.client) {
      vm.$fireStore
        .collection('apps')
        .doc('users')
        .collection(currentBusiness.b_uid)
        .doc('info')
        .collection('general')
        .doc(currentUser.uid)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            vm.$store.dispatch('user/updateUserInfo', doc.data())
            vm.$store.commit('user/APP_DISPLAYED_USER', doc.data())
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })

      vm.$fireStore
        .collection('apps')
        .doc('crm')
        .collection(currentBusiness.b_uid)
        .doc('stats')
        .collection('total')
        .doc('total')
        .get()
        .then(function(doc) {
          if (doc.exists) {
            vm.total = doc.data()
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
      //   this.startDate = new Date()
      //   navigator.geolocation.getCurrentPosition(pos => {
      //     this.lat = pos.coords.latitude
      //     this.lng = pos.coords.longitude
      //   })
      //   this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.id)
      //     .collection('users')
      //     .doc(this.userDetails.id)
      //     .collection('timesheet')
      //     .orderBy('timestamp', 'desc')
      //     .limit(1)
      //     .onSnapshot(snapshot => {
      //       snapshot.docChanges().forEach(change => {
      //         let doc = change.doc
      //         this.timeSheets.push({
      //           id: doc.id,
      //           startGeolocation: doc.data().startGeolocation,
      //           startTime: doc.data().startTime,
      //           startDate: doc.data().startDate,
      //           endGeolocation: doc.data().endGeolocation,
      //           endTime: doc.data().endTime,
      //           endDate: doc.data().endDate,
      //           created_date: doc.data().created_date,
      //           created_month: doc.data().created_month,
      //           timestamp: doc.data().timestamp
      //         })
      //       })
      //     })
      //   let docR;
      //   docR = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.b_uid)
      //     .collection('crm')
      //     .doc('crm')
      //     .collection("sales")
      //   docR.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       let doc = change.doc;
      //       this.sales.push({
      //         id: doc.id,
      //         client_id: doc.data().client_id,
      //         client_displayname: doc.data().client_displayname,
      //         client_email: doc.data().client_email,
      //         client_phone: doc.data().client_phone,
      //         client_formatted_address: doc.data().client_formatted_address,
      //         user_uid: doc.data().user_uid,
      //         user_displayname: doc.data().user_displayname,
      //         user_email: doc.data().user_email,
      //         companyDetails: doc.data().companyDetails,
      //         ItemsAdd: doc.data().ItemsAdd,
      //         totalPrice: doc.data().totalPrice,
      //         totalQuantity: doc.data().totalQuantity,
      //         totalCTC: doc.data().totalCTC,
      //         totalProfit: doc.data().totalProfit,
      //         stage: doc.data().stage,
      //         invoiced_date: doc.data().invoiced_date,
      //         invoiced_month: doc.data().invoiced_month,
      //         created_date: doc.data().created_date,
      //         created_month: doc.data().created_month,
      //         timestamp: doc.data().timestamp
      //       });
      //     });
      //   });
      //   let docI = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.b_uid)
      //     .collection('crm')
      //     .doc('crm')
      //     .collection("customer-ind")
      //   docI.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       let doc = change.doc;
      //       this.customers.push({
      //         id: doc.id,
      //         created_date: doc.data().created_date,
      //         uid: doc.data().uid,
      //         user_displayName: doc.data().user_displayName,
      //         user_name: doc.data().user_name,
      //         user_surname: doc.data().user_surname,
      //         name: doc.data().name,
      //         surname: doc.data().surname,
      //         clientDisplayname: `${doc.data().name} ${doc.data().surname}`,
      //         email: doc.data().email,
      //         formatted_address: doc.data().formatted_address,
      //         adr_address: doc.data().adr_address,
      //         phone: doc.data().phone,
      //         description: doc.data().description
      //       });
      //     });
      //   });
      //   let docC = this.$fireStore
      //     .collection(this.companyDetails.uniqueAppName)
      //     .doc(this.companyDetails.b_uid)
      //     .collection('crm')
      //     .doc('crm')
      //     .collection('companies')
      //   docC.onSnapshot(snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       let doc = change.doc
      //       this.companies.push({
      //         id: doc.id,
      //         created_date: doc.data().created_date,
      //         uid: doc.data().uid,
      //         displayName: doc.data().user_displayName,
      //         clientDisplayname: doc.data().companyDisplayname,
      //         name: doc.data().user_name,
      //         surname: doc.data().user_surname,
      //         company: doc.data().company,
      //         companyDisplayname: doc.data().companyDisplayname,
      //         sources: doc.data().sources,
      //         ratings: doc.data().ratings,
      //         email: doc.data().email,
      //         formatted_address: doc.data().formatted_address,
      //         adr_address: doc.data().adr_address,
      //         phone: doc.data().phone,
      //         website: doc.data().website
      //       })
      //     })
      //   })
      //   let component
      //   let componentName
      //   let displayName
      //   let routeID
      //   for (let i = 0; i < this.myComponents.length; i++) {
      //     if (this.myComponents[i].componentname == this.$route.params.id) {
      //       component = this.myComponents[i].component
      //       componentName = this.myComponents[i].componentname
      //       displayName = this.myComponents[i].displayName
      //       routeID = this.myComponents[i].id
      //     }
      //   }
      //   let payloads = {
      //     component: component,
      //     componentName: componentName,
      //     displayName: displayName,
      //     routeID: routeID
      //   }
      //   this.$store.dispatch('feature/componentDetailsSet', payloads)
      //   this.$store.dispatch('feature/componentIdSet', routeID)
      //   this.$store.dispatch('route/componentSet', payloads)
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
