<template>
  <div>
    <div class="left-menu">
        <MenuItem
          class="left-menu-item"
          v-for="(el, index) in $root.mainMenu.data"
          :key="index"
          :element="el">
        </MenuItem>
        <div class="left-menu-item">
          <button class="btn-blank" style="padding: 22px 38px;"><i class="fal fa-cogs" title="настройки"></i></button>
        </div>
        <div class="left-menu-item" style="position: absolute; bottom: 0;">
          <button class="btn-blank" style="padding: 22px 38px;" @click="$root.logout"><i class="fal fa-sign-out-alt" title="Выйти"></i></button>
        </div>
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
