<template>
  <div>
    <widget-list :id="$route.params.id"></widget-list>
  </div>
</template>

<script>
import widgetList from './widget_list.vue';

export default {
  components: {
    widgetList
  }
}
</script>