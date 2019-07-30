<template>
  <div>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div class="clearfix">
      <div class="float-left">
        <h1>Профиль пользователя <b>{{fields.login}}</b></h1>
      </div>
      <div class="float-right">
        <span style="padding-left: 4px; position: relative; display: inline-block;">
          <button class="btn btn-primary" title="Сохранить" @click="actions('submit')"><i class="fas fa-save"></i></button>
          <div class="btn-info-alert" title="У вас есть несохраненные изменения" v-if="this.hasChanges"></div>
        </span>
        <span style="padding-left: 4px;">
          <button class="btn btn-danger" title="Сохранить и закрыть" @click="actions('submitAndExit')"><i class="fas fa-save"></i></button>
        </span>
        <span style="padding-left: 4px;">
         <button class="btn btn-danger" title="Закрыть" @click="actions('exit')"><i class="fas fa-times-circle"></i></button>
        </span>
      </div>
    </div>
    <hr>
    <v-panel :title="'Основные'">
      <v-text v-model="fields.name" :label="labels.name" v-on:change-model="validate('name', fields.name)" :error="errors.name"></v-text>
      <v-text v-model="fields.surname" :label="labels.surname" v-on:change-model="validate('surname', fields.surname)" :error="errors.surname"></v-text>
      <v-text v-model="fields.password" :label="labels.password" v-on:change-model="validate('password', fields.password)" :error="errors.password"></v-text>
    </v-panel>
  </div>
</template>

<script>
import FormMixing from '@/widgets/FormMixing'
import model from '@/models/user.js'
import api from '@/config/api.js'
import axios from 'axios'

export default {
  mixins: [FormMixing],
  data: function() {
    return {
      model: model,
      validators: model.validators,
      labels: model.labels,
      errors: new model.Fields().fields,
      api: api.set_profile
    }
  },
  computed: {
    fields: {
      get () {
        return this.$store.getters['auth/profile']
      },
      set (value) {

      }
    }
  },
  created () {
  },
  methods: {
    submit: function(fields, api) {
      this.loading = true
      axios
      .post(api, fields)
      .then(response => {
        this.loading = false
        this.fields = response.data.data
        this.isLoad = false
        this.hasChanges = false
        this.$store.commit('auth/updateProfile', this.fields)
      })
      .catch(e => {console.log(e)})
    },
    // send: function() {
    //   axios
    //   .post(this.api, this.user)
    //   .then(response => {
    //     if (response.data.status == 'error') {
    //       this.errors = response.data.data
    //     } else {
    //       this.haschanges = false
    //       this.params.id = response.data.data['id']
    //       if (response.data.status == 'saved') {
    //         this.$store.commit('auth/updateProfile', this.user)
    //         this.$root.showInfo('Профиль изменен')
    //       }
    //     }
    //   })
    //   .catch(e => {console.log(e)})
    // },
  }
}
</script>
