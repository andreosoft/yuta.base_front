<template>
  <form1 :breadcrumbs="[{url: '#/', title: 'Домой'}, {url: '', title: title}]" :loading="loading">
    <template v-slot:title>{{title}}</template>
    <template v-slot:body>
      <div class="row" style="margin-top: 10px;">
        <div class="col">Показано: {{data.length}} из {{pager.count}}</div>
        <div class="col text-right">
          <div v-if="pages.page.length > 0" style="margin:-13px 0px 0px 0px; white-space: nowrap;">
            <button class="btn btn-secondary btn-round" style="margin: 2px;" @click="setPage(0)">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button
              v-for="(item, key) in pages.page"
              :key="key"
              @click="setPage(item)"
              class="btn btn-round"
              :class="item == pages.current ? 'btn-primary' : 'btn-secondary'"
              style="margin: 2px;"
            >{{item + 1}}</button>
            <button
              class="btn btn-secondary btn-round"
              style="margin: 2px;"
              @click="setPage(maxPage())"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex-table fixed style-1"
        style="top: 115px; left: 15px; right: 15px; min-width: 500px;"
      >
        <div class="flex-table-header">
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-2">Время Звонка</div>
            <div class="flex-table-col flex-table-col-1">Статус</div>
            <div class="flex-table-col flex-table-col-2">Ответственный</div>
            <div class="flex-table-col flex-table-col-2">Клиент</div>
            <div class="flex-table-col flex-table-col-2">Номер телефона</div>
            <div class="flex-table-col flex-table-col-3">Запись разговора</div>
          </div>
        </div>
        <!---->
        <div class="flex-table-body">
          <div v-for="(el, key) in data" :key="key" class="flex-table-row">
            <div class="flex-table-col flex-table-col-2">{{el.calldatetime}}</div>
            <div class="flex-table-col flex-table-col-1">
              <span v-if="el.status == 'BUSY'" class="status-label badge-pill badge-warning">
                <i v-if="el.direction == 1" class="fas fa-arrow-down"></i>
                <i v-if="el.direction == 0" class="fas fa-arrow-up"></i> Занято
              </span>
              <span v-if="el.status == 'SUCCESS'" class="status-label badge-pill badge-success">
                <i v-if="el.direction == 1" class="fas fa-arrow-down"></i>
                <i v-if="el.direction == 0" class="fas fa-arrow-up"></i> Завершен
              </span>
              <span v-if="el.status == 'CANCEL'" class="status-label badge-pill badge-danger">
                <i v-if="el.direction == 1" class="fas fa-arrow-down"></i>
                <i v-if="el.direction == 0" class="fas fa-arrow-up"></i> Нет ответа
              </span>
            </div>
            <div class="flex-table-col flex-table-col-2">
              <span v-if="el.users_id">
                <router-link
                  :to="{name: 'config_users_view', params: { id: el.users_id }}"
                >{{el.users_name}}</router-link>
              </span>
              <span v-else>Ответственный не задан</span>
            </div>
            <div class="flex-table-col flex-table-col-2">
              <span v-if="el.crm_contacts_id">
                <router-link
                  :to="{name: 'contacts_view', params: { id: el.crm_contacts_id}}"
                >{{el.crm_contacts_name}}</router-link>
              </span>
              <span v-else>
                <span style="cursor: pointer;" title="Добавить контакт" @click="genClient(el)">Клинет не найден</span></span>
            </div>
            <div class="flex-table-col flex-table-col-2">{{el.phone}}</div>
            <div class="flex-table-col flex-table-col-3" v-html="player(el.uuid)"></div>
          </div>
        </div>
      </div>
      <form-contact
        v-if="form_contact"
        :phone="phone"
        @close-menu="form_contact = false"
      ></form-contact>
    </template>
  </form1>
</template>

<script>
import api from "@/config/api";
import base_input_1 from "@/mixings/base_input_1.js";
import router from "@/config/router";
import fitch_all_1 from "@/mixings/fitch_all_1";
import formContact from "@/views/contacts/form_contact.vue";

export default {
  mixins: [fitch_all_1, base_input_1],
  components: { formContact },
  data: function() {
    return {
      form_contact: false,
      api: api.calls,
      loading: false,
      title: "Звонки",
      phone: "",
      data: [],
      pager: {
        page: 0,
        count: 0,
        limit: 100
      }
    };
  },
  methods: {
    player: function(url) {
      return (
        '<audio style="calls-audio" controls>' +
        '<source src="' +
        this.$store.getters["options/getall"].module_calls.record_url +
        url +
        '"' +
        ' type="audio/mpeg"/></audio>'
      );
    },
    genClient(el) {
      this.phone = el.phone;
      this.form_contact = true;
    }
  }
};
</script>