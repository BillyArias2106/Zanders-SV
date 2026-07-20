'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type TemplateProps = {
  children: ReactNode
}

export default function Template({ children }: TemplateProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  )
}
