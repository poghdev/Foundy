<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Languages, Menu, X } from 'lucide-vue-next'
import LogoMark from '../ui/LogoMark.vue'
import { localeLabels, localeNames, type Locale } from '../../data/locales'
import { useLocale } from '../../composables/useLocale'

const { locale, copy, setLocale } = useLocale()
const isOpen = ref(false)

const navItems = () => [
  { label: copy.value.nav.problem, href: '#problem' },
  { label: copy.value.nav.how, href: '#how-it-works' },
  { label: copy.value.nav.audience, href: '#for-whom' },
  { label: copy.value.nav.safety, href: '#safety' },
  { label: copy.value.nav.join, href: '#join' },
]

const closeMenu = () => { isOpen.value = false }
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu()
}

watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl">
    <div class="container-shell flex h-18 items-center justify-between gap-4">
      <a href="#top" aria-label="Foundy home" @click="closeMenu"><LogoMark /></a>

      <nav class="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
        <a v-for="item in navItems()" :key="item.href" :href="item.href" class="text-sm font-medium text-neutral-600 transition hover:text-neutral-950">
          {{ item.label }}
        </a>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <div class="flex items-center rounded-full border border-neutral-200 p-1" aria-label="Language">
          <button
            v-for="itemLocale in (Object.keys(localeLabels) as Locale[])"
            :key="itemLocale"
            type="button"
            class="rounded-full px-2.5 py-1.5 text-[11px] font-bold transition"
            :class="locale === itemLocale ? 'bg-neutral-950 text-white' : 'text-neutral-500 hover:text-neutral-950'"
            :aria-label="localeNames[itemLocale]"
            :aria-pressed="locale === itemLocale"
            @click="setLocale(itemLocale)"
          >
            {{ localeLabels[itemLocale] }}
          </button>
        </div>
        <a href="#join" class="rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800">{{ copy.headerCta }}</a>
      </div>

      <button
        type="button"
        class="flex size-11 items-center justify-center rounded-full border border-neutral-200 lg:hidden"
        :aria-label="isOpen ? copy.menu.close : copy.menu.open"
        :aria-expanded="isOpen"
        aria-controls="mobile-menu"
        @click="isOpen = !isOpen"
      >
        <X v-if="isOpen" :size="20" aria-hidden="true" />
        <Menu v-else :size="20" aria-hidden="true" />
      </button>
    </div>

    <div v-if="isOpen" id="mobile-menu" class="fixed inset-x-0 top-18 h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-neutral-200 bg-white px-4 py-6 lg:hidden">
      <nav class="container-shell flex flex-col" aria-label="Mobile navigation">
        <a v-for="item in navItems()" :key="item.href" :href="item.href" class="border-b border-neutral-200 py-4 text-xl font-medium" @click="closeMenu">
          {{ item.label }}
        </a>
        <div class="mt-8 flex items-center gap-3">
          <Languages :size="18" aria-hidden="true" />
          <button
            v-for="itemLocale in (Object.keys(localeLabels) as Locale[])"
            :key="itemLocale"
            type="button"
            class="rounded-full border px-3 py-2 text-xs font-bold"
            :class="locale === itemLocale ? 'border-neutral-950 bg-neutral-950 text-white' : 'border-neutral-200'"
            :aria-label="localeNames[itemLocale]"
            :aria-pressed="locale === itemLocale"
            @click="setLocale(itemLocale)"
          >{{ localeLabels[itemLocale] }}</button>
        </div>
        <a href="#join" class="mt-8 rounded-full bg-neutral-950 px-5 py-4 text-center font-semibold text-white" @click="closeMenu">{{ copy.headerCta }}</a>
      </nav>
    </div>
  </header>
</template>
