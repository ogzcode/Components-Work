import { defineStore } from "pinia";

export const useDataStore = defineStore("DataStore", {
    state: () => ({
        results: [],
        nextPage: "",
        prevPage: "",
        saved: []
    }),
    getters: {
        isCharacterSaved: (state) => (id) => {
            return state.saved.some((character) => character.id === id);
        }
    },
    actions: {
        setData(data) {
            this.results = data.results;
            this.nextPage = data.info.next;
            this.prevPage = data.info.prev;
        },
        addSavedCharacter(character) {
            this.saved.push(character);
        },
        removeSavedCharacter(id) {
            this.saved = this.saved.filter((character) => character.id !== id);
        }
    }
});