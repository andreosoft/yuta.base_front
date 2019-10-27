<template>
  <form1 :breadcrumbs="[{url: '#/', title: 'Домой'}, {url: '', title: title}]" :loading="loading">
    <template v-slot:title>{{title}}</template>
    <template v-slot:body>
      <div class="row" style="margin-top: 10px;">
        <div class="col">Показано: {{data.length}} из {{pager.count}}</div>
        <div class="col text-right">
          <div v-if="pages.page.length > 0" style="margin:-13px 0px 0px 0px; white-space: nowrap;">
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
        style="top: 115px; left: 15px; right: 15px; min-width: 500px;"
      >
        <div class="flex-table-header">
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-2">Время Звонка</div>
            <div class="flex-table-col flex-table-col-1">Статус</div>
            <div class="flex-table-col flex-table-col-2">Ответственный</div>
            <div class="flex-table-col flex-table-col-2">Клиент</div>
            <div class="flex-table-col flex-table-col-2">Номер телефона</div>
            <div class="flex-table-col flex-table-col-3">Запись разговора</div>
          </div>
        </div>
        <!---->
        <div class="flex-table-body">
          <div v-for="(el, key) in data" :key="key" class="flex-table-row">
            <div class="flex-table-col flex-table-col-2">{{el.calldatetime}}</div>
            <div class="flex-table-col flex-table-col-1">
              <span v-if="el.status == 'BUSY'" class="status-label badge-pill badge-warning">
                <i v-if="el.direction == 1" class="fas fa-arrow-down"></i>
                <i v-if="el.direction == 0" class="fas fa-arrow-up"></i> Занято
              </span>
              <span v-if="el.status == 'SUCCESS'" class="status-label badge-pill badge-success">
                <i v-if="el.direction == 1" class="fas fa-arrow-down"></i>
                <i v-if="el.direction == 0" class="fas fa-arrow-up"></i> Завершен
              </span>
              <span v-if="el.status == 'CANCEL'" class="status-label badge-pill badge-danger">
                <i v-if="el.direction == 1" class="fas fa-arrow-down"></i>
                <i v-if="el.direction == 0" class="fas fa-arrow-up"></i> Нет ответа
              </span>
            </div>
            <div class="flex-table-col flex-table-col-2">Ответственный не задан</div>
            <div class="flex-table-col flex-table-col-2">
              <a href>Клинет не найден</a>
            </div>
            <div class="flex-table-col flex-table-col-2">{{el.phone}}</div>
            <div class="flex-table-col flex-table-col-3" v-html="player(el.uuid)"></div>
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

export default {
  mixins: [fitch_all_1, base_input_1],
  components: {},
  data: function() {
    return {
      api: api.calls,
      loading: false,
      title: "Звонки",
      data: []
    };
  },
  methods: {
    player: function(url) {
      return (
        '<audio style="calls-audio" controls>' +
        '<source src="http://212.112.116.211:8081/api/rec?token=9e00e59a-fe18-47ad-9f72-731e3cb1953f&rec=' +
        url +
        '"' +
        ' type="audio/mpeg"/></audio>'
      );
    }
  }
};
</script>