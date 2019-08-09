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
          @click="form_contact = true"
        >
          <i class="far fa-plus"></i> Новый контакт
        </button>
      </div>
      <form-contact
        v-if="form_contact"
        @close-menu="form_contact = false"
        @data-update="fetchData()"
      ></form-contact>
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
          <div class="tbl-col col-2 sortable" @click="sortBy('id')">
            #
            <span v-if="sort.key != 'id'">
              <i class="fas fa-sort"></i>
            </span>
            <span v-else class="arrow">
              <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
            </span>
          </div>

          <div class="tbl-col col-2 sortable" @click="sortBy('name')">
            ФИО
            <span v-if="sort.key != 'name'">
              <i class="fas fa-sort"></i>
            </span>
            <span v-else class="arrow">
              <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
            </span>
          </div>

          <div class="tbl-col col-2 sortable" @click="sortBy('address')">
            Адрес
            <span v-if="sort.key != 'address'">
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
            <input type="text" @change="onChangeFilter('id')" v-model="filters.id" />
          </div>
          <div class="tbl-col col-2">
            <input type="text" @change="onChangeFilter('name')" v-model="filters.name" />
          </div>
          <div class="tbl-col col-2">
            <input type="text" @change="onChangeFilter('address')" v-model="filters.address" />
          </div>
          <div class="tbl-col col-2"></div>
        </div>
        <div class="tbl-body" style="top: 64px;">
          <div v-for="(el, key) in data" :key="key" class="row tbl-row">
            <div class="tbl-col col-2">{{el.id}}</div>
            <div class="tbl-col col-2">{{el.name}}</div>
            <div class="tbl-col col-2">{{el.address}}</div>
            <div class="tbl-col col-2">
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

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import formContact from "./form_contact.vue";
import router from "@/config/router";
import fitch_all_1 from "@/libs/mixings/fitch_all_1";

export default {
  mixins: [fitch_all_1],
  components: {
    loader,
    breadcrumb,
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