<template>
  <div class="modal-background" @click="$emit('close-menu')">
    <transition name="right-modal">
      <div class="r-modal" @click="clickBody">
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
    </transition>
  </div>
</template>

<script>
import loader from "@/widgets/common/loader.vue";

export default {
  components: {
    loader
  },
  props: {
    loading: {
      type: Boolean,
      default: false
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