<template>
  <div class>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>Рабочий стол</h1>
        </div>
      </div>
      <div class="float-right"></div>
    </div>
    <div class="separator"></div>
    <div>
      <div class="row">
        <!-- <div class="col-md-6">
          <chart1></chart1>
        </div>
        <div class="col-md-6">
          <chart2></chart2>
        </div>
        <div class="col-md-6">
          <bar1></bar1>
        </div> -->
        <div class="col-md-6">
          <doughnut1 v-if="$store.getters['db/status'] === 'success'"></doughnut1>
        </div>
        <div class="col-md-6">
          <doughnut2 v-if="$store.getters['db/status'] === 'success'"></doughnut2>
        </div>
        <div class="col-md-6">
          <doughnut3 v-if="$store.getters['db/status'] === 'success'"></doughnut3>
        </div>
        <div class="col-md-6">
          <doughnut4 v-if="$store.getters['db/status'] === 'success'"></doughnut4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import chart1 from "./reports/chart1.vue";
import chart2 from "./reports/chart2.vue";
import bar1 from "./reports/bar1.vue";
import doughnut1 from "./reports/doughnut1.vue";
import doughnut2 from "./reports/doughnut2.vue";
import doughnut3 from "./reports/doughnut3.vue";
import doughnut4 from "./reports/doughnut4.vue";

export default {
  components: { doughnut2, doughnut1, doughnut3, doughnut4}
};
</script>