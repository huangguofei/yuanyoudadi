/*路由*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import adminRouter from './admin-router'

import "../../static/ueditor/ueditor.config"
import "../../static/ueditor/ueditor.all"
import "../../static/ueditor/lang/zh-cn/zh-cn"

Vue.use(VueRouter)

/*服务站登录*/
const adminLogin = r => require.ensure([], () => r(require('../page/admin/login')), 'adminLogin')
/*主页*/
const main = r => require.ensure([], () => r(require('../page/admin/index')), 'main')

export const router = new VueRouter({
	mode : "history",
	base: __dirname,
	routes : [
	    {
			path : "/",
			component : adminLogin,
		},
		{
			path : "/login",
			component : adminLogin,
		},
		{
			path : "/main",
			component : main,
			children : adminRouter.router
		}
		
	]
})
//router.beforeEach((to, from, next) => {
	//next();
	/*var path = to.path;
	var userInfo = common.getCookie("userInfo");
	var token = "";
	if(userInfo) {
		userInfo = JSON.parse(userInfo);
		if(userInfo) {
			token = userInfo.token;
		}
	}
	if(path == "/main/login") {
		next();return false;
	}
	/*运营后台*/
	/*if(path.indexOf("/main") >= 0) {
		if(token) {
 			next();
		} else {
			next({path : "/main/login"});
		}
	} else {
		 next();
	}*/
//})
new Vue({
	router,
	store
}).$mount("#app")


