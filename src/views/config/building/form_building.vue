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
          <div class="form-group">
            <label>Наименование дома</label>
            <input
              class="form-control"
              @change="validate('name', fields.name)"
              v-model="fields.name"
              :class="{'is-invalid': errors.name}"
              type="text"
            />
            <div v-if="errors.name" class="invalid-feedback">{{errors.name}}</div>
          </div>
          <div class="form-group">
            <label>Главное изображение объекта</label>
            <v-image
              v-model="fields.image"
              :api="api_upload_image"
              v-on:change-model="validate('image', fields.image)"
            ></v-image>
            <div v-if="errors.image" class="invalid-feedback">{{errors.image}}</div>
          </div>
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
import BaseImage from "@/widgets/inputs/BaseImage.vue";
import loader from "@/views/common/loader.vue";

export default {
  components: {
    "v-image": BaseImage,
    loader
  },
  mixins: [mixingValidator, submit_and_validate],
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