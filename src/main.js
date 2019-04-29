import Vue from 'vue'
import App from './App.vue'
import router from './assets/js/router'
import qs from 'qs'
import axios from 'axios'
// VueScroller 滚动插件  (停用浏览器滚动条 阻止 IOS 橡皮筋效果)
import VueScroller from "vue-scroller"
Vue.use(VueScroller);

// vant ui
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import rem from './assets/js/rem'  //--------- rem
import {post,fetch,patch,put} from './assets/js/http' //---------封装axios请求函数
import api from './assets/js/api' //---------api 接口集引入
import store from './assets/js/store'   //引入状态管理 store
// import Base from './assets/js/baseFun.js'         //---------自定义的公共函数和公共请求方法

//定义全局变量
Vue.prototype.$post=post;   //----------post 请求
Vue.prototype.$get=fetch;   //----------get 请求
Vue.prototype.$patch=patch;   //----------patch 请求
Vue.prototype.$put=put;   //----------put 请求
Vue.prototype.api=api;   //----------api 请求地址集
Vue.prototype.$qs=qs; //-------qs
Vue.prototype.router=router; // 挂载路由
Vue.prototype.state = store.state // -------- 挂载token


Vue.prototype.examineCookie = Name => {   //  --------- 挂载 获取 cookie
  var search = Name + "="//查询检索的值
  var returnvalue = "";//返回值
  if (document.cookie.length > 0) {
    let sd = document.cookie.indexOf(search);
    if (sd!= -1) {
       sd += search.length;
       let end = document.cookie.indexOf(";", sd);
       if (end == -1)
        end = document.cookie.length;
        //unescape() 函数可对通过 escape() 编码的字符串进行解码。
       returnvalue=unescape(document.cookie.substring(sd, end))
     }
  } 
  return returnvalue;
}

// 检查 cookie
if(Vue.prototype.examineCookie('userId') != ""){
  store.commit('getCookieUser') 
  // 获取产品列表
  store.dispatch('getProductList') 
}

new Vue({
  router,
  axios,
  store,          //-----全局变量
  render: h => h(App)
}).$mount('#app')
