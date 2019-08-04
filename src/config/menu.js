export default {
    data: [{
            route: '/index',
            icon: 'fal fa-home',
            title: 'Главная страница',
            name: 'Главная',
            auth: [1, 50, 100]
        },
        {
            route: '/objects',
            icon: 'fal fa-hotel',
            title: 'Объекты',
            name: 'Объекты',
            auth: [50, 100]
        }, 
        {
            route: '/content/0',
            icon: 'fal fa-file-alt',
            title: 'Контент',
            name: 'Контент',
            auth: [50, 100]
        },
        {
            route: '/users',
            icon: 'fal fa-users',
            title: 'Пользователи',
            name: 'Пользователи',
            auth: [100]
        },
        {
            route: '/help',
            icon: 'fal fa-question-circle',
            title: 'Помощь',
            name: 'Помощь',
            auth: [1, 50, 100]
        },
    ]
}