<template>
  <span>
    <span v-if="el.type == 'select'">{{el.data.options.getTextByValue(fields[el.field_name])}}</span>
    <span v-else-if="el.type == 'status'">
      <span
        class="status-label badge-pill badge-success" :style="{background: el.data.options.find(x => x.value == fields[el.field_name])
        ? el.data.options.find(x => x.value == fields[el.field_name]).color
        : ''}" 
      >{{el.data.options.getTextByValue(fields[el.field_name])}}</span>
    </span>
    <span v-else-if="el.type == 'select_api'">
      {{fields[el.data.field_view]}}
    </span>
    <span v-else-if="el.type == 'ref'">
      {{fields[el.data.field_view]}}
      <a
        v-if="el.data.link_view"
        @click.stop="routerTo({ name: el.data.link_view.to, params: { id: fields[el.field_name] }})"
        :title="el.data.link_view.title"
        v-html="el.data.link_view.icon"
      ></a>
    </span>
    <span v-else>{{fields[el.field_name]}}</span>
  </span>
</template>

<script>
import router from "@/config/router";

export default {
  props: {
    el: Object,
    fields: Object
  },
  methods: {
    routerTo: function(to) {
      router.push(to);
    }
  }
};
</script>
