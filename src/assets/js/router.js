import Vue from 'vue'
import Router from 'vue-router'
import Login from '../../views/Login.vue' // 登陆页
import ContractList from '../../views/contractList.vue' // 合同列表

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/ContractList',
      name: 'ContractList',
      component: ContractList
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name != "Login" && Vue.prototype.examineCookie("userId") == "") {     // 哪些需要验证
    router.push({name: 'Login'})
  } else {
    next()                                                       // 确保一定要调用 next()
  }
})

export default router;