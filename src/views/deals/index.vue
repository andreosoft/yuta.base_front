<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{title}}</h1>
          <breadcrumb v-bind:data="[{url: '#/', title: 'Домой'}, {url: '', title: title}]"></breadcrumb>
        </div>
      </div>
      <div class="float-right">
        <button
          title="Добавить объект"
          class="btn btn-primary"
          style="margin: 4px 0px 0px 4px;"
          @click="form_deal = true"
        >
          <i class="far fa-plus"></i> Новая сделка
        </button>
      </div>
      <form-deal
        v-if="form_deal"
        @close-menu="form_deal = false"
        @data-update="fetchData()"
      ></form-deal>
    </div>
    <div class="separator"></div>
    <div v-if="data">
      <div class="row" style="margin-bottom: 3px;">
        <div class="col"></div>
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
      <div class="tbl fixed" style="top:60px; min-width: 500px;">
        <div class="row tbl-row tbl-header">
          <div class="tbl-col col-2 sortable" @click="sortBy('createdon')">
            Дата сделки
            <span v-if="sort.key != 'createdon'">
              <i class="fas fa-sort"></i>
            </span>
            <span v-else class="arrow">
              <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
            </span>
          </div>

          <div class="tbl-col col-2 sortable" @click="sortBy('contact')">
            Контакт
            <span v-if="sort.key != 'contact'">
              <i class="fas fa-sort"></i>
            </span>
            <span v-else class="arrow">
              <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
            </span>
          </div>

          <div class="tbl-col col-2 sortable" @click="sortBy('apartment')">
            Квартира
            <span v-if="sort.key != 'apartment'">
              <i class="fas fa-sort"></i>
            </span>
            <span v-else class="arrow">
              <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
            </span>
          </div>

          <div class="tbl-col col-2" @click="sortBy('info')">
            Информация
          </div>

          <div class="tbl-col col-2 sortable" @click="sortBy('status')">
            Статус
            <span v-if="sort.key != 'status'">
              <i class="fas fa-sort"></i>
            </span>
            <span v-else class="arrow">
              <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
            </span>
          </div>

          <div class="tbl-col col-2"></div>
        </div>
        <div class="row tbl-row tbl-header">
          <div class="tbl-col col-2">
            <input type="text" @change="onChangeFilter('createdon')" v-model="filters.createdon" />
          </div>
          <div class="tbl-col col-2">
            <input type="text" @change="onChangeFilter('contact')" v-model="filters.contact" />
          </div>
          <div class="tbl-col col-2">
            <input type="text" @change="onChangeFilter('apartment')" v-model="filters.apartment" />
          </div>
          <div class="tbl-col col-2">
            <input type="text" @change="onChangeFilter('info')" v-model="filters.info" />
          </div>
          <div class="tbl-col col-2">
            <input type="text" @change="onChangeFilter('status')" v-model="filters.status" />
          </div>
          <div class="tbl-col col-2"></div>
        </div>
        <div class="tbl-body" style="top: 64px;">
          <div v-for="(el, key) in data" :key="key" class="row tbl-row">
            <div class="tbl-col col-2">{{el.createdon}}</div>
            <div class="tbl-col col-2">{{el.contact}}</div>
            <div class="tbl-col col-2">{{el.apartment}}</div>
            <div class="tbl-col col-2">{{el.info}}</div>
            <div class="tbl-col col-2">{{el.status}}</div>
            <div class="tbl-col col-2">
              <router-link
                :to="{ name: 'deals_view', params: { id: el.id }}"
                title="Открыть сделку"
                class="btn btn-primary btn-block"
              >Открыть сделку</router-link>
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
import formDeal from "./form_deal.vue";
import router from "@/config/router";
import fitch_all_1 from "@/libs/mixings/fitch_all_1";

export default {
  mixins: [fitch_all_1],
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
      title: "Сделки",
      form_deal: false,
      data: []
    };
  }
};
</script>