<template>
  <div class="color-picker-wrapper">
    <div class="color-picker-val" :style="{background: value}" @click="submenu = true"></div>
    <div class="color-picker" v-if="submenu">
      <div
        class="color-picker-element"
        v-for="(col, key) in colors"
        :key="key"
        :style="{background: col}"
        @click="$emit('change', col);$emit('input', col);submenu = false;"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data: function() {
    return {
      submenu: false,
      colors: ["#007bff", "#6610f2", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#6c757d"]
    };
  }
};
</script>

<style lang="scss">
.color-picker-wrapper {
}
.color-picker {
  position: absolute;
}
.color-picker-val {
  cursor: pointer;
  width: 40px;
  height: 20px;
  border: 1px solid #999;
  //   border-radius: 2px;
  //   box-shadow: inset 0px 0px 10px #000000a0;
}
.color-picker-element {
  cursor: pointer;
  width: 40px;
  height: 20px;
  border: 1px solid #999;
}
.color-picker-element:hover {
  opacity: 0.9;
}
</style>