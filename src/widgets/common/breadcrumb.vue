<template>
  <ol class="breadcrumb">
    <template v-for="(el, key) of data">
      <li class="breadcrumb-item" :class="{ active: el.url === '' }" :key="key">
        <a v-if="el.url != ''" :href="el.url">{{el.title}}</a>
        <span v-else>
            {{el.title}}
        </span>
      </li>
    </template>
  </ol>
</template>

<script>
export default {
  props: {
    data: Array
  }
};
</script>