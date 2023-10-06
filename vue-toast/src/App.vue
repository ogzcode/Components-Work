<template>
    <div class="flex gap-y-10 p-10 flex-col w-[200px]">
        <button @click="activateToast('success')" class="px-6 py-2 bg-emerald-500 rounded text-sm text-white">Success</button>
        <button @click="activateToast('info')" class="px-6 py-2 bg-indigo-500 rounded text-sm text-white">Info</button>
        <button @click="activateToast('warning')" class="px-6 py-2 bg-amber-500 rounded text-sm text-white">Warning</button>
        <button @click="activateToast('error')" class="px-6 py-2 bg-red-500 rounded text-sm text-white">Error</button>
    </div>
    <Toast />
</template>

<script setup>
import Toast from './components/Toast.vue';
import { useToastStore } from './stores/toast';

const toastStore = useToastStore();

const activateToast = (type) => {
    let message = ""

    if (type === "success") {
        message = "This is a success message"
    } else if (type === "info") {
        message = "This is an info message"
    } else if (type === "warning") {
        message = "This is a warning message"
    } else if (type === "error") {
        message = "This is an error message"
    }

    toastStore.showToast(type, message);
};
</script>

<style scoped>

</style>
