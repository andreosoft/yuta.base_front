<template>
  <widgetInfo :fields="fields" :loading="loading" :showlink="true"></widgetInfo>
</template>

<script>
import api from "@/config/api";
import axios from "axios";
import widgetInfo from "./widget_info";

export default {
  components: {
    widgetInfo
  },
  props: {
    id: String
  },
  data: function() {
    return {
      loading: false,
      fields: {}
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    id: "fetchData"
  },
  methods: {
    fetchData() {
      if (this.id > 0) {
        this.fetch(this.id);
      }
    },
    fetch(id) {
      this.loading = true;
      axios
        .get(api.deal, { params: { id: id } })
        .then(response => {
          this.loading = false;
          this.fields = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>