<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="row card-group card-columns justify-content-start">
      <div class="col-md-6 col-lg-6 col-xl-3" v-for="(el, key) of data" :key="key">
        <div class="card">
          <img :src="url_upload + el.image" class="card-img-top" alt />
          <div class="card-body">
            <h5 class="card-text text-center">Жилой комплекс: {{el.object_name}}</h5>
            <h5 class="card-title text-center">{{el.name}}</h5>
            <a @click="$emit('change', el.id); $emit('input', el.id)"
              class="btn btn-primary btn-block"
            >Открыть</a>
            <!-- <a
              :to="{ name: 'buildings_list', params: { id: el.id }}"
              class="btn btn-primary btn-block"
            >Открыть</a>-->
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
import fitch_all_1 from "@/mixings/fitch_all_1";

export default {
  mixins: [fitch_all_1],
  components: {
    loader
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.manager.buildings,
      loading: false,
      data: []
    };
  }
};
</script>