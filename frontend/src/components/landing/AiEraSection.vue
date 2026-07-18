<script setup lang="ts">
import { Bot, Check, Sparkles } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
</script>

<template>
  <section class="section-space bg-white">
    <div class="container-shell">
      <div class="grid items-end gap-8 lg:grid-cols-[1fr_.72fr]">
        <SectionHeading :eyebrow="copy.ai.eyebrow" :title="copy.ai.title" data-reveal />
        <p class="text-lg leading-8 text-neutral-600" data-reveal>{{ copy.ai.text }}</p>
      </div>
      <div class="mt-14 grid overflow-hidden rounded-[1.75rem] border border-neutral-200 md:grid-cols-2" data-reveal>
        <div class="bg-neutral-50 p-7 sm:p-10">
          <Bot :size="26" class="text-neutral-500" aria-hidden="true" />
          <h3 class="mt-7 text-2xl font-semibold">{{ copy.ai.helps }}</h3>
          <ul class="mt-7 grid gap-3 sm:grid-cols-2">
            <li v-for="item in copy.ai.helpItems" :key="item" class="flex items-center gap-3 text-sm text-neutral-600"><span class="size-1.5 rounded-full bg-neutral-400" />{{ item }}</li>
          </ul>
        </div>
        <div class="bg-neutral-950 p-7 text-white sm:p-10">
          <Sparkles :size="26" aria-hidden="true" />
          <h3 class="mt-7 text-2xl font-semibold">{{ copy.ai.develops }}</h3>
          <ul class="mt-7 grid gap-3 sm:grid-cols-2">
            <li v-for="item in copy.ai.realItems" :key="item" class="flex items-center gap-3 text-sm text-neutral-300"><Check :size="14" aria-hidden="true" />{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
