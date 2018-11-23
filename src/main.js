import Vue from 'vue'
import App from './App.vue'
/* 引入样式文件 */
import './assets/css/style.css';
/* 引入路由 */
import VueRouter from 'vue-router'
Vue.use(VueRouter)
/* 引入eleUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
/* 引入全局axios */
import axios from 'axios';
/* 加入到Vue原型中 */
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

/* 导入组件 */
import index from './components/index.vue';
import details from './components/details.vue';

/* 路由规则 */
let routes = [{
    path: '/',
    redirect: '/index',
  }, {
    path: '/index',
    component: index,
  },
  {
    path: '/details/:id',
    component: details,
  },
]

/* 创建路由实例 */
let router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})