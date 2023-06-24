<script lang="ts">
import {reactive, computed } from 'vue';
import vueTable from '@/components/plugins/VueTable.vue';
import { useAppOptionStore } from '@/stores/app-option';
import { RouterLink } from 'vue-router';

const appOption = useAppOptionStore();

export default {
	beforeCreate() {
		appOption.appSidebarHide = false;
		appOption.appHeaderHide = false;
		appOption.appContentClass = 'p-3';
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
			table
		}
	},
	components: {
		vueTable: vueTable
	}
}
</script>
<template>
	<div class="card">
			<div class="m-5">
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