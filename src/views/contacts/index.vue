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
      <transition name="slide-fade">
        <form-contact
          v-if="form_contact"
          @close-menu="form_contact = false"
          @data-update="fetchData()"
        ></form-contact>
      </transition>
      <div>
        <div class="row" style="margin-top: 10px;">
          <div class="col">Показано: {{data.length}} из {{pager.count}}</div>
          <div class="col text-right">
            <div
              style="margin:-13px 0px 0px 0px; white-space: nowrap;"
              v-if="pages.page.length > 1"
            >
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
        <div>
          <div class="flex-table fixed style-1" style="top:120px; left:15px; right: 15px;">
            <div class="flex-table-header" :style="{'min-width': tableWidth+'px'}">
              <div class="flex-table-row">
                <div
                  class="flex-table-col sortable"
                  :style="{width: $store.getters['db/width']('crm_contacts')+'%'}"
                  @click="sortBy('id')"
                >
                  #
                  <span v-if="sort.key != 'id'">
                    <i class="fas fa-sort"></i>
                  </span>
                  <span v-else class="arrow">
                    <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                  </span>
                </div>
                <div
                  v-for="(el, key) in $store.getters['db/structure'].crm_contacts"
                  :key="key"
                  class="flex-table-col sortable"
                  :style="{width: $store.getters['db/width']('crm_contacts')+'%'}"
                  @click="sortBy(el.field_name)"
                >
                  {{el.name}}
                  <span v-if="sort.key != el.field_name">
                    <i class="fas fa-sort"></i>
                  </span>
                  <span v-else class="arrow">
                    <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                  </span>
                </div>
              </div>
              <div class="flex-table-row" style="height: 44px;">
                <div
                  class="flex-table-col"
                  :style="{width: $store.getters['db/width']('crm_contacts')+'%'}"
                >
                  <input
                    class="form-control"
                    type="text"
                    @change="onChangeFilter('id')"
                    v-model="filters.id"
                  />
                </div>

                <div
                  v-for="(el, key) in $store.getters['db/structure'].crm_contacts"
                  :key="key"
                  class="flex-table-col"
                  :style="{width: $store.getters['db/width']('crm_contacts')+'%'}"
                >
                  <findElement
                    :el="el"
                    v-model="filters[el.field_name]"
                    @change="onChangeFilter(el.field_name)"
                  ></findElement>
                </div>
              </div>
            </div>
            <div class="flex-table-body" style="top: 68px;" :style="{'min-width': tableWidth+'px'}">
              <div
                style="cursor: pointer;"
                @click="$router.push({ name: 'contacts_view', params: { id: fields.id }})"
                title="Открыть контакт"
                v-for="(fields, k) in data"
                :key="k"
                class="flex-table-row"
              >
                <div
                  class="flex-table-col"
                  :style="{width: $store.getters['db/width']('crm_contacts')+'%'}"
                >{{fields.id}}</div>
                <div
                  v-for="(el, key) in $store.getters['db/structure'].crm_contacts"
                  :key="key"
                  :style="{width: $store.getters['db/width']('crm_contacts')+'%'}"
                  class="flex-table-col"
                >
                  <view-element :el="el" :fields="fields"></view-element>
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
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";
import findElement from "@/widgets/findElement.vue";

export default {
  mixins: [base_input_1, fitch_all_1],
  components: {
    loader,
    formContact,
    viewElement,
    findElement
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
  },
  computed: {
    tableWidth: function() {
      if (this.$store.getters["db/structure"].crm_contacts) {
        return this.$store.getters["db/structure"].crm_contacts.length * 200;
      }
      return 0;
    }
  }
};
</script>