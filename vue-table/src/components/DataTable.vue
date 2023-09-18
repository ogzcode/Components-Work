<template>
    <div class="card">
        <table>
            <TableHeader :header="header" />
            <TableBody :data="dataToDisplay" :header="header">
                <template v-for="(_, name) in $slots" v-slot:[name]="{ data }">
                    <slot :name="name" :data="data">
                        {{ data[name] }}
                    </slot>
                </template>
            </TableBody>
        </table>
        <TableFooter 
            v-model:items-per-page="itemsInTable" 
            :count="totalItems" 
            :current-page="currentPage"
            @page-change="onPageChange"
        />
    </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
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
const itemsInTable = ref(props.itemsPerPage || 10);

const dataToDisplay = computed(() => {
    if (!props.data) return [];

    if (props.data.length <= itemsInTable.value) {
        return props.data;
    }
    else {
        const start = (currentPage.value - 1) * itemsInTable.value;
        const end = start + itemsInTable.value;
        return props.data.slice(start, end);
    }
})

const totalItems = computed(() => {
    return props.data.length || 0;
});

const onPageChange = (page) => {
    console.log(page);
    currentPage.value = page;
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
</style>