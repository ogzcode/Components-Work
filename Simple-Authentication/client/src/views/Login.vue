<template>
    <div class="flex min-h-screen justify-center items-center bg-red-50">
        <form class="shadow-lg p-8 rounded bg-white w-1/5" @submit.prevent="onSubmit">
            <h1 class="text-red-500 text-2xl text-center uppercase mb-4">Login</h1>
            <label class="block text-sm text-gray-500" for="username">Username</label>
            <input placeholder="admin" class="text-slate-700 border rounded outline-0 mb-4 py-1 px-2 w-full" type="text" id="username" v-model="username" />
            <label class="block text-sm text-gray-500" for="password">Password</label>
            <input placeholder="1234" class="text-slate-700 border rounded outline-0 mb-4 py-1 px-2 w-full" type="password" id="password" v-model="password" />
            <button class="mx-auto block px-12 py-1 shadow-sm rounded bg-red-400 uppercase text-white" type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.js';

export default {
    setup() {
        const store = useAuthStore();

        const username = ref('');
        const password = ref('');

        function onSubmit() {
            const creadentials = { username: username.value, password: password.value };
            store.login(creadentials);
        }

        return {
            username,
            password,
            onSubmit
        }
    }
}
</script>

<style scoped>
</style>
