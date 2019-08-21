<template>
  <div style="padding-top: 20px;">
    <div class="tails-list">
      <span v-for="(el, key) of config.apartment.status" :key="key">
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
                class="tails-apartmet"
                v-for="(apart, key_apart) of data.aparts[section][i]"
                :key="key_apart"
                :style="{'background-color': get_color(apart)}"
              >
                <div>{{apart.rooms}}</div>
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
import fitch_all from "@/libs/mixings/fitch_all_2";
import axios from "axios";

export default {
  mixins: [fitch_all],
  components: {
    loader
  },
  data: function() {
    return {
      api: api.manager.tile,
      loading: false,
      config: config,
      data: [],
      floor_gen: []
    };
  },
  methods: {
    get_color: function(apart) {
      return this.config.apartment.status.find(x => x.value == apart.status)
        ? this.config.apartment.status.find(x => x.value == apart.status).color
        : "#fff";
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
            parent_id: this.$route.params.id,
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
  }
}
.tails-block {
  margin: 10px 0 0 0;
  display: flex;
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
  display: inline-block;
  padding: 0 5px;
}
.tails-apartmet {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 5px;
  text-align: center;
  padding: 0px 0;
  border-radius: 2px;
}
.tails-header {
  display: block;
  height: 20px;
}
.tails-row {
  display: block;
  height: 20px;
  margin: 5px 0;
}
</style>