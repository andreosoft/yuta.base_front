<template>
  <div class="my-3 p-3 bg-white rounded shadow">
    <h4 class="pb-2 mb-0">Информация о контакте</h4>
    <loader v-if="loading"></loader>
    <div class="media text-muted">
      <div class="row">
        <div
          class="col-md-12 border-top border-gray pb-2 pt-2 mb-0"
          v-for="(el, key) in $store.getters['db/structure'].crm_contacts"
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
    fields: Object,
    loading: Boolean
  }
};
</script>