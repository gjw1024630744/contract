import Vue from 'vue';
import Vuex from 'vuex'; //引入 vuex
import store from './store' //注册store
import {post,fetch,patch,put} from './http' //---------封装axios请求函数
import api from './api' //---------api 接口集引入
import axios from 'axios'
const GET = fetch;  // get请求
const POST = post;  // get请求
import { Notify } from 'vant';
Vue.use(Vuex,Notify); //使用 vuex


export default new Vuex.Store({
    state: {
        loginUser:{
            // 账号
            account:null,
            // 密码
            pas:null,
            // token
            token:null,
        },
        // 合同页面状态
        contract:{
            // 合同列表
            list:[],
            // 合同产品列表
            productList:[],
            // 出借方式列表
            payModeList:[],
            // 还款方式列表
            lendingMode:['按月','到期'],
            // 合同页面开关
            contractInfoState: false,
            // 合同状态列表
            contractState: [
                {
                    name:'待审核',
                    id:1,
                },
                {
                    name:'审核通过',
                    id:2,
                },
                {
                    name:'合同已终止',
                    id:3,
                },
            ],
            // 合同详情
            details:{
                Contract_ID:'',     // 合同ID
                Contract_Num:'',    // 合同编号
                Contract_CustomerID:'', // 客户ID
                Contract_ProductID:'',  // 产品ID
                Contract_IsFirstThrow:'',  // 是否首投
                Contract_Phone:'',  // 电话号码
                Contract_BankNumber:'', // 银行卡号
                Contract_TimeLimit:'',  // 期限
                Contract_PayModeID:'',  // 出借方式
                Contract_Rate:'',   //  利率
                Contract_RateStamp:'',  // 加息卷
                Contract_LendingAmount:'',  // 借出金额
                Contract_LendingSTime:'',   // 借出开始时间
                Contract_LendingETime:'',   // 借出结束金额
                Contract_LendingMode:'',    // 还款方式
                Contract_File:'',   // 合同附件
                Contract_UserID:'', // 所属业务员
                Contract_State:'',  // 合同状态
                Contract_ReviewerID:'',     // 审核人
            }
        }
    },
    mutations: {
        // cookie 获取填写 用户信息
        getCookieUser(state, payload){
            let users = JSON.parse(Vue.prototype.examineCookie('userId'))
            state.loginUser.account = users.name
            state.loginUser.pas = users.pas
            state.loginUser.token = users.token
        },
        // 合同页面开关
        contractInfoStateChanges(state, payload) {
            state.contract.contractInfoState = !state.contract.contractInfoState
        },
        // 新增合同页面
        addcontract(state, payload) {
            state.contract.contractInfoState = !state.contract.contractInfoState;
        },
        // 登陆后进行修改token 并执行跳转
        login(state, payload){
            state.loginUser.account = payload.account
            state.loginUser.token = payload.token
            Vue.prototype.router.replace({name:'ContractList'})
        },
        //  追加合同列表数据
        addcCntractList(state, payload){
            if(payload.Page == 1){
                state.contract.list = []
            }
            for(let i=0; i < payload.List.length; i++){
                let item = state.contract.list.find(({Contract_ID}) => payload.List[i].Contract_ID === Contract_ID);
                if(!item){
                    if(payload.Page == 0){
                        state.contract.list.unshift(payload.List[i])
                    }else{
                        state.contract.list.push(payload.List[i])
                    }
                }else{
                    for(let a = 0; a<state.contract.list.length; a++){
                        if(state.contract.list[a].Contract_ID == payload.List[i].Contract_ID){
                            state.contract.list[a] = payload.List[i]
                        }
                    }
                }
            }
        },
        // 修改产品列表
        updataProductList(state, payload){
            state.contract.productList = payload
        },
        // 修改合同页面状态
        updataPayModeList(state, payload){
            state.contract.payModeList = payload
        },
        // 生成合同详情提交信息
        generateContractDetails(state, payload){
            payload.append('Contract_ID', state.contract.details.Contract_ID);
            payload.append('Contract_UserID', state.contract.details.Contract_UserID);
            let details = {
                formData:payload,
                success:res => {
                    this.commit('contractInfoStateChanges')
                    Notify({
                        message: '保存成功',
                        duration: 1000,
                        background: '#1989fa'
                    });
                    let arrs = {List:[],Page:0};
                    arrs.List.push(res)
                    this.commit('addcCntractList',arrs);
                }
            }
            this.dispatch('submitContract',details)
        },
        // 修改合同详情信息
        updataContractDetails(state, payload){
            let details = {
                Contract_ID: payload.Contract_ID,     // 合同ID
                Contract_Num: payload.Contract_Num,    // 合同编号
                Contract_CustomerID: payload.Contract_CustomerID, // 客户ID
                Contract_ProductID: payload.Contract_ProductID,  // 产品ID
                Contract_IsFirstThrow: payload.Contract_IsFirstThrow,  // 是否首投
                Contract_Phone: payload.Contract_Phone,  // 电话号码
                Contract_BankNumber: payload.Contract_BankNumber, // 银行卡号
                Contract_TimeLimit: payload.Contract_TimeLimit,  // 期限
                Contract_PayModeID: payload.Contract_PayModeID,  // 出借方式
                Contract_Rate: payload.Contract_Rate,   //  利率
                Contract_RateStamp: payload.Contract_RateStamp,  // 加息卷
                Contract_LendingAmount: payload.Contract_LendingAmount,  // 借出金额
                Contract_LendingSTime: payload.Contract_LendingSTime,   // 借出开始时间
                Contract_LendingETime: payload.Contract_LendingETime,   // 借出结束金额
                Contract_LendingMode: payload.Contract_LendingMode,    // 还款方式
                Contract_File: payload.Contract_File,   // 合同附件
                Contract_UserID: payload.Contract_UserID, // 所属业务员
                Contract_State: payload.Contract_State,  // 合同状态
                Contract_ReviewerID: payload.Contract_ReviewerID,     // 审核人
                Product_Name: payload.Product_Name,     // 产品名
                Customer_Name:payload.Customer_Name,     // 客户名
            }
            state.contract.details = details;
            this.commit('contractInfoStateChanges');
        },
         // 新增合同详情信息
        addContractDetails(state, payload){
            let details = {
                Contract_ID:'',     // 合同ID
                Contract_Num:'',    // 合同编号
                Contract_CustomerID:'', // 客户ID
                Contract_ProductID:'',  // 产品ID
                Contract_IsFirstThrow:'',  // 是否首投
                Contract_Phone:'',  // 电话号码
                Contract_BankNumber:'', // 银行卡号
                Contract_TimeLimit:'',  // 期限
                Contract_PayModeID:'',  // 出借方式
                Contract_Rate:'',   //  利率
                Contract_RateStamp:'',  // 加息卷
                Contract_LendingAmount:'',  // 借出金额
                Contract_LendingSTime:'',   // 借出开始时间
                Contract_LendingETime:'',   // 借出结束金额
                Contract_LendingMode:'',    // 还款方式
                Contract_File:'',   // 合同附件
                Contract_UserID:'', // 所属业务员
                Contract_State:'',  // 合同状态
                Contract_ReviewerID:'',     // 审核人
            }
            state.contract.details = details;
            this.commit('contractInfoStateChanges');
        },
        // 删除
        deleteContractbyid(state, payload){
            for(let i = 0; i < state.contract.list.length; i++){
                if(state.contract.list[i].Contract_ID == payload.Id){
                    state.contract.list.splice(i, 1)
                }
            }
        }
    },
    actions: {
        // context.commit   调用 mutations 方法修改
        // store.dispatch   调用 actions 方法继续异步执行
        // 登陆
        login(context, param) {
            POST(api.login,{
                Name:param.userName,
                Pwd:param.userPas
            }).then(res => {
                // 设置 cookie
                var date=new Date();
                var expiresDays=4;
                //将date设置为3天以后的时间
                date.setTime(date.getTime()+expiresDays*24*3600*1000);
                //将cookie设置为10天后过期
                document.cookie='userId={"name":"'+param.userName+'","pas":"'+param.userPas+'","token":"'+res.token+'"}; expires='+date.toGMTString();
                context.commit('login', {account:param.userName,token:res.token})
                // 获取产品列表
                store.dispatch('getProductList')  
            })
        },
        // 获取合同列表
        getContractList(context, param){
            POST(api.getContractList,{
                KeyWord:param.contractNumbering,
                Page:param.page,
                Rows:param.article
            }).then(res => {
                context.commit('addcCntractList', {List:res.list,Page:param.page})
                return param.success(res)
            })
        },
        // 获取产品列表
        getProductList(context, param){
            POST(api.getProductList).then(res => {
                context.commit('updataProductList', res.list)
                // 获取支付方式列表
                store.dispatch('getPayModeList')
            })
        },
        // 获取支付方式列表
        getPayModeList(context, param){
            POST(api.getPayModeList).then(res => {
                context.commit('updataPayModeList', res.list)
            })
        },
        // 提交新增或修改 合同
        submitContract(context, param){
            POST(api.savecontract,param.formData,false,false).then(res => {
                return param.success(res)
            })
        },
        // 获取合同详情
        getContractDetails(context, param){
            POST(api.findcontractbyid,{Id:param.id}).then(res => {
                context.commit('updataContractDetails', res)
            })
        },
        // 删除合同
        removecontractbyid(context, param){
            POST(api.removecontractbyid,{Id:param.id}).then(res => {
                this.commit('deleteContractbyid',{Id:param.id})
                this.commit('contractInfoStateChanges')
                Notify({
                    message: '删除成功',
                    duration: 1000,
                    background: '#f00'
                });
            })
        }
    },
    getters: {
        count: state => {
            return state.count
        }
    }
})