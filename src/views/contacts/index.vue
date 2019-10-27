<template>
  <form1 :breadcrumbs="[{url: '#/', title: 'Домой'}, {url: '', title: title}]" :loading="loading">
    <template v-slot:title>{{title}}</template>
    <template v-slot:right>
      <div class="btn-block">
        <button title="Добавить контакт" class="btn btn-primary" @click="form_contact = true">
          <i class="far fa-plus"></i> Новый контакт
        </button>
      </div>
    </template>
    <template v-slot:body>
      <form-contact
        v-if="form_contact"
        @close-menu="form_contact = false"
        @data-update="fetchData()"
      ></form-contact>
      <div>
        <div class="row" style="margin-top: 10px;">
          <div class="col">Показано: {{data.length}} из {{pager.count}}</div>
          <div class="col text-right">
            <div style="margin:-13px 0px 0px 0px; white-space: nowrap;">
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
          style="top:100px; left:15px; right: 15px; min-width: 500px;"
        >
          <div class="flex-table-header">
            <div class="flex-table-row">
              <div class="flex-table-col flex-table-col-2 sortable" @click="sortBy('id')">
                #
                <span v-if="sort.key != 'id'">
                  <i class="fas fa-sort"></i>
                </span>
                <span v-else class="arrow">
                  <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                </span>
              </div>

              <div class="flex-table-col flex-table-col-4 sortable" @click="sortBy('name')">
                ФИО
                <span v-if="sort.key != 'name'">
                  <i class="fas fa-sort"></i>
                </span>
                <span v-else class="arrow">
                  <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                </span>
              </div>

              <div class="flex-table-col flex-table-col-4 sortable" @click="sortBy('address')">
                Адрес
                <span v-if="sort.key != 'address'">
                  <i class="fas fa-sort"></i>
                </span>
                <span v-else class="arrow">
                  <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                </span>
              </div>

              <div class="flex-table-col flex-table-col-2"></div>
            </div>
            <div class="flex-table-row" style="height: 44px;">
              <div class="flex-table-col flex-table-col-2">
                <input
                  class="form-control"
                  type="text"
                  @change="onChangeFilter('id')"
                  v-model="filters.id"
                />
              </div>
              <div class="flex-table-col flex-table-col-4">
                <input
                  class="form-control"
                  type="text"
                  @change="onChangeFilter('name')"
                  v-model="filters.name"
                />
              </div>
              <div class="flex-table-col flex-table-col-4">
                <input
                  class="form-control"
                  type="text"
                  @change="onChangeFilter('address')"
                  v-model="filters.address"
                />
              </div>
              <div class="flex-table-col flex-table-col-2"></div>
            </div>
          </div>
          <loader v-if="loading"></loader>
          <div class="flex-table-body" style="top: 68px;">
            <div v-for="(el, key) in data" :key="key" class="flex-table-row">
              <div class="flex-table-col flex-table-col-2">{{el.id}}</div>
              <div class="flex-table-col flex-table-col-4">{{el.name}}</div>
              <div class="flex-table-col flex-table-col-4">{{el.address}}</div>
              <div class="flex-table-col flex-table-col-2">
                <div style="text-align: center;">
                  <router-link
                    :to="{ name: 'contacts_view', params: { id: el.id }}"
                    title="Открыть контакт"
                    class="btn btn-primary btn-block"
                  >Открыть контакт</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </form1>
</template>

<script>
import api from "@/config/api";
import base_input_1 from "@/mixings/base_input_1.js";
import formContact from "./form_contact.vue";
import router from "@/config/router";
import fitch_all_1 from "@/mixings/fitch_all_1";

export default {
  mixins: [base_input_1, fitch_all_1],
  components: {
    formContact
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.contact,
      loading: false,
      title: "Контакты",
      form_contact: false,
      data: []
    };
  }
};
</script>