<template>
  <transition name="right-modal">
    <div class="r-modal">
      <div class="r-header">
        <div class="r-header-title">Создать новый объект</div>
        <div class="r-header-close">
          <button @click="$emit('close-menu')" title="Закрыть окно">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="r-body">
        <div>
          <div class="form-group">
            <label>Наименование объекта</label>
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
          <div class="form-group">
            <label>Адрес объекта</label>
            <input
              class="form-control"
              @change="validate('address', fields.address)"
              v-model="fields.address"
              :class="{'is-invalid': errors.address}"
              type="text"
            />
            <div v-if="errors.address" class="invalid-feedback">{{errors.address}}</div>
          </div>
          <div class="form-group">
            <label>Класс ЖК</label>
            <input
              class="form-control"
              @change="validate('class', fields.class)"
              v-model="fields.class"
              :class="{'is-invalid': errors.class}"
              type="text"
            />
            <div v-if="errors.class" class="invalid-feedback">{{errors.class}}</div>
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
import BaseImage from "@/widgets/inputs/BaseImage.vue";

export default {
  components: {
    "v-image": BaseImage
  },
  mixins: [mixingValidator],
  data: function() {
    return {
      api: "",
      api_upload_image: "",
      fields: {
        name: null,
        address: null,
        class: null,
        image: null
      },
      validators: {
        name: ["req"],
        address: ["req"]
      },
      errors: {
        name: null,
        address: null
      },
      loading: false
    };
  },
  methods: {
    submitForm: function() {
      if (this.validateAll(this.fields)) {
        this.submit(this.fields, this.api);
        return true;
      }
      return false;
    },
    submit: function(fields, api) {
      this.loading = true;
      axios
        .post(api, fields)
        .then(response => {
          this.loading = false;
          this.fields = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    validateAll: function(fields) {
      var noerror = true;
      for (var index in fields) {
        if (this.validate(index, fields[index])) {
          noerror = false;
        }
      }
      return noerror;
    },
    validate: function(field, value) {
      if (this.validators[field]) {
        return (this.errors[field] = this.validator(
          this.validators[field],
          value
        ));
      }
    }
  }
};
</script>