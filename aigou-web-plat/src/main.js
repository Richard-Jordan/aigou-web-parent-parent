import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
//禁用mock，mock便不会拦截请求了
//import Mock from './mock'
//Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:1299/services'  //基本的url，项目中使用axios发送的所有请求都会把它作为请求的前缀
//   /user
// 将API方法绑定到全局  /plat/login
Vue.prototype.$http = axios     //js对象的原型   this.$http.post().then((res)=>{})
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });
//路由对象
const router = new VueRouter({
    routes:routes
})
//每次路由之前做的事情
router.beforeEach((to, from, next) => {
    //NProgress.start();
    //如果跳转到登录界面，从前端session中删除存储的用户信息
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    //如果session中没有user并且跳转的路径非登录路径
    if (!user && to.path != '/login') {
        //跳转到登录页面
        next({ path: '/login' })
    } else {
        //放行
        next()
    }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')

