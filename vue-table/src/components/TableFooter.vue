<template>
    <div class="footer">
        <div>
            <select v-model="dataTableStore.itemsPerPage">
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
            </select>
        </div>
        <div>
            <ul>
                <li @click="dataTableStore.setFirstPage()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        <path fill-rule="evenodd"
                            d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </li>
                <li @click="dataTableStore.prevPage()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </li>
                <li v-for="(page, index) in visiblePages" @click="dataTableStore.pageChange(index + 1)" :key="index">
                    {{ page }}
                </li>
                <li @click="dataTableStore.nextPage()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </li>
                <li @click="dataTableStore.setLastPage()">
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
import { computed } from 'vue';
import { useDataTable } from '../stores/useDataTable';

const dataTableStore = useDataTable();

const totalVisible = 5;

const startPage = computed(() => {
    if (dataTableStore.currentPage === 1 || 
        dataTableStore.pageCount <= totalVisible
        || (dataTableStore.currentPage === dataTableStore.pageCount - 1 && dataTableStore.pageCount <= totalVisible)
        || dataTableStore.currentPage <= Math.floor(totalVisible / 2)) {
        return 1;
    }

    if (dataTableStore.currentPage + 2 > dataTableStore.pageCount) {
        return dataTableStore.pageCount - totalVisible + 1;
    }

    return dataTableStore.currentPage - 2;

});

const endPage = computed(() => {
    return Math.min(startPage.value + totalVisible - 1, dataTableStore.pageCount);
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