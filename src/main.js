import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import BootstrapVue from 'bootstrap-vue'


import HomeComponent from "./components/HomeComponent.vue";
import ResultComponent from "./components/ResultComponent.vue";
import NotfoundComponent from "./components/NotfoundComponent.vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false;

const routes = [
	{
		path: '/',
		component: HomeComponent
	},{
		path: '/home',
		component: HomeComponent
	},
	{
		path: '/result',
		component: ResultComponent
	},
	{
		path: '*',
		component: NotfoundComponent
	}
];
Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({
	routes
});

new Vue({
  render: h => h(App),
  router: router
}).$mount("#app");
