<template>
  <div>
    <div class="left-menu">
        <MenuItem
          class="left-menu-item"
          v-for="(el, index) in $root.mainMenu.data"
          :key="index"
          :element="el">
        </MenuItem>
       
    </div>
  </div>
</template>

<script>
import MenuItem from '@/views/common/menu/menuItem.vue'

export default {
    components: {
      MenuItem
    }
  }
</script>

<style lang="scss">
.left-menu-item>a, .left-menu-item>button {
  color: #303030;
  display: block;
  padding: 16px 8px;
  text-align: center;
  background: none;
  border: none;
  margin: auto;
  outline: none;
  border-bottom: 1px solid #f3f3f3;
  i {
    font-size: 24px;
  }
  &:hover {
    background: #eee;
    text-decoration: none;
  }
  &.router-link-active {
    color: #fff;
    background: #7cb342;
    text-decoration: none;
  }
}

</style>
