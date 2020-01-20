// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router = new Router({
    saveScrollPosition: true,
    history: true,
    // mode: 'history',
    routes: [{
            path: '/',
            redirect: to => {
                return '/index'
            }
        },
        {
            path: '/',
            meta: { auth: [1, 100] },
            component: () =>
                import ('@/layouts/main.vue'),
            children: [{
                    path: '/profile',
                    name: 'profile',
                    meta: { 'title': 'Мой профиль', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/signup/profile.vue'),
                },
                {
                    path: '/index',
                    name: 'index',
                    meta: { 'title': 'Кабинет', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/index/index.vue'),
                },

                {
                    path: '/buildings',
                    name: 'buildings',
                    meta: { 'title': 'Здания', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/buildings/index.vue')
                },
                {
                    path: '/buildings/:id',
                    name: 'buildings_view',
                    meta: { 'title': 'Здания', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/buildings/view.vue'),
                    children: [{
                            path: '/buildings/:id/list',
                            name: 'buildings_list',
                            meta: { 'title': 'Список', auth: [1, 50, 100] },
                            component: () =>
                                import ('@/views/buildings/list.vue')
                        },
                        {
                            path: '/buildings/:id/floors',
                            name: 'buildings_floors',
                            meta: { 'title': 'Этажи', auth: [1, 50, 100] },
                            component: () =>
                                import ('@/views/buildings/floors.vue')
                        },
                        {
                            path: '/buildings/:id/plans',
                            name: 'buildings_plans',
                            meta: { 'title': 'Планировки', auth: [1, 50, 100] },
                            component: () =>
                                import ('@/views/buildings/plans.vue')
                        },
                        {
                            path: '/buildings/:id/tile',
                            name: 'buildings_tile',
                            meta: { 'title': 'Плитка', auth: [1, 50, 100] },
                            component: () =>
                                import ('@/views/buildings/tile.vue')
                        },
                        {
                            path: '/buildings/:id/facades',
                            name: 'buildings_facades',
                            meta: { 'title': 'Фасады', auth: [1, 50, 100] },
                            component: () =>
                                import ('@/views/buildings/facades.vue')
                        },
                    ]
                },

                {
                    path: '/contacts',
                    name: 'contacts',
                    meta: { 'title': 'Контакты', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/contacts/index.vue')
                        
                },
                {
                    path: '/contacts/:id/comments',
                    name: 'contacts_view',
                    meta: { 'title': 'Контакт', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/contacts/view.vue'),
                        children: [{
                            path: '/contacts/:id/comments',
                            name: 'contacts_comments',
                            meta: { 'title': 'Комментарии', auth: [1, 50, 100] },
                            component: () =>
                                import ('@/views/contacts/comments.vue')
                        },
                        {
                            path: '/contacts/:id/tasks',
                            name: 'contacts_tasks',
                            meta: { 'title': 'Задачи', auth: [1, 50, 100] },
                            component: () =>
                                import ('@/views/contacts/tasks.vue')
                        },
                        {
                            path: '/contacts/:id/deals',
                            name: 'contacts_deals',
                            meta: { 'title': 'Сделки', auth: [1, 50, 100] },
                            component: () =>
                                import ('@/views/contacts/deals.vue')
                        },
                        {
                            path: '/contacts/:id/finance',
                            name: 'contacts_finance',
                            meta: { 'title': 'Финансы', auth: [1, 50, 100] },
                            component: () =>
                                import ('@/views/contacts/finance.vue')
                        },
                        {
                            path: '/contacts/:id/activity',
                            name: 'contacts_activity',
                            meta: { 'title': 'Активность', auth: [1, 50, 100] },
                            component: () =>
                                import ('@/views/contacts/activity.vue')
                        },
                    ]
                },

                {
                    path: '/deals',
                    name: 'deals',
                    meta: { 'title': 'Сделки', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/deals/index.vue')
                },
                {
                    path: '/deals/:id',
                    name: 'deals_view',
                    meta: { 'title': 'Сделки', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/deals/view.vue')
                },
                {
                    path: '/calls',
                    name: 'calls',
                    meta: { 'title': 'Звонки', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/calls/index.vue')
                },

                {
                    path: '/config',
                    name: 'config',
                    meta: { 'title': 'Конфигурация', auth: [50, 100] },
                    redirect: to => {
                        return { name: 'config_users' }
                    },
                    component: () =>
                        import ('@/views/config/index.vue'),
                    children: [{
                            path: '/config/objects',
                            name: 'config_objects',
                            meta: { 'title': 'Объекты', auth: [50, 100] },
                            component: () =>
                                import ('@/views/config/objects/index.vue')
                        },
                        {
                            path: '/config/objects/:id',
                            name: 'config_objects_view',
                            meta: { 'title': 'Объект', auth: [50, 100] },
                            component: () =>
                                import ('@/views/config/objects/view.vue')
                        },
                        {
                            path: '/config/objects/sections/:id',
                            name: 'config_sections_view',
                            meta: { 'title': 'Шахматка', auth: [50, 100] },
                            component: () =>
                                import ('@/views/config/objects/building/sections/view.vue')
                        },
                        {
                            path: '/config/objects/plans_apart/:id',
                            name: 'config_plans_apart_view',
                            meta: { auth: [50, 100] },
                            component: () =>
                                import ('@/views/config/objects/building/plans_apartments/view.vue')
                        },
                        {
                            path: '/config/objects/building/:id',
                            name: 'config_building_view',
                            meta: { 'title': 'Дом', auth: [50, 100] },
                            component: () =>
                                import ('@/views/config/objects/building/view.vue')
                        },
                        {
                            path: '/config/options/',
                            name: 'config_options',
                            meta: { 'title': 'Настройки', auth: [100] },
                            component: () =>
                                import ('@/views/config/options/index.vue'),
                        },
                        {
                            path: '/config/users/',
                            name: 'config_users',
                            meta: { 'title': 'Пользователи', auth: [50, 100] },
                            component: () =>
                                import ('@/views/config/users/index.vue'),
                        },
                        {
                            path: '/config/users/:id',
                            name: 'config_users_view',
                            meta: { 'title': 'Информация о пользователе', auth: [50, 100] },
                            component: () =>
                                import ('@/views/config/users/view.vue'),
                        },
                        {
                            path: '/config/fields/',
                            name: 'config_fields',
                            redirect: to => {
                                return { name: 'config_fields_view', params: {name: 'crm_contacts'} }
                            },
                            meta: { title: 'Поля', auth: [50, 100] },
                            component: () =>
                                import ('@/views/config/fields/index.vue'),
                            children: [{
                                    path: '/config/fields/view/:name',
                                    name: 'config_fields_view',
                                    meta: { title: 'Настройка полей', auth: [1, 50, 100] },
                                    component: () =>
                                        import ('@/views/config/fields/view.vue')
                                },
                            ]
                        },
                    ]
                },
                {
                    path: '/finance',
                    name: 'finance',
                    meta: { 'title': 'Финансы', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/finance/index.vue')
                },
                {
                    path: '/finance/view/:id',
                    name: 'finance_view',
                    meta: { 'title': 'Финансы', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/finance/form.vue')
                },
                {
                    path: '/finance/create',
                    name: 'finance_create',
                    meta: { 'title': 'Финансы', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/finance/form.vue')
                },
                {
                    path: '/finance/update/:id',
                    name: 'finance_update',
                    meta: { 'title': 'Финансы', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/finance/form.vue')
                },

                {
                    path: '/tasks',
                    name: 'tasks',
                    meta: { 'title': 'Задачи', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/tasks/index.vue')
                },

                {
                    path: '/help',
                    name: 'help',
                    meta: { 'title': 'Помощь', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/help/index.vue')
                }
            ]
        },
        {
            path: '/',
            component: () =>
                import ('@/layouts/blank.vue'),
            children: [{
                    path: '/login',
                    name: 'login',
                    meta: { 'title': 'login', auth: ['0'] },
                    component: () =>
                        import ('@/views/signup/login.vue')
                },
                {
                    path: '*',
                    name: 'notfound',
                    meta: { 'title': '404', auth: ['*'] },
                    component: () =>
                        import ('@/views/notFound.vue')
                }
            ]
        }
    ]
})
export default router