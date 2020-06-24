<template>
  <form-modal @close-menu="$emit('close-menu')" :loading="loading">
    <template v-slot:title>
      <div v-if="fields.id == null">Создать новый контакт</div>
      <div v-else>Обновить контакт</div>
    </template>
    <template v-slot:body>
      <div>
        <div v-for="(el, key) in $store.getters['db/structure'].crm_contacts" :key="key">
          <edit-element :el="el" v-model="fields[el.field_name]" :error="errors[el.field_name]"></edit-element>
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
    data: {
      type: Object,
      default: function() {
        return this.$store.getters["db/fields"]("crm_contacts");
      }
    },
    phone: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      api: api.contact,
      api_upload_image: api.uploads,
      fields: this.data,
      validators: {
        name: ["req"],
        address: ["req"]
      },
      errors: {
        name: null,
        address: null
      }
    };
  },
  mounted() {
    if (!this.fields.phone) {
      this.fields.phone = this.phone;
    }
  },
  methods: {}
};
</script>