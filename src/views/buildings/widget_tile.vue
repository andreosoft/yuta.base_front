<template>
  <div style="padding-top: 20px;">
    <div class="tails-list" v-if="$store.getters['db/structure'].crm_apartments">
      <span
        v-for="(el, key) of $store.getters['db/structure'].crm_apartments.find(x => x.field_name == 'status').data.options"
        :key="key"
      >
        <span class="tail-color" :style="{'background-color': el.color}"></span>
        {{el.text}}
      </span>
    </div>
    <div v-if="data">
      <div class="tails-block">
        <div class="tails-floors">
          <div class="tails-header"></div>
          <div class="tails-row" v-for="i in floor_gen">
            <div class="tails-floor">{{i}}</div>
          </div>
        </div>
        <div class="tails-apartmets" v-for="(section, key_section) of data.sec" :key="key_section">
          <div class="tails-header">подъезд {{section}}</div>
          <div class="tails-row" v-for="i in floor_gen">
            <div
              v-if="data.aparts[section] !== null && typeof data.aparts[section][i] !== 'undefined' && data.aparts[section][i] !== 'undefined'"
            >
              <div
                style="cursor: pointer"
                class="tails-apartmet"
                :title="getTitle(apart)"
                @click="$emit('change', {id: apart.apartment_id, view: apart.apartment} )"
                v-for="(apart, key_apart) of data.aparts[section][i]"
                :key="key_apart"
                :style="{'background-color': get_color(apart)}"
              >
                <div>{{apart.rooms}}к. {{apart.square}}м2</div>
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
import fitch_all from "@/mixings/fitch_all_2";
import axios from "axios";

export default {
  mixins: [fitch_all],
  components: {
    loader
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
      api: api.manager.tile,
      loading: false,
      data: [],
      floor_gen: []
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
    getTitle: function(apart) {
      return (
        this.get_status(apart) +
        "\n" +
        "Номер квартиры: " +
        apart.apartment +
        "\n" +
        "Площадь: " +
        apart.square +
        "\n" +
        "Подъезд: " +
        apart.section +
        "\n" +
        "Этаж: " +
        apart.floor +
        "\n" +
        "Дом: " +
        apart.building +
        "\n"
      );
    },
    get_color: function(apart) {
      if (this.$store.getters["db/structure"].crm_apartments) {
        return this.$store.getters["db/structure"].crm_apartments
          .find(x => x.field_name == "status")
          .data.options.find(x => x.value == apart.status)
          ? this.$store.getters["db/structure"].crm_apartments
              .find(x => x.field_name == "status")
              .data.options.find(x => x.value == apart.status).color
          : "#fff";
      }
    },
    get_status: function(apart) {
      if (this.$store.getters["db/structure"].crm_apartments) {
        return this.$store.getters["db/structure"].crm_apartments
          .find(x => x.field_name == "status")
          .data.options.find(x => x.value == apart.status)
          ? this.$store.getters["db/structure"].crm_apartments
              .find(x => x.field_name == "status")
              .data.options.find(x => x.value == apart.status).text
          : "не задано";
      }
    },
    floor_generator: function() {
      this.floor_gen = [];
      for (
        var i = parseInt(this.data.floor.max_floor);
        i >= parseInt(this.data.floor.min_floor);
        i--
      ) {
        this.floor_gen.push(i);
      }
    },
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
            this.floor_generator();
          }
        });
    }
  }
};
</script>

<style lang="scss">
.tails-list {
  .tail-color {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
}
.tails-block {
  margin: 10px 0 0 0;
  display: flex;
  border-bottom: 1px solid #a1a6aa;
  background: transparent url(/img/place.png) repeat-x bottom;
}
.tails-floors {
  display: inline-block;
}
.tails-floor {
  width: 17px;
  height: 20px;
  margin: 0 5px;
  color: #888;
}
.tails-apartmets {
  cursor: pointer;
  display: inline-block;
  padding: 0 5px;
}
.tails-apartmet {
  display: inline-block;
  width: 100px;
  height: 25px;
  margin: 0 5px;
  text-align: center;
  padding: 0px 0;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.tails-header {
  display: block;
  height: 20px;
  text-align: center;
}
.tails-row {
  display: block;
  height: 25px;
  margin: 5px 0;
}
</style>