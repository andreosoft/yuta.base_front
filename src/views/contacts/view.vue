<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{fields.name}}</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '#/contacts', title: 'Контакты'}, {url: '', title: fields.name}]"
          ></breadcrumb>
        </div>
      </div>
      <div class="float-right">
        <span style="padding-left: 4px; position: relative; display: inline-block;">
          <button class="btn btn-primary" title="Редактировать" @click="form_contact = true">
            <i class="far fa-save"></i> Редактировать
          </button>
        </span>
        <transition name="slide-fade">
          <form-contact
            v-if="form_contact"
            :data="fields"
            @close-menu="form_contact = false"
            @data-update="fetchData()"
          ></form-contact>
        </transition>
        <span style="padding-left: 4px;">
          <button class="btn btn-danger" title="Закрыть" @click="remove()">
            <i class="far fa-times-circle"></i> Удалить
          </button>
        </span>
      </div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-md-12 col-lg-12 col-xl-5">
        <widgetInfo :fields="fields" :loading="loading"></widgetInfo>
      </div>

      <div class="col-md-12 col-lg-12 col-xl-7">
        <div class="my-3 p-3 bg-white rounded shadow">
          <div>
            <div>
              <ul class="nav nav-tabs">
                <li class="nav-item" v-for="(el, key) of data_tabs" :key="key">
                  <router-link
                    v-if="el.show === true"
                    class="nav-link"
                    :to="{name: el.route}"
                    :title="el.title"
                  >{{el.name}}</router-link>
                </li>
              </ul>
            </div>
            <div>
              <router-view
                :fields="{contact_id:$route.params.id, contact: fields.name}"
                :filters="{ contact_id: $route.params.id }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import breadcrumb from "@/views/common/breadcrumb.vue";
import fitch_one_1 from "@/mixings/fitch_one_1.js";
import formContact from "./form_contact.vue";
import router from "@/config/router";
import axios from "axios";
import widgetInfo from "./widget_info";

export default {
  mixins: [fitch_one_1],
  components: {
    breadcrumb,
    formContact,
    widgetInfo
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.contact,
      loading: false,
      fields: {},
      form_contact: false
    };
  },
  created() {
    this.updateRoute();
  },
  watch: {
    $route: "updateRoute"
  },
  computed: {
    data_tabs: function() {
      if (this.$store.getters["options/getall"].module_contacts) {
        return this.$store.getters["options/getall"].module_contacts.data_tabs;
      }
      return {};
    }
  },
  methods: {
    remove: function() {
      if (confirm("Вы уверены, что хотите удалить клиента?")) {
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
              text: "Клиент удален",
              class: "alert"
            });
            router.push({ name: "contacts", params: {} });
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