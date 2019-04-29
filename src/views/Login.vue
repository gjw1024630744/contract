<template>
  <div class="Login">
    <div class="item">
      <div class="label">
        <i class="iconfont iconyonghuming"></i>
      </div>
      <div class="content">
        <input type="text" placeholder="请输入用户名" v-model="userName">
      </div>
    </div>
    <div class="item">
      <div class="label">
        <i class="iconfont iconmima"></i>
      </div>
      <div class="content">
        <input type="password" placeholder="请输入密码" v-model="userPas">
      </div>
    </div>
    <div class="item">
      <button
        class="login-btn activeStyle"
        @click="login({'userName':userName,'userPas':userPas})"
      >登 陆 账 号</button>
    </div>
  </div>
</template>

<script>
import { get } from "http";
import { mapState, mapMutations, mapActions } from "vuex"; // vuex 辅助函数
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      userPas: ""
    };
  },
  mounted(){
  },
  computed:{
    ...mapState({
      loginUser: state => state.loginUser
    })
  },
  methods: {
    ...mapActions({
      login: "login"
    })
  },
  mounted() {
    this.userName = this.loginUser.account
    this.userPas = this.loginUser.pas
  }
};
</script>
<style scoped lang="less">
.Login {
  width: 100%;
  height: 100%;
  background: url(./../assets/images/login_bg.png) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .item {
    display: flex;
    width: 5rem;
    margin-bottom: 20px;
    .label {
      flex: 1;
      max-width: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        color: #00be6e;
        font-size: 24px;
      }
    }
    .content {
      flex: 1;
      input {
        width: 100%;
        background-color: inherit;
        border: 0;
        line-height: 45px;
        border-bottom: 2px solid #99e5c5;
        box-sizing: border-box;
        padding: 0 5px;
        font-size: 0.28rem;
      }
      input:focus {
        transition: 1s;
        border-bottom: 2px solid #1fb776;
      }
    }
    .login-btn {
      width: 90%;
      border: 0;
      background-color: #00be6e;
      font-size: 0.3rem;
      color: #fff;
      margin: 0 auto;
      padding: 0.28rem;
      border-radius: 0.6rem;
      margin-top: 50px;
    }
  }
}
</style>

