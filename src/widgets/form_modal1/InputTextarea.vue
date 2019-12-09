<template>
  <div class="form-group">
    <label>{{label}}</label>
    <textarea
      class="form-control"
      :class="{'is-invalid': error}"
      :disabled="disabled"
      v-on:change="$emit('change', $event.target.value)"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
    ></textarea>
    <div v-if="error != null" class="invalid-feedback">{{error}}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    type: {
      type: String,
      default: "text"
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ""
    }
  }
};
</script>
