<template>
  <div>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div style="margin-bottom: 3px;">
      <div>
        <b>Объем продаж квартир с разным количеством комнат</b>
      </div>
    </div>
    <div>
      <bar-chart :chart-data="data" :width="200" :height="100"></bar-chart>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import axios from "axios";
import BarChart from "./BarChart.js";

export default {
  components: {
    BarChart
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
        label: "Студия",
        backgroundColor: "#7CB342",
        data: []
      };
      let dataset2 = {
        label: "1 комната",
        backgroundColor: "#00ACC1",
        data: []
      };
      let dataset3 = {
        label: "2 комнаты",
        backgroundColor: "#D81B60",
        data: []
      };
      let dataset4 = {
        label: "3 комнаты",
        backgroundColor: "#FB8C00",
        data: []
      };
      let res = {
        labels: [],
        datasets: [dataset1, dataset2, dataset3, dataset4]
      };
      for (let el of data) {
        res.labels.push(el.x);
        dataset1.data.push(el.y1);
        dataset2.data.push(el.y2);
        dataset3.data.push(el.y3);
        dataset4.data.push(el.y4);
      }
      return res;
    },
    fetchData: function() {
      this.loading = false;
      let d = [
        { x: 1, y1: 1, y2: 5, y3: 6,  y4: 9 },
        { x: 2, y1: 2, y2: 3, y3: 3,  y4: 8 },
        { x: 3, y1: 2, y2: 5, y3: 4,  y4: 6 },
        { x: 4, y1: 5, y2: 4, y3: 8,  y4: 4 },
        { x: 5, y1: 3, y2: 6, y3: 5,  y4: 7 },
        { x: 6, y1: 0, y2: 3, y3: 3,  y4: 8 }
      ];
      this.data = this.fillData(d);
    }
  }
};
</script>

<style>
</style>
