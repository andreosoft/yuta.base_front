<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{fields.name}}</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '#/config/objects', title: 'Настройки'}, {url: '#/config/objects', title: 'Мои объекты'}, {url: '#/config/objects/' + fields.object_id, title: fields.object.name}, {url: '', title: fields.name}]"
          ></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>

    <div class="container-fluid">
      <div class="row card-columns justify-content-start">
        
        <div class="col-md-6 col-lg-3 col-xl-3">
          <div class="card text-center">
            <img
              src="/img/sections.png"
              style=" height: 50px; width: 50px; align-items: center; margin-top: 15px;"
              alt
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title text-center">Помещения</h5>
              <router-link
                :to="{ name: 'config_sections_view', params: { id: fields.id }}"
                class="btn btn-primary btn-block"
              >Открыть</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3 col-xl-3">
          <div class="card text-center">
            <img
              src="/img/plans.png"
              style=" height: 50px; width: 50px; align-items: center; margin-top: 15px;"
              alt
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title text-center">Планировки помещений</h5>
              <router-link
                :to="{ name: 'config_plans_apart_view', params: { id: fields.id }}"
                class="btn btn-primary btn-block"
              >Открыть</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3 col-xl-3">
          <div class="card text-center">
            <img
              src="/img/floor.png"
              style=" height: 50px; width: 50px; align-items: center; margin-top: 15px;"
              alt
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title text-center">Планировки этажей</h5>
              <button type="button" class="btn btn-lm btn-primary btn-block" disabled>Скоро</button>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3 col-xl-3">
          <div class="card text-center">
            <img
              src="/img/facade.png"
              style=" height: 50px; width: 50px; align-items: center; margin-top: 15px;"
              alt
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title text-center">Фасады</h5>
              <button type="button" class="btn btn-lm btn-primary btn-block" disabled>Скоро</button>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
      <div class="card">
        <div class="clearfix card-header">
          <div class="float-left">
            <h4>Информация о доме</h4>
          </div>
          <div class="float-right">
            <span style="padding-left: 4px; position: relative; display: inline-block;">
              <button class="btn btn-primary" title="Редактировать" @click="form_building = true">
                <i class="far fa-save"></i> Редактировать
              </button>
            </span>
            <form-building
              v-if="form_building"
              :data="fields"
              @close-menu="form_building = false"
              @data-update="fetchData()"
            ></form-building>
            <span style="padding-left: 4px;">
              <button class="btn btn-danger" title="Закрыть" @click="remove()">
                <i class="far fa-times-circle"></i> Удалить
              </button>
            </span>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-4">
            <img :src="url_upload + fields.image" class="card-img" alt />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h6 class="card-text">Название дома: {{fields.name}}</h6>
              <h6 class="card-text">Жилой комплекс: {{fields.object.name}}</h6 >
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
    <loader v-if="loading"></loader>
    
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import fitch_one_1 from "@/libs/mixings/fitch_one_1.js";
import formBuilding from "./form_building.vue";
import router from "@/config/router";
import axios from "axios";

export default {
  mixins: [fitch_one_1],
  components: {
    loader,
    breadcrumb,
    formBuilding
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.building,
      loading: false,
      fields: {
        id: 0,
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
    remove: function() {
      if (confirm("Вы уверены, что хотите удалить дом?")) {
        this.loading = true;
        axios({
          method: "delete",
          url: this.api,
          data: { ids: [this.fields.id] },
          params: {}
        })
          .then(response => {
            this.loading = false;
            this.$root.$emit("show-info", {
              text: "Дом удален",
              class: "alert"
            });
            router.push({
              name: "config_objects_view",
              params: { id: this.fields.object_id }
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    updateRoute: function() {
      this.fetchData();
    }
  }
};
</script>