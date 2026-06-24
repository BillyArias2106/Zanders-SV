import type { ServerFunctionClient } from 'payload'
import type { ReactNode } from 'react'

import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type LayoutProps = {
  children: ReactNode
}

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'

  return handleServerFunctions({
    ...args,
    config,
    importMap
  })
}

export default function Layout({ children }: LayoutProps) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
      htmlProps={{ suppressHydrationWarning: true }}
    >
      {children}
    </RootLayout>
  )
}
