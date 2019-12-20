<template>
  <div>
    <h5 class="pt-3 pb-2 mb-0 border-bottom text-center">Список сделок</h5>
    <div class="pt-2 pb-2 border-bottom border-gray">
      <p class="mb-0 text-center">Нет сделок!</p>
      <p class="text-center">Тут вы можете создать сделки для данного контакта</p>

      <button class="btn btn-primary btn-block" title="Добавить сделку" @click="form_deal = true">
        <i class="far fa-plus"></i> Добавить сделку
      </button>
      <form-deal
        v-if="form_deal"
        @close-menu="form_deal = false"
        @data-update="updateRoute()"
        :data="{contact_id: $route.params.id}"
      ></form-deal>
    </div>
  </div>
</template>
<script>
</script>