require('./startup');


import router from './routes';

const VueApp = new Vue({
    el: '#app',
    router,

});

