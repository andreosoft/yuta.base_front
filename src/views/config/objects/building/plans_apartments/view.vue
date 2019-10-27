<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>Планировки помещений</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'},
              {url: '#/config/objects', title: 'Настройки'},
              {url: '#/config/objects', title: 'Мои объекты'},
              {url: '', title: 'Планировки помещений'} ]"
          ></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <div>
      <div class="alert alert-secondary">
        Рекомендуемый размер изображения 1000*1000 пикселей. Без пустых или белых полей в формате jpeg, jpg, png. Вес одного изображения не должен превышать 500 кб.
        Необходимо загрузить отдельными файлами планировки для каждой секции, даже если планировки типовые.
      </div>
      <div>
        <input
          v-on:change="handleFileUpload()"
          ref="file"
          type="file"
          style="display: none"
          :id="id+'-in'"
          multiple
        />
        <label class="btn btn-primary" :for="id+'-in'">Загрузить планировки помещений</label>
        <div>
          <transition name="fade" v-for="(el, key) in files_uploads" :key="key">
            <div class="file-image-el row" style="align-items: center;">
              <div class="col-6">{{el.file.name}}</div>
              <div class="col-6">
                <div class="progress">
                  <div class="progress-bar" :style="{width: el.status + '%'}">{{el.status}}%</div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div>
      <div class="flex-table style-2" v-if="data_plans && data_plans.length > 0">
        <div class="flex-table-header">
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-2">Планировка</div>
            <div class="flex-table-col flex-table-col-2">Наименование</div>
            <div class="flex-table-col flex-table-col-4">Помещения, соответствующие планировке</div>
            <div class="flex-table-col flex-table-col-2">Действия</div>
          </div>
        </div>
        <loader v-if="loading"></loader>
        <div class="flex-table-body">
          <div v-for="(el, key) in data_plans" :key="key" class="flex-table-row">
            <div class="flex-table-col flex-table-col-2">{{el.number}}</div>
            <div class="flex-table-col flex-table-col-2">{{el.rooms}}</div>
            <div class="flex-table-col flex-table-col-4">{{el.square}}</div>
            <div class="flex-table-col flex-table-col-2">
              <span>
                <span>
                  <button class="btn" title="Редактировать помещение" @click="editPlan(el, key)">
                    <i class="far fa-pencil-alt color-primary"></i>
                  </button>
                </span>
                <span>
                  <button class="btn" title="Удалить помещение" @click="removePlan(el, key)">
                    <i class="far fa-trash-alt color-danger"></i>
                  </button>
                </span>
              </span>
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
import router from "@/config/router";
import axios from "axios";

export default {
  mixins: [fitch_one_1],
  components: {
    loader,
    breadcrumb
  },
  data: function() {
    return {
      id: null,
      files_uploads: [],
      api: api.plan_apartment,
      loading: false,
      data_plans: []
    };
  },
  methods: {
    mounted() {
      this.id = this._uid;
    },
    editPlan: function(el, key) {},
    removePlan: function(el, key) {},
    handleFileUpload: function() {
      for (var el of this.$refs.file.files) {
        var e = {
          file: el,
          status: 0
        };
        this.files_uploads.push(e);
      }
      this.uploads();
    },
    uploads: function() {
      for (var image of this.files_uploads) {
        this.upload(image);
      }
    },
    upload: function(file) {
      this.status = 0;
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("name", file.file.name);
      axios
        .post(api.uploads, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: progressEvent => {
            file.status = parseInt(
              (progressEvent.loaded / progressEvent.total) * 100
            );
          }
        })
        .then(response => {
          this.files_uploads.splice(this.files_uploads.indexOf(file), 1);
          // this.$emit("input", response.data.data.file);
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    }
  }
};
</script>