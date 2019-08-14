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
                    path: '/contacts',
                    name: 'contacts',
                    meta: { 'title': 'Контакты', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/contacts/index.vue')
                },
                {
                    path: '/contacts/:id',
                    name: 'contacts_view',
                    meta: { 'title': 'Контакт', auth: [1, 50, 100] },
                    component: () =>
                        import ('@/views/contacts/view.vue')
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
                    path: '/config',
                    name: 'config',
                    meta: { 'title': 'Конфигурация', auth: [50, 100] },
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
                                import ('@/views/config/sections/view.vue')
                        },
                        {
                            path: '/config/objects/building/:id',
                            name: 'config_building_view',
                            meta: { 'title': 'Дом', auth: [50, 100] },
                            component: () =>
                                import ('@/views/config/building/view.vue')
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
                        }
                    ]
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