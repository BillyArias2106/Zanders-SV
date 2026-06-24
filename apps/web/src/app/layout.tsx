import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { ProgressiveLoader } from '@/components/molecules/progressive-loader'
import { SmoothScrollProvider } from '@/components/organisms/smooth-scroll-provider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Zanders SV | Aero Solutions',
  description: 'Plataforma digital futurista para Zanders SV y Zanders Aero Solutions.',
  metadataBase: new URL('http://localhost:3000')
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Rajdhani:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-deep-950 text-silver-50 antialiased">
        <SmoothScrollProvider>
          <ProgressiveLoader />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
