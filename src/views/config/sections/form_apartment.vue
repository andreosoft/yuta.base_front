<template>
  <transition name="right-modal">
    <div class="r-modal">
      <div class="r-header">
        <div class="r-header-title">
          <div v-if="fields.id == null">Добавить новое помещение</div>
          <div v-else>Обновить помещение</div>
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
            <label>Номер помещения</label>
            <input
              class="form-control"
              @change="validate('floor', fields.number)"
              v-model="fields.number"
              :class="{'is-invalid': errors.number}"
              type="text"
            />
            <div v-if="errors.number" class="invalid-feedback">{{errors.number}}</div>
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
        number: null
      }
    }
  },
  data: function() {
    return {
      api: api.apartment,
      fields: this.data,
      validators: {
        number: ["req"]
      },
      errors: {
        number: null
      }
    };
  },
  methods: {}
};
</script>