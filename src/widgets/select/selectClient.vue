<template>
  <form-modal @close-menu="$emit('close-menu')" :loading="loading" type="fullscreen">
    <template v-slot:title>
      <div>Выбрать клиента</div>
    </template>
    <template v-slot:body>
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
                  <div v-if="el.type == 'select'">
                    <select
                      v-model="filters[el.field_name]"
                      @change="onChangeFilter(el.field_name)"
                      class="form-control"
                    >
                      <option value>Все</option>
                      <option
                        v-for="(o_el, o_key) in el.data.options"
                        :key="o_key"
                        :value="o_el.value"
                      >{{o_el.text}}</option>
                    </select>
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
                @click="$emit('change', {id: fields.id, view: fields.name})"
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
  </form-modal>
</template>

<script>
import FormModal from "@/widgets/form_modal1/FormModal.vue";
import api from "@/config/api";
import base_input_1 from "@/mixings/base_input_1.js";
import router from "@/config/router";
import fitch_all_1 from "@/mixings/fitch_all_1";
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";

export default {
  mixins: [base_input_1, fitch_all_1],
  components: {
    loader,
    FormModal,
    viewElement
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
      return this.$store.getters["db/structure"].crm_contacts.length * 200;
    }
  }
};
</script>