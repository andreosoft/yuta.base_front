<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{fields.number}}</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '#/buildings', title: 'Мои Объекты'}, {url: '', title: fields.number}]"
          ></breadcrumb>
        </div>
      </div>
      <div class="float-right">
        <span style="padding-left: 4px; position: relative; display: inline-block;">
          <button class="btn btn-primary" title="Редактировать" @click="form_apartment = true">
            <i class="far fa-save"></i> Редактировать
          </button>
        </span>
        <transition name="slide-fade">
          <form-apartment v-if="form_apartment" :data="fields" @close-menu="form_apartment = false"></form-apartment>
        </transition>
        <!-- <span style="padding-left: 4px;">
          <button class="btn btn-danger" title="Закрыть" @click="remove()">
            <i class="far fa-times-circle"></i> Удалить
          </button>
        </span>-->
      </div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-md-12 col-lg-12 col-xl-5">
        <widgetInfo :fields="fields" :loading="loading"></widgetInfo>
      </div>

      <div class="col-md-12 col-lg-12 col-xl-7">
        <div v-for="(el, key) in deals" :key="key">
          <viewDeal :id="el.id"></viewDeal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import breadcrumb from "@/views/common/breadcrumb.vue";
import formApartment from "./form_apartment.vue";
import router from "@/config/router";
import axios from "axios";
import widgetInfo from "./widget_info";
import viewDeal from "@/views/deals/view1";

export default {
  components: {
    breadcrumb,
    formApartment,
    widgetInfo,
    viewDeal
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      loading: false,
      fields: {},
      form_apartment: false,
      deals: 0
    };
  },
  created() {
    this.updateRoute();
  },
  watch: {
    $route: "updateRoute"
  },
  methods: {
    updateRoute: function() {
      this.fetchData();
    },
    fetchData() {
      var id = this.$route.params.id;
      this.fetch(id);
    },
    fetch(id) {
      this.loading = true;
      axios
        .get(api.apartment, { params: { id: id } })
        .then(response => {
          this.loading = false;
          this.fields = response.data.data;
          this.fetchDeals(this.fields.id);
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchDeals(id) {
      this.loading = true;
      axios
        .get(api.deal, {
          params: { filters: { apartment_id: id }, sort: { id: "desc" } }
        })
        .then(response => {
          this.loading = false;
          this.deals = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>