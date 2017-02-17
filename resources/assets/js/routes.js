import VueRouter from 'vue-router';

const ANY_VUE = resolve => require(['./_template.vue'], resolve);

let routes = [
	{	
		path: '/',				
		component: require('./vpages/home') 
	},{
		path: '/homepage',				
		component: require('./vpages/home') 
	},{
		path: '/page/about',			
		component: ANY_VUE ,
		canreuse:false
	},{
		path: '/page/howitworks',				
		component: ANY_VUE 
	},{
		path: '/page/donate',				
		component: ANY_VUE 
	},{
		path: '/page/launch',				
		component: ANY_VUE 
	},{
		path: '/page/team',				
		component: ANY_VUE 
	},{
		path: '/page/partners',				
		component: ANY_VUE 
	},{
		path: '/page/faq',				
		component: ANY_VUE 
	},{
		path: '/page/login',				
		component: ANY_VUE 
	},{
		path: '/page/all',				
		component: ANY_VUE 
	},{
		path: '/page/register',				
		component: ANY_VUE 
	},{
		path: '/page/contact',				
		component: ANY_VUE 
	},
]

export default new VueRouter({
	routes,
	mode:"history",

});
