<script setup lang="ts">
import { Flag } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
</script>

<template>
  <section class="section-space bg-neutral-100">
    <div class="container-shell">
      <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading :eyebrow="copy.pilot.eyebrow" :title="copy.pilot.title" :text="copy.pilot.text" data-reveal />
        <span class="inline-flex w-fit items-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white" data-reveal><Flag :size="14" aria-hidden="true" />{{ copy.pilot.target }}</span>
      </div>
      <dl class="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-neutral-200 lg:grid-cols-5" data-reveal>
        <div v-for="(metric, index) in copy.pilot.metrics" :key="metric.label" class="bg-white p-6 sm:p-8" :class="index === 4 ? 'col-span-2 lg:col-span-1' : ''">
          <dt class="text-sm text-neutral-500">{{ metric.label }}</dt>
          <dd class="mt-4 text-5xl font-semibold tracking-[-0.055em]">{{ metric.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
