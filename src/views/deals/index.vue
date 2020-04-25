<template>
  <form1 :breadcrumbs="[{url: '#/', title: 'Домой'}, {url: '', title: title}]" :loading="loading">
    <template v-slot:title>{{title}}</template>
    <template v-slot:right>
      <div class="btn-block">
        <button title="Вид канбан" class="btn btn-primary" @click="kanban = true">
          <i class="far fa-th"></i> Вид канбан
        </button>
        <button title="Вид списком" class="btn btn-primary" @click="kanban = false">
          <i class="far fa-list"></i> Вид списком
        </button>
        <button title="Новая сделка" class="btn btn-primary" @click="form_deal = true">
          <i class="far fa-plus"></i> Новая задача
        </button>
      </div>
    </template>
    <template v-slot:body>
      <form-deal v-if="form_deal" @close-menu="form_deal = false" @data-update="fetchData()"></form-deal>
      <div v-if="kanban">
        <div>
          <div class="flex justify-center">
            <div
              class="flex overflow-x-scroll"
              style="    
            bottom: 0;
    position: absolute;
    top: 75px;
    left: 15px;
    right: 15px;"
            >
              <div
                v-for="status in datakd"
                :key="status.value"
                class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
              >
                <p
                  class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
                  :style="{borderBottom: '4px solid ' + status.color}"
                >{{status.name}}</p>
                <draggable
                  v-model="status.els"
                  :animation="200"
                  ghost-class="ghost-card"
                  group="status"
                >
                  <deal-card
                    v-for="(el) in status.els"
                    :key="el.id"
                    :status_id="status.value"
                    :status_color="status.color"
                    :field="el"
                    class="mt-3 cursor-move"
                  ></deal-card>
                </draggable>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          <div class="row" style="margin-top: 10px;">
            <div v-if="data.length" class="col">Показано: {{data.length}} из {{pager.count}}</div>
            <div class="col text-right">
              <div
                style="margin:-13px 0px 0px 0px; white-space: nowrap;"
                v-if="pages.page.length && pages.page.length > 1"
              >
                <button
                  class="btn btn-secondary btn-round"
                  style="margin: 2px;"
                  @click="setPage(0)"
                >
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
                    :style="{width: $store.getters['db/width']('crm_deals')+'%'}"
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
                    v-for="(el, key) in $store.getters['db/structure'].crm_deals"
                    :key="key"
                    class="flex-table-col sortable"
                    :style="{width: $store.getters['db/width']('crm_deals')+'%'}"
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
                    :style="{width: $store.getters['db/width']('crm_deals')+'%'}"
                  >
                    <input
                      class="form-control"
                      type="text"
                      @change="onChangeFilter('id')"
                      v-model="filters.id"
                    />
                  </div>

                  <div
                    v-for="(el, key) in $store.getters['db/structure'].crm_deals"
                    :key="key"
                    class="flex-table-col"
                    :style="{width: $store.getters['db/width']('crm_deals')+'%'}"
                  >
                    <div v-if="el.type == 'select' || el.type == 'status'">
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
                    <div v-else-if="el.type == 'ref'">
                      <input
                        class="form-control"
                        type="text"
                        @change="onChangeFilter(el.data.field_view)"
                        v-model="filters[el.data.field_view]"
                      />
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
              <div
                class="flex-table-body"
                style="top: 68px;"
                :style="{'min-width': tableWidth+'px'}"
              >
                <div
                  style="cursor: pointer;"
                  @click="$router.push({ name: 'deals_view', params: { id: fields.id }})"
                  title="Открыть сделку"
                  v-for="(fields, k) in data"
                  :key="k"
                  class="flex-table-row"
                >
                  <div
                    class="flex-table-col"
                    :style="{width: $store.getters['db/width']('crm_deals')+'%'}"
                  >{{fields.id}}</div>
                  <div
                    v-for="(el, key) in $store.getters['db/structure'].crm_deals"
                    :key="key"
                    :style="{width: $store.getters['db/width']('crm_deals')+'%'}"
                    class="flex-table-col"
                  >
                    <view-element :el="el" :fields="fields"></view-element>
                  </div>
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
import bselect from "@/widgets/binputs/select.vue";
import bselectApi from "@/widgets/binputs/selectApi.vue";
import formDeal from "./form_deal.vue";
import router from "@/config/router";
import fitch_all_1 from "@/mixings/fitch_all_1";
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";
import draggable from "vuedraggable";
import dealCard from "./deal_card.vue";
import axios from "axios";
import { log } from "util";

export default {
  mixins: [base_input_1, fitch_all_1],
  components: {
    loader,
    dealCard,
    viewElement,
    bselect,
    bselectApi,
    formDeal,
    draggable
  },
  data: function() {
    return {
      kanban: true,
      url_upload: api.url_upload,
      api: api.deal,
      loading: false,
      title: "Сделки",
      form_deal: false,
      data: [],
      datakd: []
    };
  },
  computed: {
    statuses: function() {
      if (this.$store.getters["db/structure"].crm_deals) {
        return this.$store.getters["db/structure"].crm_deals.find(
          x => x.field_name == "status"
        ).data.options;
      }
      return [];
    },
    tableWidth: function() {
      if (this.$store.getters["db/structure"].crm_tacrm_dealssks) {
        return this.$store.getters["db/structure"].crm_deals.length * 200;
      }
      return 0;
    }
  },
  methods: {
    genget: function() {
      let res = [];
      for (let status of this.statuses) {
        let subR = [];
        for (let els of this.data.filter(x => x.status == status.value)) {
          subR.push(els);
        }
        res.push({
          name: status.text,
          value: status.value,
          color: status.color,
          els: subR
        });
      }
      console.log(res);

      return res;
    },
    fetchData() {
      this.error = null;
      this.loading = true;
      axios
        .get(this.api, {
          params: { sort: this.sort, filters: this.filters, pager: this.pager }
        })
        .then(response => {
          this.loading = false;
          if (response.data.data == null) {
            this.data = [];
          } else {
            this.data = response.data.data;
            this.datakd = this.genget();
            this.pager = response.data.pager;
            this.updatePages();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}

.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>