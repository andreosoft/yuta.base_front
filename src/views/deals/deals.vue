<template>
  <div>
    <h5 class="pt-3 pb-2 mb-0 border-bottom text-center">Список сделок</h5>
    <div class="pt-2 pb-2 border-bottom border-gray">
      <loader v-if="loading"></loader>
      <div v-if="data && data.length > 0" class="pb-2" style="overflow: auto;">
        <table class="table table-bordered table-hover table-sm">
          <thead class>
            <tr>
              <th scope="row">#</th>
              <th
                v-for="(el, key) in $store.getters['db/structure'].crm_deals"
                :key="key"
              >{{el.name}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(fields, k) in data"
              :key="k"
              style="cursor: pointer;"
              @click="$router.push({ name: 'deals_view', params: { id: fields.id }})"
            >
              <td>{{k+1}}</td>
              <td v-for="(el, key) in $store.getters['db/structure'].crm_deals" :key="key">
                <view-element :el="el" :fields="fields"></view-element>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p class="mb-0 text-center">Нет сделок!</p>
        <p class="text-center">Тут вы можете создать сделки для данного контакта</p>
      </div>
      <button class="btn btn-primary btn-block" title="Добавить сделку" @click="form_deal = true">
        <i class="far fa-plus"></i> Добавить сделку
      </button>
      <transition name="slide-fade">
        <form-deal
          v-if="form_deal"
          @close-menu="form_deal = false"
          @data-update="updateRoute()"
          :data="{contact_id: fields.contact_id, contact: fields.contact}"
        ></form-deal>
      </transition>
    </div>
  </div>
</template>
<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import formDeal from "@/views/deals/form_deal.vue";
import axios from "axios";
import viewElement from "@/widgets/viewElement.vue";

export default {
  mixins: [],
  components: {
    loader,
    formDeal,
    viewElement
  },
  props: {
    filters: Object,
    sort: {
      type: Object,
      default: () => {}
    },
    fields: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      loading: false,
      data: [],
      form_deal: false
    };
  },
  created() {
    this.updateRoute();
  },
  watch: {
    $route: "updateRoute"
  },
  methods: {
    updateRoute() {
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      axios
        .get(api.deal, {
          params: {
            sort: this.sort,
            filters: this.filters
          }
        })
        .then(response => {
          this.loading = false;
          if (response.data.data == null) {
            this.data = [];
          } else {
            this.data = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>