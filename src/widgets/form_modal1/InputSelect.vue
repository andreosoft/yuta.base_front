<template>
  <div class="form-group">
    <label>{{label}}</label>
    <select
      class="form-control"
      :class="{'is-invalid': error}"
      :disabled="disabled"
      @change="$emit('change', $event.target.value)"
      @input="$emit('input', $event.target.value)"
      :value="value"
      :placeholder="placeholder"
    >
      <option v-for="(el, key) in options" :key="key" :value="el.value">{{el.text}}</option>
    </select>
    <div v-if="error != null" class="invalid-feedback">{{error}}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    options: Array,
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
