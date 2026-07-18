<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
</script>

<template>
  <section class="bg-white py-5 sm:py-8">
    <div class="container-shell overflow-hidden rounded-[2rem] bg-neutral-950 px-6 py-16 text-center text-white sm:px-12 sm:py-20" data-reveal>
      <p class="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">{{ copy.final.title }}</p>
      <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <BaseButton href="#join" variant="light">{{ copy.final.primary }} <ArrowRight :size="17" aria-hidden="true" /></BaseButton>
        <BaseButton href="#join" variant="ghost">{{ copy.final.secondary }}</BaseButton>
      </div>
    </div>
  </section>
</template>
