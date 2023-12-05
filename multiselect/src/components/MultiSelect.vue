<template>
    <div class="">
        <label class="mb-1 block text-slate-500">Select Multiple item</label>
        <div ref="selectBox" class="w-80 relative">
            <div class="flex justify-between items-center py-2 px-4 cursor-pointer border rounded-md transition-all outline-teal-100 hover:border-teal-500"
                :class="[showOptions ? 'outline outline-4 outline-teal-100 border-teal-500' : 'border-slate-400']"
                @click="toggleOptions">
                <div>
                    <p class="text-slate-500 text-base">{{ selectedOptions.length != 0 ? selectedOptions.length + " items selected." : "Select items"}}</p>
                </div>
                <div class="text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
            </div>
            <div v-show="showOptions" class="absolute mt-1 w-full z-10 shadow-lg rounded-xl overflow-hidden">
                <div class="flex w-full justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
                    <input type="checkbox" class="w-4 h-4" v-model="selectAll">
                    <div @click="toggleOptions" class="text-gray-500 hover:bg-gray-100 cursor-pointer p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                            class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path
                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </div>
                </div>
                <div class="h-60 overflow-y-auto">
                    <template v-for="(option, i) in options" :key="i">
                        <div class="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100" @click="handleSelect(option)">
                            <input :id="i" type="checkbox" class="w-4 h-4 " :checked="selectedOptions.includes(option.value)">
                            <label :for="i" class="ml-2 text-gray-500">{{ option.label }}</label>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const selectBox = ref(null);
const showOptions = ref(false);
const options = ref([
    {
        label: 'Option 1',
        value: 'option-1'
    },
    {
        label: 'Option 2',
        value: 'option-2'
    },
    {
        label: 'Option 3',
        value: 'option-3'
    },
    {
        label: 'Option 4',
        value: 'option-4'
    },
    {
        label: 'Option 5',
        value: 'option-5'
    },
    {
        label: 'Option 6',
        value: 'option-6'
    },
    {
        label: 'Option 7',
        value: 'option-7'
    },
    {
        label: 'Option 8',
        value: 'option-8'
    },
    {
        label: 'Option 9',
        value: 'option-9'
    },
    {
        label: 'Option 10',
        value: 'option-10'
    },
    {
        label: 'Option 11',
        value: 'option-11'
    },
    {
        label: 'Option 12',
        value: 'option-12'
    },
])
const selectedOptions = ref([]);
const selectAll = ref(false);

const toggleOptions = () => {
    showOptions.value = !showOptions.value;
};

const selectAllOptions = () => {
    if (selectAll.value) {
        selectedOptions.value = options.value.map(option => option.value);
    }
    else if (!selectAll.value && options.value.length === selectedOptions.value.length) {
        selectedOptions.value = [];
    }
};

const handleClickOutside = (e) => {
    if (showOptions.value && !selectBox.value.contains(e.target)) {
        showOptions.value = false;
    }
};

const handleSelect = (option) => {
    if (selectedOptions.value.includes(option.value)) {
        selectedOptions.value = selectedOptions.value.filter(item => item !== option.value);
    } else {
        selectedOptions.value.push(option.value);
    }
};

onMounted(() => {
    window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside);
});

watch(selectAll, selectAllOptions);

watch(selectedOptions, (newValue) => {
    if (newValue.length === options.value.length) {
        selectAll.value = true;
    } else {
        selectAll.value = false;
    }
});
</script>
  
<style scoped>

input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    width: 1.25rem;
    height: 1.25rem;
    transition: all 0.15s ease-in-out;
}

input[type="checkbox"]:checked {
    background-color: #10b981;
    border-color: #10b981;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
}

</style>
  