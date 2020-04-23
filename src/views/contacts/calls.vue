<template>
  <div>
    <h5 class="pt-3 pb-2 mb-0 border-bottom text-center">Звонки</h5>
    <div class="pt-2 pb-2 border-bottom border-gray">
      <loader v-if="loading"></loader>
      <div v-if="data && data.length > 0" class="pb-2">
        <div class="container">
          <div
            class="pb-2 pt-2 row border-bottom border-gray align-items-center"
            v-for="(el, key) of data"
            :key="key"
          >
            <div class="col-4">{{el.calldatetime}}</div>
            <div class="col-4">
                <span v-if="el.status == 'BUSY'" class="status-label badge-pill badge-warning">
                <i v-if="el.direction == 1" class="fas fa-arrow-down"></i>
                <i v-if="el.direction == 0" class="fas fa-arrow-up"></i> Занято
              </span>
              <span v-if="el.status == 'SUCCESS'" class="status-label badge-pill badge-success">
                <i v-if="el.direction == 1" class="fas fa-arrow-down"></i>
                <i v-if="el.direction == 0" class="fas fa-arrow-up"></i> Завершен
              </span>
              <span v-if="el.status == 'CANCEL'" class="status-label badge-pill badge-danger">
                <i v-if="el.direction == 1" class="fas fa-arrow-down"></i>
                <i v-if="el.direction == 0" class="fas fa-arrow-up"></i> Нет ответа
              </span>
            </div>
            <div class="col-4" v-html="player(el.uuid)"></div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="mb-0 text-center">Нет звонков</p>
      </div>
      <form-deal
        v-if="form_deal"
        @data-update="updateRoute()"
        :data="{contact_id: $route.params.id}"
      ></form-deal>
    </div>
  </div>
</template>
<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import formDeal from "@/views/deals/form_deal.vue";
import axios from "axios";

export default {
  mixins: [],
  components: {
    loader,
    formDeal
  },
  data: function() {
    return {
      loading: false,
      data: [],
      form_deal: false
    };
  },
  created() {
    this.updateRoute();
  },
  watch: {
    $route: "updateRoute"
  },
  methods: {
    updateRoute() {
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      axios
        .get(api.contact_get_calls, {
          params: {
            contact_id: this.$route.params.id
          }
        })
        .then(response => {
          this.loading = false;
          if (response.data.data == null) {
            this.data = [];
          } else {
            this.data = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    player: function(url) {
      return (
        '<audio style="calls-audio" controls>' +
        '<source src="' +
        this.$store.getters["options/getall"].module_calls.record_url +
        url +
        '"' +
        ' type="audio/mpeg"/></audio>'
      );
    }
  }
};
</script>