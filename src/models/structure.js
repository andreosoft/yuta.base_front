export default {
    Fields() {
        this.fields = {
            name: '',
            type: '',
            data: {
                options: [],
                showtable: false,
                moneytype: {}
            }
        }
    },

    validators: {
        name: ["req"],
        type: ["req"]
    },

    labels: {
        name: 'Наименование поля',
        type: 'Тип поля',
        showtable: 'Показывать в таблице'
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
        },
        crm_apartments: {
            name: "Помещения",
            a_title: "Открыть настройки полей помещений"
        },
        crm_finance: {
            name: "Финансы",
            a_title: "Открыть настройки полей Финансы"
        },
        crm_tasks: {
            name: "Задачи",
            a_title: "Открыть настройки полей Задачи"
        }
    },

    types: [
        { value: 'string', text: 'Текстовое поле' },
        { value: 'text', text: 'Текстовая область' },
        { value: 'int', text: 'Цифровое поле' },
        { value: 'money', text: 'Денежное поле' },
        { value: 'select', text: 'Список' },
        { value: 'selectmany', text: 'Мульти список' },
        { value: 'checkbox', text: 'Флаг' },
        { value: 'radiobox', text: 'Переключатель' },
        { value: 'date', text: 'Дата' },
        { value: 'href', text: 'Ссылка' }
    ],

    can_edits: [
        { value: '0', text: 'Основное' },
        { value: '1', text: 'Дополнительное' },
    ]
}