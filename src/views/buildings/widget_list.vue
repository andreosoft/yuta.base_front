<template>
  <div>
    <div v-if="data">
      <div class="row" style="margin-top: 10px;">
        <div class="col">Показано: {{data.length}}</div>
        <div class="col text-right"></div>
      </div>
      <div style="">
        <div style="overflow: hidden; position: absolute; left: 0;right: 0;bottom: 0;top: 70px;">
          <div style="position: relative; height: 100%; overflow-x: auto;">
            <div
              class="flex-table fixed style-1"
              style="top:0; left:0; right: 0; min-width: 1500px;"
            >
              <div class="flex-table-header">
                <div class="flex-table-row">
                  <div
                    class="flex-table-col sortable"
                    style="width: 100px"
                    @click="sortBy('apartment')"
                  >
                    Номер
                    <span v-if="sort.key != 'apartment'">
                      <i class="fas fa-sort"></i>
                    </span>
                    <span v-else class="arrow">
                      <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                    </span>
                  </div>

                  <div
                    class="flex-table-col sortable"
                    style="width: 100px"
                    @click="sortBy('price')"
                  >
                    Стоимость
                    <span v-if="sort.key != 'price'">
                      <i class="fas fa-sort"></i>
                    </span>
                    <span v-else class="arrow">
                      <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                    </span>
                  </div>

                  <div
                    class="flex-table-col sortable"
                    style="width: 100px"
                    @click="sortBy('square')"
                  >
                    Площ, м2
                    <span v-if="sort.key != 'square'">
                      <i class="fas fa-sort"></i>
                    </span>
                    <span v-else class="arrow">
                      <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                    </span>
                  </div>
                  <div
                    class="flex-table-col sortable"
                    style="width: 150px"
                    @click="sortBy(el.field_name)"
                    v-for="(el, key) in $store.getters['db/structure'].crm_apartments"
                    :key="key"
                  >
                    {{el.name}}
                    <span v-if="sort.key != el.field_name">
                      <i class="fas fa-sort"></i>
                    </span>
                    <span v-else class="arrow">
                      <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                    </span>
                  </div>

                  <div
                    class="flex-table-col sortable"
                    style="width: 100px"
                    @click="sortBy('rooms')"
                  >
                    Кол-во ком
                    <span v-if="sort.key != 'rooms'">
                      <i class="fas fa-sort"></i>
                    </span>
                    <span v-else class="arrow">
                      <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                    </span>
                  </div>

                  <div
                    class="flex-table-col sortable"
                    style="width: 100px"
                    @click="sortBy('section')"
                  >
                    Подъезд
                    <span v-if="sort.key != 'section'">
                      <i class="fas fa-sort"></i>
                    </span>
                    <span v-else class="arrow">
                      <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                    </span>
                  </div>

                  <div
                    class="flex-table-col sortable"
                    style="width: 100px"
                    @click="sortBy('floor')"
                  >
                    Этаж
                    <span v-if="sort.key != 'floor'">
                      <i class="fas fa-sort"></i>
                    </span>
                    <span v-else class="arrow">
                      <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                    </span>
                  </div>

                  <div
                    class="flex-table-col sortable"
                    style="width: 150px"
                    @click="sortBy('building')"
                  >
                    Название дома
                    <span v-if="sort.key != 'building'">
                      <i class="fas fa-sort"></i>
                    </span>
                    <span v-else class="arrow">
                      <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                    </span>
                  </div>

                  <div
                    class="flex-table-col sortable"
                    style="width: 150px"
                    @click="sortBy('object')"
                  >
                    Название ЖК
                    <span v-if="sort.key != 'object'">
                      <i class="fas fa-sort"></i>
                    </span>
                    <span v-else class="arrow">
                      <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                    </span>
                  </div>
                </div>
              </div>
              <loader v-if="loading"></loader>
              <div class="flex-table-body" style="top: 28px;">
                <a
                  @click="$emit('change', {id: el.apartment_id, view: el.apartment} )"
                  v-for="(el, key) in data"
                  :key="key"
                  class="flex-table-row"
                  style="cursor: pointer"
                >
                  <div class="flex-table-col" style="width: 100px">{{el.apartment}}</div>
                  <div class="flex-table-col" style="width: 100px">{{el.price}}</div>
                  <div class="flex-table-col" style="width: 100px">{{el.square}}</div>
                  <div
                    class="flex-table-col"
                    style="width: 150px"
                    v-for="(e, k) in $store.getters['db/structure'].crm_apartments"
                    :key="k"
                  >
                    <view-element :el="e" :fields="el"></view-element>
                  </div>
                  <div class="flex-table-col" style="width: 100px">{{el.rooms}}</div>
                  <div class="flex-table-col" style="width: 100px">{{el.section}}</div>
                  <div class="flex-table-col" style="width: 100px">{{el.floor}}</div>
                  <div class="flex-table-col" style="width: 150px">{{el.building}}</div>
                  <div class="flex-table-col" style="width: 150px">{{el.object}}</div>
                </a>
              </div>
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
import router from "@/config/router";
import fitch_all_1 from "@/mixings/fitch_all_2";
import axios from "axios";
import viewElement from "@/widgets/viewElement.vue";

export default {
  mixins: [fitch_all_1],
  components: {
    loader,
    viewElement
  },
  props: {
    update: {
      type: Boolean,
      default: false
    },
    id: String
  },
  data: function() {
    return {
      api: api.manager.list,
      loading: false,
      data: []
    };
  },
  watch: {
    update: function(v) {
      if (v) {
        this.fetchData();
        this.$emit("updated", { result: true });
      }
    }
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;
      axios
        .get(this.api, {
          params: {
            parent_id: this.id,
            sort: this.sort,
            filters: this.filters,
            pager: this.pager
          }
        })
        .then(response => {
          this.loading = false;
          if (response.data.data == null) {
            this.data = [];
          } else {
            this.data = response.data.data;
            this.pager = response.data.pager;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>