<script lang="ts">
import {reactive, computed } from 'vue';
import vueTable from '@/components/plugins/VueTable.vue';
import { useAppOptionStore } from '@/stores/app-option';
import { RouterLink } from 'vue-router';

const appOption = useAppOptionStore();

export default {
	mounted() {
		appOption.appContentFullHeight = true;
		appOption.appContentClass = 'p-0';
	},
	beforeUnmount() {
		appOption.appContentFullHeight = false;
		appOption.appContentClass = '';
	},
	data() {
		const mailData = [{
				id: 1,
				sender: 'LoRa',
				time: '1 hour ago',
				title: 'Your payment is received',
				desc: 'Praesent id pulvinar orci. Donec ac metus non ligula faucibus venenatis. Suspendisse tortor est, placerat eu dui sed...',
				hasAttachment: true,
				unread: true
				
			}, {
				id: 2,
				sender: 'Chance Graham',
				time: '5 hours ago',
				title: 'Trip to South America',
				desc: 'Quisque luctus sapien sodales pulvinar porta. In pretium accumsan elit, vitae blandit arcu suscipit eu. Ut tortor libero, gravida ut nisl tincidunt, efficitur laoreet mauris.',
				hasAttachment: true,
				unread: true,
				active: true
			}, {
				id: 3,
				sender: 'Paypal Inc',
				time: 'Aug 11',
				title: 'Important information about your order #019244',
				desc: 'Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim.',
				hasAttachment: true
			}, {
				id: 4,
				sender: 'Fitbit',
				time: 'Aug 09',
				title: 'Stylish accessories for your Charge 2',
				desc: 'How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled.'
			}, {
				id: 5,
				sender: 'Apple',
				time: 'Aug 09',
				title: 'Your invoice from Apple.',
				desc: 'Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls.'
			}, {
				id: 6,
				sender: 'Hotels.com',
				time: 'Aug 09',
				title: '[Ends tonight!] 48 Hour Sale - Save up to 50% + save an extra 10%',
				desc: 'Phasellus vulputate, ligula ac hendrerit euismod, nunc metus maximus tellus, aliquam finibus justo lorem a augue.'
			}, {
				id: 7,
				sender: 'Google Calendar',
				time: 'Aug 08',
				title: 'Daily schedule on Tuesday, May 9, 2017',
				desc: 'Suspendisse potenti. Praesent ac ullamcorper sem. Mauris luctus accumsan felis'
			}, {
				id: 8,
				sender: 'Facebook Blueprint',
				time: 'Aug 08',
				title: 'April 2017 – Blueprint Highlights',
				desc: 'Phasellus pretium viverra tortor, eu sagittis erat aliquam nec. Nunc et volutpat ligula. Duis viverra posuere enim, ac bibendum massa viverra id.'
			}, {
				id: 9,
				sender: 'Customer Care',
				time: 'Aug 08',
				title: 'Re: [Case #1567940] - Re: [Important] Exabytes',
				desc: 'Nam imperdiet molestie arcu, et gravida quam lacinia lobortis.'
			}, {
				id: 10,
				sender: 'Flight Status',
				time: 'Aug 07',
				title: '[Case#2017022137015743] *FLIGHT RETIMED* **MH2713/15JUL17**',
				desc: 'Etiam condimentum orci ut velit suscipit, ut accumsan elit aliquet. Nulla cursus mi at]'
		}];
		
		const data = reactive([]);
		for (let i = 0; i < 126; i++) {
			data.push({
				id: i,
				温度: "TEST" + i,
				湿度: "test" + i + "@example.com",
				高度: "123",
				维度: "1111",
				时间: "2021",
				
			});
		};

		const table:any = reactive({
			columns: [
				{
					label: "ID",
					field: "id",
					width: "2%",
					sortable: true,
					isKey: true,
				},
				{
					label: "温度",
					field: "温度",
					width: "10%",
					sortable: true,
				},
				{
					label: "湿度",
					field: "湿度",
					width: "15%",
					sortable: true,
				},
				{
					label: "湿度",
					field: "湿度",
					width: "15%",
					sortable: true,
				},
				{
					label: "湿度",
					field: "湿度",
					width: "15%",
					sortable: true,
				},
				{
					label: "湿度",
					field: "湿度",
					width: "15%",
					sortable: true,
				},
			],
			rows: data,
			totalRecordCount: computed(() => {
				return table.rows.length;
			}),
			sortable: {
				order: "id",
				sort: "asc",
			},
		});


		return {
			mailData,
			table
		}
	},
	components: {
		vueTable: vueTable
	}
}
</script>
<template>
	<!-- BEGIN mailbox -->
	<div class="mailbox">
		<!-- BEGIN mailbox-toolbar -->
		<div class="mailbox-toolbar">
			<div class="mailbox-toolbar-item"><RouterLink to="/devices/detail" class="mailbox-toolbar-link active">Online</RouterLink></div>
			<div class="mailbox-toolbar-item"><RouterLink to="/devices/detail" class="mailbox-toolbar-link">Offline</RouterLink></div>
		</div>
		<!-- END mailbox-toolbar -->
		<!-- BEGIN mailbox-body -->
		<div class="mailbox-body">
			<!-- BEGIN mailbox-sidebar -->
			<div class="mailbox-sidebar d-none d-lg-block">
				<perfect-scrollbar class="h-100">
					<div class="mailbox-list">
						<div class="mailbox-list-item" v-if="mailData" v-for="mail in mailData" v-bind:class="{ 'has-attachment': mail.hasAttachment, 'unread': mail.unread, 'active': mail.active}">
							<div class="mailbox-checkbox">
								<div class="form-check">
									<label class="form-check-label" :for="'mailCheckbox' + mail.id"></label>
								</div>
							</div>
							<div class="mailbox-message">
								<RouterLink to="/email/detail" class="mailbox-list-item-link">
									<div class="mailbox-sender">
										<span class="mailbox-sender-name">{{ mail.sender }}</span>
										<span class="mailbox-time">{{ mail.time }}</span>
									</div>
									<div class="mailbox-title">{{ mail.title }}</div>
									<div class="mailbox-desc">{{ mail.desc }}</div>
								</RouterLink>
							</div>
						</div>
						<div class="mailbox-list-item" v-else>
							No records found
						</div>
					</div>
				</perfect-scrollbar>
			</div>
			<!-- END mailbox-sidebar -->

			<!-- BEGIN mailbox-content -->
			<div class="m-5">
				<perfect-scrollbar class="h-100 w-100">
					<vue-table class="vue-table"
					:is-static-mode="true"
					:columns="table.columns"
					:rows="table.rows"
					:total="table.totalRecordCount"
					:sortable="table.sortable" />
				</perfect-scrollbar>
			</div>
			<!-- END mailbox-content -->
		</div>
		<!-- END mailbox-body -->
	</div>
	<!-- END mailbox -->
</template>