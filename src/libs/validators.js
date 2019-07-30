export default {
  methods: {
    validator: function (types, value) {
      var ferror = ''      
      for (var el of types) {
        if (el == 'req' && (value == '' || value == null )) {
          ferror = 'Это поле обязательно.'
        } else if (el == 'pass' && value.length < 6) {
          ferror = 'Пароль не менее 6 символов.'
        } else if (el == 'email' && value != '' && !this.validEmail(value)) {
          ferror = 'Укажите корректный адрес электронной почты.'
        } else if (el == 'login') {
          this.validLogin(value)
        }
      }
      return ferror
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validLogin: function(login) {
      return true
    }
  }
}