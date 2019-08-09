<template>
  <div class>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>Настройки</h1>
        </div>
      </div>
      <div class="float-right"></div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-3">
        <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
          <div v-for="(el, key) of data_config" :key="key">
            <div
              class="nav-link"
              :class="{active: tab_active_sections == key}"
              @click="set_active_tab_sections(el, key)"
            >{{el.name}}</div>
          </div>
        </div>
      </div>
      <div class="col-9">
        <div>
          <div v-if="tab_active_sections == 0">Конфиг1</div>
          <div v-if="tab_active_sections == 1">Конфиг2</div>
          <div v-if="tab_active_sections == 2">Конфиг3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      data_config: [
        {
          name: "Конфиг1"
        },
        {
          name: "Конфиг2"
        },
        {
          name: "Конфиг3"
        }
      ],
      tab_active_sections: 0
    };
  },
  methods: {
    set_active_tab_sections: function(el, key) {
      this.tab_active_sections = key;
    }
  }
};
</script>