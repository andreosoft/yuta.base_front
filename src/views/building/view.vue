<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{fields.name}}</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '#/objects', title: 'Мои объекты'}, {url: '#/objects/' + fields.object_id, title: fields.object.name}, {url: '', title: fields.name}]"
          ></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>

    <div>
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <h1>Шахматка</h1>
            <div class="card-body">
              <router-link
                :to="{ name: 'sections_view', params: { id: fields.id }}"
                class="btn btn-primary btn-block"
              >Открыть</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="loading"></loader>
    <table class="table table-bordered">
      <tr>
        <th>
          <div class="clearfix">
            <div class="float-left">Информация об доме</div>
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
        </th>
      </tr>
      <tr>
        <th>
          <div class="row">
            <div class="col-md-6">
              <div class="row">
                <div class="col-4">Название дома:</div>
                <div class="col-8">{{fields.name}}</div>
              </div>
            </div>
          </div>
        </th>
      </tr>
    </table>
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
            router.push({ name: "objects_view", params: {id: this.fields.object_id} });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    updateRoute: function() {
      this.fetchData();
    },
  }
};
</script>