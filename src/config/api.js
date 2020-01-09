var domain = window.location.hostname;
var regexp = /(.*)\.yuta.pro/g;
var match = regexp.exec(domain);
var usr_id;
if (match !== null && typeof match[1] !== 'undefined' && match[1] !== 'undefined') {
    usr_id = match[1];
} else {
    usr_id = 'dev';
}

const BASE_URL = 'http://' + usr_id + '.api.yuta.pro';
const BASE_UPLOAD = 'http://' + usr_id + '.uploads.yuta.pro';

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
    contact_get_deals: BASE_URL + '/crm/contact/get_deals',
    contact_get_comments: BASE_URL + '/crm/contact/get_comments',
    contact_add_comments: BASE_URL + '/crm/contact/add_comments',
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
    structure: BASE_URL + '/db/structure',
    structure_data: BASE_URL + '/db/structure/data',
    structure_order: BASE_URL + '/db/structure/order',
    finance: BASE_URL + '/crm/finance',

    manager: {
        buildings: BASE_URL + '/crm/manager/buildings',
        list: BASE_URL + '/crm/manager/list',
        tile: BASE_URL + '/crm/manager/tile'
    }
}