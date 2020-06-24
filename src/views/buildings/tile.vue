<template>
  <div>
    <loader v-if="loading"></loader>
    <widget-tile
      :id="$route.params.id"
      @change="$router.push({ name: 'apartment_view', params: { id: $event.id }})"
    ></widget-tile>
  </div>
</template>

<script>
import widgetTile from "./widget_tile.vue";
import editApartments from "./edit_apartments.js";

export default {
  mixins: [editApartments],
  components: {
    widgetTile
  }
};
</script>
