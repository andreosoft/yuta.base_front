<template>
  <div>
    <header-block></header-block>
    <div class="content" :class="$root.showMenu ? 'menu-active' : ''">
      <div class="left-side">
        <menu-block></menu-block>
      </div>
      <div class="right-side panel-primary">
        <router-view/>
      </div>
      <div class="content-block">
      </div>
    </div>
    <v-info></v-info>
  </div>
</template>

<script>
import Header from '@/views/common/header.vue'
import MenuBlock from '@/views/common/menu/menuBlock.vue'
import auth from '@/libs/auth'
import Info from "@/widgets/Info.vue"

export default {
  mixins: [auth],
  components: {
    'menu-block': MenuBlock,
    'header-block': Header,
    'v-info': Info
  },
  created() {
    this.$store.dispatch('db/structure')
  }
}
</script>

<style lang="less">
.left-side {
  transition: all .5s;
  display: block;
  width: 100px;
  margin: 0;
  padding-top: 30px;
  bottom: 0;
  position: absolute;
  top: 0px;
  left: -100px;
  overflow: auto;
  background: #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}

.menu-active {
  .left-side {
    left: 0;
  }
  .right-side {
    left: 100px;
  }
}
.right-side {
  margin: 40px 10px 10px 10px;
  padding: 20px;
  bottom: 0;
  position: absolute;
  top: 0px;
  overflow: auto;
  background: #fff;
  right: 0;
  left: 0;
  transition: all .5s;
}

// @media (min-width: 768px) {
//   .left-side {
//     left: 0;
//   }
//   .right-side {
//     left: 100px;
//   }
// }
</style>
