<script setup lang="ts">
import { ref } from 'vue'
import logoUrl from '../../assets/images/foundy-logo.jpg'

withDefaults(defineProps<{ compact?: boolean; inverted?: boolean }>(), {
  compact: false,
  inverted: false,
})

const imageVisible = ref(true)
</script>

<template>
  <span class="inline-flex items-center gap-2.5 font-semibold tracking-[-0.02em]" :class="inverted ? 'text-white' : 'text-neutral-950'">
    <span class="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border" :class="inverted ? 'border-white/20 bg-white' : 'border-neutral-200 bg-white'">
      <img
        v-if="imageVisible"
        :src="logoUrl"
        alt="Foundy logo"
        class="size-full object-contain"
        @error="imageVisible = false"
      />
      <span v-else class="text-sm font-black text-neutral-950" aria-hidden="true">F</span>
    </span>
    <span v-if="!compact">Foundy</span>
  </span>
</template>
