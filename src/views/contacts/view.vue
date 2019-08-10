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
    </div>
    <div class="separator"></div>
    <table class="table table-bordered">
      <loader v-if="loading"></loader>
      <tr>
        <th>
          <div class="clearfix">
            <div class="float-left">Информация об контакте</div>
            <div class="float-right">
              <span style="padding-left: 4px; position: relative; display: inline-block;">
                <button class="btn btn-primary" title="Редактировать" @click="form_contact = true">
                  <i class="far fa-save"></i> Редактировать
                </button>
              </span>
              <form-contact
                v-if="form_contact"
                :data="fields"
                @close-menu="form_contact = false"
                @data-update="fetchData()"
              ></form-contact>
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
                <div class="col-4">ФИО:</div>
                <div class="col-8">{{fields.name}}</div>
              </div>
              <div class="row">
                <div class="col-4">Адрес:</div>
                <div class="col-8">{{fields.address}}</div>
              </div>
            </div>
          </div>
        </th>
      </tr>
    </table>
    <h1>Список сделок</h1>
    <div>
      <div>
        <button class="btn btn-primary" title="Добавить сделку" @click="form_deal = true">
          <i class="far fa-plus"></i> Добавить сделку
        </button>
        <form-deal
          v-if="form_deal"
          @close-menu="form_deal = false"
          @data-update="updateRoute()"
          :data="{contact_id: $route.params.id}"
        ></form-deal>
      </div>
      <div>
        <div class="row" v-for="(el, key) of fields.deals" :key="key">
          <div class="col-2">{{el.id}}</div>
          <div class="col-2">{{el.createdon}}</div>
          <div class="col-2">
            <router-link
              :to="{ name: 'deals_view', params: { id: el.id }}"
              title="Открыть сделку"
              class="btn btn-primary btn-block"
            >Открыть сделку</router-link>
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
import fitch_one_1 from "@/libs/mixings/fitch_one_1.js";
import formContact from "./form_contact.vue";
import formDeal from "@/views/deals/form_deal.vue";
import router from "@/config/router";
import axios from "axios";

export default {
  mixins: [fitch_one_1],
  components: {
    loader,
    breadcrumb,
    formContact,
    formDeal
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.contact,
      loading: false,
      fields: {},
      form_contact: false,
      form_deal: false
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