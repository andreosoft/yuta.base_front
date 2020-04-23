<template>
  <div>
    <widget-tile :id="$route.params.id"></widget-tile>
  </div>
</template>

<script>
import widgetTile from './widget_tile.vue';

export default {
  components: {
    widgetTile
  }
}
</script>
