import { ref } from 'vue'
import { defineStore } from 'pinia'
import arraySort from 'array-sort';

export const useDataTable = defineStore("data-table", () => {
    const data = ref([])
    const headers = ref([]);
    const initData = ref([]);

    const init = (data, header) => {
        data.value = data;
        headers.value = header;
    }

    const setData = (data) => {
        data.value = data;
    }

    const setHeaders = (headers) => {
        headers.value = headers;
    }

    const sort = ({ columnName, order }) => {
        arraySort(initData.value, columnName, { reverse: order === 'desc' });
    }


    return {
        data,
        headers,
        init,
        setData,
        setHeaders,
        sort
    }
});