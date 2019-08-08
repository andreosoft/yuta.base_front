<template>
  <transition name="right-modal">
    <div class="r-modal">
      <div class="r-header">
        <div class="r-header-title">
          <div v-if="fields.id == null">Добавить новый этаж</div>
          <div v-else>Обновить этаж</div>
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
            <label>Номер этажа</label>
            <input
              class="form-control"
              @change="validate('floor', fields.floor)"
              v-model="fields.floor"
              :class="{'is-invalid': errors.floor}"
              type="text"
            />
            <div v-if="errors.floor" class="invalid-feedback">{{errors.floor}}</div>
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
import loader from "@/views/common/loader.vue";

export default {
  components: {
    loader
  },
  mixins: [mixingValidator, submit_and_validate],
  props: {
    data: {
      type: Object,
      default: {
        floor: null
      }
    }
  },
  data: function() {
    return {
      api: api.floor,
      fields: this.data,
      validators: {
        floor: ["req"]
      },
      errors: {
        floor: null
      }
    };
  },
  methods: {}
};
</script>