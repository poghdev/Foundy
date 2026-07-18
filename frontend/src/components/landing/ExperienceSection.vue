<script setup lang="ts">
import { Check, ExternalLink, Fingerprint, ShieldCheck } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
</script>

<template>
  <section id="experience" class="section-space overflow-hidden bg-neutral-950 text-white">
    <div class="container-shell grid items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
      <div data-reveal>
        <SectionHeading :eyebrow="copy.experience.eyebrow" :title="copy.experience.title" :text="copy.experience.text" inverted />
        <ul class="mt-9 space-y-4">
          <li v-for="item in copy.experience.features" :key="item" class="flex gap-3 text-sm text-neutral-300">
            <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-neutral-950"><Check :size="12" aria-hidden="true" /></span>
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="relative" data-reveal>
        <div class="absolute -inset-10 rounded-full bg-white/5 blur-3xl" />
        <div class="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white text-neutral-950 shadow-2xl">
          <div class="flex items-center justify-between border-b border-neutral-200 p-5 sm:p-7">
            <div class="flex items-center gap-3"><Fingerprint :size="24" aria-hidden="true" /><span class="font-semibold">{{ copy.experience.passport }}</span></div>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700"><ShieldCheck :size="13" aria-hidden="true" />{{ copy.experience.verified }}</span>
          </div>
          <div class="p-5 sm:p-7">
            <div class="flex items-center gap-4">
              <div class="flex size-14 items-center justify-center rounded-2xl bg-neutral-950 font-bold text-white">AM</div>
              <div><h3 class="text-xl font-semibold">{{ copy.experience.holder }}</h3><p class="mt-1 text-sm text-neutral-500">{{ copy.experience.role }}</p></div>
            </div>
            <dl class="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
              <div v-for="metric in copy.experience.metrics" :key="metric.label" class="bg-white p-4 last:col-span-2 sm:last:col-span-1">
                <dt class="text-[11px] leading-4 text-neutral-500">{{ metric.label }}</dt>
                <dd class="mt-2 text-xl font-semibold tracking-tight">{{ metric.value }}</dd>
              </div>
            </dl>
            <div class="mt-5 rounded-2xl bg-neutral-100 p-5">
              <div class="flex items-center justify-between"><span class="text-xs font-bold uppercase tracking-wide text-neutral-500">{{ copy.experience.evidence }}</span><ExternalLink :size="15" aria-hidden="true" /></div>
              <p class="mt-3 text-sm font-medium leading-6">{{ copy.experience.evidenceText }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
