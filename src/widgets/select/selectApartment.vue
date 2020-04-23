<template>
  <form-modal @close-menu="$emit('close-menu')" :loading="loading" type="fullscreen">
    <template v-slot:title>
      <div>Выберите здание</div>
    </template>
    <template v-slot:body>
      <div>
        <div v-if="building == null">
            <widget-building @input="building = $event;"></widget-building>
        </div>
        <div v-else>
          <div>
            <ul class="nav nav-tabs">
              <li class="nav-item" v-for="(el, key) of data_tabs" :key="key">
                <a class="nav-link" @click="selectedTab = key" :title="el.title">{{el.name}}</a>
              </li>
            </ul>
          </div>
          <div>
              <div v-if="selectedTab == 0">
                  <widget-list :id="building" @change="$emit('change', $event)"></widget-list>
              </div>
              <div v-else-if="selectedTab == 1">
                  <widget-tile :id="building" @change="$emit('change', $event)"></widget-tile>
              </div>
          </div>
        </div>
      </div>
    </template>
  </form-modal>
</template>

<script>
import FormModal from "@/widgets/form_modal1/FormModal.vue";
import widgetBuilding from "@/views/buildings/widget_building.vue";
import widgetList from "@/views/buildings/widget_list.vue";
import widgetTile from "@/views/buildings/widget_tile.vue";

export default {
  components: {
    FormModal,
    widgetBuilding,
    widgetList,
    widgetTile
  },

  data: function() {
    return {
      building: null,
      selectedTab: 0,
      data_tabs: [
        {
          name: "Список",
          title: "Открыть вид Список"
        },
        {
          name: "Плитка",
          title: "Открыть вид плитки"
        }
      ]
    };
  },
  methods: {
    onSelectBuilding: function(building) {}
  }
};
</script>