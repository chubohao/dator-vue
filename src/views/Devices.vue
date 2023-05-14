<script lang="ts">
import { useAppVariableStore } from '@/stores/app-variable';
import chartjs from '@/components/plugins/Chartjs.vue';
import datepicker from 'vue3-datepicker';
import Masonry from 'masonry-layout';
import moment from 'moment';

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
		updateDate(newDate) {
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
		getStatuOfDevice(status) {
			if (status == 0){
				return {"background-color": "#2F4F4F"}
			}else if (status == 1){
				return {"background-color": "#32CD32"}
			} else {
				return {"background-color": "red"}
			}
			
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
			devices_info:[
				{
					"name": "LoRa",
					"status": 0,
					"img": "/assets/img/devices/device1.svg",
					"location": "Duisburg",
					"dataVolume": "80",
					"trend": "+5"

				},
				{
					"name": "Sensor",
					"status": 1,
					"img": "/assets/img/devices/device2.svg",
					"location": "Düsseldorf",
					"dataVolume": "10",
					"trend": "+1"
				},
				{
					"name": "Gateway",
					"status": 1,
					"img": "/assets/img/devices/device3.svg",
					"location": "Beijing",
					"dataVolume": "100.9",
					"trend": "+101"
				},
				{
					"name": "NB-IoT",
					"status": 3,
					"img": "/assets/img/devices/device4.svg",
					"location": "Shanghai",
					"dataVolume": "60.01",
					"trend": "+200"
				}
			]
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
	<!-- BEGIN daterangepicker -->
	<div class="d-flex align-items-center mb-3">
		<div class="btn btn-primary me-2"  data-bs-toggle="modal" data-bs-target="#add">
			Add New Device
		</div>
		<!-- 模态框 -->
		<div class="modal mt-5 modal-lg" id="add">
			<div class="modal-dialog">
				<div class="modal-content">
			
				<!-- 模态框头部 -->
				<div class="modal-header">
					<h4 class="modal-title">Add New Device</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>
			
				<!-- 模态框内容 -->
				<div class="modal-body">
					<div>
						<h1>Device Infomation</h1>
					</div>
					<div>
						<h1>Data Infomation</h1>
					</div>
				</div>
			
				<!-- 模态框底部 -->
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
				</div>
			
				</div>
			</div>
		</div>

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
	
	<!-- END daterangepicker -->

	<!-- BEGIN row -->
	<div class="row" data-masonry='{"percentPosition": true }' v-if="renderComponent">
		<!-- BEGIN col-4 -->
		<div class="col-lg-6 col-xl-4 mb-3" v-for="(device) in devices_info">
			<!-- BEGIN card -->
			<card class="mask">
				<card-body class="">
					<div class="row">
						<div class="col-4">
							<img :src="device.img" alt="" height="70">
						</div>
						
						<div class="col-8 p-1">
							<!-- NAME AND STATUS -->
							<div class="d-flex align-items-center mb-2">
								<a href="" class="flex-fill fw-bold h5 text-decoration-none">{{device.name}}</a>
								<div class="btn-circle" :style="getStatuOfDevice(device.status)"></div>
							</div>

							<!-- DETAIL -->
							<div class="d-flex align-items-center mb-3">
								<i class="flex-fill fa fa-map-marker" aria-hidden="true"></i>
								<div class="flex-fill">{{device.location}}</div>

								<i class="flex-fill fa fa-database " aria-hidden="true"></i>
								<div class="flex-fill">{{device.dataVolume}} KB</div>

								<i class="flex-fill fa fa-line-chart" aria-hidden="true"></i>
								<small class="fw-400 ms-auto text-theme">{{device.trend}} %</small>
							</div>
						</div>
					</div>
					
			
					
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->

	</div>
	<!-- END row -->
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
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
</style>