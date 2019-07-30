export default {
  Fields() {
    this.fields = {
      id: null,
      createdon: null,
      is_parent: null,
      parent_id: null,
      name: null,
      content: '',
      intro: null,
      status: null,
      image: null,
      url: null,
    }
  },
  
  validators: {
    name: ['req']
  },

  labels: {
    id: '#',
    name: 'Наименование',
    createdon: 'Тема вопроса',
    is_parent: 'Каталог',
    parent_id: 'ID Родителя',
    content: 'Содержимое',
    intro: 'Вводный текст',
    status: 'Статус',
    image: 'Изображение',
    url: 'URL',
  },

  status: [
    {value: 0, text: 'Не активный'},
    {value: 1, text: 'Активный'},
    {value: 10, text: 'Удален'}
  ],
}
