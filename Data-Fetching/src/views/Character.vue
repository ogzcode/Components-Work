<template>
    <div class="flex mt-20">
        <div class="mx-auto overflow-hidden relative shadow-lg rounded">
            <img :src="character.image" alt="" />
            <p class="text-cyan-700 text-xl my-4 uppercase text-center font-semibold">{{ character.name }}</p>
            <div class="text-center text-sm mb-4">
                <span class="mr-4 rounded-md px-2 py-2 font-medium text-xs" :class="statusStyle(character.status)">{{
                    character.status }}</span>
                <span class="mr-4 rounded-md px-2 py-2 font-medium text-xs" 
                    :class="[character.gender === 'Male' ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/10' 
                    : 'bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-600/10']">{{ character.gender}}</span>
            </div>
            <button class="btn absolute top-4 right-4 text-2xl bg-white rounded" @click="saveImage">
                <svg :class="[isCharacterSaved(character.id) ? 'fill-sky-500' : 'fill-slate-300']" xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getSingleCharacter } from "../services/services.js";
import { useDataStore } from "../store/data.js";

export default {
    name: "Character",
    setup() {
        const route = useRoute()
        const character = ref({});
        const store = useDataStore();

        const { isCharacterSaved } = store;

        async function getCharacter() {
            const response = await getSingleCharacter(route.params.id);
            character.value = response.data;
        }

        function saveImage() {
            if (!isCharacterSaved(character.value.id)) {
                store.addSavedCharacter(character.value);
            }
            else {
                store.removeSavedCharacter(character.value.id);
            }
        }
        
        function statusStyle(status) {
            if (status === "Dead") {
                return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10';
            }
            else if (status === "Alive") {
                return 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/10';
            }
            else {
                return 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/10';
            }
        } 

        onMounted(() => {
            getCharacter();
        })

        return {
            character,
            saveImage,
            isCharacterSaved,
            statusStyle
        }
    }
}
</script>

<style scoped>
.btn {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
