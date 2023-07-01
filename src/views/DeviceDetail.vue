<script lang="ts">
import {reactive, computed } from 'vue';
import vueTable from '@/components/plugins/VueTable.vue';
import { useAppOptionStore } from '@/stores/app-option';
import { useAppVariableStore } from '@/stores/app-variable';
import { RouterLink, useRoute } from 'vue-router';
import apexchart from '@/components/plugins/Apexcharts.vue';
import { deviceDetail, loraDeviceData, loraDeviceStatus } from "@/api/user";

const appOption = useAppOptionStore();
const appVariable = useAppVariableStore();

export default {
	beforeCreate() {
		appOption.appSidebarHide = false;
		appOption.appHeaderHide = false;
		appOption.appContentClass = 'p-3';
	},
	beforeMount() {
		this.getDetailOfDevice();
		this.getLoraDeviceData();
		this.getLoraDeviceStatus();
		console.log(this.chart)
	},
	mounted() {
		appOption.appContentFullHeight = true;
		appOption.appContentClass = 'p-0';
	},
	beforeUnmount() {
		appOption.appContentFullHeight = false;
		appOption.appContentClass = '';
	},
	data() {
		const totalVolume = 0;
		const totalAPICalls = 0;

		const files = reactive([]);
		const table:any = reactive({
			columns: [],
			rows: [],
			totalRecordCount: computed(() => {
				return table.rows.length;
			}),
			sortable: {
				order: "id",
				sort: "asc",
			},
		});
		
		const chart = {
				height: 256,
				series: [{
					name: "RFID Quantity",
					data: []
				}],
				options: {
					colors: [appVariable.color.primary],
					chart: { type: 'area', toolbar: { show: true } },
					nnotations: {
					yaxis: [
						{
							y: 2,
							borderColor: appVariable.color.indigo,
							label: {
								borderColor: appVariable.color.indigo,
								style: {
									color: appVariable.color.white,
									background: appVariable.color.indigo,
								},
								text: 'Support',
							}
						}, 
						{
							y: 8600,
							y2: 9000,
							borderColor: appVariable.color.orange,
							fillColor: appVariable.color.orange,
							opacity: 0.1,
							label: {
								borderColor: appVariable.color.yellow,
								style: {
									fontSize: '10px',
									color: appVariable.color.gray900,
									background: appVariable.color.yellow,
								},
								text: 'Earning',
							}
						}
					],
					xaxis: [
						{
							x: new Date('23 Nov 2021').getTime(),
							strokeDashArray: 0,
							borderColor: appVariable.color.borderColor,
							label: {
								borderColor: appVariable.color.grayborderColor900,
								style: {
									color: appVariable.color.componentBg,
									background: appVariable.color.bodyColor,
								},
								text: 'Anno Test',
							}
						}, 
						{
							x: new Date('26 Nov 2021').getTime(),
							x2: new Date('28 Nov 2021').getTime(),
							fillColor: appVariable.color.teal,
							opacity: 0.4,
							label: {
								borderColor: appVariable.color.teal,
								style: {
									fontSize: '10px',
									color: '#fff',
									background: appVariable.color.teal,
								},
								offsetY: -7,
								text: 'X-axis range',
							}
						}
					],
					points: [{
						x: new Date('01 Dec 2021').getTime(),
						y: 8607.55,
						marker: {
							size: 8,
							fillColor: appVariable.color.white,
							strokeColor: appVariable.color.pink,
							radius: 2
						},
						label: {
							borderColor: appVariable.color.pink,
							offsetY: 0,
							style: {
								color: appVariable.color.white,
								background: appVariable.color.pink,
							},

							text: 'Point Annotation',
						}
					}]
				},
				dataLabels: { enabled: true },
				stroke: { curve: 'smooth' },
				grid: { padding: { right: 30, left: 20 } },
				xaxis: {
					categories: [],
					axisBorder: {
						show: false
					},
					axisTicks: {
						show: false
					},
					tooltip: {
						enabled: true,
					}
				},
				yaxis: {
					min: 0,
					max: 20
				}

			}
		};

		const deviceInfo = {
			name: "Arvato Implant Kit",
			uuid: "31",
			createTime: "2023-07-01T10:47:48.313277Z",
			status: 1,
			img: `/assets/img/devices/DA${parseInt(31)%10}.png`,
			location: "Duiburg",
			dataVolume: "123",
			trend: "123"
		};

		const query = useRoute().query;
		return {
			table,
			chart,
			deviceInfo,
			files,
			query,
			totalVolume,
			totalAPICalls
		}
	},
	methods: {
		async getLoraDeviceStatus(){
			const deviceDataParam = {
				deviceId: this.query.deviceId
			}
			try {
				const res = await loraDeviceStatus(deviceDataParam);
				if (res.data.status == 0){
					const tag_dict = JSON.parse(res.data.data.tag)
					// 获取字典的键数组
					const keys = Object.keys(tag_dict);

					this.totalAPICalls = keys.length;

					const firstTenKeys = keys.slice(0, 20);
					const firstTenData = {};
					firstTenKeys.forEach(key => {
						firstTenData[key] = tag_dict[key];
					});

					this.chart.options.xaxis.categories = Object.keys(firstTenData);
					this.chart.series[0].data = Object.keys(firstTenData).map(key => firstTenData[key]);

					this.totalVolume = res.data.data.quantity
				}

			} catch (error) {
				console.log(error)
			}
		},
		async getLoraDeviceData(){
			const deviceDataParam = {
				page: "1",
				pageSize: "1000",
				deviceId: this.query.deviceId
			}
			try {
				const res = await loraDeviceData(deviceDataParam);
				if (res.data.status == 0){
					res.data.data.forEach((element, index) => {
						var data = {
							Index: index,
							RFID: element.data.toUpperCase(),
							RSSI: `-${element.rssi}`,
							Name: "Cold Medicine Box",
							"Post Code": "47057",
							"Hostpital": "Duisburg Hospital",
							"Uniqeu Number": element._id,
							Specification: "None",
							"Scan Date": element.createTime
						};

						this.table.rows.push(data)
					});
					console.log(this.table.rows)
				}
			} catch (error) {
				console.log(error)
			}
		},
		async getDetailOfDevice() {
			const deviceParam = {
				deviceId: this.query.deviceId?this.query.deviceId:"31"
			}
			try {
				const res = await deviceDetail(deviceParam);
				if (res.data.status == 0){
					this.files = JSON.parse(res.data.data.fields).map(item => item.name);
					this.files.forEach(item=>{
						var fileInfo = {
							label: item,
							field: item,
							width: "20%",
							sortable: true,
						}
						this.table.columns.push(fileInfo)
					})
				}
			} catch (error) {
				console.log(error)
			}
		},
		getStatuOfDevice(status:any) {
			if (status == 0){
				return {"background-color": "#2F4F4F"}
			}else if (status == 1){
				return {"background-color": "#32CD32"}
			} else {
				return {"background-color": "red"}
			}
			
		}
	},
	components: {
		vueTable: vueTable,
		apexchart: apexchart
	}
}
</script>
<template>

	<!-- BEGIN row -->
	<div class="row">
		<!-- BEGIN COL-6 -->
		<div class="col-xl-6">
			<!-- BEGIN row -->
			<div class="row">
				<!-- BEGIN COL-6/COL-6 TOTOAL DATA -->
				<div class="col-sm-6 mb-3 d-flex flex-column">
					<card class="mb-3 flex-1">
						<card-body>
							<div class="d-flex mb-3">
								<div class="flex-grow-1">
									<h5 class="mb-1">Total Data Quantity</h5>
									<div>Store user account registration</div>
								</div>
								<a href="javascript:;" class="text-secondary"><i class="fa fa-redo"></i></a>
							</div>
							
							<div class="d-flex">
								<div class="flex-grow-1">
									<h3 class="mb-1">{{totalVolume}}</h3>
									<div class="text-success fw-600 fs-13px">
										<i class="fa fa-caret-up"></i> +3.59%
									</div>
								</div>
								<div class="w-50px h-50px bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
									<i class="fa fa-database fa-lg text-primary"></i>
								</div>
							</div>
						</card-body>
					</card>
					
					<card>
						<card-body>
							<div class="d-flex mb-3">
								<div class="flex-grow-1">
									<h5 class="mb-1">Today Data Quantity</h5>
								</div>
								<a href="javascript:;" class="text-secondary"><i class="fa fa-redo"></i></a>
							</div>
							
							<div class="row">
								<!-- BEGIN col-6 -->
								<div class="col-4 text-center">
									<div class="w-50px h-50px bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-2 ms-auto me-auto">
										<i class="fa fa-database fa-lg text-primary"></i>
									</div>
									<div class="fw-600 text-body">{{totalVolume * 103}}</div>
									<div class="fs-13px">Bytes</div>
								</div>

								<!-- BEGIN col-6 -->
								<div class="col-4 text-center">
									<div class="w-50px h-50px bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-2 ms-auto me-auto">
										<i class="fa fa-cloud-upload fa-lg text-primary"></i>
									</div>
									<div class="fw-600 text-body">{{totalAPICalls}}</div>
									<div class="fs-13px">API Call</div>
								</div>
								<!-- END col-6 -->

								<!-- BEGIN col-6 -->
								<div class="col-4 text-center">
									<div class="w-50px h-50px bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-2 ms-auto me-auto">
										<i class="fa fa-trash fa-lg text-primary"></i>
									</div>
									<div class="fw-600 text-body">102</div>
									<div class="fs-13px">Delete</div>
								</div>
								<!-- END col-6 -->
							</div>
						</card-body>
					</card>
				</div>
				<!-- END COL-6/COL-6 TOTOAL DATA -->
				
				<!-- BEGIN COL-6/COL-6 DETAIL DATA -->
				<div class="col-sm-6 mb-3">
					<card class="h-100">	
						<card-body>
							<div class="d-flex mb-3">
								<div class="flex-grow-1">
									<h5 class="mb-1">Total Data Deatail</h5>
									<div class="fs-13px">Traffic source and category</div>
								</div>
								<a href="javascript:;" class="text-secondary"><i class="fa fa-redo"></i></a>
							</div>
							
							<div class="mb-4">
								<h3 class="mb-1">320,958</h3>
								<div class="text-success fs-13px fw-600">
									<i class="fa fa-caret-up"></i> +20.9%
								</div>
							</div>
							
							<div class="progress mb-4" style="height: 10px;">
								<div class="progress-bar bg-primary" style="width: 42.66%"></div>
								<div class="progress-bar bg-teal" style="width: 36.80%"></div>
								<div class="progress-bar bg-yellow" style="width: 15.34%"></div>
								<div class="progress-bar bg-pink" style="width: 9.20%"></div>
								<div class="progress-bar bg-gray-200" style="width: 5.00%"></div>
							</div>
							
							<div class="fs-13px">
								<div class="d-flex align-items-center mb-2">
									<div class="flex-grow-1 d-flex align-items-center">
										<i class="fa fa-circle fs-9px fa-fw text-primary me-2"></i> Direct Device
									</div>
									<div class="fw-600 text-body">42.66%</div>
								</div>
								<div class="d-flex align-items-center mb-2">
									<div class="flex-grow-1 d-flex align-items-center">
										<i class="fa fa-circle fs-9px fa-fw text-teal me-2"></i> Gateway Device
									</div>
									<div class="fw-600 text-body">36.80%</div>
								</div>
								<div class="d-flex align-items-center mb-2">
									<div class="flex-grow-1 d-flex align-items-center">
										<i class="fa fa-circle fs-9px fa-fw text-warning me-2"></i> Web Request Data
									</div>
									<div class="fw-600 text-body">15.34%</div>
								</div>
								<div class="d-flex align-items-center mb-2">
									<div class="flex-grow-1 d-flex align-items-center">
										<i class="fa fa-circle fs-9px fa-fw text-danger me-2"></i> Web Input Data
									</div>
									<div class="fw-600 text-body">9.20%</div>
								</div>
								<div class="d-flex align-items-center mb-15px">
									<div class="flex-grow-1 d-flex align-items-center">
										<i class="fa fa-circle fs-9px fa-fw text-gray-200 me-2"></i> Others
									</div>
									<div class="fw-600 text-body">5.00%</div>
								</div>
								<div class="fs-12px text-end">
									<span class="d-inline-flex fw-600">
										<span class="text-black">POWER BY&nbsp;&nbsp;</span>
										<span class="text-primary">D</span>
										<span class="text-danger">A</span>
										<span class="text-warning">T</span>
										<span class="text-primary">O</span>
										<span class="text-green">R</span>
										<span class="text-black">&nbsp;&nbsp;API</span>
									</span>
								</div>
							</div>
						</card-body>
					</card>
				</div>
				<!-- END COL-6 -->
			</div>
			<!-- END row -->
		</div>
		<!-- END COL-6 -->
		
		<!-- BEGIN COL-6 -->
		<div class="col-xl-6 mb-3">
			<!-- BEGIN card -->
			<card class="h-100">
				<!-- BEGIN card-body -->
				<card-body>
					<div class="d-flex mb-3">
						<div class="flex-grow-1">
							<h5 class="mb-1">Data Access Volume In The Last 7 Days</h5>
							<div class="fs-13px">Weekly sales performance chart</div>
						</div>
						<a href="#" data-bs-toggle="dropdown" class="text-muted"><i class="fa fa-redo"></i></a>
					</div>
					<apexchart :height="chart.height" :options="chart.options" :series="chart.series"></apexchart>
				</card-body>
				<!-- END card-body -->
			</card>
			<!-- END card -->
		</div>	
		<!-- END COL-6 -->
	</div>
	<!-- END row -->
	
	<div class="card">
			<div class="m-2 pt-2">
				<perfect-scrollbar>
					<vue-table class="vue-table"
					:is-static-mode="true"
					:columns="table.columns"
					:rows="table.rows"
					:total="table.totalRecordCount"
					:sortable="table.sortable" />
				</perfect-scrollbar>
			</div>
	</div>
</template>