<template>
  <div class="form-check" style="margin: 0 0 15px 0;">
    <input
      class="form-check-input"
      :checked="value"
      @change="$emit('change', value)"
      @input="$emit('input', $event.target.checked)"
      type="checkbox"
      :disabled="disabled"
      :id="id"
    />
    <label class="form-check-label" :for="id">{{label}}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      id: null
    };
  },
  mounted() {
    this.id = this._uid;
  }
};
</script>
