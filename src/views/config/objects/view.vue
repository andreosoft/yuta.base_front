<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{fields.name}}</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '#/config', title: 'Настройки'}, {url: '#/config/objects', title: 'Мои объекты'}, {url: '', title: fields.name}]"
          ></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <table class="table table-bordered">
      <tr>
        <th>
          <div class="clearfix">
            <div class="float-left">Информация о объекте</div>
            <div class="float-right">
              <span style="padding-left: 4px; position: relative; display: inline-block;">
                <button class="btn btn-primary" title="Редактировать" @click="form_object = true">
                  <i class="far fa-save"></i> Редактировать
                </button>
              </span>
              <form-object
                v-if="form_object"
                :data="fields"
                @close-menu="form_object = false"
                @data-update="fetchData()"
              ></form-object>
              <span style="padding-left: 4px;">
                <button class="btn btn-danger" title="Закрыть" @click="remove()">
                  <i class="far fa-times-circle"></i> Удалить
                </button>
              </span>
            </div>
          </div>
        </th>
      </tr>
      <tr>
        <th>
          <div class="row">
            <div class="col-md-6">
              <div class="row">
                <div class="col-4">Название объекта:</div>
                <div class="col-8">{{fields.name}}</div>
              </div>
              <div class="row">
                <div class="col-4">Адрес объекта:</div>
                <div class="col-8">{{fields.address}}</div>
              </div>
            </div>
          </div>
        </th>
      </tr>
    </table>
    <h1>Список домов</h1>
    <div>
      <div class="container-fluid">
       <div class="row card-columns justify-content-start">
         <div class="col-md-6 col-lg-4 col-xl-3 ">
          <div class="card text-center">
            <img
              src="/img/building.png"
              style=" height: 70px; width: 70px; align-items: center; margin-top: 15px;"
              alt
              class="card-img-top"
            />
            <div class="card-body">
              <button
                title="Добавить объект"
                class="btn btn-primary btn-block"
                style="margin: 4px 0px 0px 4px;"
                @click="form_building = true"
              >
                <i class="far fa-plus"></i> Добавить дом
              </button>
            </div>
          </div>
        </div>
        <form-building v-if="form_building" :data="{object_id: $route.params.id}" @close-menu="form_building = false" @data-update="fetchBuildings()"></form-building>
        <div class="col-md-6 col-lg-4 col-xl-3" v-for="(el, key) of data_buildings" :key="key">
          <div class="card">
            <img :src="url_upload + el.image" class="card-img-top" alt />
            <div class="card-body">
              <h5 class="card-title text-center">{{el.name}}</h5>
              <router-link
                :to="{ name: 'config_building_view', params: { id: el.id }}"
                class="btn btn-primary btn-block"
              >Открыть</router-link>
            </div>
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
import fitch_one_1 from "@/mixings/fitch_one_1.js";
import formObject from "./form_object.vue";
import formBuilding from "@/views/config/objects/building/form_building.vue";
import router from "@/config/router";
import axios from "axios";

export default {
  mixins: [fitch_one_1],
  components: {
    loader,
    breadcrumb,
    formObject,
    formBuilding
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.object,
      loading: false,
      fields: {},
      data_buildings: {},
      form_object: false,
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
      if (confirm("Вы уверены, что хотите удалить объект?")) {
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
              text: "Объект удален",
              class: "alert"
            });
            router.push({ name: "objects", params: {} });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    updateRoute: function() {
      this.fetchData();
      this.fetchBuildings();
    },
    fetchBuildings() {
      this.loading = true;
      axios
        .get(api.building, { params: { parent_id: this.$route.params.id } })
        .then(response => {
          this.loading = false;
          if (response.data.data == null) {
            this.data_buildings = [];
          } else {
            this.data_buildings = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>