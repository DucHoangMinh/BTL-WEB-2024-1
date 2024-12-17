<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-12" :class="isRTL ? 'text-right' : 'text-left'">
              <div class="d-flex justify-space-between">
                <h2 class="card-title">Doanh thu theo tháng</h2>
                <div class="d-flex align-center justify-center">
                  <h3 class="card-title mr-2 ma-0">Năm</h3>
                  <v-select
                      :items="yearList"
                      outlined
                      v-model="selectedYear"
                      dense
                      hide-details
                  ></v-select>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            ref="bigChart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>


    <!-- Small charts -->
    <div class="col-lg-12" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <div class="d-flex align-center justify-space-between">
            <div>
              <h3 class="card-title">Doanh thu theo khoảng ngày</h3>
              <h5 class="card-title">
                <i class="tim-icons icon-bell-55 text-primary "></i> 763,215
              </h5>
            </div>
            <div class="d-flex align-center justify-center">
              <h5 class="mr-2">Ngày bắt đầu</h5>
              <base-input @input="chooseStartDate" type="date" v-model="startDate" ></base-input>
            </div>
            <div class="d-flex align-center justify-center">
              <h5 class="mr-2">Ngày kết thúc</h5>
              <base-input @input="chooseEndDate" type="date" v-model="endDate"></base-input>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <p>{{purpleLineChart.chartData.labels}}</p>
          <line-chart
            style="height: 100%"
            :chart-data="purpleLineChart.chartData"
            :gradient-colors="purpleLineChart.gradientColors"
            :gradient-stops="purpleLineChart.gradientStops"
            :extra-options="purpleLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>
    <div class="col-lg-12" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">Số lượng thành viên mới theo tháng</h5>
        </template>
        <div class="chart-area">
          <bar-chart
            style="height: 100%"
            :chart-data="blueBarChart.chartData"
            :gradient-stops="blueBarChart.gradientStops"
            :extra-options="blueBarChart.extraOptions"
          >
          </bar-chart>
        </div>
      </card>
    </div>
<!--    <div class="col-lg-4" :class="{ 'text-right': isRTL }">-->
<!--      <card type="chart">-->
<!--        <template slot="header">-->
<!--          <h5 class="card-category">Completed tasks</h5>-->
<!--          <h3 class="card-title">-->
<!--            <i class="tim-icons icon-send text-success "></i> 12,100K-->
<!--          </h3>-->
<!--        </template>-->
<!--        <div class="chart-area">-->
<!--          <line-chart-->
<!--            style="height: 100%"-->
<!--            :chart-data="greenLineChart.chartData"-->
<!--            :gradient-stops="greenLineChart.gradientStops"-->
<!--            :extra-options="greenLineChart.extraOptions"-->
<!--          >-->
<!--          </line-chart>-->
<!--        </div>-->
<!--      </card>-->
<!--    </div>-->
  </div>
</template>
<script>
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import TaskList from '@/components/Dashboard/TaskList';
import config from '@/config';
import { Table, TableColumn } from 'element-ui';
import axios from "axios";




let bigChartData = [
  [],
  [80, 120, 900, 110, 95, 105, 90, 100, 80, 95, 70, 120],
  [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
]
let bigChartLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
let bigChartDatasetOptions = {
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
}

export default {
  name: 'dashboard',
  components: {
    LineChart,
    BarChart,
    TaskList,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      yearList: ['2020','2021', '2022','2023', '2024'],
      selectedYear: '2024',
      tableData: [
        {
          id: 1,
          name: 'Dakota Rice',
          salary: '$36.738',
          country: 'Niger',
          city: 'Oud-Turnhout'
        },
        {
          id: 2,
          name: 'Minerva Hooper',
          salary: '$23,789',
          country: 'Curaçao',
          city: 'Sinaai-Waas'
        },
        {
          id: 3,
          name: 'Sage Rodriguez',
          salary: '$56,142',
          country: 'Netherlands',
          city: 'Baileux'
        },
        {
          id: 4,
          name: 'Philip Chaney',
          salary: '$38,735',
          country: 'Korea, South',
          city: 'Overland Park'
        },
        {
          id: 5,
          name: 'Doris Greene',
          salary: '$63,542',
          country: 'Malawi',
          city: 'Feldkirchen in Kärnten'
        }
      ],
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [{
            ...bigChartDatasetOptions,
            data: bigChartData[0]
          }],
          labels: bigChartLabels
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ['2024-14-12'],
          datasets: [
            {
              label: 'Data',
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0]
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
          datasets: [
            {
              label: 'My First dataset',
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80]
            }
          ]
        },
        gradientColors: [
          'rgba(66,134,121,0.15)',
          'rgba(66,134,121,0.0)',
          'rgba(66,134,121,0)'
        ],
        gradientStops: [1, 0.4, 0]
      },
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      reportByDay: [],
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
          datasets: [
            {
              label: 'Số người',
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [0,0, 0, 0, 0, 0,0, 10, 10, 12, 15, 12]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0]
      }
    };
  },
  computed: {
    enableRTL () {
      return this.$route.query.enableRTL;
    },
    isRTL () {
      return this.$rtl.isRTL;
    },
  },
  methods: {
    async chooseStartDate() {
      await this.getReportByDateRange(this.startDate, this.endDate)
    },
    async chooseEndDate() {
      await this.getReportByDateRange(this.startDate, this.endDate)
    },
    async getReportByDateRange(startDate, endDate){
      try {
        const { data } = await axios.get(`https://api-btl-web-2024-1.vercel.app/revenue/date-range?startDate=${this.startDate}&endDate=${this.endDate}`);
        console.log(data.dailyRevenue)
        this.purpleLineChart.chartData.labels = Object.keys(data.dailyRevenue)
        await this.initBigChart(0)
      } catch (e) {
        console.log(e)
      } finally {

      }
    },
    async getMonthReport(year){
      try {
        const { data } = await axios.get(`https://api-btl-web-2024-1.vercel.app/revenue/year?year=${year}`);
        return data.monthlyRevenue
      } catch (e) {
        console.log(e)
      } finally {

      }
    },
    async getAllMonthReport() {
      bigChartData[0] = []
      bigChartData[0] = Object.values(await this.getMonthReport("2024"))
    },
    async init(){
      await this.getAllMonthReport()
      console.log(bigChartData[0])
      console.log("hehe")
      await this.initBigChart(0)
    },
    initBigChart (index) {
      let chartData = {
        datasets: [{
          ...bigChartDatasetOptions,
          data: bigChartData[index]
        }],
        labels: bigChartLabels
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    }
  },

  mounted () {
    this.init()
  }
}
</script>
<style></style>
