<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{title}}</h1>
          <breadcrumb v-bind:data="[{url: '#/', title: 'Домой'}, {url: '', title: title}]"></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <loader v-if="loading"></loader>
    <div>
      <div>
        <ul class="nav nav-tabs">
          <li class="nav-item" v-for="(el, key) of data_tabs" :key="key">
            <router-link class="nav-link" :to="{name: el.route}" :title="el.title">{{el.name}}</router-link>
          </li>
        </ul>
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import router from "@/config/router";

export default {
  components: {
    loader,
    breadcrumb
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      loading: false,
      title: "Мои Объекты",
      data_tabs: [
        {
          name: "Список",
          route: "buildings_list",
          title: "Открыть вид Список"
        },
        {
          name: "Плитка",
          route: "buildings_tile",
          title: "Открыть вид плитки"
        },
        {
          name: "Этажи",
          route: "buildings_floors",
          title: "Открыть вид Этажи"
        },
        {
          name: "Планировки",
          route: "buildings_plans",
          title: "Открыть вид Планировки"
        },
        {
          name: "Фасады",
          route: "buildings_facades",
          title: "Открыть вид Фасады"
        }
      ]
    };
  }
};
</script>