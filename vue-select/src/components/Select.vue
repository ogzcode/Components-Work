<template>
    <div class="w-full" ref="selectRef">
        <label class="block mb-2 text-sm text-slate-700" tabindex="0">Select an option</label>
        <div role="combobox" aria-haspopup="listbox" aria-expanded="{{ show }}" tabindex="0"
            class="bg-slate-50 border border-slate-300 relative rounded p-2" @click="handleClickSelect">
            <p class="text-slate-600 text-sm tracking-wide truncate pr-8">{{ select?.label || "Select" }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                class="bi bi-chevron-down absolute top-1/2 right-2 transform -translate-y-1/2 text-slate-600 transition-all duration-300"
                :class="[show ? 'rotate-180' : 'rotate-0']" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
            <div role="listbox"
                class="absolute top-full left-0 shadow-lg bg-white w-full rounded mt-1 max-h-[240px] overflow-y-auto"
                :class="[show ? 'block' : 'hidden']" tabindex="-1">
                <p role="listitem"
                    class="truncate w-full p-2 text-slate-600 text-sm hover:bg-slate-100 cursor-pointer tracking-wide"
                    v-for="(item, i) in props.items" :key="i" @click="e => handleClickItem(e, item)" aria-label="Selected option:"
                    tabindex="0">{{
                        item.label }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const select = ref(null)
const show = ref(false)
const selectRef = ref(null)

const props = defineProps({
  items: {
    type: Array,
    required: true,
  }
})

const emits = defineEmits(['update:modelValue'])

const handleClickSelect = (e) => {
  show.value = !show.value
}

const handleClickItem = (event, item) => {
  select.value = item
  emits('update:modelValue', item)
  show.value = false
  event.stopPropagation()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    show.value = false
  }
}
</script>

<style scoped>
[role="listbox"]::-webkit-scrollbar {
  width: 0.3rem;
}

[role="listbox"]::-webkit-scrollbar-track {
  background: #fff;
}

[role="listbox"]::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 2px;
}
</style>

