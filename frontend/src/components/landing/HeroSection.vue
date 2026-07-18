<script setup lang="ts">
import { ArrowRight, Check, Code2, ShieldCheck } from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'
import LogoMark from '../ui/LogoMark.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
</script>

<template>
  <section id="top" class="relative overflow-hidden border-b border-neutral-200 bg-white pb-20 pt-14 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24">
    <div class="pointer-events-none absolute left-1/2 top-0 -z-0 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-neutral-100/80 blur-3xl" />
    <div class="container-shell relative z-10 grid items-center gap-16 lg:grid-cols-[1.02fr_.98fr]">
      <div data-reveal>
        <div class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 shadow-sm">
          <span class="size-1.5 rounded-full bg-emerald-500" />
          {{ copy.hero.badge }}
        </div>
        <h1 class="mt-7 max-w-3xl text-balance text-[clamp(3.35rem,7vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-neutral-950">
          {{ copy.hero.title }}
        </h1>
        <p class="mt-7 max-w-xl text-lg leading-8 text-neutral-600 sm:text-xl">{{ copy.hero.subtitle }}</p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <BaseButton href="#join">{{ copy.hero.primary }} <ArrowRight :size="17" aria-hidden="true" /></BaseButton>
          <BaseButton href="#how-it-works" variant="outline">{{ copy.hero.secondary }}</BaseButton>
        </div>
        <p class="mt-5 text-sm font-medium text-neutral-500">{{ copy.hero.origin }}</p>
        <div class="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-neutral-200 pt-6">
          <span v-for="item in copy.hero.trust" :key="item" class="inline-flex items-center gap-2 text-sm text-neutral-600">
            <Check :size="15" class="text-neutral-950" aria-hidden="true" />{{ item }}
          </span>
        </div>
      </div>

      <div class="hero-float relative mx-auto w-full max-w-xl" data-reveal>
        <div class="absolute -inset-5 -z-10 rotate-3 rounded-[2rem] border border-neutral-200 bg-neutral-100" />
        <div class="overflow-hidden rounded-[1.75rem] border border-neutral-300 bg-white shadow-[0_30px_90px_rgba(10,10,10,.14)]">
          <div class="flex items-center justify-between border-b border-neutral-200 px-5 py-4 sm:px-7">
            <LogoMark compact />
            <span class="rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-600">{{ copy.hero.passport }}</span>
          </div>
          <div class="p-5 sm:p-7">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="flex size-14 items-center justify-center rounded-full bg-neutral-950 text-sm font-bold text-white sm:size-16">AM</div>
                <div>
                  <h2 class="text-xl font-semibold">{{ copy.hero.profile }}</h2>
                  <p class="mt-1 text-sm text-neutral-500">{{ copy.hero.developer }}</p>
                </div>
              </div>
              <ShieldCheck :size="22" aria-hidden="true" />
            </div>

            <div class="mt-7 grid grid-cols-3 divide-x divide-neutral-200 rounded-2xl border border-neutral-200 bg-neutral-50 py-4 text-center">
              <div><strong class="block text-xl">3</strong><span class="mt-1 block px-1 text-[10px] leading-tight text-neutral-500">{{ copy.hero.activeProjects }}</span></div>
              <div><strong class="block text-xl">18</strong><span class="mt-1 block px-1 text-[10px] leading-tight text-neutral-500">{{ copy.hero.completedTasks }}</span></div>
              <div><strong class="block text-xl">7</strong><span class="mt-1 block px-1 text-[10px] leading-tight text-neutral-500">{{ copy.hero.mentorReviews }}</span></div>
            </div>

            <div class="mt-7">
              <div class="flex items-center justify-between text-xs font-semibold"><span>{{ copy.hero.profileComplete }}</span><span>82%</span></div>
              <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200"><div class="h-full w-[82%] rounded-full bg-neutral-950" /></div>
            </div>

            <div class="mt-7">
              <p class="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-500">{{ copy.hero.verifiedSkills }}</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="skill in ['Python', 'Django', 'PostgreSQL']" :key="skill" class="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium">{{ skill }}</span>
              </div>
            </div>

            <div class="mt-7 rounded-2xl bg-neutral-950 p-5 text-white">
              <div class="flex items-center gap-2 text-xs text-neutral-400"><Code2 :size="15" aria-hidden="true" />{{ copy.hero.latest }}</div>
              <p class="mt-3 text-sm font-medium leading-6">{{ copy.hero.contribution }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
