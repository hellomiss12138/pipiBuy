import Vue from 'vue'
import App from './App.vue'
/* 引入样式文件 */
import './assets/css/style.css';
/* 引入路由 */
import VueRouter from 'vue-router'
Vue.use(VueRouter)

Vue.config.productionTip = false

/* 导入组件 */
import index from './components/index.vue';

/* 路由规则 */
let routes = [{
  path: '/',
  redirect: '/index',
}, {
  path: '/index',
  component: index,
}, ]

/* 创建路由实例 */
let router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})