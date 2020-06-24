<template>
  <div class="my-3 p-3 bg-white rounded shadow">
    <h5 class="border-bottom border-gray pb-2 mb-0">
      Информация о сделке
      <span v-if="showlink">
        <router-link
          :to="{name: 'deals_view', params: {id: fields.id}}"
          title="Открыть сделку"
          class="btn btn-primary"
        >Открыть сделку</router-link>
      </span>
    </h5>
    <loader v-if="loading"></loader>
    <div class="media text-muted pt-3">
      <div class="row">
        <div
          class="col-md-12 border-top border-gray pb-2 pt-2 mb-0"
          v-for="(el, key) in $store.getters['db/structure'].crm_deals"
          :key="key"
        >
          {{el.name}}:
          <b>
            <view-element :el="el" :fields="fields"></view-element>
          </b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";

export default {
  components: { loader, viewElement },
  props: {
    showlink: {
      type: Boolean,
      default: false
    },
    fields: Object,
    loading: Boolean
  }
};
</script>