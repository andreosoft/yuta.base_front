<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>Шахматка</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'},
              {url: '#/objects', title: 'Мои объекты'},
              {url: '#/objects/' + fields.object_id, title: fields.object.name},
              {url: '#/building/' + fields.id, title: fields.name},
              {url: '', title: 'Шахматка'} ]"
          ></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import fitch_one_1 from "@/libs/mixings/fitch_one_1.js";
import router from "@/config/router";
import axios from "axios";

export default {
  mixins: [fitch_one_1],
  components: {
    loader,
    breadcrumb
  },
  data: function() {
    return {
      api: api.building,
      loading: false,
      fields: {
        name: null,
        object: {
          name: null
        }
      },
      form_building: false
    };
  },
  created() {
    this.updateRoute();
  },
  watch: {
    $route: "updateRoute"
  },
  methods: {
    updateRoute: function() {
      this.fetchData();
    }
  }
};
</script>