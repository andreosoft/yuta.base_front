<template>
  <form1 :breadcrumbs="[{url: '#/', title: 'Домой'}, {url: '', title: title}]" :loading="loading">
    <template v-slot:title>{{title}}</template>
    <template v-slot:right>
      <div class="btn-block">
        <button title="Новый платеж" class="btn btn-primary" @click="form_f = true">
          <i class="far fa-plus"></i> Новый платеж
        </button>
      </div>
    </template>
    <template v-slot:body>
      <form-f v-if="form_f" @close-menu="form_f = false" @data-update="fetchData()"></form-f>
      <div>
        <div class="row" style="margin-top: 10px;">
          <div class="col">Показано: {{data.length}} из {{pager.count}}</div>
          <div class="col text-right">
            <div
              style="margin:-13px 0px 0px 0px; white-space: nowrap;"
              v-if="pages.page.length && pages.page.length > 1"
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
        <div
          class="flex-table fixed style-1"
          style="top:100px; left:15px; right: 15px; min-width: 500px;"
        >
          <div class="flex-table-header" :style="{'min-width': tableWidth+'px'}">
            <div class="flex-table-row">
              <div
                class="flex-table-col sortable"
                :style="{width: $store.getters['db/width']('crm_finance')+'%'}"
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
                v-for="(el, key) in $store.getters['db/structure'].crm_finance"
                :key="key"
                class="flex-table-col sortable"
                :style="{width: $store.getters['db/width']('crm_finance')+'%'}"
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
                :style="{width: $store.getters['db/width']('crm_finance')+'%'}"
              >
                <input
                  class="form-control"
                  type="text"
                  @change="onChangeFilter('id')"
                  v-model="filters.id"
                />
              </div>

              <div
                v-for="(el, key) in $store.getters['db/structure'].crm_finance"
                :key="key"
                class="flex-table-col"
                :style="{width: $store.getters['db/width']('crm_finance')+'%'}"
              >
                <div v-if="el.type == 'select'">
                  <bselect
                    v-model="filters[el.field_name]"
                    @change="onChangeFilter(el.field_name)"
                    :all="true"
                    :options="el.data.options"
                  ></bselect>
                </div>
                <div v-else-if="el.type == 'select_api'">
                  <bselect-api
                    v-model="filters[el.field_name]"
                    @change="onChangeFilter(el.field_name)"
                    :all="true"
                    :api="el.data.api"
                  ></bselect-api>
                </div>
                <div v-else>
                  <input
                    class="form-control"
                    type="text"
                    @change="onChangeFilter(el.field_name)"
                    v-model="filters[el.field_name]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex-table-body" style="top: 68px;" :style="{'min-width': tableWidth+'px'}">
            <div
              style="cursor: pointer;"
              @click="$router.push({ name: 'finance_view', params: { id: fields.id }})"
              title="Открыть"
              v-for="(fields, k) in data"
              :key="k"
              class="flex-table-row"
            >
              <div
                class="flex-table-col"
                :style="{width: $store.getters['db/width']('crm_finance')+'%'}"
              >{{fields.id}}</div>
              <div
                v-for="(el, key) in $store.getters['db/structure'].crm_finance"
                :key="key"
                :style="{width: $store.getters['db/width']('crm_finance')+'%'}"
                class="flex-table-col"
              >
                <view-element :el="el" :fields="fields"></view-element>
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
import router from "@/config/router";
import fitch_all_1 from "@/mixings/fitch_all_1";
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";
import bselect from "@/widgets/binputs/select.vue";
import bselectApi from "@/widgets/binputs/selectApi.vue";
import formF from "./form_finance.vue";

export default {
  mixins: [base_input_1, fitch_all_1],
  components: {
    loader,
    viewElement,
    bselect,
    bselectApi,
    formF
  },
  data: function() {
    return {
      form_f: false,
      api: api.finance,
      loading: false,
      title: "Платежи",
      data: []
    };
  },
  computed: {
    tableWidth: function() {
      if (this.$store.getters["db/structure"].crm_finance) {
        return this.$store.getters["db/structure"].crm_finance.length * 200;
      }
      return 0;
    }
  }
};
</script>