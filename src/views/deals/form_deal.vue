<template>
  <form-modal @close-menu="$emit('close-menu')" :loading="loading">
    <template v-slot:title>
      <div v-if="fields.id == null">Создать новую сделку</div>
      <div v-else>Обновить сделку</div>
    </template>
    <template v-slot:body>
      <div>
        <div v-for="(el, key) in $store.getters['db/structure'].crm_deals" :key="key">
          <edit-element
            :el="el"
            v-model="fields[el.field_name]"
            :view="fields[el.data.field_view]"
            @change-view="fields[el.data.field_view]=$event"
            :error="errors[el.field_name]"
          ></edit-element>
        </div>
        <div class="btn-block">
          <button @click="submitForm()" class="btn btn-primary" style="width: 100%">Записать</button>
        </div>
      </div>
    </template>
  </form-modal>
</template>

<script>
import api from "@/config/api";
import axios from "axios";
import base_input_modal1 from "@/mixings/base_input_modal1.js";
import mixingValidator from "@/mixings/validators";
import submit_and_validate from "@/mixings/modal_submit_and_validate";
import BaseImage from "@/widgets/inputs/BaseImage.vue";
import editElement from "@/widgets/editElement.vue";

export default {
  components: {
    editElement
  },
  mixins: [base_input_modal1, mixingValidator, submit_and_validate],
  props: {
    filters: Object,
    sort: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: function() {
        return this.$store.getters["db/fields"]("crm_deals");
      }
    }
  },
  data: function() {
    return {
      loading: false,
      api: api.deal,
      api_upload_image: api.uploads,
      fields: this.data,
      validators: {
        client_id: ["req"]
      },
      errors: {
        client_id: null
      }
    };
  },
  methods: {}
};

// import api from "@/config/api";
// import axios from "axios";
// import mixingValidator from "@/mixings/validators";
// import submit_and_validate from "@/mixings/modal_submit_and_validate";
// import BaseImage from "@/widgets/inputs/BaseImage.vue";
// import loader from "@/views/common/loader.vue";

// export default {
//   components: {
//     loader
//   },
//   mixins: [mixingValidator, submit_and_validate],
//   props: {
//     data: {
//       type: Object,
//       default: function() {
//         return {
//           client_id: null,
//           apartment_id: null,
//           info: null,
//           status: null
//         };
//       }
//     }
//   },
//   data: function() {
//     return {
//       api: api.deal,
//       api_upload_image: api.uploads,
//       fields: this.data,
//       validators: {
//         client_id: [],
//         apartment_id: [],
//         info: [],
//         status: []
//       },
//       errors: {
//         client_id: null,
//         apartment_id: null,
//         info: null,
//         status: null
//       }
//     };
//   },
//   methods: {}
// };
</script>