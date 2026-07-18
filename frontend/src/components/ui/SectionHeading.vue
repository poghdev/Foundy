<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  title: string
  text?: string
  align?: 'left' | 'center'
  inverted?: boolean
}>(), {
  text: '',
  align: 'left',
  inverted: false,
})
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'">
    <p class="eyebrow" :class="inverted ? '!text-neutral-400' : ''">{{ eyebrow }}</p>
    <h2
      class="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
      :class="inverted ? 'text-white' : 'text-neutral-950'"
    >
      {{ title }}
    </h2>
    <p v-if="text" class="mt-6 max-w-2xl text-lg leading-8" :class="[inverted ? 'text-neutral-400' : 'text-neutral-600', align === 'center' ? 'mx-auto' : '']">
      {{ text }}
    </p>
  </div>
</template>
