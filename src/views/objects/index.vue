<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{title}}</h1>
          <breadcrumb v-bind:data="[{url: '#/', title: 'Домой'}, {url: '', title: title}]"></breadcrumb>
        </div>
      </div>
      <div class="float-right">
        <button
          title="Добавить объект"
          class="btn btn-primary"
          style="margin: 4px 0px 0px 4px;"
          @click="form_object = true"
        >
          <i class="far fa-plus"></i> Добавить объект
        </button>
      </div>
      <form-object v-if="form_object" @close-menu="form_object = false" @data-update="fetchData()"></form-object>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-md-3" v-for="(el, key) of data" :key="key">
        <div class="card">
          <img src="img/1-1.jpg" class="card-img-top" alt />
          <div class="card-body">
            <h5 class="card-title text-center">{{el.name}}</h5>
            <router-link
              :to="{ name: 'objects_view', params: { id: el.id }}"
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
import formObject from "./form_object.vue";
import router from "@/config/router";
import fitch_all_1 from "@/libs/mixings/fitch_all_1";

export default {
  mixins: [fitch_all_1],
  components: {
    loader,
    breadcrumb,
    formObject
  },
  data: function() {
    return {
      api: api.object,
      loading: false,
      title: "Мои Объекты",
      form_object: false,
      data: []
    };
  }
};
</script>