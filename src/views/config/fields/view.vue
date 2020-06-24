<template>
  <div style="margin: 15px 0 0 0;">
    <div class="clearfix">
      <div class="float-left">
        <h1>{{struct.name}}</h1>
      </div>
      <div class="float-right">
        <div class="btn-block">
          <button
            title="Добавое поле"
            class="btn btn-primary"
            @click="form_edit = true; form_id = null"
          >
            <i class="far fa-plus"></i> Новое поле
          </button>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <loader v-if="loading"></loader>
      <transition name="slide-fade">
        <form-edit
          v-if="form_edit"
          :table_name="table_name"
          :form_id="form_id"
          @close-menu="form_edit = false"
          @data-update="fetchData()"
        ></form-edit>
      </transition>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>Имя поля в базе</th>
            <th>Вид поля</th>
            <th>Показывать в таблице</th>
            <th>Наименование поля</th>
            <th>Тип поля</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(el, key) in data"
            :key="key"
            draggable="true"
            @dragstart="dragstart(key, $event)"
            @dragover.prevent
            @drop="dragdrop(key, $event)"
          >
            <td>
              <span style="color: #777;">
                <i style="padding: 0 10px;" class="fas fa-arrows-alt" title="Переместить"></i>
              </span>
            </td>
            <td>{{el.field_name}}</td>
            <td>{{structure.can_edits.getTextByValue(el.can_edit)}}</td>
            <td>{{el.data.showtable ? 'Да' : 'Нет'}}</td>
            <td>{{el.name}}</td>
            <td>{{structure.types.getTextByValue(el.type)}}</td>
            <td>
              <div class="btn-block">
                <button
                  title="Добавое поле"
                  class="btn btn-primary"
                  @click="form_edit = true; form_id = el.id"
                >
                  <i class="far fa-edit"></i> Обновить
                </button>
                <button
                  v-if="el.can_edit == '1' && parseInt($store.getters['auth/profile'].role) >= 100"
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
      drag_src_el: null,
      form_id: null,
      table_name: null,
      api: api.structure,
      struct: {},
      loading: false,
      form_edit: false,
      data: [],
      structure: structure
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
    dragstart: function(i, e) {
      this.drag_src_el = i;
      e.srcElement.set;
      e.dataTransfer.effectAllowed = "move";
    },
    dragdrop: function(i, e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      let array = this.data;
      if (this.drag_src_el != i) {
        let data = array[this.drag_src_el];
        array.splice(this.drag_src_el, 1);
        array.splice(i, 0, data);
        self.drag_src_el = null;
      }
      this.updateOrder();
    },
    updateOrder: function() {
      this.loading = true;
      let order = [];
      for (let i = 0; i < this.data.length; i++) {
        order.push({ id: this.data[i].id, sort: i });
      }
      axios({
        method: "post",
        url: api.structure_order,
        data: { order: order },
        params: {}
      })
        .then(response => {
          this.loading = false;
          this.updateRoute();
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateRoute: function() {
      this.table_name = this.$route.params.name;
      this.struct = structure.categories[this.table_name];
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      axios
        .get(this.api, {
          params: { name: this.table_name }
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