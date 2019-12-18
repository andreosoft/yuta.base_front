<template>
  <form1 :breadcrumbs="[{url: '#/', title: 'Домой'}, {url: '', title: title}]" :loading="loading">
    <template v-slot:title>{{title}}</template>
    
    
  </form1>
</template>

<script>
import api from "@/config/api";
import base_input_1 from "@/mixings/base_input_1.js";
import router from "@/config/router";
import fitch_all_1 from "@/mixings/fitch_all_1";
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";

export default {
  mixins: [base_input_1, fitch_all_1],
  components: {
    loader,
    viewElement
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.contact,
      loading: false,
      title: "Финансы",
      form_contact: false,
      data: []
    };
  }
};
</script>