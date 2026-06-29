'use client'

import {
  Box,
  Camera,
  Cpu,
  Factory,
  Film,
  Layers3,
  PackageCheck,
  Plane,
  Printer,
  ScanLine,
  Sparkles,
  Target,
  Video,
  Zap
} from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

import { gsap } from '@/lib/gsap-setup'

const printingServices = [
  {
    title: 'Impresión 3D',
    detail: 'Prototipos, piezas funcionales y producción personalizada.',
    icon: <Box aria-hidden="true" size={24} strokeWidth={1.7} />
  },
  {
    title: 'Impresión en resina',
    detail: 'Acabados de alta definición para detalle fino y presentación premium.',
    icon: <Layers3 aria-hidden="true" size={24} strokeWidth={1.7} />
  },
  {
    title: 'Impresión láser',
    detail: 'Corte, grabado y marcaje con precisión sobre piezas y materiales.',
    icon: <ScanLine aria-hidden="true" size={24} strokeWidth={1.7} />
  },
  {
    title: 'Sublimación en termos',
    detail: 'Personalización durable para marcas, campañas y regalos corporativos.',
    icon: <PackageCheck aria-hidden="true" size={24} strokeWidth={1.7} />
  }
]

const aeroServices = [
  {
    title: 'Creación de drones',
    detail: 'Diseño, armado y configuración para misiones específicas.',
    icon: <Cpu aria-hidden="true" size={24} strokeWidth={1.7} />
  },
  {
    title: 'Venta de drones',
    detail: 'Equipos listos para operación, soporte y crecimiento técnico.',
    icon: <Plane aria-hidden="true" size={24} strokeWidth={1.7} />
  },
  {
    title: 'Video profesional',
    detail: 'Producción aérea con drones estándar, FPV y racing.',
    icon: <Video aria-hidden="true" size={24} strokeWidth={1.7} />
  },
  {
    title: 'Limpieza aérea UAV',
    detail: 'Aplicaciones industriales en altura con menor riesgo operativo.',
    icon: <Target aria-hidden="true" size={24} strokeWidth={1.7} />
  }
]

function ServiceCard({
  detail,
  icon,
  title
}: {
  detail: string
  icon: ReactNode
  title: string
}) {
  return (
    <article
      className="group border border-cyan-200/14 bg-white/[0.035] p-4 transition hover:border-cyan-200/55"
      data-unit-reveal
    >
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center border border-cyan-200/40 bg-cyan-200/10 text-cyan-200 transition group-hover:bg-cyan-200 group-hover:text-deep-950">
          {icon}
        </span>
        <div>
          <h3 className="font-heading text-xl font-bold uppercase text-silver-50">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-silver-300">{detail}</p>
        </div>
      </div>
    </article>
  )
}

