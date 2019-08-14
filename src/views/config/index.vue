<template>
  <div>
    <div class="tab-menu-nav">
      <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
        <div v-for="(el, key) of data_config" :key="key">
          <router-link
            class="nav-link"
            :to="el.route"
            :title="el.title"
          >{{el.name}}</router-link>
        </div>
      </div>
    </div>
    <div class="tab-menu-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import router from '@/config/router'

export default {
  components: {},
  data: function() {
    return {
      data_config: [
        {
          name: "Объекты",
          route: "/config/objects",
          title: "Объекты"
        },
        {
          name: "Пользователи",
          route: "/config/users",
          title: "Пользователи"
        }
      ]
    };
  },
  created() {
    if (this.$route.name == 'config') {
      router.push({ path: this.data_config[0].route})
    }
  },
  methods: {}
};
</script>