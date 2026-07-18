import { onBeforeUnmount, onMounted } from 'vue'

export const useReveal = () => {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    document.documentElement.classList.add('motion-ready')
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        })
      },
      { threshold: 0.12 },
    )

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => observer?.observe(element))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    document.documentElement.classList.remove('motion-ready')
  })
}
