<template>
    <h1 class="text-center text-2xl mb-8 text-slate-700 uppercase font-semibold">Saved Characters</h1>
    <ul class="flex justify-center flex-wrap">
        <TransitionGroup name="saved">
            <li class="m-4 relative text-center shadow rounded overflow-hidden"
                v-for="(character, index) in savedCharacters" :key="index">
                <img :src="character.image" alt="" />
                <p class="text-center my-4 bg-teal-500 py-2 mx-4 rounded text-white">{{ character.name }}</p>
                <div class="text-center text-sm mb-4">
                    <span class="mr-4 rounded-md px-2 py-2 font-medium text-xs" :class="statusStyle(character.status)">{{
                        character.status }}</span>
                    <span class="mr-4 rounded-md px-2 py-2 font-medium text-xs" :class="[character.gender === 'Male' ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/10'
                        : 'bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-600/10']">{{ character.gender }}</span>
                </div>
                <button class="btn absolute top-4 right-4 text-xl bg-white rounded" @click="removeCharacter(character.id)">
                    <svg class="fill-red-500" xmlns="http://www.w3.org/2000/svg" height="1em"
                        viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                </button>
            </li>
        </TransitionGroup>
    </ul>
</template>

<script>
import { storeToRefs } from "pinia";
import { useDataStore } from "../store/data.js";

export default {
    setup() {
        const store = useDataStore();

        const { saved } = storeToRefs(store);

        function removeCharacter(id) {
            store.removeSavedCharacter(id);
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

        return {
            savedCharacters: saved,
            removeCharacter,
            statusStyle
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
}

.btn {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.saved-move,
.saved-leave-active {
    transition: all 0.5s;
}

.saved-leave-to {
    opacity: 0;
}
</style>