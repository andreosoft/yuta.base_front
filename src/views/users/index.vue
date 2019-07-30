<template>
      <div>
        <div class="right-side-inner">
          <table-block :title="title" :actions="actions" :fields="fields" :api="api"></table-block>
        </div>
  </div>
</template>

<script>
import router from '@/config/router'
import tableBlock from '@/widgets/tables/BaseTable.vue'
import api from '@/config/api'
import user_model from '@/models/user'

  export default {
    data: function() {
      return {
        title: 'Пользователи',
        api: api.users,
        actions: [
          {
            view: 'button',
            type: 'create',
            html: '<i class="fas fa-plus"></i>',
            class: 'btn btn-primary',
            title: 'Создать',
            route: 'user_create'
          },
        ],
        fields: [
          {
            'name': 'id',
            'title': 'Код',
            'sort': true,
            'style': 'width: 100px;',
            'filter': {
              'type': 'input'
            }
          },
          {
            'name': 'login',
            'title': 'Логин',
            'style': 'text-align: left',
            'sort': true,
            'filter': {
              'type': 'input'
            }
          },
          {
            'name': 'name',
            'title': 'Имя',
            'style': 'text-align: left',
            'sort': true,
            'filter': {
              'type': 'input'
            }
          },
          {
            'name': 'status',
            'title': 'Статус',
            'sort': true,
            'filter': {
              'type': 'select',
              'options': user_model.status,
            },
            render: function(model, attr) {
              return user_model.status.find(x => x.value == model[attr]) ? user_model.status.find(x => x.value == model[attr]).text : ''
            }
          },
          {
            'name': 'role',
            'title': 'Роль',
            'sort': true,
            'filter': {
              'type': 'select',
              'options': user_model.role,
            },
            render: function(model, attr) {
              return user_model.role.find(x => x.value == model[attr]) ? user_model.role.find(x => x.value == model[attr]).text : ''
            }
          },
          {
            'name': 'actions',
            'title': '',
            'sort': false,
            'filter': {
              'type': 'none'
            },
            'actions': [
              {
                'type': 'update',
                'icon': 'fa-pencil-alt',
                'class': 'btn-primary',
                'title': 'Редактировать',
                'path': 'user_info'
              }
            ],
          }
        ]
      }
    },
    components: {
      tableBlock
    },
    created () {

    }
  }
  </script>