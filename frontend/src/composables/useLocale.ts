import { computed, ref } from 'vue'
import { content, type Locale } from '../data/locales'

const STORAGE_KEY = 'foundy-locale'
const savedLocale = localStorage.getItem(STORAGE_KEY)
const initialLocale: Locale = savedLocale === 'hy' || savedLocale === 'ru' ? savedLocale : 'en'
const locale = ref<Locale>(initialLocale)

document.documentElement.lang = initialLocale

export const useLocale = () => {
  const copy = computed(() => content[locale.value])

  const setLocale = (nextLocale: Locale) => {
    locale.value = nextLocale
    localStorage.setItem(STORAGE_KEY, nextLocale)
    document.documentElement.lang = nextLocale
  }

  return { locale, copy, setLocale }
}
