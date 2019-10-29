<template>
  <form-modal @close-menu="$emit('close-menu')" :loading="loading">
    <template v-slot:title>
      <div v-if="fields.field_name">Поле {{fields.field_name}}</div>
      <div v-else>Новое поле</div>
    </template>
    <template v-slot:body>
      <div>
        <input-text :label="labels.name" v-model="fields.name"></input-text>
        <input-text :label="labels.type" v-model="fields.type"></input-text>
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
import fitch_one_1 from "@/mixings/fitch_one_1";
import structure from "@/models/structure";

export default {
  components: {},
  mixins: [base_input_modal1, mixingValidator, submit_and_validate],
  props: {
    table_name: String,
    form_id: String
  },
  data: function() {
    return {
      api: api.structure,
      fields: { ...structure.fields },
      validators: structure.validators,
      labels: structure.labels,
      errors: { ...structure.errors }
    };
  },
  created() {
    this.fields.table_name = this.table_name;
    this.id = this.form_id;
    if (this.id && this.id != null) {
      this.fetch(this.id);
    }
  },
  methods: {
    fetch(id) {
      this.loading = true;
      axios
        .get(this.api, { params: { id: id } })
        .then(response => {
          this.loading = false;
          this.fields = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>