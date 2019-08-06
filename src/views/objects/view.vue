<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>ЖК Ботанический сад</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '#/objects', title: 'Мои объекты'}, {url: '', title: title}]"
          ></breadcrumb>
        </div>
      </div>
      <div class="float-right">
        <span style="padding-left: 4px; position: relative; display: inline-block;">
          <button class="btn btn-primary" title="Сохранить" @click="actions('submit')">
            <i class="far fa-save"></i> Сохранить
          </button>
          <div
            class="btn-info-alert"
            title="У вас есть несохраненные изменения"
            v-if="this.hasChanges"
          ></div>
        </span>
        <span style="padding-left: 4px;">
          <button
            class="btn btn-danger"
            title="Сохранить и закрыть"
            @click="actions('submitAndExit')"
          >
            <i class="far fa-save"></i>
          </button>
        </span>
        <span style="padding-left: 4px;">
          <button class="btn btn-danger" title="Закрыть" @click="actions('exit')">
            <i class="far fa-times-circle"></i>
          </button>
        </span>
      </div>
    </div>
    <div class="separator"></div>
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import formCreate from "./form.vue";

export default {
  // mixins: [fitch_all_1],
  components: {
    loader,
    breadcrumb,
    formCreate
  },
  data: function() {
    return {
      api: api.object,
      loading: false,
      title: "Мои Объекты",
      create_form: false,
      hasChanges: false,
      data: []
    };
  }
};
</script>
