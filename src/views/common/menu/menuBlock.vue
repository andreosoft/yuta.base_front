<template>
  <div>
    <div class="left-menu-item" style="padding: 5px;">
      <router-link to="/profile"><img src="/img/icon-user-default.png" class="full-rounded" style="width: 100%;"></router-link>
    </div>
    <hr>
    <div class="left-menu">
        <MenuItem
          class="left-menu-item"
          v-for="(el, index) in $root.mainMenu.data"
          :key="index"
          :element="el">
        </MenuItem>
        <div class="left-menu-item">
          <button class="btn-blank" @click="$root.logout"><i class="fas fa-sign-out-alt" title="Выйти"></i></button>
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
  color: #777;
  display: block;
  padding: 16px 8px;
  text-align: center;
  background: none;
  border: none;
  margin: auto;
  outline: none;
  i {
    font-size: 24px;
  }
  &:hover {
    background: #eee;
  }
  &.router-link-active {
    color: var(--primary);
    background: #eee;
  }
}
</style>
