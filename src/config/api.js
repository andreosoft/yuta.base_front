var domain = window.location.hostname;
var regexp = /(.*)\.yb.andreyonweb.ru/g;
var match = regexp.exec(domain);
if (typeof match[1] === 'undefined') {
    console.exception('Error site name');
}

const BASE_URL = 'http://' + match[1] + '.api.yb.andreyonweb.ru'

export default {
    token_login: BASE_URL + '/users/signup/get_token',
    set_profile: BASE_URL + '/users/signup/set_profile',
    users: BASE_URL + '/users/api',
    content: BASE_URL + '/content/api'
}