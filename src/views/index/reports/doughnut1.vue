<template>
  <div>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div style="margin-bottom: 3px;">
      <div>
        <b>Колличество продаж по сотрудникам</b>
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
        backgroundColor: ['#f44336', '#4CAF50', '#FFEB3B', '#2196F3'],
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
        { x: 'Денис', y1: 8},
        { x: 'Ринат', y1: 3},
        { x: 'Азиз', y1: 5},
        { x: 'Виктория', y1: 4}
      ]
      this.data = this.fillData(d);
    }
  }
};
</script>

<style>
</style>
