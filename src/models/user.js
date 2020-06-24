export default {

    Fields() {
        this.fields = {
            id: null,
            login: null,
            password: null,
            name: null,
            api_key: null,
            sip_number: null,
            sip_password: null
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
        name: 'ФИО',
        role: 'Роль',
        status: 'Статус',
        sip_number: 'Внутренний номер',
        sip_password: 'SIP Пароль'
    },

    status: [
        { value: 1, text: 'Новый' },
        { value: 2, text: 'Активный' },
        { value: 10, text: 'Не активный' },
    ],
}