<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{fields.name}}</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '#/tasks', title: 'Задачи'}, {url: '', title: fields.name}]"
          ></breadcrumb>
        </div>
      </div>
      <div class="float-right">
        <span style="padding-left: 4px; position: relative; display: inline-block;">
          <button class="btn btn-primary" title="Редактировать" @click="form_task = true">
            <i class="far fa-save"></i> Редактировать
          </button>
        </span>
        <form-task
          v-if="form_task"
          :data="fields"
          @close-menu="form_task = false"
          @data-update="fetchData()"
        ></form-task>
        <span style="padding-left: 4px;">
          <button class="btn btn-danger" title="Закрыть" @click="remove()">
            <i class="far fa-times-circle"></i> Удалить
          </button>
        </span>
      </div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-md-5">
        <div class="my-3 p-3 bg-white rounded shadow">
          <h5 class="border-bottom border-gray pb-2 mb-0">Информация о задаче</h5>
          <loader v-if="loading"></loader>
          <div class="media text-muted pt-3">
            <div class="row">
              <div
                class="col-md-12 border-top border-gray pb-2 pt-2 mb-0"
                v-for="(el, key) in $store.getters['db/structure'].crm_tasks"
                :key="key"
              >
                {{el.name}}:
                <b>
                  <view-element :el="el" :fields="fields"></view-element>
                </b>
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
import formTask from "./form_task.vue";
import router from "@/config/router";
import axios from "axios";
import viewElement from "@/widgets/viewElement.vue";

export default {
  mixins: [fitch_one_1],
  components: {
    loader,
    breadcrumb,
    formTask,
    viewElement
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.tasks,
      loading: false,
      fields: {
        contact: {
          name: null
        },
        apartment: {
          number: null
        }
      },
      form_task: false
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
      if (confirm("Вы уверены, что хотите удалить задачу?")) {
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
              text: "Сделка удалена",
              class: "alert"
            });
            router.push({ name: "tasks", params: {} });
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