<template>
  <div>
    <div class="row" style="margin-top: 10px;">
      <div class="col">Показано: {{data.length}} из {{pager.count}}</div>
      <div class="col text-right">
        <div v-if="pages.page > 1" style="margin:-13px 0px 0px 0px; white-space: nowrap;">
          <button
            class="btn btn-secondary btn-round"
            style="margin: 2px;"
            @click="$emit('set-page', 0)"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button
            v-for="(item, key) in pages.page"
            :key="key"
            @click="$emit('set-page', item)"
            class="btn btn-round"
            :class="item == pages.current ? 'btn-primary' : 'btn-secondary'"
            style="margin: 2px;"
          >{{item + 1}}</button>
          <button
            class="btn btn-secondary btn-round"
            style="margin: 2px;"
            @click="$emit('set-page', pages.maxPage)"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="flex-table fixed style-1" :style="style_table">
      <div class="flex-table-header">
        <slot name="header"></slot>
      </div>
      <div class="flex-table-body" :style="style_body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    pager: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pages: {
      type: Object,
      default: () => {
        return {
          page: 0
        };
      }
    },
    style_table: {
      type: Object,
      default: () => {
        return {
          top: "60px",
          left: "15px",
          right: "15px",
          "min-width": "500px"
        };
      }
    },
    style_body: {
      type: Object,
      default: () => {
        return {
          top: "72px"
        };
      }
    }
  }
};
</script>