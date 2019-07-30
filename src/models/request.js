export default {
 
  Fields() {
    this.fields = {
      id: null,
      name: null,
      createdon: null,
      createdby_id: null,
      status: null,
      phone: null,
      phone_second: null,
      email: null,
      telegram: null,
      watsapp: null,
      info: null
    }
  },

  validators: {
    phone: ['req', 'phone'],
    name: ['req'],
  },

  labels: {
    name: 'ФИО',
    status: 'Статус',
    phone: 'телефон',
    phone_second: 'Доп телефон',
    email: 'Email',
    telegram: 'Telegram',
    watsapp: 'Watsapp',
    info: 'Информация'
  },
  
  status: [
    {value: 10, text: 'Новый'},
    {value: 20, text: 'Недозвон'},
    {value: 30, text: 'Не активный'},
    {value: 40, text: 'Не существует'},
    {value: 50, text: 'Перезвонить'},
    {value: 60, text: 'Занят'},
    {value: 70, text: 'Закончен'},
  ]
}
