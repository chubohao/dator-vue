<script lang="ts">
import { useAppVariableStore } from '@/stores/app-variable';
import { useAppOptionStore } from '@/stores/app-option';
import chartjs from '@/components/plugins/Chartjs.vue';
import datepicker from 'vue3-datepicker';
import Masonry from 'masonry-layout';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { insertDevice } from "@/api/user";

let appVariable = useAppVariableStore();
const appOption = useAppOptionStore();

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
				"name": "",
				"location": "",
				"protocol": "HTTP",
				"type": "Hardware Divce",
				"fields": ""
			},
			this.fieldList = [
				{"name": "", "type": "String", "desc": ""}
			]
		},
		addField() {
			this.fieldList.push(
				{"name": "", "type": "String", "desc": ""}
			)
		},
		deleteField(index:any){
			this.fieldList.splice(index, 1)
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
			const fields = JSON.stringify(this.fieldList)
			this.deviceVO.fields = fields;
			try {
				const res = await insertDevice(this.deviceVO);
				if (res.status == 0){
					this.$router.push('/');
				}
			} catch (error) {
				console.log(error)
			}
		},
		callAPI(){
			return [
				{
					"name": "LoRa",
					"uuid": "96F5E825-9141-42E8-8EE5-B0C2D07238E4",
					"status": 0,
					"img": "/assets/img/devices/D1.png",
					"location": "Duisburg",
					"dataVolume": "80",
					"trend": "+5"
				},
				{
					"name": "Sensor",
					"uuid": "FC4372C7-F49F-4F33-9BBA-8DF0CDA19A52",
					"status": 1,
					"img": "/assets/img/devices/D2.png",
					"location": "Düsseldorf",
					"dataVolume": "10",
					"trend": "+1"
				},
				{
					"name": "Gateway",
					"uuid": "ED96EDB3-7FA9-4F02-B699-104AB0F5F857",
					"status": 1,
					"img": "/assets/img/devices/D3.png",
					"location": "Beijing",
					"dataVolume": "100.9",
					"trend": "+101"
				},
				{
					"name": "NB-IoT",
					"uuid": "4190B276-05CB-40DC-8628-01F8336927C0",
					"status": 3,
					"img": "/assets/img/devices/D4.png",
					"location": "Shanghai",
					"dataVolume": "60.01",
					"trend": "+200"
				}
			]
		}
	},
	data() {
		return {
			renderComponent: true,
			picked: new Date(),
			nextDay: moment().format('D MMM'),
			selectedDay: moment().format('YYYY-MM-DD'),
			prevDay: moment().add(-1, 'd').format('YYYY-MM-DD'),
			deviceVO: {
				"name": "",
				"location": "",
				"protocol": "HTTP",
				"type": "Hardware Divce",
				"fields": ""
			},
			fieldList :[
				{"name": "", "type": "String", "desc": ""}
			],
			newUuid: ""
		}
	},
	mounted() {
		const msnry = new Masonry('[data-masonry]');
		this.newUuid = this.getUUID();
	}
}
</script>
<template>
	<!-- BEG 添加设备模态框 -->
	<div class="modal modal-lg" id="add">
			<div class="modal-dialog">
				<div class="modal-content px-4 py-2">
					<!-- 模态框头部 -->
					<div class="modal-header border-0">
						<h4 class="modal-title">ADD A NEW DEVICE</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
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
										<div class="mb-3 d-flex" v-for="(field, index) in fieldList">
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
													<option value="Int">Int</option>
													<option value="String">String</option>
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
		<div class="col-lg-6 col-xl-4 mb-3" v-for="(device) in callAPI()">
			<!-- BEGIN card -->
			<card class="mask">
				<card-body>
					<div class="d-flex"></div>
					<div class="row">
						<!-- BEG 设备LOGO -->
						<div class="col-3">
							<img :src="device.img" alt="" height="83">
						</div>
						<!-- END 设备LOGO -->
						
						<div class="col-9 px-2">
							<!-- BEGIN 设备名字和状态 -->
							<div class="d-flex align-items-center mb-2">
								<a href="" class="flex-fill fw-bold h5 text-decoration-none">{{device.name}}</a>
								<div class="btn-circle" :style="getStatuOfDevice(device.status)"></div>
							</div>
							<!-- END 设备名字和状态 -->

							<!-- BEGIN 设备UUID -->
							<div class="d-flex align-items-center mb-2">
								<span class="flex-fill small">{{device.uuid}}</span>
							</div>
							<!-- END 设备UUID -->

							<!-- BEGIN 设备位置，数据量和趋势 -->
							<div class="d-flex align-items-center mb-3">
								<i class="flex-fill fa fa-map-marker" aria-hidden="true"></i>
								<div class="flex-fill">{{device.location}}</div>

								<i class="flex-fill fa fa-database " aria-hidden="true"></i>
								<div class="flex-fill">{{device.dataVolume}} KB</div>

								<i class="flex-fill fa fa-line-chart" aria-hidden="true"></i>
								<small class="fw-400 ms-auto text-theme">{{device.trend}} %</small>
							</div>
							<!-- END 设备位置，数据量和趋势 -->
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