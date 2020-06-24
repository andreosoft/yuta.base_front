<template>
  <div>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div style="margin-bottom: 3px;">
      <div>
        <b>Количество сделок по менеджерам</b>
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
    fetchData() {
      this.loading = true;
      axios
        .get(api.reports.rep4, { params: {} })
        .then(response => {
          this.loading = false;
          let els = response.data.data;
          let res = {
            labels: [],
            datasets: [
              {
                backgroundColor: [],
                data: []
              }
            ]
          };
          for (let el of els) {
            if (!el.x) {
              el.x = 'не задано'
            }
            res.labels.push(el.x);
            let color = this.getRandomColor();
            res.datasets[0].backgroundColor.push(color);
            res.datasets[0].data.push(el.y1)
          }
          this.data = res;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
};
</script>

<style>
</style>
