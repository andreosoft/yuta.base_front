export default {

    Fields() {
        this.fields = {
            id: null,
            login: null,
            password: null,
            name: null,
            surname: null,
            api_key: null
        }
    },

    validators: {
        login: ['req', 'phone'],
        password: ['pass'],
        name: ['req'],
    },

    labels: {
        id: 'id',
        login: 'Логин',
        password: 'Пароль',
        name: 'Имя',
        surname: 'Фамилия',
        role: 'Роль',
        status: 'Статус'
    },

    status: [
        { value: 1, text: 'Новый' },
        { value: 2, text: 'Активный' },
        { value: 10, text: 'Не активный' },
    ],

    role: [
        { value: 1, text: 'Пользователь' },
        { value: 100, text: 'Админ' }
    ]
}