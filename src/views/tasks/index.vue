<template>
  <form1 :breadcrumbs="[{url: '#/', title: 'Домой'}, {url: '', title: title}]" :loading="loading">
    <template v-slot:title>{{title}}</template>
    <template v-slot:right>
      <div class="btn-block">
        <button title="Новая сделка" class="btn btn-primary" @click="form_task = true">
          <i class="far fa-plus"></i> Новая задача
        </button>
      </div>
    </template>
    <template v-slot:body>
      <transition name="slide-fade">
        <form-task v-if="form_task" @close-menu="form_task = false" @data-update="fetchData()"></form-task>
      </transition>
      <div>
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
                    :style="{width: $store.getters['db/width']('crm_tasks')+'%'}"
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
                    v-for="(el, key) in $store.getters['db/structure'].crm_tasks"
                    :key="key"
                    class="flex-table-col sortable"
                    :style="{width: $store.getters['db/width']('crm_tasks')+'%'}"
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
                    :style="{width: $store.getters['db/width']('crm_tasks')+'%'}"
                  >
                    <input
                      class="form-control"
                      type="text"
                      @change="onChangeFilter('id')"
                      v-model="filters.id"
                    />
                  </div>

                  <div
                    v-for="(el, key) in $store.getters['db/structure'].crm_tasks"
                    :key="key"
                    class="flex-table-col"
                    :style="{width: $store.getters['db/width']('crm_tasks')+'%'}"
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
                  @click="$router.push({ name: 'tasks_view', params: { id: fields.id }})"
                  title="Открыть сделку"
                  v-for="(fields, k) in data"
                  :key="k"
                  class="flex-table-row"
                >
                  <div
                    class="flex-table-col"
                    :style="{width: $store.getters['db/width']('crm_tasks')+'%'}"
                  >{{fields.id}}</div>
                  <div
                    v-for="(el, key) in $store.getters['db/structure'].crm_tasks"
                    :key="key"
                    :style="{width: $store.getters['db/width']('crm_tasks')+'%'}"
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
import formTask from "./form_task.vue";
import router from "@/config/router";
import fitch_all_1 from "@/mixings/fitch_all_1";
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";
import axios from "axios";

export default {
  mixins: [base_input_1, fitch_all_1],
  components: {
    loader,
    formTask,
    viewElement,
    bselect,
    bselectApi
  },
  data: function() {
    return {
      kanban: true,
      url_upload: api.url_upload,
      api: api.tasks,
      loading: false,
      title: "Задачи",
      form_task: false,
      data: []
    };
  },
  computed: {
    statuses: function() {
      if (this.$store.getters["db/structure"].crm_tasks) {
        return this.$store.getters["db/structure"].crm_tasks.find(
          x => x.field_name == "status"
        ).data.options;
      }
      return [];
    },
    tableWidth: function() {
      if (this.$store.getters["db/structure"].crm_tasks) {
        return this.$store.getters["db/structure"].crm_tasks.length * 200;
      }
      return 0;
    }
  },
  methods: {
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