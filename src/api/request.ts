import axios from 'axios'
import config from '@/api/config'
import Cookies from 'js-cookie'
import store from '../store/index.js'
import { useRouter } from 'vue-router';


const NETWORK_ERROR = '网络请求错误，请稍后重试...'


const service = axios.create({
    baseURL: config.baseApi,
})

service.interceptors.request.use((req) => {
    return req
})

service.interceptors.response.use((res) => {
    if (res.status === 200) {
        return res
    } else {
        return res
    }
})

let tokenRefresher = async () => {
    let router = useRouter()
    let now = new Date().getTime()
    if (now - Cookies.get('last_token_refresh_time') > 1000 * 60 * 4) {
        let res = await service({
            url: '/api/token/refresh/',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${Cookies.get('access_token')}`
            },
            data: {
                refresh: `${Cookies.get('refresh_token')}`
            }
        })
        if (res.status === 200) {
            store.commit('setAccessToken', res.data.access)
        } else if (res.status === 403) {
            // refresh token过期了，要求重新登录
            store.commit('clearRefreshToken')
            store.commit('clearAccessToken')
            router.push({
                name: 'login'
            })
        }
    }
}

function request(options) {
    options.method = options.method || 'get' // 如果没有传入method这个参数，就默认是get请求
    if (options.method.toLowerCase() === 'get') {
        // console.log(options)
        options.params = options.data
    }
    // 如果可以从cookie中获取到access_token，就添加到header中
    if (Cookies.get('access_token')) {
        // 设置token之前先检查是否需要更新token
        tokenRefresher()
        service.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access_token')}`
    }
    return service(options)
}

export default request