<template>
  <div
    class="flex-table-col"
    :class="[sortable ? 'sortable' : '', class_col]"
    @click="$emit('sort-by', field)"
  >
    <slot></slot>
    <template v-if="sortable">
      <span v-if="sort.key != field">
        <i class="fas fa-sort"></i>
      </span>
      <span v-else class="arrow">
        <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
      </span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    sort: {
      type: Object,
      default: () => {}
    },
    sortable: {
      type: Boolean,
      default: false
    },
    class_col: {
      type: String,
      default: "flex-table-col-1"
    },
    field: {
      type: String,
      default: ""
    }
  }
};
</script>