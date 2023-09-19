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
            <ul>
                <li @click="onClickFirstPage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        <path fill-rule="evenodd"
                            d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </li>
                <li @click="onClickPrevPage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-chevron-compact-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z" />
                    </svg>
                </li>
                <li v-for="(page, index) in visiblePages" @click="onClickPage(index + 1)" :key="index">
                    {{ page }}
                </li>
                <li @click="onClickNextPage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </li>
                <li @click="onClickLastPage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
                        <path fill-rule="evenodd"
                            d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </li>
            </ul>
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
    },
    currentPage: {
        type: Number,
        required: true
    }
})

const totalVisible = 5;
const emit = defineEmits(['update:itemsPerPage', "page-change"]);

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

const onClickFirstPage = () => {
    emit('page-change', 1);
}

const onClickLastPage = () => {
    emit('page-change', pageCount.value);
}

const onClickPrevPage = () => {
    if (props.currentPage > 1) {
        emit('page-change', props.currentPage - 1);
    }
}

const onClickNextPage = () => {
    if (props.currentPage < pageCount.value) {
        emit('page-change', props.currentPage + 1);
    }
}

const onClickPage = (page) => {
    emit('page-change', page);
}

const startPage = computed(() => {
    if (props.currentPage === 1 || pageCount.value <= totalVisible
        || (props.currentPage === pageCount.value - 1 && pageCount.value <= totalVisible)
        || props.currentPage <= Math.floor(totalVisible / 2)) {
        return 1;
    }

    if (props.currentPage + 2 > pageCount.value) {
        return pageCount.value - totalVisible + 1;
    }

    return props.currentPage - 2;

});

const endPage = computed(() => {
    return Math.min(startPage.value + totalVisible - 1, pageCount.value);
});

const visiblePages = computed(() => {
    const range = [];
    for (let i = startPage.value; i <= endPage.value; i++) {
        range.push(i);
    }

    return range;
});

</script>

<style scoped>
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
}

ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
}

ul li {
    margin: 0 8px;
    cursor: pointer;
}

ul li:hover {
    text-decoration: underline;
}

ul li:first-child {
    margin-left: 0;
}

ul li:last-child {
    margin-right: 0;
}

select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
}

select:focus {
    outline: none;
}

select:hover {
    border-color: #999;
}

select option {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
}
</style>