<template>
  <div>
    <div class="tab-menu-nav">
      <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
        <div v-for="(el, key) of data_config" :key="key">
          <router-link
            class="nav-link"
            :to="el.route"
            :title="el.title"
          ><i :class="el.icon"></i> {{el.name}}</router-link>
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
          icon: 'fal fa-hotel',
          title: "Объекты"
        },
        {
          name: "Пользователи",
          route: "/config/users",
          icon: 'fas fa-users',
          title: "Пользователи"
        },
        {
          name: "Поля",
          route: "/config/string",
          icon: 'fal fa-ballot-check', 
          title: "Поля"
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