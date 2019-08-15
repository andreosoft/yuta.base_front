<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{title}}</h1>
          <breadcrumb v-bind:data="[{url: '#/', title: 'Домой'}, {url: '', title: title}]"></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <loader v-if="loading"></loader>
    <div class="row">
      <div class="col-md-3" v-for="(el, key) of data" :key="key">
        <div class="card">
          <img :src="url_upload + el.image" class="card-img-top" alt />
          <div class="card-body">
            <h5 class="card-title text-center">{{el.name}}</h5>
            <router-link
              :to="{ name: 'buildings_list', params: { id: el.id }}"
              class="btn btn-primary btn-block"
            >Открыть</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import router from "@/config/router";
import fitch_all_1 from "@/libs/mixings/fitch_all_1";

export default {
  mixins: [fitch_all_1],
  components: {
    loader,
    breadcrumb
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.manager.buildings,
      loading: false,
      title: "Мои Здания",
      form_object: false,
      data: []
    };
  }
};
</script>