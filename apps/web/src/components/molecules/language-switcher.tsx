'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  localeLabels,
  locales,
  type Locale,
  type UITranslations
} from '@/lib/i18n'

type LanguageSwitcherProps = {
  labels: UITranslations['language']
  locale: Locale
}

export function LanguageSwitcher({ labels, locale }: LanguageSwitcherProps) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const updateLocale = async (nextLocale: Locale) => {
    if (nextLocale === locale || isPending) {
      return
    }

    setIsPending(true)

    try {
      await fetch('/api/language', {
        body: JSON.stringify({
          locale: nextLocale
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      router.refresh()
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div
      aria-label={labels.aria}
      className="flex h-10 shrink-0 items-center border border-cyan-200/30 bg-cyan-200/10 p-1"
      role="group"
    >
      {locales.map((item) => (
        <button
          aria-label={labels.switchTo.replace(
            '{{language}}',
            localeLabels[item]
          )}
          aria-pressed={item === locale}
          className={`h-8 min-w-9 px-2 font-heading text-xs font-bold uppercase transition ${
            item === locale
              ? 'bg-cyan-200 text-deep-950'
              : 'text-cyan-100 hover:bg-white/10 hover:text-cyan-200'
          }`}
          disabled={isPending}
          key={item}
          onClick={() => updateLocale(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  )
}
