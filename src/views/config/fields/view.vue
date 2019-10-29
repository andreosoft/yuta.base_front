<template>
  <div style="margin: 15px 0 0 0;">
    <div class="clearfix">
      <div class="float-left">
        <h1>{{struct.name}}</h1>
      </div>
      <div class="float-right">
        <div class="btn-block">
          <button title="Добавое поле" class="btn btn-primary" @click="form_edit = true; form_id = null">
            <i class="far fa-plus"></i> Новое поле
          </button>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <loader v-if="loading"></loader>
      <form-edit v-if="form_edit" :table_name="table_name" :form_id="form_id" @close-menu="form_edit = false" @data-update="fetchData()"></form-edit>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Имя поля в базе</th>
            <th>Наименование поля</th>
            <th>Тип поля</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(el, key) in data" :key="key">
            <td>{{el.field_name}}</td>
            <td>{{el.name}}</td>
            <td>{{el.type}}</td>
            <td>
              <div class="btn-block">
                <button title="Добавое поле" class="btn btn-primary" @click="form_edit = true; form_id = el.id">
                  <i class="far fa-edit"></i> Обновить
              </button>
              <button
                  v-if="parseInt($store.getters['auth/profile'].role) >= 100"
                  title="Удалить"
                  class="btn btn-danger"
                  @click="remove(el.id)"
                >Удалить</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import structure from "@/models/structure";
import FormEdit from "./form.vue";
import axios from "axios";
import api from "@/config/api";
import Loader from "@/views/common/loader.vue";

export default {
  components: {
    FormEdit,
    Loader
  },
  data: function() {
    return {
      form_id: null,
      table_name: null,
      api: api.structure,
      struct: {},
      loading: false,
      form_edit: false,
      data: []
    };
  },
  created() {
    this.table_name = this.$route.params.name;
    this.updateRoute();
  },
  watch: {
    $route: "updateRoute"
  },
  methods: {
    updateRoute: function() {
      this.table_name = this.$route.params.name;
      this.struct = structure.categories[this.table_name];
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      axios
        .get(this.api, {
          params: { name: this.table_name}
        })
        .then(response => {
          this.loading = false;
          this.data = response.data.data;
        })
        .catch(error => {
          this.$root.errors("get", error);
        });
    },
    remove: function(id) {
      if (confirm("Вы уверены, что хотите удалить поле?")) {
        this.loading = true;
        axios({
          method: "delete",
          url: this.api,
          data: { ids: [id] },
          params: {}
        })
          .then(response => {
            this.loading = false;
            this.$root.$emit("show-info", {
              text: "Поле удалено",
              class: "alert"
            });
            this.updateRoute();
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>