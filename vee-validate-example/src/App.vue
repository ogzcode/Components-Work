<template>
  <div class="container">
    <ComponentForm />
    <CompositionForm />
  </div>
</template>

<script setup>
import ComponentForm from './components/ComponentForm.vue'
import CompositionForm from './components/CompositionForm.vue'
</script>


<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  gap: 32px;
}
</style>
