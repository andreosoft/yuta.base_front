<template>
  <div class="form-group">
    <div>
      <div style="margin-bottom: 5px;">
        <button @click="on_add_option()" class="btn btn-primary">Добавить значение</button>
      </div>
      <table class="table table-bordered">
        <tbody>
          <tr
            ref="draggable"
            :class="{dragging: drag_src_el == key}"
            v-for="(el, key) in value"
            :key="key"
            :data-id="key"
            draggable="true"
            @dragstart="dragstart(key, $event)"
            @dragover.prevent
            @drop="dragdrop(key, $event)"
          >
            <td style="display: flex;">
              <span style="padding: 10px;color: #777;">
                <i class="fas fa-arrows-alt" title="Переместить"></i>
              </span>
              <input class="form-control" v-model="el.text" />
            </td>
            <td>
              <button @click="on_remove_option(key)" class="btn btn-danger"><i class="fas fa-minus-circle" title="Удалить"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import drag_and_drop1 from "@/mixings/drag_and_drop1.js";

export default {
  mixins: [drag_and_drop1],
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    on_add_option: function() {
      let d = this.value;
      let max = Math.max.apply(Math, d.map(function(e) { return e.value; }))
      if (max < 1) {
        max = 0;
      }
      d.push({value: parseInt(max) + 1, text: ''});
      this.$emit('input', d);
    },
    on_remove_option: function(key) {
      let d = this.value;
      d.splice(key, 1);
      this.$emit('input', d);
    }
  }
};
</script>
