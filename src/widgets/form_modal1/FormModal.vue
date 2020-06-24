<template>
    <div class="modal-background" @click="$emit('close-menu')">
      <div class="r-modal" @click="clickBody" :class="type">
        <div class="r-header">
          <div class="r-header-title">
            <div>
              <slot name="title"></slot>
            </div>
          </div>
          <div class="r-header-close">
            <button @click="$emit('close-menu')" title="Закрыть окно">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="r-body">
          <loader v-if="loading"></loader>
          <div>
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import loader from "@/widgets/common/loader.vue";

export default {
  components: {
    loader
  },
  props: {
    view: false,
    loading: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ""
    }
  },
  methods: {
    clickBody: function(e) {
      var evt = e ? e : window.event;
      if (evt.stopPropagation) {
        evt.stopPropagation();
      } else {
        evt.cancelBubble = true;
      }
      evt.cancelBubble = true;
      return false;
    }
  }
};
</script>