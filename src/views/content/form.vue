<template>
  <div>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div>
        <h1 v-if="fields.id">Изменить контент: {{fields.id}}</h1>
        <h1 v-else>Создать контент</h1>
        <hr>
        <v-text v-model="fields.name" :label="labels.name" v-on:change-model="validate('name', fields.name)" :error="errors.name"></v-text>
        <v-textarea v-model="fields.intro" :label="labels.intro" v-on:change-model="validate('intro', fields.intro)" :error="errors.intro" :rows="4"></v-textarea>
        <div class="form-group">
          <label>{{labels.content}}</label>
          <div>
            <fly-editor v-model="fields.content" :rows="30"></fly-editor>
          </div>
        </div>
        <v-image v-model="fields.image" :api="api.upload_image" :label="labels.image" v-on:change-model="validate('image', fields.image)" :error="errors.image"></v-image>
        <v-text v-model="fields.url" :label="labels.url" v-on:change-model="validate('url', fields.url)" :error="errors.url"></v-text>
        <v-select-yes-no v-model="fields.is_parent" :label="labels.is_parent" v-on:change-model="validate('is_parent', fields.is_parent)"  :error="errors.is_parent"></v-select-yes-no>
        <v-text v-model="fields.parent_id" :label="labels.parent_id" v-on:change-model="validate('parent_id', fields.parent_id)" :error="errors.parent_id"></v-text>
        <v-select v-model="fields.status"  :options="status" :label="labels.status" :error="errors.status"></v-select>
        <div class="text-right">
          <button class="btn btn-outline-secondary btn-lg" style="width: 150px;" @click="goBack()">Назад</button>
          <button class="btn btn-outline-success btn-lg" style="width: 150px; margin-left: 5px;" @click="submitForm()">Записать</button>
        </div>
      </div>
  </div>
</template>

<script>
import api from '@/config/api'
import func from '@/libs/func'
import axios from 'axios'
import model from '@/models/content'
import BaseText from '@/widgets/inputs/BaseText.vue'
import BaseImage from '@/widgets/inputs/BaseImage.vue'
import BaseTextarea from '@/widgets/inputs/BaseTextarea.vue'
import BaseSelectYesNo from '@/widgets/inputs/BaseSelectYesNo.vue'
import BaseSelect from '@/widgets/inputs/BaseSelect.vue'
import FlyEditor from '@/widgets/inputs/FlyEditor/FlyEditor.vue'
import mixingValidator from '@/libs/validators'
import router from '@/config/router'

export default {
  mixins: [mixingValidator],
  components: {
    'v-text': BaseText,
    'v-textarea': BaseTextarea,
    'v-select-yes-no': BaseSelectYesNo,
    'v-select': BaseSelect,
    'v-image': BaseImage,
    'fly-editor': FlyEditor
  },
  data: function() {
    return {
      loading: false,
      labels: model.labels,
      fields: new model.Fields().fields,
      errors: new model.Fields().fields,
      status: model.status,
      api: api
    }
  },
  created () {
    if (this.$route.params.id) {
      this.fetchData()
    } else {
      this.fields.is_parent = '0'
      this.fields.parent_id = this.$route.query.parent_id ? this.$route.query.parent_id : '0'
      this.fields.status = '1'
    }
  },
  methods: {
    goBack: function(e) {
      router.go(-1)
    },
    fetchData: function () {
      this.loading = true
      axios
      .get(api.content, {params: {id: this.$route.params.id} })
      .then(response => {
        this.loading = false
        if (response.data.status == 'ok') {
          this.fields = response.data.data
        }
      })
      .catch(error => { console.log(error) })
    },
    submitForm: function (e) {
      if (this.validateAll(this.fields)) {
        this.send(this.fields, api.content).then(() => { this.goBack() })
      }
    },
    send: function() { 
      return new Promise((resolve, reject) => {
        this.loading = true
        if (this.fields.id) {
          var method = 'put'
          var params = {id: this.fields.id}
        } else {
          var method = 'post'
          var params = {}
        }
        axios({ method: method, url: api.content, data: this.fields, params: params})
        .then(response => {
          this.loading = false
          if (response.data.status == 'ok') {
            this.fields = response.data.data
            this.isLoad = false
            this.hasChanges = false
            resolve("ok");
          }
        })
        .catch(e => {console.log(e)})
      })
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
      if (model.validators[field]) {
        return this.errors[field] = this.validator(model.validators[field], value)
      }
    },
  }
}
</script>
