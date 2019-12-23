<template>
  <div>
    <h5 class="pt-3 pb-2 mb-0 border-bottom text-center">Список сделок</h5>
    <div class="pt-2 pb-2 border-bottom border-gray">
      <loader v-if="loading"></loader>
      <div v-if="data && data.length > 0" class="pb-2">
        <div class="container">
          <div
            class="pb-2 pt-2 row border-bottom border-gray align-items-center"
            v-for="(el, key) of data"
            :key="key"
          >
            <div class="col-1">{{el.id}}</div>
            <div class="col-4">{{el.createdon}}</div>
            <div class="col-3">{{el.status}}</div>
            <div class="col-4">
              <router-link
                :to="{ name: 'deals_view', params: { id: el.id }}"
                title="Открыть сделку"
                class="btn btn-primary btn-block"
              >Открыть сделку</router-link>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="mb-0 text-center">Нет сделок!</p>
        <p class="text-center">Тут вы можете создать сделки для данного контакта</p>
      </div>
      <button class="btn btn-primary btn-block" title="Добавить сделку" @click="form_deal = true">
        <i class="far fa-plus"></i> Добавить сделку
      </button>
      <form-deal
        v-if="form_deal"
        @close-menu="form_deal = false"
        @data-update="updateRoute()"
        :data="{contact_id: $route.params.id}"
      ></form-deal>
    </div>
  </div>
</template>
<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import formDeal from "@/views/deals/form_deal.vue";
import axios from "axios";

export default {
  mixins: [],
  components: {
    loader,
    formDeal
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
        .get(api.contact_get_deals, {
          params: {
            contact_id: this.$route.params.id
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