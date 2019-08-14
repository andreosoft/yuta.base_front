<template>
  <div>
    <div>
      <button class="btn btn-primary" title="Добавить подъезд" @click="addNewFloor()">
        <i class="far fa-plus"></i> Добавить этаж
      </button>
    </div>
    <div>
      <div
        class=""
        style="width: 100%; margin: 5px 0; border: 1px solid #eee;"
        v-for="(el, key) of data_floors"
        :key="key"
      >
        <div class="clearfix">
          <div class="float-left">{{el.floor}}</div>
          <div class="float-right">
            <span>
              <button class="btn" title="Добавить квартиру" @click="$root.$emit('create-new-apartment', {floor_id: el.id})">
                <i class="far fa-plus color-primary"></i>
              </button>
            </span>
            <span>
              <button class="btn" title="Редактировать этаж" @click="editFloor(el, key)">
                <i class="far fa-pencil-alt color-primary"></i>
              </button>
            </span>
            <span>
              <button class="btn" title="Удалить этаж" @click="removeFloor(el, key)">
                <i class="far fa-trash-alt color-danger"></i>
              </button>
            </span>
          </div>
        </div>
        <div>
            <view-apartments :floor_id="el.id" :apartments="el.apartments"></view-apartments>
        </div>
      </div>
    </div>
    <form-floor
      v-if="form_floor"
      :data="form_data_floor"
      @close-menu="form_floor = false"
      @data-update="update()"
    ></form-floor>
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import router from "@/config/router";
import formFloor from "./form_floor.vue";
import formApartment from "./form_apartment.vue";
import viewApartments from "./view_apartments.vue";
import axios from "axios";

export default {
  components: {
    loader,
    formFloor,
    formApartment,
    viewApartments
  },
  props: {
    section_id: String
  },
  data: function() {
    return {
      loading: false,
      form_floor: false,
      data_floors: [],
      form_data_floor: {},
    };
  },
  created() {
    this.update();
  },
  watch: {
    section_id: "update"
  },
  methods: {
    addNewFloor: function() {
      this.form_data_floor = { section_id: this.section_id };
      this.form_floor = true;
    },
    editFloor: function(el, key) {
      this.form_data_floor = el;
      this.form_floor = true;
    },
    update: function() {
      this.fetchData();
    },
    fetchData: function() {
      this.loading = true;
      axios
        .get(api.floor, { params: { parent_id: this.section_id } })
        .then(response => {
          this.loading = false;
          if (response.data.data == null) {
            this.data_floors = [];
          } else {
            this.data_floors = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    removeFloor: function(el, key) {
      if (confirm("Вы уверены, что хотите удалить этаж " + el.floor)) {
        this.loading = true;
        axios({
          method: "delete",
          url: api.floor,
          data: { ids: [el.id] },
          params: {}
        })
          .then(response => {
            this.loading = false;
            this.$root.$emit("show-info", {
              text: "этаж " + el.floor + " удален",
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