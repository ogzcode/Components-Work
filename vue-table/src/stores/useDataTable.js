import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import arraySort from 'array-sort';

export const useDataTable = defineStore("data-table", () => {
    const realData = ref([])
    const headers = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const searchQuery = ref('');
    const initData = ref([]);
    const selectedItems = ref([]);

    const setSelectedItems = (item) => {
        selectedItems.value.push(item);
    }

    const init = (data, header) => {
        realData.value = data;
        headers.value = header;
        initData.value = data;
    }

    const setData = (data) => {
        realData.value = data;
    }

    const setHeaders = (data) => {
        headers.value = data;
    }

    const setItemsPerPage = (page) => {
        itemsPerPage.value = page;
    }

    const sort = ({ columnName, order }) => {
        arraySort(initData.value, columnName, { reverse: order === 'desc' });
    }

    const totalItems = computed(() => initData.value.length);

    const pageCount = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

    const pageChange = (page) => {
        currentPage.value = page;
    }

    const setFirstPage = () => {
        currentPage.value = 1;
    }

    const setLastPage = () => {
        currentPage.value = pageCount.value;
    }

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
    }

    const nextPage = () => {
        if (currentPage.value < pageCount.value) {
            currentPage.value++;
        }
    }

    const searchItems = () => {
        if (searchQuery.value.length > 0) {
            initData.value = realData.value.filter((item) => {
                return Object.keys(item).some((key) => {
                    return String(item[key]).toLowerCase().includes(searchQuery.value.toLowerCase());
                });
            });
        } else {
            initData.value = realData.value;
        }
    }

    const dataToDisplay = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return initData.value.slice(start, end);
    });


    return {
        headers,
        currentPage,
        initData,
        itemsPerPage,
        totalItems,
        pageCount,
        searchQuery,
        dataToDisplay,
        selectedItems,
        setSelectedItems,
        searchItems,
        init,
        setData,
        setHeaders,
        sort,
        setItemsPerPage,
        pageChange,
        setFirstPage,
        setLastPage,
        prevPage,
        nextPage,
    }
});