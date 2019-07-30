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
          <option v-for="option in options" :value="option.value">{{option.text}}</option>
      </select>
      <template v-if="error != null">
        <div class="invalid-feedback">{{error}}</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: function () { return [{value: 0, text: 'Нет'}, {value: 1, text: 'Да'}] }
    },
    error: {
      type: String,
      default: ''
    },
  }
}
</script>
