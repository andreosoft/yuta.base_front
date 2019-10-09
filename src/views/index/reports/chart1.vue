<template>
  <div>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div style="margin-bottom: 3px;">
      <div>
        <b>Объем продаж</b>
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
        label: "Объем продаж",
        backgroundColor: "#8BC34A85",
        borderColor: "#8BC34A",
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
        { x: "Январь", y1: 8 },
        { x: "Февраль", y1: 12 },
        { x: "Март", y1: 11 },
        { x: "Апрель", y1: 15 },
        { x: "Май", y1: 16 },
        { x: "Июнь", y1: 18 },
        { x: "Июль", y1: 19 },
        { x: "Август", y1: 17 },
        { x: "Сентябрь", y1: 20 },
        { x: "Октябрь", y1: 17 },
        { x: "Ноябрь", y1: 15 },
        { x: "Декабрь", y1: 11 }
      ];
      this.data = this.fillData(d);
    }
  }
};
</script>

<style>
</style>
