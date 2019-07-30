<template>
  <div class="form-group row">
    <label class="col-form-label col-sm-2 text-right">{{label}}</label>
    <div class="col-sm-10">
      <select
        class="form-control"
        :class="{'is-invalid': error}"
        v-on:change="$emit('change-model', value)"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
          <option v-for="option in options"
            :value="option.value"
            :selected="option.value == value"
          >
          {{option.text}}</option>
      </select>
      <template v-if="error != null">
        <div class="invalid-feedback">{{error}}</div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    value: String,
    label: {
      type: String,
      default: ''
    },
    api: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      options: []
    }
  },
  created () {
    this.fitchData()
  },
  methods: {
    fitchData() {
      axios
      .get(this.api)
      .then(response => {
        if (response.data.status == 'ok') {
          this.options = response.data.data
        }
      })
      .catch(e => {console.log(e)})
    }
  }
}
</script>
