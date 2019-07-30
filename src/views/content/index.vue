<template>
  <div>
    <table-block :title="'Контент'" :fields="fields" :api="api" :actions="actions"></table-block>
  </div>
</template>

<script>
import router from '@/config/router'
import tableBlock from '@/widgets/tables/BaseTableParent.vue'
import api from '@/config/api'
import content from '@/models/content'
import func from '@/libs/func'

export default {
  data: function() {
    return {
      api: api.content,
      actions: [
        {
          view: 'button',
          type: 'back',
          class: 'btn btn-primary',
          html: '<i class="fas fa-arrow-left"></i>',
          title: 'Назад'
        },
        {
          view: 'button',
          type: 'up',
          class: 'btn btn-primary',
          html: '<i class="fas fa-arrow-up"></i>',
          title: 'Вверх'
        },
        {
          view: 'button',
          type: 'create',
          route: 'content_create',
          class: 'btn btn-primary',
          html: '<i class="fas fa-plus"></i>',
          title: 'Создать'
        },
        {
          view: 'button',
          type: 'remove',
          api: api.content,
          class: 'btn btn-danger',
          html: '<i class="far fa-trash-alt"></i>',
          title: 'Удалить'
        }
      ],
      fields: [
        {
          name: 'checkbox',
          style: 'width: 1px;'
        },
        {
          name: 'id',
          title: content.labels.id,
          sort: true,
          filter: {
            type: 'input'
          },
          style: 'width: 100px;'
        },
        {
          name: 'name',
          title: content.labels.name,
          sort: true,
          filter: {
            type: 'input'
          },
          style: 'text-align: left',
        },
        {
          name: 'status',
          title: content.labels.status,
          sort: true,
          filter: {
            type: 'select',
            options: content.status,
          },
          render: function(model, attr) {
            return content.status.find(x => x.value == model[attr]) ? content.status.find(x => x.value == model[attr]).text : ''
          },
          style: 'width: 200px;'
        },
        {
          name: 'actions',
          title: '',
          sort: false,
          filter: {
            type: 'none'
          },
          actions: [
            {
              type: 'update',
              icon: 'fa-pencil-alt',
              class: 'btn-primary',
              title: 'Редактировать',
              path: 'content_update'
            }
          ],
        }
      ]
    }
  },
  components: {
    tableBlock
  }
}
</script>