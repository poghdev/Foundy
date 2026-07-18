<script setup lang="ts">
withDefaults(defineProps<{
  href: string
  variant?: 'dark' | 'light' | 'outline' | 'ghost'
}>(), {
  variant: 'dark',
})
</script>

<template>
  <a
    :href="href"
    class="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition duration-200 active:scale-[0.98]"
    :class="{
      'bg-neutral-950 text-white hover:bg-neutral-800': variant === 'dark',
      'bg-white text-neutral-950 hover:bg-neutral-100': variant === 'light',
      'border border-neutral-300 bg-white text-neutral-950 hover:border-neutral-950': variant === 'outline',
      'text-white underline decoration-white/40 underline-offset-4 hover:decoration-white': variant === 'ghost',
    }"
  >
    <slot />
  </a>
</template>
