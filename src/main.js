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
    /* 购物车数据 格式: id(key):num(value) */
    carData: JSON.parse(window.localStorage.getItem('heimaBBB')) || {}
  },
  mutations: {
    /* 添加到购物车 */
    add2Car(state, obj) {
      /* 判断购物车是否含有此类商品 */
      if (state.carData[obj.id]) {
        /* 存在即增加数量 */
        state.carData[obj.id] += obj.num;
      } else {
        /* 不存在即增加商品类别 */
        /* state.carData[obj.id] = obj.num; */
        // 如果是动态增加的属性 必须使用Vue.set才可以跟踪数据改变
        // 参数1 对象 参数2 添加的属性名 参数3 属性的值
        Vue.set(state.carData, obj.id, obj.num);
      }
    }
  },
  getters: {
    /* 计算购物车商品数量 */
    shopCarNum(state) {
      let num = 0;
      for (const key in state.carData) {
        num += state.carData[key];
      }
      return num;
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
import buyCar from './components/buyCar.vue';

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
  {
    path: '/buyCar',
    component: buyCar,
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

/* 页面关闭时,将数据保存至本地存储 */
window.onbeforeunload = function () {
  window.localStorage.setItem('heimaBBB', JSON.stringify(store.state.carData));
}