<template>
  <div class="form-group">
    <label class="col-form-label">{{model.model[name].label}}</label>
    <input class="form-control" :class="{'is-invalid': model.model[name].error}" @change="onChangeModel(model.model[name])" v-model="model.model[name].value" type="date">
    <template v-if="model.model[name].error != null">
      <div class="invalid-feedback">{{model.model[name].error}}</div>
    </template>
  </div>
</template>

<script>

export default {
  props: {
    model: Object,
    name: String
  },
  created() {
  },
  methods: {
    onChangeModel: function(field) {
      this.model.validator(field)
    }
  }
}
</script>
