'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ProgressiveLoader() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let frame = 0
    const startedAt = performance.now()
    const duration = 920

    const tick = (timestamp: number) => {
      const elapsed = timestamp - startedAt
      const nextValue = Math.min(Math.round((elapsed / duration) * 100), 100)

      setProgress(nextValue)

      if (nextValue < 100) {
        frame = window.requestAnimationFrame(tick)
      }
    }

    frame = window.requestAnimationFrame(tick)
    const hideTimer = window.setTimeout(() => setVisible(false), duration + 320)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="zanders-hud-frame min-w-72 max-w-sm px-6 py-5">
            <div className="mb-4 flex items-center justify-between font-heading text-xs uppercase text-silver-300">
              <span>ZANDERS AERO</span>
              <span>{progress}%</span>
            </div>
            <div className="h-px overflow-hidden bg-silver-500/20">
              <motion.div
                className="h-full bg-cyan-200 shadow-cyan"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              />
            </div>
            <p className="mt-4 text-xs uppercase text-cyan-200">Soluciones aéreas inteligentes</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
