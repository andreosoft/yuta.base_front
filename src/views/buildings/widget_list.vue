<template>
  <div>
    <div v-if="data">
      <div class="row" style="margin-top: 10px;">
        <div class="col">Показано: {{data.length}}</div>
        <div class="col text-right"></div>
      </div>
      <div
        class="flex-table fixed style-1"
        style="top:150px; left:15px; right: 15px; min-width: 500px;"
      >
        <div class="flex-table-header">
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-2 sortable" @click="sortBy('apartment')">
              Номер помещения
              <span v-if="sort.key != 'apartment'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>

            <div class="flex-table-col flex-table-col-1 sortable" @click="sortBy('price')">
              Стоимость
              <span v-if="sort.key != 'price'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>

            <div class="flex-table-col flex-table-col-1 sortable" @click="sortBy('square')">
              Площадь, м2
              <span v-if="sort.key != 'square'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>

            <div class="flex-table-col flex-table-col-1 sortable" @click="sortBy('status')">
              Статус
              <span v-if="sort.key != 'status'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>

            <div class="flex-table-col flex-table-col-1 sortable" @click="sortBy('rooms')">
              Кол-во комнат
              <span v-if="sort.key != 'rooms'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>

            <div class="flex-table-col flex-table-col-1 sortable" @click="sortBy('section')">
              Подъезд
              <span v-if="sort.key != 'section'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>

            <div class="flex-table-col flex-table-col-1 sortable" @click="sortBy('floor')">
              Этаж
              <span v-if="sort.key != 'floor'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>

            <div class="flex-table-col flex-table-col-2 sortable" @click="sortBy('building')">
              Название дома
              <span v-if="sort.key != 'building'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>

            <div class="flex-table-col flex-table-col-2 sortable" @click="sortBy('object')">
              Название ЖК
              <span v-if="sort.key != 'object'">
                <i class="fas fa-sort"></i>
              </span>
              <span v-else class="arrow">
                <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
              </span>
            </div>
          </div>

          <!-- <div class="flex-table-row" style="height: 44px;">
            <div class="flex-table-col flex-table-col-2">
              <input
                class="form-control"
                type="text"
                @change="onChangeFilter('id')"
                v-model="filters.id"
              />
            </div>
            <div class="flex-table-col flex-table-col-1">
              <input
                class="form-control"
                type="text"
                @change="onChangeFilter('name')"
                v-model="filters.name"
              />
            </div>
            <div class="flex-table-col flex-table-col-1">
              <input
                class="form-control"
                type="text"
                @change="onChangeFilter('address')"
                v-model="filters.address"
              />
            </div>
            <div class="flex-table-col flex-table-col-1">
              <input
                class="form-control"
                type="text"
                @change="onChangeFilter('address')"
                v-model="filters.address"
              />
            </div>
            <div class="flex-table-col flex-table-col-1">
              <input
                class="form-control"
                type="text"
                @change="onChangeFilter('address')"
                v-model="filters.address"
              />
            </div>
            <div class="flex-table-col flex-table-col-1">
              <input
                class="form-control"
                type="text"
                @change="onChangeFilter('address')"
                v-model="filters.address"
              />
            </div>
            <div class="flex-table-col flex-table-col-1">
              <input
                class="form-control"
                type="text"
                @change="onChangeFilter('address')"
                v-model="filters.address"
              />
            </div>
            <div class="flex-table-col flex-table-col-2">
              <input
                class="form-control"
                type="text"
                @change="onChangeFilter('address')"
                v-model="filters.address"
              />
            </div>
            <div class="flex-table-col flex-table-col-2">
              <input
                class="form-control"
                type="text"
                @change="onChangeFilter('address')"
                v-model="filters.address"
              />
            </div>
            <div class="flex-table-col flex-table-col-2"></div> 
          </div>-->
        </div>
        <loader v-if="loading"></loader>
        <div class="flex-table-body" style="top: 28px;">
          <a
            @click="$emit('change', {id: el.apartment_id, view: el.apartment} )"
            v-for="(el, key) in data"
            :key="key"
            class="flex-table-row"
            
          >
            <div class="flex-table-col flex-table-col-2">{{el.apartment}}</div>
            <div class="flex-table-col flex-table-col-1">{{el.price}}</div>
            <div class="flex-table-col flex-table-col-1">{{el.square}}</div>
            <div class="flex-table-col flex-table-col-1">
              {{$store.getters['db/structure'].crm_apartments.find(x => x.field_name == 'status').data.options.find(x => x.value == el.status)
              ? $store.getters['db/structure'].crm_apartments.find(x => x.field_name == 'status').data.options.find(x => x.value == el.status).text
              : ""}}
            </div>
            <div class="flex-table-col flex-table-col-1">{{el.rooms}}</div>
            <div class="flex-table-col flex-table-col-1">{{el.section}}</div>
            <div class="flex-table-col flex-table-col-1">{{el.floor}}</div>
            <div class="flex-table-col flex-table-col-2">{{el.building}}</div>
            <div class="flex-table-col flex-table-col-2">{{el.object}}</div>
          </a>
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

export default {
  mixins: [fitch_all_1],
  components: {
    loader
  },
  props: {
    id: String
  },
  data: function() {
    return {
      api: api.manager.list,
      loading: false,
      data: []
    };
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