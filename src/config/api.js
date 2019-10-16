var domain = window.location.hostname;
var regexp = /(.*)\.yb.andreyonweb.ru/g;
var match = regexp.exec(domain);
var usr_id;
if (match !== null && typeof match[1] !== 'undefined' && match[1] !== 'undefined') {
    usr_id = match[1];
} else {
    usr_id = 'dev';
}

const BASE_URL = 'http://' + usr_id + '.api.yb.andreyonweb.ru';
const BASE_UPLOAD = 'http://' + usr_id + '.uploads.yb.andreyonweb.ru';

export default {
    url_upload: BASE_UPLOAD,
    token_login: BASE_URL + '/users/signup/get_token',
    set_profile: BASE_URL + '/users/signup/set_profile',
    users: BASE_URL + '/users/index',
    content: BASE_URL + '/content/index',

    activity: BASE_URL + '/activity/index',
    apartment: BASE_URL + '/crm/apartment',
    building: BASE_URL + '/crm/building',
    contact: BASE_URL + '/crm/contact',
    deal: BASE_URL + '/crm/deal',
    floor: BASE_URL + '/crm/floor',
    object: BASE_URL + '/crm/object',
    plan_apartment: BASE_URL + '/crm/plan_apartment',
    plan_floor: BASE_URL + '/crm/plan_floor',
    report_template: BASE_URL + '/crm/report_template',
    report: BASE_URL + '/crm/report',
    section: BASE_URL + '/crm/section',
    uploads: BASE_URL + '/uploads/index',
    calls: BASE_URL + '/crm/calls',

    manager: {
        buildings: BASE_URL + '/crm/manager/buildings',
        list: BASE_URL + '/crm/manager/list',
        tile: BASE_URL + '/crm/manager/tile'
    }
}