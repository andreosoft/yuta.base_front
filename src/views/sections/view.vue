<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>Шахматка</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'},
              {url: '#/objects', title: 'Мои объекты'},
              {url: '#/objects/' + fields.object_id, title: fields.object.name},
              {url: '#/building/' + fields.id, title: fields.name},
              {url: '', title: 'Шахматка'} ]"
          ></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <div>
      <button class="btn btn-primary" title="Добавить подъезд" @click="form_section = true">
        <i class="far fa-plus"></i> Добавить подъезд
      </button>
    </div>
    <form-section
      v-if="form_section"
      :data="{building_id: $route.params.id}"
      @close-menu="form_section = false"
      @data-update="updateRoute()"
    ></form-section>
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import fitch_one_1 from "@/libs/mixings/fitch_one_1.js";
import router from "@/config/router";
import formSection from "./form_section.vue";
import axios from "axios";

export default {
  mixins: [fitch_one_1],
  components: {
    loader,
    breadcrumb,
    formSection
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
      form_section: false
    };
  },
  created() {
    this.updateRoute();
  },
  watch: {
    $route: "updateRoute"
  },
  methods: {
    updateRoute: function() {
      this.fetchData();
    }
  }
};
</script>