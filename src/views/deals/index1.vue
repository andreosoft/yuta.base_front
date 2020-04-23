<template>
  <form1 :breadcrumbs="[{url: '#/', title: 'Домой'}, {url: '', title: title}]" :loading="loading">
    <template v-slot:title>{{title}}</template>
    <template v-slot:right>
      <div class="btn-block">
        <button title="Новая сделка" class="btn btn-primary" @click="form_deal = true">
          <i class="far fa-plus"></i> Новая сделка
        </button>
      </div>
    </template>
    <template v-slot:body>
      <form-deal
        v-if="form_deal"
        @close-menu="form_deal = false"
        @data-update="fetchData()"
      ></form-deal>
      <div>
        <div class="row" style="margin-top: 10px;">
          <div class="col">Показано: {{data.length}} из {{pager.count}}</div>
          <div class="col text-right">
            <div style="margin:-13px 0px 0px 0px; white-space: nowrap;" v-if="pages.page.length > 1">
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
            <div class="flex-table-body" style="top: 68px;" :style="{'min-width': tableWidth+'px'}">
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
    </template>
  </form1>
</template>

<script>
import api from "@/config/api";
import base_input_1 from "@/mixings/base_input_1.js";
import formDeal from "./form_deal.vue";
import router from "@/config/router";
import fitch_all_1 from "@/mixings/fitch_all_1";
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";

export default {
  mixins: [base_input_1, fitch_all_1],
  components: {
    loader,
    formDeal,
    viewElement
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.deal,
      loading: false,
      title: "Сделки",
      form_deal: false,
      data: []
    };
  },
  computed: {
    tableWidth: function() {
      return this.$store.getters["db/structure"].crm_deals.length * 200;
    }
  }
};


// <template>
//   <div>
//     <div class="clearfix">
//       <div class="float-left">
//         <div class="row mar-0">
//           <h1>{{title}}</h1>
//           <breadcrumb v-bind:data="[{url: '#/', title: 'Домой'}, {url: '', title: title}]"></breadcrumb>
//         </div>
//       </div>
//       <div class="float-right">
//         <button
//           title="Добавить объект"
//           class="btn btn-primary"
//           style="margin: 4px 0px 0px 4px;"
//           @click="form_deal = true"
//         >
//           <i class="far fa-plus"></i> Новая сделка
//         </button>
//       </div>
//       <form-deal v-if="form_deal" @close-menu="form_deal = false" @data-update="fetchData()"></form-deal>
//     </div>
//     <div class="separator"></div>
//     <div v-if="data">
//       <div class="row" style="margin-top: 10px;">
//         <div class="col">Показано: {{data.length}} из {{pager.count}}</div>
//         <div class="col text-right">
//           <div style="margin:-13px 0px 0px 0px; white-space: nowrap;">
//             <button class="btn btn-secondary btn-round" style="margin: 2px;" @click="setPage(0)">
//               <i class="fas fa-chevron-left"></i>
//             </button>
//             <button
//               v-for="(item, key) in pages.page"
//               :key="key"
//               @click="setPage(item)"
//               class="btn btn-round"
//               :class="item == pages.current ? 'btn-primary' : 'btn-secondary'"
//               style="margin: 2px;"
//             >{{item + 1}}</button>
//             <button
//               class="btn btn-secondary btn-round"
//               style="margin: 2px;"
//               @click="setPage(maxPage())"
//             >
//               <i class="fas fa-chevron-right"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//       <div>
//         <div class="flex-table fixed style-1" style="top:100px; left:15px; right: 15px; min-width: 500px;">
//           <div class="flex-table-header">
//             <div class="flex-table-row">
//               <div class="flex-table-col flex-table-col-2 sortable" @click="sortBy('createdon')">
//                 Дата сделки
//                 <span v-if="sort.key != 'createdon'">
//                   <i class="fas fa-sort"></i>
//                 </span>
//                 <span v-else class="arrow">
//                   <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
//                 </span>
//               </div>

