<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{title}}</h1>
          <breadcrumb v-bind:data="[{url: '#/', title: 'Домой'}, {url: '', title: 'Настройки'}]"></breadcrumb>
        </div>
      </div>
      <transition name="slide-fade">
        <form-object
          v-if="form_object"
          @close-menu="form_object = false"
          @data-update="fetchData()"
        ></form-object>
      </transition>
    </div>
    <div class="separator"></div>
    <loader v-if="loading"></loader>
    <div class="container-fluid">
      <div class="row card-group card-columns justify-content-start">
        <div class="col-md-6 col-lg-3 col-xl-3">
          <div class="card text-center">
            <img
              src="/img/objects.png"
              style=" height: 70px; width: 70px; align-items: center; margin-top: 15px; margin:auto;"
              alt
              class="card-img-top"
            />
            <div class="card-body">
              <button
                title="Добавить объект"
                class="btn btn-primary btn-block"
                style="margin: 4px 0px 0px 4px;"
                @click="form_object = true"
              >
                <i class="far fa-plus"></i> Добавить объект
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3 col-xl-3" v-for="(el, key) of data" :key="key">
          <div class="card">
            <img :src="url_upload + el.image" class="card-img-top" alt />
            <div class="card-body">
              <h5 class="card-title text-center">{{el.name}}</h5>
              <router-link
                :to="{ name: 'config_objects_view', params: { id: el.id }}"
                class="btn btn-primary btn-block"
              >Открыть</router-link>
            </div>
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
import fitch_all_1 from "@/mixings/fitch_all_1";

export default {
  mixins: [fitch_all_1],
  components: {
    loader,
    breadcrumb,
    formObject
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.object,
      loading: false,
      title: "Мои Объекты",
      form_object: false,
      data: []
    };
  }
};
</script>