<template>
  <span>
    <span v-if="sort.key != 'id'">
      <i class="fas fa-sort"></i>
    </span>
    <span v-else class="arrow">
      <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          key: "",
          order: "",
          name: ""
        };
      }
    }
  }
};
</script>