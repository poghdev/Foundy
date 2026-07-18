<script setup lang="ts">
import { Building, Globe2, GraduationCap } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
const icons = [GraduationCap, Building, Globe2]
</script>

<template>
  <section class="section-space overflow-hidden bg-white">
    <div class="container-shell grid items-center gap-14 lg:grid-cols-[1fr_.9fr]">
      <div data-reveal>
        <SectionHeading :eyebrow="copy.armenia.eyebrow" :title="copy.armenia.title" :text="copy.armenia.text" />
        <p class="mt-9 text-xl font-semibold tracking-[-0.02em]">{{ copy.armenia.statement }}</p>
      </div>
      <div class="relative min-h-[29rem]" data-reveal>
        <div class="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-50" />
        <div class="absolute left-1/2 top-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950 text-2xl font-semibold text-white shadow-2xl">Foundy</div>
        <div
          v-for="(direction, index) in copy.armenia.directions"
          :key="direction"
          class="absolute flex w-48 items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 text-sm font-semibold shadow-lg"
          :class="[
            index === 0 ? 'left-0 top-3 sm:left-[8%]' : '',
            index === 1 ? 'bottom-6 left-0 sm:left-[5%]' : '',
            index === 2 ? 'right-0 top-[35%]' : '',
          ]"
        >
          <span class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100"><component :is="icons[index]" :size="18" aria-hidden="true" /></span>
          {{ direction }}
        </div>
      </div>
    </div>
  </section>
</template>
