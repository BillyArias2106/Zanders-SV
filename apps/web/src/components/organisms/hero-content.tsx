'use client'

import { ArrowUpRight, Plane, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Badge, Button } from '@zanders/ui'

import { gsap } from '@/lib/gsap-setup'
import type { PageContent } from '@/lib/cms'

type HeroContentProps = {
  content: PageContent
}

export function HeroContent({ content }: HeroContentProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) {
      return
    }

    const context = gsap.context(() => {
      gsap.from('[data-hero-stagger]', {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out'
      })
    }, rootRef)

    return () => context.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className="relative z-20 mx-auto flex min-h-[92svh] w-full max-w-7xl items-center px-5 pb-12 pt-28 sm:px-8"
    >
      <div className="max-w-3xl">
        <div data-hero-stagger className="flex flex-wrap items-center gap-3">
          <Badge icon={<Sparkles size={14} aria-hidden="true" />}>
            Soluciones aéreas inteligentes
          </Badge>
          <span className="hidden h-px w-24 bg-cyan-200/55 sm:block" />
        </div>
        <h1
          id="hero-title"
          data-hero-stagger
          className="mt-7 max-w-3xl font-heading text-5xl font-bold uppercase leading-[0.92] tracking-[0] text-silver-50 sm:text-7xl lg:text-8xl"
        >
          {content.heroTitle}
        </h1>
        <p
          data-hero-stagger
          className="mt-7 max-w-2xl text-base leading-8 text-silver-200 sm:text-lg"
        >
          {content.heroSubtitle}
        </p>
        <div data-hero-stagger className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button icon={<ArrowUpRight size={18} aria-hidden="true" />}>
            Ver servicios
          </Button>
          <Button variant="secondary" icon={<Plane size={18} aria-hidden="true" />}>
            Aero Solutions
          </Button>
        </div>
        <div
          data-hero-stagger
          className="mt-8 grid max-w-xl grid-cols-3 border-y border-cyan-200/20 py-4 font-heading text-xs uppercase text-silver-300 sm:text-sm"
          aria-label="Pilares de servicio"
        >
          <span>Tecnologia</span>
          <span className="border-x border-cyan-200/20 text-center">Precisión</span>
          <span className="text-right">Seguridad</span>
        </div>
      </div>
    </div>
  )
}
