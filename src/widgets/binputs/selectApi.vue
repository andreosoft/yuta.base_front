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
import axios from "axios";
import api from "@/config/api";

export default {
  props: {
    value: String,
    api: String,
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
  },
  data: function() {
    return {
      options: []
    };
  },
  created() {
    this.fitchData();
  },
  methods: {
    fitchData() {
      axios
        .get(api.base_url + this.api)
        .then(response => {
          if (response.data.status == "ok") {
            console.log(this.value);

            this.options = response.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
