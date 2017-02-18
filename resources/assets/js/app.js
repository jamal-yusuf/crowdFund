const dataModel={  ratesData : {date:null}};
window.dataModel=dataModel;


require('./startup');

var Loading = {
	template: `<div></div>`
}

var myMitsos={ props: ['arg', 'what' ], name: 'my-mitsos', template : '<div> I am mitsos {{ arg }}  </div>'};

var dynamic = {
	functional: true,
  	props: {
  		template: String,
    	data: { type: Object, default: () => ({}) }
  	},

 	render(h, context) {
  	const template = context.props.template;
    const dynComponent = {
    		template,
      		data() { return context.props.data },
      		components: { 'vue-rates' : require('./components/rates.vue') , 'my-mitsos' : myMitsos}
    }
    const component = template ? dynComponent : Loading;
    return h(component);
  }
};


import router from './routes';


const VueApp = new Vue({
    el: '#app',
    router,
    data: {
    	  currentPageHtml:'<div>waiting ....</div',
    	  dataModel: dataModel,
    },
    components: { 'my-mitsos' : myMitsos, 'vue-rates' : require('./components/rates.vue') , dynamic },
    computed: {
    			propsData() { return  {dataModel: this.dataModel } }
    },
    created() { 
    axios.get('https://api.fixer.io/latest?base=EUR&symbols=GBP,USD,EUR').then(  (ret)=> { this.dataModel.ratesData=ret.data} ) }
    
});


window.VueApp=VueApp;


