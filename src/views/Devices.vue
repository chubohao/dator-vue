<script lang="ts">
import { useAppVariableStore } from '@/stores/app-variable';
import chartjs from '@/components/plugins/Chartjs.vue';
import datepicker from 'vue3-datepicker';
import Masonry from 'masonry-layout';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

let appVariable = useAppVariableStore();

export default {
	components: {
		chartjs: chartjs,
		datepicker: datepicker
	},
	methods: {
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
		getChart1Data() {
			return {
				labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.nextDay],
				datasets: [{
					color: appVariable.color.theme,
					backgroundColor: 'transparent',
					borderColor: appVariable.color.theme,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.componentBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.componentBg,
					pointHoverBorderColor: appVariable.color.theme,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 601.5, 220]
				},{
					color: appVariable.color.gray300,
					backgroundColor: 'rgba('+ appVariable.color.gray300Rgb + ', .2)',
					borderColor: appVariable.color.gray300,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.componentBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.componentBg,
					pointHoverBorderColor: appVariable.color.gray300,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 500, 120, 0, 0, 0]
				}]
			};
		},
		getChart2Data() {
			return {
				labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.nextDay],
				datasets: [{
					color: appVariable.color.theme,
					backgroundColor: 'transparent',
					borderColor: appVariable.color.theme,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.componentBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.componentBg,
					pointHoverBorderColor: appVariable.color.theme,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 20, 50, 100, 120]
				},{
					color: appVariable.color.gray300,
					backgroundColor: 'rgba('+ appVariable.color.gray300Rgb + ', .2)',
					borderColor: appVariable.color.gray300,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.componentBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.componentBg,
					pointHoverBorderColor: appVariable.color.gray300,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 30, 44, 130, 34, 15, 43, 22]
				}]
			};
		},
		getChart3Data() {
			return {
				labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.nextDay],
				datasets: [{
					color: appVariable.color.indigo,
					backgroundColor: 'transparent',
					borderColor: appVariable.color.indigo,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.componentBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.componentBg,
					pointHoverBorderColor: appVariable.color.indigo,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 5, 18, 9]
				},{
					color: appVariable.color.theme,
					backgroundColor: 'rgba('+ appVariable.color.theme +', .2)',
					borderColor: appVariable.color.theme,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.componentBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.componentBg,
					pointHoverBorderColor: appVariable.color.theme,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 10, 26, 13]
				}]
			};
		},
		getChart4Data() {
			return {
				labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.nextDay],
				datasets: [{
					color: appVariable.color.theme,
					backgroundColor: 'transparent',
					borderColor: appVariable.color.theme,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.componentBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.componentBg,
					pointHoverBorderColor: appVariable.color.theme,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 24, 39]
				},{
					color: appVariable.color.gray300,
					backgroundColor: 'rgba('+ appVariable.color.gray300Rgb + ', .2)',
					borderColor: appVariable.color.gray300,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.componentBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.componentBg,
					pointHoverBorderColor: appVariable.color.gray300,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 28, 35, 23, 0, 0]
				}]
			};
		},
		getChart5Data() {
			return {
				labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.nextDay],
				datasets: [{
					color: appVariable.color.theme,
					backgroundColor: 'transparent',
					borderColor: appVariable.color.theme,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.componentBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.componentBg,
					pointHoverBorderColor: appVariable.color.theme,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 12, 5]
				},{
					color: appVariable.color.gray300,
					backgroundColor: 'rgba('+ appVariable.color.gray300Rgb + ', .2)',
					borderColor: appVariable.color.gray300,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.componentBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.componentBg,
					pointHoverBorderColor: appVariable.color.gray300,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 10, 4, 2, 0, 0]
				}]
			};
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
		submitForm(){
			this.$emit('submit', this.newDeviceVO)
			console.log(this.newDeviceVO)
		},
		callAPI(){

			return [
				{
					"name": "LoRa",
					"uuid": "96F5E825-9141-42E8-8EE5-B0C2D07238E4",
					"status": 0,
					"img": "/assets/img/devices/device1.svg",
					"location": "Duisburg",
					"dataVolume": "80",
					"trend": "+5"
				},
				{
					"name": "Sensor",
					"uuid": "FC4372C7-F49F-4F33-9BBA-8DF0CDA19A52",
					"status": 1,
					"img": "/assets/img/devices/device2.svg",
					"location": "Düsseldorf",
					"dataVolume": "10",
					"trend": "+1"
				},
				{
					"name": "Gateway",
					"uuid": "ED96EDB3-7FA9-4F02-B699-104AB0F5F857",
					"status": 1,
					"img": "/assets/img/devices/device3.svg",
					"location": "Beijing",
					"dataVolume": "100.9",
					"trend": "+101"
				},
				{
					"name": "NB-IoT",
					"uuid": "4190B276-05CB-40DC-8628-01F8336927C0",
					"status": 3,
					"img": "/assets/img/devices/device4.svg",
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
			chart1: {
				type: 'line',
				data: this.getChart1Data()
			},
			chart2: {
				type: 'line',
				data: this.getChart2Data()
			},
			chart3: {
				type: 'line',
				data: this.getChart3Data()
			},
			chart4: {
				type: 'line',
				data: this.getChart4Data()
			},
			chart5: {
				type: 'line',
				data: this.getChart5Data()
			},
			newDeviceVO: {
				"name": "",
				"uuid": "",
				"location": "",
				"protocol": "",
				"type": ""
			},
			
			fieldNumber: 2
		}
	},
	mounted() {
		const msnry = new Masonry('[data-masonry]');
	},
	created() {
		this.emitter.on('theme-reload', (evt) => {
			this.renderComponent = false;
			this.$nextTick(() => {
				this.chart1.data = this.getChart1Data();
				this.chart2.data = this.getChart2Data();
				this.chart3.data = this.getChart3Data();
				this.chart4.data = this.getChart4Data();
				this.chart5.data = this.getChart5Data();
				this.renderComponent = true;
				setTimeout(() => {
					const msnry = new Masonry('[data-masonry]');
				}, 50);
			});
    })
	}
}
</script>
<template>
	<!-- BEGIN HEADER -->
	<div class="d-flex align-items-center mb-3">
		<div class="btn btn-primary me-2"  data-bs-toggle="modal" data-bs-target="#add">
			Add New Device
		</div>

		<!-- BEGIN 添加设备模态框 -->
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
						<div class="mb-5">
							<h5>Basic Device Infomation</h5>
							
							<form @submit.prevent="submitForm" method="POST" name="register_form">
								<!-- 设备名字 -->
								<div class="input-group mb-3">
									<label class="input-group-text" for=""><i class="fa fa-tag" aria-hidden="true"></i></label>
									<input type="text" class="form-control" placeholder="Device Name, e.g. LoRa Node" v-model="newDeviceVO.name"/>
								</div>

								<!-- 设备地址 -->
								<div class="input-group mb-3">
									<label class="input-group-text" for="">
										<i class="fa fa-map-marker" aria-hidden="true"></i>
									</label>
									<input type="text" class="form-control" placeholder="Device Location, e.g. Duisburg" v-model="newDeviceVO.location"/>
								</div>
								
								<!-- 设备类型 -->
								<div class="input-group mb-3">
										<label class="input-group-text" for=""><i class="fa fa-globe" aria-hidden="true"></i></label>
										<select class="form-select" aria-label="Default select example" v-model="newDeviceVO.type">
											<option selected>Select Device Type</option>
											<option value="1" class="strong">Direct Device</option>
											<option value="2">Gateway Device</option>
											<option value="3">Virtual Device</option>
										</select>
								</div>

								<!-- 网络协议类型 -->
								<div class="input-group mb-3">
										<label class="input-group-text"><i class="fa fa-globe" aria-hidden="true"></i></label>
										<select class="form-select" aria-label="Default select example" v-model="newDeviceVO.protocol">
											<option selected>Select transport protocol</option>
											<option value="1">HTTP</option>
											<option value="2">MQTT</option>
										</select>
								</div>

								<!-- BEGIN 设备 UUID -->
								<div class="input-group mb-3">
									<label class="input-group-text"><i class="fa fa-barcode" aria-hidden="true"></i></label>
									<input class="form-control" placeholder="UUID" :value="getUUID()" :v-model="newDeviceVO.uuid" disabled/>
								</div>
								<!-- END 设备 UUID -->
							</form>
						</div>
						

						<!-- 字段信息 -->
						<div>
							<h5>Field Infomation</h5>
							<form @submit.prevent="submitForm" method="POST" name="register_form">
								<div class="mb-3 d-flex" v-for="n in fieldNumber">
									<div class="input-group me-2">
										<label class="input-group-text" for="">
											<i class="fa fa-bars" aria-hidden="true"></i>
										</label>
										<input type="text" class="form-control" placeholder="Field Name">
									</div>
									
									<div class="input-group me-2">
										<label class="input-group-text" for="">
											<i class="fa fa-globe" aria-hidden="true"></i>
										</label>
										<select class="form-select" aria-label="Default select example" placeholder="Type e.g. Int">
											<option value="1">Int</option>
											<option value="2">Two</option>
											<option value="3">Three</option>
										</select>
									</div>

									<div class="input-group me-2">
										<label class="input-group-text" for="">
											<i class="fa fa-bookmark" aria-hidden="true"></i>
										</label>
										
										<input type="text" class="form-control" placeholder="Length">
									</div>
									
									<div class="btn btn-secondary" @click="fieldNumber--">
										<i class="fa fa-minus-square" aria-hidden="true"></i>
									</div>
								</div>
							</form>
						</div>

						<!-- SUBMIT BUTTON -->
						<div class="m-3 text-center">
							<div class="btn btn-secondary" @click="fieldNumber++">
								<i class="fa fa-plus-square" aria-hidden="true"></i>
							</div>
						</div>
					</div>
				
					<!-- 模态框底部 -->
					<div class="m-3 text-center">
						<button type="submit" class="btn btn-theme w-100">Submit</button>
					</div>
				</div>
			</div>
		</div>
		<!-- END 添加设备模态框 -->

		<div class="btn btn-default d-flex align-items-center me-2">
			<label for="datepicker" class="">
				<i class="fa fa-fw fa-calendar"></i>
			</label>
			<datepicker id="datepicker" class="bg-none text-reset shadow-none border-0 ps-2 w-100px p-0 outline-none" @update:modelValue="updateDate" v-model="picked" />
			<label for="datepicker" class="">
				<i class="fa fa-fw fa-caret-down me-n1"></i>
			</label>
		</div>
		<div class="w-30">
			<select class="form-select" aria-label="Default select example">
			<option selected>Status</option>
			<option value="0">All</option>
			<option value="1">Online</option>
			<option value="2">Offline</option>
			<option value="3">Abnormal</option>
		</select>
		</div>
		
		<!-- <span class="ms-3">compared to {{ getPrevDay() }}</span>-->
	</div>
	<!-- END HEADER -->

	<!-- BEGIN BODY -->
	<div class="row" data-masonry='{"percentPosition": true }' v-if="renderComponent">
		<!-- BEGIN 设备列表 -->
		<div class="col-lg-6 col-xl-4 mb-3" v-for="(device) in callAPI()">
			<!-- BEGIN card -->
			<card class="mask">
				<card-body>
					<div class="row">
						<!-- BEGIN 设备LOGO -->
						<div class="col-3">
							<img :src="device.img" alt="" height="60">
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
	transition: transform .2s;
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