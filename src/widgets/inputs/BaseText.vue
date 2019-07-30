<template>
  <div class="form-group row">
    <label class="col-form-label col-sm-2 text-right">{{label}}</label>
    <div class="col-sm-10">
      <input
        class="form-control"
        :class="{'is-invalid': error}"
        :disabled="disabled"
        v-on:change="$emit('change-model', value)"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        :type="type"
        :placeholder="placeholder"
      >
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
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
  }
}
</script>
