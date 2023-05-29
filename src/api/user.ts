import request from '@/api/request'

export function login(data:JSON){
	return request({
		url: '/login',
		method: "post",
		data
	})
}

export function register(data:JSON){
    console.log("email+password:", data);
	return request({
		url: '/register',
		method: "post",
		data
	})
}
