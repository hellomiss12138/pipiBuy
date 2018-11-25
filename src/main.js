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
/* 更改axios默认的基础地址 */
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
/* 加入到Vue原型中 */
Vue.prototype.$axios = axios;
/* 导入moment.js */
import moment from "moment";
/* 导入iview */
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
/* 导入放大镜插件 */
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

/* 导入vuex */
import Vuex from 'vuex'
Vue.use(Vuex)
/* 实例化一个store对象 */
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})


/* 定义全局过滤器 */
Vue.filter('shortTime', function (value) {
  if (!value) return ''
  return moment(value).format("YYYY年MM月DD日");
})

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
  /* 将路由加入Vue实例中 */
  router,
  /* 将vuex加入Vue实例中 */
  store
})