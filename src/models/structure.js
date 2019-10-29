export default {
    fields: {
        name: '',
        type: '',
    },

    validators: {
        name: ["req"],
        type: ["req"]
    },

    labels: {
        name: 'Наименование поля',
        type: 'Тип поля'
    },

    categories: {
        crm_contacts: {
            name: "Контакты",
            a_title: "Открыть настройки полей контактов"
        },
        crm_deals: {
            name: "Сделки",
            a_title: "Открыть настройки полей сделок"
        },
        crm_objects: {
            name: "Объекты",
            a_title: "Открыть настройки полей объектов"
        }
    },

    types: [
        {value: 'TEXT', text: 'Текстовое'},
        {value: 'INT', text: 'Числовое'},
        {value: 'SELECT', text: 'Выбор'},
    ]
}