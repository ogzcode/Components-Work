<script>
import { getCharacters } from "./services/services.js";
import { useDataStore } from "./store/data.js";

export default {
  name: "App",
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const response = await getCharacters();

      const store = useDataStore();
      store.setData(response.data);
    }
  }
}

</script>

<template>
  <div id="app">
    <nav class="text-center py-4 shadow-lg mb-8">
      <router-link class="text-teal-600 mx-4 text-lg uppercase" :to="{ name: 'Home' }">Home</router-link>
      <router-link class="text-teal-600 mx-4 text-lg uppercase" :to="{ name: 'Saved' }">Saved Characters</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.link {
  text-align: center;
  color: gray;
  padding: 10px;
  text-decoration: none;
  font-size: 16px;
}
</style>
