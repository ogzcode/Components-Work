<template>
	<DataTable :header="header" :data="customers">
		<template v-slot:name="{ data }">
			{{ data.name }}
		</template>
		<template v-slot:email="{ data }">
			{{ data.email }}
		</template>
		<template v-slot:company="{ data }">
			{{ data.company }}
		</template>
		<template v-slot:date="{ data }">
			{{ formatData(data.date) }}
		</template>
		<template v-slot:actions="{ data }">
			<button>Edit</button>
			<button>Delete</button>
		</template>
	</DataTable>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from './components/DataTable.vue';
import { customers } from '@/data/customer';

const header = ref([
	{
		columnName: 'Name',
		key: 'name',
		width: '120px'
	},
	{
		columnName: 'Email',
		key: 'email',
		width: '120px'
	},
	{
		columnName: 'Company',
		key: 'company',
		width: '120px'
	},
	{
		columnName: 'Date',
		key: 'date',
		width: '120px'
	},
	{
		columnName: 'Actions',
		key: 'actions',
		width: '120px'
	}
])

const currentPage = ref(1);

const formatData = (date) => {
    const d = new Date(date);

    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();

    const formatted = `${day}/${month}/${year}`;

    return formatted;
}
</script>

<style scoped></style>
