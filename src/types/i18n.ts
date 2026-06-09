export type Locale = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ar' | 'zh' | 'hi' | 'sw' | 'id' | 'ru'

export interface LanguageConfig {
  name: string
  dir: 'ltr' | 'rtl'
}

export const LANGUAGES: Record<Locale, LanguageConfig> = {
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
