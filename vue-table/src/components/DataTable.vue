<template>
    <div class="card">
        <div class="header">
            <input type="text" 
                v-model="dataTableStore.searchQuery" 
                @input="dataTableStore.searchItems()"
                placeholder="Search..." 
            />
            <button @click="printSelectedItems" v-if="dataTableStore.selectedItems.length > 0">Delete</button>
        </div>
        <table>
            <TableHeader/>
            <TableBody>
                <template v-for="(_, name) in $slots" v-slot:[name]="{ data }">
                    <slot :name="name" :data="data">
                        {{ data[name] }}
                    </slot>
                </template>
            </TableBody>
        </table>
        <TableFooter />
    </div>
</template>

<script setup>
import { useDataTable } from '../stores/useDataTable';

import TableHeader from './TableHeader.vue';
import TableBody from './TableBody.vue';
import TableFooter from './TableFooter.vue';

const dataTableStore = useDataTable();

const printSelectedItems = () => {
    console.log(dataTableStore.selectedItems);
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
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

button {
    border: none;
    background-color: #ddd;
    border-radius: 5px;
    padding: 8px;
    cursor: pointer;
    outline: none;
}
</style>