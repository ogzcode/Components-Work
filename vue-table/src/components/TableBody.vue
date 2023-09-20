<template>
    <tbody>
        <template v-for="(row, i) in dataTableStore.initData" :key="i">
            <tr>
                <template v-for="(column, j) in dataTableStore.headers" :key="j">
                    <td :style="{ width: column.width }">
                        <slot :name="column.key" :data="row">
                            {{ row[column.key] }}
                        </slot>
                    </td>
                </template>
            </tr>
        </template>
        <span>{{ dataTableStore.initData.length }}</span>
    </tbody>
</template>


<script setup>
import { useDataTable } from '../stores/useDataTable';

const dataTableStore = useDataTable();
</script>

<style scoped>
td {
    border: 1px solid #ddd;
    padding: 8px;
}
</style>