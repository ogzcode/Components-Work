<template>
<div class="footer">
    <div>
        <select v-model="itemsInCountInTable">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
        </select>
    </div>
    <div>
        <p>{{ pageCount }}</p>
    </div>
</div>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps({
    itemsPerPage: {
        type: Number,
        default: 10
    },
    count: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['update:itemsPerPage']);

const itemsInCountInTable = computed({
    get() {
        return props.itemsPerPage;
    },
    set(value) {
        emit('update:itemsPerPage', value);
    }
})

const pageCount = computed(() => {
    return Math.ceil(props.count / itemsInCountInTable.value);
})
</script>

<style scoped>
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px ;
}
</style>