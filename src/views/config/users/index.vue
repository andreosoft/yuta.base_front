<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{title}}</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '', title: 'Настройки'}]"
          ></breadcrumb>
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

    <div v-if="data">
      <div class="flex-table fixed style-1" style="top:60px; min-width: 500px;">
        <div class="flex-table-header">
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1 sortable" @click="sortBy('id')">
              #
              <span v-if="sort.key != 'id'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>

            <div class="flex-table-col flex-table-col-3 sortable" @click="sortBy('login')">
              Login
              <span v-if="sort.key != 'login'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>

            <div class="flex-table-col flex-table-col-2 sortable" @click="sortBy('name')">
              ФИО
              <span v-if="sort.key != 'name'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>

            <div class="flex-table-col flex-table-col-2 sortable" @click="sortBy('status')">
              Статус
              <span v-if="sort.key != 'status'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>
            <div class="flex-table-col flex-table-col-2 sortable" @click="sortBy('role')">
              Роль
              <span v-if="sort.key != 'role'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>
            <div class="flex-table-col flex-table-col-2"></div>
          </div>
          <div class="flex-table-row" style="height: 44px;">
            <div class="flex-table-col flex-table-col-1">
              <input class="form-control" type="text" @change="onChangeFilter('id')" v-model="filters.id" />
            </div>
            <div class="flex-table-col flex-table-col-3">
              <input class="form-control" type="text" @change="onChangeFilter('login')" v-model="filters.login" />
            </div>
            <div class="flex-table-col flex-table-col-2">
              <input class="form-control" type="text" @change="onChangeFilter('name')" v-model="filters.name" />
            </div>
            <div class="flex-table-col flex-table-col-2">
              <select
                class="form-control"
                @change="onChangeFilter('status')"
                v-model="filters.status"
              >
                <option value>Все</option>
                <option
                  v-for="(el, key) in user_model.status"
                  :key="key"
                  :value="el.value"
                >{{el.text}}</option>
              </select>
            </div>
            <div class="flex-table-col flex-table-col-2">
              <select class="form-control" @change="onChangeFilter('role')" v-model="filters.role">
                <option value>Все</option>
                <option
                  v-for="(el, key) in user_model.role"
                  :key="key"
                  :value="el.value"
                >{{el.text}}</option>
              </select>
            </div>
            <div class="flex-table-col flex-table-col-2"></div>
          </div>
        </div>
        <loader v-if="loading"></loader>
        <div class="flex-table-body" style="top: 68px;">
          <div v-for="(el, key) in data" :key="key" class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">{{el.id}}</div>
            <div class="flex-table-col flex-table-col-3">{{el.login}}</div>
            <div class="flex-table-col flex-table-col-2">{{el.name}}</div>
            <div class="flex-table-col flex-table-col-2">
              {{user_model.status.find(x => x.value == el.status)
              ? user_model.status.find(x => x.value == el.status).text
              : ""}}
            </div>
            <div class="flex-table-col flex-table-col-2">
              {{user_model.role.find(x => x.value == el.role)
              ? user_model.role.find(x => x.value ==el.role).text
              : ""}}
            </div>
            <div class="flex-table-col flex-table-col-2">
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
import fitch_all_1 from "@/mixings/fitch_all_1";

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
    };
  }
};
</script>