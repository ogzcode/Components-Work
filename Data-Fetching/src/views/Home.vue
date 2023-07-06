<template>
    <div class="text-center mb-12">
        <button
            class="bg-teal-600 text-white font-medium m-2 rounded px-6 py-1 transition cursor-pointer hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="getNewPage(prevPage)" :disabled="prevPage === null">Prev</button>
        <button class="bg-teal-600 text-white font-medium m-2 rounded px-6 py-1 transition cursor-pointer hover:bg-teal-800"
            @click="getNewPage(nextPage)" style="margin-left: 1rem;" severity="help">Next</button>
    </div>
    <ul class="flex flex-wrap justify-center">
        <li class="m-4 text-center shadow rounded overflow-hidden" v-for="(character, index) in results" :key="index">
            <img :src="character.image" alt="" />
            <router-link class="link no-underline block text-center my-4 bg-teal-500 py-2 mx-4 rounded text-white" :to="{
                name: 'Character',
                params: { id: character.id }
            }">
                <span class="">{{ character.name }}</span>
                <span class="ml-4">
                    <svg class="inline fill-white transition" xmlns="http://www.w3.org/2000/svg" height="1em"
                        viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                    </svg>
                </span>
            </router-link>
        </li>
    </ul>
</template>

<script>
import { useDataStore } from "../store/data.js";
import { getCharacters } from "../services/services.js";
import { storeToRefs } from "pinia";

export default {
    name: "Home",
    setup() {
        const store = useDataStore();

        const { results, nextPage, prevPage } = storeToRefs(store);

        async function getNewPage(url) {
            const response = await getCharacters(url);
            store.setData(response.data);
        }

        return {
            nextPage: nextPage,
            prevPage: prevPage,
            results: results,
            getNewPage
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
}

.link:hover svg {
    transform: translateX(5px);
}
</style>