import request from '@/api/request'

export function login(data:any){
	return request({
		url: '/login',
		method: "post",
		data
	})
}

export function register(data:any){
	return request({
		url: '/registerUser',
		method: "post",
		data
	})
}

export function insertDevice(data:any){
	return request({
		url: '/insertDevice',
		method: "post",
		data
	})
}

export function deleteDevice(data:any){
	return request({
		url: '/deleteDevice',
		method: "post",
		data
	})
}

export function devicesList(data:any){
	return request({
		url: '/deviceList',
		method: "post",
		data
	})
}

export function deviceDetail(data:any){
	return request({
		url: '/deviceDetail',
		method: "post",
		data
	})
}

export function loraDeviceData(data:any){
	return request({
		url: '/lora/device/dataLoRaQuery',
		method: "post",
		data
	})
}

export function loraDeviceStatus(data:any){
	return request({
		url: '/lora/device/statusLoRaQuery',
		method: "post",
		data
	})
}
