require('./startup');
import router from './routes';

const dataModel={  };
window.dataModel=dataModel;

// here load all our components
// e.g. 
// Vue.component('vue-rates', require('./components/rates'));
// or
// Vue.component('love', {template : '<div> Love is in the air</div'});

Vue.component('dynamic', require('./components/dynamic'));

const VueApp = new Vue({
    el: '#app',
    router,
    data: {
    	currentPageHtml:'<div>loading ....</div',
      	dataModel: dataModel,
    },
    computed: {
    	propsData() { return  {dataModel: this.dataModel } }
    },
    created() { }
    
});

window.VueApp=VueApp;


