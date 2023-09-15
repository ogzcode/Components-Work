<template>
    <tbody>
        <template v-for="(row, i) in data" :key="i">
            <tr>
                <template v-for="(column, j) in header" :key="j">
                    <td :style="{ width: column.width }">
                        <slot :name="column.key" :data="row">
                            {{ row[column.key] }} hello
                        </slot>
                    </td>
                </template>
            </tr>
        </template>
    </tbody>
</template>


<script setup>
import { defineProps, computed } from 'vue';

defineProps({
    data: {
        type: Array,
        required: true
    },
    header: {
        type: Array,
        required: true
    }
})

</script>

<style scoped>

td {
    border: 1px solid #ddd;
    padding: 8px;
}


</style>