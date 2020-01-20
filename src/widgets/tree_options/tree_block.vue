<template>
  <div class="tree">
    <ul v-if="value" style="padding: 0">
      <tree-item
        class="item"
        @remove="onRemove($event)"
        @change="onChange($event, index)"
        v-for="(el, index) in value"
        :key="index"
        :el="el"
        :index="index"
      ></tree-item>
      <tree-add-item :el="value" @change="onChangeAddItem($event)"></tree-add-item>
    </ul>
  </div>
</template>

<script>
import TreeItem from "./tree_item.vue";
import treeAddItem from "./tree_add_item";

export default {
  components: {
    TreeItem,
    treeAddItem
  },
  props: {
    value: Object
  },
  methods: {
    onRemove: function(index) {
      this.$emit('remove', {i: index});
      this.$forceUpdate();
    },
    onChange: function(e, index) {
      this.$emit('change', {v: e, i: index});
      this.$forceUpdate();
    },
    onChangeAddItem: function(e) {
      this.$emit('create', e);
      this.$forceUpdate();
    }
  }
};
</script>
