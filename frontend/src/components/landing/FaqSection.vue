<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'

const { copy } = useLocale()
const openIndex = ref<number | null>(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="section-space bg-neutral-50">
    <div class="container-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
      <SectionHeading :eyebrow="copy.faq.eyebrow" :title="copy.faq.title" data-reveal />
      <div class="border-t border-neutral-300" data-reveal>
        <article v-for="(item, index) in copy.faq.items" :key="item.title" class="border-b border-neutral-300">
          <h3>
            <button
              type="button"
              class="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold"
              :aria-expanded="openIndex === index"
              :aria-controls="`faq-panel-${index}`"
              @click="toggle(index)"
            >
              {{ item.title }}
              <Plus :size="20" class="shrink-0 transition-transform duration-300" :class="openIndex === index ? 'rotate-45' : ''" aria-hidden="true" />
            </button>
          </h3>
          <div
            :id="`faq-panel-${index}`"
            class="grid transition-[grid-template-rows] duration-300"
            :class="openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          >
            <div class="overflow-hidden">
              <p class="max-w-2xl pb-6 pr-10 leading-7 text-neutral-600">{{ item.text }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
