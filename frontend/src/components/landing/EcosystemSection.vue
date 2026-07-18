<script setup lang="ts">
import { Building2, GraduationCap, Lightbulb, UsersRound } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
const icons = [GraduationCap, Lightbulb, UsersRound, Building2]
</script>

<template>
  <section id="for-whom" class="section-space bg-white">
    <div class="container-shell">
      <SectionHeading :eyebrow="copy.ecosystem.eyebrow" :title="copy.ecosystem.title" :text="copy.ecosystem.text" align="center" data-reveal />
      <div class="relative mx-auto mt-12 w-fit rounded-2xl bg-neutral-950 px-6 py-4 text-center text-sm font-medium text-white shadow-xl" data-reveal>
        <strong class="block text-lg">Foundy</strong>
        <span class="mt-1 block max-w-64 text-neutral-400">{{ copy.ecosystem.node }}</span>
      </div>
      <div class="relative mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1.1fr_1.1fr_1fr] lg:items-stretch">
        <article
          v-for="(group, index) in copy.ecosystem.groups"
          :key="group.title"
          class="card-lift rounded-3xl border border-neutral-200 p-6"
          :class="index === 1 || index === 2 ? 'lg:py-10' : 'lg:my-5'"
          data-reveal
        >
          <component :is="icons[index]" :size="23" aria-hidden="true" />
          <h3 class="mt-8 text-xl font-semibold">{{ group.title }}</h3>
          <p class="mt-3 text-sm leading-6 text-neutral-600">{{ group.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
