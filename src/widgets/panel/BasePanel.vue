<template>
  <div class="card" style="margin-bottom:15px">
    <div class="card-header bg-secondary text-white">
      {{title}}
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>
