<template>
  <div>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div style="margin-bottom: 3px;">
      <div>
        <b>Отчет 4</b>
      </div>
    </div>
    <div>
      <doughnut-chart :chart-data="data" :width="200" :height="100"></doughnut-chart>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import axios from "axios";
import DoughnutChart from "./DoughnutChart.js";

export default {
  components: {
    DoughnutChart
  },
  data() {
    return {
      loading: false,
      data: {}
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fillData(data) {
      let dataset1 = {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: []
      };
      let res = {
        labels: [],
        datasets: [dataset1]
      };
      for (let el of data) {
        res.labels.push(el.x);
        dataset1.data.push(el.y1);
      }
      return res;
    },
    fetchData: function() {
      this.loading = false;
      let d = [
        { x: 'data 1', y1: 1},
        { x: 'data 2', y1: 3},
        { x: 'data 3', y1: 5},
        { x: 'data 4', y1: 2}
      ]
      this.data = this.fillData(d);
    }
  }
};
</script>

<style>
</style>
