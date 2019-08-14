<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{title}}</h1>
          <breadcrumb v-bind:data="[{url: '#/', title: 'Домой'}, {url: '#/config/objects', title: 'Настройки'}, {url: '', title: title}]"></breadcrumb>
        </div>
      </div>
      <div class="float-right">
        <button
          title="Добавить пользователя"
          class="btn btn-primary"
          style="margin: 4px 0px 0px 4px;"
          @click="form_user = true"
        >
          <i class="far fa-plus"></i> Добавить пользователя
        </button>
      </div>
      <form-user v-if="form_user" @close-menu="form_user = false" @data-update="fetchData()"></form-user>
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

          <div class="tbl-col col-2 sortable" @click="sortBy('login')">
            Login
            <span v-if="sort.key != 'login'">
              <i class="fas fa-sort"></i>
            </span>
            <span v-else class="arrow">
              <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
            </span>
          </div>

          <div class="tbl-col col-2 sortable" @click="sortBy('name')">
            Имя
            <span v-if="sort.key != 'name'">
              <i class="fas fa-sort"></i>
            </span>
            <span v-else class="arrow">
              <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
            </span>
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
          <div class="tbl-col col-2 sortable" @click="sortBy('role')">
            Роль
            <span v-if="sort.key != 'role'">
              <i class="fas fa-sort"></i>
            </span>
            <span v-else class="arrow">
              <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
            </span>
          </div>
          <div class="tbl-col col-2"></div>
        </div>
        <div class="row tbl-row tbl-header" style="height: 44px;">
          <div class="tbl-col col-2">
            <input type="text" @change="onChangeFilter('id')" v-model="filters.id" />
          </div>
          <div class="tbl-col col-2">
            <input type="text" @change="onChangeFilter('login')" v-model="filters.login" />
          </div>
          <div class="tbl-col col-2">
            <input type="text" @change="onChangeFilter('name')" v-model="filters.name" />
          </div>
          <div class="tbl-col col-2">
            <select class="form-control" @change="onChangeFilter('status')" v-model="filters.status">
              <option value>Все</option>
              <option
                v-for="(el, key) in user_model.status"
                :key="key"
                :value="el.value"
              >{{el.text}}</option>
            </select>
          </div>
          <div class="tbl-col col-2">
            <select class="form-control" @change="onChangeFilter('role')" v-model="filters.role">
              <option value>Все</option>
              <option
                v-for="(el, key) in user_model.role"
                :key="key"
                :value="el.value"
              >{{el.text}}</option>
            </select>
          </div>
          <div class="tbl-col col-2"></div>
        </div>
        <loader v-if="loading"></loader>
        <div class="tbl-body" style="top: 77px;">
          <div v-for="(el, key) in data" :key="key" class="row tbl-row">
            <div class="tbl-col col-2">{{el.id}}</div>
            <div class="tbl-col col-2">{{el.login}}</div>
            <div class="tbl-col col-2">{{el.name}}</div>
            <div class="tbl-col col-2">
              {{user_model.status.find(x => x.value == el.status)
              ? user_model.status.find(x => x.value == el.status).text
              : ""}}
            </div>
            <div class="tbl-col col-2">
              {{user_model.role.find(x => x.value == el.role)
              ? user_model.role.find(x => x.value ==el.role).text
              : ""}}
            </div>
            <div class="tbl-col col-2">
              <router-link
                :to="{ name: 'config_users_view', params: { id: el.id }}"
                title="Открыть контакт"
                class="btn btn-primary btn-block"
              >Открыть пользователя</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user_model from "@/models/user";
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import formUser from "./form_user.vue";
import router from "@/config/router";
import fitch_all_1 from "@/libs/mixings/fitch_all_1";

export default {
  mixins: [fitch_all_1],
  components: {
    loader,
    breadcrumb,
    formUser
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      title: "Пользователи",
      api: api.users,
      user_model: user_model,
      form_user: false,
      data: []
    }
  }
};
</script>