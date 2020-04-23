<template>
  <div class="form-group">
    <label>{{label}}</label>
    <bselect
      :error="error"
      :disabled="disabled"
      :api="api"
      @change="$emit('change', $event)"
      @input="$emit('input', $event)"
      :value="value"
      :placeholder="placeholder"
    ></bselect>
    <div v-if="error != null" class="invalid-feedback">{{error}}</div>
  </div>
</template>

<script>
import bselect from "@/widgets/binputs/selectApi.vue";

export default {
  components: { bselect },
  props: {
    value: String,
    api: String,
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
