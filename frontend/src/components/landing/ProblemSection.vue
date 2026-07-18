<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
</script>

<template>
  <section id="problem" class="section-space bg-neutral-50">
    <div class="container-shell">
      <SectionHeading :eyebrow="copy.problem.eyebrow" :title="copy.problem.title" :text="copy.problem.text" data-reveal />
      <div class="mt-14 grid gap-4 md:grid-cols-3">
        <article v-for="(card, index) in copy.problem.cards" :key="card.title" class="card-lift flex min-h-64 flex-col rounded-3xl border border-neutral-200 bg-white p-7" data-reveal>
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-neutral-400">0{{ index + 1 }}</span>
            <ArrowUpRight :size="19" class="text-neutral-400" aria-hidden="true" />
          </div>
          <h3 class="mt-auto pt-12 text-xl font-semibold tracking-[-0.025em]">{{ card.title }}</h3>
          <p class="mt-3 leading-7 text-neutral-600">{{ card.text }}</p>
        </article>
      </div>
      <p class="mt-10 border-l-2 border-neutral-950 pl-5 text-lg font-semibold" data-reveal>{{ copy.problem.summary }}</p>
    </div>
  </section>
</template>
