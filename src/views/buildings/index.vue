<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{title}}</h1>
          <breadcrumb v-bind:data="[{url: '#/', title: 'Домой'}, {url: '', title: title}]"></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <widget-building @input="$router.push({ name: 'buildings_list', params: { id: $event }})"></widget-building>
  </div>
</template>

<script>
import widgetBuilding from "./widget_building.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import router from "@/config/router";

export default {
  components: {
    widgetBuilding,
    breadcrumb
  },
  data: function() {
    return {
      title: "Мои Объекты",
    };
  }
};
</script>