//               <div class="flex-table-col flex-table-col-2 sortable" @click="sortBy('contact')">
//                 Контакт
//                 <span v-if="sort.key != 'contact'">
//                   <i class="fas fa-sort"></i>
//                 </span>
//                 <span v-else class="arrow">
//                   <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
//                 </span>
//               </div>

//               <div class="flex-table-col flex-table-col-2 sortable" @click="sortBy('apartment')">
//                 Квартира
//                 <span v-if="sort.key != 'apartment'">
//                   <i class="fas fa-sort"></i>
//                 </span>
//                 <span v-else class="arrow">
//                   <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
//                 </span>
//               </div>

//               <div class="flex-table-col flex-table-col-2" @click="sortBy('info')">Информация</div>

//               <div class="flex-table-col flex-table-col-2 sortable" @click="sortBy('status')">
//                 Статус
//                 <span v-if="sort.key != 'status'">
//                   <i class="fas fa-sort"></i>
//                 </span>
//                 <span v-else class="arrow">
//                   <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
//                 </span>
//               </div>

//               <div class="flex-table-col flex-table-col-2"></div>
//             </div>
//             <div class="flex-table-row" style="height: 44px;">
//               <div class="flex-table-col flex-table-col-2">
//                 <input
//                 class="form-control" 
//                   type="text"
//                   @change="onChangeFilter('createdon')"
//                   v-model="filters.createdon"
//                 />
//               </div>
//               <div class="flex-table-col flex-table-col-2">
//                 <input class="form-control" type="text" @change="onChangeFilter('contact')" v-model="filters.contact" />
//               </div>
//               <div class="flex-table-col flex-table-col-2">
//                 <input
//                 class="form-control" 
//                   type="text"
//                   @change="onChangeFilter('apartment')"
//                   v-model="filters.apartment"
//                 />
//               </div>
//               <div class="flex-table-col flex-table-col-2">
//                 <input class="form-control" type="text" @change="onChangeFilter('info')" v-model="filters.info" />
//               </div>
//               <div class="flex-table-col flex-table-col-2">
//                 <input class="form-control" type="text" @change="onChangeFilter('status')" v-model="filters.status" />
//               </div>
//               <div class="flex-table-col flex-table-col-2"></div>
//             </div>
//           </div>
//           <loader v-if="loading"></loader>
//           <div class="flex-table-body" style="top: 68px;">
//             <div v-for="(el, key) in data" :key="key" class="flex-table-row">
//               <div class="flex-table-col flex-table-col-2">{{el.createdon}}</div>
//               <div class="flex-table-col flex-table-col-2">{{el.contact}}</div>
//               <div class="flex-table-col flex-table-col-2">{{el.apartment}}</div>
//               <div class="flex-table-col flex-table-col-2">{{el.info}}</div>
//               <div class="flex-table-col flex-table-col-2">{{el.status}}</div>
//               <div class="flex-table-col flex-table-col-2">
//                 <router-link
//                   :to="{ name: 'deals_view', params: { id: el.id }}"
//                   title="Открыть сделку"
//                   class="btn btn-primary btn-block"
//                 >Открыть сделку</router-link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </template>

// <script>
// import api from "@/config/api";
// import loader from "@/views/common/loader.vue";
// import breadcrumb from "@/views/common/breadcrumb.vue";
// import formDeal from "./form_deal.vue";
// import router from "@/config/router";
// import fitch_all_1 from "@/mixings/fitch_all_1";

// export default {
//   mixins: [fitch_all_1],
//   components: {
//     loader,
//     breadcrumb,
//     formDeal
//   },
//   data: function() {
//     return {
//       url_upload: api.url_upload,
//       api: api.deal,
//       loading: false,
//       title: "Сделки",
//       form_deal: false,
//       data: []
//     };
//   }
// };
</script>