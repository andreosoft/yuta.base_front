const BASE_URL = 'http://dev.api.yb.andreyonweb.ru'

export default {
    token_login: BASE_URL + '/users/signup/get_token',
    set_profile: BASE_URL + '/users/signup/set_profile',
    users: BASE_URL + '/users/api',
    content: BASE_URL + '/content/api'
}