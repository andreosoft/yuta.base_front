<template>
  <transition name="right-modal">
    <div class="r-modal">
      <div class="r-header">
        <div class="r-header-title">
          <div v-if="fields.id == null">Создать новый контакт</div>
          <div v-else>Обновить контакт</div>
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
            <label>ФИО клиента</label>
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
            <label>Адрес клиента</label>
            <input
              class="form-control"
              @change="validate('address', fields.address)"
              v-model="fields.address"
              :class="{'is-invalid': errors.address}"
              type="text"
            />
            <div v-if="errors.address" class="invalid-feedback">{{errors.address}}</div>
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
    loader
  },
  mixins: [mixingValidator, submit_and_validate],
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          name: null,
          address: null,
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