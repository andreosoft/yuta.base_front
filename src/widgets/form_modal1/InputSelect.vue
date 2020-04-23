<template>
  <div class="form-group">
    <label>{{label}}</label>
    <bselect
      :error="error"
      :disabled="disabled"
      :options="options"
      @change="$emit('change', $event)"
      @input="$emit('input', $event)"
      :value="value"
      :placeholder="placeholder"
    ></bselect>
    <div v-if="error != null" class="invalid-feedback">{{error}}</div>
  </div>
</template>

<script>
import bselect from "@/widgets/binputs/select.vue";

export default {
  components: { bselect },
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
