<template>
  <div>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div style="margin-bottom: 3px;">
      <div>
        <b>По клиентам источник обращения</b>
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
    getStatus(status) {
      if (status) {
        return this.$store.getters["db/structure"].crm_contacts
          .find(x => x.field_name == "f2")
          .data.options.find(x => x.value == status)
          ? this.$store.getters["db/structure"].crm_contacts
              .find(x => x.field_name == "f2")
              .data.options.find(x => x.value == status)
          : { text: "" };
      }
      return { text: "не задано" };
    },
    fetchData() {
      this.loading = true;
      axios
        .get(api.reports.rep3, { params: {} })
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
            let st = this.getStatus(el.x);
            res.labels.push(st.text);
            st.color = this.getRandomColor()
            res.datasets[0].backgroundColor.push(st.color);
            res.datasets[0].data.push(el.y1);
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
