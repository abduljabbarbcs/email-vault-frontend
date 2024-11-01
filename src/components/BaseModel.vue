<template>
    <div class="fixed inset-0 flex items-center justify-center overflow-hidden bg-black bg-opacity-50">
      <div class="bg-white rounded-lg w-11/12 md:w-3/5 lg:w-3/5 pb-4">
        <!-- Modal Header -->
        <div class="flex justify-between items-center border-b pb-3 mb-3 pl-4 pt-6">
          <h2 class="text-lg font-semibold">{{ $t(`${modelType}.title`) }}</h2>
        </div>
  
        <!-- Modal Content -->
        <div class="max-h-80 overflow-y-auto text-sm space-y-6 custom-scrollbar mx-4 border border-[#D9D9D9] p-3 rounded-md">
          <p v-if="$t(`${modelType}.version`)" class="font-bold">{{ $t(`${modelType}.version`) }}</p>
          <p>{{ $t(`${modelType}.paragraph1`) }}</p>
          <p>{{ $t(`${modelType}.paragraph2`) }}</p>
          <p>{{ $t(`${modelType}.paragraph3`) }}</p>
          <p>{{ $t(`${modelType}.paragraph4`) }}</p>
        </div>

        <div class="mt-4 flex justify-end">
          <BaseButton @click="closeModal" text="OK" class="mr-4" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import BaseButton from './BaseButton.vue';

  const { t } = useI18n()
  const props = defineProps<{
    modelType: String
  }>()
  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const closeModal = () => {
    emit('close')
  }
  </script>
