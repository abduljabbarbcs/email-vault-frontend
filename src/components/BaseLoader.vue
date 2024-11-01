<template>
    <svg
      viewBox="0 0 48 48"
      :class="{ 'fixed inset-0 z-max m-auto c-white': !inline }"
      :style="!inline ? { borderRadius: '1rem', width: '9rem', height: '9rem', background: '#000000bf' } : ''"
    >
      <circle
        cx="24"
        cy="24"
        r="9"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <animate attributeName="stroke-dasharray" values="10,285;24,255;10,285" dur="1.3s" repeatCount="indefinite" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 24 24"
          to="360 24 24"
          dur="1.3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </template>
  
  <script lang="ts" setup>
  defineProps<{
    inline?: boolean
  }>()
  </script>
  