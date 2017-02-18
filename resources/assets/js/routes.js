import Vue from 'vue';
import VueRouter from 'vue-router';

const serverPage = Vue.component('server-page',require('./serverPage.vue'));

let routes = [
	{
		path: '/',			
		component: serverPage ,
		target:'/page/home'
	},{
		path: '/home',			
		component: serverPage ,
		target:'/page/home'
	},{
		path: '/homepage',			
		component: serverPage ,
		target:'/page/home'
	},{

		path: '/page/*',				
		component: serverPage 
	
	},
]

export default new VueRouter({
	routes,
	mode:"history",
});
