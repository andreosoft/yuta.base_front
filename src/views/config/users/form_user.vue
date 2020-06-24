<template>
  <div class="r-modal">
    <div class="r-header">
      <div class="r-header-title">
        <div v-if="fields.id == null">Создать нового пользователя</div>
        <div v-else>Обновить пользователя</div>
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
        <template v-if="!this.fields.id">
          <div class="form-group">
            <label>{{labels.login}}</label>
            <input
              class="form-control"
              @change="validate('login', fields.login)"
              v-model="fields.login"
              :class="{'is-invalid': errors.login}"
              type="text"
            />
            <div v-if="errors.login" class="invalid-feedback">{{errors.login}}</div>
          </div>
        </template>
        <div class="form-group">
          <label>{{labels.name}}</label>
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
          <label>{{labels.status}}</label>
          <select class="form-control" @change="validate('status')" v-model="fields.status">
            <option v-for="(el, key) in user_model.status" :key="key" :value="el.value">{{el.text}}</option>
          </select>
        </div>
        <div class="form-group">
          <label>{{labels.role}}</label>
          <select class="form-control" @change="validate('role')" v-model="fields.role">
            <option
              v-for="(el, key) in $store.getters['options/getall'].module_user.roles"
              :key="key"
              :value="el.value"
            >{{el.text}}</option>
          </select>
        </div>
        <div class="form-group">
          <label>{{labels.password}}</label>
          <input
            class="form-control"
            @change="validate('password', fields.password)"
            v-model="fields.password"
            :class="{'is-invalid': errors.password}"
            type="text"
          />
          <div v-if="errors.password" class="invalid-feedback">{{errors.password}}</div>
        </div>
        <div class="form-group">
          <label>Ключ для доступа по api</label>
          <input class="form-control" v-model="fields.api_key" type="text" />
        </div>
        <div style="margin: 0 0 15px 0;">
          <button @click="gen_new_api_key()" class="btn btn-primary">Сгенерировать новый ключ</button>
        </div>
        <div class="form-group">
          <label>{{labels.sip_number}}</label>
          <input
            class="form-control"
            @change="validate('name', fields.sip_number)"
            v-model="fields.sip_number"
            :class="{'is-invalid': errors.sip_number}"
            type="text"
          />
          <div v-if="errors.sip_number" class="invalid-feedback">{{errors.sip_number}}</div>
        </div>
        <div class="form-group" v-if="$store.getters['options/getall'].module_caller">
          <label>{{labels.sip_password}}</label>
          <input
            class="form-control"
            @change="validate('name', fields.sip_password)"
            v-model="fields.sip_password"
            :class="{'is-invalid': errors.sip_password}"
            type="text"
          />
          <div v-if="errors.sip_password" class="invalid-feedback">{{errors.sip_password}}</div>
        </div>
        <div>
          <button @click="submitForm()" class="btn btn-primary" style="width: 100%">Записать</button>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import api from "@/config/api";
import axios from "axios";
import mixingValidator from "@/mixings/validators";
import submit_and_validate from "@/mixings/modal_submit_and_validate";
import BaseImage from "@/widgets/inputs/BaseImage.vue";
import loader from "@/views/common/loader.vue";
import user_model from "@/models/user";

export default {
  components: {
    loader
  },
  mixins: [mixingValidator, submit_and_validate],
  props: {
    data: {
      type: Object,
      default: function() {
        return new user_model.Fields().fields;
      }
    }
  },
  data: function() {
    return {
      api: api.users,
      api_upload_image: api.uploads,
      fields: this.data,
      labels: user_model.labels,
      validators: user_model.validators,
      errors: new user_model.Fields().fields,
      user_model: user_model
    };
  },
  methods: {
    gen_new_api_key: function() {
      var d = new Date().getTime();

      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
      }

      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );

      this.fields.api_key = uuid;
    }
  }
};
</script>