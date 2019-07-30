export default {

  Fields() {
    this.fields = {
      login: '',
      password: '',
    }
  },

  validators: {
    login: ['req'],
    password: ['req'],
  },

  labels: {
    login: 'Логин',
    password: 'Пароль',
  }
  
}
