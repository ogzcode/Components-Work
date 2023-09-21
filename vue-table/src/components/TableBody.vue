<template>
    <tbody>
        <template v-for="(row, i) in dataTableStore.dataToDisplay" :key="i">
            <tr>
                <td>
                    <input 
                        type="checkbox" 
                        :checked="dataTableStore.selectedItems.includes(row)" 
                        @change="onChangeSelect(row)" 
                    />
                </td>
                <template v-for="(column, j) in dataTableStore.headers" :key="j">
                    <td :style="{
                        minWidth: column.columnWidth ? `${column.columnWidth}px` : '0',
                        width: 'auto'
                    }">
                        <slot :name="column.key" :data="row">
                            {{ row[column.key] }}
                        </slot>
                    </td>
                </template>
            </tr>
        </template>
        <span>{{ dataTableStore.dataToDisplay.length }}</span>
    </tbody>
</template>


<script setup>
import { useDataTable } from '../stores/useDataTable';

const dataTableStore = useDataTable();

const onChangeSelect = (row) => {
    dataTableStore.setSelectedItems(row);
}
</script>

<style scoped>
td {
    border: 1px solid #ddd;
    padding: 8px;
}

td:first-child {
    width: 16px;
}
</style>