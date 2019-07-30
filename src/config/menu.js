export default {
    data: [{
            route: '/index',
            icon: 'fa-home',
            title: 'Главная страница',
            auth: [1, 50, 100]
        },
        {
            route: '/content/0',
            icon: 'fa-file-alt',
            title: 'Контент',
            auth: [50, 100]
        },
        {
            route: '/users',
            icon: 'fa-users',
            title: 'Пользователи',
            auth: [100]
        },
        {
            route: '/help',
            icon: 'fa-question-circle',
            title: 'Помощь',
            auth: [1, 50, 100]
        },
    ]
}