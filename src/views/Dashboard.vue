<script lang="ts">
import { useAppVariableStore } from '@/stores/app-variable';
import apexchart from '@/components/plugins/Apexcharts.vue';

const appVariable = useAppVariableStore();

export default {
	components: {
		apexchart: apexchart
	},
	data() {
		return {
			renderComponent: true,
			chart: {
				height: 256,
				series: [{
					data: [
						8107, 8128, 8122, 8165, 8340, 8423, 8423, 8514, 8481, 8487, 
						8506, 8626, 8668, 8602, 8607, 8512, 8496, 8600, 8881, 9340
					]
				}],
				options: this.getChartOptions()
			},
		}
	},
	methods: {
		getChartOptions() {
			return {
				labels: [
					'13 Nov 2021', '14 Nov 2021', '15 Nov 2021', '16 Nov 2021',
					'17 Nov 2021', '20 Nov 2021', '21 Nov 2021', '22 Nov 2021',
					'23 Nov 2021', '24 Nov 2021', '27 Nov 2021', '28 Nov 2021',
					'29 Nov 2021', '30 Nov 2021', '01 Dec 2021', '04 Dec 2021', 
					'05 Dec 2021', '06 Dec 2021', '07 Dec 2021', '08 Dec 2021'
				],
				colors: [appVariable.color.primary],
				chart: { type: 'line', toolbar: { show: false } },
				annotations: {
					yaxis: [{
						y: 8200,
						borderColor: appVariable.color.indigo,
						label: {
							borderColor: appVariable.color.indigo,
							style: {
								color: appVariable.color.white,
								background: appVariable.color.indigo,
							},
							text: 'Support',
						}
					}, {
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
					}],
					xaxis: [{
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
					}, {
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
					}],
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
				dataLabels: { enabled: false },
				stroke: { curve: 'straight' },
				grid: { padding: { right: 30, left: 20 } },
				xaxis: { type: 'datetime' } 
			};
		}
	},
	created() {
		this.emitter.on('theme-reload', (evt) => {
			this.renderComponent = false;
			
			this.$nextTick(() => {
				this.chart.options = this.getChartOptions();
			});
    })
	}
}
</script>
<template>
	<h1 class="page-header mb-3">
		Hi, Bohao Chu. <small>here's what's happening with your store today.</small>
	</h1>

	
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
									<h3 class="mb-1">184,593</h3>
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
									<div>2023-05-13</div>
								</div>
								<a href="javascript:;" class="text-secondary"><i class="fa fa-redo"></i></a>
							</div>
							
							<div class="row">
								<!-- BEGIN col-6 -->
								<div class="col-4 text-center">
									<div class="w-50px h-50px bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-2 ms-auto me-auto">
										<i class="fa fa-database fa-lg text-primary"></i>
									</div>
									<div class="fw-600 text-body">306.5k</div>
									<div class="fs-13px">Bytes</div>
								</div>

								<!-- BEGIN col-6 -->
								<div class="col-4 text-center">
									<div class="w-50px h-50px bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-2 ms-auto me-auto">
										<i class="fa fa-cloud-upload fa-lg text-primary"></i>
									</div>
									<div class="fw-600 text-body">27.5k</div>
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
	
	<!-- BEGIN row -->
	<div class="row">
		<!-- BEGIN col-6 -->
		<div class="col-xl-6 mb-3">
			<card>
				<card-body>
					<div class="d-flex align-items-center mb-4">
						<div class="flex-grow-1">
							<h5 class="mb-1">Bestseller</h5>
							<div class="fs-13px">Top 3 product sales this week</div>
						</div>
						<a href="#" class="text-decoration-none">See All</a>
					</div>
					
					<!-- product-1 -->
					<div class="d-flex align-items-center mb-3">
						<div class="d-flex align-items-center justify-content-center me-3 w-50px h-50px bg-white p-3px rounded">
							<img src="/assets/img/product/product-1.jpg" alt="" class="ms-100 mh-100">
						</div>
						<div class="flex-grow-1">
							<div>
								<div class="text-primary fs-10px fw-600">TOP SALES</div>
								<div class="text-body fw-600">iPhone 11 Pro Max (256GB)</div>
								<div class="fs-13px">$1,099</div>
							</div>
						</div>
						<div class="ps-3 text-center">
							<div class="text-body fw-600">382</div>
							<div class="fs-13px">sales</div>
						</div>
					</div>
					
					<!-- product-2 -->
					<div class="d-flex align-items-center mb-3">
						<div class="d-flex align-items-center justify-content-center me-3 w-50px h-50px bg-white p-3px rounded">
							<img src="/assets/img/product/product-2.jpg" alt="" class="ms-100 mh-100">
						</div>
						<div class="flex-grow-1">
							<div>
								<div class="text-body fw-600">Macbook Pro 13 inch (2021)</div>
								<div class="fs-13px">$1,120</div>
							</div>
						</div>
						<div class="ps-3 text-center">
							<div class="text-body fw-600">102</div>
							<div class="fs-13px">sales</div>
						</div>
					</div>
					
					<!-- product-3 -->
					<div class="d-flex align-items-center mb-3">
						<div class="d-flex align-items-center justify-content-center me-3 w-50px h-50px bg-white p-3px rounded">
							<img src="/assets/img/product/product-3.jpg" alt="" class="ms-100 mh-100">
						</div>
						<div class="flex-grow-1">
							<div>
								<div class="text-body fw-600">Apple Watch Series 4(2021)</div>
								<div class="fs-13px">$349</div>
							</div>
						</div>
						<div class="ps-3 text-center">
							<div class="text-body fw-600">75</div>
							<div class="fs-13px">sales</div>
						</div>
					</div>
					
					<!-- product-4 -->
					<div class="d-flex align-items-center mb-3">
						<div class="d-flex align-items-center justify-content-center me-3 w-50px h-50px bg-white p-3px rounded">
							<img src="/assets/img/product/product-4.jpg" alt="" class="ms-100 mh-100">
						</div>
						<div class="flex-grow-1">
							<div>
								<div class="text-body fw-600">12.9-inch iPad Pro (256GB)</div>
								<div class="fs-13px">$1,099</div>
							</div>
						</div>
						<div class="ps-3 text-center">
							<div class="text-body fw-600">62</div>
							<div class="fs-13px">sales</div>
						</div>
					</div>
					
					<!-- product-5 -->
					<div class="d-flex align-items-center">
						<div class="d-flex align-items-center justify-content-center me-3 w-50px h-50px bg-white p-3px rounded">
							<img src="/assets/img/product/product-5.jpg" alt="" class="ms-100 mh-100">
						</div>
						<div class="flex-grow-1">
							<div>
								<div class="text-body fw-600">iPhone 11 (128gb)</div>
								<div class="fs-13px">$799</div>
							</div>
						</div>
						<div class="ps-3 text-center">
							<div class="text-body fw-600">59</div>
							<div class="fs-13px">sales</div>
						</div>
					</div>
				</card-body>
			</card>
		</div>
		<!-- END col-6 -->
		
		<!-- BEGIN col-6 -->
		<div class="col-xl-6 mb-3">
			<card class="h-100">
				<card-body>
					<div class="d-flex align-items-center mb-2">
						<div class="flex-grow-1">
							<h5 class="mb-1">Transaction</h5>
							<div class="fs-13px">Latest transaction history</div>
						</div>
						<a href="#" class="text-decoration-none">See All</a>
					</div>
				
					<!-- BEGIN table-responsive -->
					<div class="table-responsive mb-n2">
						<table class="table table-borderless mb-0">
							<thead>
								<tr class="text-body">
									<th class="ps-0">No</th>
									<th>Order Details</th>
									<th class="text-center">Status</th>
									<th class="text-end pe-0">Amount</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="ps-0">1.</td>
									<td>
										<div class="d-flex align-items-center">
											<div class="w-40px h-40px">
												<img src="/assets/img/icon/paypal2.svg" alt="" class="ms-100 mh-100">
											</div>
											<div class="ms-3 flex-grow-1">
												<div class="fw-600 text-body">Macbook Pro 15 inch</div>
												<div class="fs-13px">5 minutes ago</div>
											</div>
										</div>
									</td>
									<td class="text-center"><span class="badge bg-success bg-opacity-20 text-success" style="min-width: 60px;">Success</span></td>
									<td class="text-end pe-0">$1,699.00</td>
								</tr>
								<tr>
									<td class="ps-0">2.</td>
									<td>
										<div class="d-flex align-items-center">
											<div class="w-40px h-40px rounded">
												<img src="/assets/img/icon/mastercard.svg" alt="" class="ms-100 mh-100">
											</div>
											<div class="ms-3 flex-grow-1">
												<div class="fw-600 text-body">Apple Watch 5 Series</div>
												<div class="fs-13px">5 minutes ago</div>
											</div>
										</div>
									</td>
									<td class="text-center"><span class="badge bg-success bg-opacity-20 text-success" style="min-width: 60px;">Success</span></td>
									<td class="text-end pe-0">$699.00</td>
								</tr>
								<tr>
									<td class="ps-0">3.</td>
									<td>
										<div class="d-flex align-items-center">
											<div class="w-40px h-40px rounded">
												<img src="/assets/img/icon/visa.svg" alt="" class="ms-100 mh-100">
											</div>
											<div class="ms-3 flex-grow-1">
												<div class="fw-600 text-body">iPhone 11 Pro Max</div>
												<div class="fs-13px">12 minutes ago</div>
											</div>
										</div>
									</td>
									<td class="text-center"><span class="badge bg-warning bg-opacity-20 text-warning" style="min-width: 60px;">Pending</span></td>
									<td class="text-end pe-0">$1,299.00</td>
								</tr>
								<tr>
									<td class="ps-0">4.</td>
									<td>
										<div class="d-flex align-items-center">
											<div class="w-40px h-40px rounded">
												<img src="/assets/img/icon/paypal2.svg" alt="" class="ms-100 mh-100">
											</div>
											<div class="ms-3 flex-grow-1">
												<div class="fw-600 text-body">Apple Magic Keyboard</div>
												<div class="fs-13px">15 minutes ago</div>
											</div>
										</div>
									</td>
									<td class="text-center"><span class="badge text-body text-opacity-50 bg-dark bg-opacity-10" style="min-width: 60px;">Cancelled</span></td>
									<td class="text-end pe-0">$199.00</td>
								</tr>
								<tr>
									<td class="ps-0">5.</td>
									<td>
										<div class="d-flex align-items-center">
											<div class="w-40px h-40px rounded">
												<img src="/assets/img/icon/mastercard.svg" alt="" class="ms-100 mh-100">
											</div>
											<div class="ms-3 flex-grow-1">
												<div class="fw-600 text-body">iPad Pro 15 inch</div>
												<div class="fs-13px">15 minutes ago</div>
											</div>
										</div>
									</td>
									<td class="text-center"><span class="badge bg-success bg-opacity-20 text-success" style="min-width: 60px;">Cancelled</span></td>
									<td class="text-end pe-0">$1,099.00</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- END table-responsive -->
				</card-body>
			</card>
		</div>
		<!-- END col-6 -->
	</div>
	<!-- END row -->

	<!-- BEGIN row -->
	<div class="row">
		<!-- BEGIN col-6 -->
		<div class="col-xl-12">
			<!-- BEGIN row -->
			<div class="row">
				<!-- BEGIN col-6 -->
				<div class="col-md-3">
					<card class="mb-3 overflow-hidden fs-13px border-0 bg-gradient-custom-orange" style="min-height: 199px;">
						<card-img-overlay class="mb-n4 me-n4 d-flex" style="bottom: 0; top: auto;">
							<img src="/assets/img/icon/order.svg" alt="" class="ms-auto d-block mb-n3" style="max-height: 105px">
						</card-img-overlay>
						
						<card-body class="position-relative">
							<h5 class="text-white text-opacity-80 mb-3 fs-16px">New Orders</h5>
							<h3 class="text-white mt-n1">56</h3>
							<div class="progress bg-black bg-opacity-50 mb-2" style="height: 6px">
								<div class="progrss-bar progress-bar-striped bg-white" style="width: 80%"></div>
							</div>
							<div class="text-white text-opacity-80 mb-4"><i class="fa fa-caret-up"></i> 16% increase <br>compare to last week</div>
							<div><a href="#" class="text-white d-flex align-items-center text-decoration-none">View report <i class="fa fa-chevron-right ms-2 text-white text-opacity-50"></i></a></div>
						</card-body>
					</card>
				</div>
				<!-- END col-6 -->
				
				<!-- BEGIN col-6 -->
				<div class="col-md-3">
					<card class="mb-3 overflow-hidden fs-13px border-0 bg-gradient-custom-pink" style="min-height: 199px;">
						<card-img-overlay class="mb-n4 me-n4 d-flex" style="bottom: 0; top: auto;">
							<img src="/assets/img/icon/email.svg" alt="" class="ms-auto d-block mb-n3" style="max-height: 105px">
						</card-img-overlay>
						
						<card-body class="position-relative">
							<h5 class="text-white text-opacity-80 mb-3 fs-16px">Unread email</h5>
							<h3 class="text-white mt-n1">30</h3>
							<div class="progress bg-black bg-opacity-50 mb-2" style="height: 6px">
								<div class="progrss-bar progress-bar-striped bg-white" style="width: 80%"></div>
							</div>
							<div class="text-white text-opacity-80 mb-4"><i class="fa fa-caret-down"></i> 5% decrease <br>compare to last week</div>
							<div><a href="#" class="text-white d-flex align-items-center text-decoration-none">View report <i class="fa fa-chevron-right ms-2 text-white text-opacity-50"></i></a></div>
						</card-body>
					</card>
				</div>
				<!-- BEGIN col-6 -->

				<!-- BEGIN col-6 -->
				<div class="col-md-3">
					<card class="mb-3 overflow-hidden fs-13px border-0 bg-gradient-custom-indigo" style="min-height: 199px;">
						<card-img-overlay class="mb-n4 me-n4 d-flex" style="bottom: 0; top: auto;">
							<img src="/assets/img/icon/browser.svg" alt="" class="ms-auto d-block mb-n3" style="max-height: 105px">
						</card-img-overlay>
						
						<card-body class="position-relative">
							<h5 class="text-white text-opacity-80 mb-3 fs-16px">Page Views</h5>
							<h3 class="text-white mt-n1">320.4k</h3>
							<div class="progress bg-black bg-opacity-50 mb-2" style="height: 6px">
								<div class="progrss-bar progress-bar-striped bg-white" style="width: 80%"></div>
							</div>
							<div class="text-white text-opacity-80 mb-4"><i class="fa fa-caret-up"></i> 20% increase <br>compare to last week</div>
							<div><a href="#" class="text-white d-flex align-items-center text-decoration-none">View report <i class="fa fa-chevron-right ms-2 text-white text-opacity-50"></i></a></div>
						</card-body>
					</card>
				</div>
				<!-- BEGIN col-6 -->

				<!-- BEGIN col-6 -->
				<div class="col-md-3">
					<card class="card mb-3 overflow-hidden fs-13px border-0 bg-gradient-custom-teal" style="min-height: 199px;">
						<card-img-overlay class="card-img-overlay mb-n4 me-n4 d-flex" style="bottom: 0; top: auto;">
							<img src="/assets/img/icon/visitor.svg" alt="" class="ms-auto d-block mb-n3" style="max-height: 105px">
						</card-img-overlay>
						
						<card-body class="position-relative">
							<h5 class="text-white text-opacity-80 mb-3 fs-16px">Page Visitors</h5>
							<h3 class="text-white mt-n1">60.5k</h3>
							<div class="progress bg-black bg-opacity-50 mb-2" style="height: 6px">
								<div class="progrss-bar progress-bar-striped bg-white" style="width: 50%"></div>
							</div>
							<div class="text-white text-opacity-80 mb-4"><i class="fa fa-caret-up"></i> 33% increase <br>compare to last week</div>
							<div><a href="#" class="text-white d-flex align-items-center text-decoration-none">View report <i class="fa fa-chevron-right ms-2 text-white text-opacity-50"></i></a></div>
						</card-body>
					</card>
				</div>
				<!-- BEGIN col-6 -->
			</div>
			<!-- END row -->
		</div>
		<!-- END col-6 -->
	</div>
	<!-- END row -->
</template>