function FabricationLabScene() {
  return (
    <div
      className="relative min-h-[480px] overflow-hidden border border-cyan-200/18 bg-deep-900/70 p-5 shadow-panel"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(141,225,232,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(141,225,232,0.04)_1px,transparent_1px)] bg-[length:44px_44px]" />
      <div className="absolute right-[-24%] top-[-12%] h-72 w-72 rounded-full border border-cyan-200/12" />
      <div className="relative z-10 grid min-h-[438px] gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden border border-cyan-200/18 bg-deep-950/70 p-5">
          <div className="flex items-center justify-between font-heading text-xs uppercase text-cyan-200">
            <span>ZSV-FAB/03</span>
            <span>print active</span>
          </div>
          <div className="relative mx-auto mt-10 h-72 max-w-[430px]">
            <div className="absolute inset-x-6 top-2 h-4 border border-cyan-200/45 bg-cyan-200/10" />
            <div className="absolute left-8 top-6 h-56 w-4 border border-cyan-200/35 bg-deep-900" />
            <div className="absolute right-8 top-6 h-56 w-4 border border-cyan-200/35 bg-deep-900" />
            <div className="absolute inset-x-10 bottom-6 h-4 border border-cyan-200/35 bg-deep-900" />
            <div
              className="absolute left-[18%] top-16 h-12 w-20 border border-cyan-200/70 bg-cyan-200/15 shadow-cyan"
              data-printer-head
            >
              <div className="absolute left-1/2 top-full h-9 w-px -translate-x-1/2 bg-cyan-200" />
              <div className="absolute left-1/2 top-[calc(100%+2rem)] h-3 w-5 -translate-x-1/2 bg-cyan-200" />
            </div>
            <div className="absolute bottom-16 left-1/2 h-20 w-36 -translate-x-1/2" data-printer-bed>
              {[0, 1, 2, 3, 4].map((layer) => (
                <div
                  key={layer}
                  className="absolute left-0 right-0 h-2 origin-left scale-x-0 bg-cyan-200/80"
                  data-print-layer
                  style={{ bottom: `${layer * 12}px` }}
                />
              ))}
              <div className="absolute bottom-0 left-1/2 h-16 w-20 -translate-x-1/2 rounded-t-[48px] border border-cyan-200/60 bg-cyan-200/12" />
            </div>
          </div>
        </div>
        <div className="grid gap-5">
          <div className="relative min-h-48 overflow-hidden border border-cyan-200/18 bg-deep-950/65 p-5">
            <div className="flex items-center justify-between font-heading text-xs uppercase text-cyan-200">
              <span>Laser precision</span>
              <Zap aria-hidden="true" size={17} />
            </div>
            <div className="relative mt-8 h-28 border border-silver-50/12 bg-silver-50/5">
              <div className="absolute left-6 right-6 top-1/2 h-px bg-cyan-200/30" />
              <div
                className="absolute top-4 h-20 w-px bg-cyan-200 shadow-cyan"
                data-laser-beam
              />
              <div className="absolute bottom-5 left-10 h-12 w-40 border border-cyan-200/45 bg-cyan-200/10 zanders-diagonal" />
            </div>
          </div>
          <div className="relative min-h-48 overflow-hidden border border-cyan-200/18 bg-deep-950/65 p-5">
            <div className="flex items-center justify-between font-heading text-xs uppercase text-cyan-200">
              <span>Sublimation wrap</span>
              <Printer aria-hidden="true" size={17} />
            </div>
            <div className="relative mx-auto mt-7 h-28 w-48">
              <div className="absolute inset-y-3 left-10 right-10 rounded-full border border-cyan-200/55 bg-[linear-gradient(90deg,rgba(141,225,232,0.15),rgba(255,255,255,0.08),rgba(141,225,232,0.22))]" />
              <div className="absolute inset-y-2 left-7 w-9 rounded-full border border-cyan-200/40 bg-deep-900" />
              <div className="absolute inset-y-2 right-7 w-9 rounded-full border border-cyan-200/40 bg-deep-900" />
              <div className="absolute left-1/2 top-1/2 h-10 w-16 -translate-x-1/2 -translate-y-1/2 border border-cyan-200/55 text-center font-heading text-xs uppercase leading-10 text-cyan-200">
                ZSV
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AeroMissionScene() {
  return (
    <div
      className="relative min-h-[480px] overflow-hidden border border-cyan-200/18 bg-deep-900/70 p-5 shadow-panel"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(141,225,232,0.16),transparent_30%),linear-gradient(rgba(141,225,232,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(141,225,232,0.04)_1px,transparent_1px)] bg-[length:auto,48px_48px,48px_48px]" />
      <div className="relative z-10 min-h-[438px]">
        <div className="flex items-center justify-between font-heading text-xs uppercase text-cyan-200">
          <span>ZAERO-MISSION/FPV</span>
          <span>flight stack ready</span>
        </div>
        <div className="absolute left-6 top-20 h-64 w-64 rounded-full border border-cyan-200/18 md:left-12 md:h-80 md:w-80">
          <div className="absolute inset-10 rounded-full border border-cyan-200/16" />
          <div className="absolute inset-24 rounded-full border border-silver-50/10" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-200/35 to-transparent" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />
        </div>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 720 440"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M80 320 C180 170 272 382 382 184 C466 34 570 88 642 54"
            stroke="rgba(141,225,232,0.45)"
            strokeWidth="2"
            strokeDasharray="8 14"
            data-flight-path
          />
        </svg>
        <div className="absolute left-[58%] top-[28%] h-28 w-52 -translate-x-1/2" data-mini-drone>
          <div className="absolute left-1/2 top-1/2 h-6 w-24 -translate-x-1/2 -translate-y-1/2 border border-cyan-200/65 bg-cyan-200/12" />
          <div className="absolute left-2 top-1/2 h-px w-48 -translate-y-1/2 bg-cyan-200/55" />
          <div className="absolute left-1/2 top-2 h-24 w-px -translate-x-1/2 bg-cyan-200/45" />
          {[
            'left-0 top-0',
            'right-0 top-0',
            'bottom-0 left-0',
            'bottom-0 right-0'
          ].map((positionClass) => (
            <div
              key={positionClass}
              className={`absolute h-14 w-14 rounded-full border border-cyan-200/50 ${positionClass}`}
            >
              <div className="absolute left-1/2 top-1/2 h-px w-12 -translate-x-1/2 -translate-y-1/2 bg-cyan-200/70" />
              <div className="absolute left-1/2 top-1/2 h-12 w-px -translate-x-1/2 -translate-y-1/2 bg-cyan-200/70" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 grid gap-3 md:grid-cols-3">
          {[
            ['FPV / Racing', 'cinemática de alta velocidad'],
            ['Video aéreo', 'planos estables y producción visual'],
            ['UAV industrial', 'limpieza y operación en altura']
          ].map(([title, detail]) => (
            <div key={title} className="border border-cyan-200/16 bg-deep-950/70 p-4">
              <p className="font-heading text-sm font-bold uppercase text-cyan-200">{title}</p>
              <p className="mt-2 text-xs leading-5 text-silver-300">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BusinessUnitsShowcase() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) {
      return
    }

    const context = gsap.context(() => {
      gsap.from('[data-unit-reveal]', {
        y: 30,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 72%'
        }
      })

      gsap.to('[data-printer-head]', {
        x: 190,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('[data-printer-bed]', {
        y: -14,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('[data-print-layer]', {
        scaleX: 1,
        duration: 0.7,
        stagger: 0.18,
        repeat: -1,
        repeatDelay: 0.7,
        ease: 'power2.out'
      })

      gsap.to('[data-laser-beam]', {
        x: 240,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })

      gsap.to('[data-mini-drone]', {
        x: 34,
        y: -20,
        rotation: 4,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('[data-flight-path]', {
        strokeDashoffset: -120,
        duration: 5.5,
        repeat: -1,
        ease: 'none'
      })
    }, rootRef)

    return () => context.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative z-20 bg-deep-950 py-20" id="servicios">
      <div className="absolute inset-y-0 right-0 hidden w-[40vw] bg-cyan-700/16 zanders-diagonal-reverse lg:block" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-4xl" data-unit-reveal>
          <p className="font-heading text-sm font-bold uppercase text-cyan-200">Rubros Zanders</p>
          <h2 className="mt-4 font-heading text-4xl font-bold uppercase leading-none text-silver-50 sm:text-6xl">
            Fabricación personalizada y tecnología aérea en una sola plataforma.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-silver-300">
            Zanders SV concentra impresión, corte y personalización. Zanders Aero Solutions lleva
            esa misma precisión al diseño, operación, venta y producción profesional con drones.
          </p>
        </div>

        <div className="mt-14 grid gap-8" id="impresiones">
          <div className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
            <div data-unit-reveal>
              <div className="inline-flex items-center gap-2 border border-cyan-200/35 bg-cyan-200/10 px-3 py-2 font-heading text-xs font-bold uppercase text-cyan-200">
                <Factory aria-hidden="true" size={15} />
                Zanders SV
              </div>
              <h3 className="mt-5 font-heading text-3xl font-bold uppercase leading-none text-silver-50 sm:text-5xl">
                Impresión 3D, resina, láser y sublimación.
              </h3>
              <p className="mt-5 text-base leading-8 text-silver-300">
                Un laboratorio visual para transformar ideas en piezas físicas: prototipos,
                productos personalizados, marcaje profesional y producción para marcas.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {printingServices.map((service) => (
                  <ServiceCard key={service.title} {...service} />
                ))}
              </div>
            </div>
            <FabricationLabScene />
          </div>
        </div>

        <div className="mt-20 grid gap-8" id="drones">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <AeroMissionScene />
            <div data-unit-reveal>
              <div className="inline-flex items-center gap-2 border border-cyan-200/35 bg-cyan-200/10 px-3 py-2 font-heading text-xs font-bold uppercase text-cyan-200">
                <Sparkles aria-hidden="true" size={15} />
                Zanders Aero Solutions
              </div>
              <h3 className="mt-5 font-heading text-3xl font-bold uppercase leading-none text-silver-50 sm:text-5xl">
                Drones para crear, vender, grabar y operar.
              </h3>
              <p className="mt-5 text-base leading-8 text-silver-300">
                Desde builds personalizados y venta de equipos hasta video profesional, FPV racing
                y limpieza aérea con UAV para operaciones industriales.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {aeroServices.map((service) => (
                  <ServiceCard key={service.title} {...service} />
                ))}
              </div>
              <div className="mt-7 grid gap-4 border-y border-cyan-200/18 py-5 font-heading text-sm uppercase text-silver-300 sm:grid-cols-3">
                <span className="inline-flex items-center gap-2">
                  <Camera aria-hidden="true" size={16} className="text-cyan-200" />
                  Cine aéreo
                </span>
                <span className="inline-flex items-center gap-2">
                  <Film aria-hidden="true" size={16} className="text-cyan-200" />
                  FPV / Racing
                </span>
                <span className="inline-flex items-center gap-2">
                  <Zap aria-hidden="true" size={16} className="text-cyan-200" />
                  UAV industrial
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
