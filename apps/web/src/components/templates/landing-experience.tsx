import {
  Instagram,
  Phone,
  Sparkles
} from 'lucide-react'

import { AeroScene } from '@/components/organisms/aero-scene'
import { BusinessUnitsShowcase } from '@/components/organisms/business-units-showcase'
import { HeroContent } from '@/components/organisms/hero-content'
import { HeroNavigation } from '@/components/organisms/hero-navigation'
import type { PageContent } from '@/lib/cms'

type LandingExperienceProps = {
  content: PageContent
}

const fallbackHeroImage = '/brand/aero-hero-operations.jpeg'

const heroMetrics = [
  ['Impresión 3D', 'Prototipos y piezas personalizadas'],
  ['Resina y láser', 'Detalle fino, corte y marcaje profesional'],
  ['Sublimación', 'Termos y productos de marca'],
  ['Drones / UAV', 'Venta, creación, video y limpieza aérea']
]

export function LandingExperience({ content }: LandingExperienceProps) {
  const videoUrl =
    content.videoBackground?.mimeType?.startsWith('video/') && content.videoBackground.url
      ? content.videoBackground.url
      : null

  return (
    <main className="min-h-screen overflow-hidden bg-deep-950 text-silver-50">
      <section className="relative min-h-[92svh] overflow-hidden" aria-labelledby="hero-title">
        {videoUrl ? (
          <video
            className="absolute inset-0 z-0 h-full w-full object-cover opacity-[0.42]"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.34] saturate-[1.12]"
            style={{ backgroundImage: `url(${fallbackHeroImage})` }}
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(2,8,12,0.98)_0%,rgba(2,8,12,0.84)_45%,rgba(2,8,12,0.44)_100%)]" />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(2,8,12,0.18)_0%,rgba(2,8,12,0.2)_50%,rgba(2,8,12,0.98)_100%)]" />
        <div className="absolute right-[-10vw] top-0 z-10 hidden h-full w-[42vw] bg-cyan-600/18 zanders-diagonal-reverse lg:block" />
        <div className="absolute inset-x-0 top-0 z-10 h-px animate-pulseGlow bg-cyan-200/75" />
        <div
          className="absolute right-[-12vmin] top-[18%] z-10 hidden aspect-square w-[58vmin] min-w-[520px] rounded-full border border-cyan-200/15 lg:block"
          aria-hidden="true"
        >
          <div className="absolute inset-[14%] rounded-full border border-cyan-200/20" />
          <div className="absolute inset-[30%] rounded-full border border-silver-50/10" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-200/35 to-transparent" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />
        </div>
        <div
          className="zanders-hud-frame absolute bottom-28 right-8 z-20 hidden w-72 border-l border-cyan-200/45 bg-deep-950/45 px-5 py-4 font-heading text-xs uppercase text-silver-300 backdrop-blur-md xl:block"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between text-cyan-200">
            <span>ZANDERS OS</span>
            <span>LIVE</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-[11px]">
            <span>FAB ON</span>
            <span>UAV ON</span>
            <span>MEDIA</span>
          </div>
        </div>
        <AeroScene />
        <HeroNavigation links={content.navbarLinks} />
        <HeroContent content={content} />
      </section>

      <section
        className="relative z-20 border-y border-cyan-200/15 bg-deep-900/95 py-7"
        id="zanders-sv"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {heroMetrics.map(([label, value]) => (
            <div key={label} className="border-l border-cyan-200/40 pl-5">
              <p className="font-heading text-sm font-bold uppercase text-cyan-200">{label}</p>
              <p className="mt-2 text-sm leading-6 text-silver-300">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <BusinessUnitsShowcase />

      <section className="relative z-20 bg-deep-950 py-20" id="aero-solutions">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <p className="font-heading text-sm font-bold uppercase text-cyan-200">
                Identidad visual
              </p>
              <h2 className="mt-4 font-heading text-4xl font-bold uppercase leading-none text-silver-50 sm:text-5xl">
                Negro profundo, plata y cian técnico.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-silver-300">
                La identidad une manufactura, personalización, drones y producción visual bajo una
                misma estética tecnológica.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['#d8d9dd', '#1a6b80', '#298ea5', '#45acbf', '#76c2d0', '#8de1e8'].map(
                (color) => (
                  <div key={color}>
                    <span className="block h-14 border border-white/10" style={{ background: color }} />
                    <span className="mt-2 block font-heading text-xs uppercase text-silver-500">
                      {color}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <figure className="relative min-h-[420px] overflow-hidden border border-cyan-200/18 bg-deep-900 shadow-panel">
              <img
                src="/brand/aerial-services-poster.jpeg"
                alt="Pieza gráfica de Zanders con servicios aéreos inteligentes"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </figure>
            <div className="zanders-hud-frame flex min-h-[420px] flex-col justify-end border border-cyan-200/16 bg-white/[0.035] p-6">
              <Sparkles aria-hidden="true" className="text-cyan-200" size={30} strokeWidth={1.7} />
              <p className="mt-8 font-heading text-3xl font-bold uppercase leading-tight text-silver-50">
                Somos y seremos tu mejor decisión.
              </p>
              <p className="mt-5 text-sm leading-7 text-silver-300">
                Adaptamos el lenguaje del brandbook a una interfaz moderna, administrable y lista
                para crecer con nuevos servicios desde el CMS.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 border-t border-cyan-200/15 bg-deep-900 py-12" id="contacto">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-sm font-bold uppercase text-cyan-200">Contacto</p>
            <p className="mt-2 max-w-2xl text-lg text-silver-100">
              Innovación que se ve, resultados que se notan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-heading text-lg font-bold uppercase text-silver-50">
            <a href="tel:+50379347603" className="inline-flex items-center gap-3 hover:text-cyan-200">
              <Phone aria-hidden="true" size={22} strokeWidth={1.7} />
              +503 79347603
            </a>
            <span className="inline-flex items-center gap-3 text-silver-200">
              <Instagram aria-hidden="true" size={22} strokeWidth={1.7} />
              Zanders SV
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
