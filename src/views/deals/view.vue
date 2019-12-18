<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{fields.contact.name}}</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '#/deals', title: 'Сделки'}, {url: '', title: fields.contact.name}]"
          ></breadcrumb>
        </div>
      </div>
      <div class="float-right">
        <span style="padding-left: 4px; position: relative; display: inline-block;">
          <button class="btn btn-primary" title="Редактировать" @click="form_deal = true">
            <i class="far fa-save"></i> Редактировать
          </button>
        </span>
        <form-deal
          v-if="form_deal"
          :data="fields"
          @close-menu="form_deal = false"
          @data-update="fetchData()"
        ></form-deal>
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
          <h5 class="border-bottom border-gray pb-2 mb-0">Информация о сделке</h5>
          <loader v-if="loading"></loader>
          <div class="media text-muted pt-3">
            <div class="row">
              <div class="col-md-12">Дата: {{fields.createdon}}</div>
              <div class="col-md-12">
                Контакт: {{fields.contact.name}}
                <router-link
                  :to="{ name: 'contacts_view', params: { id: fields.contact.id }}"
                  title="Открыть контакт"
                  class
                >
                  <i class="far fa-eye color-primary"></i>
                </router-link>
              </div>
              <div class="col-md-12">
                Квартира:
                <i v-if="fields.apartment">{{fields.apartment.number}}</i>
                <i v-else>не задано</i>
              </div>
              <div class="col-md-12">Информация: {{fields.info}}</div>
              <div class="col-md-12">Статус: {{fields.status}}</div>
              
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
import formDeal from "./form_deal.vue";
import router from "@/config/router";
import axios from "axios";

export default {
  mixins: [fitch_one_1],
  components: {
    loader,
    breadcrumb,
    formDeal
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.deal,
      loading: false,
      fields: {
        contact: {
          name: null
        },
        apartment: {
          number: null
        }
      },
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
      if (confirm("Вы уверены, что хотите удалить сделку?")) {
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
            router.push({ name: "deals", params: {} });
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