var domain = window.location.hostname;
var regexp = /(.*)\.yuta.pro/g;
var match = regexp.exec(domain);
var usr_id;
if (match !== null && typeof match[1] !== 'undefined' && match[1] !== 'undefined') {
    usr_id = match[1];
} else {
    usr_id = 'glavstroy';//'dev';
}

const BASE_URL = 'https://api.' + usr_id + '.yuta.pro';
const BASE_UPLOAD = 'https://uploads.' + usr_id + '.yuta.pro';

export default {
    base_url: BASE_URL,
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
    contact_get_calls: BASE_URL + '/crm/contact/get_calls',
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
    options_data: BASE_URL + '/config/options/data',
    options: BASE_URL + '/config/options',
    structure: BASE_URL + '/db/structure',
    structure_data: BASE_URL + '/db/structure/data',
    structure_order: BASE_URL + '/db/structure/order',
    finance: BASE_URL + '/crm/finance',
    tasks: BASE_URL + '/crm/tasks',

    manager: {
        buildings: BASE_URL + '/crm/manager/buildings',
        list: BASE_URL + '/crm/manager/list',
        tile: BASE_URL + '/crm/manager/tile'
    },

    reports: {
        rep1: BASE_URL + '/crm/report/gen1',
        rep2: BASE_URL + '/crm/report/gen2',
        rep3: BASE_URL + '/crm/report/gen3',
        rep4: BASE_URL + '/crm/report/gen4',
        rep5: BASE_URL + '/crm/report/gen5'
    }
}