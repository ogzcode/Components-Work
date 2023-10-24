<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="w-[480px]">
      <Select v-model="select" :items="items" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Select from './components/Select.vue';

const select = ref(null)

const items = ref([
  {
    value: '1',
    label: 'Item 1ewrljghnljerhgjklehrljghljerhgjlherjkgjkekgjhqşjrhewhgjlhwrgherhşl',
  },
  {
    value: '2',
    label: 'Item 2',
  },
  {
    value: '3',
    label: 'Item 3',
  },
  {
    value: '4',
    label: 'Item 4',
  },
  {
    value: '5',
    label: 'Item 5',
  },
  {
    value: '6',
    label: 'Item 6',
  },
  {
    value: '5',
    label: 'Item 5',
  },
  {
    value: '6',
    label: 'Item 6',
  },
  {
    value: '5',
    label: 'Item 5',
  },
  {
    value: '6',
    label: 'Item 6',
  },
  {
    value: '5',
    label: 'Item 5',
  },
  {
    value: '6',
    label: 'Item 6',
  },
  {
    value: '5',
    label: 'Item 5',
  },
  {
    value: '6',
    label: 'Item 6',
  }
])

</script>

<style scoped>

</style>
