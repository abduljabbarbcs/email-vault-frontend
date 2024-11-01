<template>
    <button
        class="bg-[#571459] px-12 py-2 rounded-md text-white text-sm shadow-md shadow-gray-400"
        :class="{ 'bg-opacity-30 shadow-gray-300': disabled }"
        :disabled="disabled"
    >
        {{ text }}
    </button>
</template>
<script lang="ts" setup>
    defineProps<{
        text: string
        disabled?: boolean
        classContent?: string
    }>()

</script>