'use client'

import Lenis from 'lenis'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

import { gsap, ScrollTrigger } from '@/lib/gsap-setup'

type SmoothScrollProviderProps = {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    let cleanupLenis = () => undefined

    const stopLenis = () => {
      cleanupLenis()
      cleanupLenis = () => undefined
    }

    const startLenis = () => {
      if (reducedMotionQuery.matches) {
        return
      }

      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      })
      const update = (time: number) => {
        lenis.raf(time * 1000)
      }

      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(update)
      gsap.ticker.lagSmoothing(0)

      cleanupLenis = () => {
        lenis.off('scroll', ScrollTrigger.update)
        gsap.ticker.remove(update)
        lenis.destroy()
      }
    }

    const syncMotionPreference = () => {
      stopLenis()
      startLenis()
    }

    syncMotionPreference()
    reducedMotionQuery.addEventListener('change', syncMotionPreference)

    return () => {
      reducedMotionQuery.removeEventListener('change', syncMotionPreference)
      stopLenis()
    }
  }, [])

  return <>{children}</>
}
