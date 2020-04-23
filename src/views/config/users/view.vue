<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{fields.name}}</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '#/config/users', title: 'Пользователи'}, {url: '', title: fields.login}]"
          ></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <table class="table table-bordered">
      <loader v-if="loading"></loader>
      <tr>
        <th>
          <div class="clearfix">
            <div class="float-left">Информация об пользователе</div>
            <div class="float-right">
              <span style="padding-left: 4px; position: relative; display: inline-block;">
                <button class="btn btn-primary" title="Редактировать" @click="form_user = true">
                  <i class="far fa-save"></i> Редактировать
                </button>
              </span>
              <form-user
                v-if="form_user"
                :data="fields"
                @close-menu="form_user = false"
                @data-update="fetchData()"
              ></form-user>
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
                <div class="col-4">{{labels.id}}:</div>
                <div class="col-8">{{fields.id}}</div>
              </div>
              <div class="row">
                <div class="col-4">{{labels.login}}:</div>
                <div class="col-8">{{fields.login}}</div>
              </div>
              <div class="row">
                <div class="col-4">{{labels.name}}:</div>
                <div class="col-8">{{fields.name}}</div>
              </div>
              <div class="row">
                <div class="col-4">{{labels.status}}:</div>
                <div class="col-8">
                  {{user_model.status.find(x => x.value == fields.status)
                  ? user_model.status.find(x => x.value == fields.status).text
                  : ""}}
                </div>
              </div>
              <div class="row">
                <div class="col-4">{{labels.role}}:</div>
                <div class="col-8">
                  {{user_model.role.find(x => x.value == fields.role)
                  ? user_model.role.find(x => x.value == fields.role).text
                  : ""}}
                </div>
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
import fitch_one_1 from "@/mixings/fitch_one_1.js";
import formUser from "./form_user.vue";
import router from "@/config/router";
import axios from "axios";
import user_model from "@/models/user";

export default {
  mixins: [fitch_one_1],
  components: {
    loader,
    breadcrumb,
    formUser
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.users,
      loading: false,
      fields: {},
      labels: user_model.labels,
      form_user: false,
      user_model: user_model
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
      if (confirm("Вы уверены, что хотите удалить пользователя?")) {
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
              text: "Пользователь удален",
              class: "alert"
            });
            router.push({ name: "users", params: {} });
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