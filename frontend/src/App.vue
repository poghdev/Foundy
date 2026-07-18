<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/landing/HeroSection.vue'
import ProblemSection from './components/landing/ProblemSection.vue'
import EcosystemSection from './components/landing/EcosystemSection.vue'
import HowItWorksSection from './components/landing/HowItWorksSection.vue'
import ExperienceSection from './components/landing/ExperienceSection.vue'
import AiEraSection from './components/landing/AiEraSection.vue'
import SafetySection from './components/landing/SafetySection.vue'
import ArmeniaSection from './components/landing/ArmeniaSection.vue'
import PilotSection from './components/landing/PilotSection.vue'
import WaitlistSection from './components/landing/WaitlistSection.vue'
import FaqSection from './components/landing/FaqSection.vue'
import FinalCtaSection from './components/landing/FinalCtaSection.vue'
import { useLocale } from './composables/useLocale'
import { useReveal } from './composables/useReveal'

const { copy } = useLocale()
useReveal()
</script>

<template>
  <a href="#main-content" class="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition focus:translate-y-0">
    {{ copy.skip }}
  </a>
  <AppHeader />
  <main id="main-content">
    <HeroSection />
    <ProblemSection />
    <EcosystemSection />
    <HowItWorksSection />
    <ExperienceSection />
    <AiEraSection />
    <SafetySection />
    <ArmeniaSection />
    <PilotSection />
    <WaitlistSection />
    <FaqSection />
    <FinalCtaSection />
  </main>
  <AppFooter />
</template>
