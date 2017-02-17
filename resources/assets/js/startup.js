
window.$ = window.jQuery = require('jquery');

require('bootstrap-sass');

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';


Vue.use(VueRouter);

window.Vue=Vue;
window.VueRouter=VueRouter;
window.axios=axios;

window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};
