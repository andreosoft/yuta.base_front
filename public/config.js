var config = {
    db: {
        crm_apartments: {
            fields: {
                status: {
                    level_edit: 3,
                    db_type: 'int',
                    type: 'select',
                    title: 'Статус',
                    default: '1',
                    validate: ['req'],
                    data: [
                        { value: 1, text: 'Свободно', color: '#00d61e' },
                        { value: 2, text: 'Забронированно', color: '#d6a100' },
                        { value: 3, text: 'Не активный', color: '#9a9996' },
                        { value: 3, text: 'Продана', color: '#a1abc7' },
                        { value: 4, text: 'Не для продажи', color: '#bbbbbb' },
                    ]
                }
            }
        }
    },
    apartment: {
        status: [
            { value: 1, text: 'Свободно', color: '#00d61e' },
            { value: 2, text: 'Забронированно', color: '#d6a100' },
            { value: 3, text: 'Не активный', color: '#9a9996' },
            { value: 3, text: 'Продана', color: '#a1abc7' },
            { value: 4, text: 'Не для продажи', color: '#bbbbbb' },
        ]
    }
}