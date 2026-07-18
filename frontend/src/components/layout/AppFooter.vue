<script setup lang="ts">
import LogoMark from '../ui/LogoMark.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
</script>

<template>
  <footer class="border-t border-neutral-800 bg-neutral-950 py-12 text-white">
    <div class="container-shell">
      <div class="flex flex-col justify-between gap-10 border-b border-neutral-800 pb-10 md:flex-row">
        <div>
          <LogoMark inverted />
          <p class="mt-5 max-w-sm text-neutral-400">{{ copy.footer.tagline }}</p>
        </div>
        <nav class="flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-400" aria-label="Footer navigation">
          <a href="#problem" class="hover:text-white">{{ copy.nav.problem }}</a>
          <a href="#how-it-works" class="hover:text-white">{{ copy.nav.how }}</a>
          <a href="#safety" class="hover:text-white">{{ copy.nav.safety }}</a>
          <a href="#join" class="hover:text-white">{{ copy.nav.join }}</a>
          <a href="#" class="hover:text-white">{{ copy.footer.privacy }}</a>
          <a href="#" class="hover:text-white">{{ copy.footer.terms }}</a>
        </nav>
      </div>
      <div class="flex flex-col justify-between gap-3 pt-8 text-sm text-neutral-500 sm:flex-row">
        <p>{{ copy.footer.copyright }}</p>
        <p>{{ copy.footer.origin }}</p>
      </div>
    </div>
  </footer>
</template>
