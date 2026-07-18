<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
</script>

<template>
  <section id="how-it-works" class="section-space overflow-hidden bg-[#171717] text-white">
    <div class="container-shell">
      <SectionHeading :eyebrow="copy.how.eyebrow" :title="copy.how.title" :text="copy.how.text" inverted data-reveal />
      <ol class="relative mt-16 grid gap-0 lg:grid-cols-5">
        <li v-for="(step, index) in copy.how.steps" :key="step.title" class="group relative border-l border-neutral-700 pb-10 pl-7 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-7 lg:pt-9" data-reveal>
          <span class="absolute -left-[5px] top-0 size-2.5 rounded-full border-2 border-neutral-950 bg-white lg:-top-[5px] lg:left-0" />
          <span class="text-xs font-bold tracking-[0.15em] text-neutral-500">0{{ index + 1 }}</span>
          <h3 class="mt-5 text-lg font-semibold leading-6">{{ step.title }}</h3>
          <p class="mt-3 text-sm leading-6 text-neutral-400">{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
