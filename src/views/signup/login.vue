<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-md-8  col-lg-5 text-center" style="margin: 0 auto;">
        <h2 style="color:#fff">{{$root.appName}}</h2>
        <div class="login-panel">
          <div v-if="this.$store.getters['auth/status'] == 'loading'" class="loading-block">
            <div class="loader"></div>
          </div>
          <div>
            <h3>Войти</h3>
            <hr>
            <form class="login" @submit.prevent="submitForm" method="post" action="">
              <p v-if="this.$store.getters['auth/status'] == 'error'" style="color: red">{{ this.$store.getters['auth/error'] }}</p>
              <div class="form-group">
                <input class="form-control form-control-lg" :class="{'is-invalid': errors.login}" @change="validate('login', fields.login)" v-model="fields.login" type="text" :placeholder="labels.login">
                <div v-if="errors.login" class="invalid-feedback">{{errors.login}}</div>
              </div>
              <div class="form-group">
                <input class="form-control form-control-lg" :class="{'is-invalid': errors.password}" @change="validate('password', fields.password)" v-model="fields.password" type="password" :placeholder="labels.password">
                <div v-if="errors.password" class="invalid-feedback">{{errors.password}}</div>
              </div>
              <!-- <div class="text-right">
                <router-link :to="{ name: 'forget' }">напомнить пароль</router-link>
              </div> -->
              <div>
                <button type="submit" class="btn btn btn-outline-success btn-lg" style="width: 100%;">Войти</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import model from '@/models/login'
import api from '@/config/api'
import axios from 'axios'
import Vue from 'vue'
import mixingValidator from '@/libs/validators'

export default {
  mixins: [mixingValidator],
  data: function() {
    return {
      loading: false,
      labels: model.labels,
      fields: new model.Fields().fields,
      errors: new model.Fields().fields
    }
  },
  methods: {
    submitForm: function () {
      if (this.validateAll(this.fields)) {
        this.submit()
      }
    },
    submit: function() {
      this.$store.dispatch('auth/login', { login: this.fields.login, password: this.fields.password })
        .then(() => {
          this.$router.push('/')
        })
        .catch(e => {this.error = e})
    },
    validateAll: function(fields) {
      var noerror = true;
      for (var index in fields) {
        if (this.validate(index, fields[index])) {
          noerror = false
        }
      }
      return noerror
    },
    validate: function (field, value) {
      return this.errors[field] = this.validator(model.validators[field], value)
    }
  }

}
</script>
