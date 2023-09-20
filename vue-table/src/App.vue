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
import { onMounted } from 'vue';
import DataTable from './components/DataTable.vue';
import { customers } from '@/data/customer';
import { header } from '@/data/header';
import { useDataTable } from './stores/useDataTable';

const dataTableStore = useDataTable();

onMounted(() => {
	dataTableStore.init(customers, header);
});

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
