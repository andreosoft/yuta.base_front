<template>
  <transition name="right-modal">
    <div class="r-modal">
      <div class="r-header">
        <div class="r-header-title">
          <div v-if="fields.id == null">Добавить новый дом</div>
          <div v-else>Обновить дом</div>
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
          <b-text
            v-model="fields.name"
            :data="{label: 'Наименование дома', error: errors.name, req: true}"
            v-on:change-model="validate('name', fields.name)"
          ></b-text>
          <b-one-image
            v-model="fields.image"
            :data="{label: 'Главное изображение объекта', error: errors.image, api: api_upload_image}"
            v-on:change-model="validate('image', fields.image)"
          ></b-one-image>
          <div>
            <button @click="submitForm()" class="btn btn-primary" style="width: 100%">Записать</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
    
<script>
import api from "@/config/api";
import axios from "axios";
import mixingValidator from "@/libs/validators";
import submit_and_validate from "@/libs/mixings/modal_submit_and_validate";
import base_input_2 from "@/libs/mixings/base_input_2";
import BaseImage from "@/widgets/inputs/BaseImage.vue";
import loader from "@/views/common/loader.vue";

export default {
  components: {
    loader
  },
  mixins: [mixingValidator, submit_and_validate, base_input_2],
  props: {
    data: {
      type: Object,
      default: {
        name: null,
        image: null
      }
    }
  },
  data: function() {
    return {
      api: api.building,
      api_upload_image: api.uploads,
      fields: this.data,
      validators: {
        name: ["req"]
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