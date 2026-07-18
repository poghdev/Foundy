<script setup lang="ts">
import { Eye, FileCheck2, MessageSquareWarning, UserRoundCheck } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
const icons = [Eye, UserRoundCheck, FileCheck2, MessageSquareWarning]
</script>

<template>
  <section id="safety" class="section-space bg-neutral-50">
    <div class="container-shell">
      <div class="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <SectionHeading :eyebrow="copy.safety.eyebrow" :title="copy.safety.title" :text="copy.safety.text" data-reveal />
        <div class="grid gap-4 sm:grid-cols-2">
          <article v-for="(principle, index) in copy.safety.principles" :key="principle.title" class="card-lift rounded-3xl border border-neutral-200 bg-white p-6 sm:p-7" data-reveal>
            <span class="flex size-11 items-center justify-center rounded-2xl bg-neutral-100"><component :is="icons[index]" :size="21" aria-hidden="true" /></span>
            <h3 class="mt-7 text-lg font-semibold">{{ principle.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-neutral-600">{{ principle.text }}</p>
          </article>
        </div>
      </div>
      <div class="mt-10 flex gap-4 rounded-2xl border border-neutral-300 bg-white p-5 sm:items-center sm:p-6" data-reveal>
        <span class="mt-0.5 shrink-0 rounded-full bg-neutral-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:mt-0">{{ copy.safety.noteLabel }}</span>
        <p class="text-sm leading-6 text-neutral-600">{{ copy.safety.note }}</p>
      </div>
    </div>
  </section>
</template>
