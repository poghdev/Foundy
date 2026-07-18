<script setup lang="ts">
import { CheckCircle2, Info, Send } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'
import { useWaitlist } from '../../composables/useWaitlist'

const { copy } = useLocale()
const { form, status, emailError, submit } = useWaitlist()

const ageValues = ['under_16', '16_17', '18_24', '25_plus', 'prefer_not_to_say'] as const
const roleValues = ['young_specialist', 'founder', 'mentor', 'company_partner', 'parent_educator', 'other'] as const

const statusMessage = (currentStatus: string): string => {
  if (currentStatus === 'success') return 'Շնորհակալություն։ Ձեր հայտը հաջողությամբ պահպանվել է։'
  if (currentStatus === 'duplicate_email') return 'Այս Gmail հասցեն արդեն Foundy-ի առաջին ցանկում է։'
  if (currentStatus === 'rate_limited') return 'Չափազանց շատ փորձեր։ Խնդրում ենք կրկին փորձել ավելի ուշ։'
  if (currentStatus === 'validation_error') return emailError.value || 'Խնդրում ենք ստուգել լրացված տվյալները։'
  return 'Չհաջողվեց պահպանել հայտը։ Փորձեք կրկին մի փոքր ուշ։'
}
</script>

<template>
  <section id="join" class="section-space bg-white">
    <div class="container-shell grid gap-14 lg:grid-cols-[.78fr_1.22fr]">
      <div data-reveal>
        <SectionHeading :eyebrow="copy.waitlist.eyebrow" :title="copy.waitlist.title" :text="copy.waitlist.text" />
        <div class="mt-8 flex items-start gap-3 rounded-2xl bg-neutral-100 p-4 text-sm leading-6 text-neutral-600">
          <Info :size="18" class="mt-0.5 shrink-0" aria-hidden="true" />{{ copy.waitlist.demo }}
        </div>
      </div>

      <form class="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-5 sm:p-8" data-reveal @submit.prevent="submit">
        <div class="grid gap-5 sm:grid-cols-2">
          <label class="block">
            <span class="text-sm font-semibold">{{ copy.waitlist.name }}</span>
            <input v-model.trim="form.fullName" name="fullName" type="text" autocomplete="name" required maxlength="100" class="mt-2.5 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-neutral-950" />
          </label>
          <label class="block">
            <span class="text-sm font-semibold">{{ copy.waitlist.email }}</span>
            <input v-model.trim="form.email" name="email" type="email" autocomplete="email" required maxlength="160" aria-describedby="email-error" :aria-invalid="Boolean(emailError)" class="mt-2.5 w-full rounded-xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:border-neutral-950" :class="emailError ? 'border-red-500' : 'border-neutral-300'" @input="emailError = ''" />
            <span v-if="emailError" id="email-error" class="mt-2 block text-xs leading-5 text-red-700">{{ emailError }}</span>
          </label>
          <label class="block">
            <span class="text-sm font-semibold">{{ copy.waitlist.age }}</span>
            <select v-model="form.ageGroup" name="ageGroup" required class="mt-2.5 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-neutral-950">
              <option value="" disabled>{{ copy.waitlist.choose }}</option>
              <option v-for="(label, index) in copy.waitlist.ageOptions" :key="ageValues[index]" :value="ageValues[index]">{{ label }}</option>
            </select>
          </label>
          <label class="block">
            <span class="text-sm font-semibold">{{ copy.waitlist.role }}</span>
            <select v-model="form.role" name="role" required class="mt-2.5 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-neutral-950">
              <option value="" disabled>{{ copy.waitlist.choose }}</option>
              <option v-for="(label, index) in copy.waitlist.roleOptions" :key="roleValues[index]" :value="roleValues[index]">{{ label }}</option>
            </select>
          </label>
          <label class="block sm:col-span-2">
            <span class="text-sm font-semibold">{{ copy.waitlist.message }} <span class="font-normal text-neutral-400">({{ copy.waitlist.optional }})</span></span>
            <textarea v-model.trim="form.message" name="message" rows="4" maxlength="500" class="mt-2.5 w-full resize-y rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-neutral-950" />
          </label>
        </div>
        <input v-model="form.website" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute -left-[10000px] h-px w-px opacity-0" />
        <label class="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-neutral-600">
          <input v-model="form.consent" name="consent" type="checkbox" required class="mt-1 size-4 shrink-0 accent-neutral-950" />
          <span>{{ copy.waitlist.consent }}</span>
        </label>
        <button type="submit" :disabled="status === 'submitting'" class="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
          {{ status === 'submitting' ? 'Submitting…' : copy.waitlist.submit }} <Send :size="16" aria-hidden="true" />
        </button>
        <p v-if="status !== 'idle' && status !== 'submitting'" class="mt-5 flex items-start gap-2 rounded-xl p-4 text-sm" :class="status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'" role="status" aria-live="polite">
          <CheckCircle2 v-if="status === 'success'" :size="18" class="mt-0.5 shrink-0" aria-hidden="true" />
          <Info v-else :size="18" class="mt-0.5 shrink-0" aria-hidden="true" />
          {{ statusMessage(status) }}
        </p>
      </form>
    </div>
  </section>
</template>
