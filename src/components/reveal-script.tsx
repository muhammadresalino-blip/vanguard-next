'use client'

import { useEffect } from 'react'

/**
 * Reveal animation — CSS-based IntersectionObserver.
 * Menambahkan class .reveal-item ke section, lalu saat terlihat tambah .is-in.
 * Hormati prefers-reduced-motion.
 */
export function RevealScript() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Target all .reveal-item elements that don't have .is-in yet
    const targets = Array.from(document.querySelectorAll('.reveal-item:not(.is-in)'))
    if (!targets.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.05 },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}