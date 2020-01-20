<template>
  <li>
    <div :class="{folder: isFolder}" style="display: inline-block;">
      <span v-if="isFolder" @click="toggle">
        <template v-if="open">
          <i class="fas fa-folder-minus"></i>
        </template>
        <template v-else>
          <i class="fas fa-folder-plus"></i>
        </template>
      </span>
      <span v-else>
        <i class="fas fa-angle-right"></i>
      </span>
      <span class="tree-item">
        <template v-if="isFolder">{{index}}</template>
        <template v-else>{{index}}:</template>
      </span>
      <span title="remove" @click="onClickRemove" v-if="isFolder" style="margin-left: 5px;">
        <i style="color: red;" class="fas fa-times"></i>
      </span>
    </div>
    <div v-if="isFolder">
      <div>
        <ul v-show="open">
          <tree-item
            @remove="onRemove($event)"
            @change="onChange($event, index)"
            class="item"
            v-for="(el, index) in data"
            :key="index"
            :index="index"
            :el="el"
          ></tree-item>
          <tree-add-item :el="data" @change="onChangeAddItem"></tree-add-item>
        </ul>
      </div>
    </div>
    <div v-else style="display: inline-block;">
      <span v-if="isEdited">
        <span v-if="typeof data === 'string'">
          <input ref="inputEl" @change="onChangeInput" @blur="onBlurInput" v-model="data" />
        </span>
        <span v-if="typeof data === 'number'">
          <input ref="inputEl" @change="onChangeInput" @blur="onBlurInput" v-model="data" type="number" />
        </span>
        <span v-if="typeof data === 'boolean'">
          <select ref="inputEl" @change="onChangeInput" @blur="onBlurInput" v-model="data">
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </span>
      </span>
      <span v-else>
        <span class="tree-value">{{data}}</span>
        <span title="edit" @click="onClickEdit" style="padding-left: 5px;">
          <i class="fas fa-pencil-alt"></i>
        </span>
      </span>
      <span title="remove" @click="onClickRemove" style="margin-left: 5px;">
        <i style="color: red;" class="fas fa-times"></i>
      </span>
    </div>
  </li>
</template>

<script>
import router from "@/config/router";
import treeAddItem from "./tree_add_item";

export default {
  name: "tree-item",
  components: {
    treeAddItem
  },
  props: {
    el: [Array, Object, String, Number, Boolean],
    index: [Array, Object, String, Number]
  },
  data: function() {
    return {
      open: false,
      isEdited: false,
      value: "",
      addType: 0,
      addTypes: ["String", "Number", "Array", "Object"]
    };
  },
  computed: {
    data: {
      get: function() {
        return this.el;
      },
      set: function(v) {
        this.value = v;
      }
    },
    isFolder: function() {
      return Array.isArray(this.el) || typeof this.el === "object";
    }
  },
  methods: {
    onClickRemove: function(e) {
      if (confirm("Вы уверены, что хотите удалить?")) {
        this.$emit("remove", this.index);
      }
    },
    onRemove: function(e) {
      let t = this.el;
      if (Array.isArray(t)) {
        t.splice(e, 1);
      } else if (typeof t === "object") {
        delete t[e];
      }
      this.$emit("change", t);
      this.$forceUpdate();
    },
    onChange: function(e, index) {
      let t = this.el;
      t[index] = e;
      this.$emit("change", t);
      this.$forceUpdate();
    },
    onChangeAddItem: function(e) {
      let el = this.data;
      if (Array.isArray(this.data)) {
        el.push(e.v);
      } else {
        el[e.i] = e.v;
      }
      this.$emit("change", el);
      this.$forceUpdate();
    },
    onChangeInput: function(e) {
      // this.onBlurInput(e);
    },
    onBlurInput: function(e) {
      this.isEdited = false;
      if (typeof this.el === "number") {
        this.value = Number(this.value);
        if (typeof this.value === "number") {
          this.$emit("change", this.value);
        }
      }
      if (typeof this.el === "string") {
        this.value = String(this.value);
        if (this.value.length > 0) {
          this.$emit("change", this.value);
        }
      }
      if (typeof this.el === "boolean") {
        this.value == "true" || this.value === true ? (this.value = true) : (this.value = false);
        this.$emit("change", this.value);
      }
      this.$forceUpdate();
    },
    onClickEdit: function() {
      this.isEdited = true;
      this.$nextTick(() => this.$refs.inputEl.focus());
    },
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
      } else {
        // this.$root.$emit('reload-catalog')
      }
    }
  }
};
</script>
