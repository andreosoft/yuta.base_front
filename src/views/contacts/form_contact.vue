<template>
  <form-modal @close-menu="$emit('close-menu')" :loading="loading">
    <template v-slot:title>
      <div v-if="fields.id == null">Создать новый контакт</div>
      <div v-else>Обновить контакт</div>
    </template>
    <template v-slot:body>
      <div>
        <input-text
          label="ФИО клиента"
          @change="validate('name', fields.name)"
          v-model="fields.name"
          :error="errors.name"
        ></input-text>
        <input-text
          label="Адрес клиент"
          @change="validate('address', fields.address)"
          v-model="fields.address"
          :error="errors.address"
        ></input-text>
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

export default {
  components: {
  },
  mixins: [base_input_modal1, mixingValidator, submit_and_validate],
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          name: null,
          address: null
        };
      }
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
  methods: {}
};
</script>