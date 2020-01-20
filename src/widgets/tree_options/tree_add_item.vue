<template>
  <li>
    <span v-if="edited">
      <input ref="input" @blur="onChangeInput" v-model="elName" />
      <b>:</b>
    </span>
    <span v-else>
      <select v-model="addType" style="font-size: 10px;">
        <option v-for="(oe, oi) in addTypes" :key="oi" :value="oi">{{oe}}</option>
      </select>
      <span title="create element" style="margin-left: 5px;" @click="addElement">
        <i class="fas fa-plus"></i>
      </span>
    </span>
  </li>
</template>

<script>
export default {
  props: {
    el: [Array, Object]
  },
  data: function() {
    return {
      edited: false,
      elName: "",
      addType: 0,
      addTypes: ["String", "Number", "Array", "Object", "Boolean"]
    };
  },
  methods: {
    addElement: function() {
      if (Array.isArray(this.el)) {
        this.$emit("change", {v: this.getType()});
      } else if (typeof this.el === "object") {
        this.edited = true;
        this.$nextTick(() => this.$refs.input.focus());
      }
    },
    onChangeInput: function(e) {
      this.edited = false;
      if (this.elName.length > 0) {
        this.$emit("change", {i: this.elName, v:this.getType()});
        this.elName = "";
      }
    },
    getType: function() {
      switch (this.addType) {
        case 0:
          return "";
        case 1:
          return 0;
        case 2:
          return [];
        case 3:
          return {};
        case 4:
          return false;
      }
    }
  }
};
</script>