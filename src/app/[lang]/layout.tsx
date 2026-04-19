import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { I18nProvider } from '@/components/Layout/I18nProvider'

export const languages = ['en','es','fr','pt','ar','de','hi','zh','sw','id','ru'] as const
type Lang = typeof languages[number]

const RTL_LANGS: Lang[] = ['ar']

const LANG_LOCALES: Record<Lang, string> = {
  en: 'en_US', es: 'es_ES', fr: 'fr_FR', de: 'de_DE', pt: 'pt_BR',
  ar: 'ar_SA', zh: 'zh_CN', hi: 'hi_IN', sw: 'sw_KE', id: 'id_ID', ru: 'ru_RU',
}

export async function generateStaticParams() {
  return languages.map(lang => ({ lang }))
}

export async function generateMetadata(
  { params }: { params: { lang: string } }
): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!languages.includes(lang)) return {}

  const alternates: Record<string, string> = {}
  for (const l of languages) {
    alternates[l] = `https://cartotv.com/${l}`
  }

  return {
    alternates: {
      canonical: `https://cartotv.com/${lang}`,
      languages: alternates,
    },
    openGraph: {
      locale: LANG_LOCALES[lang],
      alternateLocale: languages.filter(l => l !== lang).map(l => LANG_LOCALES[l]),
    },
  }
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = params.lang as Lang
  if (!languages.includes(lang)) notFound()

  const dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr'

  return (
    // Override the html attributes set in root layout
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang='${lang}';document.documentElement.dir='${dir}';`,
        }}
      />
      <I18nProvider lang={lang}>
        {children}
      </I18nProvider>
    </>
  )
}
