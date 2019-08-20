<template>
  <div>
    <div class="form-group">
      <label>
        {{data.label}}
        <span v-if="data.req" style="color: #f00">*</span>:
      </label>
      <v-image
        :api="data.api"
        v-on:change="$emit('change-model', value)"
        :value="value"
        v-on:input="oninput"
      ></v-image>
      <div v-if="data.errors" class="invalid-feedback">{{data.errors}}</div>
    </div>
  </div>
</template>

<script>
import VImage from "@/widgets/inputs/BaseImage.vue";

export default {
  components: {
    VImage
  },
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
          req: false,
          api: ""
        };
      }
    }
  },
  methods: {
    oninput: function(event) {
      this.$emit('input', event);    
    }
  }
};
</script>
