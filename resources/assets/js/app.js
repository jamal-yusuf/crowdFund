require('./startup');



// here load all our components
// e.g. 
Vue.component('vue-rates', require('./components/rates'));
// or
// Vue.component('love', {template : '<div> Love is in the air</div'});

//Vue.component('dynamic', require('./components/dynamic'));

import router from './routes';

const VueApp = new Vue({
    el: '#app',
    router,
    data: {
    	somevar: 'YES !!!!!'
    },
    created() { }
    
});

window.VueApp=VueApp;

function gotoPage(page){
	router.push(page);
}

window.gotoPage=gotoPage;
require('./pages/home');

import Utils from './utils';

window.Utils=Utils;
