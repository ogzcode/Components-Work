<template>
	<div class="p-10 bg-stone-50 min-h-screen">
		<DataTable :header="header" :data="customers">
			<template v-slot:headerActions>
				<button class="py-2 px-4 bg-sky-500 text-white rounded text-sm font-medium tracking-wide"  @click="handleChangeViewDialog(true)">Create New</button>
			</template>

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
				<button
					class="border border-sky-500 rounded-full w-8 h-8 inline-flex justify-center items-center text-sky-500 mr-2"
					@click="onEditItem(data)"
					>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
						class="bi bi-pen-fill" viewBox="0 0 16 16">
						<path
							d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
					</svg>
				</button>
				<button
					class="border border-red-500 rounded-full w-8 h-8 inline-flex justify-center items-center text-red-500"
					@click="onDeleteItem(data)">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
						class="bi bi-trash-fill" viewBox="0 0 16 16">
						<path
							d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
					</svg>
				</button>
			</template>
		</DataTable>
		<Dialog @close="handleChangeViewDialog" :show="viewExampleDialog" :on-submit="handleSubmitNewUser" :submit-is-disabled="isDisabled">
			<template v-slot:body>
				<form>
					<div class="mb-4">
						<label class="text-xs text-slate-500">Name</label>
						<input type="text" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" v-model="name"/>
					</div>
					<div class="mb-4">
						<label class="text-xs text-slate-500">Email</label>
						<input type="text" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" v-model="email" />
					</div>
					<div class="mb-4">
						<label class="text-xs text-slate-500">Company</label>
						<input type="text" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" v-model="company"/>
					</div>
					<div class="mb-4">
						<label class="text-xs text-slate-500">Date</label>
						<input type="date" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" v-model="date"/>
					</div>
				</form>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import DataTable from './components/DataTable.vue';
import Dialog from './components/Dialog.vue';
import { customers } from '@/data/customer';
import { header } from '@/data/header';
import { useDataTable } from './stores/useDataTable';

const dataTableStore = useDataTable();

const viewExampleDialog = ref(false);

const name = ref('');
const email = ref('');
const company = ref('');
const date = ref('');
const id = ref('');

const handleChangeViewDialog = (value) => {
	viewExampleDialog.value = value;

	if (!value) {
		name.value = '';
		email.value = '';
		company.value = '';
		date.value = '';
	}
}

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

const onDeleteItem = (item) => {
	dataTableStore.deleteItem(item);
}

const onEditItem = (item) => {
	name.value = item.name;
	email.value = item.email;
	company.value = item.company;
	date.value = item.date;
	id.value = item.id;
	viewExampleDialog.value = true;
}

const isDisabled = computed(() => {
	return name.value === '' || email.value === '' || company.value === '' || date.value === '';
});

const handleSubmitNewUser = () => {
	const newUser = {
		id: id !== "" ? id.value : Math.floor(Math.random() * 99999) + 1,
		name: name.value,
		email: email.value,
		company: company.value,
		date: date.value
	}

	dataTableStore.addItem(newUser);
	viewExampleDialog.value = false;
}
</script>

<style scoped></style>
