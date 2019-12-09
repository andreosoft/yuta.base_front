<template>
  <span>
    <span v-if="el.type == 'select'">{{el.data.options.getTextByValue(fields[el.field_name])}}</span>
    <span v-else>{{fields[el.field_name]}}</span>
  </span>
</template>

<script>
export default {
  props: {
    el: Object,
    fields: Object
  }
};
</script>
