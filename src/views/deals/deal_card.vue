<template>
  <div
    class="bg-white rounded px-3 pt-3 pb-3 border border-white"
    :style="{boxShadow: '0 0.5rem 1rem '+status_color+'a0 !important'}"
  >
    <div class="flex mt-2 justify-between items-center">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{field.name}}</p>
      <!-- <p
        class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
      >{{$store.getters["db/structure"].crm_deals.find(x => x.field_name == 'type').data.options.find(x => x.value == field.type).text }}</p> -->
    </div>
    <div class="flex mt-2 justify-between items-center">
      <p class="text-gray-600 font-semibold font-sans tracking-wide text-sm">Клиент:</p>
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{field.contact}}</p>
    </div>
    <div class="flex mt-2 justify-between items-center">
      <p class="text-gray-600 font-semibold font-sans tracking-wide text-sm">Квартира:</p>
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{field.apartment}}</p>
    </div>
    <div class="flex mt-2 justify-between items-center">
      <button @click="$router.push({ name: 'deals_view', params: { id: field.id }})" class="btn btn-primary">Открыть сделку</button>
    </div>
    <!-- <div class="flex mt-2 justify-between items-center">
      <p class="text-gray-600 font-semibold font-sans tracking-wide text-sm">Сделка:</p>
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{field.deal}}</p>
    </div> -->
  </div>
</template>
<script>
import api from "@/config/api";
import axios from "axios";

export default {
  components: {},
  props: {
    status_color: String,
    status_id: Number,
    field: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    if (this.status_id != this.field.status) {
      this.update(this.status_id);
    }
  },
  methods: {
    update: function(status_id) {
      axios
        .put(
          api.deal,
          { status: status_id },
          { params: { id: this.field.id } }
        )
        .then(response => {})
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
