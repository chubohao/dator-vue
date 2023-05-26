import request from '@/api/request'

/*
export function login(data:any){
	return request({
		url:'/api/course/mostNew',
		method:"post",
		data
	})
}
*/

export function login(data:any){
    console.log(data);
	return {
		status:200,
        msg: "ok",
        token: "123123"
	}
}
