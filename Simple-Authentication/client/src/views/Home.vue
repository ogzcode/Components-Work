<template>
    <div class="flex min-h-screen justify-center items-center flex-col bg-red-50">
        <p class="text-slate-800 font-bold text-5xl mb-5 uppercase">Home Page</p>
        <p class="text-slate-700 font-bold text-3xl mb-5">{{ user.user.name }}</p>
        <button class="px-12 py-2 shadow rounded bg-red-600 uppercase text-white" @click="logout">Logout</button>
    </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.js';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const store = useAuthStore();
        const router = useRouter();

        const { user } = storeToRefs(store);

        function logout() {
            store.logout();
            router.push('/login');
        }

        return {
            logout,
            user
        }
    }
}
</script>