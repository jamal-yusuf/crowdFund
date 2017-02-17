import Vue from 'vue';
import VueRouter from 'vue-router';

const SERVER_PAGE = Vue.component('any-vue',require('./serverPage.vue'));

let routes = [
	{
		path: '/',			
		component: SERVER_PAGE ,
		target:'/page/home'
	},{
		path: '/home',			
		component: SERVER_PAGE ,
		target:'/page/home'
	},{
		path: '/homepage',			
		component: SERVER_PAGE ,
		target:'/page/home'
	},{
		path: '/page/home',			
		component: SERVER_PAGE ,
	},{
		path: '/page/about',			
		component: SERVER_PAGE ,
	},{
		path: '/page/howitworks',				
		component: SERVER_PAGE 
	},{
		path: '/page/donate',				
		component: SERVER_PAGE 
	},{
		path: '/page/launch',				
		component: SERVER_PAGE 
	},{
		path: '/page/team',				
		component: SERVER_PAGE 
	},{
		path: '/page/partners',				
		component: SERVER_PAGE 
	},{
		path: '/page/faq',				
		component: SERVER_PAGE 
	},{
		path: '/page/login',				
		component: SERVER_PAGE 
	},{
		path: '/page/all',				
		component: SERVER_PAGE 
	},{
		path: '/page/register',				
		component: SERVER_PAGE 
	},{
		path: '/page/contact-us',				
		component: SERVER_PAGE 
	},
]

export default new VueRouter({
	routes,
	mode:"history",
});
