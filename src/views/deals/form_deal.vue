<template>
  <transition name="right-modal">
    <div class="r-modal">
      <div class="r-header">
        <div class="r-header-title">
          <div v-if="fields.id == null">Создать новую сделку</div>
          <div v-else>Обновить сделку</div>
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
            <label>id клиента</label>
            <input
              class="form-control"
              @change="validate('contact_id', fields.contact_id)"
              v-model="fields.contact_id"
              :class="{'is-invalid': errors.contact_id}"
              type="text"
            />
            <div v-if="errors.contact_id" class="invalid-feedback">{{errors.contact_id}}</div>
          </div>
          <div class="form-group">
            <label>id квартиры</label>
            <input
              class="form-control"
              @change="validate('apartment_id', fields.apartment_id)"
              v-model="fields.apartment_id"
              :class="{'is-invalid': errors.apartment_id}"
              type="text"
            />
            <div v-if="errors.apartment_id" class="invalid-feedback">{{errors.apartment_id}}</div>
          </div>

          <div class="form-group">
            <label>Информация</label>
            <input
              class="form-control"
              @change="validate('info', fields.info)"
              v-model="fields.info"
              :class="{'is-invalid': errors.info}"
              type="text"
            />
            <div v-if="errors.info" class="invalid-feedback">{{errors.info}}</div>
          </div>

          <div class="form-group">
            <label>Статус</label>
            <input
              class="form-control"
              @change="validate('apartment_id', fields.status)"
              v-model="fields.status"
              :class="{'is-invalid': errors.status}"
              type="text"
            />
            <div v-if="errors.status" class="invalid-feedback">{{errors.status}}</div>
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
          client_id: null,
          apartment_id: null,
          info: null,
          status: null
        };
      }
    }
  },
  data: function() {
    return {
      api: api.deal,
      api_upload_image: api.uploads,
      fields: this.data,
      validators: {
        client_id: [],
        apartment_id: [],
        info: [],
        status: []
      },
      errors: {
        client_id: null,
        apartment_id: null,
        info: null,
        status: null
      }
    };
  },
  methods: {}
};
</script>