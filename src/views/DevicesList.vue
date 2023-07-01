<script lang="ts">
import { useAppVariableStore } from '@/stores/app-variable';
import { useAppOptionStore } from '@/stores/app-option';
import { useAuthStore } from '@/stores/user-auth';
import chartjs from '@/components/plugins/Chartjs.vue';
import datepicker from 'vue3-datepicker';
import Masonry from 'masonry-layout';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { insertDevice, devicesList, deleteDevice } from "@/api/user";
import { Field } from 'vee-validate';

let appVariable = useAppVariableStore();
const appOption = useAppOptionStore();
const useAuth = useAuthStore();

interface Filed {
	name: string,
	type: string,
	desc: string
}

interface DeviceInfo {
	deviceId: string,
	deviceName: string,
	secretKey: string,
	userId: string,
	type: string,
	status: number,
	createTime: string,
	location: string,
	protocol: string,
	fields: Filed[]
}

export default {
	beforeCreate() {
		appOption.appHeaderHide = false;
		appOption.appSidebarHide = false;
		appOption.appContentClass = 'p-3';
	},
	components: {
		chartjs: chartjs,
		datepicker: datepicker
	},
	methods: {
		resetForm() {
			this.deviceVO = {
				"userId": useAuth.user.id,
				"name": "",
				"location": "",
				"protocol": "HTTP",
				"type": "Hardware Divce",
				"fields": [
					{
						"name": "",  
						"type": "String", 
						"desc": ""
					}
				]
			}
		},
		addField() {
			this.deviceVO.fields.push(
				{"name": "", "type": "String", "desc": ""}
			)
		},
		deleteField(index:any){
			this.deviceVO.fields.splice(index, 1)
		},
		getPrevDay() {
			return this.prevDay;
		},
		updateDate(newDate:any) {
			this.prevDay = moment(newDate).add(-1, 'd').format('YYYY-MM-DD');
			this.selectedDay = moment(newDate).format('YYYY-MM-DD');
		},
		getSelectedDay() {
			return this.selectedDay;
		},
		getStatuOfDevice(status:any) {
			if (status == 0){
				return {"background-color": "#2F4F4F"}
			}else if (status == 1){
				return {"background-color": "#32CD32"}
			} else {
				return {"background-color": "red"}
			}
			
		},
		getUUID(){
			return uuidv4().toUpperCase();
		},
		async onSubmit() {
			try {
				const res = await insertDevice(this.deviceVO);
				if (res.data.status == 0){
					this.closeModal();
					this.resetForm();
					this.getDevicesList();
				}
			} catch (error) {
				console.log(error)
			}
		},
		closeModal(){
			document.getElementById('close')?.click();
		},
		async getDevicesList() {
			this.devicesList = []
			const userInfo = {
				userId: parseInt(useAuth.user.id),
				page: "1",
				pageSize: "20"
			}
			try {
				const res = await devicesList(userInfo);
				if (res.data.status == 0){
					res.data.data?.forEach((element:DeviceInfo) => {
						var deviceInfo = {
							name: element.deviceName,
							uuid: element.deviceId,
							createTime: element.createTime.slice(0, 10),
							status: 1,
							img: `/assets/img/devices/DA${parseInt(element.deviceId)%10}.png`,
							location: element.location,
							dataVolume: (parseInt(element.deviceId)*2).toString(),
							trend: element.deviceId
						}
						this.devicesList.push(deviceInfo)
					
					});
				}
			} catch (error) {
				console.log(error)
			}
			
		},
		async deleteDevice(deviceId:String) {
			const deviceInfo = {
				deviceId: deviceId,
				userId: useAuth.user.id.toString()
			}
			try {
				const res = await deleteDevice(deviceInfo);
				if (res.data.status == 0){
					this.getDevicesList();
				}
			}catch (error) {
				console.log(error)
			}
		}
	},
	data() {
		return {
			dismissModal: false,
			renderComponent: true,
			picked: new Date(),
			nextDay: moment().format('D MMM'),
			selectedDay: moment().format('YYYY-MM-DD'),
			prevDay: moment().add(-1, 'd').format('YYYY-MM-DD'),
			deviceVO: {
				"userId": useAuth.user.id,
				"name": "",
				"location": "",
				"protocol": "HTTP",
				"type": "Hardware Divce",
				"fields": [
					{
						"name": "", 
						"type": "String", 
						"desc": ""
					}
				]
			},

			devicesList:  []
		}
	},
	mounted() {
		this.getDevicesList()
	}
}
</script>
<template>
	<!-- BEG 添加设备模态框 -->
	<div class="modal modal-lg" id="add" ref="add">
			<div class="modal-dialog">
				<div class="modal-content px-4 py-2">
					<!-- 模态框头部 -->
					<div class="modal-header border-0">
						<h4 class="modal-title">ADD A NEW DEVICE</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal" id="close"></button>
					</div>
				
					<!-- 设备信息 -->
					<div class="modal-body">
						<div class="mb-3">
							<form @submit.prevent="onSubmit" method="POST" name="register_form">
								<!-- 基本信息 -->
								<div>
									<h5>Basic Infomation</h5>
									<!-- 设备名字 -->
									<div class="input-group mb-3">
										<label class="input-group-text" for=""><i class="fa fa-tag" aria-hidden="true"></i></label>
										<input required type="text" class="form-control" placeholder="Device Name, e.g. LoRa Node" v-model="deviceVO.name"/>
									</div>

									<!-- 设备地址 -->
									<div class="input-group mb-3">
										<label class="input-group-text" for="">
											<i class="fa fa-map-marker" aria-hidden="true"></i>
										</label>
										<input required type="text" class="form-control" placeholder="Device Location, e.g. Duisburg" v-model="deviceVO.location"/>
									</div>
									
									<!-- 设备类型 -->
									<div class="input-group mb-3">
											<label class="input-group-text" for=""><i class="fa fa-globe" aria-hidden="true"></i></label>
											<select class="form-select" aria-label="Default select example" v-model="deviceVO.type">
												<option value="Hardware Divce">Hardware Divce</option>
												<option value="Software Device">Software Device</option>
											</select>
									</div>

									<!-- 网络协议类型 -->
									<div class="input-group mb-3">
											<label class="input-group-text"><i class="fa fa-globe" aria-hidden="true"></i></label>
											<select class="form-select" aria-label="Default select example" v-model="deviceVO.protocol">
												<option value="HTTP">HTTP</option>
												<option value="MQTT">MQTT</option>
											</select>
									</div>

									<!-- BEGIN 设备 UUID
									<div class="input-group mb-3">
										<label class="input-group-text"><i class="fa fa-barcode" aria-hidden="true"></i></label>
										<input class="form-control" placeholder="UUID" :value="newUuid" :v-model="newDeviceVO.uuid" disabled/>
									</div>
									-->
								</div>

								<!-- 字段信息 -->
								<div class="my-4">
									<h5>Field Infomation</h5>
										<div class="mb-3 d-flex" v-for="(field, index) in deviceVO.fields">
											<div class="input-group me-2">
												<label class="input-group-text" :for="field.name">
													<i class="fa fa-bars" aria-hidden="true"></i>
												</label>
												<input required type="text" :id="field.name" class="form-control" placeholder="Field Name" v-model="field.name">
											</div>

											<div class="input-group me-2">
												<label class="input-group-text" :for="field.type">
													<i class="fa fa-bookmark" aria-hidden="true"></i>
												</label>
												<select  class="form-select" :id="field.type" aria-label="Default select example" v-model="field.type" placeholder="Type e.g. Int">												
													<option value="String">String</option>
													<option value="Int">Int</option>
												</select>
											</div>

											<div class="input-group me-2">
												<label class="input-group-text" :for="field.desc">
													<i class="fa fa-globe" aria-hidden="true"></i>
												</label>
												<input type="text" :id="field.desc" class="form-control" placeholder="Field Name" v-model="field.desc">
											</div>
											
											<div class="btn btn-secondary" @click="deleteField(index)">
												<i class="fa fa-minus-square" aria-hidden="true"></i>
											</div>
										</div>
								</div>

								<!-- SUBMIT BUTTON -->
								<div class="text-center">
									<div class="btn btn-secondary" @click="addField">
										<i class="fa fa-plus-square" aria-hidden="true"></i>
									</div>
								</div>

								<!-- 模态框底部 -->
								<div class="row mt-5">
									<div class="text-center col-6">
										<button type="submit" class="btn btn-primary w-100">
											<i class="bi bi-check-lg"></i>
										</button>
										
									</div>

									<!-- 模态框底部 -->
									<div class="text-center col-6">
										<button type="reset" class="btn btn-theme w-100" @click="resetForm">
											<i class="bi bi-arrow-counterclockwise"></i>
										</button>
									</div>

								</div>
							</form>
						</div>
						
						
						
					</div>
				</div>
			</div>
	</div>
	<!-- END 添加设备模态框 -->

	<!-- BEG 搜索条件和添加按钮 -->
	<form class="d-flex align-items-center mb-3">
		<!-- BEG 添加时间 -->
		<div class="btn btn-default d-flex align-items-center me-2">
			<label for="datepicker" class="">
				<i class="fa fa-fw fa-calendar"></i>
			</label>
			<datepicker id="datepicker" class="bg-none text-reset shadow-none border-0 outline-none ps-2 w-100px" @update:modelValue="updateDate" v-model="picked" />
			<label for="datepicker" class="">
				<i class="fa fa-fw fa-caret-down me-n1"></i>
			</label>
		</div>
		<!-- END 添加时间 -->

		<!-- END 设备状态 -->
		<div class="d-flex">
			<select class="form-select">
				<option selected>Status</option>
				<option value="0">All</option>
				<option value="1">Online</option>
				<option value="2">Offline</option>
				<option value="3">Abnormal</option>
			</select>
		</div>
		<!-- END 设备状态 -->
		<button type="button" class="btn btn-default d-flex ms-2 me-auto">
			<i class="bi bi-search"></i>
		</button>

		<div class="btn btn-theme d-flex"  data-bs-toggle="modal" data-bs-target="#add">
			<i class="bi bi-plus-square"></i>
			<span class="ms-2">Add</span>
		</div>

		<!-- <span class="ms-3">compared to {{ getPrevDay() }}</span>-->
	</form>
	<!-- END 搜索条件和添加按钮 -->

	<!-- BEGIN BODY -->
	<div class="row" data-masonry='{"percentPosition": true }' v-if="renderComponent">
		<!-- BEGIN 设备列表 -->
		<div href="" class="col-lg-6 col-xl-4 mb-3 text-decoration-none" v-for="(device) in devicesList">
			<!-- BEGIN card -->
			<card class="mask">
				<card-body>
					<div class="d-flex"></div>
					<div class="row">
						<!-- BEG 设备LOGO -->
						<div class="col-3">
							<img :src="device.img" alt="" height="85">
						</div>
						<!-- END 设备LOGO -->
						
						<div class="col-9 px-3">
							<!-- BEGIN 设备名字和状态 -->
							<div class="d-flex align-items-center mb-2">
								<router-link  tag="li" class="col" class-active="active" :to="'/devices/detail?deviceId=' + device.uuid" exact>{{device.name}}</router-link>
								<div class="btn-circle" :style="getStatuOfDevice(device.status)"></div>
							</div>
							<!-- END 设备名字和状态 -->

							<!-- BEGIN 设备UUID -->
							<div class="d-flex align-items-center mb-2">
								<span class="small pe-2">ID : {{device.uuid}}</span>
								<span class="small pe-2">Date : {{device.createTime}}</span>
							</div>
							<!-- END 设备UUID -->

							<!-- BEGIN 设备位置，数据量和趋势 -->
							<div class="d-flex align-items-center">
								<div class="d-flex align-items-center mb-2">
									<i class="fa fa-map-marker pe-2" aria-hidden="true"></i>
									<div class="pe-4">{{device.location}}</div>
								</div>
								
								<div class="d-flex align-items-center mb-2">
									<i class="pe-2 fa fa-database " aria-hidden="true"></i>
									<div class="pe-4">{{device.dataVolume}} KB</div>
								</div>
								
								<div class="d-flex align-items-center mb-2">
									<i class="pe-2 fa fa-line-chart" aria-hidden="true"></i>
									<small class="fw-400 ms-auto text-theme">{{device.trend}} %</small>
								</div>
								
							</div>
							<!-- END 设备位置，数据量和趋势 -->

							<!-- BEGIN 设备修改和删除 -->
							<div class="d-flex align-items-center mb-1">
								<a href="" class="bi bi-archive-fill pe-3"></a>
								<a href="" class="bi bi-trash-fill" @click="deleteDevice(device.uuid)"></a>
							</div>
						</div>
					</div>
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END 设备列表 -->

	</div>
	<!-- END BODY -->
</template>

<style>
.mask {
	transition: transform .3s;
	border: none;
}
.mask:hover {
	transform: scale(1.05);
	background: linear-gradient(
	45deg,
	hsla(168, 85%, 52%, 0.5),
	hsla(263, 88%, 45%, 0.5) 100%
	);
}
.btn-circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
}
</style>