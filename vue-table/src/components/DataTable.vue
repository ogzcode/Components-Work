<template>
    <div class="card">
        <div>
            <input type="text" v-model="searchQuery" @input="searchItems()" placeholder="Search..." />
        </div>
        <table>
            <TableHeader :header="header" @on-sort="sort"/>
            <TableBody :data="dataToDisplay" :header="header">
                <template v-for="(_, name) in $slots" v-slot:[name]="{ data }">
                    <slot :name="name" :data="data">
                        {{ data[name] }}
                    </slot>
                </template>
            </TableBody>
        </table>
        <TableFooter v-model:items-per-page="itemsInTable" :count="totalItems" :current-page="currentPage"
            @page-change="onPageChange" />
    </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
import arraySort from 'array-sort';

import TableHeader from './TableHeader.vue';
import TableBody from './TableBody.vue';
import TableFooter from './TableFooter.vue';

const props = defineProps({
    header: {
        type: Array,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    itemsPerPage: {
        type: Number,
        default: 10
    }
})

const currentPage = ref(1);
const searchQuery = ref('');
const itemsInTable = ref(props.itemsPerPage || 10);
const initData = ref(props.data);

const dataToDisplay = computed(() => {
    if (!initData.value) return [];

    if (initData.value.length <= itemsInTable.value) {
        return initData.value;
    }
    else {
        const start = (currentPage.value - 1) * itemsInTable.value;
        const end = start + itemsInTable.value;
        return initData.value.slice(start, end);
    }
})

const totalItems = computed(() => {
    return initData.value.length || 0;
});

const onPageChange = (page) => {
    currentPage.value = page;
}

const searchItems = () => {
    initData.value = props.data;

    let result = [];

    for (let i = 0; i < initData.value.length; i++) {
        const item = initData.value[i];
        for (let key in item) {
            if (item[key].toString().toLowerCase().includes(searchQuery.value.toLowerCase())) {
                result.push(item);
                break;
            }
        }
    }

    initData.value = result;
}

const sort = ({ columnName, order }) => {
    arraySort(initData.value, columnName, { reverse: order === 'desc' });
}

</script>

<style scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 32px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
}

input {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 8px;
    width: 240px;
    box-sizing: border-box;
    outline: none;
    margin-bottom: 1rem;
}
</style>