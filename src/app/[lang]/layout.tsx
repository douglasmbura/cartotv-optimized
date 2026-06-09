'use client'

import { ReactNode, useEffect } from 'react'
import { Metadata } from 'next'
import type { Locale } from '@/types/i18n'

const LANGUAGES: Record<string, { name: string; dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', dir: 'ltr' },
  es: { name: 'Español', dir: 'ltr' },
  fr: { name: 'Français', dir: 'ltr' },
  de: { name: 'Deutsch', dir: 'ltr' },
  pt: { name: 'Português', dir: 'ltr' },
  ar: { name: 'العربية', dir: 'rtl' },
  zh: { name: '中文', dir: 'ltr' },
  hi: { name: 'हिन्दी', dir: 'ltr' },
  sw: { name: 'Kiswahili', dir: 'ltr' },
  id: { name: 'Bahasa Indonesia', dir: 'ltr' },
  ru: { name: 'Русский', dir: 'ltr' },
}

export function generateMetadata(
  { params }: { params: { lang: Locale } }
): Metadata {
  const lang = params.lang
  const isValidLang = lang in LANGUAGES

  if (!isValidLang) {
    return {}
  }

  return {
    alternates: {
      languages: {
        en: 'https://cartotv.com/en',
        es: 'https://cartotv.com/es',
        fr: 'https://cartotv.com/fr',
        de: 'https://cartotv.com/de',
        pt: 'https://cartotv.com/pt',
        ar: 'https://cartotv.com/ar',
        zh: 'https://cartotv.com/zh',
        hi: 'https://cartotv.com/hi',
        sw: 'https://cartotv.com/sw',
        id: 'https://cartotv.com/id',
        ru: 'https://cartotv.com/ru',
      },
    },
  }
}

export function generateStaticParams() {
  return Object.keys(LANGUAGES).map((lang) => ({
    lang,
  }))
}

export default function LangLayout(
  { children, params }: { children: ReactNode; params: { lang: Locale } }
) {
  const lang = params.lang
  const langConfig = LANGUAGES[lang]
  const isRTL = langConfig?.dir === 'rtl'

  useEffect(() => {
    // Set document language and direction
    document.documentElement.lang = lang
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [lang, isRTL])

  if (!langConfig) {
    return <div>Language not found</div>
  }

  return children
}
