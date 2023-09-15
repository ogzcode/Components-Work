<template>
    <thead>
        <tr>
            <th v-for="column in header" :key="column.key" :style="{ width: column.width }">
                {{ column.columnName }}
            </th>
        </tr>
    </thead>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';

defineProps({
    header: {
        type: Array,
        required: true
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
</style>