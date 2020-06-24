<template>
  <div>
    <div v-if="el.type == 'select'">
      <bselect v-model="val" @change="onChange" :all="true" :options="el.data.options"></bselect>
    </div>
    <div v-else-if="el.type == 'select_api'">
      <bselect-api :api="el.data.api" @change="onChange" v-model="val" :all="true"></bselect-api>
    </div>
    <div v-else>
      <input class="form-control" type="text" @change="onChange" v-model="val" />
    </div>
  </div>
</template>

<script>
import bselect from "@/widgets/binputs/select.vue";
import bselectApi from "@/widgets/binputs/selectApi.vue";

export default {
  components: {
    bselect,
    bselectApi
  },
  props: {
    el: Object,
    value: String
  },
  computed: {
    val: {
      get: function() {
        return this.value;
      },
      set: function(v) {
        this.$emit("input", v);
      }
    }
  },
  methods: {
    onChange: function(v) {
      this.$emit("change", v);
    }
  }
};
</script>