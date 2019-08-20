<template>
  <div class="form-group">
    <label>
      {{data.label}}
      <span v-if="data.req" style="color: #f00">*</span>:
    </label>
    <input
      class="form-control"
      :class="{'is-invalid': data.error}"
      :disabled="data.disabled"
      v-on:change="$emit('change-model', value)"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      :type="data.type"
      :placeholder="data.placeholder"
    />
    <template v-if="data.error != null">
      <div class="invalid-feedback">{{data.error}}</div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    data: {
      type: Object,
      default: function() {
        return {
          type: "text",
          label: "",
          placeholder: "",
          disabled: false,
          error: "",
          req: false
        };
      }
    }
  }
};
</script>
