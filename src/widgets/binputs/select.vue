<template>
  <select
    class="form-control"
    :class="{'is-invalid': error}"
    :disabled="disabled"
    @change="$emit('change', $event.target.value)"
    @input="$emit('input', $event.target.value)"
    :value="value"
    :placeholder="placeholder"
  >
    <option v-if="all" value>Все</option>
    <option
      v-for="(el, key) in options"
      :key="key"
      :selected="value == el.value"
      :value="el.value"
    >{{el.text}}</option>
  </select>
</template>

<script>
export default {
  props: {
    value: String,
    options: Array,
    all: {
      type: Boolean,
      default: false
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
