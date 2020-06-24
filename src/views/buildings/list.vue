<template>
  <div>
    <loader v-if="loading"></loader>
    <widget-list
      :id="$route.params.id"
      @change="$router.push({ name: 'apartment_view', params: { id: $event.id }})"
    ></widget-list>
  </div>
</template>

<script>
import widgetList from "./widget_list.vue";
import editApartments from "./edit_apartments.js";

export default {
  mixins: [editApartments],
  components: {
    widgetList
  }
};
</script>