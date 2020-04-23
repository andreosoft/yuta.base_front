<template>
  <div>
    <div class="flex-table style-2" v-if="data_apartmets && data_apartmets.length > 0">
      <div class="flex-table-header">
        <div class="flex-table-row">
          <div class="flex-table-col flex-table-col-2">Номер помещения</div>
          <div class="flex-table-col flex-table-col-2">Кол-во комнат</div>
          <div class="flex-table-col flex-table-col-2">Площадь, м2</div>
          <div class="flex-table-col flex-table-col-2">Цена</div>
          <div class="flex-table-col flex-table-col-2">Статус</div>
          <div class="flex-table-col flex-table-col-2">Действия</div>
        </div>
      </div>
      <loader v-if="loading"></loader>
      <div class="flex-table-body">
        <div v-for="(el, key) in data_apartmets" :key="key" class="flex-table-row">
          <div class="flex-table-col flex-table-col-2">Квартира № {{el.number}}</div>
          <div class="flex-table-col flex-table-col-2">{{el.rooms}}</div>
          <div class="flex-table-col flex-table-col-2">{{el.square}}</div>
          <div class="flex-table-col flex-table-col-2">{{el.price}}</div>
          <div class="flex-table-col flex-table-col-2">
            {{$store.getters["db/structure"].crm_apartments.find(x => x.field_name == 'status').data.options.find(x => x.value == el.status)
            ? $store.getters["db/structure"].crm_apartments.find(x => x.field_name == 'status').data.options.find(x => x.value == el.status).text
            : ""}}
          </div>
          <div class="flex-table-col flex-table-col-2">
            <span>
              <span>
                <button class="btn" title="Редактировать помещение" @click="editApartment(el, key)">
                  <i class="far fa-pencil-alt color-primary"></i>
                </button>
              </span>
              <span>
                <button class="btn" title="Удалить помещение" @click="removeApartment(el, key)">
                  <i class="far fa-trash-alt color-danger"></i>
                </button>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <form-apartment
      v-if="form_apartment"
      :data="form_data_apartment"
      @close-menu="form_apartment = false"
      @data-update="update()"
    ></form-apartment>
  </div>
</template>
       
<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import router from "@/config/router";
import formApartment from "./form_apartment.vue";
import axios from "axios";
import { log } from "util";

export default {
  components: {
    loader,
    formApartment
  },
  props: {
    floor_id: String,
    apartments: Array,
    newAratment: Boolean
  },
  data: function() {
    return {
      loading: false,
      data_apartmets: this.apartments,
      form_data_apartment: {},
      form_apartment: false
    };
  },
  created() {
    this.update();
    this.$root.$on("create-new-apartment", data => {
      if (data.floor_id === this.floor_id) {
        this.addApartment();
      }
    });
  },
  watch: {
    floor_id: "update"
  },
  methods: {
    addApartment: function() {
      this.form_data_apartment = { floor_id: this.floor_id };
      this.form_apartment = true;
    },
    editApartment: function(el, key) {
      this.form_data_apartment = el;
      this.form_apartment = true;
    },
    update: function() {
      this.fetchData();
    },
    fetchData: function() {
      this.loading = true;
      axios
        .get(api.apartment, { params: { parent_id: this.floor_id } })
        .then(response => {
          this.loading = false;
          if (response.data.data == null) {
            this.data_apartmets = [];
          } else {
            this.data_apartmets = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    removeApartment: function(el, key) {
      if (confirm("Вы уверены, что хотите удалить помещение " + el.number)) {
        this.loading = true;
        axios({
          method: "delete",
          url: api.apartment,
          data: { ids: [el.id] },
          params: {}
        })
          .then(response => {
            this.loading = false;
            this.$root.$emit("show-info", {
              text: "помещение " + el.number + " удалено",
              class: "alert"
            });
            this.update();
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>