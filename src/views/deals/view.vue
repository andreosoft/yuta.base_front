<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{fields.contact.name}}</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '#/deals', title: 'Сделки'}, {url: '', title: fields.name}]"
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
              <div
                class="col-md-12 border-top border-gray pb-2 pt-2 mb-0"
                v-for="(el, key) in $store.getters['db/structure'].crm_deals"
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
                :fields="{deal_id: $route.params.id, deal: fields.name, contact: fields.contact, contact_id: fields.contact_id}"
                :filters="{ deal_id: $route.params.id }"
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
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import fitch_one_1 from "@/mixings/fitch_one_1.js";
import formDeal from "./form_deal.vue";
import router from "@/config/router";
import axios from "axios";
import viewElement from "@/widgets/viewElement.vue";

export default {
  mixins: [fitch_one_1],
  components: {
    loader,
    breadcrumb,
    formDeal,
    viewElement
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
      form_deal: false,
      data_tabs: [
        {
          name: "Платежи",
          route: "deals_finance",
          title: "Платежи",
          show: true
        }
      ]
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