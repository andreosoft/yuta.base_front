<template>
  <div>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div style="margin-bottom: 3px;">
      <div>
        <b>Динамика продаж по объектам</b>
      </div>
    </div>
    <div>
      <line-chart :chart-data="data" :width="200" :height="100"></line-chart>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import axios from "axios";
import LineChart from "./LineChart.js";

export default {
  components: {
    LineChart
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
        label: "Объект №1",
        backgroundColor: "#8BC34A",
        data: []
      };
      let dataset2 = {
        label: "Объект №2",
        backgroundColor: "#2196F3",
        data: []
      };
      let res = {
        labels: [],
        datasets: [dataset1, dataset2]
      };
      for (let el of data) {
        res.labels.push(el.x);
        dataset1.data.push(el.y1);
        dataset2.data.push(el.y2);
      }
      return res;
    },
    fetchData: function() {
      this.loading = false;
      let d = [
        { x: 1, y1: 5, y2: 5 },
        { x: 2, y1: 3, y2: 4 },
        { x: 3, y1: 5, y2: 6 },
        { x: 4, y1: 2, y2: 4 },
        { x: 5, y1: 6, y2: 7 },
        { x: 6, y1: 7, y2: 8 }
      ];
      this.data = this.fillData(d);
    }
  }
};
</script>

<style>
</style>
