import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Dialog,Toast } from 'vant';
Vue.use(Dialog,Toast);

axios.defaults.timeout = 20000;
axios.defaults.baseURL = 'http://ynja.milaizhijie.com/';

//http request 拦截器
axios.interceptors.request.use(
    config => {
        if(!config.data.Toast){
            Toast.loading({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'circular',
                message: '数据加载中'
            });
        }
        config.headers = {
            'Content-Type':config.data.ifQS?'application/x-www-form-urlencoded; charset=UTF-8':'multipart/form-data',
            'x-requested-with':'XMLHttpRequest'
        }
        if(config.data.ifQS){
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        Toast.clear();
        if(response.data.status != 1){
            Dialog.alert({
                message: response.data.msg == undefined?"无 status 值":response.data.msg
            }).then(() => {
            // on close
            });
        }
        return response;
    },
    error => {
        Toast.clear();
        Dialog.alert({
            message: error
        }).then(() => {
        // on close
        });
        return Promise.reject(error)
    }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url,data = {},Toast = false,ifQS = true){
    data.Toast = Toast
    data.Token = Vue.prototype.state.loginUser.token
    data.ifQS = ifQS
    if(!ifQS){
        data.append('Token', Vue.prototype.state.loginUser.token);
    }
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                if(response.data.status == 1){
                    resolve(response.data);
                }
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}