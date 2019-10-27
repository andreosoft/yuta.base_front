<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1><slot name="title"></slot></h1>
          <breadcrumb v-bind:data="breadcrumbs"></breadcrumb>
        </div>
      </div>
      <div class="float-right">
        <div>
            <slot name="right"></slot>
          </div>
      </div>
    </div>
    <div class="separator"></div>
    <loader v-if="loading"></loader>
    <div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
import loader from "@/widgets/common/loader.vue";
import breadcrumb from "@/widgets/common/breadcrumb.vue";

export default {
  components: {
    loader,
    breadcrumb
  },
  props: {
    breadcrumbs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>