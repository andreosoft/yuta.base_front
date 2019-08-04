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
                    path: '/users/',
                    name: 'users',
                    meta: { 'title': 'Пользователи', auth: [50, 100] },
                    component: () =>
                        import ('@/views/users/index.vue'),
                },
                {
                    path: '/users/create',
                    name: 'user_create',
                    meta: { 'title': 'Информация о пользователе', auth: [50, 100] },
                    component: () =>
                        import ('@/views/users/form.vue'),
                },
                {
                    path: '/users/:id',
                    name: 'user_info',
                    meta: { 'title': 'Информация о пользователе', auth: [50, 100] },
                    component: () =>
                        import ('@/views/users/form.vue'),
                },
                {
                    path: '/objects',
                    name: 'objects',
                    meta: {'title': 'Объекты', auth: [1, 50, 100]},
                    component: () => import('@/views/objects/index.vue')
                },
                {
                    path: '/objects/view',
                    name: 'objects_view',
                    meta: {'title': 'Объект', auth: [1, 50, 100]},
                    component: () => import('@/views/objects/view.vue')
                },
                {
                    path: '/contacts',
                    name: 'contacts',
                    meta: {'title': 'Контакты', auth: [1, 50, 100]},
                    component: () => import('@/views/contacts/index.vue')
                },
                {
                    path: '/deals',
                    name: 'deals',
                    meta: {'title': 'Сделки', auth: [1, 50, 100]},
                    component: () => import('@/views/deals/index.vue')
                },


                {
                    path: '/content/:parent_id',
                    name: 'content',
                    meta: { 'title': 'Контент', auth: [100] },
                    component: () =>
                        import ('@/views/content/index.vue')
                },
                {
                    path: '/content/create',
                    name: 'content_create',
                    meta: { 'title': 'Создать контент', auth: [100] },
                    component: () =>
                        import ('@/views/content/form.vue')
                },
                {
                    path: '/content/update/:id',
                    name: 'content_update',
                    meta: { 'title': 'Изменить контент', auth: [100] },
                    component: () =>
                        import ('@/views/content/form.vue')
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