<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{title}}</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'}, {url: '', title: 'Настройки'}]"
          ></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <loader v-if="loading"></loader>
    <div>
      <div>
        <tree-options @remove="onRemove" @change="onChange" @create="onChangeAddItem" :value="$store.getters['options/getall']"></tree-options>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import router from "@/config/router";
import treeOptions from "@/widgets/tree_options/tree_block.vue";

export default {
  components: {
    loader,
    breadcrumb,
    treeOptions
  },
  data: function() {
    return {
      loading: false,
      title: "Настройки",
    };
  },
  methods: {
    onRemove: function(e) {
      this.$store.dispatch("options/remove", e.i);
      this.$forceUpdate();
    },
    onChange: function(e) {
      this.$store.dispatch("options/update", e);
      this.$forceUpdate();
    },
    onChangeAddItem: function(e) {
      this.$store.dispatch("options/create", e);
      this.$forceUpdate();
    }
  }
};
</script>