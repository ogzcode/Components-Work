<template>
    <thead>
        <tr>
            <th v-for="column in dataTableStore.headers" 
                :key="column.key" 
                :style="{ width: column.width }"
                @click="handleSort(column.key, column.sortEnabled)"
                >
                {{ column.columnName }}
                <span v-html="sortArrow" v-if="columnLabelAndOrder.columnName === column.key"></span>
            </th>
        </tr>
    </thead>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useDataTable } from '../stores/useDataTable';


const dataTableStore = useDataTable();

const columnLabelAndOrder = ref({
    columnName: '',
    order: ''
})

const emit = defineEmits(["on-sort"])

const handleSort = (columnName, sortEnabled) => {
    if (!sortEnabled) return;

    if (columnLabelAndOrder.value.columnName === columnName) {
        columnLabelAndOrder.value.order = columnLabelAndOrder.value.order === 'asc' ? 'desc' : 'asc';
    }
    else {
        columnLabelAndOrder.value.columnName = columnName;
        columnLabelAndOrder.value.order = 'asc';
    }

    emit('on-sort', columnLabelAndOrder.value);
}

const sortArrow = computed(() => {
    if (columnLabelAndOrder.value.order === 'asc') {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
</svg>`;
    }
    else if (columnLabelAndOrder.value.order === 'desc') {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>`;
    }
    else {
        return '';
    }
})
</script>

<style scoped>
thead {
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    font-weight: bold;
}

th {
    padding: 8px;
    text-align: left;
    font-weight: bold;
}

svg {
    margin-left: 8px;
    fill: black;
}
</style>