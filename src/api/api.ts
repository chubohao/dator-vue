import request from "./request.ts";


export default {
    login(params) {
        return request({
            url: '/api/token/',
            method: 'post',
            data: params,
            mock: false
        })
    },
    refreshToken(params) {
        return request({
            url: '/api/token/refresh',
            method: 'post',
            data: params,
            mock: false
        })
    }
}