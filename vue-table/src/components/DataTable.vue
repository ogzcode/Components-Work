<template>
    <div class="card">
        <div>
            <input type="text" 
                v-model="dataTableStore.searchQuery" 
                @input="dataTableStore.searchItems()"
                placeholder="Search..." 
            />
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
import { defineProps, ref } from 'vue';
import { useDataTable } from '../stores/useDataTable';

import TableHeader from './TableHeader.vue';
import TableBody from './TableBody.vue';
import TableFooter from './TableFooter.vue';

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    itemsPerPage: {
        type: Number,
        default: 10
    }
})

const searchQuery = ref('');
const initData = ref([]);

const dataTableStore = useDataTable();

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